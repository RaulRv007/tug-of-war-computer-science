class Player {
	constructor(x, y, force, velocity, friction, points, sprites) {
		this.x = x;
		this.y = y;
		this.width = WIDTH/24;
		this.height = this.width;
		this.color = 'red';
		this.force = force
		this.velocity = velocity;
		this.friction = friction;
		this.sprites = sprites
    this.points = points
	}
	draw(){
		//rect(this.x, this.y, this.width, this.height);
		image(this.sprites[0][0], this.x, this.y)
		
	}
	move(){
		this.x += this.velocity;
		this.velocity *= this.friction
		if (this.velocity < 0.1 && this.velocity > -0.1) {
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
