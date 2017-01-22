function SkillSwitch(pos, ch) {
  this.size = new Vector(1.0, 1.0);
  this.pos = pos;
  this.on = false;

  this.number = parseInt(ch);
  this.connectedActor = null;
  /* 
    connectedActor should have var active and ch.
  */
}

SkillSwitch.prototype.table = {
  7: "H", 
  8: "I",
  9: "J"
};

SkillSwitch.prototype.type = "skillSwitch";

SkillSwitch.prototype.act = function(step, level) {
//  if (this.connectedActor != null)
//    this.connectedActor.active = this.on;
};

