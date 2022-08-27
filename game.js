var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;   //started variable assigned value false to keep the track of keypress fisrt time
var level = 0;
//Check for click on button by the user
$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
  playSound(userChosenColor);
  animatePress(userChosenColor);
})

//Check for First KeyPress to start the game
$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();     //calling the nextSequence function to start the game
  }
});


//Function to get the next sequence of the game pattern
function nextSequence(){
  userClickedPattern = [];
  $("#level-title").text("Level " + level);
  level++;
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}


//Function to check the user Answer From the gamePattern
function checkAnswer(currentLevel){

  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any key to Restart");
    startOver();
  }
}


function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
function playSound(name){
  var audio = new Audio("Sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed"), 100;
  });
}
