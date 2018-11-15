class EstadisticasController {
    constructor(SofaScoreService){
        var vm = this;
        vm.sofaScoreService = SofaScoreService;
        vm.sofaScoreService.llamadasSofaScore();
    }
}
EstadisticasController.$inject = ['SofaScoreService'];
export default EstadisticasController;