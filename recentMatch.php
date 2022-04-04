//output a quick overview of
//each alliance team's data in a match

<!DOCTYPE html>
<html lang="en">

<head>
<title>Recent Match</title>
</head>

<?php

    include "functions.js";

    if(isset($_POST["match"])) {
        $fmatch = htmlspecialchars($_POST["match"]);
    }

    //jquery selecting based on whether
    //the team is on red or blue
    //alliance, pulled from bluealliance data
?>

<script type="text/javascript">
    
    let myMatchData = new MatchData(<?=$fmatch?>);
    let R1MatchData = new TeamMatchData(<?=$fmatch?>, myMatchData.getR1());
    let R2MatchData = new TeamMatchData(<?=$fmatch?>, myMatchData.getR2());
    let R3MatchData = new TeamMatchData(<?=$fmatch?>, myMatchData.getR3());
    let B1MatchData = new TeamMatchData(<?=$fmatch?>, myMatchData.getB1());
    let B2MatchData = new TeamMatchData(<?=$fmatch?>, myMatchData.getB2());
    let B3MatchData = new TeamMatchData(<?=$fmatch?>, myMatchData.getB3());

    let redAllianceData = new AllianceData( <?=$fmatch?>, myMatchData.getR1(), myMatchData.getR2(), 
                                            myMatchData.getR3(), myMatchData.getB1(), myMatchData.getB2(), 
                                            myMatchData.getB3());

    let blueAllianceData = new AllianceData(<?=$fmatch?>, myMatchData.getB1(), myMatchData.getB2(), myMatchData.getB3(), 
                                            myMatchData.getR1(), myMatchData.getR2(), myMatchData.getR3());
    
    //array of team numbers in the specified match
    const teams = [ myMatchData.getR1(), myMatchData.getR2(), myMatchData.getR3(), 
                    myMatchData.getB1(), myMatchData.getB2(), myMatchData.getB3() ];

    const matchData = [ R1MatchData, R2MatchData, R3MatchData, B1MatchData, B2MatchData, B3MatchData ];

</script>

<?php

    echo "<h1>Match {$fmatch}</h1> Details";

    //overview data

    echo "<p>Red Alliance:</p> + <script>redAllianceData.getAllianceMatchPoints()</script>";
    echo "<br>";
    echo "<p>Blue Alliance:</p> + <script>blueAllianceData.getAllianceMatchPoints()<script>";
    //predicted point values for that round
    echo "<br><br>";

    //for each team
    for ($i = 0; $i < 6; $i++) {

        echo "<h3>teams[$i]</h3>"; //display team # (this should be selected to be in blue or red)
    
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