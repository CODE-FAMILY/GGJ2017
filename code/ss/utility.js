var playerSprites = document.createElement("img");
playerSprites.src = "img/player.png";

var otherSprites = document.createElement("img");
otherSprites.src = "img/sprites.png";

var playerXOverlap = 4;
var scale = 20;
var maxStep = 0.05;

var gravity = 30;
var jumpSpeed = 17;
var playerXSpeed = 7;
var wobbleSpeed = 8, wobbleDist = 0.07;

var arrowCodes = {37: "left", 38: "up", 39: "right" , 40 : "down"};

var results = [
  {name: "Satisfied", count: 1043, color: "lightblue"},
  {name: "Neutral", count: 563, color: "lightgreen"},
  {name: "Unsatisfied", count: 510, color: "pink"},
  {name: "No comment", count: 175, color: "silver"}
];

function flipHorizontally(context, around) {
  context.translate(around, 0);
  context.scale(-1, 1);
  context.translate(-around, 0);
}

function Vector(x, y) {
  this.x = x; this.y = y;
}
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};
Vector.prototype.times = function(factor) {
  return new Vector(this.x * factor, this.y * factor);
};