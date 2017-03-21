var number = 13;
var candyColor = "red";
var statusShowAxes = false;
var statusRotation = false;
var lastKey = 0;
var food = {};

init(number);
animate();
foodLocation();

var snake = new Snake("blue", "green", number, candyColor);
snake.show();

var timer = setInterval(function() {
    draw();
}, snake.getMoveSpeed());

function draw() {
    if(snake.eat(food)) {
        foodLocation();
        snake.setMoveSpeed(snake.getMoveSpeed() - 10);
    }
    snake.death();
    if(snake.getIsDead()) {
        clearInterval(timer);
    } else {
        snake.update();
        $("#score").text("SCORE : " + snake.getSize() * (1000 - snake.getMoveSpeed()));
        setLedColor(food.x, food.y, food.z, candyColor);
    }
}

$(window).keypress(function(e) {
    var dir = snake.getDirection();
    if (dir.z == 1)
        lastKey = 115;
    else if (dir.z == -1)
        lastKey = 119;
    else if (dir.x == 1)
        lastKey = 100;
    else if (dir.x == -1)
        lastKey = 97;
    else if (dir.y == 1)
        lastKey = 117;
    else if (dir.y == 1)
        lastKey = 104;

    if(e.which == 119 && lastKey != 115) { // W
        snake.direction(0, 0, -1);
        lastKey = e.which;
    } else if(e.which == 115 && lastKey != 119) { // S
        snake.direction(0, 0, 1);
        lastKey = e.which;
    } else if(e.which == 100 && lastKey != 97) { // D
        snake.direction(1, 0, 0);
        lastKey = e.which;
    } else if(e.which == 97 && lastKey != 100) { // A
        snake.direction(-1, 0, 0);
        lastKey = e.which;
    } else if(e.which == 117 && lastKey != 104) { // U
        snake.direction(0, 1, 0);
        lastKey = e.which;
    } else if(e.which == 104 && lastKey != 117) { // H
        snake.direction(0, -1, 0);
        lastKey = e.which;
    }

});

// Fonction permettant d'obtenir le statut de l'affichage des axes
function getRotationStatus() {
    return statusRotation;
}

// Fonction permettant de cacher les axes
function startRotation() {
    statusRotation = true;
}

// Fonction permettant d'afficher les axes
function stopRotation() {
    statusRotation = false;
}

// Fonction permettant de changer le status de statusShowAxes
function checkRotation(value) {
    if(value)
        startRotation();
    else
        stopRotation();
}

// Fonction permettant d'obtenir le statut de l'affichage des axes
function getAxesStatus() {
    return statusShowAxes;
}

// Fonction permettant de cacher les axes
function hideAxes() {
    statusShowAxes = false;
}

// Fonction permettant d'afficher les axes
function showAxes() {
    statusShowAxes = true;
}

// Fonction permettant de changer le status de statusShowAxes
function checkAxes(value) {
    if(value)
        showAxes();
    else
        hideAxes();
}

// Fonction permettant d'éteindre toutes les LEDS
function turnOffAllLeds() {
    for(var x = 0;x < number;x++) {
        for (var y = 0; y < number; y++) {
            for (var z = 0; z < number; z++) {
                leds[x][y][z].turnOff();
            }
        }
    }
}

// TODO
function foodLocation() {
    food.x = Math.floor((Math.random() * number) + 1) -1;
    food.y = Math.floor((Math.random() * number) + 1) -1;
    food.z = Math.floor((Math.random() * number) + 1) -1;
}