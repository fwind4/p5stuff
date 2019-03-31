var Cell = function(x, y, ofs, val) {
    this.x = x;
    this.y = y;
    this.val = val;
    this.os = ofs;
    this.nCells = [];
    this.pval = val;
    this.pressed = false;

    this.calc = function() {
        this.pval = this.val
        var c = 0;
        for (var i = 0; i < 8; i++) {
            c = this.nCells[i].val ? c + 1 : c;
        }
        if (this.val) {
            if (c < 2 || c > 3) {
                this.pval = false;
            }
        } else {
            if (c == 3) {
                this.pval = true;
            }
        }
    }

    this.live = function() {
        this.val = this.pval;
    }

    this.update = function() {

        if (this.val) {
            fill(45, 179, 0);
        } else {
            fill(51);
        }
        strokeWeight(0.5);
        stroke(0);
        //quad(x, y, x + ofs, y, x + ofs, y + ofs, x, y + ofs);
        rect(x, y, ofs, ofs);
    }

}