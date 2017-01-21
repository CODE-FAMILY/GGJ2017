function Player(pos) {
  this.pos = pos.plus(new Vector(0, -0.5));
  this.size = new Vector(0.8, 1.5);
  this.speed = new Vector(0, 0);
  //this.gravity = 30;
  //this.jumpSpeed = 17;
  //this.playerXSpeed = 7;
  this.revertChar();
  //this.playerSprites = playerSprites;
  this.isTouchingSwitch = false;
}
Player.prototype.type = "player";

Player.prototype.moveX = function(step, level, keys) {
  this.speed.x = 0;
  if (keys.left) this.speed.x -= this.playerXSpeed;
  if (keys.right) this.speed.x += this.playerXSpeed;

  var motion = new Vector(this.speed.x * step, 0);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size);
  if (obstacle)
    level.playerTouched(obstacle);
  else
    this.pos = newPos;
};

Player.prototype.moveY = function(step, level, keys) {
  this.speed.y += step * this.gravity;
  var motion = new Vector(0, this.speed.y * step);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size);
  if (obstacle) {
    level.playerTouched(obstacle);

    if      (obstacle == "slideRight") this.pos.x += step * 2;
    else if (obstacle == "slideLeft")  this.pos.x -= step * 2;

    if (keys.jump && this.speed.y > 0)
      this.speed.y = -this.jumpSpeed;
    else
      this.speed.y = 0;
  } else {
    this.pos = newPos;
  }
};

Player.prototype.moveYonLadder = function(step, level, keys) {
  this.speed.y = 0;
  if (keys.down) this.speed.y += playerXSpeed;
  if (keys.up) this.speed.y -= playerXSpeed * 2;
  if (keys.jump) this.speed.y = -this.jumpSpeed;

  var motion = new Vector(0, this.speed.y * step);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size);
  if (obstacle){
    level.playerTouched(obstacle);
    
  } else {
    this.pos = newPos;
  }
};

Player.prototype.move = function(actor, step, level, keys) {
  if (actor && (actor.type == "ladder" || actor.type == "thinBar")) {
    this.moveX(step, level, keys);
    this.moveYonLadder(step, level, keys);
  } else {
    this.moveX(step, level, keys);
    this.moveY(step, level, keys);
  }
};

Player.prototype.changeChar = function (keys) {
    var charIndex = -1;
    if (keys.charOneChange)
        charIndex = 0;
    else if (keys.charTwoChange)
        charIndex = 1;
    else if (keys.charThreeChange)
        charIndex = 2;

    if (charIndex != -1) {
        this.gravity = charGravity[charIndex];
        this.jumpSpeed = charJumpSpeed[charIndex];
        this.playerXSpeed = charXspeed[charIndex];
        playerXSpeed = charXspeed[charIndex];
        playerSprites = charSprites[charIndex];
    }
}

Player.prototype.revertChar = function () {
    this.gravity = charGravity[0];
    this.jumpSpeed = charJumpSpeed[0];
    this.playerXSpeed = charXspeed[0];
    playerXSpeed = charXspeed[0];
    playerSprites = charSprites[0];
}

Player.prototype.actions = function(step, level, keys){
  if(keys.actOne){

  } else if(keys.actTwo){
    
  } else if(keys.actThree){
    
  }
}

Player.prototype.act = function(step, level, keys) {
  var otherActor = level.actorAt(this);
  this.actions(step, level, keys);
  this.changeChar(keys);

  this.move(otherActor, step, level, keys);

  if (otherActor) {
    level.playerTouched(otherActor.type, otherActor);
  } else if(!otherActor || otherActor.type != "switch") {
    this.touchingSwitch = null;
  }


  // Losing animation
  if (level.status == "lost") {
    this.pos.y += step;
    this.size.y -= step;
  }
};

//Character Stats
var charGravity = [30, 22, 38]; //gravity values for characters one through three
var charJumpSpeed = [17, 20, 13];
var charXspeed = [7, 5, 11];

//getters and setters
Player.prototype.setGravity = function(tempGrav){
  this.gravity = tempGrav;
} 

Player.prototype.getGravity = function(){
  return this.gravity;
} 

Player.prototype.setJumpSpeed = function(tempSpeed){
  this.speed = tempSpeed;
} 

Player.prototype.getJumpSpeed = function(){
  return this.speed;
} 

Player.prototype.setXSpeed = function(tempXSpeed){
  this.playerXSpeed = tempXSpeed;
} 

Player.prototype.getXSpeed = function(){
  return this.playerXSpeed;
} 

Player.prototype.setSpriteSrc = function(tempSrc){
  this.playerSprites.src = tempSrc;
}

Player.prototype.getSprite = function(){
  return this.playerSprites;
}