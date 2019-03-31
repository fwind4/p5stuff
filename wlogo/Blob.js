function Blob(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSp = random(8, 10);
    this.maxF = 0.2;
    this.lerpv = random(1);
    this.lf = random(0.5, 2);
    this.rh = random(1) >= 0.5 ? 1 : -1;
}

Blob.prototype.show = function() {
    push();
    var cola = color(43, 48, 29);
    var colb = color(221, 226, 207);
    if (this.lerpv >= 0.50) {
        var temp = cola;
        cola = colb;
        colb = temp;
    }
    var lc = lerpColor(cola, colb, this.lerpv);
    fill(lc);
    //noStroke();

    translate(this.pos.x, this.pos.y);
    //rotate(random(TWO_PI));
    rotate(lerp(0, TWO_PI * this.rh, this.lerpv));
    //ellipse(this.pos.x, this.pos.y, random(2, 5), random(2, 5));
    var xy = lerp(0, 5, this.lerpv);
    var xy2 = lerp(-2, -7, this.lerpv);
    var y1 = lerp(1, 6, this.lerpv);
    var y2 = lerp(-1, -6, this.lerpv);
    triangle(xy, xy, xy2, y1, xy2, y2);
    pop();
    this.lerpv = (this.lerpv + 0.01 * this.lf) % 1;
}


Blob.prototype.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
}

Blob.prototype.seek = function(target) {
    var desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSp);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxF);
    this.applyF(steer);
}

Blob.prototype.flee = function(target) {
    if (p5.Vector.dist(this.pos, target) < 150) {
        var desired = p5.Vector.sub(target, this.pos);
        desired.setMag(this.maxSp);
        desired.mult(-1);
        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxF * 4);
        this.applyF(steer);
    }
}

Blob.prototype.arrive = function(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = p5.Vector.dist(this.pos, target);
    if (d < 150) {
        var speed = map(d, 0, 150, 0, this.maxSp);
        desired.setMag(speed);
    } else {
        desired.setMag(this.maxSp);
    }
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxF);
    this.applyF(steer);
}

Blob.prototype.scroll = function() {
    if (this.pos.x > width) {
        this.pos.x = 0;
    } else if (this.pos.y > height) {
        this.pos.y = 0;
    } else if (this.pos.x < 0) {
        this.pos.x = width;
    } else if (this.pos.y < 0) {
        this.pos.y = height;
    }
}

Blob.prototype.applyF = function(f) {
    this.acc.add(f);
}