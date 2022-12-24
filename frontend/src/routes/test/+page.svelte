<script lang="ts">
	import { onMount } from "svelte";
	import axios from "axios";
	let t: any;
	onMount(async () => {
		console.log("mounted");
		t = await axios.get("http://localhost:4200/user/info", {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("access_token"),
			},
		});
		t = t.data;
		console.log(t);
	});
	async function postResult(body) {
		console.log("sent");
		const response = await axios.post(
			"http://localhost:4200/user/result",
			body,
			{
				headers: {
					Authorization:
						"Bearer " + localStorage.getItem("access_token"),
				},
			}
		);
		console.log(response.data.history);
	}
</script>

{#if t}
	<div>
		Salut a tous.
		<p>{t}</p>
		<button
			on:click={() =>
				postResult({ opponent: "opponent", winner: "winner" })}
			>Push</button
		>
	</div>
{/if}
