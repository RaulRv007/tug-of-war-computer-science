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
        let randomKind = floor(random(0, 3.99))
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
            myQuestion.push(answer)
  
          }
          
        }else if(randomKind == 1){
          let a = floor(random(0, 100))
          let b = floor(random(0, 100))
          let answer = a*b
          let anotherOption = floor(random(0, 300))
          let another1Option = floor(random(0, 100))
          let another2Option = floor(random(0, 500))
          if(another1Option == answer || another2Option == answer || anotherOption == answer){
            let anotherOption = floor(random(0, 100))
            let another1Option = floor(random(0, 100))
            let another2Option = floor(random(0, 100))
          }else{
            myQuestion.push(`${a} * ${b}`)
            myQuestion.push(answer)
            myQuestion.push(another1Option)
            myQuestion.push(another2Option)
            myQuestion.push(anotherOption)
            myQuestion = shuffleArray(myQuestion)
            myQuestion.push(answer)
  
          }
          
        }else if(randomKind == 2){
          let a = floor(random(0, 100))
          let b = floor(random(0, 100))
          let answer = a-b
          let anotherOption = floor(random(-100, 100))
          let another1Option = floor(random(-100, 100))
          let another2Option = floor(random(0, 100))
          if(another1Option == answer || another2Option == answer || anotherOption == answer){
            let anotherOption = floor(random(0, 100))
            let another1Option = floor(random(0, 100))
            let another2Option = floor(random(0, 100))
          }else{
            myQuestion.push(`${a} - ${b}`)
            myQuestion.push(answer)
            myQuestion.push(another1Option)
            myQuestion.push(another2Option)
            myQuestion.push(anotherOption)
            myQuestion = shuffleArray(myQuestion)
            myQuestion.push(answer)
  
          }
          
        }else if(randomKind == 3){
          let a = floor(random(1, 100))
          let b = floor(random(1, 100))
          let answer = a/b
          answer *= answer*10
          answer = round(answer)
          answer = answer/10
          let anotherOption = floor(random(0, 100))
          let another1Option = floor(random(0, 100))
          let another2Option = floor(random(0, 100))
          if(another1Option == answer || another2Option == answer || anotherOption == answer){
            let anotherOption = floor(random(0, 100))
            let another1Option = floor(random(0, 100))
            let another2Option = floor(random(0, 100))
          }else{
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