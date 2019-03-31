var vid;
var cols = 8 * 80;
var rows = 8 * 60;
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


    image(vid, VIDEO);
    /*    textSize(8);
        textFont(font);
        textLeading(1);
        fill(255);*/
    //vid.mute();

    //txti = createInput("Hello");
    //txti.size(640, 480);
    //txti.parent("mirror");
}

function draw() {
    background(0);
    var r, g, b, a;
    loadPixels();
    for (var y = 0; y < vid.height; y++) {
        var vstr = "";
        for (var x = 0; x < vid.width; x++) {
            var ind = (x + y * vid.width) * 4;



            /* r = vid.pixels[ind + 0];
             g = vid.pixels[ind + 1];
             b = vid.pixels[ind + 2];
             //fill(r, g, b);

             if (r > g && r > b) {
                 a = 82;
             } else if (g > b) {
                 a = 71;
             } else {
                 a = 66;
             }
             //a = map(a, 0, 255, 32, 122);

             //fill(r, g, b, 255);
             //rect(x * 8, y * 8, 8, 8);
             //fill(255, 255, 255, 125);
             a = String.fromCharCode(a);
             vstr = vstr + a;*/
        }
        //console.log(vstr);
        //text(vstr, 5, 10 + 8 * y);
    }

}