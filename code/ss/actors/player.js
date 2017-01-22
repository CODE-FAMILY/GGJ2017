function Player(pos) {
  this.pos = pos.plus(new Vector(0, -0.5));
  this.size = new Vector(0.8, 1.5);
  this.speed = new Vector(0, 0);
  this.charIndex;
  this.bouncing = 0; //any value greather than 0 is jumping
  this.death = false;
  //this.gravity = 30;
  //this.jumpSpeed = 17;
  //this.playerXSpeed = 7;
  this.revertChar();
  //this.playerSprites = playerSprites;
  this.isTouchingSwitch = false;
  this.holdingObject = null
  this.facingRight = true;
  this.FlowDash = {
    dashCharge : 100,
    dashOn : false
  };
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
  
  if(keys.actTwo && this.charIndex == Character.FLOW && this.FlowDash.dashCharge >= 50){
    this.FlowDash.dashCharge -= 20;
    if (this.facingRight){
      this.speed.x += this.playerXSpeed;
    }else{
      this.speed.x -= this.playerXSpeed;
    }

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
    if (keys.jump && this.speed.y > 0 && curObstacle != "fallthrough") {
      this.speed.y = -this.jumpSpeed;

    } else if (obstacle == "fallthrough") {
        this.speed.y = step * this.gravity * 7;
        if (this.charIndex === Character.FLEX)
            this.speed.y *= 2;
    } else {
      this.speed.y = 0;
    }

    if (obstacle == "fallthrough" && //if the tile they're sinking into is water and
        !((this.charIndex === Character.FLOW && (keys.actTwo || keys.actThree))) || //they aren't a Flow that is using the action keys nor
            (level.obstacleAt(this.pos, this.size) == "fallthrough")) {             //are they already submerged if they are Flow
        this.pos = newPos;
    }

    //FLOW Bounce
    if (this.bouncing > 0) {
      //jump again
      this.speed.y = -this.jumpSpeed * (this.bouncing/10);
      this.bouncing--;
    }
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

  if (keys.up) {
    this.speed.y -= playerXSpeed * 2;
  }

  if (keys.jump) {
    this.speed.y = -this.jumpSpeed;
  }

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
        this.charIndex = Character.FLOW;
        sound.playerSwitch(Character.FLOW);
    } else if (keys.charTwoChange) {
        this.charIndex = Character.FLEX;
        sound.playerSwitch(Character.FLEX);
    } else if (keys.charThreeChange) {
        this.charIndex = Character.FLOYD;
        sound.playerSwitch(Character.FLOYD);
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
    if (this.charIndex == Character.FLEX) {
    } else if (this.charIndex == Character.FLOYD) {
    } else if (this.charIndex == Character.FLOW) {
      if( keys.jump ) {
        this.bouncing = 10;
      }
    }
  } else if(keys.actTwo){
    // if(this.charIndex == Character.FLOW){
    //   console.log(this.FlowDash.dashCharge)
    //   if(this.FlowDash.dashOn) {this.moveX(1, level, keys);}
    // }

  } else if(keys.actThree){

  }
}

Player.prototype.act = function(step, level, keys) {
  var otherActor = level.actorAt(this);
  if(this.FlowDash.dashCharge <= 0) {this.FlowDash.dashCharge += 0.2;}
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
var charGravity = [31, 31, 31]; //gravity values for characters one through three
var charJumpSpeed = [17, 17, 17];
var charXspeed = [7, 7, 7];

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
