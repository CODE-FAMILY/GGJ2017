window.onload = function() {
  sound = new Sound();
  sound.displayControls("audio-controls");
  sound.playBgSound("Theme");

  svgDoc = document.getElementById("menu").contentDocument;

  playbtn = svgDoc.getElementById("PLAYBUTTON");
  playbtn.addEventListener("click", function() { window.location.href="index.html" });

  creditsbtn = svgDoc.getElementById("CREDITSBUTTON");
  creditsbtn.addEventListener("click", function() { window.location.href="credits.html" });
}
