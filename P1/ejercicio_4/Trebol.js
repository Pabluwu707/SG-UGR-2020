
class MyTrebol extends THREE.Object3D {
  constructor() {
    super();
    var unMaterial = new THREE.MeshNormalMaterial();

    this.points = [];
    this.points.push (new THREE.Vector3 (0.0,0.0, 0.0));
    this.points.push (new THREE.Vector3 (0.1,0.0, 0.0));
    this.points.push (new THREE.Vector3 (0.05,0.1, 0.0));
    this.points.push (new THREE.Vector3 (0.04,0.1, 0.0));
    this.points.push (new THREE.Vector3 (0.04,0.6, 0.0));

    var geometryB = new THREE.LatheGeometry(this.points);
    geometryB.translate(0,-1,0);
    this.base = new THREE.Mesh (geometryB, unMaterial);
    this.base.position.z=0.05;


    var shape  = new THREE.Shape( );
    shape.moveTo(0,0.8);
    shape.absellipse(-0.4,0.8,0.5,0.5,0,Math.PI*2);
    shape.lineTo(0,0.8);
    shape.absellipse(0.4,0.8,0.5,0.5,0,Math.PI*2);
    shape.lineTo(0,0.8);
    shape.absellipse(0,1.5,0.5,0.5,0,Math.PI*2);
    shape.lineTo(0,1.3);
    var opciones = { amount: 0.1,bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: 0.1, bevelThickness:0.1};
    var geometry = new THREE.ExtrudeBufferGeometry( shape, opciones );
    geometry.translate(0,-1,0);
    this.trebol = new THREE.Mesh (geometry, unMaterial);
    this.add (this.trebol);
    this.nodoDesplazado = new THREE.Object3D();
    this.nodoDesplazado.position.x = -1.5;
    this.nodoDesplazado.position.y = 1.5;
    this.nodoDesplazado.add(this.trebol);
    this.nodoDesplazado.add(this.base);
    this.nodoRotado = new THREE.Object3D();
    this.nodoRotado.add(this.nodoDesplazado);
    this.add (this.nodoRotado);
  }


  update (animacion) {
    if(animacion){
      this.trebol.rotation.y += 0.01;
      this.base.rotation.y += 0.01;
      this.nodoDesplazado.rotation.z -= 0.01;
      this.nodoRotado.rotation.z += 0.01;
    }

  }
}
