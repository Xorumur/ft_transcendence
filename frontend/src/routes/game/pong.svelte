<script>
	import { paddle, gameInfo, ball as Ball } from "./pong";
	import { onMount } from "svelte";
	import io from "socket.io-client";
	import PostGameLobby from "./postGameLobby.svelte";
	import axios from "axios";

	export let roomId;
	/**
	 * @type {number}
	 */
	export let gameMode;

	let isPlaying = true;
	let isMobile = false;
	if (
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		)
	) {
		isMobile = true;
	}

	let DIRECTION = {
		IDLE: 0,
		UP: 1,
		DOWN: 2,
	};
	//connect to backend
	const socket = io("localhost:4200", {
		path: "/game",
		query: { roomId },
	});
	let timer = 0;

	/**
	 * @type {Ball}
	 */
	let ball;
	/**
	 * @type {paddle}
	 */
	let paddle1;
	/**
	 * @type {paddle}
	 */
	let paddle2;

	/**
	 * @type {CanvasRenderingContext2D}
	 */
	let context;
	/**
	 * @type {HTMLCanvasElement}
	 */
	let canvas;
	let game = new gameInfo();

	let rand = { x: 1, y: 1 };
	onMount(() => {
		//create all elements
		paddle1 = new paddle(game, true);
		paddle2 = new paddle(game, false);
		ball = new Ball(game, rand);
		context = canvas.getContext("2d");

		//make the game responsive
		context.scale(canvas.width / game.width, canvas.height / game.height);
		requestAnimationFrame(draw);
	});

	socket.on("start game", () => {
		isPlaying = true;
	});

	socket.on("collision", (newVel) => {
		if (newVel[1] == false) {
			timer = 0;
		}
		ball.new(newVel[0]);
	});

	socket.on("playerMove", (newDir) => {
		paddle1.dir = newDir[0];
		paddle2.dir = newDir[1];
	});

	socket.on("score", (newScore) => {
		game.score = newScore;
		if (game.score.p1 === 10 || game.score.p2 === 10) {
			socket.disconnect();
			isPlaying = false;
		}
	});

	socket.on("ball", (newBall) => {
		console.log(newBall);
		rand.x = newBall[0];
		rand.y = newBall[1];
	});

	socket.on("Down", (nb) => {
		if (nb == 1) {
			paddle1.dir = DIRECTION.IDLE;
		} else if (nb == 2) {
			paddle2.dir = DIRECTION.IDLE;
		}
	});

	const draw = () => {
		timer++;
		// context.clearRect(0, 0, game.width, game.height);

		//collision with wall
		if (ball.y - ball.radius <= 0 && ball.y_vel < 0) {
			socket.emit("ballCollision", ball, "wall");
		} else if (ball.y + ball.radius >= game.height && ball.y_vel > 0) {
			socket.emit("ballCollision", ball, "wall");
		}

		// Collision with paddle 1
		if (
			ball.y + ball.radius >= paddle1.y &&
			ball.y - ball.radius <= paddle1.y + paddle1.player_height &&
			ball.x + ball.radius >= paddle1.x &&
			ball.x - ball.radius <= paddle1.x + paddle1.player_width &&
			ball.x_vel < 0
		) {
			socket.emit("ballCollision", ball, "paddle");
		}

		// Collision with paddle 2
		if (
			ball.y + ball.radius >= paddle2.y &&
			ball.y - ball.radius <= paddle2.y + paddle2.player_height &&
			ball.x + ball.radius >= paddle2.x &&
			ball.x - ball.radius <= paddle2.x + paddle2.player_width &&
			ball.x_vel > 0
		) {
			socket.emit("ballCollision", ball, "paddle");
		}

		// check if someone scores
		if (ball.x < 0 || ball.x > game.width) {
			if (ball.x < 0) {
				socket.emit("score", game.score, "p2");
			} else if (ball.x > game.width) {
				socket.emit("score", game.score, "p1");
			}
			//reset the ball and paddles pos
			paddle1.reset(game, true);
			paddle2.reset(game, false);
			ball.reset(game, rand);
			socket.emit("ball");
			timer = 0;
		}

		//update ball pos
		ball.update();

		//draw map
		game.drawMap(context);

		//draw net
		game.drawNet(context);

		//check playerMouvement
		if (paddle1.dir == DIRECTION.UP && paddle1.y > 0) {
			paddle1.y -= paddle1.speed;
		} else if (
			paddle1.dir == DIRECTION.DOWN &&
			paddle1.y + paddle1.player_height < game.height
		) {
			paddle1.y += paddle1.speed;
		}
		if (paddle2.dir == DIRECTION.UP && paddle2.y > 0) {
			paddle2.y -= paddle2.speed;
		} else if (
			paddle2.dir == DIRECTION.DOWN &&
			paddle2.y + paddle2.player_height < game.height
		) {
			paddle2.y += paddle2.speed;
		}
		//draw the paddles
		paddle1.draw(context);
		paddle2.draw(context);

		//make the ball transparent over time if gameMode is ghost
		if (gameMode === 2) {
			context.globalAlpha = 1 - Math.min(1, timer / 150);
		}
		//draw elements
		ball.draw(context);
		context.globalAlpha = 1;
		requestAnimationFrame(draw);
	};

	function handleKeysDown(event) {
		if (event.key == "w") {
			socket.emit("playerUp", paddle1.dir, paddle2.dir);
		} else if (event.key == "s") {
			socket.emit("playerDown", paddle1.dir, paddle2.dir);
		}
	}

	function handleKeysUp() {
		socket.emit("keyDown");
	}
</script>

<svelte:window on:keydown={handleKeysDown} on:keyup={handleKeysUp} />
{#if isPlaying}
	<main>
		<div class="score">
			<strong>
				{game.score.p1}
			</strong>
			<strong>
				{game.score.p2}
			</strong>
		</div>
		{#if isMobile}
			<div class="buttons">
				<button class="mobile">hello</button>
				<button class="mobile">hoy</button>
			</div>
		{/if}
		<canvas
			bind:this={canvas}
			width={game.canvasWidth}
			height={game.canvasHeight}
			id="pong"
		/>
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
		z-index: 5;
		font-size: 3rem;
		color: hsl(201, 100%, 96%);
	}
	.score {
		display: flex;
		position: absolute;
		z-index: 5;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.mobile {
	}

	button {
		z-index: 1;
	}

	.buttons {
		z-index: 1;
		display: flex;
		justify-content: space-between;
		padding-top: 85vh;
		padding-left: 10vw;
		padding-right: 10vw;
	}
</style>
