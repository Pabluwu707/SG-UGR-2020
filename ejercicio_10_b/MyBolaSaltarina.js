class MyBolaSaltarina extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    this.radio = 1.0;
    this.ascendiendo = true;

    var texturaBola = new THREE.MeshNormalMaterial();
    var geoBola = new THREE.SphereGeometry( 1, 20, 20 );
    this.bola = new THREE.Mesh (geoBola, texturaBola);
    this.bola.position.x = 4;

    var texturaCil = new THREE.MeshNormalMaterial({opacity:0.35,transparent:true});
    var geoCilindro = new THREE.CylinderGeometry (1,1,10,20);
    this.cilindro = new THREE.Mesh (geoCilindro, texturaCil);

    //this.bola.position.x = radio;
    //this.bola.position.z = 1;

    // Creamos el siguiente nodo, que será el que rotaremos
    this.bolaPosicionada = new THREE.Object3D ();
    this.bolaPosicionada.add ( this.bola );


    // Unimos las partes del Reloj
    this.add(this.cilindro);
    this.add(this.bolaPosicionada);

    this.tiempoAnterior = Date.now();
  }

  createGUI (gui,titleGui) {
    /*
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.velocidad = 1.0;

      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.velocidad = 1.0;
      }
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'velocidad', -5.0, 5.0, 0.1).name ('Velocidad: ').listen();
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    */
  }

   updateGeometry() {
     this.sphere.geometry = new THREE.SphereGeometry (this.guiControls.radius, this.guiControls.segments, this.guiControls.segments);
   }

  update (radio) {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    var tiempoActual = Date.now();
    var segundosTranscurridos = (tiempoActual - this.tiempoAnterior) / 1000;

    this.cilindro.scale.set(radio,1,radio);
    this.bolaPosicionada.rotation.y -= 1.5 * segundosTranscurridos;
    this.bola.position.x = radio+1;

    var posicionVertical = this.bola.position.y;
    if(this.ascendiendo) {
      if ( (posicionVertical+0.1) > 4.0   ) {
         this.ascendiendo=false;
         this.bola.position.y -= 0.1;
      } else {
         this.bola.position.y += 0.1;
      }
   } else {
      if ( (this.bola.position.y - 0.1) < -4 ) {
         this.ascendiendo = true;
         this.bola.position.y += 0.1;
      } else {
         this.bola.position.y -= 0.1;
      }

    }

    this.tiempoAnterior = tiempoActual;

  }
}
