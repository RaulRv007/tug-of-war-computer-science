class Player {
	constructor(x, y, force, velocity, friction, points) {
		this.x = x;
		this.y = y;
		this.width = 50;
		this.height = 50;
		this.color = 'red';
		this.force = force
		this.velocity = velocity;
		this.friction = friction;
    this.points = points
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
