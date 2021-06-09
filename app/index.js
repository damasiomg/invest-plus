angular.module('investPlus', [
  'mm.foundation.accordion',
  'ngRoute'
])
.config(['$routeProvider', 
  function($routeProvider){
    $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',

    });
  }
])
