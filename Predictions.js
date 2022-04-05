class Probability {
    
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

        
        
    }
}

module.exports = Probability;