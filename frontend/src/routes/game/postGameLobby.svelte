<script>
	import { goto } from "$app/navigation";
</script>

<p>Hello this is post game</p>
<button on:click={() => goto("/home")}>I want to go home 🏠</button>
<button on:click={() => goto("/lobby")}>I want to play a new game</button>
<!-- To implement : <button>I want to rematch !</button> -->
