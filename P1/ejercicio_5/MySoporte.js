
class MySoporte extends THREE.Object3D {
  constructor() {
    super();

    var cubo = new THREE.BoxGeometry (1,1,1);
    var lado1 = new THREE.BoxGeometry (2.5,0.2,1);
    var lado2 = new THREE.BoxGeometry (0.22,2.5,1);
    var cilindro = new THREE.CylinderGeometry(0.8,0.8,2,22);
    var agujero1 = new THREE.CylinderGeometry(0.1,0.1,2,8);
    var agujero2 = new THREE.CylinderGeometry(0.1,0.1,2,8);
    agujero1.rotateZ(Math.PI/2);
    agujero1.translate(-0.4,-1.4,0);
    agujero2.translate(1.4,0.4,0);
    cilindro.rotateX(Math.PI/2);
    cilindro.translate(0.5,-0.5,0.5);
    cubo.rotateX(Math.PI/2);
    lado1.translate(1,0.4,0);
    lado2.translate(-0.39,-1,0);
    var cubobsp = new ThreeBSP(cubo);
    var cilbsp = new ThreeBSP(cilindro);
    var lado1bsp = new ThreeBSP(lado1);
    var lado2bsp = new ThreeBSP(lado2);
    var agujero1bsp = new ThreeBSP(agujero1);
    var agujero2bsp = new ThreeBSP(agujero2);
    var res1 = cubobsp.subtract(cilbsp);
    var res2 = res1.union(lado2bsp);
    var res3 = res2.union(lado1bsp);
    var res4 = res3.subtract(agujero2bsp);
    var finalres = res4.subtract(agujero1bsp);

    var Mat = new THREE.MeshNormalMaterial();
    this.result = finalres.toMesh(Mat);
    this.result.geometry.computeFaceNormals();
    this.result.geometry.computeVertexNormals();
    this.add (this.result);
  }



  update (animacion) {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    if(animacion){
      this.result.rotation.z += 0.01;
      this.result.rotation.y += 0.01;
      this.result.rotation.x += 0.01;
    }
  }
}
