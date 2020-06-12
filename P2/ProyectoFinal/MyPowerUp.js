
class MyPowerUp extends THREE.Object3D {
  constructor() {
    super();

    // Creamos los modelos
    var palmera = new MyModel("../models/palmera.obj","../models/palmera.mtl");
    var bola = new MyModel("../models/bola.obj","../models/bola.mtl", 0xFF6C11, 0.2);

    bola.scale.set(6,6,6);
    palmera.scale.set(0.7,0.7,0.7);
    palmera.position.x = -4;
    palmera.position.y = 1.5;
    palmera.position.z = 1;

    // Los añadimos a la escena
    this.add (palmera);
    this.add (bola);
  }


  updateGeometry () {
    this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
  }

  getMesh() {
     return this;
  }

  update () {

  }
}
