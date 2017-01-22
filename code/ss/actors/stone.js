function Stone(pos) {
  this.size = new Vector(0.5, 0.5);
  this.pos = pos;
  this.speed = new Vector(0, 0);
  this.gravity = 10;
}

Stone.prototype.type = "stone";

Stone.prototype.moveX = function(step, level) {
  var motion = new Vector(this.speed.x * step, 0);
  var newPos = this.pos.plus(motion);

  var obstacle = level.obstacleAt(newPos, this.size); 
  if (!obstacle) this.pos = newPos;

  if (this.speed.x > 0) this.speed.x -= 5 * step;
  else if (this.speed.x < 0) this.speed.x += 5 * step;

  if (this.speed.x < 0.1 && this.speed.x > -0.1)
    this.speed.x = 0;
};

Stone.prototype.moveY = function(step, level) {
  this.speed.y += step * this.gravity;

  var motion = new Vector(0, this.speed.y * step);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size);
  if (obstacle) {
    this.speed.y = 0;
    if      (obstacle == "slideRight") this.pos.x += step * 2;
    else if (obstacle == "slideLeft")  this.pos.x -= step * 2;
  } else {
    this.pos = newPos;
  }
};

Stone.prototype.act = function(step, level) {
  this.moveX(step, level);
  this.moveY(step, level);

  var otherActor = level.actorAt(this);
  if (otherActor && otherActor.type == "skillSwitch") {
    if (this.touchingSwitch != otherActor) {
      otherActor.on = !otherActor.on;
      this.touchingSwitch = otherActor;
      otherActor.connectedActor.repeat += 1;
    }
  } else if(!otherActor || otherActor.type != "skillSwitch") {
    this.touchingSwitch = null;
  }
};

function stoneSort(a, b) {
  if (a.type == "stone") return -1;
  else if (a.type != "stone") return 1;
  else return 0;
}