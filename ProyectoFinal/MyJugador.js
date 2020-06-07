
class MyJugador extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);


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

    this.scale.set(1.5,1.5,1.5);

    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
  }

  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.rotX = 0.0;
      this.rotY = 1.6;
      this.rotZ = 0.0;

      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
         this.rotX = 0.0;
         this.rotY = 0.0;
         this.rotZ = 0.0;
      }
    }

    // Se crea una sección para los controles de la caja
    var objeto = this;
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice


    folder.add (this.guiControls, 'rotX', 0.0, Math.PI/2, 0.1).name ('Rotación X : ').listen();
    folder.add (this.guiControls, 'rotY', 0.0, Math.PI/2, 0.1).name ('Rotación Y : ').listen();
    folder.add (this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.1).name ('Rotación Z : ').listen();

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
        //if(this.rotation.x <)
        this.rotation.z += 0.006;
     }
     else if(this.right){
        if(this.position.x >= -43){
          this.position.x -= 0.6;
        }

        this.rotation.z -= 0.006;
     }

     if (this.forward)
      this.position.z += 0.5;

     if (this.backward)
      this.position.z -= 0.5;


    this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
  }
}
