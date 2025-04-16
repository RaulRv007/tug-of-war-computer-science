class Wheel{
    constructor(finalAngularVelocityMin, finalAngularVelocityMax, options, friction, pointerK) {
      this.angle = 0;
      this.angularVelocity = 0;
      this.spinning = false;
      this.selectedOption = "";
      this.options = options;
      this.friction = friction;
      this.pointerK = pointerK;
      this.pointerAngle = 0.01;
    }
  
    draw(){
      let sliceAngle = TWO_PI / this.options.length;
      for (let i = 0; i < this.options.length; i++) {
        let startAngle = this.angle + i * sliceAngle;
        let endAngle = startAngle + sliceAngle;
  
        fill(this.options[i].color);
        arc(0, 0, 400, 400, startAngle, endAngle, PIE);
        
  
        // Draw text
        push();
        rotate(startAngle + sliceAngle / 2);
        fill(255);
        text(this.options[i].name, 150, 0);
        pop();
      }
    }
  
    spin(){
        //this.angularVelocity = random(this.finalAngularVelocityMin, this.finalAngularVelocityMax);
        this.spinning = true;
        this.selectedOption = "";
        this.angle += this.angularVelocity;
        this.angularVelocity *= this.friction; // Slow down the wheel
        if(this.angularVelocity < 0.01) {
            this.spinning = false;
            this.angularVelocity = 0;
            let sliceAngle = TWO_PI / this.options.length;
            let normalizedAngle = (TWO_PI - (this.angle % TWO_PI)) % TWO_PI;
            let index = floor(normalizedAngle/ sliceAngle);
            print(index)
            this.selectedOption = this.options[index].name; 
            print(this.selectedOption);
            this.printSelectedOption();
        }
    }
    printSelectedOption(){
        if (this.selectedOption !== "") {
            fill(0);
            clear()
            text("Selected Option: " + this.selectedOption, 0, 250);
        }
    }
    drawPointer(){
        if(this.spinning){
          push();
          translate(200, 0)
          rotate(this.pointerAngle);
          
          fill(255, 0, 0);
          let sliceAngle = TWO_PI / this.options.length;
          let normalizedAngle = (TWO_PI - (this.angle % TWO_PI)) % TWO_PI;
          let section = floor(normalizedAngle);
          if(section != sectionAnt){
            this.pointerAngle  = -PI/4
          }
          this.pointerAngle = this.pointerK * this.pointerAngle;
          print(section);
          
          
          triangle(-10, 0, 10, -10, 10, 10);
          sectionAnt = section;
          pop();
        }else{
          fill('red')
          push()
          translate(200, 0)
          triangle(-10, 0, 10, -10, 10, 10);
          pop()
        }

    }
  }
  