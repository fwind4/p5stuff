function FlowField(res) {
    this.field = []
    this.w = width / res;
    this.h = height / res;
    this.res = res;

    var yoff = 0.0;
    for (var y = 0; y < this.h; y++) {
        var xoff = 0.0;
        for (var x = 0; x < this.w; x++) {
            var ind = x + y * this.w;
            var theta = map(noise(xoff, yoff), 0, 1, 0, TWO_PI);
            this.field[ind] = p5.Vector.fromAngle(theta - PI * 0.25);
            xoff += 0.1;
        }
        yoff += 0.1;
    }
}

FlowField.prototype.lookup = function(pos) {
    var x = floor(constrain(pos.x / this.res, 0, this.w - 1));
    var y = floor(constrain(pos.y / this.res, 0, this.h - 1));
    return this.field[x + y * this.w].copy();
}