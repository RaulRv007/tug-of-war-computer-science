class Player {
	constructor(x, y, force, velocity, friction, points, sprites, player, animSprite) {
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
		this.animation = 10
		this.player = player
		this.animSprite = animSprite
	}
	draw(){
		image(this.sprites, this.x, this.y, this.width, this.height)
	}
	drawAnimation(){

		image(this.animSprite, this.x, this.y, this.width, this.height);

	}
	move(){
		/*this.x += this.velocity;
		this.velocity *= this.friction
		if (this.velocity < 0.1 && this.velocity > -0.1) {
			this.velocity = 0;
		}*/
		this.x += this.velocity;

	}
	moveRight(factor){
		this.velocity += this.force*factor
	}
	moveLeft(factor){
		this.velocity += -this.force*factor
	}
}
