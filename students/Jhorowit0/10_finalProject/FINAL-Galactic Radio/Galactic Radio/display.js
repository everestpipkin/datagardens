class Display {
    constructor(){
        this.pos1 = createVector(width * 3/30,height * 2/30);
        this.width = width * 11/30;
        this.height = width/4;
        this.linecount = 0;

        this.displayString = '\n > ';
        this.toShow = '';
        this.noSignal = true;
        this.noise = ['H','K','C','S','s','h','c','k','H','-','ssc..hh','S.HHk','bzztSCK',
        '...','.....','....','..bbzzt','.bzzzzz..'];
    }

    show(){
        strokeWeight(1);
        //rect(this.pos1.x,this.pos1.y,this.width,this.height);
        image(terminalBG,this.pos1.x+this.width*.43,this.pos1.y + this.height*.44,this.width*2.5,this.height*1.8);
        stroke(255,0,0);
        textSize(20);
        fill(255,0,0);
        text(this.displayString,this.pos1.x,this.pos1.y,this.width,this.height);

        image(terminal,this.pos1.x+this.width*.43,this.pos1.y + this.height*.44,this.width*2.5,this.height*1.8);

        if(this.toShow == ''){
            broadcast();
        }
    }

    update(){
        //if(this.noSignal) this.display(random(this.noise));
        if(this.toShow != ''){
            this.append(this.toShow.substring(0,1))
            this.toShow = this.toShow.substring(1,this.toShow.length);
        }
    }

    clear(){
        this.displayString = '\n > ';
        this.linecount = 0;
    }

    append(str){
        this.displayString = concat(this.displayString,str);
    }

    display(str){
        this.toShow = concat(this.toShow,str);
        this.linecount += 1;
        if(this.linecount > 20) this.clear();
    }

    cut(){
        this.toShow = '-cCckKkKhH'
    }
}