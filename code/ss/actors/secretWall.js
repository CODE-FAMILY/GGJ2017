function SecretWall(pos, ch) {
  this.size = new Vector(1.1, 1);
  this.pos = pos;
  this.active = false;
  this.ch = ch;
}

SecretWall.prototype.type = "secretWall";

SecretWall.prototype.setWall = function (level) {
  level.grid[this.pos.y][this.pos.x] = "wall";
}

SecretWall.prototype.hideWall = function (level) {
  level.grid[this.pos.y][this.pos.x] = null;
}

SecretWall.prototype.act = function(step, level) {
  if (this.active) {
    this.setWall(level);
  } else {
    this.hideWall(level);
  }
};
