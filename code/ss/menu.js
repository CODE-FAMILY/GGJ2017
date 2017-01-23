window.onload = function() {
  sound = new Sound();
  sound.displayControls("audio-controls");
  sound.playBgSound("Theme");

  svgDoc = document.getElementById("menu").contentDocument;

  playbtn = svgDoc.getElementById("PLAYBUTTON");
  playbtn.addEventListener("click", function() {
    var current = window.location.href
    var newLink = current.replace("intro.html", "index.html");
    window.location.href=newLink;
  });

  creditsbtn = svgDoc.getElementById("CREDITSBUTTON");
  creditsbtn.addEventListener("click", function() {
    var current = window.location.href
    var newLink = current.replace("intro.html", "credits.html");
    window.location.href=newLink;
  });
}
