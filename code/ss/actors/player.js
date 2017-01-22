function Player(pos) {
  this.pos = pos.plus(new Vector(0, -1.5));
  this.size = new Vector(0.8, 1.9);
  this.speed = new Vector(0, 0);
  this.charIndex;
  this.bouncing = 0; //any value greather than 0 is jumping
  this.death = false;
  this.immortal = "no";
  this.breath = 240;
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
  this.useSuperJump = false;
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

  if(this.charIndex == Character.FLOW && this.FlowDash.dashOn && this.FlowDash.dashCharge >= 50){
    this.FlowDash.dashCharge -= 3;
    if (this.facingRight){
      this.speed.x += this.playerXSpeed * 2;
    }else{
      this.speed.x -= this.playerXSpeed * 2;
    }

  }

  var motion = new Vector(this.speed.x * step, 0);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size);
  if (obstacle) {
    level.playerTouched(obstacle);

    if (obstacle == "fallthrough") {
      this.pos = newPos;
    } else if (this.charIndex == Character.FLEX &&
              obstacle == "secretWall" && keys.actThree) {
      removeSecretWall(newPos, this.size, level);
    }
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

    if (this.useSuperJump && this.holdingObject)
      this.loseObject(level);

    if (obstacle == "ice") {
      if (this.facingRight) this.pos.x += step * 3;
      else                  this.pos.x += step * -3;
    } else if (this.charIndex == Character.FLEX && obstacle == "secretWall"
               && keys.actTwo && this.speed.y > -1) {
      removeSecretWall(newPos, this.size, level);
    }

    var curObstacle = level.obstacleAt(this.pos, this.size);
    if (keys.jump && this.speed.y > 0 && curObstacle != "fallthrough") {
      this.speed.y = -this.jumpSpeed;
      if (keys.actTwo && this.charIndex == Character.FLOYD && this.holdingObject) {
        this.speed.y -= (this.jumpSpeed / 3);
        this.useSuperJump = true;
      }
    }
    else {
      this.speed.y = 0;
    }

    //FLOW Bounce
    if (this.bouncing > 0) {
      //jump again
      this.speed.y = -this.jumpSpeed * (this.bouncing/10);
      this.bouncing--;
    }

      //Breath Replenish
    this.breath += 4;
    if (this.breath > 240)
        this.breath = 240;
  } else {
    this.pos = newPos;
  }
  //console.log(this.pos.y + " " + this.speed.y);
};

Player.prototype.moveYonLadder = function(actor, step, level, keys) {
  this.speed.y = 0;
  if (keys.down){
    if(actor.type == "ladder"){
      this.speed.y += playerXSpeed * .4;
    }
    if(actor.type == "thinBar"){
    }
  }

  if (keys.up) {
    this.speed.y -= playerXSpeed * .6;
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

Player.prototype.moveYonFallThrough = function(actor, step, level, keys) {

    if (this.speed.y < 0)
        if (this.charIndex == Character.FLEX)
            this.speed.y += step * this.gravity / 2;
        else
            this.speed.y += step * this.gravity / 4;
    else {
        this.speed.y = step * this.gravity * 7;
        if (this.charIndex === Character.FLEX)
            this.speed.y *= 2;
    }

    if (this.charIndex == Character.FLOW && keys.actOne) {
        this.speed.y = 0;
      if (this.facingRight) this.pos.x += step * 4;
      else this.pos.x -= step * 4;
    }

  var motion = new Vector(0, this.speed.y * step);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size);
  if (obstacle){
    level.playerTouched(obstacle);

    var curObstacle = level.obstacleAt(this.pos, this.size);
    if (keys.jump && this.speed.y > 0 && obstacle != "fallthrough") {
      this.speed.y -= this.jumpSpeed;
      var motion = new Vector(0, this.speed.y * step);
      var newPos = this.pos.plus(motion);
      this.pos = newPos;
    } else if (obstacle == "fallthrough") {
            this.speed.y = step * this.gravity * 7;
            if (this.charIndex === Character.FLEX)
                this.speed.y *= 2;
    } else {
      this.speed.y = 0;
    }

    if (this.charIndex != Character.FLOYD) {
        this.breath -= 1;
    }
    if (this.breath < 0) {
        level.status = "lost";
        level.finishDelay = 1;
    }

    if (obstacle == "fallthrough" && //if the tile they're sinking into is water and
        !(this.charIndex == Character.FLOW && keys.actOne) || //they aren't a Flow that is using the action keys nor
            (level.obstacleAt(this.pos, this.size) == "fallthrough")) {             //are they already submerged if they are Flow
        this.pos = newPos;
    }

  } else {
    this.pos = newPos;
  }
};

Player.prototype.move = function(actor, step, level, keys) {
  if (actor && (actor.type == "ladder" || actor.type == "thinBar")) {
    this.moveX(step/5, level, keys);
    this.moveYonLadder(actor, step, level, keys);
  } else if (actor && actor.type == "fallthrough") {
    this.moveX(step, level, keys);
    this.moveYonFallThrough(actor, step, level, keys);
  } else {
    this.moveX(step, level, keys);
    this.moveY(step, level, keys);
  }
};

Player.prototype.changeChar = function (level, keys) {
    sound = new Sound(); //get instance of sound
    uidisplay = new UICanvas();

    var charChange = this.charIndex;
    if (keys.charOneChange) {
      this.charIndex = Character.FLOW;
      sound.playerSwitch(Character.FLOW);
      uidisplay.setPlayerName(Character.FLOW);
      if (this.holdingObject) this.dropObject(level);
    } else if (keys.charTwoChange) {

      this.charIndex = Character.FLEX;
      sound.playerSwitch(Character.FLEX);
      uidisplay.setPlayerName(Character.FLEX);

      if (this.holdingObject) this.dropObject(level);
    } else if (keys.charThreeChange) {
      this.charIndex = Character.FLOYD;
      sound.playerSwitch(Character.FLOYD);
      uidisplay.setPlayerName(Character.FLOYD);
    }

    if (charChange !== this.charIndex) {
        this.gravity = charGravity[this.charIndex];
        this.jumpSpeed = charJumpSpeed[this.charIndex];
        this.playerXSpeed = charXspeed[this.charIndex];
        playerXSpeed = charXspeed[this.charIndex];
        playerSprites = charSprites[this.charIndex];
    }
}

Player.prototype.dropObject = function (level) {
    this.holdingObject.speed.x = 1 * (this.facingRight ? 1: - 1);
    this.holdingObject.speed.y = 0;
    level.actors.push(this.holdingObject);
    this.holdingObject = null;
    level.actors.sort(stoneSort);
}

Player.prototype.throwObject = function (level) {
    this.holdingObject.speed.x = 12 * (this.facingRight ? 1: - 1);
    this.holdingObject.speed.y = -7;
    level.actors.push(this.holdingObject);
    this.holdingObject = null;
    level.actors.sort(stoneSort);
}

Player.prototype.loseObject = function (level) {
    this.holdingObject.pos.x += 1.6 * (this.facingRight)? 1 : -1;
    this.holdingObject.pos.y += 1;
    this.throwObject(level);
    this.useSuperJump = false;
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
        if (this.immortal == "no") {
          this.immortal = "yes";
          console.log("immortal: " + this.immortal);
          var self = this;
          setTimeout(function() { self.immortal = "block"; console.log("immortal: " + self.immortal);
               setTimeout(function() { self.immortal = "no"; console.log("immortal: " + self.immortal); }, 15000)}, 10000);
      }
    } else if (this.charIndex == Character.FLOYD) {
        if (this.holdingObject) this.throwObject(level);
    } else if (this.charIndex == Character.FLOW) {
      if( keys.jump ) {
        this.bouncing = 10;
      }
    }
  } else if(keys.actTwo){
    if(this.charIndex == Character.FLOW){
      console.log(this.FlowDash.dashCharge)
      if(this.FlowDash.dashCharge >= 90) {
        this.FlowDash.dashOn = true;
        this.moveX(step, level, keys);
      }
      else { this.FlowDash.dashOn = false;}
    }
  } else if(keys.actThree){

  }
}

Player.prototype.moveHoldingObject = function () {
    this.holdingObject.pos = this.pos.plus(new Vector(0, -this.holdingObject.size.y * 1.1)) ;
}

Player.prototype.act = function(step, level, keys) {
  var otherActors = level.actorAt(this);
  if(this.FlowDash.dashCharge <= 90) {this.FlowDash.dashCharge += 1.5; this.FlowDash.dashOn = false;}
  this.actions(step, level, keys);
  this.changeChar(level, keys);
  this.move(otherActors[0], step, level, keys);

  if (this.holdingObject) this.moveHoldingObject();
  if (otherActors) {
    if(otherActors.length == 1){
    level.playerTouched(otherActors[0].type, otherActors[0]);
    } else {
      for(i = 0; i < otherActors.length; i++){
        level.playerTouched(otherActors[i].type, otherActors[i]);
      }
    }
  } else if(!otherActors[0] || otherActors[0].type != "switch") {
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

Player.prototype.isImmortal = function() {
  var immortal = false;

  if ( this.immortal == "yes" ) {
    immortal = true;
  }

  return immortal;
}

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
