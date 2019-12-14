class Signal{
    constructor(center,angle,dist,message){
        this.center = center;
        this.angle = angle;
        this.dist = dist;
        this.isBroadcasting = false;

        this.message = message;

        let a = radians(angle);
        let x = center.x + dist * cos(a);
        let y = center.y + dist * sin(a);
        this.pos = createVector(x,y);
    }

    rotate(theta){
        this.angle += theta;
        let a = radians(this.angle);
        let x = this.center.x + this.d * cos(a);
        let y = this.center.y + this.d * sin(a);
        this.pos = createVector(x,y);
    }

    show(){
        noStroke();
        fill(255,0,0);
        ellipse(this.pos.x,this.pos.y,8);
    }

    getMessage(){
        if(this.message.length < 1) return '';
        return concat(this.message.pop(),'\n > ');
    }
}