var playerSprites = document.createElement("img");
playerSprites.src = "img/player.png";
var playerSpritesSrc = loadSpriteFrames("player", 10);

var brickSprite = document.createElement("img");
brickSprite.src = "img/sprites1.png";

var lavaSprite = document.createElement("img");
lavaSprite.src = "img/sprites2.png";

var coinSprite = document.createElement("img");
coinSprite.src = "img/sprites3.png";

function loadSpriteFrames(fileBaseName, spriteCount) {
    spriteArray = [];
    for (i = 0; i < spriteCount; i++)
        spriteArray[i] = "img/" + fileBaseName + (i + 1) + ".png";
    return spriteArray;
}