
const wrongAudio = new Audio('sounds/wrong.mp3');
let gamePattern = [];
let userClickedPattern = [];
const buttonColors = ["human", "creeper", "ender", "zombie"];

let level = 0;
let started = false;

// SOUND FUNCTION

const playSound = color => {
  switch (color) {
    case 'human':
      const humanAudio = new Audio('sounds/human.mp3');
      humanAudio.play()
      break;
    case 'ender':
      const enderAudio = new Audio('sounds/ender.mp3');
      enderAudio.play()
      break;
    case 'creeper':
      const creeperAudio = new Audio('sounds/creeper.mp3');
      creeperAudio.play()
      break;
    case 'zombie':
      const zombieAudio = new Audio('sounds/zombie.mp3');
      zombieAudio.play()
      break;
    default:
      console.log("an error occured");
  }
};

// COMPUTER FUNCTION

const nextSequence = () => {
  userClickedPattern = [];
  level++;
  $('h1').text(`Level ${level}`);
  let randomNum = Math.floor(Math.random()*4);
  let randomChosenColor = buttonColors[randomNum];
  gamePattern.push(randomChosenColor);
  $(`#${randomChosenColor}`).fadeOut('fast').fadeIn('fast');
  playSound(randomChosenColor);
};

// USER FUNCTIONS

const animatePress = (currentColor) => {
  $(`.${currentColor}`).addClass('pressed');
  setTimeout(function() {
    $(`.${currentColor}`).removeClass('pressed');
  }, 100)
};

$('.btn').click(function(){
  const userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

// CHECK ANSWER FUNCTION

const checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success")
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass('game-over');
    }, 100);
    $('#level-title').text("Game Over, Press Any Key to Restart");
    startOver();
  }
};

// STARTING FUNCTION + RESTART

$(document).keypress(() => {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

const startOver = () => {
  level = 0;
  started = false;
  gamePattern = [];
}
