class System{
    constructor(){
        this.sats = [];
        this.obs = [];
        this.sigs = [];
        this.center = createVector(width * 22/30 ,height * 9/20);
        this.close = [];
        this.rad = height * 10/30;

        for(let i = 0; i < 100; i++){
            this.addSat();
        }

        // for(let i = 0; i < 5; i++){
        //     this.addSig();
        // }

        this.addSig1();
        this.addSig2();
        this.addSig3();
        this.addSig4();
        this.addSig5();

        for(let s of this.sats){
            s.initialize(this.sats);
            if(s.d < this.rad/5) this.close.push(s);
        }
    }

    show(freq){
        strokeWeight(1);
        stroke(255);
        fill(0);
        ellipse(this.center.x,this.center.y,this.rad*2);


        for(let s of this.sats){
            //s.show();
        }

        for(let o of this.obs){
            o.show();
        }

        // fill(255);
        // stroke(255);
        // ellipse(this.center.x,this.center.y+10,20);

        image(radar,this.center.x,this.center.y,this.rad*2.4,this.rad*2.3);

        noStroke();
        fill(255,0,0);
        ellipse(this.center.x,this.center.y,8);

        this.showPath(freq);

        for(let s of this.sigs){
            //s.show();
        }
    }

    showPath(freq){
        let newFreq = [...freq];
        let index = newFreq.pop() % this.close.length;
        let start = this.close[index];

        let hist = [start];

        stroke(255,0,0);
        strokeWeight(5);
        line(start.pos.x,start.pos.y,this.center.x,this.center.y);
        start.showPath(newFreq,this.obs,hist);
    }

    rotate(){
        for(let s of this.sats){
            s.rotate(1);
        }

        // for(let s of this.sigs){
        //     s.rotate(1);
        // }

        for(let o of this.obs){
            o.rotate();
        }
    }

    update(){
        for(let o of this.obs){
            o.update();
        }
    }

    updateBroadcast(pos1){
        for(let s of this.sigs){
            let pos2 = s.pos;
            if(dist(pos1.x,pos1.y,pos2.x,pos2.y) < 50 && s.message.length > 0){
                s.isBroadcasting = true;

                stroke(255,0,0);
                let weight = ((50 - dist(pos1.x,pos1.y,pos2.x,pos2.y)) *2)/10
                strokeWeight(weight);

                line(pos1.x,pos1.y,pos2.x,pos2.y);

                noFill();
                ellipse(pos2.x,pos2.y,15);
            }
            else{s.isBroadcasting = false;}
        }
    }

    broadcast(){
        for(let s of this.sigs){
            if(s.isBroadcasting) terminalLog(s.getMessage());
        }
    }

    addSat(){
        let angle = random(360);
        let d = random(this.rad/8,this.rad);
        let sat = new Node(this.center,angle,d);
        this.sats.push(sat);
    }

    addSig4(){
        let angle = random(360);
        let d = random(this.rad/8,this.rad);
        let message = [
            'PPPSHHHHHHHHHHHHH.....',
            'Geraldine?',
            'Marco?',
            'Do you copy? Over',
            'PPPPPSSHHH-',
            'This is command, just get the body and get out. Over',
            'PPPSHHis station is basically nothing but scrap at this point',
            'He doesnt have any PPPSHHification. And his suite is untouched even thPPPSHH',
            'This guy doesnt haPPPSSHH the Norgaard logo on his suit?',
            'Whats up?',
            'Marco thats strange',
            'PPSHHovery complete sending him back now. Over',
            'Yeah that sounds gPPSHH',
            'Y-yeah we copy. Go for recovery, lets get some identification. Over',
            'PPSHhen he took it off. Stange. Copy that Command? Over.',
            'One of these guys has his helmet removed but he is still tethered, so PPSHHust have been outside',
            'PPPSHHraldine we copy.',
            'Do either of you copy? Hello?',
            'PPPPSSSHHHHHehpPPPSHHfrePPPSHH',
            'PPPSHH',
            'This is command do you copy? Over',
            'PPPSHHH',
            'Holy shit Marco whPPSHH thats freakPSHHH',
            'Geraldine come chPPSHHout',
            'PPPSHHats stange, what aPPSHH is PPSHH',
            'This is Geraldine, we copPPPSSHH',
            'This is command, your signal is being blocked by the outer shielding, try to stay in open space.',
            'This is Marco I have visual of 2 bodies about 50PPPSSHHn section 3, moving for indentiPPPSHHH',
            'The damage is pretty bad, holes straight through abouPPSHHeters of shielding',
            '10 4',
            'Entering hull',
            'About 60 meters in diameter. Over',
            'We have located point of impacPPSHH A solid hole in the hull',
            'Thats a 10 4. Visual feed confirmation as well. Over',
            'This is Geraldine, feeds and coms up, Over',
            'PSHH-This is command we copy. Over',
            'PPSHH Marco here, coms up. Do you copy? Over',
        ];
        let sig = new Signal(this.center,angle,d,message);
        this.sigs.push(sig);
    }


    addSig5(){
        let angle = random(360);
        let d = random(this.rad/8,this.rad);
        let message = [
            'PPPPPPPPPPPSHHHHHHHHHHHH',
            '...PPPPSHHhHGODAMMITALLTOPPPSHHH',
            '.....',
            '.....Is it over?....',
            'PPPPSHHH-shit soPPPPPSHHH-',
            'it soundPPPSHHHH me like someones got their mic o-PPPPSHHH',
            'yeah turn iPPPPSHHHH',
            'PPPSHHeeze man turn it off!',
            'PPPPPSHHHHHHH',
            'GOD! Who the hell sounds like theyre in a goddamn neutron staPPPSHH',
            'PPPPPSSHHHHHHSP PPSH-',
            'Its all local arm, back-galaxy trash is what it is',
            'But he kept sayin ive been down those etherium winds before and theyre all the same!',
            'Whelp Im just tryna stress my point is all.',
            'PPPSHH-',
            'PPPSHHHHshit my baPPPSSHH',
            'Hey CandarianCrannker I hear ya man. These days this shit souPPPPSSHHHHHHH',
            'Am I right or am I wrong. Im right',
            'Thats what im sayin man a pass is pass. Ya right, thats what im sayin though'
        ];
        let sig = new Signal(this.center,angle,d,message);
        this.sigs.push(sig);
    }

    addSig1(){
        let angle = random(360);
        let d = random(this.rad/8,this.rad);
        let message = [
            '*sigh* [click]',
            '...nonono [indistinct chatter] ...honey don’t say that ….[click]',
            '[indistinct chatter]...honey….i dont think….he’s coming back.',
            '[indistinct chatter].....he took his suitcase?',
            '[indistinct chatter]....yeah...uh huh…',
            'Uh huh…',
            '[indistinct chatter]PPPSSHHH',
        ];
        let sig = new Signal(this.center,angle,d,message);
        this.sigs.push(sig);
    }

    addSig2(){
        let angle = random(360);
        let d = random(this.rad/8,this.rad);
        let message = [
            '[music playing]',
            'this next one is BOULDERBOY by Excuse Me - Sorry',
            'prime time for cruisin some tunes!',
            'The weather is clear, solar winds are at low',
            'You just heard 400cc by For Profit Charities',
            'Its another smooth night out there for those of you in the outer arms',
            '[music playing]',
            'So lets start with one of my favorets by them, TELESCOOP',
            'We have some Bright Sliders on tap tonight along with a serving of Dead End Drum',
            'You are listening to Pletary Praxis FM, Im Rod.',
            '[music playing].... ',
            'Thanks for tuning in, next up is Sneezer Geezer.',
            'Eh...you get it',
            'headaches',
            'nausea',
            'reverse migranes',
            'echetalopoidian rheumoses',
            'soft fingernails',
            'loss of hair',
            '...all without you',
            'that shaped your very being crumble into dust and drift into space without you',
            'the crippling fear enchroaching over the course of millennia as the people and places',
            'ego death',
            'inverted eyes',
            'buboes',
            'loss of certain bones',
            'Side effects may include;',
            'Live longer with some Anti-Aging Synthodes from your nearest Scroop station!',
            'Do you lack a long enough lifespan to travel there?',
            'Would you like to exist in a location way further from you?',
            'Do you currently live in a location?',
            'Before our next few songs how about a quick word from our sponsors;'
        ];
        let sig = new Signal(this.center,angle,d,message);
        this.sigs.push(sig);
    }

    addSig3(){
        let angle = random(360);
        let d = random(this.rad/8,this.rad);
        let message = [
            '83912',
            '83912',
            '10080',
            '10080',
            '46543',
            '46543',
            '-257 257',
            '143 143,',
            '00000',
            '83912',
            '83912',
            '10080',
            '10080',
            '46543',
            '46543',
            '-257 257',
            '143 143,',
            '00000',
            '83912',
            '83912',
            '10080',
            '10080',
            '46543',
            '46543',
            '-257 257',
            '143 143,',
            '00000',
            '83912',
            '83912',
            '10080',
            '10080',
            '46543',
            '46543',
            '-257 257',
            '143 143,',
            '00000',
            '83912',
            '83912',
            '10080',
            '10080',
            '46543',
            '46543',
            '-257 257',
            '143 143,',
            '00000'
        ];
        let sig = new Signal(this.center,angle,d,message);
        this.sigs.push(sig);
    }

    addAsteroid(){
    }

    addPlanet(moonCount){
    }
}