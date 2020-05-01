
class MyDiamante extends THREE.Object3D {
  constructor() {
    super();


    var shape  = new THREE.Shape( );
    shape.lineTo(-0.8,1);
    shape.lineTo(0,2);
    shape.lineTo(0.8,1);
    var opciones = { amount: 0.1,bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: 0.1, bevelThickness:0.1};
    var geometry = new THREE.ExtrudeBufferGeometry( shape, opciones );
    geometry.translate(0,-1,0);
    var unMaterial = new THREE.MeshNormalMaterial();
    this.diamante = new THREE.Mesh (geometry, unMaterial);
    this.cd = new THREE.Object3D();
    this.cd.position.x = 1.5;
    this.cd.add(this.diamante);
    this.e = new THREE.Object3D();
    this.e.add(this.cd);
    this.add (this.e);

    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
  }

  update (animacion) {
    if(animacion){
      this.diamante.rotation.y += 0.01;
      this.cd.rotation.z -= 0.01;
      this.e.rotation.z += 0.01;
    }
  }
}
