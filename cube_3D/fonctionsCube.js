var number = getNumber();

function setLedColor(x, y, z, c) {
    if(x < number && x >= 0 && y < number && y >= 0 && z < number && z >= 0) {
        leds[x][y][z].setColor(c);
    }
}

function setLedColorPos(pos) {
    setLedColor(pos.x, pos.y, pos.z, pos.color);
}

