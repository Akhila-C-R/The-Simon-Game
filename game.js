var started=false;
var level=0;
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

$(document).on("keydown",function(){
   gameStart();
});

document.addEventListener("touchstart", function(){
    setTimeout(function() { gameStart(); }, 700);
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
        $("#level-title").text("Game Over, Press Any Key to Restart");
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

$(document).ready(function(){
    $(document).focus(function(){
        console.log("inside focus!");
    });
});