module.exports = class TeamData {

    
    static #CollectTeamData = require('./CollectTeamData.js');

    static #allData = this.#CollectTeamData.getAllData();
    static #defendedData = (this.#CollectTeamData).getDefendedData();
    static #notDefendedData = (this.#CollectTeamData).getNotDefendedData();


    updateData(){

        this.#CollectTeamData.getData();
        this.#allData = this.#CollectTeamData.getAllData();
        this.#defendedData = (this.#CollectTeamData).getDefendedData();
        this.#notDefendedData = (this.#CollectTeamData).getNotDefendedData();
    }

    /*
    * Returns percent of times taxi achieved
    *
    * /
    /* (change when taxi) getTaxiRate(team){
        return this.#allData[team]['averages']['taxisAvg'] + '%';
    }*/

    //if you see this function no you didnt adn i dont want to talk abt it
    getTotalsLength(team) {
        return this.#allData[team]['totals'].length;
    }

    getAverageHighAutoBalls(team){
        return this.#allData[team]['averages']['aHighsAvg'].toFixed(2);
    }
    getAverageLowAutoBalls(team){
        return this.#allData[team]['averages']['aLowsAvg'].toFixed(2);
    }
    getAverageAutoBalls(team) {
        return this.getAverageHighAutoBalls(team) + this.getAverageLowAutoBalls(team);
    }
    getAverageAutoScore(team){ //doesnt include taxi??
        return this.#allData[team]['averages']['aLowsAvg'].toFixed(2) * 2 
                + this.#allData[team]['averages']['aHighsAvg'].toFixed(2) * 4 
                /*(change when taxi) + Math.round(this.getTaxiRate(team)) * 2*/; //adds taxi bonus if gets taxi 50% or more of the time
    }
    getAutoStandardDeviation (team) {  
        //need all of the auto scores in an array
        const AutoBalls = allData[team]['totals'];
        const n = AutoBalls.length;
        const mean = this.getAverageAutoBalls(team);
        if (!AutoBalls || AutoBalls.length === 0) {return 0;}
        return Math.sqrt(AutoBalls.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
    }
    getTeleStandardDeviation (team) {  
        //need all of the auto scores in an array
        const AutoBalls = allData[team]['totals'];
        const n = AutoBalls.length;
        const mean = this.getAverageAutoBalls(team);
        if (!AutoBalls || AutoBalls.length === 0) {return 0;}
        return Math.sqrt(AutoBalls.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
    }

    /*
    * Returns the percentage of balls succesfuly made in upper hub, auto
    *
    */
    getHighAutoRate(team){
        console.log(this.#allData[team]);
        return (this.#allData[team]['rates']['aHighRate']*100).toFixed(2) + '%';
    }

    /*
    * Returns the percentage of balls succesfuly made in lower hub, auto
    *
    */
    getLowAutoRate(team){
        return (this.#allData[team]['rates']['aLowRate']*100).toFixed(2) + '%';
    }
    
    getAverageHighTeleBalls(team){
        return this.#allData[team]['averages']['tHighsAvg'].toFixed(2);
    }
    getAverageLowTeleBalls(team){
        return this.#allData[team]['averages']['tLowsAvg'].toFixed(2);
    }

    /*
    * Returns average amounts of tele lows + average amount of tele highs
    *
    */
    getAverageTeleScore(team){
        return this.#allData[team]['averages']['tLowsAvg'].toFixed(2) * 1 
                + this.#allData[team]['averages']['tHighsAvg'].toFixed(2) * 2;
    }
    getHighTeleRate(team){
        return (this.#allData[team]['rates']['tHighRate']*100).toFixed(2) + '%';
    }
    getLowTeleRate(team){
        return (this.#allData[team]['rates']['tLowRate']*100).toFixed(2) + '%';
    }
    
    getTraversalRate(team){
        return (this.#allData[team]['rates']['travSucessRate']*100).toFixed(2) + '%';
    }
    getHighClimbRate(team){
        return (this.#allData[team]['rates']['highSucessRate']*100).toFixed(2) + '%';
    }
    getMidClimbRate(team){
        return (this.#allData[team]['rates']['midSucessRate']*100).toFixed(2) + '%';
    }
    getLowClimbRate(team){
        return (this.#allData[team]['rates']['lowSucessRate']*100).toFixed(2) + '%';
    }
    

    /*
    * Returns (average telescore) + (average auto score) + (percent of games got x bar * bar points)
    *
    */
    getAverageScore(team){
        
        let a = this.#allData[team]['averages']['travsSAvg'];
        if (a == 'N/A'){
            a = 0;
        }
        let b =  this.#allData[team]['averages']['highsSAvg'];
        if (b == 'N/A'){
            b = 0;
        }
        let c =  this.#allData[team]['averages']['midsSAvg'];
        if (c == 'N/A'){
            c = 0;
        }
        let d =  this.#allData[team]['averages']['lowsSAvg'];
        if (d == 'N/A'){
            d = 0;
        }
    
        return this.getAverageAutoScore(team) + this.getAverageTeleScore(team) 
                 + (a * 15).toFixed(2) + (b * 10).toFixed(2) + (c * 6).toFixed(2) + (d * 4).toFixed(2);
    }
    


    /*
    * Returns the total times the bots played offense
    */
    getTotalOffense(team){
        return this.#allData[team]['totals']['of'];
    }

    /*
    * Returns the total times the bots played defense
    */
    getTotalDefense(team){
        return this.#allData[team]['totals']['def'];
    }

    /*
    * Returns the percentage of games the bots played defense
    */
    getDefenseRate(team){
        return (this.getTotalDefense / (this.getTotalDefense  + this.getTotalOffense) *100).toFixed(2) + '%';
    }

    /*
    * Returns the percentage of games the bots played defense
    */
    getOffenseRate(team){
        return (100 - this.getDefenseRate(team)) + '%';
    }



    /*
    * Returns the number of games the bots been defended agaisnt
    */
    getTimesDefendedOn(team){
        return this.#allData[team]['totals']['defended'];
    }
    /*
    * Returns the percent of games the bots been defended agaisnt
    */
    getDefendedOnRate(team){
        return (this.#allData[team]['averages']['defendedAvg']*100).toFixed(2) + '%';
    }


//-----------------------Same as above but for only games when the bots been defended agaisnt-----------
    

    getDefendedAverageHighTeleBalls(team){
        return this.#defendedData[team]['averages']['tHighsAvg'].toFixed(2);
    }
    getDefendedAverageLowTeleBalls(team){
        return this.#defendedData[team]['averages']['tLowsAvg'].toFixed(2);
    }
    getDefendedAverageTeleScore(team){
        return this.#defendedData[team]['averages']['tLowsAvg'].toFixed(2) * 1 + (this.#defendedData[team]['averages']['tHighsAvg'] * 2).toFixed(2);
    }
    getDefendedHighTeleRate(team){
        return (this.#defendedData[team]['rates']['tHighRate']*100).toFixed(2) + '%';
    }
    getDefendedLowTeleRate(team){
        return (this.#defendedData[team]['rates']['tLowRate']*100).toFixed(2) + '%';
    }
    getDefendedAverageScore(team){
        
        let a = this.#defendedData[team]['averages']['travsSAvg'];
        if (a == 'N/A'){
            a = 0;
        }
        let b =  this.#defendedData[team]['averages']['highsSAvg'];
        if (b == 'N/A'){
            b = 0;
        }
        let c =  this.#defendedData[team]['averages']['midsSAvg'];
        if (c == 'N/A'){
            c = 0;
        }
        let d =  this.#defendedData[team]['averages']['lowsSAvg'];
        if (d == 'N/A'){
            d = 0;
        }
    
        return this.getAverageAutoScore(team) + this.getDefendedAverageTeleScore(team) 
                 + (a * 15).toFixed(2) + (b * 10).toFixed(2) + (c * 6).toFixed(2) + (d * 4).toFixed(2);
    }


//-----------------------Same as above but for only games when the bot HASNT been defended agaisnt-----------


    getNotDefendedAverageHighTeleBalls(team){
        return this.#notDefendedData[team]['averages']['tHighsAvg'].toFixed(2);
    }
    getNotDefendedAverageLowTeleBalls(team){
        return this.#notDefendedData[team]['averages']['tLowsAvg'].toFixed(2);
    }
    getNotDefendedAverageTeleScore(team){
        return (this.#notDefendedData[team]['averages']['tLowsAvg'] * 1).toFixed(2) + (this.#notDefendedData[team]['averages']['tHighsAvg'] * 2).toFixed(2);
    }
    getNotDefendedHighTeleRate(team){
        return (this.#notDefendedData[team]['rates']['tHighRate']*100).toFixed(2) + '%';
    }
    getNotDefendedLowTeleRate(team){
        return (this.#notDefendedData[team]['rates']['tLowRate']*100).toFixed(2) + '%';
    }

    getNotDefendedAverageScore(team){
        
        let a = this.#notDefendedData[team]['averages']['travsSAvg'];
        if (a == 'N/A'){
            a = 0;
        }
        let b =  this.#notDefendedData[team]['averages']['highsSAvg'];
        if (b == 'N/A'){
            b = 0;
        }
        let c =  this.#notDefendedData[team]['averages']['midsSAvg'];
        if (c == 'N/A'){
            c = 0;
        }
        let d =  this.#notDefendedData[team]['averages']['lowsSAvg'];
        if (d == 'N/A'){
            d = 0;
        }
    
        return this.getAverageAutoScore(team) + this.getNotDefendedAverageTeleScore(team) 
                 + (a * 15).toFixed(2) + (b * 10).toFixed(2) + (c * 6).toFixed(2) + (d * 4).toFixed(2);
    }

}