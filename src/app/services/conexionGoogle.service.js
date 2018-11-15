(function (angular){
    'use strict';

    angular
        .module('app')
        .service('ConexionGoogleService', function(SofaScoreService){

            var fecha = new Date(); //La fecha de trabajo siempre es el dia anterior
            fecha.setDate(fecha.getDate() - 1);

            //si son menos de las 12:00 aun estan los datos del dia anterior en SofaScore (2 dias realmente)
            if(fecha.getHours() < 12){
                fecha.setDate(fecha.getDate() - 1);
            }
            var hojaMes = fecha.toLocaleDateString("es-ES", { month: 'long'})
            var filaDia = fecha.getDate()+1 // +1 por la cabecera en el excel la fila y el dia no coinciden

            //Variables de la llamada al excel
            var paramsLectura = {
                // The spreadsheet to request.
                spreadsheetId: '1xubc2uCZYsgn2HupaiWbH0Y91wt_D-lAhrIEVpiH0wU',  // TODO: Update placeholder value.

                // The ranges to retrieve from the spreadsheet.
                ranges: [hojaMes+"!A" + filaDia +":D" + filaDia],  // TODO: Update placeholder value.
                
                // range: [hojaMes+"!A" + filaDia +":D" + filaDia],  // TODO: Update placeholder value. //SOLO UPDATE

                // True if grid data should be returned.
                // This parameter is ignored if a field mask was set in the request.
                includeGridData: true,  // TODO: Update placeholder value.
            };
            var paramsEscritura = {
                // The spreadsheet to request.
                spreadsheetId: '1xubc2uCZYsgn2HupaiWbH0Y91wt_D-lAhrIEVpiH0wU',  // TODO: Update placeholder value.

                // The ranges to retrieve from the spreadsheet.

                range: [hojaMes+"!A" + filaDia +":D" + filaDia],  // TODO: Update placeholder value.
                valueInputOption: "USER_ENTERED",

                // True if grid data should be returned.
                // This parameter is ignored if a field mask was set in the request.
                includeGridData: true,  // TODO: Update placeholder value.
            };
            
            var service = {
                handleClientLoad : handleClientLoad
            }
            return service;
            
            /**
             * Lee el fichero 
             */
            function leerFichero() {

                var request = gapi.client.sheets.spreadsheets.get(paramsLectura);
                request.then(function(response) {
                    // TODO: Change code below to process the `response` object:
                    console.log(response.result);
                    procesarLectura(response.result);
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
                    }
                    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
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
                    leerFichero();
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

            /**
             * 
             * @param {JSON} lectura Json correspondiete a la fila del excel del dia actual
             */
            function procesarLectura(lectura){

                var values = lectura.sheets[0].data[0].rowData[0].values;
                //ver si ya esta rellena
                // values[0]; //fecha
                // values[1]; //ganancia
                // values[2]; //periodo
                // values[3]; //total

                //guardar valor que corresponde
                var valueRangeBody = {
                    "values": [
                        [
                            values[0].formattedValue,
                            values[1].formattedValue != undefined ? values[1].formattedValue : SofaScoreService.getGanancia(fecha),
                            values[2].formattedValue != undefined ? values[2].formattedValue : SofaScoreService.getPeriodo(),
                            values[3].formattedValue != undefined ? values[3].formattedValue : SofaScoreService.getTotal()
                        ]
                    ]
                }

                var request = gapi.client.sheets.spreadsheets.values.update(paramsEscritura, valueRangeBody);
                request.then(function(response) {
                    // TODO: Change code below to process the `response` object:
                    console.log(response.result);
                }, function(reason) {
                    console.error('error: ' + reason.result.error.message);
                });
            }

        });
})(angular);