<!DOCTYPE html>
<html lang="en">

<head>
<title>Select Team</title>
<script src="TeamData.js"></script>
<link rel="stylesheet" href="style.css">
</head>

<body>

<div id="title">

<h2>Team Data</h2>

</div>

<div id="dropdown">

<form action="TeamData.php" method="post">

<select name="team">
<script>//console.log(getTeams());</script>
<?php
    for ($i = 0; $i < getTeams().length; $i++) { 
      echo "<option value=\"{$getTeams[$i]}\" id=\"{$getTeams[$i]}\">Team {{$getTeams[$i]}}</option>";
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
    xhttp.open("GET", "TeamData.php", true);
    xhttp.send();
  }
</script>

</div>

</body>
</html>