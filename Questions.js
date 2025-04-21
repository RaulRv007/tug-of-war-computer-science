class Questions {
  constructor(grade, subject) {
    this.grade = grade
    this.subject = subject
    this.index = floor(random(0, 50))
  }
  getQuestions() {
    let myQuestion

    do {
      this.index = floor(random(0, 50))
    } while (doneQuestions.includes(this.index))

    doneQuestions.push(this.index)

    switch (this.grade) {
      case 1:
        myQuestion = [grade1_questions_math[this.index].question,
        grade1_questions_math[this.index].correct_answer,
        grade1_questions_math[this.index].incorrect_answer_1,
        grade1_questions_math[this.index].incorrect_answer_2,
        grade1_questions_math[this.index].incorrect_answer_3,
        ]

        myQuestion = shuffleArray(myQuestion)
        myQuestion.push(grade1_questions_math[this.index].correct_answer)
        return myQuestion
        break;
      case 2:
        myQuestion = [grade2_questions_math[this.index].question,
        grade2_questions_math[this.index].correct_answer,
        grade2_questions_math[this.index].incorrect_answer_1,
        grade2_questions_math[this.index].incorrect_answer_2,
        grade2_questions_math[this.index].incorrect_answer_3,
        ]

        myQuestion = shuffleArray(myQuestion)
        myQuestion.push(grade2_questions_math[this.index].correct_answer)
        return myQuestion
        break;
      case 3:
        myQuestion = [grade3_questions_math[this.index].question,
        grade3_questions_math[this.index].correct_answer,
        grade3_questions_math[this.index].incorrect_answer_1,
        grade3_questions_math[this.index].incorrect_answer_2,
        grade3_questions_math[this.index].incorrect_answer_3,
        ]

        myQuestion = shuffleArray(myQuestion)
        myQuestion.push(grade3_questions_math[this.index].correct_answer)
        return myQuestion
        break;
      case 4:
        myQuestion = [grade4_questions_math[this.index].question,
        grade4_questions_math[this.index].correct_answer,
        grade4_questions_math[this.index].incorrect_answer_1,
        grade4_questions_math[this.index].incorrect_answer_2,
        grade4_questions_math[this.index].incorrect_answer_3,
        ]

        myQuestion = shuffleArray(myQuestion)
        myQuestion.push(grade4_questions_math[this.index].correct_answer)
        return myQuestion
        break;
      case 5:
        myQuestion = [grade5_questions_math[this.index].question,
        grade5_questions_math[this.index].correct_answer,
        grade5_questions_math[this.index].incorrect_answer_1,
        grade5_questions_math[this.index].incorrect_answer_2,
        grade5_questions_math[this.index].incorrect_answer_3,
        ]

        myQuestion = shuffleArray(myQuestion)
        myQuestion.push(grade5_questions_math[this.index].correct_answer)
        return myQuestion
        break;
      default:
        break;
    }
  }
  genQuestions() {
    let myQuestion = []
    if (this.subject == 'math') {
      let randomKind = floor(random(0, 3.99))
      if (randomKind == 0) {
        let a = floor(random(0, 100))
        let b = floor(random(0, 100))
        let answer = a + b
        let anotherOption = floor(random(0, 100))
        let another1Option = floor(random(0, 100))
        let another2Option = floor(random(0, 100))
        if (another1Option == answer || another2Option == answer || anotherOption == answer) {
          let anotherOption = floor(random(0, 100))
          let another1Option = floor(random(0, 100))
          let another2Option = floor(random(0, 100))
        } else {
          myQuestion.push(`${a} + ${b}`)
          myQuestion.push(answer)
          myQuestion.push(another1Option)
          myQuestion.push(another2Option)
          myQuestion.push(anotherOption)
          myQuestion = shuffleArray(myQuestion)
          myQuestion.push(answer)

        }

      } else if (randomKind == 1) {
        let a = floor(random(0, 100))
        let b = floor(random(0, 100))
        let answer = a * b
        let anotherOption = floor(random(0, 300))
        let another1Option = floor(random(0, 100))
        let another2Option = floor(random(0, 500))
        if (another1Option == answer || another2Option == answer || anotherOption == answer) {
          let anotherOption = floor(random(0, 100))
          let another1Option = floor(random(0, 100))
          let another2Option = floor(random(0, 100))
        } else {
          myQuestion.push(`${a} * ${b}`)
          myQuestion.push(answer)
          myQuestion.push(another1Option)
          myQuestion.push(another2Option)
          myQuestion.push(anotherOption)
          myQuestion = shuffleArray(myQuestion)
          myQuestion.push(answer)

        }

      } else if (randomKind == 2) {
        let a = floor(random(0, 100))
        let b = floor(random(0, 100))
        let answer = a - b
        let anotherOption = floor(random(-100, 100))
        let another1Option = floor(random(-100, 100))
        let another2Option = floor(random(0, 100))
        if (another1Option == answer || another2Option == answer || anotherOption == answer) {
          let anotherOption = floor(random(0, 100))
          let another1Option = floor(random(0, 100))
          let another2Option = floor(random(0, 100))
        } else {
          myQuestion.push(`${a} - ${b}`)
          myQuestion.push(answer)
          myQuestion.push(another1Option)
          myQuestion.push(another2Option)
          myQuestion.push(anotherOption)
          myQuestion = shuffleArray(myQuestion)
          myQuestion.push(answer)

        }

      } else if (randomKind == 3) {
        let a = floor(random(1, 100))
        let b = floor(random(1, 100))
        let answer = a / b
        answer *= answer * 10
        answer = round(answer)
        answer = answer / 10
        let anotherOption = floor(random(0, 100))
        let another1Option = floor(random(0, 100))
        let another2Option = floor(random(0, 100))
        if (another1Option == answer || another2Option == answer || anotherOption == answer) {
          let anotherOption = floor(random(0, 100))
          let another1Option = floor(random(0, 100))
          let another2Option = floor(random(0, 100))
        } else {
          myQuestion.push(`${a} / ${b}`)
          myQuestion.push(answer)
          myQuestion.push(another1Option)
          myQuestion.push(another2Option)
          myQuestion.push(anotherOption)
          myQuestion = shuffleArray(myQuestion)
          myQuestion.push(answer)
        }

      }
      return myQuestion
    }
  }
}