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
      rect(this.x, this.y + this.sizeY/2, this.sizeX, this.sizeY)
      rect(this.x - this.sizeX, this.y - this.sizeY/2, this.sizeX*2, this.sizeY)
      rect(this.x, this.y + this.sizeY*3/2, this.sizeX, this.sizeY)
      rect(this.x - this.sizeX, this.y + this.sizeY*3/2, this.sizeX, this.sizeY)
      rect(this.x - this.sizeX, this.y + this.sizeY/2, this.sizeX, this.sizeY)
      textSize(this.sizeY/4)
      if(this.question[0].length >= 20){
        let words = this.question[0].split(' ');
        let line1 = '';
        let line2 = '';
        for (let word of words) {
          if ((line1 + word).length <= 20) {
            line1 += word + ' ';
          } else {
            line2 += word + ' ';
          }
        }
        text(line1.trim(), this.x, this.y - this.sizeY / 4);
        text(line2.trim(), this.x, this.y + this.sizeY / 4);
      }else{
        text(this.question[0], this.x, this.y)
      }
      textSize(this.sizeY/4)
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