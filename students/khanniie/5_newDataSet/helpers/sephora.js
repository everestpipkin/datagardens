var totalIterations = 20;
var counter = 0;
var clickable = document.getElementById("clickme");
function clickit(){clickable.click();}
function clickMultiple(){
    for(var i = 0; i < 5; i++){clickit();}
    counter++;
    if(counter < totalIterations){
        setTimeout(function(){clickMultiple();}, 500);
    }  
}
clickMultiple();


//username
matches[0].children[1].children[0].children[0].children[0].children[1].children[0].children[0].innerHTML;

//extra info
matches[0].children[1].children[0].children[0].children[1].children[0].children[0].innerHTML;

//stars
matches[0].children[1].children[1].children[0].children[0].children[0].getAttribute("aria-label");

//date
matches[0].children[1].children[1].children[0].children[0].children[1].innerHTML;

//title
matches[0].children[1].children[1].children[0].children[1].innerHTML;

//description
matches[0].children[1].children[1].children[0].children[2].innerText;

var matches = document.querySelectorAll("div[data-comp='Review']");
matches.length;

var dict = {};
for(var i = 0; i < matches.length; i++){
    var m = matches[i];
    var new_entry = {};
    try{
        var username = m.children[1].children[0].children[0].children[0].children[1].children[0].children[0].innerHTML;

        try{
            new_entry.extra_info = m.children[1].children[0].children[0].children[1].children[0].children[0].innerHTML;
        } catch (e){
            new_entry.extra_info = "error getting this field.";
            console.log("failed extra info");
        }

        try{
            new_entry.stars = m.children[1].children[1].children[0].children[0].children[0].getAttribute("aria-label");
        } catch (e){
            new_entry.stars = "error getting this field.";
            console.log("failed stars");
        }
        
        try{
            new_entry.date = m.children[1].children[1].children[0].children[0].children[1].innerHTML;
        } catch (e){
            new_entry.date = "error getting this field.";
            console.log("failed date");
        }
        
        try{
            new_entry.title = m.children[1].children[1].children[0].children[1].innerHTML;
        } catch (e){
            new_entry.title = "error getting this field.";
            console.log("failed title");
        }

        try{
            new_entry.description = m.children[1].children[1].children[0].children[2].innerText;
        } catch (e){
            new_entry.description = "error getting this field.";
            console.log("failed description");
        }
        
        dict[username] = new_entry;
    } catch (e){
    }
}
JSON.stringify(dict);