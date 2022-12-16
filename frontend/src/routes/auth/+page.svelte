<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import axios from "axios";
	import Config from "$lib/config";

	const url: string =
		"https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-288ae3c7efd14641a4553c995e17cc25475cf16b36b40ea1fcde905222530e26&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code";
	let Signin: boolean = true;
	let token: any;
	let loaded = false;

	function auth() {
		goto(url);
		// goto('hhtp://localhost:3000');
	}

	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		console.log(localStorage.getItem("access_token"));
		if (
			urlParams.has("code") &&
			localStorage.getItem("access_token") === null
		) {
			const code = urlParams.get("code");
			// Signin = false to don't show the sign button... After that we can go to another page
			console.log("code: " + code);
			Signin = false;
			let tmp: any = await axios.post(Config.API_URL + "/auth", {
				code: code,
			});
			console.log(tmp.data);
			localStorage.setItem("access_token", tmp.data.toString());
			token = localStorage.getItem("access_token");
			goto("/home");
		} else if (localStorage.getItem("access_token")) {
			goto("/home");
		}
		loaded = true;
	});
</script>

{#if loaded}
	<img src="assets/b.jpeg" alt="Login background" class="background" />
	<div class="background">
		{#if Signin === true}
			<button class="intra" on:click={async () => auth()}>
				Log in
			</button>
		{/if}
		<p class="credits">Made by mlecherb nferre ydanset</p>
	</div>
{:else}
	<main class="background">
		<div class="cell">
			<div class="pl pl-origami" />
			<div class="pl-name">Loading...</div>
		</div>
	</main>
{/if}

<!-- <script>
    import {accessToken} from '../lib/store.js';
</script> -->
<style>
	.intra {
		color: white;
		background: darkgray;
		border-radius: 40px;
		position: absolute;
		height: 60px;
		width: 180px;
		top: 50%;
		left: 45%;
		font-size: 40px;
		background: rgba(100, 40, 175, 0.1);
		border: 1px solid #000000;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	}
	/** Container **/
	* {
		border: 0;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	:root {
		font-size: calc(16px + (24 - 16) * (100vw - 320px) / (1920 - 320));
	}

	/** Container **/
	main {
		display: flex;
		justify-content: center;
		padding-top: 35vh;
	}
	.cell {
		flex-basis: 50%;
		padding: 1.5em;
		color: white;
	}

	/** Global preloader styles **/
	.pl,
	.pl:before,
	.pl:after {
		animation-duration: 2s;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}
	.pl {
		margin: 0 auto 1.5em auto;
		position: relative;
		width: 3em;
		height: 3em;
	}
	.pl:before,
	.pl:after {
		background: currentColor;
		content: "";
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 50%;
		transform-origin: 50% 100%;
		clip-path: polygon(0 0, 100% 0, 50% 100%);
		-webkit-clip-path: polygon(0 0, 100% 0, 50% 100%);
	}
	.pl-name {
		text-align: center;
	}

	/* Origami */
	.pl-origami {
		animation-name: origamiA;
		animation-timing-function: steps(4);
	}
	.pl-origami:before,
	.pl-origami:after {
		clip-path: polygon(50% 0, 100% 100%, 0% 100%);
		-webkit-clip-path: polygon(50% 0, 100% 100%, 0% 100%);
	}
	.pl-origami:before {
		animation-name: origamiB;
	}
	.pl-origami:after {
		animation-name: origamiC;
		transform: rotate(180deg);
	}
	@keyframes origamiA {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(-360deg);
		}
	}
	@keyframes origamiB {
		from,
		25%,
		50%,
		75%,
		to {
			opacity: 1;
			transform: translateZ(0) rotateX(0deg);
		}
		12.5%,
		62.5% {
			opacity: 1;
			transform: translateZ(1px) rotateX(-180deg);
		}
		37.5%,
		87.5% {
			opacity: 0;
			transform: translateZ(0) rotateX(0deg);
		}
	}
	@keyframes origamiC {
		from,
		25%,
		50%,
		75%,
		to {
			opacity: 1;
			transform: translateZ(0) rotateZ(180deg) rotateX(0deg);
		}
		12.5%,
		62.5% {
			opacity: 0;
			transform: translateZ(0) rotateZ(180deg) rotateX(0deg);
		}
		37.5%,
		87.5% {
			opacity: 1;
			transform: translateZ(1px) rotateZ(180deg) rotateX(-180deg);
		}
	}

	.background {
		z-index: -1;
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: #98b2f4;
	}

	.credits {
		position: absolute;
		width: 190px;
		height: 190px;
		left: 45%;
		top: 70%;

		font-family: "Inter";
		font-style: normal;
		font-weight: 100;
		font-size: 40px;
		line-height: 48px;

		color: #ffffff;
	}
</style>
