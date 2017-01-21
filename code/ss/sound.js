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

  this.bgSound = new Audio();
  this.setBgSound( this.bgSounds["Ambient Background"] );
}

Sound.prototype.displayControls = function(id) {
  controls = document.getElementById(id);

  selectLabel = document.createElement("label");
  selectLabel.setAttribute("for", "bg-sound");
  selectLabelText = document.createTextNode("Music: ");
  selectLabel.appendChild(selectLabelText);


  select = document.createElement("select");
  select.setAttribute("id", "bg-sounds");

  for (var key in this.bgSounds) {
    var value = this.bgSounds[key];
    option = document.createElement("option");
    option.setAttribute("value", value);
    optionText = document.createTextNode(key);
    option.appendChild(optionText);
    select.appendChild(option);
  }

  //additional reference to sound object for anonymous function
  sound = this;
  select.addEventListener("change", function () { sound.setBgSound( this.value ); sound.playBgSound(); }, false);

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

  controls.appendChild(selectLabel);
  controls.appendChild(select);
  controls.appendChild(mute);
};

Sound.prototype.setBgSound = function (file) {
  this.bgSound.src = file;
};

Sound.prototype.playBgSound = function () {
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

