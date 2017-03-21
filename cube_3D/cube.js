var camera, scene, renderer, controls, axes;
// var w = window.innerWidth;
// var h = window.innerHeight;
var w = 1000;
var h = 1000;
var size = 40;
// var number = 13;
var leds = "";

function getNumber() {
    return number;
}

function init(number) {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, w / h, 1, 10000);
    camera.position.set(19.7, 37.7, 90.5).setLength(100);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(w, h);
    document.body.appendChild(renderer.domElement);

    scene.background = new THREE.Color("#5d6168");

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls.enableKeys = false;
    // controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableRotate = true;
    controls.rotateSpeed = 0.5;

    leds = [];
    for(var i = 0;i < number;i++) {
        leds[i] = [];
        for(var j = 0;j < number;j++) {
            leds[i][j] = [];
            for(var k = 0;k < number;k++) {
                leds[i][j][k] = new Led(i, j, k);
                leds[i][j][k].create();
                leds[i][j][k].setpos(size/2 - size/(number-1)*i, size/2 - size/(number-1)*j, size/2 - size/(number-1)*k);
                scene.add(leds[i][j][k].show());
            }
        }
    }

    axes = new THREE.AxisHelper(size);
}


function animate() {
    requestAnimationFrame(animate);

    if(getRotationStatus()) {
        scene.rotation.x += 0.02;
        scene.rotation.y += 0.02;
        scene.rotation.z += 0.02;
    }

    if(getAxesStatus()) {
        scene.add(axes);
    } else {
        scene.remove(axes);
    }

    render();
}

function render() {
    renderer.render(scene, camera);
}