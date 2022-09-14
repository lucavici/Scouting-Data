<!DOCTYPE html>
<html lang="en">

<head>
<title>Team Data</title>
<script src="TeamData.js"></script>
<link rel="stylesheet" href="style.css">
<!--<script src="./functions.js">//import {TeamMatchData} from "./functions.js";</script>-->
</head>

<?php

    //include 'recentMatch.js';

    //if(isset($_POST["team"])) {
        //$fteam = htmlspecialchars($_POST["team"]);
    //}
    //echo "{$fteam}";

    // jquery selecting based on whether
    // the team is on red or blue
    // alliance, pulled from bluealliance data
?>
    <div id="dropdown">

    <script>
        console.log(getTeams());
        // teamz[] = getTeams();
        // console.log(teamz);
    </script>

    <form action="TeamData.php" method="post">

    <select name="team">

    <?php
        for ($i = 0; $i < getTeams().length; $i++) { 
          echo "<option value=\"{$getTeams[$i]}\" id=\"{$getTeams[$i]}\">Team {$getTeams[$i]}</option>";
        }
    ?>

    </div>
    

    </select>

    <input onclick="loadDoc()" type="submit" value="Get Team Data">

    <div id="content"></div>


<?php

    //output a quick overview of each alliance team's data in a match

    echo "<div id=\"title\"><h3>Team {$fteam} Data </h3></div>"; //w

    //overview data
?>

<div id="data">

    <script>

        console.log("hi");
                                        
        //array of team numbers in the specified match
        
        var team = <?php echo json_encode($fteam); ?>;

        function displayAutoScore() {
            console.log("ARUNNING");
            var averageAutoScore = 5; //getAverages('autoScore', team);
            document.getElementById("averageAutoScore").innerHTML = averageAutoScore;
        }
        function displayTeleScore() {
            console.log("TRUNNING");
            var averageTeleScore = getAverages('teleScore', team);
            document.getElementById("averageTeleScore").innerHTML = averageTeleScore;
        }
        function displayClimbScore() {
            console.log("CRUNNING");
            var averageClimbScore = getAverages('climbScore', team);
            document.getElementById("averageClimbScore").innerHTML = averageClimbScore;
        }
        function displayAverageScore() {
            console.log("AARUNNING");
            var averageScore = getAverages('score', team);
            document.getElementById("averageScore").innerHTML = averageScore;
        }
        function displayTeleHighRate() {
            console.log("AARUNNING");
            var teleHighRate = getAverages('teleHigh', team);
            document.getElementById("teleHighRate").innerHTML = teleHighRate;
        }
    }

    </script>

    <body onload="displayAutoScore()">

        <p>Average Auto Score: <span onload="displayAutoScore()" id="averageAutoScore"></span></p>

    </body>

    <body onload="displayTeleScore()">

        <p>Average Tele Score: <span id="averageTeleScore"></span></p>

    </body>

    <body onload="displayClimbScore()">

        <p>Average Climb Score: <span id="averageClimbScore"></span></p>

    </body>

    <body onload="displayAverageScore()">

        <p>Average Score: <span id="averageScore"></span></p>

    </body>

    <body onload="displayTeleHighRate()">

        <p>Tele High Rate: <span id="teleHighRate"></span></p>

    </body>

</div>

    <?php
    /*

    echo "<h5>Red Alliance</h5>";
    echo "<script>document.writeln(redAllianceData.getAllianceMatchPoints()); </script>";
    echo "<br>";
    echo "<h5>Blue Alliance: </h5><script>document.writeln(blueAllianceData.getAllianceMatchPoints());</script>";
    //predicted point values for that round
    echo "<br><br>";


    //for each team
    for ($i = 0; $i < 6; $i++) {

        echo "<h3><script>teams[<?php {$i} ?>]<script></h3>"; //display team # (this should be selected to be in blue or red)
     
        echo "<p>Auto Success: {matchData[i].getAutoPoints()} points scored, {matchData[i].getAutoMatchAccuracy()} percent accuracy";
        //ex x points scored, y% accuracy

        echo "<br>";

        echo "<p>Teleop Success: {matchData[i].getTeleopPoints()} points scored, {matchData[i].getTeleopMatchAccuracy()} percent accuracy";
        //ex x points scored, y% accuracy

        echo "<p>Climb Level Attempted:</p> + {matchData[i].getClimbAttempted()}";

        echo "<p>Climb Level:</p> + {matchData[i].getClimbActual()} in {getClimbTime(match, team)} seconds";

        echo "<br><br>";
    }*/

?>  

<body>

<a href="index.php">home</a>
<a href="GetTeamData.php">back</a>

</body>
</html>