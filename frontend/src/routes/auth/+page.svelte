<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import axios from "axios";
	import Config from "$lib/config";
	import Loading from "../loading.svelte";

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
	<Loading />
{/if}

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
