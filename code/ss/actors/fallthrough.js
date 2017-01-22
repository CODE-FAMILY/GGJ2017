//Fallthrough Tile
function fallthrough(pos) {
    this.size = new Vector(1, 1);
    this.pos = pos;
}

fallthrough.prototype.type = "fallthrough";

fallthrough.prototype.act = function (step, level) {

};
