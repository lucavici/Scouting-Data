<!DOCTYPE html>
<html lang="en">

<head>
<title>Team Details</title>
</head>

<?php

        include "functions.js";

?>


<script type="text/javascript">
        let myTeamData = new TeamData(team); //get team number!!!
</script>

<?php

        //output a quick data overview of a selected team
        echo "<h2>Team {$teamnumber}</h2>"; //find a way to get team number :(

        //most important info at top:

        //team rank

        //avg number of points earned in auto
        //avg number of points earned in tele

        //specs
        //auto high average # of balls
        //auto high success rate
        //auto low average # of balls
        //auto low success rate
        //tele high average # of balls
        //tele high success rate
        //tele low average # of balls
        //tele low success rate
        
        echo "<p>Auto Success: </p> + myTeamData. + getOverallAutoSuccessPercent(team)";

        echo "<p>Upper Hub Success: </p> + ";

        echo "<p>Lower Hub Success</p> + ";

        echo "<p>Climb Level</p> + "; //maybe a pie chart for what climb level they usually do? or maybe display top 2 data pts+percents.

        //maybe a button for best four matches only
?>  

<a href="index.html">home</a>

</body>
</html>