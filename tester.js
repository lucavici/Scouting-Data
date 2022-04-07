const fs = require("fs");

let data;
try{
    data = require('./data.json');
}
catch (err) {
    console.log("Error parsing JSON string:", err);
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
    console.log(key + ":")

    console.log();

    console.log("\tall:")

    console.log("\t\ttotals:")
    for (i in allTotalCommands){
        console.log('\t\t\t' + getTotals(allTotalCommands[i], key))
    }
    console.log("\t\taverages:")
    for (i in allAverageCommands){
        console.log('\t\t\t' + getAverages(allAverageCommands[i], key))
    }
    console.log("\t\trates:")
    for (i in allRateCommands){
        console.log('\t\t\t' + getRates(allRateCommands[i], key))
    }



    console.log("\tdefended:")

    console.log("\t\ttotals:")
    for (i in allTotalCommands){
        console.log('\t\t\t' + getDefendedTotals(allTotalCommands[i], key))
    }
    console.log("\t\taverages:")
    for (i in allAverageCommands){
        console.log('\t\t\t' + getDefendedAverages(allAverageCommands[i], key))
    }
    console.log("\t\trates:")
    for (i in allRateCommands){
        console.log('\t\t\t' + getDefendedRates(allRateCommands[i], key))
    }



    console.log("\tnot:")

    console.log("\t\ttotals:")
    for (i in allTotalCommands){
        console.log('\t\t\t' + getNotDefendedTotals(allTotalCommands[i], key))
    }
    console.log("\t\taverages:")
    for (i in allAverageCommands){
        console.log('\t\t\t' + getNotDefendedAverages(allAverageCommands[i], key))
    }
    console.log("\t\trates:")
    for (i in allRateCommands){
        console.log('\t\t\t' + getNotDefendedRates(allRateCommands[i], key))
    }
    
}
