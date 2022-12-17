<main class="background">
	<div class="cell">
		<div class="pl pl-origami" />
		<div class="pl-name">Loading...</div>
	</div>
</main>

<style>
	/** Container **/
	* {
		border: 0;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	:root {
		font-size: calc(16px + (24 - 16) * (100vw - 320px) / (1920 - 320));
	}
	main {
		display: flex;
		justify-content: center;
		padding-top: 35vh;
	}
	.cell {
		flex-basis: 50%;
		padding: 1.5em;
		color: white;
	}

	/** Global preloader styles **/
	.pl,
	.pl:before,
	.pl:after {
		animation-duration: 2s;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}
	.pl {
		margin: 0 auto 1.5em auto;
		position: relative;
		width: 3em;
		height: 3em;
	}
	.pl:before,
	.pl:after {
		background: currentColor;
		content: "";
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 50%;
		transform-origin: 50% 100%;
		clip-path: polygon(0 0, 100% 0, 50% 100%);
		-webkit-clip-path: polygon(0 0, 100% 0, 50% 100%);
	}
	.pl-name {
		text-align: center;
	}

	/* Origami */
	.pl-origami {
		animation-name: origamiA;
		animation-timing-function: steps(4);
	}
	.pl-origami:before,
	.pl-origami:after {
		clip-path: polygon(50% 0, 100% 100%, 0% 100%);
		-webkit-clip-path: polygon(50% 0, 100% 100%, 0% 100%);
	}
	.pl-origami:before {
		animation-name: origamiB;
	}
	.pl-origami:after {
		animation-name: origamiC;
		transform: rotate(180deg);
	}
	@keyframes origamiA {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(-360deg);
		}
	}
	@keyframes origamiB {
		from,
		25%,
		50%,
		75%,
		to {
			opacity: 1;
			transform: translateZ(0) rotateX(0deg);
		}
		12.5%,
		62.5% {
			opacity: 1;
			transform: translateZ(1px) rotateX(-180deg);
		}
		37.5%,
		87.5% {
			opacity: 0;
			transform: translateZ(0) rotateX(0deg);
		}
	}
	@keyframes origamiC {
		from,
		25%,
		50%,
		75%,
		to {
			opacity: 1;
			transform: translateZ(0) rotateZ(180deg) rotateX(0deg);
		}
		12.5%,
		62.5% {
			opacity: 0;
			transform: translateZ(0) rotateZ(180deg) rotateX(0deg);
		}
		37.5%,
		87.5% {
			opacity: 1;
			transform: translateZ(1px) rotateZ(180deg) rotateX(-180deg);
		}
	}
	.background {
		z-index: -1;
		/* top: 0; */
		/* left: 0; */
		width: 100vw;
		height: 100vh;
		background: #98b2f4;
	}
</style>
