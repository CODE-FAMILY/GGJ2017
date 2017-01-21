
/*
 * Helper function to create canvas object
 */
function createCanvas(id, level) {
  canvas = document.createElement("canvas");
  canvas.setAttribute("id", id);
  canvas.width = Math.min(document.documentElement.clientWidth, level.width * scale);
  canvas.height = Math.min(document.documentElement.clientHeight, level.height * scale);

  return canvas;
}

function CanvasDisplay(parent, level) {
  //Player canvas
  this.canvas = createCanvas("player", level);

  //UI Canvas
  this.UI = createCanvas("UI", level);

  //UI and Player canvas to HTML page
  parent.appendChild(this.UI);
  parent.appendChild(this.canvas);

  //Get canvas context
  this.cx = this.canvas.getContext("2d");

  this.level = level;
  this.animationTime = 0;
  this.flipPlayer = false;

  this.viewport = {
    left: 0,
    top: 0,
    width: this.canvas.width / scale,
    height: this.canvas.height / scale
  };

  this.drawFrame(0);
}

CanvasDisplay.prototype.clear = function() {
  this.canvas.parentNode.removeChild(this.canvas);
  this.UI.parentNode.removeChild(this.UI);
};

CanvasDisplay.prototype.drawFrame = function(step) {
  this.animationTime += step;

  this.updateViewport();
  this.clearDisplay();
  this.drawBackground();
  this.drawActors();
};

CanvasDisplay.prototype.updateViewport = function() {
  var view = this.viewport, hmargin = view.width / 3, vmargin = view.height / 3;
  var player = this.level.player;
  var center = player.pos.plus(player.size.times(0.5));

  if (center.x < view.left + hmargin)
    view.left = Math.max(center.x - hmargin, 0);
  else if (center.x > view.left + view.width - hmargin)
    view.left = Math.min(center.x + hmargin - view.width,
                         this.level.width - view.width);
  if (center.y < view.top + vmargin)
    view.top = Math.max(center.y - vmargin, 0);
  else if (center.y > view.top + view.height - vmargin)
    view.top = Math.min(center.y + vmargin - view.height,
                        this.level.height - view.height);
};

CanvasDisplay.prototype.clearDisplay = function() {
  if (this.level.status == "won")
    this.cx.fillStyle = "rgb(68, 191, 255)";
  else if (this.level.status == "lost")
    this.cx.fillStyle = "rgb(44, 136, 214)";
  else
    this.cx.fillStyle = "rgb(52, 166, 251)";
  this.cx.fillRect(0, 0,
                   this.canvas.width, this.canvas.height);
};

CanvasDisplay.prototype.drawBackground = function() {
  var view = this.viewport;
  var xStart = Math.floor(view.left);
  var xEnd = Math.ceil(view.left + view.width);
  var yStart = Math.floor(view.top);
  var yEnd = Math.ceil(view.top + view.height);

  for (var y = yStart; y < yEnd; y++) {
    for (var x = xStart; x < xEnd; x++) {
      var tile = this.level.grid[y][x];
      if (tile == null) continue;
      var screenX = (x - view.left) * scale;
      var screenY = (y - view.top) * scale;

      var sprite;
      if (tile == "lava")
          sprite = lavaSprite;
      else
          sprite = brickSprite;
      this.cx.drawImage(sprite,
                        screenX, screenY, scale, scale);
    }
  }
};

CanvasDisplay.prototype.drawPlayer = function(x, y, width, height) {
  var sprite = 8, player = this.level.player;
  width += playerXOverlap * 2;
  x -= playerXOverlap;
  if (player.speed.x != 0)
    this.flipPlayer = player.speed.x < 0;

  if (player.speed.y != 0)
    sprite = 9;
  else if (player.speed.x != 0)
    sprite = Math.floor(this.animationTime * 12) % 8;

  this.cx.save();
  if (this.flipPlayer)
    flipHorizontally(this.cx, x + width / 2);

  playerSprites.src = playerSpritesSrc[sprite];
  this.cx.drawImage(playerSprites,
                    x,              y, width, height);

  this.cx.restore();
};

CanvasDisplay.prototype.drawActors = function() {
  this.level.actors.forEach(function(actor) {
    var width = actor.size.x * scale;
    var height = actor.size.y * scale;
    var x = (actor.pos.x - this.viewport.left) * scale;
    var y = (actor.pos.y - this.viewport.top) * scale;
    if (actor.type == "player") {
        this.drawPlayer(x, y, width, height);
    }
    else {
        var sprite;
        if (actor.type == "coin")
            sprite = coinSprite;
        else if (actor.type == "lava")
            sprite = lavaSprite;

        this.cx.drawImage(sprite,
                          x, y, width, height);
    }
  }, this);
};