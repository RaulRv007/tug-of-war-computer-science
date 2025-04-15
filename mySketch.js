velocity = 0
let x = 0;
let y = 0;
player1 = []
player2 = []

let grade11_math = []

let questionTime = 10
let fps = 60

let question = []
let questionID = 0

let mathQuestion = []

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

class Questions{
  constructor(grade, subject){
    this.grade = grade
    this.subject = subject
  }
  getQuestions(){
    if(this.grade == 11){
      return loadJSON('questions/grade11_math_questions.json')
    }
  }
  genQuestions(){
    let myQuestion = []
    if(this.subject == 'math'){
      let randomKind = floor(random(0, 3))
      if(randomKind == 0){
        let a = floor(random(0, 100))
        let b = floor(random(0, 100))
        let answer = a+b
        let anotherOption = floor(random(0, 100))
        let another1Option = floor(random(0, 100))
        let another2Option = floor(random(0, 100))
        if(another1Option == answer || another2Option == answer || anotherOption == answer){
          let anotherOption = floor(random(0, 100))
          let another1Option = floor(random(0, 100))
          let another2Option = floor(random(0, 100))
        }else{
          myQuestion.push(`${a} + ${b}`)
          myQuestion.push(answer)
          myQuestion.push(another1Option)
          myQuestion.push(another2Option)
          myQuestion.push(anotherOption)
          myQuestion = shuffleArray(myQuestion)
        }
        return myQuestion
        
      }
    }
  }
}
class MultipleChoice{
  constructor(question, x, y, sizeX, sizeY){
    this.question = question
    this.x = x
    this.y = y
    this.sizeX = sizeX
    this.sizeY = sizeY

  }
  drawMultipleChoice(){
    textSize(this.sizeY/2)
    rect(this.x, this.y + this.sizeY/2, this.sizeX, this.sizeY)
    rect(this.x - this.sizeX, this.y - this.sizeY/2, this.sizeX*2, this.sizeY)
    rect(this.x, this.y + this.sizeY*3/2, this.sizeX, this.sizeY)
    rect(this.x - this.sizeX, this.y + this.sizeY*3/2, this.sizeX, this.sizeY)
    rect(this.x - this.sizeX, this.y + this.sizeY/2, this.sizeX, this.sizeY)
    text(this.question[0], this.x, this.y)
    text(this.question[1], this.x + this.sizeX/2, this.y + this.sizeY)
    text(this.question[2], this.x - this.sizeX/2, this.y + this.sizeY)
    text(this.question[3], this.x - this.sizeX/2, this.y + this.sizeY*2)
    text(this.question[4], this.x+ this.sizeX/2, this.y + this.sizeY*2)
  }
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 1; i--) {
    const j = Math.floor(Math.random() * (i - 1)) + 1; // random index from 1 to i
    [array[i], array[j]] = [array[j], array[i]];      // swap
  }
  return array;
}
function preload(){
  question = new Questions(11, 'math')

}
function setup() {
  textAlign(CENTER, CENTER)
  createCanvas(windowWidth, windowHeight)
  background('blue')
  frameRate(fps)
  player1 = new Player(0, 100, 5, 5, 0.95);
  player2 = new Player(100, 100, 5, 5, 0.95);
  mathQuestion = new Questions(11, 'math').genQuestions()
  print(mathQuestion)
  
}

function draw() {
  clear()
	print(velocity)
	player1.draw();
	player2.draw();
	player1.move();
	player2.move();
  if(frameCount%fps == 0){
    questionTime--
  }
  text(questionTime, 100, 100, 100, 100)
  try{
    multipleChoice = new MultipleChoice(mathQuestion, 200, 300, 100, 60)
    multipleChoice.drawMultipleChoice()
  }catch(error){
    mathQuestion = new Questions(11, 'math').genQuestions()
  }

  if(questionTime <= 0){
    questionTime = 10
  }


}

function keyPressed() {
	if (keyCode === 68) {
		player1.moveRight();
	} else if (keyCode === 65) {
		player1.moveLeft();
	} else if(keyCode ===32){
    multipleChoice.drawMultipleChoice()
  }
}

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
