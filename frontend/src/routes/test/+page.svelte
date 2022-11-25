<script lang="ts">
		import { onMount } from 'svelte';
		import axios from 'axios';
		let t: any;
		onMount(async () => {
			console.log('mounted');
			t = await axios.get("http://localhost:4200/test");
			t = t.data;
			console.log(t);
		});
</script>

{#if t}
	<div>
		Salut a tous.
		<p>{t}</p>
	</div>
{/if}