const {updateSheet} = require('./app.js');

const {updateTeamData} = require('./TeamData');

const {getData} = require('./CollectTeamData.js');

update();
async function update(){


    updateSheet();

    setInterval(updateSheet, 30 * 1000);
}

module.exports = {update};