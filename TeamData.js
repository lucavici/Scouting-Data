class TeamDatax {

    constructor(team){
        const CollectTeamData = require('./CollectTeamData.js');
        const collector = new CollectTeamData(team);
        this.teamData = collector.getTeamData();
        this.defendedTeamData = collector.getDefendedTeamData();
        this.notDefendedTeamData = collector.getNotDefendedTeamData();
    }

    /* (change when taxi) getTaxiRate(){
        return this.teamData['averages']['taxisAvg'] + '%';
    }*/
    getAverageHighAutoBalls(){
        return this.teamData['averages']['aHighsAvg'];
    }
    getAverageLowAutoBalls(){
        return this.teamData['averages']['aLowsAvg'];
    }
    getAverageAutoScore(){ //doesnt include taxi??
        return this.teamData['averages']['aLowsAvg'] * 2 + this.teamData['averages']['aHighsAvg'] * 4;
    }
    getHighAutoRate(){
        return this.teamData['rates']['aHighRate'] + '%';
    }
    getLowAutoRate(){
        return this.teamData['rates']['aLowRate'] + '%';
    }
    
    getAverageHighTeleBalls(){
        return this.teamData['averages']['tHighsAvg'];
    }
    getAverageLowTeleBalls(){
        return this.teamData['averages']['tLowsAvg'];
    }
    getAverageTeleScore(){
        return this.teamData['averages']['tLowsAvg'] * 1 + this.teamData['averages']['tHighsAvg'] * 2;
    }
    getHighTeleRate(){
        return this.teamData['rates']['tHighRate'] + '%';
    }
    getLowTeleRate(){
        return this.teamData['rates']['tLowRate'] + '%';
    }
    
    getTraversalRate(){
        return this.teamData['rates']['travSucessRate'] + '%';
    }
    getHighClimbRate(){
        return this.teamData['rates']['highSucessRate'] + '%';
    }
    getMidClimbRate(){
        return this.teamData['rates']['midSucessRate'] + '%';
    }
    getLowClimbRate(){
        return this.teamData['rates']['lowSucessRate'] + '%';
    }
    
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
                 + a * 15 + b * 10 + c * 6 + d * 4;
    }
    
    getTotalOffense(){
        return this.teamData['totals']['of'];
    }
    getTotalDefense(){
        return this.teamData['totals']['def'];
    }
    getDefenseRate(){
        return (this.getTotalDefense / (this.getTotalDefense  + this.getTotalOffense)) + '%';
    }
    getOffenseRate(){
        return (100 - this.getDefenseRate()) + '%';
    }

    getTimesDefendedOn(){
        return this.teamData['totals']['defended'];
    }
    getDefendedOnRate(){
        return this.teamData['averages']['defendedAvg'];
    }





    getDefendedAverageHighTeleBalls(){
        return this.defendedTeamData['averages']['tHighsAvg'];
    }
    getDefendedAverageLowTeleBalls(){
        return this.defendedTeamData['averages']['tLowsAvg'];
    }
    getDefendedAverageTeleScore(){
        return this.defendedTeamData['averages']['tLowsAvg'] * 1 + this.defendedTeamData['averages']['tHighsAvg'] * 2;
    }
    getDefendedHighTeleRate(){
        return this.defendedTeamData['rates']['tHighRate'] + '%';
    }
    getDefendedLowTeleRate(){
        return this.defendedTeamData['rates']['tLowRate'] + '%';
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
                 + a * 15 + b * 10 + c * 6 + d * 4;
    }



    getNotDefendedAverageHighTeleBalls(){
        return this.notDefendedTeamData['averages']['tHighsAvg'];
    }
    getNotDefendedAverageLowTeleBalls(){
        return this.notDefendedTeamData['averages']['tLowsAvg'];
    }
    getNotDefendedAverageTeleScore(){
        return this.notDefendedTeamData['averages']['tLowsAvg'] * 1 + this.notDefendedTeamData['averages']['tHighsAvg'] * 2;
    }
    getNotDefendedHighTeleRate(){
        return this.notDefendedTeamData['rates']['tHighRate'] + '%';
    }
    getNotDefendedLowTeleRate(){
        return this.notDefendedTeamData['rates']['tLowRate'] + '%';
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
                 + a * 15 + b * 10 + c * 6 + d * 4;
    }

}
module.exports = TeamDatax;