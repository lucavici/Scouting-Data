<!DOCTYPE html>
<html lang="en">

<head>
<title>Recent Match</title>
<script src="Predictions.js"></script>
<script src="./functions.js">//import {TeamMatchData} from "./functions.js";</script>
<link rel="stylesheet" href="style.css">
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

    <form action="MatchPredictions.php" method="post">

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

    echo "<h3>Match {$fmatch} Predictions </h3>"; //w

    //overview data
?>


    <script>

        console.log("hi");

        // const TMD = require('./TeamMatchData.js');

        // let R1D = new TMD();

        //TeamMatchData TMD1 = new TeamMatchData();

        var match = <?php echo json_encode($fmatch); ?>;

        let MatchPreds = new MatchPredictions(match);

        function displayPredictedWin() {
            console.log("RUNNING")
            var number = MatchPreds.getPredictedWin();
            document.getElementById("myText").innerHTML = number;
        }

        function displayPredictedRed() {
            console.log("RUNNING")
            var number = MatchPreds.getPredictedRedAllianceScore();
            document.getElementById("myText").innerHTML = number;
        }

        function displayPredictedBlue() {
            console.log("RUNNING2")
            var number = MatchPreds.getPredictedBlueAllianceScore();
            document.getElementById("myText2").innerHTML = number;
        }

    </script>

    <body onload="displayPredictedWin()">

    <p>Predicted Win: <span id="myText"></span></p>

    </body>

    <body onload="displayPredictedRed()">

    <p>Predicted Red Alliance Score: <span id="myText"></span></p>

    </body>

    <body onload="displayPredictedBlue()">

    <p>Predicted Blue Alliance Score: <span id="myText2"></span></p>

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

<a href="GetMatchPredictions.html">Match Predictions</a>

</html>