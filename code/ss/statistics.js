function Statistics() {
  this.deaths = 0;
}

Statistics.prototype.playerDied = function () {
  this.deaths++;
};
