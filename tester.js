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
    if (allData[key] == null){

        allData[key] = {};

        /*allData[key] = ['all', 'defended', 'notDefended'];
        for (i in allData[key]){
            //allData[key][allData[key][i]] = ['totals', 'averages', 'rates'];
            for (i2 in allTotalCommands){
                allData[key][allData[key][i]][allData[key][i]['totals']] = allTotalCommands[i2];
            }
            for (i2 in allAverageCommands){
                allData[key][allData[key][i]][allData[key][i]['averages']] = allTotalCommands[i2];
            }
            for (i2 in allRateCommands){
                allData[key][allData[key][i]][allData[key][i]['rates']] = allTotalCommands[i2];
            }
        }*/
    }
    for (i in allTotalCommands){
        if (allData[key]['all']['totals'][allTotalCommands[i]] == undefined){
            if (allData[key]['all']['totals'] == undefined){
                if (allData[key]['all'] == undefined){
                    allData[key]['all'] = {};
                }
                allData[key]['all']['totals'] = {};
                allData[key]['all']['averages'] = {};
                allData[key]['all']['rates'] = {};
            }
            allData[key]['all']['totals'][allTotalCommands[i]] = {};
            allData[key]['all']['averages'][allTotalCommands[i]] = {};
            allData[key]['all']['rates'][allTotalCommands[i]] = {};
        }
        allData[key]['all']['totals'][allTotalCommands[i]] = getTotals(allTotalCommands[i], key);
        allData[key]['defended']['totals'][allTotalCommands[i]] = getDefendedTotals(allTotalCommands[i], key);
        allData[key]['notDefended']['totals'][allTotalCommands[i]] = getNotDefendedTotals(allTotalCommands[i], key);
    }
    for (i in allAverageCommands){
        if (allData[key]['all']['totals'][allAverageCommands[i]] == undefined){
            if (allData[key]['all']['totals'] == undefined){
                if (allData[key]['all'] == undefined){
                    allData[key]['all'] = {};
                }
                allData[key]['all']['totals'] = {};
                allData[key]['all']['averages'] = {};
                allData[key]['all']['rates'] = {};
            }
            allData[key]['all']['totals'][allAverageCommands[i]] = {};
            allData[key]['all']['averages'][allAverageCommands[i]] = {};
            allData[key]['all']['rates'][allAverageCommands[i]] = {};
        }
        allData[key]['all']['averages'][allTotalCommands[i]] = getAverages(allTotalCommands[i], key);
        allData[key]['defended']['averages'][allTotalCommands[i]] = getDefendedAverages(allTotalCommands[i], key);
        allData[key]['notDefended']['averages'][allTotalCommands[i]] = getNotDefendedAverages(allTotalCommands[i], key);
    }
    for (i in allRateCommands){
        if (allData[key]['all']['totals'][allRateCommands[i]] == undefined){
            if (allData[key]['all']['totals'] == undefined){
                if (allData[key]['all'] == undefined){
                    allData[key]['all'] = {};
                }
                allData[key]['all']['totals'] = {};
                allData[key]['all']['averages'] = {};
                allData[key]['all']['rates'] = {};
            }
            allData[key]['all']['totals'][allRateCommands[i]] = {};
            allData[key]['all']['averages'][allRateCommands[i]] = {};
            allData[key]['all']['rates'][allRateCommands[i]] = {};
        }
        allData[key]['all']['rates'][allTotalCommands[i]] = getRates(allTotalCommands[i], key);
        allData[key]['defended']['rates'][allTotalCommands[i]] = getDefendedRates(allTotalCommands[i], key);
        allData[key]['notDefended']['rates'][allTotalCommands[i]] = getNotDefendedRates(allTotalCommands[i], key);
    }
}

