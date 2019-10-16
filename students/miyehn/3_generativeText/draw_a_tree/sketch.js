var text;

function setup() {

  text = "Welcome to this 1/60 second's tree drawing workshop! \n";
  text += "We first do some setup of our tools. \n";
  // properties setup
  text += "We setup a proper canvas space to work with... \n";
  text += "For now, a 600x600 canvas is good enough. \n";
  createCanvas(600, 600);
  text += "Let's wash it with some base color ";
  background(100);
  text += "and load our brush with some white paint. \n";
  stroke(255);
  stroke(2);

  var origin_x = 300; var origin_y = 550;
  text += "We move our brush tip to point (" + origin_x + ", " + origin_y + "). \n";
  translate(300, 550);
  text += "Now it's time to start! Exciting! \n";
  draw_branch(5, 1, 0, 0, 0, 80, 6);

  text += "Ok I guess we have it! The result is shown below. How do you like it?\n";
  text += "I hope you enjoyed our workshop. It's now your turn to reproduce this process in the next 1/60 second.\n";
  text += "Have fun and look forward to seeing what you can do!\n";

  // console.log(text);
  var doc = document.getElementById("text-body");
  doc.innerHTML = text;
}

function draw_branch(depth, scale_factor, angle, start_x, start_y, len, w) {
  text += "We need to make sure we're not making the tree two tall, so let's check..\n";
  if (depth == 0) {
    text += "Well, seems like we have reached a point far enough from the root, so let's not make this branch taller.\n";
    return;
  } else {
    text += "Well, nope. We can keep going.\n";
  }

  // draw rect for current branch
  text += "Now switch to using a brush of width "+Number(w).toFixed(2)+", since we're drawing it as a branch of depth "+depth+".\n";
  strokeWeight(w);
  text += "And here we start the branch... we're going to draw it with length "+Number(len).toFixed(2)+"\n";
  text += "But also emember to tilt it at the angle we agreed on ("+Number(angle).toFixed(2)+" radians).\n";
  line(start_x, 
       start_y, 
       start_x + cos(Math.PI/2 + angle) * len, 
       start_y - sin(Math.PI/2 + angle) * len);

  text += "(drawing...) ";
  text += "We've drawn this branch, but we're not done yet. We might want it to branch off at its tip.\n";
  text += "Let's throw a dice to decide if we want to branch off, and how many sub-branches to make.\n";
  var num_branches = floor(randomGaussian(2, 1));
  text += "Based on the dice, let's make "+num_branches+" more branches.\n";
  for (var i=0; i<num_branches; i++) {
    text += "For the "+i+"th branch, again we use a dice to decide how much to tilt it.\n";
    var next_angle = angle + randomGaussian(0, 0.3);
    text += "Reading from the dice... How about tilting it "+Number(next_angle).toFixed(2)+" radians.\n";
    text += "Ok ready.. let's start this branch then.\n";
    draw_branch(depth-1, 
      scale_factor * 0.8, 
      next_angle, 
      start_x + cos(Math.PI/2 + angle) * len,
      start_y - sin(Math.PI/2 + angle) * len,
      len * 0.8,
      w * 0.8
    );
  }

}

function br() { return "<br/>"; }
