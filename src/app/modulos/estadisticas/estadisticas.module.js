require('./estadisticas.scss')

import angular from 'angular';
import Estadisticas from './estadisticas.component';

const EstadisticasModule = angular
    .module('estadisticas', [])
    .component('pfgEstadisticas', Estadisticas)
    .name;

export default EstadisticasModule;