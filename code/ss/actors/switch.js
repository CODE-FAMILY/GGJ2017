//TODO: Switch Actor
function Switch(pos) {
  this.size = new Vector(0.6, 0.6);
  this.pos = pos;
  this.on = false;
}

Switch.prototype.type = "switch";

Switch.prototype.act = function(step, level) {

};