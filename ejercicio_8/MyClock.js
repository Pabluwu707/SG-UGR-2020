
class MyClock extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    this.radio = 12.0;

    // Un Mesh se compone de geometría y material
    var sphGeom = new THREE.SphereGeometry (1,15,15);
    var sphMat1 = new THREE.MeshToonMaterial({color: 0xCF0000});
    var sphMat2 = new THREE.MeshToonMaterial({color: 0x00CF00});

    // Creamos el primer nodo de la aguja
    this.agujaEsfera = new THREE.Mesh (sphGeom, sphMat1);
    this.agujaEsfera.position.x = this.radio/1.2;

    // Creamos el siguiente nodo, que será el que rotaremos
    this.agujaPosicionada = new THREE.Object3D ();
    this.agujaPosicionada.add ( this.agujaEsfera );

    // Creamos la base del reloj
    this.base = new THREE.Object3D ();
    for (var i = 0; i < 12; i++) {
      this.esferaHora = new THREE.Mesh (sphGeom, sphMat2);
      var angulo = (2*Math.PI/12) * i;
      this.esferaHora.position.set( this.radio * Math.cos(angulo), 0, this.radio * Math.sin(angulo) );
      this.base.add(this.esferaHora);
    }

    // Unimos las partes del Reloj
    this.add(this.base);
    this.add(this.agujaPosicionada);

    this.tiempoAnterior = Date.now();
  }

  createGUI (gui,titleGui) {
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
  }

   updateGeometry() {
     this.sphere.geometry = new THREE.SphereGeometry (this.guiControls.radius, this.guiControls.segments, this.guiControls.segments);
   }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    var tiempoActual = Date.now();
    var segundosTranscurridos = (tiempoActual - this.tiempoAnterior) / 1000;
    this.agujaPosicionada.rotation.y -= this.guiControls.velocidad * segundosTranscurridos;
    this.tiempoAnterior = tiempoActual;

  }
}
