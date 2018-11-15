class AppController {
    constructor($http, SofaScoreService, ConexionGoogleService){
        var vm = this;
        vm.sofaScoreService = SofaScoreService;
        vm.conexionGoogleService = ConexionGoogleService;

        vm.conexionGoogleService.handleClientLoad();
    }
}
AppController.$inject = ['$http', 'SofaScoreService', 'ConexionGoogleService'];
export default AppController;