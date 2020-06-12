
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();

    // Hacemos que el fondo sea negro
    this.background = new THREE.Color( 0x050505 );

    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);

    // Creamos las luces
    this.createLights ();

    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera ();

    // Iniciamos el menú
    this.iniciarMenu();

    // Composer para efectos postprocessing

    this.composer = new THREE.EffectComposer(this.renderer);

    var renderPass = new THREE.RenderPass(this, this.camera)
    this.composer.addPass(renderPass);

    // Shader de efecto pixelado
    var pixelPass = new THREE.ShaderPass( THREE.PixelShader );
	  pixelPass.uniforms[ "resolution" ].value = new THREE.Vector2( window.innerWidth, window.innerHeight );
	  pixelPass.uniforms[ "resolution" ].value.multiplyScalar( window.devicePixelRatio );
    pixelPass.uniforms[ "pixelSize" ].value = 3;
    this.composer.addPass(pixelPass);
    pixelPass.renderToScreen = true;

  }

  iniciarNivel(dificultad){

    // Comenzamos limpiando todo el menu
    this.limpiarMenu();

    // Cargamos la música
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load( '../music/digital-drive-va-11-hall-a.mp3', ( buffer ) => {
      this.sound.setBuffer( buffer );
      this.sound.stop();
    });

    // Pasamos el estado a nivel
    this.gameState = MyScene.Nivel;

    // Generaremos los elementos de la escena dependiendo de la dificultad
    switch(dificultad){
      case(1):
         var longitudNivel = 7;
         var obstaculosAGenerar = 13;
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

    // Creamos un nodo que contendrá todos los elementos del suelo para poder moverlos todos a la vez
    this.nodoDesplazado = new THREE.Object3D();
    this.listaMeta = [];

    // Inicialización del raycaster usado para detectar colisiones frontales
    this.raycasterFrontal = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, 0, 1 ), 0, 10 );

    // Inicialización del raycaster usado para detectar colisiones frontales
    this.raycasterVictoria = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, -1, 0 ), 0, 100 );

    // Generamos los elementos de la escena
    this.generateObstaculos(obstaculosAGenerar);
    this.createGround (longitudNivel);
    this.generateJugador();
    this.generateMontania(longitudNivel);
    this.createBackGround ();
  }

  iniciarMenu(){

    //Generamos los elementos del menú
    this.nodoDesplazado = new THREE.Object3D();
    this.listaMeta = [];
    this.createGround (2);
    this.createBackGround ();

    // Cargamos la música
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load( '../music/80s-remix-backstreet-boys-i-want-it-that-way.mp3', ( buffer ) => {
      this.sound.setBuffer( buffer );
      this.sound.setLoop( true );
      this.sound.setVolume( 0.5 );
      this.sound.play();
    });

    //Cambiamos el estado a menú
    this.gameState = MyScene.Menu;

    // El menú cuenta como nivel 0
    MyScene.nivelActual = 0;

    var menu = document.getElementById("menu");
    menu.style.display = "block";
  }

  iniciarTutorial(){

    // Limpiamos el contenido del menú
    this.limpiarMenu();

    // Cargamos la música
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load( '../music/digital-drive-va-11-hall-a.mp3', ( buffer ) => {
      this.sound.setBuffer( buffer );
      this.sound.stop();
    });

    // El estado pasa a ser tutorial
    this.gameState = MyScene.Tutorial;

    this.nodoDesplazado = new THREE.Object3D();
    this.listaMeta = [];

    // Inicialización de los raycasters usados para detectar colisiones frontales
    this.raycasterFrontal = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, 0, 1 ), 0, 3 );
    this.raycasterVictoria = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, -1, 0 ), 0, 100 );

    this.listaObstaculos = [];
    this.listaPowerUps = [];

    // GENERAR LOS OBSTACULOS NO ALEATORIZADOS (Perdon por el tochaco de codigo)
    // PASO 1
    this.obstaculo = new MyObstaculo();
    this.obstaculo.position.x = 11;
    this.obstaculo.position.y = 3;
    this.obstaculo.position.z = 500;
    this.nodoDesplazado.add (this.obstaculo);
    this.listaObstaculos.push(this.obstaculo);

    this.obstaculo = new MyObstaculo();
    this.obstaculo.position.x = -33;
    this.obstaculo.position.y = 3;
    this.obstaculo.position.z = 650;
    this.nodoDesplazado.add (this.obstaculo);
    this.listaObstaculos.push(this.obstaculo);

    this.obstaculo = new MyObstaculo();
    this.obstaculo.position.x = -10;
    this.obstaculo.position.y = 3;
    this.obstaculo.position.z = 725;
    this.nodoDesplazado.add (this.obstaculo);
    this.listaObstaculos.push(this.obstaculo);

    this.obstaculo = new MyObstaculo();
    this.obstaculo.position.x = 33;
    this.obstaculo.position.y = 3;
    this.obstaculo.position.z = 900;
    this.nodoDesplazado.add (this.obstaculo);
    this.listaObstaculos.push(this.obstaculo);

    this.obstaculo = new MyObstaculo();
    this.obstaculo.position.x = -11;
    this.obstaculo.position.y = 3;
    this.obstaculo.position.z = 975;
    this.nodoDesplazado.add (this.obstaculo);
    this.listaObstaculos.push(this.obstaculo);

    // Paso 2
    this.obstaculo = new MyObstaculo();
    this.obstaculo.position.x = -11;
    this.obstaculo.position.y = 3;
    this.obstaculo.position.z = 1800;
    this.nodoDesplazado.add (this.obstaculo);
    this.listaObstaculos.push(this.obstaculo);
    this.obstaculo = new MyObstaculo();
    this.obstaculo.position.x = -33;
    this.obstaculo.position.y = 3;
    this.obstaculo.position.z = 1800;
    this.nodoDesplazado.add (this.obstaculo);
    this.listaObstaculos.push(this.obstaculo);


    this.obstaculo = new MyObstaculo();
    this.obstaculo.position.x = 10;
    this.obstaculo.position.y = 3;
    this.obstaculo.position.z = 1950;
    this.nodoDesplazado.add (this.obstaculo);
    this.listaObstaculos.push(this.obstaculo);
    this.obstaculo = new MyObstaculo();
    this.obstaculo.position.x = 33;
    this.obstaculo.position.y = 3;
    this.obstaculo.position.z = 1950;
    this.nodoDesplazado.add (this.obstaculo);
    this.listaObstaculos.push(this.obstaculo);

    this.obstaculo = new MyObstaculo();
    this.obstaculo.position.x = 10;
    this.obstaculo.position.y = 3;
    this.obstaculo.position.z = 2150;
    this.nodoDesplazado.add (this.obstaculo);
    this.listaObstaculos.push(this.obstaculo);
    this.obstaculo = new MyObstaculo();
    this.obstaculo.position.x = -11;
    this.obstaculo.position.y = 3;
    this.obstaculo.position.z = 2150;
    this.nodoDesplazado.add (this.obstaculo);
    this.listaObstaculos.push(this.obstaculo);

    this.obstaculo = new MyObstaculo();
    this.obstaculo.position.x = 33;
    this.obstaculo.position.y = 3;
    this.obstaculo.position.z = 2250;
    this.nodoDesplazado.add (this.obstaculo);
    this.listaObstaculos.push(this.obstaculo);
    this.obstaculo = new MyObstaculo();
    this.obstaculo.position.x = -33;
    this.obstaculo.position.y = 3;
    this.obstaculo.position.z = 2250;
    this.nodoDesplazado.add (this.obstaculo);
    this.listaObstaculos.push(this.obstaculo);

    // PASO 3
    this.obstaculo = new MyPowerUp();
    this.obstaculo.position.x = 33;
    this.obstaculo.position.y = 3;
    this.obstaculo.position.z = 3050;
    this.nodoDesplazado.add (this.obstaculo);
    this.listaPowerUps.push(this.obstaculo);
    this.obstaculo = new MyObstaculo();
    this.obstaculo.position.x = -10;
    this.obstaculo.position.y = 3;
    this.obstaculo.position.z = 3050;
    this.nodoDesplazado.add (this.obstaculo);
    this.listaObstaculos.push(this.obstaculo);
    this.obstaculo = new MyObstaculo();
    this.obstaculo.position.x = 11;
    this.obstaculo.position.y = 3;
    this.obstaculo.position.z = 3050;
    this.nodoDesplazado.add (this.obstaculo);
    this.listaObstaculos.push(this.obstaculo);
    this.obstaculo = new MyObstaculo();
    this.obstaculo.position.x = -33;
    this.obstaculo.position.y = 3;
    this.obstaculo.position.z = 3050;
    this.nodoDesplazado.add (this.obstaculo);
    this.listaObstaculos.push(this.obstaculo);
    //////

    this.createGround(14);
    this.generateJugador();
    this.generateMontania(14);
    this.createBackGround ();
    this.tiempoInicioNivel = Date.now();

   this.sinErrores1 = true;
   this.sinErrores2 = true;
   this.sinErrores3 = true;


   var imagentuto = document.getElementById("imagentutorial");
   imagentuto.src = "../imgs/tutorial1.png";
   var textotuto = document.getElementById("textotutorial");
   textotuto.style.display = "block";

  }

  limpiarMenu(){

    // Eliminamos todos los elementos del menú
    var menu = document.getElementById("menu");
    menu.style.display = "none";
    var vidas = document.getElementById("vidas");
    vidas.style.display = "block";

    this.remove(this.nodoDesplazado);
  }

  resetearJuego(){

    // Eliminamos todos los elementos de la escena y los dejamos por defecto
    this.remove(this.motoJugador);
    this.remove(this.nodoDesplazado);
    var vidas = document.getElementById("vidas");
    vidas.style.display = "none";
    var v1 = document.getElementById("hp1");
    v1.style.display = "none";
    var v2 = document.getElementById("hp2");
    v2.style.display = "none";
    var v3 = document.getElementById("hp3");
    v3.style.display = "block";
    var v4 = document.getElementById("hp4");
    v4.style.display = "block";
    var v5 = document.getElementById("hp5");
    v5.style.display = "block";

    // Iniciamos el menu
    this.iniciarMenu();

    // Detenemos la musica
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load( '../music/digital-drive-va-11-hall-a.mp3', ( buffer ) => {
      this.sound.setBuffer( buffer );
      this.sound.stop();
    });

  }

  generateMontania(longitudNivel){

    // Objeto montania
    this.montaniaFondo = new MyMontania();
    this.montaniaFondo.position.z = longitudNivel*300 + 400;
    this.nodoDesplazado.add (this.montaniaFondo);

  }

  generateJugador(){

    // Creamos el jugador
    this.motoJugador = new MyJugador();
    this.motoJugador.position.x = -10;
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
    var obstaculo;
    var obstaculo1;
    var obstaculo2;

    for(var i = 0; i < numObstaculos;i++){
      // Número aleatorio
      var numeroAleatorio = Math.floor(Math.random() * 10 + 1);

      if (numeroAleatorio < 9) { //Generar un único obstáculo
         // Crear nuevo obstáculo
         var numeroPowerUp = Math.floor(Math.random() * 18 + 1);
         if(numeroPowerUp < 17){
           obstaculo = new MyObstaculo();
         }
         else{
           obstaculo = new MyPowerUp();
         }

         // Determinar posición Z
         var position = Math.floor(Math.random() * (200 - 100)) + 100*i + 500;
         obstaculo.position.z = position;

         // Determinar posicion X
         var numeroCarril = Math.floor(Math.random() * 4 + 1);
         switch (numeroCarril) {
            case 1 :
             obstaculo.position.x = 33;
             break;
            case 2 :
             obstaculo.position.x = 11;
             break;
            case 3 :
             obstaculo.position.x = -11;
             break;
            case 4 :
             obstaculo.position.x = -33;
             break;
         }

         // Determinar posición Y
         obstaculo.position.y = 3;

         // Añadir obstáculo
         this.nodoDesplazado.add (obstaculo);
         if(numeroPowerUp < 17){
           this.listaObstaculos.push(obstaculo);
         }
         else{
           this.listaPowerUps.push(obstaculo);
         }

      } else { // Generar obstáculo doble (dos obstáculos en la misma altura)
         // Crear obstáculo doble
         obstaculo1 = new MyObstaculo();
         obstaculo2 = new MyObstaculo();

         // Determinar posición Z
         var position = Math.floor(Math.random() * (200 - 100)) + 100*i;
         obstaculo1.position.z = position;
         obstaculo2.position.z = position;

         // Determinar posicion X
         var numeroCarril = Math.floor(Math.random() * 6 + 1);
         switch (numeroCarril) {
            case 1 :
             obstaculo1.position.x = 33;
             obstaculo2.position.x = 11;
             break;
            case 2 :
             obstaculo1.position.x = 11;
             obstaculo2.position.x = -11;
             break;
            case 3 :
             obstaculo1.position.x = -11;
             obstaculo2.position.x = -33;
             break;
            case 4 :
             obstaculo1.position.x = 33;
             obstaculo2.position.x = -33;
             break;
            case 5 :
             obstaculo1.position.x = 33;
             obstaculo2.position.x = -11;
             break;
            case 6 :
             obstaculo1.position.x = 11;
             obstaculo2.position.x = -33;
             break;
         }

         // Determinar posición Y
         obstaculo1.position.y = 3;
         obstaculo2.position.y = 3;

         // Añadir obstáculo
         this.nodoDesplazado.add (obstaculo1);
         this.listaObstaculos.push(obstaculo1);
         this.nodoDesplazado.add (obstaculo2);
         this.listaObstaculos.push(obstaculo2);
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
    var listener = new THREE.AudioListener();
    this.camera.add(listener);

    // Cargamos todo lo necesario para la musica
    this.sound = new THREE.Audio(listener);

    this.audioLoader = new THREE.AudioLoader();
    this.add (this.camera);
  }

  createGround (longitud) {
    // El suelo es un Mesh.

    // Creamos la geometria del suelo y la meta como rectangulos planos
    var geometryGround = new THREE.BoxGeometry (500,1,300);
    var geometryMeta = new THREE.BoxGeometry (200,1,200);

    // Cargamos las texturas
    var texture = new THREE.TextureLoader().load('../imgs/carretera.png');
    var textureMeta = new THREE.TextureLoader().load('../imgs/textura-ajedrezada.jpg');

    var materialGround = new THREE.MeshPhongMaterial ({map: texture});
    var materialMeta= new THREE.MeshPhongMaterial ({map: textureMeta});

    // Ya se puede construir el Mesh
    var ground = new THREE.Mesh (geometryGround, materialGround);
    var meta = new THREE.Mesh (geometryMeta, materialMeta);

    // Colocamos el primer segmento de carretera y la meta
    ground.position.y = -0.1;
    ground.position.z = -300;
    meta.rotation.y += Math.PI/2;
    meta.position.y = -0.1;
    meta.position.z = 300*longitud-53;


    // Que no se nos olvide añadirlo al nodoDesplazado

    this.nodoDesplazado.add (ground);
    this.nodoDesplazado.add (meta);
    this.listaMeta.push(meta);

    // Creamos el resto de segmentos de la carretera
    for(var i = 0; i < longitud; i++){
      var ground = new THREE.Mesh (geometryGround, materialGround);

      ground.position.y = -0.1;
      ground.position.z = 300*i;


      // Que no se nos olvide añadirlo a la escena, que en este caso es  this
      this.nodoDesplazado.add (ground);
    }

    this.add(this.nodoDesplazado);

  }

  createBackGround () {

    // La imagen del fondo se carga en un rectangulo plano
    var geometryBackGround = new THREE.BoxGeometry (1412,450,1);

    // Cargamos la imagen
    var texture = new THREE.TextureLoader().load('../imgs/fondo.jpg');
    var materialBackGround = new THREE.MeshPhongMaterial ({map: texture});

    // Ya se puede construir el Mesh
    this.backGround = new THREE.Mesh (geometryBackGround, materialBackGround);

    this.backGround.position.z = 400;
    this.backGround.position.y = 140;

    // Que no se nos olvide añadirlo a la escena
    this.add (this.backGround);
  }

  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.5);
    // La añadimos a la escena
    this.add (ambientLight);


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

  // Las funciones de teclado
  onKeyDown (event) {
    var key = event.which || event.keyCode;
    switch (key) {
      case 37 : // Cursor a la izquierda
        this.motoJugador.left = true;
        break;
      case 39 : // Cursor a la derecha
        this.motoJugador.right = true;
        break;
      case 82 : // Activar/desactivar modo retro
        if (!this.postprocessingActivado) {
           this.postprocessingActivado = true;
        } else {
           this.postprocessingActivado = false;
        }
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

    // Nos aseguramos de que el post procesado este activo o no
    if ( this.postprocessingActivado ) {
		this.composer.render();
	 } else {
		this.renderer.render (this, this.getCamera());
	 }

   // Dependiendo del estado actual la funcionalidad del update cambia
    switch (this.gameState) {
      case(MyScene.Menu):

      // En estado menú esperaremos que se seleccione un nivel
      switch(MyScene.nivelActual){
        case(-1):

          // Cargamos la música
          var audioLoader = new THREE.AudioLoader();
          audioLoader.load( '../music/sweden-c418-synthwave80s.mp3', ( buffer ) => {
            this.sound.setBuffer( buffer );
            this.sound.setLoop( true );
            this.sound.setVolume( 0.5 );
            this.sound.play();
          });

          // Iniciamos el tutorial
          this.iniciarTutorial();
          break;
        case(1):

          // Cargamos la música
          var audioLoader = new THREE.AudioLoader();
          audioLoader.load( '../music/windows96-dragon-ball-z-theme-synth-version.mp3', ( buffer ) => {
            this.sound.setBuffer( buffer );
            this.sound.setLoop( true );
            this.sound.setVolume( 0.5 );
            this.sound.play();
          });

          // Iniciamos el nivel
          this.iniciarNivel(1);
          break;
        case(2):

          // Cargamos la música
          var audioLoader = new THREE.AudioLoader();
          audioLoader.load( '../music/gorillaz-stylo-official-video.mp3', ( buffer ) => {
            this.sound.setBuffer( buffer );
            this.sound.setLoop( true );
            this.sound.setVolume( 0.5 );
            this.sound.play();
          });

          // Iniciamos el nivel
          this.iniciarNivel(2);
          break;
        case(3):

          // Cargamos la música
          var audioLoader = new THREE.AudioLoader();
          audioLoader.load( '../music/digital-drive-va-11-hall-a.mp3', ( buffer ) => {
            this.sound.setBuffer( buffer );
            this.sound.setLoop( true );
            this.sound.setVolume( 0.5 );
            this.sound.play();
          });

          // Iniciamos el nivel
          this.iniciarNivel(3);
          break;
      }
      break;

      case(MyScene.Nivel):

         this.motoJugador.update();

         // Ajustamos el raycaster a la posición actual del jugador para detectar colisiones
         this.raycasterFrontal.ray.origin.copy(this.motoJugador.position);
         var intersecciones = this.raycasterFrontal.intersectObjects( this.listaObstaculos, true );
         var interseccionPowerUp = this.raycasterFrontal.intersectObjects( this.listaPowerUps, true );

         // Tambien ajustamos el raycaster para detectar la meta
         this.raycasterVictoria.ray.origin.copy(this.motoJugador.position);
         var interseccionMeta = this.raycasterVictoria.intersectObjects( this.listaMeta, true );

         // Si el jugador no es invulnerable en este momento y choca contra un objeto perderá una vida
         if (!this.motoJugador.invulnerable) {
           if (intersecciones.length > 0) {
             var vida1 = document.getElementById("hp1");
             var vida2 = document.getElementById("hp2");
             var vida3 = document.getElementById("hp3");
             var vida4 = document.getElementById("hp4");
             var vida5 = document.getElementById("hp5");

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
             }
             else if(vida4.style.display != "none"){
               vida4.style.display = "none";
             }
             else if(vida5.style.display != "none"){
               vida5.style.display = "none";
               var derrota = document.getElementById("derrota");
               derrota.style.display = "block";
               this.gameState = MyScene.Derrota;
             }
           }
         }
         else if (this.motoJugador.invulnerable) {

            // Calculamos si ha pasado el tiempo de invulnerabilidad
            if((Date.now()-this.comienzoInvulnerable)/1000 >= 3){
              this.motoJugador.invulnerable = false;
              this.motoJugador.hacerMotoVisible();
            }
         }

         // Si ha pasado suficiente tiempo desde la última vida cogida, se ganará una vida si se coge uno
         if (!this.motoJugador.vidaCogida) {
           if (interseccionPowerUp.length > 0) {
             this.comienzoVida = Date.now();
             this.motoJugador.vidaCogida = true;
             var vida1 = document.getElementById("hp1");
             var vida2 = document.getElementById("hp2");
             var vida3 = document.getElementById("hp3");
             var vida4 = document.getElementById("hp4");
             var vida5 = document.getElementById("hp5");
             if(vida5.style.display == "none"){
               vida5.style.display = "block";
             }
             else if(vida4.style.display == "none"){
               vida4.style.display = "block";
             }
             else if(vida3.style.display == "none"){
               vida3.style.display = "block";
             }
             else if(vida2.style.display == "none"){
               vida2.style.display = "block";
             }
             else if(vida1.style.display == "none"){
               vida1.style.display = "block";
             }
           }
         }
         else{

           // Calculamos si ha pasado suficiente tiempo
           if((Date.now()-this.comienzoVida)/1000 >= 0.3){
             this.motoJugador.vidaCogida = false;
          }
        }

        // Al cruzar la meta cambiamos el estado y mostramos la imagen por pantalla
         if (interseccionMeta.length > 0) {
            var vida1 = document.getElementById("victoria");
            victoria.style.display = "block";
            this.gameState = MyScene.Victoria;
         }

         // Dependiendo del nivel la velocidad será mayor
         switch (MyScene.nivelActual) {
           case 1:
            this.nodoDesplazado.position.z -= 2.5;
           break;
           case 2:
            this.nodoDesplazado.position.z -= 5;
            this.motoJugador.velocidad = 1.1;
           break;
           case 3:
            this.nodoDesplazado.position.z -= 7;
            this.motoJugador.velocidad = 1.5;
           break;
         default:

         }
      break;

      // En el estado victoria se consigue el efecto de que la moto avanza hasta el infinito
      case(MyScene.Victoria):
         this.motoJugador.update();
         if (this.velocidadMoto < 5) {
            this.velocidadMoto += 0.25;
         }
         if (this.escalaMoto > 0.3) {
            this.escalaMoto = this.escalaMoto * 0.995;
         }
         this.motoJugador.position.z += this.velocidadMoto;
         this.motoJugador.scale.set(this.escalaMoto,this.escalaMoto,this.escalaMoto);
      break;

      case(MyScene.Derrota):

      break;

      case(MyScene.Tutorial):

         this.motoJugador.update();

         // Ajustamos el raycaster a la posición actual del jugador para detectar colisiones
         this.raycasterFrontal.ray.origin.copy(this.motoJugador.position);
         var intersecciones = this.raycasterFrontal.intersectObjects( this.listaObstaculos, true );
         var interseccionPowerUp = this.raycasterFrontal.intersectObjects( this.listaPowerUps, true );

         // Tambien ajustamos el raycaster para detectar la meta
         this.raycasterVictoria.ray.origin.copy(this.motoJugador.position);
         var interseccionMeta = this.raycasterVictoria.intersectObjects( this.listaMeta, true );

         if (!this.motoJugador.invulnerable) {
           if (intersecciones.length > 0) {
             this.comienzoInvulnerable = Date.now();
             this.motoJugador.hacerMotoInvisible();
             this.motoJugador.invulnerable = true;
             if (this.nodoDesplazado.position.z < 0 && this.nodoDesplazado.position.z > -1315) {
                this.sinErrores1 = false;
             } else if (this.nodoDesplazado.position.z < -1315 && this.nodoDesplazado.position.z > -2600) {
                this.sinErrores2 = false;
             }
           }
         }
         else if (this.motoJugador.invulnerable) {
            if((Date.now()-this.comienzoInvulnerable)/1000 >= 3){
              this.motoJugador.invulnerable = false;
              this.motoJugador.hacerMotoVisible();
            }
         }

         if (interseccionPowerUp.length > 0) {
           var vida2 = document.getElementById("hp2");
           if(vida2.style.display == "none"){
             vida2.style.display = "block";
           }
           this.sinErrores3 = false;
         }

         if (interseccionMeta.length > 0) {
            var textotuto = document.getElementById("textotutorial");
            textotuto.style.display = "none";
            var vida1 = document.getElementById("victoria");
            victoria.style.display = "block";
            this.gameState = MyScene.Victoria;
            this.tiempoFinNivel = Date.now();
         }

         this.nodoDesplazado.position.z -= 2.5;

         if (this.nodoDesplazado.position.z < -1315 && !this.sinErrores1) {
            this.nodoDesplazado.position.z = 0;
            this.sinErrores1 = true;
         } else if (this.nodoDesplazado.position.z < -1330) {
            var textotuto = document.getElementById("imagentutorial");
            textotuto.src = "../imgs/tutorial2.png";
         }
         if (this.nodoDesplazado.position.z < -2550 && !this.sinErrores2) {
            this.nodoDesplazado.position.z = -1315;
            this.sinErrores2 = true;
         } else if (this.nodoDesplazado.position.z < -2555) {
            var textotuto = document.getElementById("imagentutorial");
            textotuto.src = "../imgs/tutorial3.png";
         }
         if (this.nodoDesplazado.position.z < -3300 && this.sinErrores3) {
            this.nodoDesplazado.position.z = -2560;
            this.sinErrores3 = true;
         }
         if (this.nodoDesplazado.position.z < -3330) {
            var textotuto = document.getElementById("imagentutorial");
            textotuto.src = "../imgs/tutorial4.png";
         }
      break;

    }
  }
}

// Javascript no permite enum, simulamos uno
MyScene.Menu = 0;
MyScene.Nivel = 1;
MyScene.Victoria = 2;
MyScene.Derrota = 3;
MyScene.Tutorial = 4;

MyScene.nivelActual = 0;

// Función para indicar el nivel actual
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
