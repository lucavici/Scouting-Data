<!DOCTYPE html>
<html lang="en">

<head>
<title>Recent Match</title>
<script src="TeamMatchData.js"></script>
<link rel="stylesheet" href="style.css">
<script src="./functions.js">//import {TeamMatchData} from "./functions.js";</script>
</head>

<?php

    //include 'recentMatch.js';aa

    if(isset($_POST["match"])) {
        $fmatch = htmlspecialchars($_POST["match"]);
    }
    echo "{$fmatch}";

    // jquery selecting based on whether
    // the team is on red or blue
    // alliance, pulled from bluealliance data
?>

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


<?php

    //output a quick overview of each alliance team's data in a match

    echo "<h3>Match {$fmatch} Details </h3>"; //w

    //overview data
?>


    <script>

        console.log("hi");

        // const TMD = require('./TeamMatchData.js');

        // let R1D = new TMD();

        //TeamMatchData TMD1 = new TeamMatchData();

        let R1MatchData = new TeamMatchData(3, 254);
        let R2MatchData = new TeamMatchData(match, myMatchData.getR2());
        let R3MatchData = new TeamMatchData(match, myMatchData.getR3());
        let B1MatchData = new TeamMatchData(match, myMatchData.getB1());
        let B2MatchData = new TeamMatchData(match, myMatchData.getB2());
        let B3MatchData = new TeamMatchData(match, myMatchData.getB3());

        let redAllianceData = new AllianceData(match, myMatchData.getR1(), myMatchData.getR2(), 
                                                myMatchData.getR3(), myMatchData.getB1(), myMatchData.getB2(), 
                                                myMatchData.getB3());

        let blueAllianceData = new AllianceData(match, myMatchData.getB1(), myMatchData.getB2(), myMatchData.getB3(), 
                                                myMatchData.getR1(), myMatchData.getR2(), myMatchData.getR3());
                                        
        //array of team numbers in the specified match
        const teams = [ myMatchData.getR1(), myMatchData.getR2(), myMatchData.getR3(), 
                        myMatchData.getB1(), myMatchData.getB2(), myMatchData.getB3() ];

        const matchData = [ R1MatchData, R2MatchData, R3MatchData, B1MatchData, B2MatchData, B3MatchData ];

        function displayData() {
            for (var i=0; i < 6; i++) {
                var autoCount = teams[i].getAutoCargo();
                var autoPoints = teams[i].getAutoPoints();
                var autoAccuracy = teams[i].getAutoAccuracy();

                var teleCount = teams[i].getTeleCargo();
                var telePoints = teams[i].getTeleopPoints();
                var teleAccuracy = teams[i].getTelepAccuracy();

                var climbAttempted = teams[i].getClimbAttempted();
                var climbActual = teams[i].getClimbActual();
                var climbTime = teams[i].getClimbTime();

                var autoCountId = "autocount" + i;
                var autoPointsId = "autopoints" + i;
                var autoAccuracyId = "autoaccuracy" + i;
                var teleCountId = "telecount" + i;
                var telePointsId = "telepoints" + i;
                var teleAccuracyId = "teleaccuracy" + i;
                var climbAttemptedId = "climbattempted" + i;
                var climbActualId = "climbactual" + i;
                var climbTimeId = "climbtime" + i;

                document.getElementById(autoCountId).innerHTML = autoCount;
                document.getElementById(AutoPointsId).innerHTML = autoPoints;
                document.getElementById(AutoAccuracyId).innerHTML = autoAccuracy;
                document.getElementById(teleCountId).innerHTML = teleCount;
                document.getElementById(telePointsId).innerHTML = telePoints;
                document.getElementById(teleAccuracyId).innerHTML = teleAccuracy;
                document.getElementById(climbAttemptedId).innerHTML = climbAttempted;
                document.getElementById(climbActualId).innerHTML = climbActual;
                document.getElementById(climbTimeId).innerHTML = climbTime;
            }
        }

        function displayTaxiPoints() {
            console.log("RUNNING")
            var number = R1MatchData.getTaxiPoints();
            document.getElementById("myText").innerHTML = number;
        }

        function displayAutoPoints() {
            console.log("RUNNING2")
            var number = R1MatchData.getAutoHigh();
            document.getElementById("myText2").innerHTML = number;
        }

    </script>

    <body onload="displayTaxiPoints()">

    <p>Taxi Points: <span id="myText"></span></p>

    </body>

    <body onload="displayAutoPoints()">

    <p>Taxi Points: <span id="myText2"></span></p>

    </body>

    <?php

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
    }

?>  

<body>

<a href="Recentmatches.html">Recent Matches</a>

</body>
</html>