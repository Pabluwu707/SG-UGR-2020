
class MyObstaculo extends THREE.Object3D {
  constructor() {
    super();

    // Un Mesh se compone de geometría y material
    var boxGeom = new THREE.BoxGeometry (19,16,16);
    // Como material se crea uno a partir de un color
    var boxMat = new THREE.MeshToonMaterial({color: 0xFD1D53});
    boxMat.opacity = 0.70;
    boxMat.transparent = true;

    // Ya podemos construir el Mesh
    this.mesh = new THREE.Mesh (boxGeom, boxMat);


    var edges = new THREE.EdgesGeometry( boxGeom );
    var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
    line.material.opacity = 0.5;
    line.material.transparent = true;
    this.add (line);


    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.mesh);

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
