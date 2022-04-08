class PointRankings {

    constructor() {
        
        this.fs = require("fs");
        this.match = match;
        this.BlueAlliance = require("bluealliance");
        this.tba = new this.BlueAlliance("wYuAaOjtoanexLjWHUWc1ayVQqKM3MjJ3ZTR7D9HGfRcKjljb075oEwpa7YecosQ");
        const TeamData = require('./TeamData.js'); //imports TeamData
    
        this.event = this.tba.getEvent('casj', 2017); // SVR 2017
        this.teams = this.tba.getTeamsInEvent(this.event);
        //console.log(this.matches);
        
        avgAutoBalls = [];
        avgTeleBalls = [];

        for (team in this.teams) {
            avgAutoBalls[team] = teams[team].getAverageAutoBalls();
            avgTeleBalls[team] = teams[team].getAverageTeleBalls();
        }

        avgAutoBalls = this.avgAutoBalls.sort();
        avgTeleBalls = this.avgTeleBalls.sort();
    }
    sortByAutoBalls() {
        return avgAutoBalls();
    }
    sortByTeleBalls() {
        return avgTeleBalls();
    }
}