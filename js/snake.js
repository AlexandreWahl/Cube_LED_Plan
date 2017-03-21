function Snake(color, headColor, cubeSize, candyColor) {
    this.color = color;
    this.headColor = headColor;
    this.cubeSize = cubeSize;
    this.candyColor = candyColor;
    this.size = 3;
    this.speed = {
        x : 0,
        y : 0,
        z : 0
    };
    this.axes = ["x", "y", "z"];
    this.body = [];
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.isDead = false;
    this.moveSpeed = 500;

    this.eat = function(candy) {
        if(this.body[0].x - this.speed.x == candy.x && this.body[0].y - this.speed.y == candy.y && this.body[0].z - this.speed.z == candy.z) {
            this.size += 1;
            return true;
        } else {
            return false;
        }
    };

    this.direction = function(x, y, z) {
        this.speed.x = x;
        this.speed.y = y;
        this.speed.z = z;
    };

    this.death = function() {
        for (var i = 0; i < this.body.length; i++) {
            var pos = this.body[i];
            if (this.body[0].x - this.speed.x == pos.x && this.body[0].y - this.speed.y == pos.y && this.body[0].z - this.speed.z == pos.z) {
                this.total = 0;
                this.body = [];
                this.isDead = true;
                turnOffAllLeds();
                $("#score").text("SCORE : 0");
                alert("GAME OVER !");
            }
        }
    };

    this.update = function() {
        if(this.size == this.body.length +1) {
            this.body.push({
                x : this.body[this.body.length - 1].x,
                y : this.body[this.body.length - 1].y,
                z : this.body[this.body.length - 1].z,
                color : this.color
            });
        } else {
            leds[this.body[this.body.length - 1].x][this.body[this.body.length - 1].y][this.body[this.body.length - 1].z].turnOff();
        }

        for (var i = this.body.length-1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
            this.body[i].z = this.body[i - 1].z;
            this.body[i].color = this.color;
            setLedColorPos(this.body[i]);
        }

        if(this.body[0].x - this.speed.x == this.cubeSize) {
            this.body[0].x = 0;
        } else if(this.body[0].x - this.speed.x == -1) {
            this.body[0].x = this.cubeSize;
        }

        if(this.body[0].y - this.speed.y == this.cubeSize) {
            this.body[0].y = 0;
        } else if(this.body[0].y - this.speed.y == -1) {
            this.body[0].y = this.cubeSize;
        }

        if(this.body[0].z - this.speed.z == this.cubeSize) {
            this.body[0].z = 0;
        } else if(this.body[0].z - this.speed.z == -1) {
            this.body[0].z = this.cubeSize;
        }

        this.body[0] = {
            x : this.body[0].x - this.speed.x,
            y : this.body[0].y - this.speed.y,
            z : this.body[0].z - this.speed.z,
            color : this.headColor
        };
        setLedColorPos(this.body[0]);
    };

    this.show = function () {
        var random = Math.floor((Math.random() * 3));
        var axe = this.axes[random];
        this.speed[axe] = Math.random() >= 0.5 ? 1 : -1;

        this.x = Math.floor(this.cubeSize/2);
        this.y = Math.floor(this.cubeSize/2);
        this.z = Math.floor(this.cubeSize/2);

        this.body[0] = {
            x : this.x,
            y : this.y,
            z : this.z,
            color : this.headColor
        };
        setLedColorPos(this.body[0]);

        for (var i = 1; i < this.size; i++) {
            this.body[i] = {
                x : this.x + this.speed.x * i,
                y : this.y + this.speed.y * i,
                z : this.z + this.speed.z * i,
                color : this.color
            };
            setLedColorPos(this.body[i]);
        }
    };

    this.getSize = function() {
        return this.size;
    }

    this.getIsDead = function() {
        return this.isDead;
    }

    this.getMoveSpeed = function() {
        return this.moveSpeed;
    }

    this.setMoveSpeed = function(newMS) {
        console.log(newMS);
        if(newMS > 400) {
            this.moveSpeed = newMS;
        } else {
            this.moveSpeed = 400;
        }
    }

    this.getDirection = function() {
        return this.speed;
    }
}
