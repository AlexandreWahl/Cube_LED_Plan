function Led(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.color = "white";
    this.radius = 0.5;
    this.size = 10;
    this.sphere = "";
    this.opacity = 0.10;
    this.isOff = true;

    this.create = function () {
        this.material = new THREE.MeshBasicMaterial({
            color: this.color,
            transparent : true,
            opacity : this.opacity
        });
        this.sphere = new THREE.Mesh(new THREE.SphereGeometry(this.radius, this.size, this.size), this.material);
    };

    this.setpos = function (x, y, z) {
        this.sphere.position.set(x, y, z);
    };

    this.show = function () {
        return this.sphere;
    };

    this.getColor = function () {
        return this.material.color;
    };

    this.setColor = function (c) {
        this.material.color = new THREE.Color(c);
        this.isOff = false;
        this.material.opacity = 1;
    };

    this.turnOff = function() {
        this.isOff = true;
        this.material.opacity = this.opacity;
        this.material.color = new THREE.Color("white");
    }
}
