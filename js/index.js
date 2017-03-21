var number = 12;
var statusRotation = false;
var statusShowAxes = false;

init(number);
animate();

var A = {
    x : 1,
    y : 4,
    z : 8
};

var B = {
    x : 1,
    y : 2,
    z : 4
};

var C = {
    x : 5,
    y : 2,
    z : 4
};


var u = {
    x : B.x - A.x,
    y : B.y - A.y,
    z : B.z - A.z
};

var v = {
    x : C.x - A.x,
    y : C.y - A.y,
    z : C.z - A.z
};

var afterCross = {
    a : u.y * v.z - u.z * v.y,
    b : u.z * v.x - u.x * v.z,
    c : u.x * v.y - u.y * v.x
};

var d = -(afterCross.a * A.x + afterCross.x * A.y + afterCross.c * A.z);

console.log(d);

var equation = afterCross.a

for(var i = 0;i < number;i++) {
    for(var j = 0;j < number;j++) {

    }
}





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