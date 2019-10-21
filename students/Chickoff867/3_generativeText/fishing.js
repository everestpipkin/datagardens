var fishing = "This Cora on her first fishing trip. Cora is that a fishing rod that you have? There’s a little bear on that one. Oh, look. Did you think you saw a snake in the water? Was there a snake in the water? Yeah, it looks like a snake, doesn’t it? But it’s a tree. It’s just a tree that fell in the water. Yeah, it fell in the water. We’re gonna try to see if there are any fish in the water. It’s a little lobster, let me see him. Oh, that’s neat. What color are his eyes? You’re doing a good job with the hooks! You see the damsel fly resting on the branch? He flew away, that’s right, he did fly away. He flew away! He was purple, wasn’t he pretty? He was pretty! He’s back. Here, look Cora, he’s over here. He’s right beside Mommy. Do you see him? He’ll come back. Do you see a turtle, Cora? Over here. Look, here comes a fish! Oh, he jumped! He swam away. Let me get you a little bass again. You have a fish on? Do you see the turtle? Did you hear that frog? That was a bull frog. Yeah, did you hear him? You talk so well, Cora. Did you see the turtle on the log? Is he still there? He’s, you know what he’s doing? He’s resting in the sun. And he’s getting all warm in the sun. Here’s the frog again. Hear a frog. Turtle. He went in the water, didn’t he? Cora, what’s Daddy doing? Oh, he’s got a fish, look. That’s a large mouth bass! Do you want to hold him? Your first fish! Sort of. Yeah, you can hold him. Little hooks out. Look at him. Can you hold him by the lip? Put your thumb right there, hold him. Show him to Mommy! Hold him up high. Can you say bass? You gotta let him go. Good job, Cora! He go! He went away! He swam away. Was he slimy? He felt smooth and slimy, didn’t he? And you held him by the lip! Cora, we’re catching some bass today.";

//split the text by these spaces and 
var space = ["          ", "\n", "        ", " ",  "\n", "  ", " ", "\n", "\n"]

function randomArrayChoice(array){
var choice = array[Math.floor(Math.random()*array.length)];
return choice;
}

var fishingArray = fishing.split(" ");

var spaceArrayPoint = 0;

for (u = 0; u < fishingArray.length; u++){
    if (Math.random()>0.5){
        var spaceArrayChoice = space[spaceArrayPoint]
    if (spaceArrayPoint < space.length-1){
    var spaceArrayPoint = spaceArrayPoint + 1;
    }
        else {
        spaceArrayPoint = 0;
        }
    // console.log(spaceArrayChoice)
    fishingArray[u] = spaceArrayChoice;
}
}

function populatePage(){
    var poem = randomArrayChoice(fishingArray);
    document.getElementById("text").innerHTML = ("<br>") + fishing.split(" ") + poem;
}

function populateTitle(){
    var title = "July 8th, 2000";
    document.getElementById("title").innerHTML = title + "<br>";
}
//splits text up
var fishing = fishingArray.join(" ");

//attempt at replacing commas not working
var replaceCommas = ",";
replaceCommas.replace(" ");

//makes poem appear on page
populateTitle();
for (x=0; x<50; x++){
    populatePage();
}

console.log(fishing);