angular.module('app', [])
.controller('SofaScoreCtrl', ['$http', SofaScoreCtrl])

function SofaScoreCtrl($http){

    var vm = this;
    vm.loadingPredicciones = true;
    vm.loadingStats = true;

    //llamada apuestas
    $http({
        method: 'GET',
        url: 'https://www.sofascore.com/user/583445f3c0351e03c006d9bf/predictions'
    })
    .then(
        function(response){
            vm.misPredicciones = new Array();
            
            var dia = -1;
            elementAnterior = undefined;
            response.data.forEach(function(element) {
                element.startDateTimestamp =  element.startDateTimestamp*1000;//convierto fecha para que aparezca bien el año
                //si la lista está vacia o si el dia es distinto, cambiamos la primera pos de array y creamos su array
                if(elementAnterior == undefined || new Date(elementAnterior.startDateTimestamp).getDate() != new Date(element.startDateTimestamp).getDate()){
                    dia++;
                    vm.misPredicciones[dia] = new Object();

                    vm.misPredicciones[dia].miDia = new Array();
                    vm.misPredicciones[dia].misStats = new Object();
                    vm.misPredicciones[dia].misStats.countCorrectos = 0;
                    vm.misPredicciones[dia].misStats.beneficio = 0;
                }
                //siempre guardamos la prediccion del partido
                vm.misPredicciones[dia].miDia.push(element);

                //contar beneficio si se acerto
                if(element.correct == 1){
                    vm.misPredicciones[dia].misStats.countCorrectos++;
                    vm.misPredicciones[dia].misStats.beneficio += parseFloat(element.odds.decimalValue);
                }                

                //guardamos el partido anterior para poder comparar.
                elementAnterior = element;
            }, this);

            vm.loadingPredicciones = false;
        },
        function(responseError) {
            alert("No se puede acceder");
            vm.loadingPredicciones = false;
        }
    )

    //llamada estadisticas
    $http({
        method: 'GET',
        url: 'https://www.sofascore.com/user/info/me/json?providerType=google&providerData%5BaccessToken%5D=ya29.GlweBnNIrhIp8ue7FV7N_kUZJyhpDTF8egWU4mJzKcqJ46Er2i_nB5iH0ywddbuyDQLyLs7OA5JfPW_sUC_bbuJM6CYbEIYMlEWRR3C4A2KTXohQ8Kqhua-4Mc7GMg&_=153872049'
    })
    .then(
        function(response){
            vm.miPerfil = response.data;
            vm.loadingStats = false;
        },
        function(responseError){
            alert("No se puede acceder");
            vm.loadingStats = false;

        }
    )

    //llamada excel
    // $http({
    //     method: 'GET',
    //     url: 'https://sheets.googleapis.com/v4/spreadsheets/18sABGq3yVQIPAviivZ5ZpXqhIwv6ByP55pr-Qt__y-A?'
    // }).
    // then(
    //     function(response){
    //         console.log(response);
    //     },
    //     function(responseError){
    //         console.log(responseError);
    //     }
    // )

    //metodo no API
    // $http({
    //     method: 'GET',
    //     url: 'https://spreadsheets.google.com/feeds/list/1xubc2uCZYsgn2HupaiWbH0Y91wt_D-lAhrIEVpiH0wU/1/public/values?alt=json'
    // }).
    // then(
    //     function(response){
    //         console.log(response);
    //         vm.excel = response.data;

    //         vm.excel.feed.title.$t = "prueba";

    //         $http({
    //             method: 'PUT',
    //             url: 'https://spreadsheets.google.com/feeds/list/1xubc2uCZYsgn2HupaiWbH0Y91wt_D-lAhrIEVpiH0wU/1/public/values?alt=json',
    //             data: vm.excel
    //         }).
    //         then(
    //             function(response){
    //                 console.log(response);
    //             },
    //             function(responseError){
    //                 console.log(responseError);
        
    //             });
    //     },
    //     function(responseError){

    //     });

    //intento con api
    // $http({
    //     method: 'GET',
    //     url: 'https://sheets.googleapis.com/v4/spreadsheets/1xubc2uCZYsgn2HupaiWbH0Y91wt_D-lAhrIEVpiH0wU'
    // }).
    // then(
    //     function(response){
    //         console.log(response);
    //     },
    //     function(responseError){
    //     });
    
    

    vm.open = function(tokenPartido){
        var win = window.open("https://www.sofascore.com/es/" + tokenPartido, '_blank');
        win.focus();
    }

}