class Questions {
  constructor(grade, subject, difficultyLevel) {
    this.grade = grade
    this.subject = subject
    this.index = floor(random(0, 50))
    this.difficultyLevel = difficultyLevel
  }
  getRangeByDifficulty(level) {
    switch(level) {
      case 1: return [0, 10];
      case 2: return [10, 50];
      case 3: return [50, 100];
      case 4: return [100, 500];
      case 5: return [500, 1000];
      default: return [0, 100];
    }
  }
  generateDistractors(correctAnswer, range = 10, allowDecimals = false) {
    let options = new Set();
  
    while (options.size < 3) {
      let offset = random(-range, range);
  
      // Slightly nudge with randomness to avoid always being symmetric
      offset += random(-1, 1);
  
      let option = allowDecimals
        ? Math.round((correctAnswer + offset + random(-0.5, 0.5)) * 10) / 10
        : Math.floor(correctAnswer + offset);
  
      if (option !== correctAnswer && !options.has(option)) {
        options.add(option);
      }
    }
  
    return Array.from(options);
  }
  getQuestions(numberOfQuestions) {
    let myQuestion

    do {
      this.index = floor(random(0, numberOfQuestions))
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
      case 6:
        myQuestion = [grade6_questions_math[this.index].question,
        grade6_questions_math[this.index].correct_answer,
        grade6_questions_math[this.index].incorrect_answer_1,
        grade6_questions_math[this.index].incorrect_answer_2,
        grade6_questions_math[this.index].incorrect_answer_3,
        ]

        myQuestion = shuffleArray(myQuestion)
        myQuestion.push(grade6_questions_math[this.index].correct_answer)
        return myQuestion
        break;
      case 7:
        myQuestion = [grade7_questions_math[this.index].question,
        grade7_questions_math[this.index].correct_answer,
        grade7_questions_math[this.index].incorrect_answer_1,
        grade7_questions_math[this.index].incorrect_answer_2,
        grade7_questions_math[this.index].incorrect_answer_3,
        ]

        myQuestion = shuffleArray(myQuestion)
        myQuestion.push(grade7_questions_math[this.index].correct_answer)
        return myQuestion
        break;
      case 13:
        return this.genQuestions(true, 0)
      case 14:
        return this.genQuestions(false, 0)
      case 15:
        return this.genQuestions(false, 1)
      case 16:
        return this.genQuestions(false, 2)
      case 17:
        return this.genQuestions(false, 3)
      case 18:
        myQuestion = [custom_question[this.index].question,
        custom_question[this.index].correct_answer,
        custom_question[this.index].incorrect_answer_1,
        custom_question[this.index].incorrect_answer_2,
        custom_question[this.index].incorrect_answer_3,
        ]

        myQuestion = shuffleArray(myQuestion)
        myQuestion.push(custom_question[this.index].correct_answer)
        return myQuestion
        break
      default:
        break;
    }
  }

  genQuestions(isRandom, randomKind) {
    let myQuestion = []

    if(isRandom){
      randomKind = floor(random(0, 3.99))
    }
    if (this.subject == 'math') {
      if (randomKind == 0) {
        let [min, max] = this.getRangeByDifficulty(this.difficultyLevel);
        let a = floor(random(min, max));
        let b = floor(random(min, max));
        let questionStr, answer;
      
        if (this.difficultyLevel >= 4) {
          let c = floor(random(min, max));
          answer = a + b + c;
          questionStr = `(${a} + ${b}) + ${c}`;
        } else {
          answer = a + b;
          questionStr = `${a} + ${b}`;
        }
      
        let distractors = this.generateDistractors(answer);
        myQuestion.push(questionStr, answer, ...distractors);
        myQuestion = shuffleArray(myQuestion);
        myQuestion.push(answer);
      }
      
      else if (randomKind == 1) {
        let [min, max] = this.getRangeByDifficulty(this.difficultyLevel);
        let a = floor(random(min, max));
        let b = floor(random(min, max));
        let questionStr, answer;
      
        if (this.difficultyLevel >= 4) {
          let c = floor(random(min, max));
          answer = a * b * c;
          questionStr = `(${a} * ${b}) * ${c}`;
        } else {
          answer = a * b;
          questionStr = `${a} * ${b}`;
        }
      
        let distractors = this.generateDistractors(answer);
        myQuestion.push(questionStr, answer, ...distractors);
        myQuestion = shuffleArray(myQuestion);
        myQuestion.push(answer);
      }
      
      else if (randomKind == 2) {
        let [min, max] = this.getRangeByDifficulty(this.difficultyLevel);
        let a = floor(random(min, max));
        let b = floor(random(min, max));
        let questionStr, answer;
      
        if (this.difficultyLevel >= 4) {
          let c = floor(random(min, max));
          answer = a - b - c;
          questionStr = `(${a} - ${b}) - ${c}`;
        } else {
          answer = a - b;
          questionStr = `${a} - ${b}`;
        }
      
        let distractors = this.generateDistractors(answer);
        myQuestion.push(questionStr, answer, ...distractors);
        myQuestion = shuffleArray(myQuestion);
        myQuestion.push(answer);
      }
      
      else if (randomKind == 3) {
        let [min, max] = this.getRangeByDifficulty(this.difficultyLevel);
        let a = floor(random(min, max));
        let b = floor(random(min, max));
      
        // Avoid division by 0
        b = b === 0 ? 1 : b;

        let questionStr, answer;
        answer = a / b;
        answer = Math.round(answer * 10) / 10;
        questionStr = `${a} / ${b}`;
        
        let distractors = this.generateDistractors(answer, 10, true);
        myQuestion.push(questionStr, answer, ...distractors);
        myQuestion = shuffleArray(myQuestion);
        myQuestion.push(answer);
      }

      return myQuestion
      
    }
  }
}