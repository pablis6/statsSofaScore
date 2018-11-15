require('./app.scss');

import angular from 'angular';

import 'angular-component';
import 'angular-i18n/angular-locale_es-es.js';
import AppComponent from './app.component';
import Predicciones from './modulos/predicciones/predicciones.module';
import Estadisticas from './modulos/estadisticas/estadisticas.module';

require('imports-loader?$=jquery,jQuery=jquery,angular!../../bower_components/angular-bootstrap/ui-bootstrap.js');

// expose globals for document module
require('expose-loader?$!jquery');

export const AppModule = angular
    .module('app', [
        'ui.bootstrap',
        Predicciones,
        Estadisticas
    ])
    .component('pfgApp', AppComponent)
    .name;