require('./predicciones.scss');

import angular from 'angular';
import Predicciones from './predicciones.component';

const PrediccionesModule = angular
    .module('predicciones', [])
    .component('pfgPredicciones', Predicciones)
    .name;

export default PrediccionesModule;