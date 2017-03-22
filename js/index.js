var number = 16;
var statusRotation = false;
var statusShowAxes = false;

init(number);
animate();

for(var i = 0;i < 3;i++) {
    for(var j = 0;j < 3;j++) {
        var select = "<select id=" + i + "-" + j + ">";
        select += "<option disabled selected></option>";

        for(var k = 0; k<number;k++) {
            select += "<option value=" + k + ">" + k + "</option>";
        }

        select += "</select>";

        $("#" + i + "-" + j).append(select);
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

// TODO
function setLedColor(x, y, z, c) {
    if(x < number && x >= 0 && y < number && y >= 0 && z < number && z >= 0) {
        leds[x][y][z].setColor(c);
    }
}

function confirmPlan() {
    turnOffAllLeds();

    var A = {
        x : $("#0-0").find(":selected").val(),
        y : $("#0-1").find(":selected").val(),
        z : $("#0-2").find(":selected").val()
    };

    var B = {
        x : $("#1-0").find(":selected").val(),
        y : $("#1-1").find(":selected").val(),
        z : $("#1-2").find(":selected").val()
    };

    var C = {
        x : $("#2-0").find(":selected").val(),
        y : $("#2-1").find(":selected").val(),
        z : $("#2-2").find(":selected").val()
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

    var P = {
        a : u.y * v.z - u.z * v.y,
        b : u.z * v.x - u.x * v.z,
        c : u.x * v.y - u.y * v.x
    };

    var d = -(P.a * A.x + P.b * A.y + P.c * A.z);
    var y = 0;

    for(var i = 0;i < number;i++) {
        for(var j = 0;j < number;j++) {
            y = (P.a * i + P.c * j + d) / -P.b;
            if(y > -1 && y < number)
                setLedColor(i, Math.round(y), j, "red");
        }
    }

}