class Flag{
    constructor(sprites, x, y, force, friction){
        this.sprites = sprites
        this.x = x
        this.y = y
        this.velocity = 0
        this.force = force
        this.flagCounter = 0
        this.friction = friction
        this.width = WIDTH/24
        this.height = this.width
    }
    draw(){
        image(this.sprites[0][this.flagCounter], this.x, this.y, this.width, this.height)
        if (frameCount % 3 === 0) {
          this.flagCounter++;
          if (this.flagCounter == 3) {
            this.flagCounter = 0;
          }
        }
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