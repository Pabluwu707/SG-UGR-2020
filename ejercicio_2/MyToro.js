class MyToro extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    // Un Mesh se compone de geometría y material
    var toroGeom = new THREE.TorusGeometry( 0.5, 0.5, 8, 8 );
    // Como material se crea uno a partir de un color
    var toroMat = new THREE.MeshNormalMaterial();

    // Ya podemos construir el Mesh
    this.toro = new THREE.Mesh (toroGeom, toroMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.toro);

    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura

  }

  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.radiusP = 1.0;
      this.radiusT = 0.2;
      this.resolutionTo =3.0;
      this.resolutionTu =3.0;

      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.radiusP = 1.0;
        this.radiusT =0.2;
        this.resolutionTo =3.0;
        this.resolutionTu =3.0;
      }
    }

    // Se crea una sección para los controles de la caja
    var objeto = this;
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'radiusP', 0.1, 5.0, 0.1).name ('Radio Principal : ').onChange(function(){objeto.updateGeometry()});
    folder.add (this.guiControls, 'radiusT', 0.1, 5.0, 0.1).name ('Radio Tubo : ').onChange(function(){objeto.updateGeometry()});
    folder.add (this.guiControls, 'resolutionTo', 3.0, 20.0, 1.0).name ('Resolucion Toro : ').onChange(function(){objeto.updateGeometry()});
    folder.add (this.guiControls, 'resolutionTu', 3.0, 20.0, 1.0).name ('Resolucion Tubo : ').onChange(function(){objeto.updateGeometry()});

    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  updateGeometry () {
     this.toro.geometry = new  THREE.TorusGeometry(this.guiControls.radiusP,this.guiControls.radiusT,this.guiControls.resolutionTo,this.guiControls.resolutionTu);
  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.toro.rotation.z += 0.01;
    this.toro.rotation.y += 0.01;
    this.toro.rotation.x += 0.01;
  }
}
