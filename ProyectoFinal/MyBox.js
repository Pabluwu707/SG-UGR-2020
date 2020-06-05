
class MyBox extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    // Un Mesh se compone de geometría y material
    var boxGeom = new THREE.BoxGeometry (9,9,9);
    // Como material se crea uno a partir de un color
    var boxMat = new THREE.MeshNormalMaterial();

    // Ya podemos construir el Mesh
    var box = new THREE.Mesh (boxGeom, boxMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (box);

    this.right = false;
    this.left = false;


    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
  }

  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.sizeX = 1.0;
      this.sizeY = 1.0;
      this.sizeZ = 1.0;



      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.sizeX = 1.0;
        this.sizeY = 1.0;
        this.sizeZ = 1.0;

      }
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'sizeX', 0.1, 5.0, 0.1).name ('Tamaño X : ').listen();
    folder.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name ('Tamaño Y : ').listen();
    folder.add (this.guiControls, 'sizeZ', 0.1, 5.0, 0.1).name ('Tamaño Z : ').listen();


    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  update () {
    this.position.z += 0.8;
    if(this.left){
      if(this.position.x <= 15){
        this.position.x += 0.6;
      }
    }
    else if(this.right){
      if(this.position.x >= -15){
        this.position.x -= 0.6;
      }
    }

  }
}
