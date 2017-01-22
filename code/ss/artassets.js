//characters
var charSprites = [document.createElement("img"), document.createElement("img"), document.createElement("img")];
charSprites[0].src = "img/atlasedElements/player.png";
charSprites[1].src = "img/atlasedElements/playerTwo.png";
charSprites[2].src = "img/atlasedElements/playerThree.png";

var playerSprites = document.createElement("img");
playerSprites = charSprites[0];

//animated tiles
var waterSprites = [document.createElement("img"), document.createElement("img")];//, document.createElement("img")];
waterSprites[0].src = "img/actorElements/TRUELEVER.png";
waterSprites[1].src = "img/actorElements/FALSELEVER-05.png";

//actors
var lavaSprite = document.createElement("img");
lavaSprite.src = "img/actorElements/lavaSprite.png";

var coinSprite = document.createElement("img");
coinSprite.src = "img/tempCoin.svg";

var offLever = document.createElement("img");
offLever.src = "img/actorElements/FALSELEVER-05.png";

var onLever = document.createElement("img");
onLever.src = "img/actorElements/TRUELEVER.png";

var harpoon = document.createElement("img");
harpoon.src = "img/actorElements/HARPOON.png";

//static
var iceSprite = document.createElement("img");
iceSprite.src = "img/backgroundElements/ICECUBE-03.png";

var brickSprite = document.createElement("img");
brickSprite.src = "img/backgroundElements/CENTER_TITLE.png";

var brickRSprite = document.createElement("img");
brickRSprite.src = "img/backgroundElements/RIGHTEDGE_TITLE.png";

var brickLSprite = document.createElement("img");
brickLSprite.src = "img/backgroundElements/LEFTEDGE_TITLE.png";

var bckGround = document.createElement("img");
bckGround.src = "img/backgroundElements/trialBackGround2.jpg";

var ladder = document.createElement("img");
ladder.src = "img/backgroundElements/LADDER.png";

//waterImages
var topWaterOne = document.createElement("img");
topWaterOne.src = "img/backgroundElements/TOP_GROUNDWATERBLUE.png";

var topWaterTwo = document.createElement("img");
topWaterTwo.src = "img/backgroundElements/TOP_GROUNDWATERCLEAR.png";

var lowWaterOne = document.createElement("img");
lowWaterOne.src = "img/backgroundElements/GROUNDWATERBLUE.png";

var lowWaterTwo = document.createElement("img");
lowWaterTwo.src = "img/backgroundElements/GROUNDWATERCLEAR.png";