const updateSheet = require('./app.js');

const {updateTeamData} = require('./TeamData');

const {getData} = require('./CollectTeamData.js');


async function update(){
    updateTeamData();
    updateSheet();
    getData();
    setInterval(updateData, 30 * 1000);
    setInterval(updateSheet, 30 * 1000);
    setInterval(getData, 30 * 1000)
}
