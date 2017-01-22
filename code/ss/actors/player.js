function Player(pos) {
  this.pos = pos.plus(new Vector(0, -0.5));
  this.size = new Vector(0.8, 1.5);
  this.speed = new Vector(0, 0);
  this.charIndex;
  //this.gravity = 30;
  //this.jumpSpeed = 17;
  //this.playerXSpeed = 7;
  this.revertChar();
  //this.playerSprites = playerSprites;
  this.isTouchingSwitch = false;
  this.holdingObject = null
  this.facingRight = true;
}
Player.prototype.type = "player";

var dieFallingSpeed = 35;

Player.prototype.moveX = function(step, level, keys) {
  this.speed.x = 0;
  if (keys.left) {
    this.speed.x -= this.playerXSpeed;
    this.facingRight = false;
  } else if (keys.right) {
    this.speed.x += this.playerXSpeed;
    this.facingRight = true;
  }

  var motion = new Vector(this.speed.x * step, 0);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size);
  if (obstacle) {
      level.playerTouched(obstacle);
      if (obstacle == "fallthrough")
          this.pos = newPos;
  }
  else
      this.pos = newPos;
};

Player.prototype.moveY = function(step, level, keys) {
  this.speed.y += step * this.gravity;
  var motion = new Vector(0, this.speed.y * step);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size);
  if (obstacle) {
    if (this.speed.y > dieFallingSpeed) {
      level.status = "lost";
      level.finishDelay = 1;
    }

    if      (obstacle == "slideRight") this.pos.x += step * 2;
    else if (obstacle == "slideLeft")  this.pos.x -= step * 2;

    var curObstacle = level.obstacleAt(this.pos, this.size);
    if (obstacle == "fallthrough" && this.charIndex !== 2) 
      this.pos = newPos;
    else if (keys.jump && this.speed.y > 0 &&
            !(curObstacle == "fallthrough" && this.charIndex !== 1))
      this.speed.y = -this.jumpSpeed;
    else this.speed.y = 0;
  } else {
    this.pos = newPos;
  }
  //console.log(this.pos.y + " " + this.speed.y);
};

Player.prototype.moveYonLadder = function(actor, step, level, keys) {
  this.speed.y = 0;
  if (keys.down){
  if(actor.type == "ladder"){
      this.speed.y += playerXSpeed;
    }
    if(actor.type == "thinBar"){
    }
  }
  if (keys.up){
    this.speed.y -= playerXSpeed * 2;
  }
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
    this.moveYonLadder(actor, step, level, keys);
  } else {
    this.moveX(step, level, keys);
    this.moveY(step, level, keys);
  }
};

Player.prototype.changeChar = function (keys) {
    sound = new Sound(); //get instance of sound

    var charChange = this.charIndex;
    if (keys.charOneChange) {
        this.charIndex = 0;
        sound.playerSwitch("Flow");
    } else if (keys.charTwoChange) {
        this.charIndex = 1;
        sound.playerSwitch("Flex");
    } else if (keys.charThreeChange) {
        this.charIndex = 2;
        sound.playerSwitch("Floyd");
    }

    if (charChange !== this.charIndex) {
        this.gravity = charGravity[this.charIndex];
        this.jumpSpeed = charJumpSpeed[this.charIndex];
        this.playerXSpeed = charXspeed[this.charIndex];
        playerXSpeed = charXspeed[this.charIndex];
        playerSprites = charSprites[this.charIndex];
    }
}

Player.prototype.revertChar = function () {
    this.gravity = charGravity[0];
    this.jumpSpeed = charJumpSpeed[0];
    this.playerXSpeed = charXspeed[0];
    playerXSpeed = charXspeed[0];
    playerSprites = charSprites[0];
    this.charIndex = 0;
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
  if (this.holdingObject) {
    this.holdingObject.pos = this.pos.plus(new Vector(0, -0.6)) ;
    if (keys.actOne) {
      this.holdingObject.speed.x = 10 * (this.facingRight ? 1: - 1);
      this.holdingObject.speed.y = -6;
      level.actors.push(this.holdingObject);
      this.holdingObject = null;
    }
  }

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
var charGravity = [30, 22, 37]; //gravity values for characters one through three
var charJumpSpeed = [17, 20, 14];
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

Player.prototype.getCurrentChar = function() {
    return this.charIndex;
}
