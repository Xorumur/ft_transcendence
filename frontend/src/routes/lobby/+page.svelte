<script>
	import { goto } from "$app/navigation";
	import { roomId, gameMode as selectedGameMode, map } from "./room";
	import io from "socket.io-client";
	import { onMount } from "svelte";
	import { GuardRoutes } from "$lib/auth";

	onMount(async () => {
		GuardRoutes();
	});

	let isSearching = false;
	let isLocked = false;
	//establish connection with backend using websocket
	const socket = io("localhost:4200", { path: "/matchmaking" });

	//join queue
	function joinQueue() {
		socket.emit("joinQueue", $selectedGameMode);
		isSearching = !isSearching;
		isLocked = true;
	}

	//leave queue
	function leaveQueue() {
		socket.emit("leaveQueue", $selectedGameMode);
		isSearching = !isSearching;
		isLocked = false;
	}

	//detect if player is matched with another
	socket.on("matched", (id) => {
		roomId.set(id);
		socket.disconnect();
		goto("/game");
	});
</script>

<button
	disabled={isLocked}
	class:selected={$selectedGameMode === 0}
	on:click={() => selectedGameMode.set(0)}>Default</button
>
<button
	disabled={isLocked}
	class:selected={$selectedGameMode === 1}
	on:click={() => selectedGameMode.set(1)}>Speed mode ⚡</button
>
<button
	disabled={isLocked}
	class:selected={$selectedGameMode === 2}
	on:click={() => selectedGameMode.set(2)}>Ghost mode 👻</button
>
<button class:selected={$map === 0} on:click={() => map.set(0)}
	>Boring map</button
>
<button class:selected={$map === 1} on:click={() => map.set(1)}
	>Existing map</button
>
{#if !isSearching}
	<button on:click={joinQueue}>Join Queue</button>
{:else}
	<button on:click={leaveQueue}>Leave Queue</button>
{/if}

<style>
	.selected {
		background-color: #ff3e00;
		color: white;
	}
</style>
