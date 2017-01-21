//TODO: Switch Actor
function Switch(pos) {
  this.size = new Vector(1.0, 1.0);
  this.pos = pos;
  this.on = false;
}

Switch.prototype.type = "switch";

Switch.prototype.act = function(step, level) {

};