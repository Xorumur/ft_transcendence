export let gameInfo = {
	canvasWidth: 500,
	canvasHeight: 900,
	width: 500,
	height: 900,
	border: 5,
	score: {
		p1: 0,
		p2: 0
	}
	// player_height: width / 5,
	// player_width: 10,
}

export class paddle {
	constructor(game, isPlayer1) {
		this.player_height = game.width / 5;
		this.player_width = 10;
		this.x = game.width / 2 - this.player_height / 2
		this.y = isPlayer1 ? 10 : game.height - 10 - this.player_width
		this.speed = 5;
	}

	reset(game, isPlayer1) {
		this.player_height = game.width / 5;
		this.player_width = 10;
		this.x = game.width / 2 - this.player_height / 2
		this.y = isPlayer1 ? 10 : game.height - 10 - this.player_width
		this.speed = 5;
	}

	draw(context) {
		context.fillStyle = "hsl(201, 100%, 96%)";
		context.fillRect(
			this.x,
			this.y,
			this.player_height,
			this.player_width
		);
	}
}

export class ball {
	constructor(game, x_vel, y_vel) {
		this.x = game.width / 2;
		this.y = game.height / 2;
		this.radius = 10;
		this.x_vel = x_vel;
		this.y_vel = y_vel;
	}

	reset(game, x_vel, y_vel) {
		this.x = game.width / 2;
		this.y = game.height / 2;
		this.radius = 10;
		this.x_vel = x_vel;
		this.y_vel = y_vel;
	}

	update() {
		this.x += this.x_vel;
		this.y += this.y_vel;
	}

	newCollision(new_x_vel, new_y_vel) {
		this.x_vel = new_x_vel;
		this.y_vel = new_y_vel;
	}

	draw(context) {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		context.fill();
	}
}