class SpinnerWheel {
  constructor(x, y, radius, prizes, friction = 0.95, pointerK = 0.8) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.prizes = prizes;
    this.friction = friction;
    this.pointerK = pointerK;

    this.angle = 0;
    this.angularVelocity = 0;
    this.spinning = false;
    this.selectedPrize = "";
    this.pointerAngle = 0.01;
    this.previousSection = 0;
  }

  draw() {
    push();
    translate(this.x, this.y);
    let sliceAngle = TWO_PI / this.prizes.length;
    for (let i = 0; i < this.prizes.length; i++) {
      let startAngle = this.angle + i * sliceAngle;
      let endAngle = startAngle + sliceAngle;

      fill(this.prizes[i].color);
      arc(0, 0, this.radius * 2, this.radius * 2, startAngle, endAngle, PIE);

      // Draw prize name
      push();
      rotate(startAngle + sliceAngle / 2);
      fill(255);
      text(this.prizes[i].name, this.radius * 0.6, 0);
      pop();
    }
    pop();
    this.drawPointer();
  }

  spin() {
    if (!this.spinning) return;
    this.selectedPrize = "";
    this.angle += this.angularVelocity;
    this.angularVelocity *= this.friction;

    if (this.angularVelocity < 0.01) {
      this.spinning = false;
      this.angularVelocity = 0;

      let sliceAngle = TWO_PI / this.prizes.length;
      let normalizedAngle = (TWO_PI - (this.angle % TWO_PI)) % TWO_PI;
      let index = floor(normalizedAngle / sliceAngle);
      this.selectedPrize = this.prizes[index];
      //this.displayResult();
    }
  }

  displayResult() {
    if (this.selectedPrize) {
      push();
      translate(this.x, this.y + this.radius + 50);
      fill(0);
      textSize(20);
      text("Selected: " + this.selectedPrize.name, 0, 0);
      pop();
    }
  }

  drawPointer() {
    push();
    translate(this.x + this.radius, this.y);
    if (this.spinning) {
      rotate(this.pointerAngle);

      let sliceAngle = TWO_PI / this.prizes.length;
      let normalizedAngle = (TWO_PI - (this.angle % TWO_PI)) % TWO_PI;
      let section = floor(normalizedAngle / sliceAngle);
      if (section !== this.previousSection) {
        this.pointerAngle = -PI / 4;
      }
      this.pointerAngle *= this.pointerK;
      this.previousSection = section;
    }

    fill('red');
    triangle(-10, 0, 10, -10, 10, 10);
    pop();
  }

  startSpin(minVel, maxVel) {
    if (!this.spinning) {
      this.angularVelocity = random(minVel, maxVel);
      this.spinning = true;
    }
  }
}
