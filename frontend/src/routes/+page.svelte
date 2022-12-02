<!-- <script>
    import {accessToken} from '../lib/store.js';
</script> -->

<style>
	.intra {
		color: white;
		background: darkgray;
		border-radius: 40px;
	}
</style>

<div>
	{#if Signin === true}
		<button class="intra" on:click={async () => auth()}>
			Log in
		</button>
	{/if}

	<p class="intra">
		{token}
	</p>
</div>

<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import Config from '$lib/config';	

	const url: string = "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-288ae3c7efd14641a4553c995e17cc25475cf16b36b40ea1fcde905222530e26&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code";
	let Signin: boolean = true;
	let token : any;

	function auth() {
		goto(url);
		// goto('hhtp://localhost:3000');
	}

	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		console.log(localStorage.getItem('access_token'));
		if (urlParams.has('code') && localStorage.getItem('access_token') === null) {
			const code = urlParams.get('code');
			// Signin = false to don't show the sign button... After that we can go to another page
			Signin = false;
			let tmp : any = await axios.post(Config.API_URL + '/auth', { code: code });
			// accessToken.subscribe(tmp);
			console.log(tmp.data);
			// accessToken.set(tmp.data);
			localStorage.setItem('access_token', tmp.data.toString());
			token = localStorage.getItem('access_token');
			// console.log(accessToken);
			goto('/home');
		}
		else if (localStorage.getItem('access_token')) {
			goto('/home');
		}
	});
</script>