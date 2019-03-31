function Blob(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSp = random(2, 5);
    this.maxF = 0.1;
    this.lerpv = random(1);
}

Blob.prototype.avoid = function(blobs) {
    var neighb = [];
    for (var i = 0; i < blobs.lenght; i++) {
        var d = p5.Vector.dist(this.pos, blobs[i].pos);
        if (d > 0 && d < 15) {
            var diff = p5.Vector.sub(this.pos, blobs[i].pos);
            diff.normalize();
            diff.div(d);
            neighb.push(diff);
        }
    }
    var vec = createVector(0, 0);
    for (var i = 0; i < neighb.lenght; i++) {
        vec.add(neighb[i]);
    }
    if (neighb.lenght) {
        vec.div(neighb.lenght)
        vec.normalize();
        vec.mult(maxSp);
        vec = p5.Vector.sub(vec, this.vel);
        vec.limit(maxF);
        applyF(vec);
    }
}

Blob.prototype.show = function() {
    push();
    var cola = color(30, 47, 47);
    var colb = color(224, 235, 235);
    if (this.lerpv >= 0.50) {
        var temp = cola;
        cola = colb;
        colb = temp;
    }
    var lc = lerpColor(cola, colb, this.lerpv);
    fill(lc);
    noStroke();

    translate(this.pos.x, this.pos.y);
    var a = this.vel.heading();
    rotate(a);
    beginShape();
    vertex(0, 0);
    vertex(random(-5, -15), random(5, 15));
    vertex(random(-5, -15), random(-5, -15));
    endShape(CLOSE);
    pop();
    this.lerpv = (this.lerpv + 0.01) % 1;
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
        steer.limit(this.maxF*3);
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

Blob.prototype.follow = function(field) {
    var desired = field.lookup(this.pos);
    desired.setMag(this.maxSp);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxF);
    this.applyF(steer);
}

Blob.prototype.applyF = function(f) {
    this.acc.add(f);
}
