window.onload = function() {
  sound = new Sound();
  sound.playBgSound("Theme");
  //sound.displayControls();

  svgDoc = document.getElementById("menu").contentDocument;

  playbtn = svgDoc.getElementById("PLAYBUTTON");
  playbtn.addEventListener("click", function() { window.location.href="index.html" });

  creditsbtn = svgDoc.getElementById("CREDITSBUTTON");
  creditsbtn.addEventListener("click", function() { window.location.href="credits.html" });
}
