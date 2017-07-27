define([
  'app',
  // Load Controllers here
  'controllers/app',
  'controllers/dashboard',
  'controllers/results',
  'controllers/detail'
], function (app) {
  'use strict';
  // definition of routes

   app.constant("serverConfig", {
        //"url": "http://localhost:80",
        "url": "http://solomascotas.cl/app/v1/index.php",
       "imageStorageURL" : 'http://solomascotas.cl/registro'
        //"port": "80"
    });


   app.config(function ($httpProvider) {
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
});


  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$ionicConfigProvider',
    function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
$ionicConfigProvider.backButton.previousTitleText(false).text('');
      //$ionicConfigProvider.backButton.previousTitleText(false);
      // url routes/states
      $urlRouterProvider.otherwise('listaMascotas');

      $stateProvider
        // app states
        .state('dashboard', {
          url: '/dashboard',
          templateUrl: 'app/templates/dashboard.html',
          controller: 'DashboardCtrl'
        })

         .state('listaMascotas', {
          url: '/listaMascotas',
          templateUrl: 'app/templates/listaMascotas.html',
          controller: 'listaMascotasCtrl'
        })
         .state('contactanos', {
          url: '/contactanos',
          templateUrl: 'app/templates/contactanos.html',
          controller: 'contactanosCtrl'
        })




        .state('results', {
          url: '/results/:search/:satTrans/:wheelChair/:wheelChairLift',
          controller: 'ResultsCtrl',
          templateUrl: 'app/templates/results.html'
        })
        .state('detail', {
          url: '/detail/:id',
          controller: 'DetailCtrl',
          templateUrl: 'app/templates/detail.html'
        })
        .state('detailPublicacion', {
          url: '/detailPublicacion/:id',
          controller: 'DetailPublicacionCtrl',
          templateUrl: 'app/templates/detailPublicacion.html'
        });

        


    }
  ]);
});
