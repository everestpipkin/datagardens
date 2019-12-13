class Node {
    constructor(center,angle,d){
        this.angle = angle;
        this.d = d;
        this.near = [];
        this.center = center;

        let a = radians(angle);
        let x = center.x + d * cos(a);
        let y = center.y + d * sin(a);
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
        fill(255);
        ellipse(this.pos.x,this.pos.y,2);
    }

    initialize(list){
        for(let l of list){
            let x1 = this.pos.x;
            let y1 = this.pos.y;
            let x2 = l.pos.x;
            let y2 = l.pos.y;

            if(dist(x1,y1,x2,y2) < 100 && x1 != x2) this.near.push(l);
        }
    }

    showPath(freq,obs,hist){
        noStroke();
        fill(255,0,0);
        ellipse(this.pos.x,this.pos.y,8);

        if(freq.length < 1){
            updateBroadcast(this.pos);
        }
        else{
            let nextIndex = freq.pop() % this.near.length;
            let next = this.near[nextIndex];

            function isIn(node1,array){
                for(let a of array){
                    if(node1 == a) return true;
                }
                return false;
            }

            while(isIn(next,hist)){
                nextIndex = (nextIndex + 1) % this.near.length;
                next = this.near[nextIndex];
            }

            strokeWeight(5);
            stroke(255,0,0);
            line(next.pos.x,next.pos.y,this.pos.x,this.pos.y);
            next.showPath(freq,obs,hist.concat(this));
        }
    }
}