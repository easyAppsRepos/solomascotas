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
      //$urlRouterProvider.otherwise('listaMascotas');






          if(localStorage.getItem('userInfoSM') == null || 
            localStorage.getItem('userInfoSM') == 'null' || 
            localStorage.getItem('userInfoSM') == 'undefined' || 
            localStorage.getItem('userInfoSM') == undefined){

        //console.log(localStorage.getItem('userInfoTS'));
      $urlRouterProvider.otherwise('login');

        }
        else{
           // console.log(localStorage.getItem('userInfoTS'));
      $urlRouterProvider.otherwise('listaMascotas');
        // $urlRouterProvider.otherwise("/login");
        }




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

      .state('buscarAnuncio', {
          url: '/buscarAnuncio',
          templateUrl: 'app/templates/buscarAnuncio.html',
          controller: 'buscarAnuncioCtrl'
        })

         


   .state('misPublicaciones', {
          url: '/misPublicaciones',
          templateUrl: 'app/templates/misPublicaciones.html',
          controller: 'misPublicacionesCtrl'
        })


         .state('contactanos', {
          url: '/contactanos',
          templateUrl: 'app/templates/contactanos.html',
          controller: 'contactanosCtrl'
        })

           .state('notificaciones', {
          url: '/notificaciones',
          templateUrl: 'app/templates/notificaciones.html',
          controller: 'contactanosCtrl'
        })




      .state('configuracion', {
          url: '/configuracion',
          templateUrl: 'app/templates/configuracion.html',
          controller: 'configuracionCtrl'
        })


         


        .state('login', {
          url: '/login',
          templateUrl: 'app/templates/login.html',
          controller: 'loginCtrl'
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
