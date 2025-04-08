velocity = 0
let x = 0;
let y = 0;
player1 = []
player2 = []

class Player {
	constructor(x, y, force, velocity, friction) {
		this.x = x;
		this.y = y;
		this.width = 50;
		this.height = 50;
		this.color = 'red';
		this.force = force
		this.velocity = velocity;
		this.friction = friction;
	}
	draw(){
		rect(this.x, this.y, this.width, this.height);
		
	}
	move(){
		this.x += this.velocity;
		this.velocity *= this.friction
		if (this.velocity < 0.1 && this.velocity > -0.9) {
			this.velocity = 0;
		}

	}
	moveRight(){
		this.velocity = this.force
	}
	moveLeft(){
		this.velocity = -this.force
	}
}
function setup() {
createCanvas(windowWidth, windowHeight)
background('blue')
player1 = new Player(0, 100, 5, 5, 0.95);
player2 = new Player(100, 100, 5, 5, 0.95);
}

function draw() {
	clear()
	print(velocity)
	player1.draw();
	player2.draw();
	player1.move();
	player2.move();



}

function keyPressed() {
	if (keyCode === 68) {
		player1.moveRight();
	} else if (keyCode === 65) {
		player1.moveLeft();
	}
}


