<script lang="ts">
	import { onMount } from "svelte";
	import axios from "axios";
	import Navbar from "./navbar.svelte";
	import FindmatchBlock from "./find_match_block.svelte";
	import FindMatchBlock from "./find_match_block.svelte";
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
</script>

<Navbar />

<FindMatchBlock />
