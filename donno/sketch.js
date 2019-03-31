var n;
var d;
var sliderN;
var sliderD;

function setup() {
    createCanvas(800, 800);
    sliderD = createSlider(1, 10, 4);
    sliderN = createSlider(1, 10, 5);
}

function draw() {
    d = sliderD.value();
    n = sliderN.value();
    var k = n / d;
    background(51);
    translate(width / 2, height / 2);

    beginShape();
    stroke(255);
    noFill();
    strokeWeight(1);
    for (var a = 0; a < TWO_PI * d; a += 0.01) {
        var r = 400 * cos(a * k);
        var x = r * cos(a);
        var y = r * sin(a);
        vertex(x, y);
    }
    endShape(CLOSE);

}