var vid;
var cols = 80;
var rows = 60;
var font;

function preload() {
    font = loadFont("Commo.otf");
}


function setup() {
    createCanvas(640, 480);
    //noCanvas();
    vid = createVideo("osvid.mp4");
    //vid = createCapture(VIDEO);
    vid.size(cols, rows);
    vid.play();
    //vid.volume(0);

    textSize(8);
    textFont(font);
    textLeading(1);
    fill(255);
    //vid.mute();

    //txti = createInput("Hello");
    //txti.size(640, 480);
    //txti.parent("mirror");
}

function draw() {
    background(0);
    var r, g, b, a;

    vid.loadPixels();
    for (var y = 0; y < vid.height; y++) {
        var vstr = "";
        for (var x = 0; x < vid.width; x++) {
            var ind = (x + y * vid.width) * 4;
            r = vid.pixels[ind + 0];
            g = vid.pixels[ind + 1];
            b = vid.pixels[ind + 2];
            //fill(r, g, b);
            a = (r + g + b) / 3;
            a = map(a, 0, 255, 32, 122);

            //a = (a < 48) ? 56 : a;
            //a = (a > 122) ? 122 : a;
            //a = (a > 122 || (a < 97 && a > 90)) ? 12 : a;
            a = String.fromCharCode(a);
            vstr = vstr + a;
        }
        //console.log(vstr);
        text(vstr, 5, 10 + 8 * y);
    }

}