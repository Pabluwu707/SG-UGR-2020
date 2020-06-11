
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */


class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();

    this.background = new THREE.Color( 0x050505 );

    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);

    // Se añade a la gui los controles para manipular los elementos de esta clase
    this.gui = this.createGUI ();

    // Construimos los distinos elementos que tendremos en la escena

    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();

    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera ();

    this.iniciarMenu();

    // Por último creamos el modelo.
    // El modelo puede incluir su parte de la interfaz gráfica de usuario. Le pasamos la referencia a
    // la gui y el texto bajo el que se agruparán los controles de la interfaz que añada el modelo.
  }

  iniciarNivel(dificultad){
    this.gameState = MyScene.Nivel;
    switch(dificultad){
      case(1):
         var longitudNivel = 7;
         var obstaculosAGenerar = 18;
      break;
      case(2):
         var longitudNivel = 14;
         var obstaculosAGenerar = 36;
      break;
      case(3):
         var longitudNivel = 28;
         var obstaculosAGenerar = 76
      break;
    }
    // Un suelo
    this.nodoDesplazado = new THREE.Object3D();
    this.listaMeta = [];

    //var num_obstaculos = Math.floor(Math.random() * 10);


    // Inicialización del raycaster usado para detectar colisiones frontales
    this.raycasterFrontal = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, 0, 1 ), 0, 3 );

    // Inicialización del raycaster usado para detectar colisiones frontales
    this.raycasterVictoria = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, -1, 0 ), 0, 100 );
    var menu = document.getElementById("menu");
    menu.style.display = "none";
    var vidas = document.getElementById("vidas");
    vidas.style.display = "block";
    this.remove(this.cabeza);
    this.generateObstaculos(obstaculosAGenerar);
    this.createGround (longitudNivel);
    this.generateJugador();
    this.generateMontania(longitudNivel);
    this.createBackGround ();
    console.log("iniciado");
    this.tiempoInicioNivel = Date.now();
  }

  iniciarMenu(){
    this.gameState = MyScene.Menu;
    MyScene.nivelActual = 0;
    this.cabeza = new MyObstaculo();
    this.cabeza.position.y = 50;
    this.add(this.cabeza);
    var menu = document.getElementById("menu");
    menu.style.display = "block";

  }

  iniciarTutorial(){
    this.gameState = MyScene.Tutorial;

  }

  resetearJuego(){
    this.remove(this.motoJugador);
    this.remove(this.nodoDesplazado);
    this.remove(this.backGround);
    var vidas = document.getElementById("vidas");
    vidas.style.display = "none";
    var v1 = document.getElementById("hp1");
    v1.style.display = "block";
    var v2 = document.getElementById("hp2");
    v2.style.display = "block";
    var v3 = document.getElementById("hp3");
    v3.style.display = "block";
    this.iniciarMenu();

  }

  generateMontania(longitudNivel){

    // Objeto montania
    this.montaniaFondo = new MyMontania();
    this.montaniaFondo.position.z = longitudNivel*300 + 400;
    this.nodoDesplazado.add (this.montaniaFondo);

  }

  generateJugador(){

    this.motoJugador = new MyJugador();
    this.motoJugador.position.y = 3.8;
    this.motoJugador.position.z = -220;

    this.add (this.motoJugador);

    this.velocidadMoto = 2.5;
    this.escalaMoto = 1;
  }

  generateObstaculos(numObstaculos) {

    // Incluimos en un array los objetos visualizados por el raycaster
    this.listaObstaculos = [];
    this.listaPowerUps = [];
    this.powerup = new MyPowerUp();
    this.powerup.position.z = 500;
    this.nodoDesplazado.add (this.powerup);
    this.listaPowerUps.push(this.powerup);

    for(var i = 0; i < numObstaculos;i++){
      // Número aleatorio
      var numeroAleatorio = Math.floor(Math.random() * 10 + 1);

      if (numeroAleatorio < 9) { //Generar un único obstáculo
         // Crear nuevo obstáculo
         this.obstaculo = new MyObstaculo();

         // Determinar posición Z
         var position = Math.floor(Math.random() * (200 - 100)) + 100*i + 500;
         this.obstaculo.position.z = position;

         // Determinar posicion X
         var numeroCarril = Math.floor(Math.random() * 4 + 1);
         console.log("Se ha generado un obstaculo en el carril " + numeroCarril);
         switch (numeroCarril) {
            case 1 :
             this.obstaculo.position.x = 33;
             break;
            case 2 :
             this.obstaculo.position.x = 11;
             break;
            case 3 :
             this.obstaculo.position.x = -11;
             break;
            case 4 :
             this.obstaculo.position.x = -33;
             break;
         }

         // Determinar posición Y
         this.obstaculo.position.y = 3;

         // Añadir obstáculo
         this.nodoDesplazado.add (this.obstaculo);
         this.listaObstaculos.push(this.obstaculo);
      } else { // Generar obstáculo doble (dos obstáculos en la misma altura)
         // Crear obstáculo doble
         console.log("Se va a generar un obstaculo doble");
         this.obstaculo1 = new MyObstaculo();
         this.obstaculo2 = new MyObstaculo();

         // Determinar posición Z
         var position = Math.floor(Math.random() * (200 - 100)) + 100*i;
         this.obstaculo1.position.z = position;
         this.obstaculo2.position.z = position;

         // Determinar posicion X
         var numeroCarril = Math.floor(Math.random() * 6 + 1);
         console.log("Se ha generado un obstaculo en el carril " + numeroCarril);
         switch (numeroCarril) {
            case 1 :
             this.obstaculo1.position.x = 33;
             this.obstaculo2.position.x = 11;
             break;
            case 2 :
             this.obstaculo1.position.x = 11;
             this.obstaculo2.position.x = -11;
             break;
            case 3 :
             this.obstaculo1.position.x = -11;
             this.obstaculo2.position.x = -33;
             break;
            case 4 :
             this.obstaculo1.position.x = 33;
             this.obstaculo2.position.x = -33;
             break;
            case 5 :
             this.obstaculo1.position.x = 33;
             this.obstaculo2.position.x = -11;
             break;
            case 6 :
             this.obstaculo1.position.x = 11;
             this.obstaculo2.position.x = -33;
             break;
         }

         // Determinar posición Y
         this.obstaculo1.position.y = 3;
         this.obstaculo2.position.y = 3;

         // Añadir obstáculo
         this.nodoDesplazado.add (this.obstaculo1);
         this.listaObstaculos.push(this.obstaculo1);
         this.nodoDesplazado.add (this.obstaculo2);
         this.listaObstaculos.push(this.obstaculo2);
      }
    }
  }

  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    this.camera.position.set (0, 40, -310);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,-0);
    this.camera.lookAt(look);
    this.add (this.camera);

    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new THREE.TrackballControls (this.camera, this.renderer.domElement);
    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target = look;

  }

  createGround (longitud) {
    // El suelo es un Mesh, necesita una geometría y un material.

    // La geometría es una motoJugador con muy poca altura
    var geometryGround = new THREE.BoxGeometry (500,1,300);
    var geometryMeta = new THREE.BoxGeometry (200,1,200);

    // El material se hará con una textura de madera
    var texture = new THREE.TextureLoader().load('./carretera.png');
    var textureMeta = new THREE.TextureLoader().load('./carretera.png');

    var materialGround = new THREE.MeshPhongMaterial ({map: texture});
    var materialMeta= new THREE.MeshPhongMaterial ({map: textureMeta});

    // Ya se puede construir el Mesh
    var ground = new THREE.Mesh (geometryGround, materialGround);
    var meta = new THREE.Mesh (geometryMeta, materialMeta);

    // Todas las figuras se crean centradas en el origen.
    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    ground.position.y = -0.1;
    ground.position.z = -300;
    meta.rotation.y += Math.PI/2;
    meta.position.y = -0.1;
    meta.position.z = 300*longitud-20;


    // Que no se nos olvide añadirlo a la escena, que en este caso es  this

    this.nodoDesplazado.add (ground);
    this.nodoDesplazado.add (meta);
    this.listaMeta.push(meta);

    for(var i = 0; i < longitud; i++){
      var ground = new THREE.Mesh (geometryGround, materialGround);

      // Todas las figuras se crean centradas en el origen.
      // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
      ground.position.y = -0.1;
      ground.position.z = 300*i;


      // Que no se nos olvide añadirlo a la escena, que en este caso es  this
      this.nodoDesplazado.add (ground);
    }
    // Ya se puede construir el Mesh
    var ground = new THREE.Mesh (geometryGround, materialGround);

    // Todas las figuras se crean centradas en el origen.
    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    ground.position.y = -0.1;


    // Que no se nos olvide añadirlo a la escena, que en este caso es  this

    this.nodoDesplazado.add (ground);
    this.add(this.nodoDesplazado);

  }

  createBackGround () {
    // El suelo es un Mesh, necesita una geometría y un material.

    // La geometría es una motoJugador con muy poca altura
    var geometryBackGround = new THREE.BoxGeometry (1412,450,1);

    // El material se hará con una textura de madera
    var texture = new THREE.TextureLoader().load('./fondo.jpg');
    var materialBackGround = new THREE.MeshPhongMaterial ({map: texture});

    // Ya se puede construir el Mesh
    this.backGround = new THREE.Mesh (geometryBackGround, materialBackGround);

    // Todas las figuras se crean centradas en el origen.
    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    this.backGround.position.z = 400;
    this.backGround.position.y = 140;

    // Que no se nos olvide añadirlo a la escena, que en este caso es  this
    this.add (this.backGround);
  }

  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new dat.GUI();

    // La escena le va a añadir sus propios controles.
    // Se definen mediante una   new function()
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = new function() {
      // En el contexto de una función   this   alude a la función
      this.lightIntensity = 0;
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');

    // Se le añade un control para la intensidad de la luz
    folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');


    return gui;
  }

  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    // La añadimos a la escena
    this.add (ambientLight);

    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity );
    this.spotLight.position.set( 60, 60, 40 );
    this.add (this.spotLight);
  }

  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.

    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();

    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);

    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);

    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);

    return renderer;
  }

  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }

  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }

  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);

    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  onKeyDown (event) {
    var key = event.which || event.keyCode;
    switch (key) {
      case 37 : // Cursor a la izquierda
        this.motoJugador.left = true;
        break;
      case 39 : // Cursor a la derecha
        this.motoJugador.right = true;
        break;
    }
  }

  onKeyUp (event) {
    var key = event.which || event.keyCode;
    switch (key) {
      case 37 : // Cursor a la izquierda
        this.motoJugador.left = false;
        break;
      case 39 : // Cursor a la derecha
        this.motoJugador.right = false;
        break;
      case 32 : // Espacio
        if(this.gameState == MyScene.Derrota){
          var derrota = document.getElementById("derrota");
          derrota.style.display = "none";
          this.resetearJuego();
        }
        if(this.gameState == MyScene.Victoria){
          var victoria = document.getElementById("victoria");
          victoria.style.display = "none";
          this.resetearJuego();
        }
        break;
    }
  }

  update () {
    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.

    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())

    // Se actualizan los elementos de la escena para cada frame
    // Se actualiza la intensidad de la luz con lo que haya indicado el usuario en la gui
    this.spotLight.intensity = this.guiControls.lightIntensity;


    // Se actualiza la posición de la cámara según su controlador
    this.cameraControl.update();

    //this.camera.position.z += 0.5;

    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());



    switch (this.gameState) {
      case(MyScene.Menu):
      //this.cabeza.rotation.z += 0.01;
      //this.cabeza.rotation.x += 0.01;
      this.cabeza.rotation.y += 0.01;
      switch(MyScene.nivelActual){
        case(-1):
          this.iniciarTutorial();
          break;
        case(1):
          this.iniciarNivel(1);
          break;
        case(2):
          this.iniciarNivel(2);
          break;
        case(3):
          this.iniciarNivel(3);
          break;
      }
      break;

      case(MyScene.Nivel):
         // Se actualiza el resto del modelo
         //this.octree.update();
         this.motoJugador.update();
         //this.obstaculo.update();

         // Ajustamos el raycaster a la posición actual del jugador para detectar colisiones
         this.raycasterFrontal.ray.origin.copy(this.motoJugador.position);
         var intersecciones = this.raycasterFrontal.intersectObjects( this.listaObstaculos, true );
         var interseccionPowerUp = this.raycasterFrontal.intersectObjects( this.listaPowerUps, true );

         // Tambien ajustamos el raycaster para detectar la meta
         this.raycasterVictoria.ray.origin.copy(this.motoJugador.position);
         var interseccionMeta = this.raycasterVictoria.intersectObjects( this.listaMeta, true );

         if (!this.motoJugador.invulnerable) {
           if (intersecciones.length > 0) {
             var vida1 = document.getElementById("hp1");
             var vida2 = document.getElementById("hp2");
             var vida3 = document.getElementById("hp3");

             this.comienzoInvulnerable = Date.now();
             this.motoJugador.hacerMotoInvisible();
             this.motoJugador.invulnerable = true;

             if(vida1.style.display != "none"){
               vida1.style.display = "none";
             }
             else if(vida2.style.display != "none"){
               vida2.style.display = "none";
             }
             else if(vida3.style.display != "none"){
               vida3.style.display = "none";
               var derrota = document.getElementById("derrota");
               derrota.style.display = "block";
               this.gameState = MyScene.Derrota;
             }
           }
         }
         else if (this.motoJugador.invulnerable) {
            //console.log((Date.now()-this.comienzoInvulnerable)/1000);
            if((Date.now()-this.comienzoInvulnerable)/1000 >= 3){
              this.motoJugador.invulnerable = false;
              this.motoJugador.hacerMotoVisible();
            }
         }

         if (interseccionPowerUp.length > 0) {
           var vida1 = document.getElementById("hp1");
           var vida2 = document.getElementById("hp2");
           var vida3 = document.getElementById("hp3");
           if(vida1.style.display == "none"){
             vida1.style.display = "block";
           }
           else if(vida2.style.display == "none"){
             vida2.style.display = "block";
           }
           else if(vida3.style.display == "none"){
             vida3.style.display = "block";
           }
         }

         if (interseccionMeta.length > 0) {
            console.log("META");
            var vida1 = document.getElementById("victoria");
            victoria.style.display = "block";
            this.gameState = MyScene.Victoria;
            this.tiempoFinNivel = Date.now();
         }


         switch (MyScene.nivelActual) {
           case 1:
            this.nodoDesplazado.position.z -= 2.5;
           break;
           case 2:
            this.nodoDesplazado.position.z -= 5;
           break;
           case 3:
            this.nodoDesplazado.position.z -= 7;
           break;
         default:

         }
      break;

      case(MyScene.Victoria):
         this.motoJugador.update();
         this.obstaculo.update();
         if (this.velocidadMoto < 5) {
            this.velocidadMoto += 0.25;
         }
         if (this.escalaMoto > 0.3) {
            this.escalaMoto = this.escalaMoto * 0.995;
            //console.log(this.escalaMoto)
         }
         this.motoJugador.position.z += this.velocidadMoto;
         this.motoJugador.scale.set(this.escalaMoto,this.escalaMoto,this.escalaMoto);
      break;

      case(MyScene.Derrota):

      break;

      case(MyScene.Tutorial):

      break;

    }
  }
}

// Enum pero de pega porque Javascript no me deja
MyScene.Menu = 0;
MyScene.Nivel = 1;
MyScene.Victoria = 2;
MyScene.Derrota = 3;
MyScene.Tutorial = 4;

MyScene.nivelActual = 0;

function setNivel(nivel){
 MyScene.nivelActual = nivel;
}


/// La función   main
$(function () {

  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());
  window.addEventListener ("keydown", () => scene.onKeyDown(event));
  window.addEventListener ("keyup",   () => scene.onKeyUp(event));

  // Que no se nos olvide, la primera visualización.
  scene.update();
});
