(function (angular){
    'use strict';

    angular
        .module('app')
        .service('SofaScoreService', function($http){
            var service = {
                llamadasSofaScore : llamadasSofaScore,
                getGanancia : getGanancia,
                getPeriodo : getPeriodo,
                getTotal : getTotal
            }
            return service;

            /**
             * Se hacen las dos llamadas a los servicios de SofaScore
             */
            function llamadasSofaScore(){
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
                        var elementAnterior = undefined;
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
            }

            function getGanancia(fecha){
                var beneficio = 0;

                //itero sobre cada dia
                this.misPredicciones.forEach(function(dia){
                    //para cada dia cojo solo el primer partido del dia y comparo las fechas
                    if(new Date(dia.miDia[0].startDateTimestamp).toLocaleDateString() == fecha.toLocaleDateString()){
                        beneficio = dia.misStats.beneficio - dia.miDia.length;
                    }
                })
                return beneficio;
            }

            function getPeriodo(){
                return this.miPerfil.voteStatistics.current.roi;
            }

            function getTotal(){
                return this.miPerfil.voteStatistics.allTime.roi;
            }

        });
})(angular);