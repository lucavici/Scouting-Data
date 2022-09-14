function updateTeamData(allData_, defendedData_, notDefendedData_){

    allData = allData_;
    defendedData = defendedData_;
    notDefendedData = notDefendedData_;

    updateAverageAutoBalls();
    updateAverageAutoScore();

    updateAverageTeleBalls();
    updateAverageTeleScore();

    updateAverageClimbScore();

    updateAverageScore();

    updateDefenseRate();
    updateTaxiRate();

    console.log('Updated getter data (TeamData.js)');
}

//updaters for data not compiled in CollectTeamData.js
function updateAverageAutoBalls(){
    for (const [key, team] of Object.entries(allData)){
        team['averages']['autoBalls'] = (team['averages']['autoHighs'] 
                                                + team['averages']['autoLows']).toFixed(2);
    }
    for (const [key, team] of Object.entries(defendedData)){
        defendedData[key]['averages']['autoBalls'] = (team['averages']['autoHighs'] 
                                                + team['averages']['autoLows']).toFixed(2);
    }
    for (const [key, team] of Object.entries(notDefendedData)){
        notDefendedData[key]['averages']['autoBalls'] = (team['averages']['autoHighs'] 
                                                + team['averages']['autoLows']).toFixed(2);
    }
}

function updateAverageTeleBalls(){
    for (const [key, team] of Object.entries(allData)){
        team['averages']['teleBalls'] = (team['averages']['teleHighs'] 
                                                + team['averages']['teleLows']).toFixed(2);
    }
    for (const [key, team] of Object.entries(defendedData)){
        defendedData[key]['averages']['teleBalls'] = (defendedData[key]['averages']['teleHighs'] 
                                                + defendedData[key]['averages']['teleLows']).toFixed(2);
    }
    for (const [key, team] of Object.entries(notDefendedData)){
        notDefendedData[key]['averages']['teleBalls'] = (notDefendedData[key]['averages']['teleHighs'] 
                                                + notDefendedData[key]['averages']['teleLows']).toFixed(2);
    }
}

function updateAverageAutoScore(){
    for (const [key, team] of Object.entries(allData)){
        team['averages']['autoScore'] = (team['averages']['autoHighs'] * 4
                                                + team['averages']['autoLows'] * 2).toFixed(2);
    }
    for (const [key, team] of Object.entries(allData)){
        defendedData[key]['averages']['autoScore'] = (team['averages']['autoHighs'] * 4
                                                + team['averages']['autoLows'] * 2).toFixed(2);
    }
    for (const [key, team] of Object.entries(allData)){
        notDefendedData[key]['averages']['autoScore'] = (team['averages']['averageAutoHighs'] * 4
                                                + team['averages']['autoLows'] * 2).toFixed(2);
    }
}

function updateAverageTeleScore(){
    for (const [key, team] of Object.entries(allData)){
        team['averages']['teleScore'] = (team['averages']['teleHighs'] * 2
                                                + team['averages']['teleLows'] * 1).toFixed(2);
    }
    for (const [key, team] of Object.entries(defendedData)){
        defendedData[key]['averages']['teleScore'] = (defendedData[key]['averages']['teleHighs'] * 2
                                                + defendedData[key]['averages']['teleLows'] * 1).toFixed(2);
    }
    for (const [key, team] of Object.entries(notDefendedData)){
        notDefendedData[key]['averages']['AteleScore'] = (notDefendedData[key]['averages']['teleHighs'] * 2
                                                + notDefendedData[key]['averages']['teleLows'] * 1).toFixed(2);
    }
}

function updateAverageScore(){
    for (const [key, team] of Object.entries(allData)){
        let a = parseFloat(team['averages']['traversalsSucceeded']);
        console.log(key + ": " + a);
        if (a == 'N/A'){
            a = 0;
        }
        let b =  parseFloat(team['averages']['highbarsSucceeded']);
        if (b == 'N/A'){
            b = 0;
        }
        let c =  parseFloat(team['averages']['midbarsSucceeded']);
        if (c == 'N/A'){
            c = 0;
        }
        let d =  parseFloat(team['averages']['lowbarsSucceeded']);
        if (d == 'N/A'){
            d = 0;
        }


        team['averages']['score'] = parseFloat(team['averages']['autoScore']) + parseFloat(team['averages']['teleScore']) 
                                            + parseFloat((a * 15).toFixed(2) + parseFloat((b * 10).toFixed(2)) + parseFloat((c * 6).toFixed(2)) + parseFloat((d * 4).toFixed(2)));
                    
        defendedData[key]['averages']['score'] = team['averages']['autoScore'] + defendedData[key]['averages']['teleScore'] 
                                                    + parseFloat((a * 15).toFixed(2) + parseFloat((b * 10).toFixed(2)) + parseFloat((c * 6).toFixed(2)) + parseFloat((d * 4).toFixed(2)));
        notDefendedData[key]['averages']['score'] = team['averages']['autoScore'] + notDefendedData[key]['averages']['teleScore'] 
                                                        + parseFloat((a * 15).toFixed(2) + parseFloat((b * 10).toFixed(2)) + parseFloat((c * 6).toFixed(2)) + parseFloat((d * 4).toFixed(2)));
        
        console.log(team['averages']['score']);
    }
}

function updateAverageClimbScore(){
    for (const [key, team] of Object.entries(allData)){
        let a = parseFloat(team['averages']['traversalsSucceeded']);
        console.log(key + ": " + a);
        if (a == 'N/A'){
            a = 0;
        }
        let b =  parseFloat(team['averages']['highbarsSucceeded']);
        if (b == 'N/A'){
            b = 0;
        }
        let c =  parseFloat(team['averages']['midbarsSucceeded']);
        if (c == 'N/A'){
            c = 0;
        }
        let d =  parseFloat(team['averages']['lowbarsSucceeded']);
        if (d == 'N/A'){
            d = 0;
        }
        team['averages']['climbScore'] = parseFloat((a * 15).toFixed(2) + parseFloat((b * 10).toFixed(2)) + parseFloat((c * 6).toFixed(2)) + parseFloat((d * 4).toFixed(2)));
        defendedData[key]['averages']['climbScore'] = parseFloat((a * 15).toFixed(2)) + parseFloat((b * 10).toFixed(2)) + parseFloat((c * 6).toFixed(2)) + parseFloat((d * 4).toFixed(2));
        notDefendedData[key]['averages']['climbScore'] = parseFloat((a * 15).toFixed(2) + parseFloat((b * 10).toFixed(2)) + parseFloat((c * 6).toFixed(2)) + parseFloat((d * 4).toFixed(2)));
    }
}

function updateDefenseRate(){
    for (const [key, team] of Object.entries(allData)) {
        team['rates']['deffense'] = team['totals']['def'] / (team['totals']['def']  + team['totals']['of']);
        team['rates']['offense'] = 1.0 - team['rates']['deffense'];
    }
    for (const [key, team] of Object.entries(defendedData)) {
        team['rates']['deffense'] = team['totals']['def'] / (team['totals']['def']  + team['totals']['of']);
        team['rates']['offense'] = 1.0 - team['rates']['deffense'];
    }
    for (const [key, team] of Object.entries(notDefendedData)) {
        team['rates']['deffense'] = team['totals']['def'] / (team['totals']['def']  + team['totals']['of']);
        team['rates']['offense'] = 1.0 - team['rates']['deffense'];
    }
}

function updateTaxiRate(){
    for (const [key, team] of Object.entries(allData)){
        team['rates']['taxi'] = team['averages']['taxis'];
        defendedData[key]['rates']['taxi'] = team['averages']['taxis'];
        notDefendedData[key]['rates']['taxi'] = team['averages']['taxis'];
    }
}

//getters
function getTeams() {
    const teams = [];
    var i=0;
    for (const [key, team] of Object.entries(allData)){
        teams[i] = team;
        i++;
    }
    return teams;
}

function getTotals(type, team){
    return allData[team]['totals'][type];
}
function getAverages(type, team){
    return allData[team]['averages'][type];
}
function getRates(type, team){
    return allData[team]['rates'][type];
}

function getDefendedTotals(type, team){
    return defendedData[team]['totals'][type];
}
function getDefendedAverages(type, team){
    return defendedData[team]['averages'][type];
}
function getDefendedRates(type, team){
    return defendedData[team]['rates'][type];
}

function getNotDefendedTotals(type, team){
    return notDefendedData[team]['totals'][type];
}
function getNotDefendedAverages(type, team){
    return notDefendedData[team]['averages'][type];
}
function getNotDefendedRates(type, team){
    return notDefendedData[team]['rates'][type];
}


//if you see this function no you didnt adn i dont want to talk abt it
function getTotalsLength(team) {
    return allData[team]['totals'].length;
}



function getAutoStandardDeviation (team) {  
    //need all of the auto scores in an array
    const AutoBalls = allData[team]['totals'];
    const n = AutoBalls.length;
    const mean = getAverageAutoBalls(team);
    if (!AutoBalls || AutoBalls.length === 0) {return 0;}
    return Math.sqrt(AutoBalls.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
}
function getTeleStandardDeviation (team) {  
    //need all of the auto scores in an array
    const AutoBalls = allData[team]['totals'];
    const n = AutoBalls.length;
    const mean = getAverageAutoBalls(team);
    if (!AutoBalls || AutoBalls.length === 0) {return 0;}
    return Math.sqrt(AutoBalls.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
}

module.exports =    {updateTeamData,

                    getTotalsLength,

                    getTotals,
                    getAverages,
                    getRates,
                
                    getDefendedTotals,
                    getDefendedAverages,
                    getDefendedRates,
                
                    getNotDefendedTotals,
                    getNotDefendedAverages,
                    getNotDefendedRates}
