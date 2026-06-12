var difficulty = 400;
var level;
var sequence = [];
var counter = 0;

function playAudio(audioName) {
    var audio = new Audio("sounds/" + audioName + ".mp3");
    audio.play();
}

function animation(index, sequence) {
    playAudio(sequence[index]);
    $(".box-" + sequence[index]).animate({ opacity: 0.5 }, difficulty).animate({ opacity: 1 }, difficulty, function () {
        if (index < sequence.length) {
            animation(index + 1, sequence);
        }
    });
}

function generateSequence(length) {
    var sequence = []
    for (var i = 0; i < length; i++) {
        var randomChoice = Math.floor(Math.random() * 4) + 1;
        sequence.push(randomChoice);
    }
    return sequence;
}

function press(key) {
    playAudio(key.classList[1][4]);

    $(key).addClass("pressed");
    setTimeout(function () {
        $(key).removeClass("pressed");
    }, 100);
}

function redBlink() {
    playAudio("wrong");
    $("body").addClass("lost");
    setTimeout(function () {
        $("body").removeClass("lost");
    }, 300);
}

function simonSays() {
    counter = 0;
    sequence = generateSequence(level);
    setTimeout(function () {
        animation(0, sequence);
    }, 800);
}

// ===========================================

$(document).keydown(function () {
    level = 1;
    $("h1").text("Level " + level);
    simonSays();
});

$(".box").click(function () {
    press(this);

    if ($(this).hasClass("box-" + sequence[counter])) {
        counter++;
        if (counter === level) {
            level++;
            $("h1").text("Level " + level);
            simonSays();
        }
    }
    else {
        redBlink();
        $("h1").text("Game Over, Press Any Key to Restart");
        counter = 0;
        level = 1;
    }
});