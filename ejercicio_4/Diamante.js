
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
    this.nodoDesplazado = new THREE.Object3D();
    this.nodoDesplazado.position.x = -1.5;
    this.nodoDesplazado.position.y = -1.5;
    this.nodoDesplazado.add(this.diamante);
    this.nodoRotado = new THREE.Object3D();
    this.nodoRotado.add(this.nodoDesplazado);
    this.add (this.nodoRotado);
  }

  update (animacion) {
    if(animacion){
      this.diamante.rotation.y += 0.01;
      this.nodoDesplazado.rotation.z -= 0.01;
      this.nodoRotado.rotation.z += 0.01;
    }
  }
}
