<script>
	import { Router, Route } from "svelte-routing";
	import Home from "./home/+page.svelte";
	import Lobby from "./lobby/+page.svelte";
	import Game from "./game/+page.svelte";
	import Auth from "./auth/+page.svelte";
</script>

<Router>
	<Route path="home" component={Home} />
	<Route path="lobby" component={Lobby} />
	<Route path="game" component={Game} />
	<Route path="" component={Auth} />
</Router>
