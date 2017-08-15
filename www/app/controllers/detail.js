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
    '$ionicLoading',
    'eventService',
    'api',
    'serverConfig',
    function ($scope, $stateParams, $window, $ionicPopup, $ionicLoading, eventService, api, serverConfig) {

      $scope.loading = true;
  $scope.urlImg = serverConfig.imageStorageURL;
  /*    eventService.getOne($stateParams.id).then(function (event) {
        $scope.event = event;
      }).finally(function () {
        $scope.loading = false;
      });

*/
      
$scope.getDetallesPubli = function (comentario) {

api.getPublicacion($stateParams.id).then(function (events) {

          //$scope.events = events;
          //$scope.events = events.data.evento;
          console.log(events);
          $scope.event = events.data.evento;
           $scope.comentarios = events.data.comentarios;
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

          
            $scope.loading = false;
           
          

        });

}

$scope.getDetallesPubli();


 $scope.usuarioInfo={};
  var userData = JSON.parse(window.localStorage.getItem('userInfoSM'));

  $scope.usuarioInfo.id =  userData.id;



 $scope.publicarComentario = function (comentario) {


  $ionicLoading.show();
        console.log(comentario);

var dataComentario = {
  idPublicacion: $scope.event.id,
  idUsuario: $scope.usuarioInfo.id,
  texto:comentario
  };

        api.publicarComentario(dataComentario).then(function (events) {

              if(events.data.error == false){

                  //console.log('lugaresload');
                 // $scope.lugaresLista=events.data.lugares;
                //  $scope.openModal("nuevoAnuncio.html", "slide-in-up");
                $scope.getDetallesPubli();


              }
              else{

              mensajeAlerta(1, 'Ha ocurrido un error, verifique su conexion a internet');


              }
              }).finally(function () {

              $ionicLoading.hide();
               });




      };




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

      $scope.openPage = function(link){

  if(link == null || link == 'null' || link == 'undefinded'){console.log('nolink')}

  else{
      window.open(link, '_system', 'location=yes'); return false;

  }  
}



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



    app.controller('configuracionCtrl', [
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
    '$timeout',
    '$window',
    '$ionicPopup',
    '$ionicModal',
    '$ionicLoading',
    '$state',
    'eventService',
    'api',
    'serverConfig',
    function ($scope, $stateParams, $timeout, $window, $ionicPopup, $ionicModal, $ionicLoading,$state, eventService, api, serverConfig) {

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


 $scope.openLink = function(link){
    $window.open('http://solomascotas.cl/registro/terminos.pdf', '_system');
 }

 

    $scope.olvide = function(){

                      var mensaje = 'Correo Electronico'
                   var customTemplate =
          '<div style="text-align:center;"><img style="margin-top:10px" src="img/email.png"> <p style="    font-size: 18px;color:white; margin-top:25px">'+mensaje+'</p> <input type="text" ng-model="olvideEmail" autocapitalize="off" > <button ng-click="recuperar(olvideEmail)" class="btnRecuperar button" style="    width: 100%;background-color: #999;margin-top: 20px;height: 40px;color: white;border: none;border-radius: 2px;">Recuperar</button></div>';

        $scope.pop = $ionicPopup.show({
          template: customTemplate,
          title: '',
          subTitle: '',
          scope: $scope,
          buttons: [{
            text: 'Cerrar',
            type: 'button-blueCustoms',
            onTap: function(e) {

             // if(borrar){ $scope.user.pin='';}
             
            }
          }]
        });
    }

    $scope.recuperar = function(email){

      if(email==undefined || email=='undefined'  || email==null || email==' ' || email=='' ){

return false;
      }
$ionicLoading.show();
  console.log(email);

  var cadena = email.toLowerCase();

          api.recuperarContra(cadena).then(function(data) {

            $ionicLoading.hide();

            if(data.recuperacionOK){
              //console.log(data);
              //window.localStorage.setItem( 'userInfoTS', JSON.stringify(data));

              $scope.pop.close();

                $timeout( function(){
                mensajeAlerta(2,'Se ha enviado la contraseña a tu correo, verifica en breve.');
                 }, 500 );



              //mensajeAlerta(2,'Se ha enviado la contraseña a tu correo, verifica en breve.');

            }
            else{

              $scope.pop.close();

              $timeout( function(){
               mensajeAlerta(1,'Email invalido');
                 }, 500 );

             // mensajeAlerta(1,'Email invalido');
            }
       

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
 $scope.lugaresLista = 0;
 $scope.fotoV = true;
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


  $scope.busquedaAnuncio = function(filtro){



if(filtro == 'undefined' || 
       filtro == 'null' || 
       filtro == undefined || 
       filtro == ' ' || 
       filtro == 0){

      return false;

    }


    if(filtro.palabra == 'undefined' || 
       filtro.palabra == 'null' || 
       filtro.palabra == undefined || 
       filtro.palabra == ' ' || 
       filtro.palabra == ''){

      filtro.palabra = 420;

    }

        if(filtro.tipoAnuncio == 'undefined' || 
       filtro.tipoAnuncio == 'null' || 
       filtro.tipoAnuncio == undefined || 
       filtro.tipoAnuncio == ' ' || 
       filtro.tipoAnuncio == ''){

      filtro.tipoAnuncio = 420;
    
    }


        if(filtro.distancia == 'undefined' || 
       filtro.distancia == 'null' || 
       filtro.distancia == undefined || 
       filtro.distancia == ' ' || 
       filtro.distancia == ''){

      filtro.distancia = 420;
    
    }


        if(filtro.fecha == 'undefined' || 
       filtro.fecha == 'null' || 
       filtro.fecha == undefined || 
       filtro.fecha == ' ' || 
       filtro.fecha == ''){

      filtro.fecha = 420;
    
    }


        if(filtro.tipoMascota == 'undefined' || 
       filtro.tipoMascota == 'null' || 
       filtro.tipoMascota == undefined || 
       filtro.tipoMascota == ' ' || 
       filtro.tipoMascota == ''){

      filtro.tipoMascota = 420;
    
    }


    filtro.lat=$scope.latitudePerson;
    filtro.lon=$scope.longitudePerson;

    $scope.closeModal();
    $ionicLoading.show();

         api.busquedaAnuncio(filtro).then(function (events) {

          //$scope.events = events;
          //$scope.events = events.data.evento;
          console.log(events);
          $scope.chats = events.data.publicaciones;
           //$ionicLoading.hide();
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

          
            $scope.loading = false;
              $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
          

        });




 console.log(filtro);

 }

 $scope.openLink = function(link){
    $window.open('http://solomascotas.cl/registro/terminos.pdf', '_system');
 }


 $scope.buscarAnuncio = function () {

 if($scope.gpsActivo){
      $scope.openModal("buscarAnuncio.html", "slide-in-up");
      return false;
    }

$ionicLoading.show();

  

    navigator.geolocation.getCurrentPosition(function(pos) {
         console.log(pos.coords.latitude+' Long: '+ pos.coords.longitude);
    

              $scope.latitudePerson = pos.coords.latitude;
              $scope.longitudePerson = pos.coords.longitude;

              $scope.gpsActivo = true;
              $ionicLoading.hide();

              $scope.openModal("buscarAnuncio.html", "slide-in-up");

        }, function(error) {

          $scope.latitudePerson = 0;
              $scope.longitudePerson = 0;

           $scope.gpsActivo = false;
           $ionicLoading.hide();
           $scope.openModal("buscarAnuncio.html", "slide-in-up");
   //mensajeAlerta(1,'Debes activar el GPS para ubicar la zona');
        });





}




$scope.getPublis = function(){

     api.getPublicaciones().then(function (events) {

          //$scope.events = events;
          //$scope.events = events.data.evento;
          console.log(events);
          $scope.chats = events.data.publicaciones;
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

          
            $scope.loading = false;
            $scope.$broadcast('scroll.refreshComplete');
          

        });

}

$scope.getPublis();

$scope.$on('$ionicView.enter', function(event, viewData) {


$scope.usuarioInfo={};
  var userData = JSON.parse(window.localStorage.getItem('userInfoSM'));

  $scope.usuarioInfo.id =  userData.id;


});


$scope.agregarAnuncio = function () {


//if( $scope.lugaresLista == 0){
if( false){

 $ionicLoading.show();
               //$state.reload();
               api.getLugares().then(function (events) {

              if(events.data.error == false){

                  console.log('lugaresload');
                  $scope.lugaresLista=events.data.lugares;
                  $scope.openModal("nuevoAnuncio.html", "slide-in-up");


              }
              else{

              mensajeAlerta(1, 'Ha ocurrido un error, verifique su conexion a internet');

              }
              }).finally(function () {

              $ionicLoading.hide();
               });


}

else{
   $scope.openModal("nuevoAnuncio.html", "slide-in-up");
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




$scope.registrarAnuncio = function (anuncio) {
      
      console.log(anuncio);  

        if($scope.fotoNombre == 0){

           mensajeAlerta(1, 'Debes agregar una foto');
           return false;

        }

        if(anuncio.video == '' || anuncio.video == ' ' || anuncio.video ==  undefined || anuncio.video == null){

          anuncio.video = '';
          

        }






          $ionicLoading.show();
        console.log(anuncio);




  navigator.geolocation.getCurrentPosition(function(pos) {
         console.log(pos.coords.latitude+' Long: '+ pos.coords.longitude);
    

               var latitudePerson = pos.coords.latitude;
                var longitudePerson = pos.coords.longitude;
                //var dataLL = {lat:latitudePerson,lon:longitudePerson}
                 // console.log(dataLL);
                 
                  
         anuncio.foto= $scope.fotoNombre;
        anuncio.idUsuario= $scope.usuarioInfo.id;
        anuncio.lat = latitudePerson;
        anuncio.lon = longitudePerson;

          var ft = new FileTransfer();
           ft.upload($scope.foto.imagenAnuncio, serverConfig.imageStorageURL+"/dist/anuncio/upload.php", function(result){

           console.log(JSON.stringify(result));
           // $ionicLoading.hide();

            console.log('Foto cambiada correctamente');
            //$state.reload();
               api.registrarAnuncio(anuncio).then(function (events) {

              if(events.data.error == false){



                 mensajeAlerta(2, 'Anuncio agregado correctamente');
                 $scope.foto={};
                  $scope.fotoNombre = 0;


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
           mensajeAlerta(1, 'Ha ocurrido un error. No se ha podido agregar el anuncio');

           }, $scope.optionsSc);





        }, function(error) {
           $ionicLoading.hide();

         mensajeAlerta(1,'Debes activar el GPS para ubicar la zona');
        });



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

$scope.fotoV = true;

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

$scope.optionsSc = options;
 


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


/*        eventService.getOne($stateParams.id).then(function (event) {
          $scope.event = event;
        }).finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
        });*/
        $scope.getPublis();


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

    $scope.foto={};
    $scope.fotoNombre = 0;


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








    app.controller('misPublicacionesCtrl', [
    '$scope',
    '$stateParams',
    '$window',
        '$state',
    '$ionicPopup',
    '$ionicLoading',
    '$ionicModal',
    'eventService',
    'api',
    'serverConfig',
    function ($scope, $stateParams, $window, $state, $ionicPopup, $ionicLoading, $ionicModal, eventService, api, serverConfig) {

      $scope.loading = true;



$scope.foto={};
$scope.fotoNombre = 0;
 $scope.lugaresLista = 0;
 $scope.fotoV = true;
  /*    eventService.getOne($stateParams.id).then(function (event) {
        $scope.event = event;
      }).finally(function () {
        $scope.loading = false;
      });

*/
  $scope.urlImg = serverConfig.imageStorageURL;




$scope.usuarioInfo={};
  var userData = JSON.parse(window.localStorage.getItem('userInfoSM'));
console.log(userData);
  $scope.usuarioInfo.id =  userData.id;





        $scope.grid_view = function() {
    if($scope.layout == 'grid'){
      $scope.layout = "list";
    } else {
      $scope.layout = "grid";
    }
  };

        $scope.cerrardAnuncio = function(id) {
   
   console.log(id);
   return false;
  };


$scope.cerrarAnuncio = function(idEvento){

console.log(idEvento);

       var customTemplate2 ='<div style="color:white !important" >Vas a cerrar tu publicacion <br><br>  <strong>Deseas continuar?</strong></div> ';

            $ionicPopup.show({
              template: customTemplate2,
              title: '',
              subTitle: '',
              scope: $scope,
              buttons: [
                { text: 'No',  type: 'button-positive ',onTap: function(e) { return false; } },
                {
                  text: '<b>Si</b>',
                 
                  onTap: function(e) {
                    return  true;
                  }
                },
              ]
              }).then(function(res) {
                console.log('Tapped!', res);
                if(res){
     $ionicLoading.show();

     api.cerrarPublicacion(idEvento).then(function (events) {
          console.log(events);          
            if(events.data == null || events.data == 'null' || events.data == undefined){
              return false;
             }
            if(events.data.error == false){
               
                  mensajeAlerta(2, 'Publicacion cerrada');

                $scope.getPublis();

              }
              else{
              mensajeAlerta(1, 'Ha ocurrido un error, verifique su conexion');
              }

        }).finally(function () {
            $ionicLoading.hide();
        });

                }



              }, function(err) {
                console.log('Err:', err);
              }, function(msg) {
                console.log('message:', msg);
              });

}

        $scope.goDetalle = function(id) {
$state.go('detailPublicacion', { id: id});

  };


 $scope.openLink = function(link){
    $window.open('http://solomascotas.cl/registro/terminos.pdf', '_system');
 }



// 

//$scope.loading = false;
          
//$scope.chats=[{},{}];
//

$scope.getPublis = function(){

     api.getPublicacionesUser($scope.usuarioInfo.id).then(function (events) {

          //$scope.events = events;
          //$scope.events = events.data.evento;
          console.log(events);
          
          if(events.data == null || events.data == 'null' || events.data == undefined){
return false;
          }


           if(events.data.error == false){



                 $scope.chats = events.data.publicaciones;


              }
              else{

                 $scope.chats = [];

              //mensajeAlerta(1, 'Ha ocurrido un error, verifique su conexion');

              }



         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

          
            $scope.loading = false;
            $scope.$broadcast('scroll.refreshComplete');
          

        });

}





$scope.getPublis();





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
      
      console.log(anuncio);  

        if($scope.fotoNombre == 0){

           mensajeAlerta(1, 'Debes agregar una foto');
           return false;

        }

        if(anuncio.video == '' || anuncio.video == ' ' || anuncio.video ==  undefined || anuncio.video == null){

          anuncio.video = '';
          

        }






          $ionicLoading.show();
        console.log(anuncio);




  navigator.geolocation.getCurrentPosition(function(pos) {
         console.log(pos.coords.latitude+' Long: '+ pos.coords.longitude);
    

               var latitudePerson = pos.coords.latitude;
                var longitudePerson = pos.coords.longitude;
                //var dataLL = {lat:latitudePerson,lon:longitudePerson}
                 // console.log(dataLL);
                 
                  
         anuncio.foto= $scope.fotoNombre;
        anuncio.idUsuario= $scope.usuarioInfo.id;
        anuncio.lat = latitudePerson;
        anuncio.lon = longitudePerson;

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
           mensajeAlerta(1, 'Ha ocurrido un error. No se ha podido agregar el anuncio');

           }, $scope.optionsSc);





        }, function(error) {
           $ionicLoading.hide();

         mensajeAlerta(1,'Debes activar el GPS para ubicar la zona');
        })



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
$scope.fotoV = true;
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

$scope.optionsSc = options;
 


$ionicLoading.hide(); //bb24


 }
 

 }





      $scope.reload = function () {


/*        eventService.getOne($stateParams.id).then(function (event) {
          $scope.event = event;
        }).finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
        });*/
        $scope.getPublis();


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







