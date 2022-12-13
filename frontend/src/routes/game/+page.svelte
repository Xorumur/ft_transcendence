<script>
    import io from "socket.io-client";

    const socket = io("localhost:4200", { path: "/game" });
    socket.on("game-message", (e) => {
        console.log(e);
    });
</script>

<p>This is the game</p>
