<script>
    import Pong from "./pong.svelte";
    import { roomId } from "../lobby/room";
</script>

<!-- <p>This is the game</p> -->
<!-- <button on:click={inc}>player 1 value : {val[0]}</button> -->
<!-- <button on:click={inc2}>player 2 value : {val[1]}</button> -->
<Pong roomId={$roomId} />
