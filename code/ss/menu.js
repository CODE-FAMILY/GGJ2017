window.onload = function() {
  sound = new Sound();
  sound.playBgSound("Theme");
  //sound.displayControls();

  svgDoc = document.getElementById("menu").contentDocument;

  playbtn = svgDoc.getElementById("PLAYBUTTON");

  index = svgDoc.createElement("a");
  index.setAttribute("href", "index.html");

  playbtn.appendChild(index);

  console.log(window.location.href);
  playbtn.addEventListener("click", function() { window.location.href="index.html" });

  creditsbtn = svgDoc.getElementById("CREDITSBUTTON");
  creditsbtn.addEventListener("click", function() { window.location.href="credits.html" });
}
