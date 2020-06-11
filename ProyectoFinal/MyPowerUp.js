
class MyPowerUp extends THREE.Object3D {
  constructor() {
    super();

    this.arma = new MyModel("../models/palmera.obj","../models/palmera.mtl");

    //this.add(box);

    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.arma);
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
