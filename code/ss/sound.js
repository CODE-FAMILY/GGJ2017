function Sound() {
  if (arguments.callee._singeltonInstance) {
    return arguments.callee._singeltonInstance;
  }

  arguments.callee._singeltonInstance = this;

  this.soundDir = "sound/";
  this.bgSounds = {
                     "Ambient Background": this.soundDir + "/soundshrim_-_Ambient_Background.ogg",
                     "Cinematic Inspiration": this.soundDir + "Alex_Che_-_Cinematic_Inspiration.ogg"
                  }


  this.sounds = {
                   "Theme": this.soundDir + "whale_force_theme_final.ogg",
                   "Flow": this.soundDir + "flow.ogg",
                   "Flex": this.soundDir + "flex.ogg",
                   "Floyd": this.soundDir + "floyd.ogg",
                 }

  this.bgSound = new Audio();
}

Sound.prototype.displayControls = function(id) {
  controls = document.getElementById(id);

  mute = document.createElement("button");
  mute.setAttribute("data-mute","false");
  muteText = document.createTextNode("mute");
  mute.appendChild(muteText);

  mute.addEventListener("click", function() {
    if ( mute.getAttribute("data-mute") == "false") {
      sound.muteAll();
      mute.textContent = "unmute";
      mute.setAttribute("data-mute", "true");
    } else {
      sound.unmuteAll();
      mute.textContent = "mute";
      mute.setAttribute("data-mute", "false");
    }

  }, false)

  controls.appendChild(mute);
};

Sound.prototype.playBgSound = function (name) {
  this.bgSound.src = this.sounds[name];
  this.bgSound.play();
  this.bgSound.addEventListener('ended', function() {
    this.play();
  }, false);
};

Sound.prototype.muteAll = function () {
  this.bgSound.muted = true;
};

Sound.prototype.unmuteAll = function () {
  this.bgSound.muted = false;
};

