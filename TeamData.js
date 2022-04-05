class TeamData {

    constructor(team){
        const CollectTeamData = require('./CollectTeamData.js');
        const collector = new CollectTeamData(team);
        this.teamData = collector.getTeamData();
        this.defendedTeamData = collector.getDefendedTeamData();
        this.notDefendedTeamData = collector.getNotDefendedTeamData();
    }

    /*
    * Returns percent of times taxi achieved
    *
    * /
    /* (change when taxi) getTaxiRate(){
        return this.teamData['averages']['taxisAvg'] + '%';
    }*/
    getAverageHighAutoBalls(){
        return this.teamData['averages']['aHighsAvg'].toFixed(2);
    }
    getAverageLowAutoBalls(){
        return this.teamData['averages']['aLowsAvg'].toFixed(2);
    }
    getAverageAutoScore(){ //doesnt include taxi??
        return this.teamData['averages']['aLowsAvg'].toFixed(2) * 2 
                + this.teamData['averages']['aHighsAvg'].toFixed(2) * 4 
                /*(change when taxi) + Math.round(this.getTaxiRate()) * 2*/; //adds taxi bonus if gets taxi 50% or more of the time
    }

    /*
    * Returns the percentage of balls succesfuly made in upper hub, auto
    *
    */
    getHighAutoRate(){
        return (this.teamData['rates']['aHighRate']*100).toFixed(2) + '%';
    }

    /*
    * Returns the percentage of balls succesfuly made in lower hub, auto
    *
    */
    getLowAutoRate(){
        return (this.teamData['rates']['aLowRate']*100).toFixed(2) + '%';
    }
    
    getAverageHighTeleBalls(){
        return this.teamData['averages']['tHighsAvg'].toFixed(2);
    }
    getAverageLowTeleBalls(){
        return this.teamData['averages']['tLowsAvg'].toFixed(2);
    }

    /*
    * Returns average amounts of tele lows + average amount of tele highs
    *
    */
    getAverageTeleScore(){
        return this.teamData['averages']['tLowsAvg'].toFixed(2) * 1 
                + this.teamData['averages']['tHighsAvg'].toFixed(2) * 2;
    }
    getHighTeleRate(){
        return (this.teamData['rates']['tHighRate']*100).toFixed(2) + '%';
    }
    getLowTeleRate(){
        return (this.teamData['rates']['tLowRate']*100).toFixed(2) + '%';
    }
    
    getTraversalRate(){
        return (this.teamData['rates']['travSucessRate']*100).toFixed(2) + '%';
    }
    getHighClimbRate(){
        return (this.teamData['rates']['highSucessRate']*100).toFixed(2) + '%';
    }
    getMidClimbRate(){
        return (this.teamData['rates']['midSucessRate']*100).toFixed(2) + '%';
    }
    getLowClimbRate(){
        return (this.teamData['rates']['lowSucessRate']*100).toFixed(2) + '%';
    }
    

    /*
    * Returns (average telescore) + (average auto score) + (percent of games got x bar * bar points)
    *
    */
    getAverageScore(){
        
        let a = this.teamData['averages']['travsSAvg'];
        if (a == 'N/A'){
            a = 0;
        }
        let b =  this.teamData['averages']['highsSAvg'];
        if (b == 'N/A'){
            b = 0;
        }
        let c =  this.teamData['averages']['midsSAvg'];
        if (c == 'N/A'){
            c = 0;
        }
        let d =  this.teamData['averages']['lowsSAvg'];
        if (d == 'N/A'){
            d = 0;
        }
    
        return this.getAverageAutoScore() + this.getAverageTeleScore() 
                 + (a * 15).toFixed(2) + (b * 10).toFixed(2) + (c * 6).toFixed(2) + (d * 4).toFixed(2);
    }
    


    /*
    * Returns the total times the bots played offense
    */
    getTotalOffense(){
        return this.teamData['totals']['of'];
    }

    /*
    * Returns the total times the bots played defense
    */
    getTotalDefense(){
        return this.teamData['totals']['def'];
    }

    /*
    * Returns the percentage of games the bots played defense
    */
    getDefenseRate(){
        return (this.getTotalDefense / (this.getTotalDefense  + this.getTotalOffense) *100).toFixed(2) + '%';
    }

    /*
    * Returns the percentage of games the bots played defense
    */
    getOffenseRate(){
        return (100 - this.getDefenseRate()) + '%';
    }



    /*
    * Returns the number of games the bots been defended agaisnt
    */
    getTimesDefendedOn(){
        return this.teamData['totals']['defended'];
    }
    /*
    * Returns the percent of games the bots been defended agaisnt
    */
    getDefendedOnRate(){
        return (this.teamData['averages']['defendedAvg']*100).toFixed(2) + '%';
    }


//-----------------------Same as above but for only games when the bots been defended agaisnt-----------
    

    getDefendedAverageHighTeleBalls(){
        return this.defendedTeamData['averages']['tHighsAvg'].toFixed(2);
    }
    getDefendedAverageLowTeleBalls(){
        return this.defendedTeamData['averages']['tLowsAvg'].toFixed(2);
    }
    getDefendedAverageTeleScore(){
        return this.defendedTeamData['averages']['tLowsAvg'].toFixed(2) * 1 + (this.defendedTeamData['averages']['tHighsAvg'] * 2).toFixed(2);
    }
    getDefendedHighTeleRate(){
        return (this.defendedTeamData['rates']['tHighRate']*100).toFixed(2) + '%';
    }
    getDefendedLowTeleRate(){
        return (this.defendedTeamData['rates']['tLowRate']*100).toFixed(2) + '%';
    }
    getDefendedAverageScore(){
        
        let a = this.defendedTeamData['averages']['travsSAvg'];
        if (a == 'N/A'){
            a = 0;
        }
        let b =  this.defendedTeamData['averages']['highsSAvg'];
        if (b == 'N/A'){
            b = 0;
        }
        let c =  this.defendedTeamData['averages']['midsSAvg'];
        if (c == 'N/A'){
            c = 0;
        }
        let d =  this.defendedTeamData['averages']['lowsSAvg'];
        if (d == 'N/A'){
            d = 0;
        }
    
        return this.getAverageAutoScore() + this.getDefendedAverageTeleScore() 
                 + (a * 15).toFixed(2) + (b * 10).toFixed(2) + (c * 6).toFixed(2) + (d * 4).toFixed(2);
    }


//-----------------------Same as above but for only games when the bot HASNT been defended agaisnt-----------


    getNotDefendedAverageHighTeleBalls(){
        return this.notDefendedTeamData['averages']['tHighsAvg'].toFixed(2);
    }
    getNotDefendedAverageLowTeleBalls(){
        return this.notDefendedTeamData['averages']['tLowsAvg'].toFixed(2);
    }
    getNotDefendedAverageTeleScore(){
        return (this.notDefendedTeamData['averages']['tLowsAvg'] * 1).toFixed(2) + (this.notDefendedTeamData['averages']['tHighsAvg'] * 2).toFixed(2);
    }
    getNotDefendedHighTeleRate(){
        return (this.notDefendedTeamData['rates']['tHighRate']*100).toFixed(2) + '%';
    }
    getNotDefendedLowTeleRate(){
        return (this.notDefendedTeamData['rates']['tLowRate']*100).toFixed(2) + '%';
    }

    getNotDefendedAverageScore(){
        
        let a = this.notDefendedTeamData['averages']['travsSAvg'];
        if (a == 'N/A'){
            a = 0;
        }
        let b =  this.notDefendedTeamData['averages']['highsSAvg'];
        if (b == 'N/A'){
            b = 0;
        }
        let c =  this.notDefendedTeamData['averages']['midsSAvg'];
        if (c == 'N/A'){
            c = 0;
        }
        let d =  this.notDefendedTeamData['averages']['lowsSAvg'];
        if (d == 'N/A'){
            d = 0;
        }
    
        return this.getAverageAutoScore() + this.getNotDefendedAverageTeleScore() 
                 + (a * 15).toFixed(2) + (b * 10).toFixed(2) + (c * 6).toFixed(2) + (d * 4).toFixed(2);
    }

}
module.exports = TeamData;