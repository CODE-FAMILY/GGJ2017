function UICanvas() {
  if (arguments.callee._singeltonInstance) {
    return arguments.callee._singeltonInstance;
  }

  arguments.callee._singeltonInstance = this;

  this.id = "UI";
  this.hugeSize = "5em";
  this.smallSize = "1.2em";

  this.UI = null;
  this.parent = null;
  this.level = null;

  this.deaths = {
    text: "Deaths: 0",
    x: 85,
    y: 80,
    size: this.smallSize,
  }

  this.playerName = {
    text: "Player: ",
    x: 85,
    y: 50,
    size: this.smallSize,
  }
}

UICanvas.prototype.paused = function() {
  clearCanvas(this.id);
  displayTextCenter( "Paused", this.hugeSize, this.id);

}

UICanvas.prototype.won = function() {
  clearCanvas(this.id);
  displayTextCenter( "You Won!", this.hugeSize, this.id);
}

UICanvas.prototype.updateHud = function() {
  clearCanvas(this.id);
  drawImage("img/ui/TOPSTATSBG.png", 10, 10, this.id);
  drawText(this.deaths.text, this.deaths.size, this.deaths.x, this.deaths.y, this.id);
  drawText(this.playerName.text, this.playerName.size, this.playerName.x, this.playerName.y, this.id);
}

UICanvas.prototype.setDeaths = function(deaths) {
  this.deaths.text = "Deaths: " + deaths;
}

UICanvas.prototype.setPlayerName = function(player) {
  this.playerName.text = "Player: " + Character.getCharacterName(player);
}

UICanvas.prototype.clear = function() {
  this.UI.parentNode.removeChild(this.UI);
}

UICanvas.prototype.init = function(parent, level) {
  this.parent = parent;
  this.level = level;

  //UI Canvas
  this.UI = createCanvas(this.id, level);

  //Add canvas to HTML page
  parent.appendChild(this.UI);
}

