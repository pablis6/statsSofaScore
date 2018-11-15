/**
 * Lee el fichero 
 */
function leerFichero() {
    var params = {
        // The spreadsheet to request.
        spreadsheetId: '1xubc2uCZYsgn2HupaiWbH0Y91wt_D-lAhrIEVpiH0wU',  // TODO: Update placeholder value.

        // The ranges to retrieve from the spreadsheet.
        ranges: [],  // TODO: Update placeholder value.

        // True if grid data should be returned.
        // This parameter is ignored if a field mask was set in the request.
        includeGridData: true,  // TODO: Update placeholder value.
    };

    var request = gapi.client.sheets.spreadsheets.get(params);
    request.then(function(response) {
        // TODO: Change code below to process the `response` object:
        console.log(response.result);
        
    }, function(reason) {
        console.error('error: ' + reason.result.error.message);
    });
}

/**
 * Inicializa el cliente 
 */
function initClient() {
    var API_KEY = 'AIzaSyBJIIATc44jtnymXD4sKCClp6Yp9hDMBjQ';  // TODO: Update placeholder with desired API key.

    var CLIENT_ID = '996044358079-92gblutm87me40h2fg3fo03ftkvpaok2.apps.googleusercontent.com';  // TODO: Update placeholder with desired client ID.

    // TODO: Authorize using one of the following scopes:
    //   'https://www.googleapis.com/auth/drive'
    //   'https://www.googleapis.com/auth/drive.file'
    //   'https://www.googleapis.com/auth/drive.readonly'
    //   'https://www.googleapis.com/auth/spreadsheets'
    //   'https://www.googleapis.com/auth/spreadsheets.readonly'
    var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

    gapi.client.init({
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'scope': SCOPE,
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
        if(!gapi.auth2.getAuthInstance().isSignedIn.get()){
            gapi.auth2.getAuthInstance().signIn();
            leerFichero();
        }
    });
}

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 * cada vez que se actualice el indicador de si esta logado o no, se ejecuta este metodo
 */
function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {

    }
}

/**
 * Log in
 */
function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 * Log out
 */
function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}