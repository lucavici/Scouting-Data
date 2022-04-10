<!DOCTYPE html>
<html lang="en">

<head>
<title>Select Team</title>
</head>

<body>

<form action="TeamData.php" method="post">

<select name="team">

<?php
    for ($x = 0; $x <= $fteamz.length; $x++) {
      echo "<option value=\"{$x}\" id=\"{$x}\">Match {$x}</option>";
      //echo "<option value=\"{$fteamz[$x]}\" id=\"{$fteamz[$x]}\">Team {$fteamz[$x]}</option>";
    }
?>

</select>

<input onclick="loadDoc()" type="submit" value="Get Team Info">

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