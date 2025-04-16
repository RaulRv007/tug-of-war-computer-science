class MultipleChoice{
    constructor(question, x, y, sizeX, sizeY){
      this.question = question
      this.x = x
      this.y = y
      this.sizeX = sizeX
      this.sizeY = sizeY
      this.answerIndex = 0
  
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
      //rect(this.x, this.y, this.sizeX, this.sizeY)
    }
  
     checkAnswer(){
      if(mouseIsPressed){
        if(mouseX >= this.x-this.sizeX && mouseX<=this.x && mouseY >= this.y + this.sizeY/2 && mouseY <= this.y + 3*(this.sizeY/2)){
          return this.question[2]
        }else if(mouseX >= this.x-this.sizeX && mouseX<=this.x && mouseY >= this.y + 3*(this.sizeY/2) && mouseY <= this.y + 3*this.sizeY - this.sizeY/2){
          return this.question[3]
        }else if(mouseX >= this.x && mouseX<=this.x + this.sizeX&& mouseY >= this.y + this.sizeY/2 && mouseY <= this.y + 3*(this.sizeY/2)){
          return this.question[1]
        }else if(mouseX >= this.x && mouseX<=this.x + this.sizeX&& mouseY >= this.y + 3*(this.sizeY/2) && mouseY <= this.y + 3*this.sizeY - this.sizeY/2){
          return this.question[4]
        }
      }
     }
    
  }