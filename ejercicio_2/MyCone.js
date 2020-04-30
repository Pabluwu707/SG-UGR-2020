class MyCone extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    // Un Mesh se compone de geometría y material
    var conoGeom = new THREE.ConeGeometry (1,1,3);
    // Como material se crea uno a partir de un color
    var conoMat = new THREE.MeshNormalMaterial();

    // Ya podemos construir el Mesh
    this.cono = new THREE.Mesh (conoGeom, conoMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.cono);
    this.cono.position.x = -10;

    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
  }

  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.radius = 1.0;
      this.height = 1.0;
      this.resolution = 3.0;

      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.radius = 1.0;
        this.height = 1.0;
        this.resolution = 3.0;
      }
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'radius', 0.1, 5.0, 0.1).name ('Radio : ').listen();
    folder.add (this.guiControls, 'height', 0.1, 5.0, 0.1).name ('Altura : ').listen();
    folder.add (this.guiControls, 'resolution', 3.0, 20.0, 1.0).name ('Resolucion : ').listen();

    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.scale.set (1.0,this.guiControls.height,1.0);
    this.cono.geometry = new THREE.ConeGeometry (this.guiControls.radius,1.0,this.guiControls.resolution);
    this.cono.rotation.z += 0.01;
    this.cono.rotation.y += 0.01;
    this.cono.rotation.x += 0.01;
  }
}
