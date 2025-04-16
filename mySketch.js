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
  BEGINNING: 'begin'
}

let actualState = gameState.IN_GAME
let questionsGenerated = false
let transitionExecuted = false

let chordLength = 300

let widthQuiz = 200
let heightQuiz = 80



function shuffleArray(array) {
  for (let i = array.length - 1; i > 1; i--) {
    const j = Math.floor(Math.random() * (i - 1)) + 1; // random index from 1 to i
    [array[i], array[j]] = [array[j], array[i]];      // swap
  }
  return array;
}
function preload() {
  question = new Questions(11, 'math')

}
function setup() {
  textAlign(CENTER, CENTER)
  createCanvas(windowWidth, windowHeight)
  frameRate(fps)
  player2 = new Player(windowWidth/2 - chordLength/2 - 50, 200, 5, 5, 0.95, 0);
  player1 = new Player(windowWidth/2 + chordLength/2, 200, 5, 5, 0.95, 0);
  mathQuestion1 = new Questions(11, 'math').genQuestions()
  mathQuestion2 = new Questions(11, 'math').genQuestions()
  widthQuiz = (windowWidth/6) + windowWidth/24
  heightQuiz = windowHeight/9
  try {
    multipleChoice2 = new MultipleChoice(mathQuestion1, 0 + widthQuiz, windowHeight - (heightQuiz/2)*5, widthQuiz, heightQuiz)
    multipleChoice2.drawMultipleChoice()
    multipleChoice1 = new MultipleChoice(mathQuestion2, windowWidth - widthQuiz, windowHeight - (heightQuiz/2)*5, widthQuiz, heightQuiz)
    multipleChoice1.drawMultipleChoice()
  } catch (error) {
    mathQuestion1 = new Questions(11, 'math').genQuestions()
    mathQuestion2 = new Questions(11, 'math').genQuestions()
  }


}

function draw() {

  clear()
  background('grey')
  text(player1.points, 10, 20)
  text(player2.points, 40, 20)

  switch (actualState) {
    case gameState.IN_GAME:
      player1.draw();
      player2.draw();

      multipleChoice1.drawMultipleChoice()
      multipleChoice2.drawMultipleChoice()

      if (frameCount % fps == 0) {
        questionTime--
      }
      text(questionTime, 100, 100, 100, 100)

      if (mouseIsPressed && !wasMousePressed) {
        if (multipleChoice1.checkAnswer()) {
          if (multipleChoice1.checkAnswer() == multipleChoice1.question[multipleChoice1.question.length - 1]) {
            print('1 won');
            player1Won = true;
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


          }
        }
      }
      wasMousePressed = mouseIsPressed;

      if (questionTime <= 0) {
        actualState = gameState.TRANSITION
      }
      break;

    case gameState.TRANSITION:
      player1.draw();
      player2.draw();
      player1.move();
      player2.move();

      if (millis() - startTransitionTime <= 3000) {
        if (player1Won) {
          player1.points++
          player1Won = false
          player1.moveRight()
          player2.moveRight()
        } else if (player2Won) {
          player2.points++
          player2Won = false
          player1.moveLeft()
          player2.moveLeft()
        }else{
          if (!transitionExecuted) {
            if (player1.points > player2.points) {
              player1.moveRight();
              player2.moveRight();
            } else if (player2.points > player1.points) {
              player1.moveLeft();
              player2.moveLeft();
            }
            transitionExecuted = true;
          }
        }
      } else if (millis() - startTransitionTime >= 5000) {
        questionTime = 10
        actualState = gameState.IN_GAME
      } else {
        if (!questionsGenerated) {
          mathQuestion1 = new Questions(11, 'math').genQuestions();
          mathQuestion2 = new Questions(11, 'math').genQuestions();
          questionsGenerated = true;
        }
        try {
          multipleChoice2 = new MultipleChoice(mathQuestion1, 0 + widthQuiz, windowHeight - (heightQuiz/2)*5, widthQuiz, heightQuiz)
          multipleChoice2.drawMultipleChoice()
          multipleChoice1 = new MultipleChoice(mathQuestion2, windowWidth - widthQuiz, windowHeight - (heightQuiz/2)*5, widthQuiz, heightQuiz)
          multipleChoice1.drawMultipleChoice()
        } catch (error) {
          mathQuestion1 = new Questions(11, 'math').genQuestions()
          mathQuestion2 = new Questions(11, 'math').genQuestions()
        }

      }
    default:
      break;
  }



}



