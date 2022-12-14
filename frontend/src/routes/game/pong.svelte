<script>
    import { onMount } from "svelte";
    import { tweened } from "svelte/motion";
    import io from "socket.io-client";

    const socket = io("localhost:4200", { path: "/game" });
    let canvasWidth = 900;
    let canvasHeight = 500;
    let width = 900;
    let height = 500;
    const border = 5;
    const player_height = height / 5;
    const player_width = 10;
    const tw = tweened(0);

    let score = {
        p1: 0,
        p2: 0,
    };

    let canvas;
    let context;

    let paddle1 = {
        x: 10,
        y: height / 2 - player_height / 2,
        speed: 5,
    };

    let paddle2 = {
        x: width - 10 - player_width,
        y: height / 2 - player_height / 2,
        speed: 5,
    };

    let ball = {
        x: width / 2,
        y: height / 2,
        radius: 10,
        x_vel: 5,
        y_vel: 5,
    };

    onMount(() => {
        context = canvas.getContext("2d");
        setInterval(draw, 1000 / 60);
    });

    function handleMousemove(event) {
        if (event.key == "w") {
            // paddle2.y -= 5;
            // console.log(paddle2.y);
            socket.emit("playerUp", paddle1.y, paddle2.y);
        } else if (event.key == "s") {
            // paddle2.y += 5;
            // console.log(paddle2.y);
            socket.emit("playerDown", paddle1.y, paddle2.y);
        }
    }
    socket.on("game-message", (e) => {
        console.log(e);
    });

    socket.on("playerMove", (e) => {
        paddle1.y = e[0];
        paddle2.y = e[1];
    });

    const draw = () => {
        context.clearRect(0, 0, width, height);
        // Check for collisions with top and bot
        if (ball.y + ball.radius >= height || ball.y - ball.radius <= 0) {
            ball.y_vel = -ball.y_vel;
        }

        if (
            ball.x + ball.radius < paddle1.x ||
            ball.x - ball.radius > paddle1.x + player_width ||
            ball.y + ball.radius < paddle1.y ||
            ball.y - ball.radius > paddle1.y + player_height
        ) {
            ball.x_vel = -ball.x_vel;
        }

        if (
            ball.x + ball.radius < paddle2.x ||
            ball.x - ball.radius > paddle2.x + player_width ||
            ball.y + ball.radius < paddle2.y ||
            ball.y - ball.radius > paddle2.y + player_height
        ) {
            ball.x_vel = -ball.x_vel;
        }

        if (ball.x < 0 || ball.x > width) {
            if (ball.x < 0) {
                score.p2 += 1;
            } else if (ball.x > width) {
                score.p1 += 1;
            }
            paddle1.x = 10;
            paddle1.y = height / 2 - player_height / 2;
            paddle1.speed = 5;
            paddle2.x = width - 10 - player_width;
            paddle2.y = height / 2 - player_height / 2;
            paddle2.speed = 5;
            ball.x = width / 2;
            ball.y = height / 2;
            ball.radius = 10;
            ball.x_vel = 5;
            ball.y_vel = 5;
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
        context.moveTo(width / 2, 0);
        context.lineTo(width / 2, height);
        context.closePath();
        context.stroke();

        context.fillStyle = "hsl(201, 100%, 96%)";
        context.fillRect(paddle1.x, paddle1.y, player_width, player_height);

        context.fillStyle = "hsl(201, 100%, 96%)";
        context.fillRect(paddle2.x, paddle2.y, player_width, player_height);

        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
        context.fill();
        // context.fillStyle = "hsl(330, 79%, 56%)";
        // puck.show(context);

        // context.fillStyle = "hsl(201, 79%, 46%)";
        // paddleLeft.show(context);
        // paddleRight.show(context);
    };
</script>

<svelte:body on:keydown={handleMousemove} />
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
        position: absolute;
        z-index: 1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
