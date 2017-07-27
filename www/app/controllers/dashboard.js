define([
  'app',
  'services/event'
], function (app) {
  'use strict';



app.factory('api', function($http, $q, $window, serverConfig) {

    return {

getPublicaciones:function(){  

            return  $http.post(serverConfig.url+'/getPublicaciones')
            .then(function(response) {
            console.log(response);
            return response;
            }, function(response) {
            // something went wrong
            console.log('error');
             console.log(response);

            return response;
            });
        },
            getProximosEventos:function(){  

            return  $http.post(serverConfig.url+'/getEventosProximos')
            .then(function(response) {
            console.log(response);
            return response;
            }, function(response) {
            // something went wrong
            console.log('error');
             console.log(response);

            return response;
            });
        },

             getPublicacion:function(idPublicacion){  
          //  console.log(idEvento);
            return  $http.post(serverConfig.url+'/getPublicacion', {id:idPublicacion})
            .then(function(response) {
            console.log(response);
            return response;
            }, function(response) {
            // something went wrong
            console.log('error');
             console.log(response);

            return response;
            });
        },

        getEvento:function(idEvento){  
          console.log(idEvento);
            return  $http.post(serverConfig.url+'/getEvento', {id:idEvento})
            .then(function(response) {
            console.log(response);
            return response;
            }, function(response) {
            // something went wrong
            console.log('error');
             console.log(response);

            return response;
            });
        }


    }

    });

  app.controller('DashboardCtrl', [
    '$scope',
    '$state',
    'eventService',
    'api',
    function ($scope, $state, eventService, api) {
      $scope.search = {};

      
      $scope.goToList = function () {
        console.log('btn');
        $state.go('results', {
          search: $scope.search.string,
          satTrans: $scope.search.satTrans,
          wheelChair: $scope.search.wheelChair,
          wheelChairLift: $scope.search.wheelChairLift
        });
      };

      $scope.loadNext = function () {


        api.getProximosEventos().then(function (events) {

          //$scope.events = events;
          $scope.events = events.data.eventos;
          console.log(events);
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

          $scope.$broadcast('scroll.infiniteScrollComplete');

        });



      };



        $scope.grid_view = function() {
    if($scope.layout == 'grid'){
      $scope.layout = "list";
    } else {
      $scope.layout = "grid";
    }
  };





      $scope.chats = [{
    id: 0,
    name: 'Belleza espera alegrar una vida',
    lastText: 'Dulce, hembra esterilizada vacunas al día, tamaño pequeño,año y medio muy cariñosa y amiga de los gatos fue rescatada desnutrida y enferma junto a 19 hermanos.',
    face: 'http://solomascotas.cl/registro/dist/anuncio/35/image.jpeg',
    price:'Se regala',
    discout:'Hace 3 dias'
  }, {
    id: 0,
    name: 'Belleza espera alegrar una vida',
    lastText: 'Dulce, hembra esterilizada vacunas al día, tamaño pequeño,año y medio muy cariñosa y amiga de los gatos fue rescatada desnutrida y enferma junto a 19 hermanos.',
    face: 'http://solomascotas.cl/registro/dist/anuncio/35/image.jpeg',
    price:'Se regala',
    discout:'Hace 3 dias'
  }, {
    id: 0,
    name: 'Belleza espera alegrar una vida',
    lastText: 'Dulce, hembra esterilizada vacunas al día, tamaño pequeño,año y medio muy cariñosa y amiga de los gatos fue rescatada desnutrida y enferma junto a 19 hermanos.',
    face: 'http://solomascotas.cl/registro/dist/anuncio/35/image.jpeg',
    price:'Se regala',
    discout:'Hace 3 dias'
  }];
      //$scope.remove = function(chat) {
      //eventService.remove(chat);
     // };


    }
  ]);
});
