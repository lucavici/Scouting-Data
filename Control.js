const {updateSheet} = require('./app.js');

update();
async function update(){


    updateSheet();

    setInterval(updateSheet, 30 * 1000);
}

module.exports = {update};