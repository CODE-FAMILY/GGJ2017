function SecretWall(pos, ch) {
  this.size = new Vector(1, 1);
  this.pos = pos;
  this.active = true;
  this.ch = ch;
}

SecretWall.prototype.type = "secretWall";

SecretWall.prototype.setWall = function (level) {
  level.grid[this.pos.y][this.pos.x] = "secretWall";
}

SecretWall.prototype.hideWall = function (level) {
  level.grid[this.pos.y][this.pos.x] = null;
}

SecretWall.prototype.act = function(step, level) {
  if (this.active) this.setWall(level);
  else this.hideWall(level);
};

function removeSecretWall(pos, size, level) {
  var xStart = Math.floor(pos.x);
  var xEnd = Math.ceil(pos.x + size.x);
  var yStart = Math.floor(pos.y);
  var yEnd = Math.ceil(pos.y + size.y);

  for (var y = yStart; y < yEnd; y++) {
    for (var x = xStart; x < xEnd; x++) {
      if (level.grid[y][x] == "secretWall")
        level.grid[y][x] = null;
    }
  }
}
