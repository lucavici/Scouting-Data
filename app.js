// Import dependencies
const fs = require("fs");
const { google } = require("googleapis");

const service = google.sheets("v4");
const credentials = require("./credentials.json");

// Configure auth client
const authClient = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets"]
);

async function updateSheet() {
    try {

        // Authorize the client
        const token = await authClient.authorize();

        // Set the client credentials
        authClient.setCredentials(token);

        // Get the rows
        const res = await service.spreadsheets.values.get({
            auth: authClient,
            spreadsheetId: "1yCG-b8Ig0_Ca9uO0eUC-iVXLiimCBdvbzsNZtQ6VXKs",
            range: "'Form Responses 1'!C:T",
        });

        // All of the team
        const team = {};


        // Set rows to equal the rows
        const rows = res.data.values;


        // Check if we have any data and if we do add it to our team array
        if (rows.length) {

            // Remove the headers
            rows.shift()
            


            const title = [ "team",
                            "match",
                            //(change when taxi) "taxi",
                            "aHigh",
                            "aHighFail",
                            "aLow",
                            "aLowFail",
                            "",
                            "tHigh",
                            "tHighFail",
                            "",
                            "tLow",
                            "tLowFail",
                            "climbAttempted",
                            "climbActual",
                            "",
                            "climbTime",
                            "defenseOffense",
                            'defended'];

            // For each row


            const match = {};
            for (let row = 0; row < rows.length; row++) {
                const tempArray = {};
                if (team[rows[row][0]] == null){
                    team[rows[row][0]] = {};
                }
                team[rows[row][0]][rows[row][1]] = {};
                for (let col = 2; col < rows[row].length; col++){
                    if (col == 6 /*(change when taxi) 7*/ || col == 9 /*(change when taxi) 10*/){
                        rows[row][col + 1] = parseInt(rows[row][col]) + parseInt(rows[row][col+1]);
                    } else if (col == 14 /*(change when taxi) 15*/){
                        rows[row][col + 1] = parseInt(rows[row][col]) - parseInt(rows[row][col+1]);
                    }
                    else{
                        tempArray[title[col]] = rows[row][col];
                    }
                }
                
                team[rows[row][0]][rows[row][1]] = tempArray;
            }
        } else {
            console.log("No data found.");  
        }

        // Saved the team
        fs.writeFileSync("data.json", JSON.stringify(team), function (err, file) {
            if (err) throw err;
            console.log("Saved!");
        });
        console.log('Updated data from spreadsheet (app.js)');

    } catch (error) {

        // Log the error
        console.log(error);

        // Exit the process with error
        process.exit(1);

    }

}
module.exports = {updateSheet};


/*module.exports = class ReadSheet{

    // Import dependencies
    static fs = require("fs");
    static api = require("googleapis");
    static google = this.api.google;

    static service = this.google.sheets("v4");
    static credentials = require("./credentials.json");

    //configure authClient
    static authClient = new this.google.auth.JWT(
        this.credentials.client_email,
        null,
        this.credentials.private_key.replace(/\\n/g, "\n"),
        ["https://www.googleapis.com/auth/spreadsheets"]
    );

    static async runUpdateData(){

        console.log(this.authClient);
        setInterval(this.updateData, 10 * 1000);
    }

    static async updateData() {
        try {

            // Authorize the client
            const token = await (this.authClient).authorize();

            // Set the client credentials
            this.authClient.setCredentials(token);

            // Get the rows
            const res = await this.service.spreadsheets.values.get({
                auth: authClient,
                spreadsheetId: "1yCG-b8Ig0_Ca9uO0eUC-iVXLiimCBdvbzsNZtQ6VXKs",
                range: "'Form Responses 1'!C:T",
            });


            // Set rows to equal the rows
            const rows = res.data.values;


            // Check if we have any data and if we do add it to our team array
            if (rows.length) {

                // Remove the headers
                rows.shift()
                


                const title = [ "team",
                                "match",
                                //(change when taxi) "taxi",
                                "aHigh",
                                "aHighFail",
                                "aLow",
                                "aLowFail",
                                "",
                                "tHigh",
                                "tHighFail",
                                "",
                                "tLow",
                                "tLowFail",
                                "climbAttempted",
                                "climbActual",
                                "",
                                "climbTime",
                                "defenseOffense",
                                'defended'];

                // For each row


                const match = {};
                for (let row = 0; row < rows.length; row++) {
                    const tempArray = {};
                    if (team[rows[row][0]] == null){
                        team[rows[row][0]] = {};
                    }
                    team[rows[row][0]][rows[row][1]] = {};
                    for (let col = 2; col < rows[row].length; col++){
                        if (col == 6 /*(change when taxi) 7*/ /*|| col == 9 /*(change when taxi) 10*//*){
                            rows[row][col + 1] = parseInt(rows[row][col]) + parseInt(rows[row][col+1]);
                        } else if (col == 14 /*(change when taxi) 15*//*){
                            rows[row][col + 1] = parseInt(rows[row][col]) - parseInt(rows[row][col+1]);
                        }
                        else{
                            tempArray[title[col]] = rows[row][col];
                        }
                    }
                    
                    team[rows[row][0]][rows[row][1]] = tempArray;
                }
            } else {
                console.log("No data found.");  
            }

            // Saved the team
            fs.writeFileSync("data.json", JSON.stringify(team), function (err, file) {
                if (err) throw err;
                console.log("Saved!");
            });
            console.log("updated");

        } catch (error) {

            // Log the error
            console.log(error);

            // Exit the process with error
            process.exit(1);

        }

    }
}*/