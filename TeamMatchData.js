export default class TeamMatchData {

    constructor () { //match, team
        // this.match = match;
        // this.team = team;
    }
    
    // getAutoHigh() {
    //     return data[team][match].aHigh;
    // }
    // getAutoHighFail() {
    //     return data[team][match].aHighFail;
    // }
    // getAutoLow() {
    //     return data[team][match].aLow;
    // }
    // getAutoLowFail() {
    //     return data[team][match].aLowFail;
    // }
    // getTeleopHigh() {
    //     return tHigh = data[team][match].tHigh;
    // }
    // getTeleopHighFail() {
    //     return data[team][match].tHighFail;
    // }
    // getTeleopLow() {
    //     return data[team][match].tLow;
    // }
    // getTeleopLowFail() {
    //     return data[team][match].tLowFail;
    // }
    // getClimbAttempted() {
    //     return data[team][match].climbAttempted;
    // }
    // getClimbActual() {
    //     return data[team][match].climbActual;;
    // }
    // getClimbTime() {
    //     return data[team][match].climbTime;
    // }
    // getMatchDefenseStatus() {
    //     return data[team][match].defenseOffense;
    // }
    // getAutoCargo() {
    //     return aLow + aHigh;
    // }
    // getTeleCargo() {
    //     return tLow + tHigh;
    // }
    // getTotalCargo() {
    //     return this.getAutoLow() + this.getAutoHigh() + this.getTeleopLow() + this.getTeleopHigh();
    // }

    // //computing team match accuracies
    
    // getAutoMatchAccuracy() { 
    //     return (100 * (aLow + aHigh) / (aLow + aHigh + aLowFail + aHighFail)).toFixed(2) + "%";
    // }
    // getTeleopMatchAccuracy() {
    //     return (100 * (tLow + tHigh) / (tLow + tHigh + tLowFail + tHighFail)).toFixed(2) + "%"; 
    // }
    
    // //computing team match points

    // getAutoPoints() {
    //     return (4 * aHigh) + (2 * aLow);
    // }
    // getTeleopPoints() {
    //     return (2 * tHigh) + tLow;
    // }
    getTaxiPoints() {
        //john needs to write a google form question for this--worth 2 pts
        return 100;
    }

    // getHangarPoints() {
    //     hangarPoints = 0;
    //     if (climbActual == "Traversal") {
    //         hangarPoints += 15;
    //     } else if (climbActual == "High") {
    //         hangarPoints += 10;
    //     } else if (climbActual == "Mid") {
    //         hangarPoints += 6;
    //     } else if (climbActual == "Low") {
    //         hangarPoints += 4;
    //     }
    //     return hangarPoints;
    // }
    // getTeamMatchPoints() {
    //     return getTaxiPoints() + getAutoPoints() + getTeleopPoints() + getHangarPoints();
    // }
}