<script>
	import { Router, Route } from "svelte-routing";
	import Home from "./home/+page.svelte";
	import Lobby from "./lobby/+page.svelte";
	import Game from "./game/+page.svelte";
</script>

<Router>
	<Route path="" component={Home} />
	<Route path="lobby" component={Lobby} />
	<Route path="game" component={Game} />
	<!-- <Route path="" component={Auth} /> -->
</Router>
