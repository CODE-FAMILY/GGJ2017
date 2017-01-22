function Statistics() {
  this.deaths = 0;
  this.character = 0;
  this.whales = 0;
}

Statistics.prototype.playerDied = function () {
  this.deaths++;
};

