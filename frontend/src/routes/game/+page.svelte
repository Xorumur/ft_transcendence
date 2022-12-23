<script>
	import Pong from "./pong.svelte";
	import { roomId, gameMode } from "../lobby/room";
	import { goto } from "$app/navigation";
</script>

<!-- <p>This is the game</p> -->
<!-- <button on:click={inc}>player 1 value : {val[0]}</button> -->
<!-- <button on:click={inc2}>player 2 value : {val[1]}</button> -->
{#if $roomId != -1}
	<Pong roomId={$roomId} gameMode={$gameMode} />
{:else}
	Looking for a game ?
	<button on:click={() => goto("/lobby")}>I want to play a game</button>
	<button on:click={() => goto("/home")}>I want to go home 🏠</button>
{/if}
