<script>
	import { paddle, gameInfo, ball as Ball } from "./pong";
	import { onMount } from "svelte";
	import io from "socket.io-client";
	import PostGameLobby from "./postGameLobby.svelte";
	import Loading from "../loading.svelte";

	//get the value of roomId fron the parent component
	export let roomId;
	//set state of the game
	let isPlaying = true;
	const socket = io("localhost:4200", { path: "/game", query: { roomId } });

	//connect to backend
	const game = gameInfo;

	let canvas;
	let context;

	let ball;
	let paddle1;
	let paddle2;

	onMount(() => {
		paddle1 = new paddle(game, true);
		paddle2 = new paddle(game, false);
		ball = new Ball(game, -5, -5);
		context = canvas.getContext("2d");
		setInterval(draw, 1000 / 60);
	});

	function handleMousemove(event) {
		const canvasRect = canvas.getBoundingClientRect();
		const mouseX = event.clientX - canvasRect.left;

		socket.emit(
			"mouseMove",
			mouseX - paddle1.player_height / 2,
			paddle1.x,
			paddle2.x
		);
	}

	function handleKeys(event) {
		if (event.key == "w") {
			socket.emit("playerUp", paddle1.x, paddle2.x);
		} else if (event.key == "s") {
			socket.emit("playerDown", paddle1.x, paddle2.x);
		}
	}

	socket.on("game-message", (e) => {
		console.log(e);
	});

	socket.on("playerMove", (paddles) => {
		paddle1.x = paddles[0];
		paddle2.x = paddles[1];
	});

	socket.on("collision", (newVel) => {
		ball.newCollision(newVel.x_vel, newVel.y_vel);
	});

	socket.on("score", (newScore) => {
		game.score = newScore;
		if (game.score.p1 === 10 || game.score.p2 === 10) {
			socket.disconnect();
			isPlaying = false;
		}
	});

	socket.on("stopGame", () => {
		ball.x_vel = 0;
		ball.y_vel = 0;
		ball.x = game.width / 2;
		ball.y = game.height / 2;
	});

	const draw = () => {
		context.clearRect(0, 0, game.width, game.height);

		//collision with wall
		if (ball.x - ball.radius <= 0 && ball.x_vel < 0) {
			socket.emit(
				"ballCollision",
				{ x_vel: ball.x_vel, y_vel: ball.y_vel },
				"wall"
			);
		} else if (ball.x + ball.radius >= game.width && ball.x_vel > 0) {
			socket.emit("ballCollision", ball, "wall");
		}

		// Collision with paddle 1
		if (
			ball.x + ball.radius >= paddle1.x &&
			ball.x - ball.radius <= paddle1.x + paddle1.player_height &&
			ball.y + ball.radius >= paddle1.y &&
			ball.y - ball.radius <= paddle1.y + paddle1.player_width &&
			ball.y_vel < 0
		) {
			socket.emit("ballCollision", ball, "paddle");
		}

		// Collision with paddle 2
		if (
			ball.x + ball.radius >= paddle2.x &&
			ball.x - ball.radius <= paddle2.x + paddle2.player_height &&
			ball.y + ball.radius >= paddle2.y &&
			ball.y - ball.radius <= paddle2.y + paddle2.player_width &&
			ball.y_vel > 0
		) {
			socket.emit("ballCollision", ball, "paddle");
		}

		//check if someone scores
		if (ball.y < 0 || ball.y > game.height) {
			if (ball.y < 0) {
				socket.emit("score", game.score, "p2");
			} else if (ball.y > game.height) {
				socket.emit("score", game.score, "p1");
			}
			//reset the ball and paddles pos
			paddle1.reset(game, true);
			paddle2.reset(game, false);
			ball.reset(game, -5, -5);
		}

		ball.update();

		//draw map
		context.strokeStyle = "hsl(201, 100%, 96%)";
		context.lineWidth = game.border * 2;
		context.fillStyle = "#b6b6f2";
		context.fillRect(0, 0, game.width, game.height);
		context.strokeRect(0, 0, game.width, game.height);

		//draw net
		context.lineWidth = game.border;
		context.beginPath();
		context.moveTo(0, game.height / 2);
		context.lineTo(game.width, game.height / 2);
		context.closePath();
		context.stroke();

		//draw elements
		paddle1.draw(context);
		paddle2.draw(context);
		ball.draw(context);
	};
</script>

<svelte:window on:mousemove={handleMousemove} on:keypress={handleKeys} />
{#if isPlaying}
	<main>
		<div>
			<strong>
				{game.score.p1}
			</strong>
			<strong>
				{game.score.p2}
			</strong>
			<canvas
				bind:this={canvas}
				width={game.canvasWidth}
				height={game.canvasHeight}
				id="pong"
			/>
		</div>
	</main>
{:else}
	<PostGameLobby />
{/if}

<style>
	#pong {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #b6b6f2;
	}
	strong {
		padding: 5vw;
		z-index: 1;
		font-size: 3rem;
		color: hsl(201, 100%, 96%);
	}
	div {
		display: flex;
		flex-direction: column;
		position: absolute;
		z-index: 1;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
