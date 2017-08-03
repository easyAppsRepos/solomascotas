/* global ionic, define */
define([
  'app',
  'services/event'
], function (app) {
  'use strict';

  app.controller('DetailCtrl', [
    '$scope',
    '$stateParams',
    '$window',
    '$ionicPopup',
    'eventService',
    'api',
    function ($scope, $stateParams, $window, $ionicPopup, eventService, api) {

      $scope.loading = true;

  /*    eventService.getOne($stateParams.id).then(function (event) {
        $scope.event = event;
      }).finally(function () {
        $scope.loading = false;
      });

*/
      api.getEvento($stateParams.id).then(function (events) {

          //$scope.events = events;
          //$scope.events = events.data.evento;
          console.log(events);
          $scope.event = events.data.evento;
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

          
            $scope.loading = false;
           
          

        });





      $scope.reload = function () {
        eventService.getOne($stateParams.id).then(function (event) {
          $scope.event = event;
        }).finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
        });
      };

      $scope.call = function () {
        $window.open('tel:' + $scope.event.contact.tel, '_system');
      };

      $scope.mail = function () {
        $window.open('mailto:' + $scope.event.contact.email, '_system');
      };

      $scope.website = function () {
        $window.open($scope.event.website, '_system');
      };

      $scope.map = function () {
        if (ionic.Platform.isIOS()) {
          $window.open('maps://?q=' + $scope.event.lat + ',' + $scope.event.lng, '_system');
        } else {
          $window.open('geo://0,0?q=' + $scope.event.lat + ',' + $scope.event.lng + '(' + $scope.event.name + '/' + $scope.event.city + ')&z=15', '_system');
        }
      };

      $scope.report = function () {
        $ionicPopup.prompt({
          scope: $scope,
          title: '<span class="energized">Report an issue</span>',
          subTitle: '<span class="stable">What\'s wrong or missing?</span>',
          inputType: 'text',
          inputPlaceholder: ''
        }).then(function (res) {
          if (res) {
            // here connect to backend and send report
          }
        });
      };
    }
  ]);




  app.controller('DetailPublicacionCtrl', [
    '$scope',
    '$stateParams',
    '$window',
    '$ionicPopup',
    'eventService',
    'api',
    'serverConfig',
    function ($scope, $stateParams, $window, $ionicPopup, eventService, api, serverConfig) {

      $scope.loading = true;
  $scope.urlImg = serverConfig.imageStorageURL;
  /*    eventService.getOne($stateParams.id).then(function (event) {
        $scope.event = event;
      }).finally(function () {
        $scope.loading = false;
      });

*/
      api.getPublicacion($stateParams.id).then(function (events) {

          //$scope.events = events;
          //$scope.events = events.data.evento;
          console.log(events);
          $scope.event = events.data.evento;
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

          
            $scope.loading = false;
           
          

        });





      $scope.reload = function () {
        eventService.getOne($stateParams.id).then(function (event) {
          $scope.event = event;
        }).finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
        });
      };

      $scope.call = function () {
        $window.open('tel:' + $scope.event.contact.tel, '_system');
      };

      $scope.mail = function () {
        $window.open('mailto:' + $scope.event.contact.email, '_system');
      };

      $scope.website = function () {
        $window.open($scope.event.website, '_system');
      };

      $scope.map = function () {
        if (ionic.Platform.isIOS()) {
          $window.open('maps://?q=' + $scope.event.lat + ',' + $scope.event.lng, '_system');
        } else {
          $window.open('geo://0,0?q=' + $scope.event.lat + ',' + $scope.event.lng + '(' + $scope.event.name + '/' + $scope.event.city + ')&z=15', '_system');
        }
      };

      $scope.report = function () {
        $ionicPopup.prompt({
          scope: $scope,
          title: '<span class="energized">Report an issue</span>',
          subTitle: '<span class="stable">What\'s wrong or missing?</span>',
          inputType: 'text',
          inputPlaceholder: ''
        }).then(function (res) {
          if (res) {
            // here connect to backend and send report
          }
        });
      };
    }
  ]);



    app.controller('contactanosCtrl', [
    '$scope',
    '$stateParams',
    '$window',
    '$ionicPopup',
    'eventService',
    'api',
    'serverConfig',
    function ($scope, $stateParams, $window, $ionicPopup, eventService, api, serverConfig) {

      $scope.loading = true;

  /*    eventService.getOne($stateParams.id).then(function (event) {
        $scope.event = event;
      }).finally(function () {
        $scope.loading = false;
      });

*/
  $scope.urlImg = serverConfig.imageStorageURL;
        $scope.grid_view = function() {
    if($scope.layout == 'grid'){
      $scope.layout = "list";
    } else {
      $scope.layout = "grid";
    }
  };



    }
  ]);




    app.controller('loginCtrl', [
    '$scope',
    '$stateParams',
    '$window',
    '$ionicPopup',
    '$ionicModal',
    '$ionicLoading',
    '$state',
    'eventService',
    'api',
    'serverConfig',
    function ($scope, $stateParams, $window, $ionicPopup, $ionicModal, $ionicLoading,$state, eventService, api, serverConfig) {

      $scope.loading = true;

  /*    eventService.getOne($stateParams.id).then(function (event) {
        $scope.event = event;
      }).finally(function () {
        $scope.loading = false;
      });

*/
  $scope.urlImg = serverConfig.imageStorageURL;
        $scope.grid_view = function() {
    if($scope.layout == 'grid'){
      $scope.layout = "list";
    } else {
      $scope.layout = "grid";
    }
  };


  function mensajeAlerta(tipo, mensaje){
    console.log(tipo);
    var ima ='exclam.png';
if(tipo==1){

     var customTemplate =
        '<div style="text-align:center;"><img style="margin-top:10px" src="img/exclam.png"> <p style="    font-size: 18px;color:white; margin-top:25px">'+mensaje+'</p> </div>';


}
  if(tipo == 2){

     var customTemplate =
        '<div style="text-align:center;"><img style="margin-top:10px" src="img/confirma.png"> <p style="    font-size: 18px;color:white; margin-top:25px">'+mensaje+'</p> </div>';

}

      $ionicPopup.show({
        template: customTemplate,
        title: '',
        subTitle: '',
        buttons: [{
          text: 'Cerrar',
          type: 'button-blueCustom',
          onTap: function(e) {

    console.log('ok');
          }
           // if(borrar){ $scope.user.pin='';}
           
          
        }]
      });

}



    $scope.doLogin = function(user){

           console.log(user);
            $ionicLoading.show();
//usuario.email = usuario.email.toLowerCase();
          api.doLogin(user).then(function (events) {
            if(events.data.error == false){

              if(events.data.user.verificado == 1){

                window.localStorage.setItem( 'userInfoSM', JSON.stringify(events.data.user));            
                $state.go('listaMascotas');

                console.log('logueado');

              }
              else{
                mensajeAlerta(1, 'Debes verificar tu cuenta');
                console.log('no verificado');
              }
            


            }
            else{

            mensajeAlerta(1, 'Credenciales incorrectas');

            }
            }).finally(function () {

            $ionicLoading.hide();
      });





    }




    $scope.openModalRegistro = function(){

            $scope.openModal("nuevoUsuario.html", "slide-in-up");
    }
$scope.registrarUsuario = function(usuario){

  $ionicLoading.show();

console.log(usuario);

api.registrarUsuario(usuario).then(function (events) {

          //$scope.events = events;
          //$scope.events = events.data.evento;
          if(events.data.error == false){

            mensajeAlerta(2, 'Cuenta creada, te hemos enviado un correo para que verifiques tu cuenta.');
              $scope.closeModal();  


          }
          else{
             mensajeAlerta(1, 'Ha ocurrido un error, la cuenta no ha podido ser creada');

          }
         // $scope.chats = events.data.publicaciones;
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

  $ionicLoading.hide();
          
           // $scope.loading = false;
           
          

        });


          
    }

      $scope.openModal = function(templateName,animation) {
    $ionicModal.fromTemplateUrl(templateName, {
      scope: $scope,
      animation: animation
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });


    }
  ]);




    app.controller('menuBCtrl', [
    '$scope',
    '$stateParams',
    '$ionicHistory',
    '$window',
    '$ionicPopup',
    '$ionicModal',
    '$ionicLoading',
    '$state',
    '$timeout',
    'eventService',
    'api',
    'serverConfig',
    function ($scope, $stateParams, $ionicHistory, $window, $ionicPopup, $ionicModal, 
      $ionicLoading,$state, $timeout, eventService, api, serverConfig) {


$scope.cerrarSesion = function(){
$ionicLoading.show();

  window.localStorage.setItem( 'userInfoSM', undefined);  
  $state.go('login');
  $timeout(function () {
          $ionicHistory.clearCache();
          $ionicLoading.hide();
      }, 200)  


}



    }
  ]);


    app.controller('listaMascotasCtrl', [
    '$scope',
    '$stateParams',
    '$window',
    '$ionicPopup',
    '$ionicLoading',
    '$ionicModal',
    'eventService',
    'api',
    'serverConfig',
    function ($scope, $stateParams, $window, $ionicPopup, $ionicLoading, $ionicModal, eventService, api, serverConfig) {

      $scope.loading = true;



$scope.foto={};
$scope.fotoNombre = 0;
  /*    eventService.getOne($stateParams.id).then(function (event) {
        $scope.event = event;
      }).finally(function () {
        $scope.loading = false;
      });

*/
  $scope.urlImg = serverConfig.imageStorageURL;
        $scope.grid_view = function() {
    if($scope.layout == 'grid'){
      $scope.layout = "list";
    } else {
      $scope.layout = "grid";
    }
  };


      api.getPublicaciones().then(function (events) {

          //$scope.events = events;
          //$scope.events = events.data.evento;
          console.log(events);
          $scope.chats = events.data.publicaciones;
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

          
            $scope.loading = false;
           
          

        });





$scope.agregarAnuncio = function () {
        
        console.log('agregarAnuncio');
        $scope.openModal("nuevoAnuncio.html", "slide-in-up");


      };



  function mensajeAlerta(tipo, mensaje){
    console.log(tipo);
    var ima ='exclam.png';
if(tipo==1){

     var customTemplate =
        '<div style="text-align:center;"><img style="margin-top:10px" src="img/exclam.png"> <p style="    font-size: 18px;color:white; margin-top:25px">'+mensaje+'</p> </div>';


}
  if(tipo == 2){

     var customTemplate =
        '<div style="text-align:center;"><img style="margin-top:10px" src="img/confirma.png"> <p style="    font-size: 18px;color:white; margin-top:25px">'+mensaje+'</p> </div>';

}

      $ionicPopup.show({
        template: customTemplate,
        title: '',
        subTitle: '',
        buttons: [{
          text: 'Cerrar',
          type: 'button-blueCustom',
          onTap: function(e) {

    console.log('ok');
          }
           // if(borrar){ $scope.user.pin='';}
           
          
        }]
      });

}




$scope.registrarAnuncio = function (anuncio) {
        

        if($scope.fotoNombre == 0){

           mensajeAlerta(1, 'Debes agregar una foto');
           return false;

        }


        console.log(anuncio);
        anuncio.foto= $scope.fotoNombre;


          var ft = new FileTransfer();
           ft.upload($scope.foto.imagenAnuncio, serverConfig.imageStorageURL+"/dist/anuncio/upload.php", function(result){

           console.log(JSON.stringify(result));
           // $ionicLoading.hide();

            console.log('Foto cambiada correctamente');
            //$state.reload();
               api.registrarAnuncio(anuncio).then(function (events) {

              if(events.data.error == false){



                 mensajeAlerta(2, 'Anuncio agregado correctamente');

                 $scope.closeModal();


              }
              else{

              mensajeAlerta(1, 'Ha ocurrido un error, no se ha podido agregar el anuncio');

              }
              }).finally(function () {

              $ionicLoading.hide();
               });




           }, function(error){

           console.log(JSON.stringify(error));
           $ionicLoading.hide();
           mensajeAlerta(1, 'Ha ocurrido un error, no se ha podido agregar el anuncio');

           }, options);





       

     


      };


$scope.cambiarFoto = function(){
getImage();
function getImage() {
 navigator.camera.getPicture(uploadPhoto, function(message) {
 console.log('getPic cancelled');
 }, {
 quality: 100,
 destinationType: navigator.camera.DestinationType.FILE_URI,
 sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
 });
}

function uploadPhoto(imageURI) {
$scope.foto.imagenAnuncio = imageURI;
console.log(imageURI);
  var d = new Date();
var n = d.getTime();


  $ionicLoading.show();
 var options = new FileUploadOptions();
 options.fileKey = "file";
 options.fileName = 'anuncio'+n;
 $scope.fotoNombre = 'anuncio'+n;
 options.mimeType = "image/jpeg";
 console.log(options.fileName);
 var params = new Object();
 params.value1 = "test";
 params.value2 = "param";
 options.params = params;
 options.chunkedMode = false;

 


$ionicLoading.hide(); //bb24
/*

var ft = new FileTransfer();
 ft.upload(imageURI, serverConfig.imageStorageURL+"/upload.php", function(result){
 console.log(JSON.stringify(result));
  $ionicLoading.hide();

  console.log('Foto cambiada correctamente');
  //$state.reload();
  $scope.$apply(function () {
     $scope.valorF =4;
});


 }, function(error){
 console.log(JSON.stringify(error));
 $ionicLoading.hide();
 console.log('error al subir foto');
 }, options);


 */


 }
 

 }





      $scope.reload = function () {
        eventService.getOne($stateParams.id).then(function (event) {
          $scope.event = event;
        }).finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
        });
      };



      $scope.report = function () {
        $ionicPopup.prompt({
          scope: $scope,
          title: '<span class="energized">Report an issue</span>',
          subTitle: '<span class="stable">What\'s wrong or missing?</span>',
          inputType: 'text',
          inputPlaceholder: ''
        }).then(function (res) {
          if (res) {
            // here connect to backend and send report
          }
        });
      };




       $scope.openModal = function(templateName,animation) {
    $ionicModal.fromTemplateUrl(templateName, {
      scope: $scope,
      animation: animation
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });




    }
  ]);



});







