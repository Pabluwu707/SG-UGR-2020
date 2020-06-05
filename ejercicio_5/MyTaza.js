
class MyTaza extends THREE.Object3D {
  constructor(animacion) {
    super();

    var cilindro1 = new THREE.CylinderGeometry (1,1,2,20);
    var cilindro2 = new THREE.CylinderGeometry(0.9,0.9,2,20);
    cilindro2.translate(0,0.1,0);
    var cilin1bsp = new ThreeBSP(cilindro1);
    var cilin2bsp = new ThreeBSP(cilindro2);
    var asa = new THREE.TorusGeometry( 0.6, 0.1, 20, 20,Math.PI*2);
    asa.rotateZ(Math.PI/2);
    asa.translate(-0.9,0,0);
    var asabsp = new ThreeBSP(asa);
    var parcialres = cilin1bsp.union(asabsp);
    var finalres = parcialres.subtract(cilin2bsp);

    var cylMat = new THREE.MeshNormalMaterial();
    this.result = finalres.toMesh(cylMat);
    this.result.geometry.computeFaceNormals();
    this.result.geometry.computeVertexNormals();
    this.add (this.result);
  }

  update (animacion) {
    if(animacion){
      this.result.rotation.z += 0.01;
      this.result.rotation.y += 0.01;
      this.result.rotation.x += 0.01;
    }
  }
}
