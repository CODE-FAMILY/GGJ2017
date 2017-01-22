//TODO: Switch Actor
function Switch(pos, ch) {
  this.size = new Vector(1.0, 1.0);
  this.pos = pos;
  this.on = false;

  this.number = parseInt(ch);
  this.connectedActor = null;
  /* 
    connectedActor should have var active and ch.
  */
}

Switch.prototype.table = {
  0: "A", // lava
  1: "B",
  2: "C"
};

Switch.prototype.type = "switch";

Switch.prototype.act = function(step, level) {
  if (this.connectedActor != null)
    this.connectedActor.active = this.on;
};

