/*let velocity = 0;
let { Vec2D, Rect } = toxi.geom;
let { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
let { GravityBehavior } = toxi.physics2d.behaviors;

let physics;

let particles = [];

let beginX = 100
let beginY = 100

let lastMoved = ''

let chordLength = 150

let netForce = 0
let vel1 = 0
let vel2 = 0

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Creating a toxiclibs Verlet physics world
  physics = new VerletPhysics2D();
  physics.setWorldBounds(new Rect(0, 0, width, height));
  physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));

  let spacing = 5;
  let total = 10;
  for (let i = 0; i < total; i++) {
    let particle = new Particle(beginX + i * spacing, beginY, 16);
    physics.addParticle(particle);
    particles.push(particle);
  }

  for (let i = 0; i < total - 1; i++) {
    let spring = new VerletSpring2D(
      particles[i],
      particles[i + 1],
      spacing,
      0.2
    );
    physics.addSpring(spring);
  }

  particles[0].lock();
  particles[particles.length - 1].lock();


}

function draw() {
  //{!1} Must update the physics
  physics.update();

  background(255);

  stroke(0);
  noFill();
  beginShape();
  for (let particle of particles) {
    //{!1} Each particle is one point in the line.
    vertex(particle.x, particle.y);
  }
  endShape();

  particles[particles.length - 1].show();
  
    if(netForce > 0){
      particles[particles.length - 1].x += 0.25
      lastMoved = 'end'
    }else if(netForce < 0){
      lastMoved = 'begin'
      particles[0].x -= 0.25
    }

  if(particles[particles.length - 1].x - particles[0].x > chordLength){
    if(lastMoved == 'end'){
      particles[0].x += 0.25
    }else if(lastMoved == 'begin'){
      particles[particles.length - 1].x -= 0.25
    }
  }else if(particles[particles.length - 1].x - particles[0].x < -chordLength){
    if(lastMoved == 'end'){
      particles[0].x -= 0.25
    }else if(lastMoved == 'begin'){
      particles[particles.length - 1].x += 0.25
    }
  }
  print(particles[particles.length - 1].x - particles[0].x)
  if(keyIsPressed){
    if (keyCode === 68) {
      lastMoved = 'begin'
      particles[0].x += 20;

    } else if (keyCode === 65) {
      lastMoved = 'begin'
      particles[0].x -= 20;
    } else if (keyCode === 39) {
      lastMoved = 'end'
      particles[particles.length - 1].x += 20;
    }else if (keyCode === 37) {
      lastMoved = 'end'
      particles[particles.length - 1].x -= 20;
    }


  }
}

// How cute is this simple Particle class?!
class Particle extends VerletParticle2D {
  constructor(x, y, r) {
    super(x, y);
    this.r = r;
  }

  show() {
    fill(127);
    stroke(0);
    circle(this.x, this.y, this.r * 2);
  }
}
function keyPressed() {
	if (keyCode === 68) {
		vel1 = 10
	} else if (keyCode === 65) {
    vel2 = 10
	}

  if(keyCode === 76){
    netForce += 0.5
    
  }else if(keyCode === 75){
    netForce -= 0.5
  }
}*/
