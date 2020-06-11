
class MyPowerUp extends THREE.Object3D {
  constructor() {
    super();

    this.palmera = new MyModel("../models/palmera.obj","../models/palmera.mtl");
    this.bola = new MyModel("../models/bola.obj","../models/bola.mtl", 0xFF6C11, 0.2);

    //this.add(box);

    // Y añadirlo como hijo del Object3D (el this)
    this.bola.scale.set(6,6,6);
    this.palmera.scale.set(0.7,0.7,0.7);
    this.palmera.position.x = -4;
    this.palmera.position.y = 1.5;
    this.palmera.position.z = 1;
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
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    /*this.rotation.z += 0.01;
    this.rotation.y += 0.01;
    this.rotation.x += 0.01;*/
  }
}
