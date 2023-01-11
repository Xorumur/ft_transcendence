<script lang="ts">
	import { onMount } from "svelte";
	import axios from "axios";
	import { goto } from "$app/navigation";
	import { GuardRoutes } from "$lib/auth";
	import { user } from "../user";

	let pp: string;
	let search: string;
	let logged: any;

	onMount(async () => {
		GuardRoutes();

		// set all information about the user
		let res = await axios.get("http://localhost:4200/user/info", {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("access_token"),
			},
		});
		console.log("-> data", res.data);
		pp = res.data.ImageUrl;
	});

	async function Search(name: string) {
		let info = await axios.get(`http://localhost:4200/user/info/${name}`, {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("access_token"),
			},
		});
		console.log("-> info", info.data);
	}

	async function Add() {
		let info = await axios.get(`http://localhost:4200/user/fake`, {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("access_token"),
			},
		});
	}
</script>

<div class="global">
	<img src={pp} alt="test" class="pp" />
	<!-- <input type="file" accept="image/*" /> -->
	<input bind:value={search} />
	<button on:click={async () => Search(search)}> Search </button>
	<button on:click={async () => Add()}> Add one fake User </button>
	<button on:click={() => goto("/lobby")}>Play</button>
	<button on:click={() => goto("/profile")}>Profile</button>
	<button class="message"> Messages </button>
</div>

<style>
	/* .Homeback {
		z-index: -1;
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
	}

	.social {
		box-sizing: border-box;

		position: absolute;
		width: 300px;
		height: 90%; 
		top: 0px;
		right: 0px;

		background: rgba(100, 24, 159, 0.35);
		border: 2px solid rgba(0, 0, 0, 0.35);
	}  */

	.global {
		position: absolute;
		width: 100%;
		height: 100%;
		background: #98b2f4;
	}

	.message {
		position: absolute;
		width: 23%;
		height: 8%;
		right: 0px;
		top: 91%;

		background: rgba(100, 24, 159, 0.35);
		border: 2px solid rgba(0, 0, 0, 0.35);
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

		font-family: "Inter";
		font-style: normal;
		font-weight: 700;
		font-size: 24px;
		line-height: 29px;

		color: #ffffff;
	}

	.pp {
		box-sizing: border-box;

		position: absolute;
		width: 33%;
		height: 20%;
		right: 33%;
		top: 10%;
		/* background: url({Pp}); */
		border: 1px solid #000000;
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
		border-radius: 100%;
	}
</style>
