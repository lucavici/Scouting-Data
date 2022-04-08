<!DOCTYPE html>
<html lang="en">

<head>
<title>Select Team</title>
</head>

<body>

<form action="TeamData.php" method="post">

<select name="team">

<script type="module">

    // import fs from "fs";
    // //const fs = require("fs");

    // //to get blue alliance data
    // //var BlueAlliance = require("bluealliance");
    // //var tba = new BlueAlliance("wYuAaOjtoanexLjWHUWc1ayVQqKM3MjJ3ZTR7D9HGfRcKjljb075oEwpa7YecosQ");

    // fs.readFile("./data.json", "utf8", (err, jsonString) => {

    //     if (err) {
    //         console.log("Error reading file from disk:", err);
    //         return;
    //     }

    //     try {
    //         const data = JSON.parse(jsonString);
    //         //console.log(data[254][3].AHigh); //test
    //     } 
        
    //     catch (err) {
    //         console.log("Error parsing JSON string:", err);
    //     }
    // });

    function getTeams() {
        const teams = ["254", "1678", "5419"];
        // for (i=0; i < data[team]; i++) {
        //     teams[i] = data[team];
        // }
        return teams;
    }
    //teamz = getTeams();
    console.log(getTeams());

    JSON.stringify(getTeams());

</script>

<?php

    $fteamz=json_decode($_POST['jsondata']);

    for ($x = 0; $x <= $fteamz.length; $x++) {
      echo "<option value=\"{$fteamz[$x]}\" id=\"{$fteamz[$x]}\">Team {$fteamz[$x]}</option>";
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