var userClickedPattern=[];
var gamePattern=[];
var buttonColours=["green","red","yellow","blue"];

function nextSequence(){
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour= buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    var activeButton=$("#"+randomChosenColour);
    activeButton.fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    userClickedPattern=[];
    level++;
    $("h1").text("Level "+level);
}

function playSound(name){
    var audio=new Audio("sounds/"+ name +".mp3");
    audio.play();
}

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    //$("#"+userChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColour){
    var activeButton=$("#"+currentColour);
    activeButton.addClass("pressed");
    setTimeout(function(){
        $(activeButton).removeClass("pressed");
    },100);
}

var started=false;
var level=0;
$("body").keypress(function(event){
    if(started===false){
        $("h1").text("Level "+level);
        nextSequence();
        started=true;
    }
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}
