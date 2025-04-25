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
  WINNING: 'win',
  CUSTOM: 'custom',
  SPINNING: 'spinning',
  EXTRA_QUESTION: 'extra',
  TRANSITION_EXTRA: 'transition_extra'
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
let custom_question

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

let P1Idle
let P1Pulling
let P2Idle
let P2Pulling

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

const animStates = {
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

let separatedForce = 1

let difficultyLevel = 1

let inputField
let inputText
let numberOfQuestions = 50

let spinner
let loopCounter = 0

let roundWinner = 0
let extraWinner = 0

function shuffleArray(array) {
  const question = array[0];
  const choices = array.slice(1, 5); // answers
  const correctAnswer = array[5];   // answer key

  // Fisher-Yates shuffle on the choices only
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }

  return [question, ...choices, correctAnswer];
}


function sliceSpriteSheet(spriteSheet, rows, columns, spriteArray) {
	let w = spriteSheet.width / columns
	let h = spriteSheet.height / rows

	for (let y = 0; y < columns; y++) {
		// create another emoty array for that row
		spriteArray[y] = []
		// there are 12 images in a row, iterate through them
    if(rows == 1){
      for (let x = 0; x <= rows; x++) {
        // get the image subsection there and then stor in the array
        spriteArray[y][x] = spriteSheet.get(x * w, y * h, w, h)
      }
    }else{
      for (let x = 0; x < rows; x++) {
        // get the image subsection there and then stor in the array
        spriteArray[y][x] = spriteSheet.get(x * w, y * h, w, h)
      }
    }
	}
	return spriteArray
}
function preload() {
  question = new Questions(11, 'math')
  grade1_questions_math = loadJSON('./questions/grade1_math_question.json')
  grade2_questions_math = loadJSON('./questions/grade2_math_question.json')
  grade3_questions_math = loadJSON('./questions/grade3_math_question.json')
  grade4_questions_math = loadJSON('./questions/grade4_math_question.json')
  grade5_questions_math = loadJSON('./questions/grade5_math_question.json')
  grade6_questions_math = loadJSON('./questions/grade6_math_question.json')
  grade7_questions_math = loadJSON('./questions/grade7_math_question.json')
  custom_question = loadJSON('./questions/quiz.json')
  characters1SpriteSheet = loadImage('assets/animatedCharacter.png')
  characters2SpriteSheet = loadImage('assets/animatedCharacter1.png')
  flagSpriteSheet = loadImage('assets/rotating_orbs.png')
  background = loadImage('assets/background.png')
  platform = loadImage('assets/platform.png')
  fireBallSpriteSheet = loadImage('assets/fireball.png')
  P1Idle = loadImage('assets/P1Idle.png')
  P2Idle = loadImage('assets/P2Idle.png')
  P1Pulling = loadImage('assets/P1Pulling.png')
  P2Pulling = loadImage('assets/P2Pulling.png')
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

  characters1 = sliceSpriteSheet(characters1SpriteSheet, 1, 9, characters1)
  characters2 = sliceSpriteSheet(characters2SpriteSheet, 1, 9, characters2)
  print(characters1[0])
  flagSprites = sliceSpriteSheet(flagSpriteSheet, 8,4, flagSprites)
  fireBallSprites = sliceSpriteSheet(fireBallSpriteSheet, 16, 6, fireBallSprites)

  textSize(distanceBetweenButtons/3)
}

function mousePressed() {
  if(actualState  == gameState.SPINNING){
    spinner.startSpin(0.25, 20);
  }
}

function draw() {


  clear()
  image(background, windowWidth/2, windowHeight/2)
  if(doneQuestions.length >= numberOfQuestions){
    doneQuestions = []
  }

  let platformHeightAdjusted = (windowWidth - windowWidth / 4) * (290 / platform.width);

  if(platformHeight!=0){
    image(platform, windowWidth / 2, platformHeight, windowWidth - windowWidth / 4, platformHeightAdjusted);
  }
  text(player2.points, 40, 40)
  text(player1.points, windowWidth-40, 40)

  player1.force = 0.5 * windowWidth /1000
  player2.force = 0.6 * windowWidth /1000
  try{
    myFlag.force = 1 *windowWidth/1000 * separatedForce
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
        myButtons.push(new Button('general arithmetic', 500, 100, 350, 30))
        myButtons.push(new Button('addition', 500, 150, 350, 30))
        myButtons.push(new Button('multiplication', 500, 200, 350, 30))
        myButtons.push(new Button('subtraction', 500, 250, 350, 30))
        myButtons.push(new Button('division', 500, 300, 350, 30))
        myButtons.push(new Button('personalised', 500, 600, 350, 30))
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
              if(myGrade == 18){
                numberOfQuestions = Array.isArray(custom_question) ? custom_question.length : Object.keys(custom_question).length;
                print(`number of questions: ${numberOfQuestions}`)
                print(`number of questions: ${custom_question[0].question}`)
              }

              player2 = new Player(windowWidth/2 - chordLength/2, 150, 1.75, 5, 0.95, 0, P1Idle, 2, P1Pulling);
              player1 = new Player(windowWidth/2 + chordLength/2, 150, 1.5, 5, 0.95, 0, P2Idle, 1, P2Pulling);
              if (platformHeight == 0) {
                platformHeight = player2.y + player2.height / 2+ platformHeightAdjusted / 2;
              }
              myFlag = new Flag(flagSprites, windowWidth/2, player1.y, 2.5, 0.95)
              print(grade1_questions_math[15].question)
              mathQuestion1 = new Questions(myGrade, 'math').getQuestions(numberOfQuestions)
              mathQuestion2 = new Questions(myGrade, 'math').getQuestions(numberOfQuestions)
              widthQuiz = (windowWidth/6) + windowWidth/24
              heightQuiz = windowHeight/9
              try {
                multipleChoice2 = new MultipleChoice(mathQuestion1, 0 + widthQuiz, windowHeight - (heightQuiz/2)*5, widthQuiz, heightQuiz)
                multipleChoice2.drawMultipleChoice()
                multipleChoice1 = new MultipleChoice(mathQuestion2, windowWidth - widthQuiz, windowHeight - (heightQuiz/2)*5, widthQuiz, heightQuiz)
                multipleChoice1.drawMultipleChoice()
              } catch (error) {
                mathQuestion1 = new Questions(myGrade, 'math').getQuestions(numberOfQuestions)
                mathQuestion2 = new Questions(myGrade, 'math').getQuestions(numberOfQuestions)
              }
              actualState = gameState.IN_GAME
              
            }
          }
        }
      }
      wasMousePressed = mouseIsPressed
      
      break

    case gameState.CUSTOM:
      
      if (!inputField) {
        // Create a button to submit the input
        inputField = createInput();
        inputField.position(20, 60);
      }
      let submitButton = new Button('submit', windowWidth/2, windowHeight/2, 100, 30)
      submitButton.draw()
      if(submitButton.isPressed()){
        numberOfQuestions = parseInt(inputField.value())
        print(numberOfQuestions)

      }
      if(numberOfQuestions !=0){
        for(let i = 0; i<= numberOfQuestions; i++){

        }
      }


      break

    case gameState.EXTRA_QUESTION:
      if(roundWinner == 1){
        player1.drawAnimation();
        player2.draw();
      }else{
        player2.drawAnimation();
        player1.draw();
      }
      if (!questionsGenerated) {
        mathQuestion1 = new Questions(myGrade, 'math', difficultyLevel++).getQuestions(numberOfQuestions)
        questionsGenerated = true;
      }
      try {
        multipleChoice1 = new MultipleChoice(mathQuestion1, windowWidth/2-widthQuiz/2, windowHeight/2-  heightQuiz/2, widthQuiz, heightQuiz)
        multipleChoice1.drawMultipleChoice()
      } catch (error) {
        mathQuestion1 = new Questions(myGrade, 'math', difficultyLevel++).getQuestions(numberOfQuestions)
      }
      text(`only player ${roundWinner} can answer`, 100, 100)
      if (mouseIsPressed && !wasMousePressed) {
        print('mouse pressed')
        if(roundWinner == 1){
          if (multipleChoice1.checkAnswer()) {
            print(multipleChoice1.question[multipleChoice1.question.length - 1])
            if (multipleChoice1.checkAnswer() == multipleChoice1.question[multipleChoice1.question.length - 1]) {
              extraWinner = 2
              actualState = gameState.TRANSITION_EXTRA
            }else if(multipleChoice1.checkAnswer() != multipleChoice1.question[multipleChoice1.question.length - 1]){
              extraWinner = 1
              actualState = gameState.TRANSITION_EXTRA

            }
          }
        }else{

          if (multipleChoice1.checkAnswer()) {
            print(multipleChoice1.checkAnswer())
            if (multipleChoice1.checkAnswer() == multipleChoice1.question[multipleChoice1.question.length - 1]) {
              extraWinner = 1
              actualState = gameState.TRANSITION_EXTRA

              
            }else if(multipleChoice1.checkAnswer() != multipleChoice1.question[multipleChoice1.question.length - 1]){
              extraWinner = 2
              actualState = gameState.TRANSITION_EXTRA


            }
          }
        }
      }
      wasMousePressed = mouseIsPressed;
      break
    case gameState.IN_GAME:
      transitionExecuted = false
      player1.draw();
      player2.draw();

      multipleChoice1.drawMultipleChoice()
      multipleChoice2.drawMultipleChoice()

      myFlag.draw()
      myFlag.move()

      if (frameCount % fps == 0) {
        questionTime--
      }
      text(questionTime, windowWidth/2 - 50, windowHeight - windowHeight/6, 100, 100)
      rect(windowWidth/2 -50, windowHeight - windowHeight/8, questionTime*10, 10)


      if (mouseIsPressed && !wasMousePressed) {
        if (multipleChoice1.checkAnswer()) {
          if (multipleChoice1.checkAnswer() == multipleChoice1.question[multipleChoice1.question.length - 1]) {
            print('1 won');
            player1Won = true;
            roundWinner = 1
            actualState = gameState.TRANSITION
            startTransitionTime = millis()
            questionsGenerated = false
          }else if(multipleChoice1.checkAnswer() != multipleChoice1.question[multipleChoice1.question.length - 1]){
            player2Won = true
            roundWinner = 2
            actualState = gameState.TRANSITION
            startTransitionTime = millis()
            questionsGenerated = false
          }
        } else if (multipleChoice2.checkAnswer()) {
          if (multipleChoice2.checkAnswer() == multipleChoice2.question[multipleChoice2.question.length - 1]) {
            print('2 won');
            player2Won = true;
            roundWinner = 2
            
            actualState = gameState.TRANSITION
            startTransitionTime = millis()
            questionsGenerated = false
          }else if(multipleChoice2.checkAnswer() != multipleChoice1.question[multipleChoice1.question.length - 1]){
            player1Won = true
            roundWinner = 1
            actualState = gameState.TRANSITION
            startTransitionTime = millis()
            questionsGenerated = false
          }
        }
      }
      spinner = null
      wasMousePressed = mouseIsPressed;

      if (questionTime <= 0) {
        if(player2.points > player1.points){
          player2Won = true
          roundWinner = 2

        }else if(player2.points < player1.points){
          player1Won = true
          roundWinner = 1

        }else{
          lostCountdown = true
          player1Won = false
          player2Won  =false
          separatedForce+=0.4
        }
        startTransitionTime = millis()
        actualState = gameState.TRANSITION

      }
      break;
    case gameState.TRANSITION_EXTRA:
      player1.move()
      player2.move()

      myFlag.draw()
      myFlag.move()
      if(roundWinner == 2){
        player1.draw();
        player2.drawAnimation();
      }else if(roundWinner == 1){
        player2.draw();
        player1.drawAnimation();
      }else{
        player1.draw()
        player2.draw()
      }

      if (!transitionExecuted) {
        
        difficultyLevel += 0.5;
        transitionExecuted = true;
        
      }
      try {
        if (millis() - startTransitionTime <= 7000) {
          print('entra')
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
          if (extraWinner == 2) {
            player1.points += 3
            player1Won = false
            player1.moveRight()
            player2.moveRight()
            player1.move()
            player2.move()
            myFlag.moveRight(2)
/////////////////////////////////////////////////////////////////////
          } else if (extraWinner == 1) {
  
            player2.points += 3
            player2Won = false
            player1.moveLeft()
            player2.moveLeft()
            player1.move()
            player2.move()
            myFlag.moveLeft(2)
/////////////////////////////////////////////////////////////////////
          }
        extraWinner = 0
        } else if (millis() - startTransitionTime >= 5000) {
          questionTime = 10
          spinner = null
          actualState = gameState.IN_GAME
          if (!questionsGenerated) {
            mathQuestion1 = new Questions(myGrade, 'math', difficultyLevel++).getQuestions(numberOfQuestions)
            mathQuestion2 = new Questions(myGrade, 'math', difficultyLevel++).getQuestions(numberOfQuestions)
            questionsGenerated = true;
          }
          try {
            multipleChoice2 = new MultipleChoice(mathQuestion1, 0 + widthQuiz, windowHeight - (heightQuiz/2)*5, widthQuiz, heightQuiz)
            multipleChoice2.drawMultipleChoice()
            multipleChoice1 = new MultipleChoice(mathQuestion2, windowWidth - widthQuiz, windowHeight - (heightQuiz/2)*5, widthQuiz, heightQuiz)
            multipleChoice1.drawMultipleChoice()
          } catch (error) {
            mathQuestion1 = new Questions(myGrade, 'math', difficultyLevel++).getQuestions(numberOfQuestions)
            mathQuestion2 = new Questions(myGrade, 'math', difficultyLevel++).getQuestions(numberOfQuestions)
          }
        } else {
  
        }
      } catch (error) {
        if (millis() - startTransitionTime <= 7000) {
          print('entra')
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
/////////////////////////////////////////////////////////////////////////
          } else if (player2Won) {
  
            player2.points++
            player2Won = false
            player1.moveLeft()
            player2.moveLeft()
            if(spinner){
              if(spinner.selectedPrize.name == 'Double'){
                myFlag.moveLeft(2)
              }else{
                myFlag.moveLeft(1)
              }
            }else{
              myFlag.moveLeft(1)
            }
          }else if(lostCountdown){
            lostCountdown = false
            player1.moveRight()
            player2.moveLeft()
          }
        } else if (millis() - startTransitionTime >= 5000) {
          questionTime = 10
          spinner = null
          actualState = gameState.IN_GAME
        } else {
          if (!questionsGenerated) {
            mathQuestion1 = new Questions(myGrade, 'math', difficultyLevel++).getQuestions(numberOfQuestions)
            mathQuestion2 = new Questions(myGrade, 'math', difficultyLevel++).getQuestions(numberOfQuestions)
            questionsGenerated = true;
          }
          try {
            multipleChoice2 = new MultipleChoice(mathQuestion1, 0 + widthQuiz, windowHeight - (heightQuiz/2)*5, widthQuiz, heightQuiz)
            multipleChoice2.drawMultipleChoice()
            multipleChoice1 = new MultipleChoice(mathQuestion2, windowWidth - widthQuiz, windowHeight - (heightQuiz/2)*5, widthQuiz, heightQuiz)
            multipleChoice1.drawMultipleChoice()
          } catch (error) {
            mathQuestion1 = new Questions(myGrade, 'math', difficultyLevel++).getQuestions(numberOfQuestions)
            mathQuestion2 = new Questions(myGrade, 'math', difficultyLevel++).getQuestions(numberOfQuestions)
          }
  
        }
      }

      break

    case gameState.TRANSITION:

      if(spinner){
        if(!spinner.spinning){
          player1.move()
          player2.move()
        }
      }else{
        player1.move()
        player2.move()
      }

      myFlag.draw()
      myFlag.move()
      if(roundWinner == 2){
        player1.draw();
        player2.drawAnimation();
      }else if(roundWinner == 1){
        player2.draw();
        player1.drawAnimation();
      }else{
        player1.draw()
        player2.draw()
      }

      if (!transitionExecuted) {

          if (loopCounter % 1 === 0) {
            let randomNumber = floor(random(0, 1))
            if (randomNumber == 0) {
              let prizes = [
              new Prize("Double", "#FF5733", 10),
              new Prize("Nothing", "black", 20),
              new Prize("Extra", "#33FF57", 20),
              new Prize("Nothing", "black", 20),
              new Prize("DANCE", "pink", 20),
              new Prize("Nothing", "black", 20),
              new Prize("YELLLL", "blue", 20),
              new Prize("Nothing", "black", 20),
              ];
              
              spinner = new SpinnerWheel(width / 2, windowHeight - windowWidth/8.5, windowWidth/9, prizes);
              spinner.startSpin(0.2, 0.3);
              loopCounter++
            }
          }
        
        difficultyLevel += 0.5;
        transitionExecuted = true;
        
      }
      if(spinner){
        spinner.draw()
        spinner.spin()
        if(spinner.selectedPrize){
          text(spinner.selectedPrize.name, 200, 200)
        }
      }
      try {
        if (millis() - startTransitionTime <= 7000 && !spinner.spinning) {
          print('entra')
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
          if(spinner){
            if(spinner.selectedPrize.name == 'Extra'){
              actualState = gameState.EXTRA_QUESTION
              break
            }
            if(roundWinner == 1){
              if(spinner.selectedPrize.name == 'DANCE'){
                text('Player on the right, DANCE', windowWidth/2, windowHeight/8)
              }else if(spinner.selectedPrize.name == 'YELLLL'){
                text('Player on the right, YELLLL SOMETHING', windowWidth/2, windowHeight/8)
              }
            }else if(roundWinner == 2){
              if(spinner.selectedPrize.name == 'DANCE'){
                text('Player on the left, DANCE', windowWidth/2, windowHeight/8)
              }else if(spinner.selectedPrize.name == 'YELLLL'){
                text('Player on the left, YELLLL SOMETHING', windowWidth/2, windowHeight/8)
              }
            }
          }
          if (player1Won) {
            player1.points++
            player1Won = false
            player1.moveRight()
            player2.moveRight()
            player1.move()
            player2.move()
            if(spinner){
              if(spinner.selectedPrize.name == 'Double'){
                myFlag.moveRight(2)
              }else{
                myFlag.moveRight(1)
              }

            }else{
              myFlag.moveRight(1)
            }
          } else if (player2Won) {
  
            player2.points++
            player2Won = false
            player1.moveLeft()
            player2.moveLeft()
            player1.move()
            player2.move()
            if(spinner){

              if(spinner.selectedPrize.name == 'Double'){
                myFlag.moveLeft(2)

              }else{
                myFlag.moveLeft(1)
              }
            }else{
              myFlag.moveLeft(1)
            }
          }else if(lostCountdown){
            lostCountdown = false
            player1.moveRight()
            player2.moveLeft()
          }
        } else if (millis() - startTransitionTime >= 5000) {
          questionTime = 10
          spinner = null
          actualState = gameState.IN_GAME
          if (!questionsGenerated) {
            mathQuestion1 = new Questions(myGrade, 'math', difficultyLevel).getQuestions(numberOfQuestions)
            mathQuestion2 = new Questions(myGrade, 'math', difficultyLevel).getQuestions(numberOfQuestions)
            questionsGenerated = true;
          }
          try {
            multipleChoice2 = new MultipleChoice(mathQuestion1, 0 + widthQuiz, windowHeight - (heightQuiz/2)*5, widthQuiz, heightQuiz)
            multipleChoice2.drawMultipleChoice()
            multipleChoice1 = new MultipleChoice(mathQuestion2, windowWidth - widthQuiz, windowHeight - (heightQuiz/2)*5, widthQuiz, heightQuiz)
            multipleChoice1.drawMultipleChoice()
          } catch (error) {
            mathQuestion1 = new Questions(myGrade, 'math', difficultyLevel++).getQuestions(numberOfQuestions)
            mathQuestion2 = new Questions(myGrade, 'math', difficultyLevel++).getQuestions(numberOfQuestions)
          }
        } else {
  
        }
      } catch (error) {
        if (millis() - startTransitionTime <= 7000) {
          print('entra')
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
            if(spinner){
              if(spinner.selectedPrize.name == 'Double'){
                myFlag.moveRight(2)
              }else{
                myFlag.moveRight(1)
              }
            }else{
              myFlag.moveRight(1)
            }
          } else if (player2Won) {
  
            player2.points++
            player2Won = false
            player1.moveLeft()
            player2.moveLeft()
            if(spinner){
              if(spinner.selectedPrize.name == 'Double'){
                myFlag.moveLeft(2)
              }else{
                myFlag.moveLeft(1)
              }
            }else{
              myFlag.moveLeft(1)
            }
          }else if(lostCountdown){
            lostCountdown = false
            player1.moveRight()
            player2.moveLeft()
          }
        } else if (millis() - startTransitionTime >= 5000) {
          questionTime = 10
          spinner = null
          actualState = gameState.IN_GAME
          if (!questionsGenerated) {
            mathQuestion1 = new Questions(myGrade, 'math', difficultyLevel++).getQuestions(numberOfQuestions)
            mathQuestion2 = new Questions(myGrade, 'math', difficultyLevel++).getQuestions(numberOfQuestions)
            questionsGenerated = true;
          }
          try {
            multipleChoice2 = new MultipleChoice(mathQuestion1, 0 + widthQuiz, windowHeight - (heightQuiz/2)*5, widthQuiz, heightQuiz)
            multipleChoice2.drawMultipleChoice()
            multipleChoice1 = new MultipleChoice(mathQuestion2, windowWidth - widthQuiz, windowHeight - (heightQuiz/2)*5, widthQuiz, heightQuiz)
            multipleChoice1.drawMultipleChoice()
          } catch (error) {
            mathQuestion1 = new Questions(myGrade, 'math', difficultyLevel++).getQuestions(numberOfQuestions)
            mathQuestion2 = new Questions(myGrade, 'math', difficultyLevel++).getQuestions(numberOfQuestions)
          }
        } else {
  
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
        if(millis()-startTransitionTime > 1010 && animationState!= animStates.GOING_OUT){
          if (animationState === animStates.GOING_UP && fireBallX === 0 && fireBallY === 0) {
            fireBallX = player2.x;
            fireBallY = player2.y + 10;
            fireBallAngle = Math.asin((player1.y - player2.y) / -dist(player1.x, player1.y, fireBallX, fireBallY));
          }
        
          animationState = animStates.SHOOTING
        }
        if(dist(fireBallX, fireBallY, player1.x, player1.y) <= 30){
          animationState = animStates.GOING_OUT
        }
        if(animationState == animStates.GOING_UP){
          player2.y--
        }else if(animationState == animStates.SHOOTING){
          image(fireBallSprites[1][1], fireBallX, fireBallY)
          fireBallX += cos(fireBallAngle)
          fireBallY -= sin(fireBallAngle)
          print(dist(player1.x, player1.y, fireBallX, fireBallY))
          print(`x: ${fireBallX}`)
        }else if(animationState == animStates.GOING_OUT){
          player1.y -= loserVel
          loserVel -= gravity
          player1.x += 7
          
        }
        if(player1.y >= windowHeight){
          actualState = gameState.MAIN_SCREEN
        }
      }
    default:
      break;
  }



}