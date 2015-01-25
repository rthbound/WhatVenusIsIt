function updateScreen() {
	var d  = new Date();
  var utc = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(),  d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());

  // Get date information
  var ddUtc = utc.getDate();
  var moUtc = utc.getMonth() + 1; // Jan == 0
  var yrUtc = utc.getFullYear();

  // Get time information
	var hUtc  = utc.getHours();
	var mmUtc = utc.getMinutes();
	var sUtc  = utc.getSeconds();

  // Get date information
  var dd = d.getDate();
  var mo = d.getMonth() + 1; // Jan == 0
  var yr = d.getFullYear();

  // Get time information
	var h  = d.getHours();
	var mm = d.getMinutes();
	var s  = d.getSeconds();

  // Format date and time information
  if (dd < 10) { dd = "0" + dd };
  if (mo < 10) { mo = "0" + mo };
	if (mm < 10) { mm = "0" + mm };
	if (s  < 10) { s  = "0" + s  };

  if (ddUtc < 10) { ddUtc = "0" + ddUtc };
  if (moUtc < 10) { moUtc = "0" + moUtc };
	if (mmUtc < 10) { mmUtc = "0" + mmUtc };
	if (sUtc  < 10) { sUtc  = "0" + sUtc  };

  // Build date and time strings
  var date = mo + "/" + dd + "/" + yr;
  var time = h  + ":" + mm;

  var utcDate = moUtc + "/" + ddUtc + "/" + yrUtc;
  var utcTime = hUtc + ":" + mmUtc;

  var imagestring = "url(http://api.usno.navy.mil/imagery/moon.png?view=full&date=" + utcDate + "&time=" + utcTime + ")";
  // Update the background image if the minute has changed
  breakable: if (!~document.getElementById("time").innerHTML.indexOf(time)){
    // Set a background image if there is none set
    if(document.getElementById("image").style.backgroundImage == document.getElementById("next-image").style.backgroundImage) {
      document.getElementById("image").style.backgroundImage=imagestring;
      document.getElementById("image").style.zIndex="1";
      break breakable;
    }

    if(~document.getElementById("image").style.backgroundImage.indexOf("moon)){
      document.getElementById("next-image").style.zIndex = "0"
      document.getElementById("next-image").style.backgroundImage=imagestring

      setTimeout(function() {
        document.getElementById("image").style.backgroundImage = "none";
        document.getElementById("next-image").style.zIndex = "1"
        document.getElementById("image").style.zIndex = "0"
      }, 15 * 1000)
    } else {
      document.getElementById("image").style.zIndex = "0"
      document.getElementById("image").style.backgroundImage=imagestring

      setTimeout(function() {
        document.getElementById("next-image").style.backgroundImage = "none";
        document.getElementById("image").style.zIndex = "1"
        document.getElementById("next-image").style.zIndex = "0"
      }, 15 * 1000)

    }
  }

	document.getElementById("time").innerHTML = ("<div class='pull-left'>" + date + "</div><div class='pull-right'>" + time + ":" + s + "</div>");

  // Pay homage to WhatColorIsIt
  if (h < 10) { h = "0" + h }
  document.getElementById("time").style.color = "#" + h + mm + s;
  document.body.style.backgroundColor = "#" + h + mm + s;

	// Check Fullscreen-Mode
	if (Math.abs(screen.height - window.innerHeight) < 50 && Math.abs(screen.width - window.innerWidth) < 10) {
		document.getElementById("github-badge").style.display = "none";
		document.body.style.cursor = "none";
	} else {
		document.getElementById("github-badge").style.display = "block";
		document.body.style.cursor = "default";
	}
}

window.onload = setInterval(function () { updateScreen() }, 1000);
