const TeamData = require('./TeamData.js');
const teamData = new TeamData(254);

const ReadSheet = require('./app.js');

//runs every 60 seconds asyc
ReadSheet.runUpdateData();

//const Probability = require('./Predictions.js');
//const prediction = new Probability(3);

console.log(teamData.getHighAutoRate());
/*console.log(teamData.getAverageHighTeleBalls());
console.log(teamData.getDefendedAverageHighTeleBalls());
console.log(teamData.getNotDefendedAverageHighTeleBalls());*/

