
class MyBolaElipse extends THREE.Object3D {
  constructor() {
    super();

    var textura = new THREE.MeshNormalMaterial();
    var texturaCil = new THREE.MeshNormalMaterial({opacity:0.35,transparent:true});
    var geoBola = new THREE.SphereGeometry( 0.5, 20, 20 );
    var geoCilindro = new THREE.CylinderGeometry (3,3,1.5,20);

    this.bola = new THREE.Mesh (geoBola, textura);
    this.cilindro = new THREE.Mesh (geoCilindro, texturaCil);

    this.add (this.bola);
    this.add (this.cilindro);

  }


  update (radio) {
    this.cilindro.scale.set(1,1,radio);

}
}
