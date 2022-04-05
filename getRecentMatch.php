<!DOCTYPE html>
<html lang="en">

<head>
<title>Select Recent Match</title>
</head>

<body>

<form action="recentMatch.php" method="post">

<select name="match">

<?php
    for ($x = 4; $x >= 1; $x--) { //4->most recent match scouted
      echo "<option value=\"{$x}\" id=\"{$x}\">Match {$x}</option>";
    }
?>

</select>

<input onclick="loadDoc()" type="submit" value="Get Match">

<div id="content"></div>

<script>
  function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("content").innerHTML =
        this.responseText;
      }
    };
    xhttp.open("GET", "recentMatch.php", true);
    xhttp.send();
  }
</script>

</body>
</html>