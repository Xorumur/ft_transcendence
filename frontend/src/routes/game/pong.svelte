<script>
	import { onMount } from "svelte";
	import { tweened } from "svelte/motion";
	import io from "socket.io-client";

	export let roomId;
	const socket = io("localhost:4200", { path: "/game", query: { roomId } });
	let canvasWidth = 500;
	let canvasHeight = 900;
	let width = 500;
	let height = 900;
	const border = 5;
	const player_height = width / 5;
	const player_width = 10;
	const tw = tweened(0);

	let score = {
		p1: 0,
		p2: 0,
	};

	let canvas;
	let context;

	let paddle1 = {
		x: width / 2 - player_height / 2,
		y: 10,
		speed: 5,
	};

	let paddle2 = {
		y: height - 10 - player_width,
		x: width / 2 - player_height / 2,
		speed: 5,
	};

	let ball = {
		x: width / 2,
		y: height / 2,
		radius: 10,
		x_vel: -5,
		y_vel: -5,
	};

	onMount(() => {
		context = canvas.getContext("2d");
		setInterval(draw, 1000 / 60);
	});

	function handleMousemove(event) {
		const canvasRect = canvas.getBoundingClientRect();
		const mouseX = event.clientX - canvasRect.left;

		// Update the paddle position based on the mouse position
		// paddle1.x = mouseX - player_height / 2;
		socket.emit(
			"mouseMove",
			mouseX - player_height / 2,
			paddle1.x,
			paddle2.x
		);
		// if (event.key == "w") {
		// 	socket.emit("playerUp", paddle1.x, paddle2.x);
		// } else if (event.key == "s") {
		// 	socket.emit("playerDown", paddle1.x, paddle2.x);
		// }
	}
	socket.on("game-message", (e) => {
		console.log(e);
	});

	socket.on("playerMove", (paddles) => {
		paddle1.x = paddles[0];
		paddle2.x = paddles[1];
	});

	socket.on("collision", (newBall) => {
		ball = newBall;
	});

	socket.on("score", (newScore) => {
		score = newScore;
		if (score.p1 === 10 || score.p2 === 10) {
			socket.disconnect();
		}
	});

	socket.on("stopGame", () => {
		ball.x_vel = 0;
		ball.y_vel = 0;
		ball.x = width / 2;
		ball.y = height / 2;
	});

	const draw = () => {
		context.clearRect(0, 0, width, height);

		if (ball.x - ball.radius <= 0 && ball.x_vel < 0) {
			socket.emit("ballCollision", ball, "wall");
		} else if (ball.x + ball.radius >= width && ball.x_vel > 0) {
			socket.emit("ballCollision", ball, "wall");
		}

		if (
			ball.x + ball.radius >= paddle1.x &&
			ball.x - ball.radius <= paddle1.x + player_height &&
			ball.y + ball.radius >= paddle1.y &&
			ball.y - ball.radius <= paddle1.y + player_width &&
			ball.y_vel < 0
		) {
			// Collision with paddle 1
			socket.emit("ballCollision", ball, "paddle");
		}

		if (
			ball.x + ball.radius >= paddle2.x &&
			ball.x - ball.radius <= paddle2.x + player_height &&
			ball.y + ball.radius >= paddle2.y &&
			ball.y - ball.radius <= paddle2.y + player_width &&
			ball.y_vel > 0
		) {
			// Collision with paddle 2
			socket.emit("ballCollision", ball, "paddle");
		}

		if (ball.y < 0 || ball.y > height) {
			if (ball.y < 0) {
				socket.emit("score", score, "p2");
			} else if (ball.y > height) {
				socket.emit("score", score, "p1");
			}
			paddle1.x = width / 2 - player_height / 2;
			paddle1.y = 10;
			paddle1.speed = 5;
			paddle2.x = width / 2 - player_height / 2;
			paddle2.y = height - 10 - player_width;
			paddle2.speed = 5;
			ball.x = width / 2;
			ball.y = height / 2;
			ball.radius = 10;
			ball.x_vel = -5;
			ball.y_vel = -5;
		}

		ball.x += ball.x_vel;
		ball.y += ball.y_vel;

		context.strokeStyle = "hsl(201, 100%, 96%)";
		context.lineWidth = border * 2;
		context.fillStyle = "#b6b6f2";
		context.fillRect(0, 0, width, height);
		context.strokeRect(0, 0, width, height);

		context.lineWidth = border;
		context.beginPath();
		context.moveTo(0, height / 2);
		context.lineTo(width, height / 2);
		context.closePath();
		context.stroke();

		context.fillStyle = "hsl(201, 100%, 96%)";
		context.fillRect(paddle1.x, paddle1.y, player_height, player_width);

		context.fillStyle = "hsl(201, 100%, 96%)";
		context.fillRect(paddle2.x, paddle2.y, player_height, player_width);

		context.beginPath();
		context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
		context.fill();
	};
</script>

<svelte:window on:mousemove={handleMousemove} />
<main>
	<div>
		<strong>
			{score.p1}
		</strong>
		<strong>
			{score.p2}
		</strong>
	</div>
	<canvas
		bind:this={canvas}
		width={canvasWidth}
		height={canvasHeight}
		id="pong"
	/>
</main>

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
	/* main > div {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    } */
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
