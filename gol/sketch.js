var w = window.innerWidth;
var h = window.innerHeight;
var oset = 20;
var grid = [];
var button;
var sim;
var xs;
var ys;
var ipr;


function setup() {
    createCanvas(w, h);
    frameRate(30);
    button = createButton('Go/Pause');
    button.position(65, 65);
    button.size(oset * 4, oset * 2);
    button.mousePressed(function() {
        if (sim) {
            sim = false;
        } else {
            sim = true;
        }
    });

    xs = floor(w / oset);
    ys = floor(h / oset);

    for (var y = 0; y < ys; y++) {
        for (var x = 0; x < xs; x++) {
            var ind = x + y * (xs);
            grid[ind] = new Cell(x * oset, y * oset, oset, false);
        }
    }

    for (var y = 0; y < ys; y++) {
        for (var x = 0; x < xs; x++) {
            var ind = x + y * (xs);
            if (x == 0 || y == 0 || x == xs - 1 || y == ys - 1) {
                for (var i = 0; i < 8; i++) {
                    grid[ind].nCells[i] = grid[ind];
                }
            } else {

                grid[ind].nCells[0] = grid[ind - 1];
                grid[ind].nCells[1] = grid[ind + 1];
                grid[ind].nCells[2] = grid[x + (y - 1) * (xs)];
                grid[ind].nCells[3] = grid[x + (y + 1) * (xs)];
                grid[ind].nCells[4] = grid[x - 1 + (y - 1) * (xs)];
                grid[ind].nCells[5] = grid[x + 1 + (y - 1) * (xs)];
                grid[ind].nCells[6] = grid[x - 1 + (y + 1) * (xs)];
                grid[ind].nCells[7] = grid[x + 1 + (y + 1) * (xs)];
            }
        }
    }
}

function mousePressed() {
    var ind = floor(mouseX / oset) + floor(mouseY / oset) * (xs);
    if (ind < grid.length) {
        grid[ind].val = grid[ind].val ? false : true;
        //grid[ind].pressed = true;
    }
}

function mouseDragged() {
    var ind = floor(mouseX / oset) + floor(mouseY / oset) * (xs);
    if (ind < grid.length && !grid[ind].pressed) {
        grid[ind].val = grid[ind].val ? false : true;
        grid[ind].pressed = true;
    }
}

function mouseReleased() {
    for (var i = 0; i < grid.length; i++) {
        grid[i].pressed = false;
    }
}

function draw() {

    background(51);
    for (var y = 0; y < ys; y++) {
        for (var x = 0; x < xs; x++) {
            var ind = x + y * (xs);
            grid[ind].update();
        }
    }
    if (sim) {
        for (var y = 0; y < ys; y++) {
            for (var x = 0; x < xs; x++) {
                var ind = x + y * (xs);
                grid[ind].calc();
            }
        }
        for (var y = 0; y < ys; y++) {
            for (var x = 0; x < xs; x++) {
                var ind = x + y * (xs);
                grid[ind].live();
            }
        }
    }
    //console.log(grid);
}