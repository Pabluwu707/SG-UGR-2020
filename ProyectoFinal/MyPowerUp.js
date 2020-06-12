
class MyPowerUp extends THREE.Object3D {
  constructor() {
    super();

    // Creamos los modelos
    this.palmera = new MyModel("../models/palmera.obj","../models/palmera.mtl");
    this.bola = new MyModel("../models/bola.obj","../models/bola.mtl", 0xFF6C11, 0.2);

    this.bola.scale.set(6,6,6);
    this.palmera.scale.set(0.7,0.7,0.7);
    this.palmera.position.x = -4;
    this.palmera.position.y = 1.5;
    this.palmera.position.z = 1;

    // Los añadimos a la escena
    this.add (this.palmera);
    this.add (this.bola);
  }


  updateGeometry () {
    this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
  }

  getMesh() {
     return this.mesh;
  }

  update () {

  }
}
