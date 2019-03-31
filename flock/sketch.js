var w = window.innerWidth;
var h = window.innerHeight;
var blobs = [];
var ffield;
var res = 5;

function mousePressed() {
    blobs.push(new Blob(mouseX, mouseY));
}

function setup() {
    createCanvas(w, h);

    ffield = new FlowField(res);
    for (var i = 0; i < 50; i++) {
        blobs[i] = new Blob(random(width), random(height));
    }
}

function draw() {

    background(20, 31, 31);


    for (var i = 0; i < blobs.length; i++) {
        blobs[i].scroll();
        blobs[i].follow(ffield);
        //blobs[i].arrive(createVector(mouseX, mouseY));
        blobs[i].flee(createVector(mouseX, mouseY));
        //blobs[i].avoid(blobs);
        blobs[i].update();
        blobs[i].show();
    }
    //console.log(blobs[0].lerpv);
}