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

let mathQuestion1 = []
let mathQuestion2 = []

let multipleChoice1 = []
let multipleChoice2 = []

let player1Won = false
let player2Won = false

let wasMousePressed = false

let startTransitionTime = 0

const gameState = {
  MAIN_SCREEN: "main",
  TRANSITION: 'transition',
  PAUSE_SCREEN: 'pause',
  IN_GAME: 'game',
  BEGINNING: 'begin',
  WINNING: 'win'
}

let actualState = gameState.MAIN_SCREEN
let questionsGenerated = false
let transitionExecuted = false

let chordLength = 200

let widthQuiz = 200
let heightQuiz = 80

let grade1_questions_math
let grade2_questions_math
let grade3_questions_math
let grade4_questions_math
let grade5_questions_math
let grade6_questions_math
let grade7_questions_math
let grade8_questions_math
let grade9_questions_math
let grade10_questions_math
let grade11_questions_math
let grade12_questions_math

let doneQuestions = []

let WIDTH = 0
let HEIGHT = 0

let characters1SpriteSheet
let characters1 = []
let characters2SpriteSheet
let characters2 = []
let flagSpriteSheet
let flagSprites = []
let flagCounter = 0
let background
let platform

let flagX = 0
let flagY = 0

let myFlag

let winner = 0

let distanceBetweenButtons = 50

let lostCountdown = false

let myButtons = []

let myGrade = 1

let fireBallSpriteSheet
let fireBallSprites = []
let fireBallX = 0
let fireBallY = 0
let fireBallAngle = 0
let platformHeight = 0
let gravity = 0.1
let loserVel = 5
let loserTouched = false

let animStates = {
  GOING_UP: 'up',
  SHOOTING: 'shooting',
  GOING_OUT: 'out'
}
let animationState

let loserAngle = 0

let animationPlayer
let loserX
let loserY

let myFont

const ratioILike = 1227/650

function shuffleArray(array) {
  for (let i = array.length - 1; i > 1; i--) {
    const j = Math.floor(Math.random() * (i - 1)) + 1; // random index from 1 to i
    [array[i], array[j]] = [array[j], array[i]];      // swap
  }
  return array;
}

function sliceSpriteSheet(spriteSheet, rows, columns, spriteArray) {
	let w = spriteSheet.width / columns
	let h = spriteSheet.height / rows

	for (let y = 0; y < columns; y++) {
		// create another emoty array for that row
		spriteArray[y] = []
		// there are 12 images in a row, iterate through them
		for (let x = 0; x < rows; x++) {
			// get the image subsection there and then stor in the array
			spriteArray[y][x] = spriteSheet.get(x * w, y * h, w, h)
		}
	}
	return spriteArray
}
function preload() {
  question = new Questions(11, 'math')
  grade1_questions_math = loadJSON('./questions/grade1_math_question.json')
  grade2_questions_math = loadJSON('./questions/grade2_math_question.json')
  grade3_questions_math = loadJSON('./questions/grade3_math_question.json')
  characters1SpriteSheet = loadImage('assets/characters.png')
  characters2SpriteSheet = loadImage('assets/charactersP2.png')
  flagSpriteSheet = loadImage('assets/rotating_orbs.png')
  background = loadImage('assets/background.png')
  platform = loadImage('assets/platform.png')
  fireBallSpriteSheet = loadImage('assets/fireball.png')
  myFont = loadFont('assets/dogica.ttf')

}
function setup() {
  WIDTH = windowWidth
  HEIGHT = windowHeight
  textAlign(CENTER, CENTER)
  imageMode(CENTER)
  createCanvas(windowWidth, windowHeight)
  frameRate(fps)
  textFont(myFont)
  chordLength = windowWidth/4

  characters1 = sliceSpriteSheet(characters1SpriteSheet, 3, 4, characters1)
  characters2 = sliceSpriteSheet(characters2SpriteSheet, 3, 4, characters2)
  flagSprites = sliceSpriteSheet(flagSpriteSheet, 8,4, flagSprites)
  fireBallSprites = sliceSpriteSheet(fireBallSpriteSheet, 16, 6, fireBallSprites)

  textSize(distanceBetweenButtons/3)
  platformHeight = player1.y + 40
}

function draw() {

  clear()
  image(background, windowWidth/2, windowHeight/2)

  let platformHeightAdjusted = (windowWidth - windowWidth / 4) * (290 / platform.width);
  image(platform, windowWidth / 2, player1.y + player1.height/2 + platformHeightAdjusted / 2, windowWidth - windowWidth / 4, platformHeightAdjusted);
  text(player2.points, 40, 40)
  text(player1.points, windowWidth-40, 40)

  player1.force = 1.5 / windowWidth *1000
  player2.force = 1.75 / windowWidth *1000
  try{
    myFlag.force = 2.5 / windowWidth*1000
  }catch(e){
    print('no')
  }

  //rect(windowWidth/24, windowHeight/2, windowWidth - 2*(windowWidth/24), 50)
  switch (actualState) {
    case gameState.MAIN_SCREEN:
      if (myButtons.length === 0) {
        for (let i = 1; i <= 12; i++) {
          myButtons.push(new Button(`grade ${i}`, 100, distanceBetweenButtons * i, 140, 30));
        }
      }
      loserVel = 5
      fireBallAngle = 0
      fireBallX = 0
      fireBallY = 0
      for(button of myButtons){
        button.draw()
      }
      if (mouseIsPressed && !wasMousePressed) {
        if(mouseIsPressed){
          for(button of myButtons){
            print(`${myButtons.indexOf(button) + 1}: ${button.isPressed()}`)
            if(button.isPressed()){
              myGrade = myButtons.indexOf(button) + 1
              print(myGrade)

              player2 = new Player(windowWidth/2 - chordLength/2, 200, 1.75, 5, 0.95, 0, characters1);
              player1 = new Player(windowWidth/2 + chordLength/2, 200, 1.5, 5, 0.95, 0, characters2);
              myFlag = new Flag(flagSprites, windowWidth/2, player1.y, 2.5, 0.95)
              print(grade1_questions_math[15].question)
              mathQuestion1 = new Questions(myGrade, 'math').getQuestions()
              mathQuestion2 = new Questions(myGrade, 'math').getQuestions()
              widthQuiz = (windowWidth/6) + windowWidth/24
              heightQuiz = windowHeight/9
              try {
                multipleChoice2 = new MultipleChoice(mathQuestion1, 0 + widthQuiz, windowHeight - (heightQuiz/2)*5, widthQuiz, heightQuiz)
                multipleChoice2.drawMultipleChoice()
                multipleChoice1 = new MultipleChoice(mathQuestion2, windowWidth - widthQuiz, windowHeight - (heightQuiz/2)*5, widthQuiz, heightQuiz)
                multipleChoice1.drawMultipleChoice()
              } catch (error) {
                mathQuestion1 = new Questions(myGrade, 'math').getQuestions()
                mathQuestion2 = new Questions(myGrade, 'math').getQuestions()
              }
              platformHeight = player1.y + 40
              actualState = gameState.IN_GAME
              
            }
          }
        }
      }
      wasMousePressed = mouseIsPressed
      
      break
    case gameState.IN_GAME:
      player1.draw();
      player2.draw();

      multipleChoice1.drawMultipleChoice()
      multipleChoice2.drawMultipleChoice()

      myFlag.draw()
      myFlag.move()

      if (frameCount % fps == 0) {
        questionTime--
      }
      text(questionTime, windowWidth/2 - 50, 50, 100, 100)
      rect(windowWidth/2 -50, 150, questionTime*10, 10)


      if (mouseIsPressed && !wasMousePressed) {
        if (multipleChoice1.checkAnswer()) {
          if (multipleChoice1.checkAnswer() == multipleChoice1.question[multipleChoice1.question.length - 1]) {
            print('1 won');
            player1Won = true;
            actualState = gameState.TRANSITION
            startTransitionTime = millis()
            questionsGenerated = false
          }else if(multipleChoice1.checkAnswer() != multipleChoice1.question[multipleChoice1.question.length - 1]){
            player2Won = true
            actualState = gameState.TRANSITION
            startTransitionTime = millis()
            questionsGenerated = false
          }
        } else if (multipleChoice2.checkAnswer()) {
          if (multipleChoice2.checkAnswer() == multipleChoice2.question[multipleChoice2.question.length - 1]) {
            print('2 won');
            player2Won = true;
            actualState = gameState.TRANSITION
            startTransitionTime = millis()
            questionsGenerated = false
          }else if(multipleChoice2.checkAnswer() != multipleChoice1.question[multipleChoice1.question.length - 1]){
            player1Won = true
            actualState = gameState.TRANSITION
            startTransitionTime = millis()
            questionsGenerated = false
          }
        }
      }
      wasMousePressed = mouseIsPressed;

      if (questionTime <= 0) {
        if(player2.points > player1.points){
          player2Won = true
        }else if(player2.points < player1.points){
          player1Won = true
        }else{
          lostCountdown = true
          player1Won = false
          player2Won  =false
        }
        startTransitionTime = millis()
        actualState = gameState.TRANSITION

      }
      break;

    case gameState.TRANSITION:
      player1.draw();
      player2.draw();
      player1.move();
      player2.move();

      myFlag.draw()
      myFlag.move()

      if (millis() - startTransitionTime <= 3000) {
        if(dist(myFlag.x, myFlag.y, player2.x, player2.y) <= 5){
          winner = 2
          actualState = gameState.WINNING
          animationState = animStates.GOING_UP
          startTransitionTime = millis()
          break
        }else if(dist(myFlag.x, myFlag.y, player1.x, player1.y) <= 5){
          winner = 1
          actualState = gameState.WINNING
          animationState = animStates.GOING_UP
          startTransitionTime = millis()

          break
        }
        if (player1Won) {
          player1.points++
          player1Won = false
          player1.moveRight()
          player2.moveRight()
          myFlag.moveRight()
        } else if (player2Won) {
          player2.points++
          player2Won = false
          player1.moveLeft()
          player2.moveLeft()
          myFlag.moveLeft()
        }else if(lostCountdown){
          lostCountdown = false
          player1.moveRight()
          player2.moveLeft()
        }
      } else if (millis() - startTransitionTime >= 5000) {
        questionTime = 10
        actualState = gameState.IN_GAME
      } else {
        if (!questionsGenerated) {
          mathQuestion1 = new Questions(myGrade, 'math').getQuestions()
          mathQuestion2 = new Questions(myGrade, 'math').getQuestions()
          questionsGenerated = true;
        }
        try {
          multipleChoice2 = new MultipleChoice(mathQuestion1, 0 + widthQuiz, windowHeight - (heightQuiz/2)*5, widthQuiz, heightQuiz)
          multipleChoice2.drawMultipleChoice()
          multipleChoice1 = new MultipleChoice(mathQuestion2, windowWidth - widthQuiz, windowHeight - (heightQuiz/2)*5, widthQuiz, heightQuiz)
          multipleChoice1.drawMultipleChoice()
        } catch (error) {
          mathQuestion1 = new Questions(myGrade, 'math').getQuestions()
          mathQuestion2 = new Questions(myGrade, 'math').getQuestions()
        }

      }
      break
    case gameState.WINNING:
      player1.draw();
      player2.draw();
      player1.move();
      player2.move();
      if(winner == 1){
        text('player1 won', 100, 100)
        if(millis()-startTransitionTime <= 1000){

        }
        if(millis()-startTransitionTime > 1010 && animationState!= animStates.GOING_OUT){
          if (animationState === animStates.GOING_UP && fireBallX === 0 && fireBallY === 0) {
            fireBallX = player1.x;
            fireBallY = player1.y + 10;
            fireBallAngle = Math.asin((player1.y - player2.y) / -dist(player2.x, player2.y, fireBallX, fireBallY));
          }
        
          animationState = animStates.SHOOTING
        }
        if(dist(fireBallX, fireBallY, player2.x, player2.y) <= 30){
          animationState = animStates.GOING_OUT
        }
        if(animationState == animStates.GOING_UP){
          player1.y--
        }else if(animationState == animStates.SHOOTING){
          image(fireBallSprites[1][1], fireBallX, fireBallY)
          fireBallX -= cos(fireBallAngle)
          fireBallY += sin(fireBallAngle)
          print(dist(player2.x, player2.y, fireBallX, fireBallY))
          print(`x: ${fireBallX}`)
        }else if(animationState == animStates.GOING_OUT){
          player2.y -= loserVel
          loserVel -= gravity
          player2.x -= 7
          
        }
        if(player2.y >= windowHeight){
          actualState = gameState.MAIN_SCREEN
        }
      }else if(winner ==2){
        text('player2 won', 100, 100)
        if(millis()-startTransitionTime <= 1000){
          player2.y++
        }
      }
    default:
      break;
  }



}



