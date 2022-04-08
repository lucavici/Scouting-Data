const fs = require("fs");

let data;
try{
    data = require('./data.json');
}
catch (err) {
    console.log("Error parsing JSON string:\n", err);
}


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
        getNotDefendedRates} = require('./TeamData');
updateTeamData();

const allTotalCommands = ['autoHighs',
                        'autoHighFails',
                        'autoLows',
                        'autoLowFails',
                        'teleHighs',
                        'teleHighFails',
                        'teleLows',
                        'teleLowFails',
                        'traversalsSucceeded',
                        'traversalsAttempted',
                        'highbarsSucceeded',
                        'highbarsAttempted',
                        'midbarsSucceeded',
                        'midbarsAttempted',
                        'lowbarsSucceeded',
                        'lowbarsAttempted',
                        'time',
                        'def',
                        'of',
                        'defended',];

const allAverageCommands = ['autoHighs',
                            'autoHighFails',
                            'autoLows',
                            'autoLowFails',
                            'teleHighs',
                            'teleHighFails',
                            'teleLows',
                            'teleLowFails',
                            'traversalsSucceeded',
                            'traversalsAttempted',
                            'highbarsSucceeded',
                            'highbarsAttempted',
                            'midbarsSucceeded',
                            'midbarsAttempted',
                            'lowbarsSucceeded',
                            'lowbarsAttempted',
                            'time',
                            'def',
                            'of',
                            'defended',
                            'autoBalls',
                            'teleBalls',
                            'autoScore',
                            'teleScore',
                            'score'];
const allRateCommands = ['autoHigh',
                        'autoLow',
                        'teleHigh',
                        'teleLow',
                        'traversalSuccess',
                        'highbarSuccess',
                        'midbarSuccess',
                        'lowbarSuccess',
                        'defenseRate'];

let allData = {}

for (const [key, value] of Object.entries(data)){
    console.log();
    console.log();
    

    fs.writeFile('./CompiledData.txt', key+':\n', { flag: 'a' }, err => {
        if (err) {
          console.error(err)
          return
        }
    })

    console.log();

    fs.writeFile('./CompiledData.txt', ('\all:\n'), { flag: 'a' }, err => {
        if (err) {
          console.error(err)
          return
        }
    })
    fs.writeFile('./CompiledData.txt', ('\t\ttotals:\n'), { flag: 'a' }, err => {
        if (err) {
          console.error(err)
          return
        }
    })
    for (i in allTotalCommands){
        fs.writeFile('./CompiledData.txt', ('\t\t\t' + allTotalCommands[i] + ": " + getTotals(allTotalCommands[i], key) + '\n'), { flag: 'a' }, err => {
            if (err) {
              console.error(err)
              return
            }
        })
    }
    fs.writeFile('./CompiledData.txt', '\t\taverages:\n', { flag: 'a' }, err => {
        if (err) {
          console.error(err)
          return
        }
    })
    for (i in allAverageCommands){
        fs.writeFile('./CompiledData.txt', ('\t\t\t' + allAverageCommands[i] + ": " + getAverages(allAverageCommands[i], key) + '\n'), { flag: 'a' }, err => {
            if (err) {
              console.error(err)
              return
            }
        })
    }

    fs.writeFile('./CompiledData.txt', '\t\trates:\n', { flag: 'a' }, err => {
        if (err) {
          console.error(err)
          return
        }
    })
    for (i in allRateCommands){
        fs.writeFile('./CompiledData.txt', ('\t\t\t' + allRateCommands[i] + ": " + getRates(allRateCommands[i], key) + '\n'), { flag: 'a' }, err => {
            if (err) {
              console.error(err)
              return
            }
        })
    }




    fs.writeFile('./CompiledData.txt', ('\tdefended::\n'), { flag: 'a' }, err => {
        if (err) {
          console.error(err)
          return
        }
    })
    fs.writeFile('./CompiledData.txt', ('\t\ttotals:\n'), { flag: 'a' }, err => {
        if (err) {
          console.error(err)
          return
        }
    })
    for (i in allTotalCommands){
        fs.writeFile('./CompiledData.txt', ('\t\t\t' + allTotalCommands[i] + ": " + getDefendedTotals(allTotalCommands[i], key) + '\n'), { flag: 'a' }, err => {
            if (err) {
              console.error(err)
              return
            }
        })
    }
    fs.writeFile('./CompiledData.txt', '\t\taverages:\n', { flag: 'a' }, err => {
        if (err) {
          console.error(err)
          return
        }
    })
    for (i in allAverageCommands){
        fs.writeFile('./CompiledData.txt', ('\t\t\t' + allAverageCommands[i] + ": " + getDefendedAverages(allAverageCommands[i], key) + '\n'), { flag: 'a' }, err => {
            if (err) {
              console.error(err)
              return
            }
        })
    }

    fs.writeFile('./CompiledData.txt', '\t\trates:\n', { flag: 'a' }, err => {
        if (err) {
          console.error(err)
          return
        }
    })
    for (i in allRateCommands){
        fs.writeFile('./CompiledData.txt', ('\t\t\t' + allRateCommands[i] + ": " + getDefendedRates(allRateCommands[i], key) + '\n'), { flag: 'a' }, err => {
            if (err) {
              console.error(err)
              return
            }
        })
    }



    fs.writeFile('./CompiledData.txt', '\tnot\n', { flag: 'a' }, err => {
        if (err) {
          console.error(err)
          return
        }
        //file written successfully
      })

    fs.writeFile('./CompiledData.txt', '\t\ttotals:\n', { flag: 'a' }, err => {
        if (err) {
          console.error(err)
          return
        }
    })
    for (i in allTotalCommands){
        fs.writeFile('./CompiledData.txt', ('\t\t\t' + allTotalCommands[i] + ": " + getNotDefendedTotals(allTotalCommands[i], key) + '\n'), { flag: 'a' }, err => {
            if (err) {
              console.error(err)
              return
            }
        })
    }

    fs.writeFile('./CompiledData.txt', ("\t\taverages:\n"), { flag: 'a' }, err => {
        if (err) {
          console.error(err)
          return
        }
    })
    for (i in allAverageCommands){
        fs.writeFile('./CompiledData.txt', ('\t\t\t' + allAverageCommands[i] + ": " + getNotDefendedAverages(allAverageCommands[i], key) + '\n'), { flag: 'a' }, err => {
            if (err) {
              console.error(err)
              return
            }
        })
    }
    

    fs.writeFile('./CompiledData.txt', '\t\trates:\n', { flag: 'a' }, err => {
        if (err) {
          console.error(err)
          return
        }
    })
    for (i in allRateCommands){
        fs.writeFile('./CompiledData.txt', ('\t\t\t' + allRateCommands[i] + ": " + getNotDefendedRates(allRateCommands[i], key) + '\n'), { flag: 'a' }, err => {
            if (err) {
              console.error(err)
              return
            }
        })
    }
    
}
