import { AppModule } from './app/app.module';

require('./app/services/sofascore.service')
require('./app/services/conexionGoogle.service')

angular.bootstrap(document, [AppModule]);