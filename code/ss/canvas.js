/*
 * Helper function to create canvas object
 */
function createCanvas(id, level) {
  canvas = document.createElement("canvas");
  canvas.setAttribute("id", id);
  canvas.width = Math.min(document.documentElement.clientWidth*0.95, level.width * scale);
  canvas.height = Math.min(document.documentElement.clientHeight*0.95, level.height * scale);

  return canvas;
}

function CanvasDisplay(parent, level) {
  //Player canvas
  this.canvas = createCanvas("player", level);

  //UI Canvas
  this.UI = createCanvas("UI", level);

  //Add canvas to HTML page
  parent.appendChild(this.canvas);
  parent.appendChild(this.UI);

  //Get canvas context
  this.cx = this.canvas.getContext("2d");
  this.cu = this.UI.getContext("2d");

  //Draw death statistic
  var text = "Deaths: " + stats.deaths;
  drawText(text, "0.8em", 100, 100, "UI");

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
      //var tileX = tile == "lava" ? scale : 0;

      var sprite;
      if (tile == "lava") {
        sprite = lavaSprite;
      } else if (tile == "slideRight") {
        sprite = iceSprite;
      } else if (tile == "slideLeft") {
        sprite = iceSprite;
      } else {
        sprite = brickRSprite;
        if(this.level.grid[y][x+1] != null){
          sprite = brickLSprite;
          if(this.level.grid[y][x-1] != null){
            sprite = brickSprite;
          }
        }
      }

      this.cx.drawImage(sprite,
                        screenX, screenY, scale, scale);
    }
  }
};

CanvasDisplay.prototype.drawPlayer = function(x, y, width, height) {
  var sprite = 8, player = this.level.player;
  var spriteW = 24, spriteH = 30;
  width += playerXOverlap * 2;
  x -= playerXOverlap;
  if (player.speed.x != 0)
    this.flipPlayer = player.speed.x < 0;

  if (player.speed.y != 0)
    sprite = 9;
  else if (player.speed.x != 0)
    sprite = Math.floor(this.animationTime * 12) % 8;

  this.cx.save();
  if (this.flipPlayer) flipHorizontally(this.cx, x + width / 2);

  this.cx.drawImage(playerSprites,
                    sprite * spriteW, 0, spriteW, spriteH,
                    x,              y, width, height);

  if (player.holdingObject)
    this.drawActor(player.holdingObject);

  this.cx.restore();
};

CanvasDisplay.prototype.drawActor = function (actor) {
  var width = actor.size.x * scale;
  var height = actor.size.y * scale;
  var x = (actor.pos.x - this.viewport.left) * scale;
  var y = (actor.pos.y - this.viewport.top) * scale;
  if (actor.type == "player") {
    this.drawPlayer(x, y, width, height);
  } else {
    var sprite;
    if (actor.type == "switch") {
      if (actor.on) sprite = onLever;
      else sprite = offLever;
    } else if (actor.type == "coin") {
      sprite = coinSprite;
    } else if (actor.type == "lava") {
      sprite = lavaSprite;
    } else if (actor.type == "ladder") {
      sprite = brickSprite;
    } else if (actor.type == "transport") {
      sprite = lavaSprite;
    } else if (actor.type == "stone") {
      sprite = onLever;
    } else if (actor.type == "ladder" || actor.type == "thinBar") {
      sprite = brickSprite;
      if(actor.type == "thinBar") height = height * .1;
    }
    this.cx.drawImage(sprite, x, y, width, height);
  }
};

CanvasDisplay.prototype.drawActors = function() {
  this.level.actors.forEach(function (actor) { this.drawActor(actor);}, this);
};
