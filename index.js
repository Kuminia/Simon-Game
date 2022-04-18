var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level "+level);
}


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour)
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    setTimeout(nextSequence(),1000);
    started = true;
  }
});

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if (gamePattern.length === userClickedPattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);
    }
  }
  else{
    playSound("wrong");
    gamePattern = []
    userClickedPattern = []
    started = false;
    $("#level-title").text("Game Over, Press Any Key to Restart");
    level = 0;
    $("body").addClass("game-over");
    setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  }
}
