var w = window.innerWidth;
var h = window.innerHeight;
var blobs = [];
var fnt;
var points = [];

function preload() {
    fnt = loadFont('Avenir.ttf');
}

function setup() {
    createCanvas(w, h);
    fill(223, 255, 128);
    noStroke();
    textFont(fnt);
    textSize(158);
    //textAlign(CENTER);
    //text("wind's realm", 2, 2);
    points = fnt.textToPoints('wind\'srealm', 100, height * 0.75);

    for (var i = 0; i < points.length; i++) {
        blobs[i] = new Blob(random(width), random(height));
    }
}

function draw() {

    background(28, 32, 19);

    for (var i = 0; i < blobs.length; i++) {
        blobs[i].scroll();
        blobs[i].arrive(createVector(points[i].x, points[i].y));
        blobs[i].flee(createVector(mouseX, mouseY));
        //blobs[i].avoid(blobs);
        blobs[i].update();
        blobs[i].show();
    }
    //console.log(blobs[0].lerpv);
}