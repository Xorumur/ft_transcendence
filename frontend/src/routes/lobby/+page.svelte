<script>
    import { goto } from "$app/navigation";
    import { roomId } from "./room";
    import io from "socket.io-client";
    let isSearching = false;
    //establish connection with backend using websocket
    const socket = io("localhost:4200", { path: "/matchmaking" });

    //join queue
    function joinQueue() {
        socket.emit("joinQueue");
        isSearching = !isSearching;
    }

    //leave queue
    function leaveQueue() {
        socket.emit("leaveQueue");
        isSearching = !isSearching;
    }

    //detect if player is matched with another
    socket.on("matched", (id) => {
        roomId.set(id);
        socket.disconnect();
        goto("/game");
    });
</script>

{#if !isSearching}
    <button on:click={joinQueue}>Join Queue</button>
{:else}
    <button on:click={leaveQueue}>Leave Queue</button>
{/if}
