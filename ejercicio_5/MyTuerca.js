
class MyTuerca extends THREE.Object3D {
  constructor(animacion) {
    super();


    var shape  = new THREE.Shape( );
    var cilindro = new THREE.CylinderGeometry (1,1,3,20);
    var circulo1 = new THREE.CylinderGeometry (1.2,1.2,0.05,20);
    var circulo2 = new THREE.CylinderGeometry (1.2,1.2,0.05,20);
    var circulo3 = new THREE.CylinderGeometry (1.2,1.2,0.05,20);
    var circulo4 = new THREE.CylinderGeometry (1.2,1.2,0.05,20);
    var circulo5 = new THREE.CylinderGeometry (1.2,1.2,0.05,20);
    var circulo6 = new THREE.CylinderGeometry (1.2,1.2,0.05,20);
    var circulo7 = new THREE.CylinderGeometry (1.2,1.2,0.05,20);
    var circulo8 = new THREE.CylinderGeometry (1.2,1.2,0.05,20);
    var circulo9 = new THREE.CylinderGeometry (1.2,1.2,0.05,20);
    var circulo10 = new THREE.CylinderGeometry (1.2,1.2,0.05,20);
    cilindro.translate(1.5,0,0);
    circulo1.translate(1.5,-0.05,0);
    circulo2.translate(1.5,-0.15,0);
    circulo3.translate(1.5,-0.25,0);
    circulo4.translate(1.5,-0.35,0);
    circulo5.translate(1.5,-0.45,0);
    circulo6.translate(1.5,-0.55,0);
    circulo7.translate(1.5,-0.65,0);
    circulo8.translate(1.5,-0.75,0);
    circulo9.translate(1.5,-0.85,0);
    circulo10.translate(1.5,-0.95,0);
    var cilindrobsp = new ThreeBSP(cilindro);
    var circulo1bsp = new ThreeBSP(circulo1);
    var circulo2bsp = new ThreeBSP(circulo2);
    var circulo3bsp = new ThreeBSP(circulo3);
    var circulo4bsp = new ThreeBSP(circulo4);
    var circulo5bsp = new ThreeBSP(circulo5);
    var circulo6bsp = new ThreeBSP(circulo6);
    var circulo7bsp = new ThreeBSP(circulo7);
    var circulo8bsp = new ThreeBSP(circulo8);
    var circulo9bsp = new ThreeBSP(circulo9);
    var circulo10bsp = new ThreeBSP(circulo10);
    shape.lineTo(0,0.5);
    shape.lineTo(1,1.5);
    shape.lineTo(2,1.5);
    shape.lineTo(3,0.5);
    shape.lineTo(3,-0.5);
    shape.lineTo(2,-1.5);
    shape.lineTo(1,-1.5);
    shape.lineTo(0,-0.5);
    shape.lineTo(0,0);
    var opciones = { amount: 1,bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: 0.1, bevelThickness:0.1};
    var geometry = new THREE.ExtrudeGeometry( shape, opciones );
    var unMaterial = new THREE.MeshNormalMaterial();
    var tuerca = new THREE.Mesh (geometry, unMaterial);
    tuerca.rotateX(Math.PI/2);
    var tuercabsp = new ThreeBSP(tuerca);
    var res1 = tuercabsp.subtract(cilindrobsp);
    var res2 = res1.subtract(circulo1bsp);
    var res3 = res2.subtract(circulo2bsp);
    var res4 = res3.subtract(circulo3bsp);
    var res5 = res4.subtract(circulo4bsp);
    var res6 = res5.subtract(circulo5bsp);
    var res7 = res6.subtract(circulo6bsp);
    var res8 = res7.subtract(circulo7bsp);
    var res9 = res8.subtract(circulo8bsp);
    var res10 = res9.subtract(circulo9bsp);
    var finalres = res10.subtract(circulo10bsp);

    this.result = finalres.toMesh(unMaterial);
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
