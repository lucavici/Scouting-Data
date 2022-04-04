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

<input type="submit" value="Get Match">

<a href="index.html">home</a>

</body>
</html>
