var charSprites = [document.createElement("img"), document.createElement("img"), document.createElement("img")];
charSprites[0].src = "img/atlasedElements/player.png";
charSprites[1].src = "img/atlasedElements/playerTwo.png";
charSprites[2].src = "img/atlasedElements/playerThree.png";

//var playerOneSprites = document.createElement("img");
//playerOneSprites.src = "img/atlasedElements/player.png";

//var playerTwoSprites = document.createElement("img");
//playerTwoSprites.src = "img/atlasedElements/playerTwo.png";

//var playerThreeSprites = document.createElement("img");
//playerThreeSprites.src = "img/atlasedElements/playerThree.png";

var playerSprites = document.createElement("img");
playerSprites = charSprites[0];

var lavaSprite = document.createElement("img");
lavaSprite.src = "img/actorElements/lavaSprite.png";

var iceSprite = document.createElement("img");
iceSprite.src = "img/backgroundElements/ICECUBE-03.png";

var brickSprite = document.createElement("img");
brickSprite.src = "img/backgroundElements/CENTER_TITLE.png";

var brickRSprite = document.createElement("img");
brickRSprite.src = "img/backgroundElements/RIGHTEDGE_TITLE.png";

var brickLSprite = document.createElement("img");
brickLSprite.src = "img/backgroundElements/LEFTEDGE_TITLE.png";

var coinSprite = document.createElement("img");
coinSprite.src = "img/tempCoin.svg";

var offLever = document.createElement("img");
offLever.src = "img/actorElements/FALSELEVER-05.png";

var onLever = document.createElement("img");
onLever.src = "img/actorElements/TRUELEVER.png";