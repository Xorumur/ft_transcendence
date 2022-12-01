<style>
	.intra {
		color: white;
		background: darkgray;
		border-radius: 40px;
	}

	.google {
		color: white;
		background: darkgray;
		border-radius: 40px;
	}
</style>

<div>
	<div>
	<button class="intra" on:click={() => goto(url)}>
		Log in
	</button>
	</div>




	<div>
	<button class="google" on:click={() => goto('http://localhost:4200/google')}>
		Authentification Google
	</button>
	</div>
</div>

<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import Config from '$lib/config';
	const url: string = "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-288ae3c7efd14641a4553c995e17cc25475cf16b36b40ea1fcde905222530e26&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code";

	async function GoogleOauth() {
		const GoogleToken = await axios.get("http://localhost:4200/google/", {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
			}
		});
		console.log('-> GoogleToken', GoogleToken);
		// const GoogleToken = await fetch('https://example.com/resource.json', {
		// 	method: 'GET',
		// 	headers: {
		// 		'Content-Type': 'content/type',
		// 		'Access-Control-Allow-Origin': '*',
		// 		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
		// 		// like application/json or text/xml
		// 	}
		// 	})
		// 	.then(response => response.json())
			// console.log('-> GoogleToken', GoogleToken);
	}

	onMount(async () => {
		
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.has('code')) {
			const code = urlParams.get('code');
			console.log(code);
			const response = await axios.post(Config.API_URL + '/auth', {
				code: code
				
			});
			console.log({code});
		}
	});
</script>