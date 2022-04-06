<<<<<<< Updated upstream
const TeamData = require('./TeamData.js');
const teamData = new TeamData(254);
=======

>>>>>>> Stashed changes

const ReadSheet = require('./app.js');

//runs every 60 seconds asyc
ReadSheet.runUpdateData();

//const Probability = require('./Predictions.js');
//const prediction = new Probability(3);

<<<<<<< Updated upstream
console.log(teamData.getHighAutoRate());
=======
const {updateData} = require('./TeamData');

const {getHighAutoRate} = require('./TeamData');

updateData();

console.log(getHighAutoRate(254));
>>>>>>> Stashed changes
/*console.log(teamData.getAverageHighTeleBalls());
console.log(teamData.getDefendedAverageHighTeleBalls());
console.log(teamData.getNotDefendedAverageHighTeleBalls());*/

