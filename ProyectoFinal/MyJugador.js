
class MyJugador extends THREE.Object3D {
  constructor() {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz

    var cristal = new MyModel("../models/glass.obj","../models/glass.mtl", 0xF9C80E);
    var carroceria = new MyModel("../models/moto.obj","../models/moto.mtl", 0xFF3864);
    var partesNegras = new MyModel("../models/motoblackparts.obj","../models/motoblackparts.mtl", 0x2E2157);
    var soportes = new MyModel("../models/suportparts.obj","../models/suportparts.mtl");

    // Un Mesh se compone de geometría y material
    var boxGeom = new THREE.BoxGeometry (3,3,3);
    // Como material se crea uno a partir de un color
    var boxMat = new THREE.MeshNormalMaterial();

    // Ya podemos construir el Mesh
    this.mesh = new THREE.Mesh (boxGeom, boxMat);
    var box = this.mesh;

    //this.add(box);

    // Y añadirlo como hijo del Object3D (el this)
    this.add (cristal);
    this.add (soportes);
    this.add (partesNegras);
    this.add (carroceria);

    this.rotation.y += Math.PI/2;

    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
  }

  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.sizeX = 5.0;
      this.sizeY = 5.0;
      this.sizeZ = 5.0;

      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.sizeX = 5.0;
        this.sizeY = 5.0;
        this.sizeZ = 5.0;
      }
    }

    // Se crea una sección para los controles de la caja
    var objeto = this;
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'sizeX', 0.1, 5.0, 0.1).name ('Tamaño X : ').onChange(function(){objeto.updateGeometry()});
    folder.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name ('Tamaño Y : ').onChange(function(){objeto.updateGeometry()});
    folder.add (this.guiControls, 'sizeZ', 0.1, 5.0, 0.1).name ('Tamaño Z : ').onChange(function(){objeto.updateGeometry()});


    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  updateGeometry () {
    this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
  }

  getMesh() {
     return this.mesh;
 }

  update () {
     if(this.left){
        if(this.position.x <= 43){
           this.position.x += 0.6;
        }
     }
     else if(this.right){
        if(this.position.x >= -43){
          this.position.x -= 0.6;
        }
     }

     if (this.forward)
      this.position.z += 0.5;

     if (this.backward)
      this.position.z -= 0.5;

  }
}
