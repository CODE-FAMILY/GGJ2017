var actorChars = {
  "@": Player,
  "o": Coin,
  "s": Stone,
  "#": Ladder,
  "h": Harpoon, "i": Harpoon, "j": Harpoon, "k": Harpoon,
  "l": Harpoon, "m": Harpoon, "n": Harpoon, "q": Harpoon,
  "_": thinBar,
  "t": Transport,
  "=": Lava, "|": Lava, "v": Lava,
  "w": fallthrough,

  "0": Switch, "A": Lava,
  "1": Switch, "B": SecretWall,
  "7": SkillSwitch, "H": Harpoon,
  "8": SkillSwitch
};

function Level(plan) {
  this.width = plan[0].length;
  this.height = plan.length;
  this.grid = [];
  this.actors = [];

  for (var y = 0; y < this.height; y++) {
    var line = plan[y], gridLine = [];
    for (var x = 0; x < this.width; x++) {
      var ch = line[x], fieldType = null;
      var Actor = actorChars[ch];

      if (Actor) this.actors.push(new Actor(new Vector(x, y), ch));

      if (ch == "x") fieldType = "wall";
      else if (ch == "B") fieldType = "wall";
      else if (ch == "p") fieldType = "secretWall";
      else if (ch == "!") fieldType = "lava";
      else if (ch == "*") fieldType = "ice";

      gridLine.push(fieldType);
    }
    this.grid.push(gridLine);
  }

  //select player start position
  this.player = this.actors.filter(function(actor) {
    sound = new Sound(); //get instance of Sound
    sound.playerSwitch(Character.FLEX);
    uidisplay = new UICanvas();
    uidisplay.setPlayerName(Character.FLEX);

    return actor.type == "player";
  })[0];

  this.actors.forEach(function (actor) {
    if (actor.type == "switch" || actor.type == "skillSwitch")
      mapConnectedActor(actor, this.actors);
  }, this);
  this.actors.sort(stoneSort);
  this.status = this.finishDelay = null;
}


Level.prototype.isFinished = function() {
  return this.status != null && this.finishDelay < 0;
};

Level.prototype.obstacleAt = function(pos, size) {
  var xStart = Math.floor(pos.x);
  var xEnd = Math.ceil(pos.x + size.x);
  var yStart = Math.floor(pos.y);
  var yEnd = Math.ceil(pos.y + size.y);

  if (xStart < 0 || xEnd > this.width || yStart < 0) return "wall";
  if (yEnd > this.height) return "lava";

  for (var y = yStart; y < yEnd; y++) {
    for (var x = xStart; x < xEnd; x++) {
      var fieldType = this.grid[y][x];
      if (fieldType) return fieldType;
    }
  }
};

Level.prototype.actorAt = function(actor) {
  var actorings = []
  for (var i = 0; i < this.actors.length; i++) {
    var other = this.actors[i];
    if (other != actor &&
        actor.pos.x + actor.size.x > other.pos.x &&
        actor.pos.x < other.pos.x + other.size.x &&
        actor.pos.y + actor.size.y > other.pos.y &&
        actor.pos.y < other.pos.y + other.size.y)
      actorings.push(other);
  }
  return actorings;
};

Level.prototype.animate = function(step, keys) {
  if (this.status != null)
    this.finishDelay -= step;

  while (step > 0) {
    var thisStep = Math.min(step, maxStep);
    this.actors.forEach(function(actor) { actor.act(thisStep, this, keys); }, this);
    step -= thisStep;
  }
};

Level.prototype.playerTouched = function(type, actor) {
  if ((type == "lava" || type == "harpoon") && this.status == null) {
    if ( this.player.isImmortal() ) {

      console.log("Player is immortal");
    } else {

      this.status = "lost";
      this.finishDelay = 1;

      sound = new Sound();
      if (this.player.getCurrentChar() == Character.FLOW) {
        sound.triggerPlayerSound("Flow", "Flow-Death");
      } else if (this.player.getCurrentChar() == Character.FLEX) {
        sound.triggerPlayerSound("Flex", "Flex-Death");
      } else if (this.player.getCurrentChar() == Character.FLOYD) {
        sound.triggerPlayerSound("Floyd", "Floyd-Death");
      }
    }
  } else if (type == "coin") {
    sound = new Sound();
    sound.triggerSound("Whale-Cry");

    this.actors = this.actors.filter(function(other) { return other != actor;});
    if (!this.actors.some(function(actor) { return actor.type == "coin"; })) {
      this.status = "won";
      this.finishDelay = 3;

      console.log("won!");
    }
  } else if (type == "switch") {
    if (this.player.touchingSwitch != actor) {
      actor.on = !actor.on;
      this.player.touchingSwitch = actor;
    }
  } else if (type == "transport") {
      this.status = "won";
  } else if (type == "stone") {
    if (this.player.charIndex == Character.FLOYD) {
      this.actors = this.actors.filter(function (other) { return other != actor; });
      this.player.holdingObject = actor;
    }
  }
};
