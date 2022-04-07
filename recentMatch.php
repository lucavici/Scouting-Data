<!DOCTYPE html>
<html lang="en">

<head>
<title>Recent Match</title>

<!--<script src="./functions.js">//import {TeamMatchData} from "./functions.js";</script>-->
</head>

<?php

    //include 'recentMatch.js';

    if(isset($_POST["match"])) {
        $fmatch = htmlspecialchars($_POST["match"]);
    }
    echo "{$fmatch}";

    //jquery selecting based on whether
    //the team is on red or blue
    //alliance, pulled from bluealliance data


// <form action="recentMatch.php" method="post">

// <select name="match">

// <?php
//     for ($x = 4; $x >= 1; $x--) { //4->most recent match scouted
//       echo "<option value=\"{$x}\" id=\"{$x}\">Match {$x}</option>";
//     }
// 

// </select>

// <input onclick="loadDoc()" type="submit" value="Get Match">

// <div id="content"></div>




    //output a quick overview of each alliance team's data in a match

    echo "<h3>Match {$fmatch} Details </h3>"; //w

    echo "<script>document.write(redAllianceData.getAllianceMatchPoints())</script>";

    //overview data

    echo "<script>let rad = redAllianceData.getAllianceMatchPoints();
    document.write(rad);</script>";

    ?>

    <script src=“TeamMatchData.js”></script>

    <script>

        console.log("hi");

        // const TMD = require('./TeamMatchData.js');

        // let R1D = new TMD();

        //TeamMatchData TMD1 = new TeamMatchData();

        //let R1MatchData = new TMD(3, 254);
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
        
        //import TeamMatchData from './TeamMatchData.js';

        const R1MatchData = new TeamMatchData();

        // const TeamMatchData = require('./TeamMatchData.js');
        // const RD = new TeamMatchData());

        function displayTaxiPoints() {
            var number = R1MatchData.getTaxiPoints();
            document.getElementById("myText").innerHTML = number;
        }

    </script>

    <body onload="displayTaxiPoints()">

    <p>Taxi Points: <span id="myText"></span></p>

    </body>

    <?php

    echo "<script>let R1MatchData = new TeamMatchData(3, 254);document.writeln(R1MatchData.getAutoHigh());</script>";
    echo "<h5>Red Alliance</h5>";
    echo "<script>document.writeln(redAllianceData.getAllianceMatchPoints()); </script>";
    echo "<br>";
    echo "<h5>Blue Alliance: </h5><script>document.writeln(blueAllianceData.getAllianceMatchPoints());</script>";
    //predicted point values for that round
    echo "<br><br>";

    echo "<script>Document.write(\"hi\");<script>";

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

<a href="recentmatches.html">Recent Matches</a>

</body>
</html>