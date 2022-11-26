
<script context="module">

    // import { LOGNAME } from "$env/static/private";
	import { fix_position } from "svelte/internal";

</script>

<script lang="ts">
	
	import { onMount } from 'svelte';
	import axios from 'axios';
	let clicked_signin: boolean = false;
	onMount(async () => {
		// console.log('mounted');
		
	});
	function signin() {
		clicked_signin = true;
		console.log("clicked_signin: " + clicked_signin);
	}

</script>

<!-- <!DOCTYPE html> -->
<html lang="ts">
<body>
	<div>
		<style>
			.test2 {
				background-color: darkgray;
				position: absolute;
				height: 100px;
				width: 100%;
				display: flex;
				justify-content: center;
			}
			.signin {
				background-color: grey;
				height: 25%;
				border-radius: 10px;
				top: 50%;
			}
			.signup {
				background-color: grey;
				height: 25%;
				border-radius: 10px;
			}
		</style>
		<div class="test2">
			<button class="signin" on:click={signin}>
					Sign in
			</button>
			<button class="signup">
				Sign up
			</button>
		</div>
	</div>

{#if clicked_signin == true}
		<style>
			.register {
				border: 3px solid #f1f1f1;
			}
		</style>
		<div class="register">
			<style>
				.Usr {
					background-color: white;
					display: flex;
					justify-content: center;
				}
				.Pwd {
					background-color: white;
					display: flex;
					justify-content: center;
				}
				.Box {
					with: 200px;
					height: 100px;
				}
			</style>
			<div class="Box">
				<input class="Usr" type="text" placeholder="Username">
				<input class="Pwd" type="password" placeholder="Password">
			</div>
		</div>
{/if}	
<div>test</div>
</body>
</html>