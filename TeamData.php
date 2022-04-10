<!DOCTYPE html>
<html lang="en">

<head>
<title>Team Data</title>
<script src="TeamData.js"></script>
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
    
    <script>
        console.log(getTeams());
        // teamz[] = getTeams();
        // console.log(teamz);
    </script>

    <form action="TeamData.php" method="post">

    <select name="team">

    <?php
        // for ($i = 0; $i < getTeams().length; $i++) { 
        //   echo "<option value=\"{$getTeams[$i]}\" id=\"{$x}\">Team {$x}</option>";
        // }
    ?>
    

    </select>

    <input onclick="loadDoc()" type="submit" value="Get Team Data">

    <div id="content"></div>


<?php

    //output a quick overview of each alliance team's data in a match

    echo "<h3>Team {$fteam} Data </h3>"; //w

    //overview data
?>
    <script>

        console.log("hi");
                                        
        //array of team numbers in the specified match
    
        function displayData() {
            var averageAutoScore = getAverages(type, team);
            var averageTeleScore = getAverages(type, team);
            var averageClimbScore = getAverages(type, team);
            var averageScore = getAverages(type, team);

            var averageAutoScoreId = "autocount" + i;
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
        var number = R1MatchData.getTaxiPoints();
        document.getElementById("myText").innerHTML = number;
    }

    </script>

    <body onload="displayTaxiPoints()">

    <p>Taxi Points: <span id="myText"></span></p>

    </body>

    <body onload="displayData()">

    <p>Taxi Points: <span id="myText"></span></p>

    </body>

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