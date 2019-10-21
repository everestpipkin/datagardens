//it'll run, but every once in a while it shits. Which is okay, they're four-year olds! What can they do. 






//function to split up by n words
function nGramsWords(sentence, n) {
  var words = sentence.split(/\W+/);
  var total = words.length - n;
  var grams = [];
  for(var i = 0; i <= total; i++) {
    var seq = '';
    for (var j = i; j < i + n; j++) {
      seq += words[j] + ' ';
    }
    grams.push(seq);
  }
  return grams;
}



function choice(somelist) {
  var i = Math.floor(Math.random()*somelist.length);
  return somelist[i];
}

// gets random element from a dictionary
function randomProperty(dict) {
    var keys = Object.keys(dict)
    var selection = dict[keys[ keys.length * Math.random() << 0]];
    return selection[selection.length * Math.random() << 0]
};


// let hehe = {'hi':['heheh'], 'maybe':['whatever', 'there']}

// console.log(randomProperty(hehe))



var ngrams = {};


//first, grab all of the dumb texts that I send. (they are anonymized). And add them to my ngrams dictionary.
//Because they are all seperate sentences, I split them into lists,
// and feed them thru the ngrammer individually.

for (var i = 0; i < myTexts.length; i++) {

  let textSplit = myTexts[i];
  ngrammerize(textSplit, 1);
}



function ngrammerize(textSplit, n) {
    // Look at all words of string
    for (var i = 0; i < textSplit.length - n; i++) {
      // Look at an ngram
      var gram = textSplit[i];
      // Look at the next charaacter
      var next = textSplit[i + n];
      // Is this a new one, make an empty array
      if (ngrams[gram] === undefined) {
        ngrams[gram] = [];
      }
      // Add the next character as a possible outcome
      ngrams[gram].push(next);
    }
};




// -------------------------------- SPLIT BETWEEN SET-UP AND TAKING INPUT -------------------------------






// // Start with an arbitrary ngram
// console.log(ngrams[i])









let output = [];


const punctuation = ['.', ',', '!', '?'];


function getEnding(str) {
  return str[str.length - 1];
};





// adapted from James on Stack Overflow
// https://stackoverflow.com/questions/6116474/how-to-find-if-an-array-contains-a-specific-string-in-javascript-jquery
function arrayContains(needle, arrhaystack)
{
    return (arrhaystack.indexOf(needle) > -1);
}



function run(inputSplit) {



  // Predict and replace next word in the sentence.
  for (var i = 0; i < inputSplit.length; i++) {
    //i - 1 will retrieve the last thing pushed to output




    if (output.length == [] || arrayContains(getEnding(output[i - 1]), punctuation) || arrayContains(getEnding(inputSplit[i]), punctuation)) {

          // push onto output the current index in the input string.
          console.log(inputSplit[i]);
          let current = inputSplit[i];
          output.push(current);
          continue;


    } else {

      //console.log(output.length == [], getEnding(output[i - 1]) in punctuation, getEnding(inputSplit[i]) in punctuation)

      // push onto output a regram from the previous word in output.

      let current = output[i-1];
      
      if (ngrams.hasOwnProperty(current)) {
        
        // What are all the possible next tokens
        var possible = ngrams[current];
        // Pick one randomly
        var next = choice(possible);
        // Add to the output
        if (Math.random() < 0.2) {
          output.push(" " + next.toUpperCase());
        } else {
          output.push(" " + next);
        }
          
        // Get next - if it has a 
        // an ngram in the next iteration of the loop


      } else {

        // input this message for any dummies trying to use a too big worddd. 
          if (Math.random() < 0.1) {
            continue;

            // output.push("\n\n *** pick a different word ! this is too grownup = " + current + " ***\n\n");
          } else {
            output.push(randomProperty(ngrams))
          }
        }
    }

  }
};



// adapted from W3Schools.
// https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp

var inputField = document.getElementById("myInput");
var input = document.getElementById("myInput").value;

// Execute a function when the user releases a key on the keyboard
inputField.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    

    output = [];
    input = [];



    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    window.input = document.getElementById("myInput").value;
    run(input.split(" "));
    document.getElementById('text').innerHTML = output.join(" ");
    

  }
});











//adapted from dan shiffman & everest pipkin & various stack-overflowers :) URLs included for StackOverflow.