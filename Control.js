const TeamData = require('./TeamData.js');

const ReadSheet = require('./app.js');

//runs every 60 seconds asyc
//ReadSheet.runUpdateData();

//const Probability = require('./Predictions.js');
//const prediction = new Probability(3);

TeamData.updateData();

console.log(TeamData.getHighAutoRate(254));
/*console.log(teamData.getAverageHighTeleBalls());
console.log(teamData.getDefendedAverageHighTeleBalls());
console.log(teamData.getNotDefendedAverageHighTeleBalls());*/

