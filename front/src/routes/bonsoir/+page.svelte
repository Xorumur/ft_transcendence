<h1>Welcome to Bonsoir</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<script>
	import { onMount } from 'svelte';
	import { bonsoir } from 'bonsoir';

	onMount(async () => {
		const bonsoirInstance = await bonsoir();
		console.log(bonsoirInstance);
	});
</script>