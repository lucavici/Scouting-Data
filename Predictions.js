class MatchPredictions {
    
    constructor (match){

        this.fs = require("fs");
        this.BlueAlliance = require("bluealliance");
        this.tba = new this.BlueAlliance("wYuAaOjtoanexLjWHUWc1ayVQqKM3MjJ3ZTR7D9HGfRcKjljb075oEwpa7YecosQ");
        const TeamData = require('./TeamData.js'); //imports TeamData

        this.event = this.tba.getEvent('casj', 2017); // SVR 2017
        this.matches = this.tba.getMatchesAtEvent(this.event); //this does not appear to be working
        this.teams = this.tba.getTeamsInMatch(this.matches[match]);
        console.log(this.matches);
        this.R1 = this.teams.red[0];
        //const r1Data = new TeamData(this.R1.getTeamNumber());?????
        this.R2 = this.teams.red[1];
        this.R3 = this.teams.red[2];
        this.B1 = this.teams.blue[0];
        this.B2 = this.teams.blue[1];
        this.B3 = this.teams.blue[2];    

        this.R1data = new TeamData(this.R1);
        this.R2data = new TeamData(this.R2);
        this.R3data = new TeamData(this.R3);
        this.B1data = new TeamData(this.B1);
        this.B2data = new TeamData(this.B2);
        this.B3data = new TeamData(this.B3);

        avgAutoBallsR1 = R1Data.getAverageAutoBalls();
        avgAutoBallsR2 = R2Data.getAverageAutoBalls();
        avgAutoBallsR3 = R3Data.getAverageAutoBalls();

        avgTeleBallsR1 = R1Data.getAverageTeleBalls();
        avgTeleBallsR2 = R2Data.getAverageTeleBalls();
        avgTeleBallsR3 = R3Data.getAverageTeleBalls();

        avgAutoBallsB1 = B1Data.getAverageAutoBalls();
        avgAutoBallsB2 = B2Data.getAverageAutoBalls();
        avgAutoBallsB3 = B3Data.getAverageAutoBalls();

        avgTeleBallsB1 = B1Data.getAverageTeleBalls();
        avgTeleBallsB2 = B2Data.getAverageTeleBalls();
        avgTeleBallsB3 = B3Data.getAverageTeleBalls();

        //get auto and tele stdev
        stDevAutoR1 = this.R1data.getAutoStandardDevation(); 
        stDevTeleR1 = this.R1data.getTeleStandardDevation();

        stDevAutoR2 = this.R2data.getAutoStandardDevation(); 
        stDevTeleR2 = this.R2data.getTeleStandardDevation();

        stDevAutoR3 = this.R3data.getAutoStandardDevation(); 
        stDevTeleR3 = this.R3data.getTeleStandardDevation();

        stDevAutoB1 = this.B1data.getAutoStandardDevation(); 
        stDevTeleB1 = this.B1data.getTeleStandardDevation();

        stDevAutoB2 = this.B2data.getAutoStandardDevation(); 
        stDevTeleB2 = this.B2data.getTeleStandardDevation();

        stDevAutoB3 = this.B3data.getAutoStandardDevation(); 
        stDevTeleB3 = this.B3data.getTeleStandardDevation();
    }

    getStDevAutoRedAlliance() {
        return (stDevAutoR1 + stDevAutoR2 + stDevAutoR3) /3;
    }
    getStDevTeleRedAlliance() {
        return (stDevTeleR1 + stDevTeleR2 + stDevTeleR3) /3;
    }
    getStDevAutoBlueAlliance() {
        return (stDevAutoB1 + stDevAutoB2 + stDevAutoB3) /3;
    }
    getStDevTeleBlueAlliance() {
        return (stDevTeleB1 + stDevTeleB2 + stDevTeleB3) /3;
    }
    
    getAutoMeanRedAlliance() {
        return (avgAutoBallsR1 + avgAutoBallsR2 + avgAutoBallsR3) /3;
    }
    getTeleMeanRedAlliance() {
        return (avgTeleBallsR1 + avgTeleBallsR2 + avgTeleBallsR3) /3;
    }
    getAutoMeanBlueAlliance() {
        return (avgAutoBallsB1 + avgAutoBallsB2 + avgAutoBallsB3) /3;
    }
    getTeleMeanBlueAlliance() {
        return (avgTeleBallsB1 + avgTeleBallsB2 + avgTeleBallsB3) /3;
    }
    getNumRedStDevDataPts() {

    }
    getNumBlueStDevDataPts() {
        
    }
    getNumRedMeanDataPts() {

    }
    getNumBlueMeanDataPts() {

    }

    //welch's t-test
    //win chance of alliance A facing opposing alliance o 
    winChance() { 
        return (x1 + x2) / sqrt((s1^2 / n1) + (s2^2 / n2));
    }

    welchsTestAuto() {
        var t;
      
        mean1 = this.getAutoMeanRedAlliance();
        mean2 = this.getAutoMeanBlueAlliance();
        sd1 = this.getAutoMeanRedAlliance();
        sd2 = this.getAutoMeanBlueAlliance();
        sampleSize1 = this.getNumRedStDevDataPts();
        sampleSize2 = this.getNumRedStDevDataPts();
        t = (mean1 + mean2) / sqrt((sd1^2 / sampleSize1) + (sd2^2 / sampleSize2));
        
        return t !== np.nan ? t : mean1 > mean2;
    }

    welchsTestTele() {
        var t;
      
        mean1 = this.getAutoMeanRedAlliance();
        mean2 = this.getAutoMeanBlueAlliance();
        sd1 = this.getStDevAutoRedAlliance();
        sd2 = this.getStDevAutoBlueAlliance();
        sampleSize1 = this.getNumRedMeanDataPts();
        sampleSize2 = this.getNumRedMeanDevDataPts();

        t = (mean1 + mean2) / sqrt((sd1^2 / sampleSize1) + (sd2^2 / sampleSize2));

        return t !== NaN ? t : mean1 > mean2;
    }

    //predict ranking points
    predictedRPs() {
        return "ur mom";
    }
}

module.exports = MatchPredictions;