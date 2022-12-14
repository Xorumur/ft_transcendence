<script>
    import { goto } from "$app/navigation";
    import io from "socket.io-client";
    import { navigate } from "svelte-routing";
    let isSearching = false;
    let roomId = -1;
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
        roomId = id;
        socket.disconnect();
        goto("/game");
    });
</script>

{#if !isSearching}
    <button on:click={joinQueue}>Join Queue</button>
{:else}
    <button on:click={leaveQueue}>Leave Queue</button>
{/if}
