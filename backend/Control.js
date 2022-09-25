const {updateSheet} = require('./app.js');
const {updateTeamData,

    getTotalsLength,

    getTotals,
    getAverages,
    getRates,

    getDefendedTotals,
    getDefendedAverages,
    getDefendedRates,

    getNotDefendedTotals,
    getNotDefendedAverages,
    getNotDefendedRates} = require('./Control.js')

update();
async function update(){


    updateSheet();

    setInterval(updateSheet, 30 * 1000);


}

module.exports = {update};