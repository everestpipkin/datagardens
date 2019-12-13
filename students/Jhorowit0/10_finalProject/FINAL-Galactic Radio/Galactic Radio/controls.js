class Controls {
    constructor(){
        this.center = createVector(width * 8.5/30,height * 24/30);
        this.scale = 1000 / height;
        this.width = width * 2/30;
        this.lessPos = createVector(this.center.x - this.width*.8,this.center.y);
        this.morePos = createVector(this.center.x + this.width*.8,this.center.y);
        this.r1 = this.width/4;
        this.r2 = this.width/4;
        this.isPressed = false;
        this.index = 0;
        this.oldX = 0;
        this.oldIndex;

    }

    update(freq,mouseX){
        if(this.isPressed){
            let temp = this.oldX - mouseX;
            temp = (int)(temp / 20);

            this.index = this.oldIndex + temp;
            if(this.index < 0) this.index = this.index * -1;

            freq[0] = this.index;
        }
    }

    show(){
        stroke(255);
        noFill();
        image(controls,this.center.x,this.center.y,this.width * 4,this.width*4);
        push();
        translate(this.center.x,this.center.y);
        rotate(this.index/10);
        image(knob,0,0,this.width*4,this.width*4);
        pop();
        // ellipse(this.lessPos.x,this.lessPos.y,this.r2*2);
        // ellipse(this.morePos.x,this.morePos.y,this.r2*2);
        // ellipse(this.center.x,this.center.y,this.r1*2);
    }

    pressed(x,y,freq){
        if(dist(x,y,this.center.x,this.center.y) < this.r1){
            this.isPressed = true;
            this.oldX = x;
            this.oldIndex = this.index;
        }

        if(dist(x,y,this.lessPos.x,this.lessPos.y) < this.r2){
            return 1;
        }
        if(dist(x,y,this.morePos.x,this.morePos.y) < this.r2){
            return 0;
        }
    }

    release(){
        this.isPressed = false;
    }
}