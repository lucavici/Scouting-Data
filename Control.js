const {updateSheet} = require('./app.js');

const {updateTeamData} = require('./TeamData');

const {getData} = require('./CollectTeamData.js');

update();
async function update(){


    updateSheet();
    getData();
    updateTeamData();

    setInterval(updateSheet, 30 * 1000);
    setInterval(getData, 31 * 1000)
    setInterval(updateTeamData, 32 * 1000);
}

module.exports = {update};