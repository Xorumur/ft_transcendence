<script lang="ts">
	import { onMount } from "svelte";
	import axios from "axios";
	import { navigate } from "svelte-routing";
	import { goto } from "$app/navigation";

	let user: any;
	let pp: string;
	let search: string;
	let logged : any;

	onMount(async () => {
		let logged;
		if (localStorage.getItem("access_token") === null) {
			goto("/");
			return ;
		}
			try {
			logged = await axios.get("http://localhost:4200/user/logged", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("access_token"),
				},
		});
		} catch (error) {
			console.log("-> error", error);
			goto("/");
			return ;
		}

		user = await axios.get("http://localhost:4200/user/obj", {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("access_token"),
			},
		});
		if (user !== undefined) pp = user.data.ImageUrl;
		else pp = "assets/default_pp.jpeg";
	});

	async function Search(name: string) {
		// console.log(search);
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
	<button class="message"> Messages </button>
	<button on:click={() => navigate("/lobby")}>Play</button>
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
	} */

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
