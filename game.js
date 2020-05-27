var started=false;
var level=0;
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if(isMobile)
{
    $("#level-title").text("The Simon Game");
}
else
{
    $("#level-title").text("Press Any Key To Start");
}

$(document).on("keydown",function(){
   gameStart();
});

document.querySelector("#play").addEventListener("click", function(){
    gameStart();
});

function gameStart()
{
    if(started==false)
    {
        started=true;
        $("#level-title").text("Level "+level);
        nextSequence();
        $(".btn").on("click",function(){
            gameHandler(this);
        });
    } 
}

function nextSequence()
{
    userClickedPattern.length=0;
    
    level++;
    $("#level-title").text("Level "+level);

    var num = Math.random();
    num=Math.floor(num*4);

    var randomChosenColour = buttonColours[num];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(70).fadeIn(70);
    playSound(randomChosenColour); 
}

function gameHandler(clickedButton)
{
    var userChosenColour=$(clickedButton).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
}

function checkAnswer(currentLevel)
{
   if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
   {
        if(gamePattern.length==userClickedPattern.length)
        {
            setTimeout(function() { 
                nextSequence();
            }, 1000);
        }
   }
   else
   {
        playSound("wrong");

        $("#"+userClickedPattern[currentLevel]).addClass("game-over");
        setTimeout(function() { $("#"+userClickedPattern[currentLevel]).removeClass("game-over"); }, 200);

        if(isMobile)
        {
            $("#level-title").text("Game Over, Press Play to Restart");
        }
        else
        {
            $("#level-title").text("Game Over, Press Any Key to Restart");
        }
        $(".btn").off("click");
        startOver();
   }
}
function startOver()
{
    level=0;
    started=false;
    gamePattern.length=0;
}

function playSound(name)
{
    var chosenSound=new Audio('sounds/'+name+'.mp3');
    chosenSound.play();
}

function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() { $("#"+currentColour).removeClass("pressed"); }, 65);
}

$("#help").on("click", function() {
    $(".popup-overlay").slideToggle();
});

$(".close").on("click", function() {
    $(".popup-overlay").slideUp();
});