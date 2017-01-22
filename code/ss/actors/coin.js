function Coin(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0.5, 0.2));
  this.size = new Vector(2, 2);
  this.wobble = Math.random() * Math.PI * 2;
}
Coin.prototype.type = "coin";

Coin.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  var wobblePos = Math.sin(this.wobble) * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};