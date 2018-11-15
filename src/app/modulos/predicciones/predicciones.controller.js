class PrediccionesController {
    constructor(SofaScoreService){
        var vm = this;
        vm.sofaScoreService = SofaScoreService;
        vm.sofaScoreService.llamadasSofaScore();

        vm.open = function(tokenPartido){
            var win = window.open("https://www.sofascore.com/es/" + tokenPartido, '_blank');
            win.focus();
        }
    }
}
PrediccionesController.$inject = ['SofaScoreService'];
export default PrediccionesController;