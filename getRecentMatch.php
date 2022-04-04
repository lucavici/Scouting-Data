<!DOCTYPE html>
<html lang="en">

<head>
<title>Select Recent Match</title>
</head>

<body>

<form action="recentMatch.php" method="post">

<select id="match">"

<?php
    for ($x = getMostRecentlyScoutedMatch(); $x >= 1; $x--) {
      echo "<option value="{$x}">Match {$x}</option>";
    }
?>

</select>

<input type="submit" value="Get Match">

<a href="index.html">home</a>

</body>
</html>
