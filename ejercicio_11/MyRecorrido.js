
class MyRecorrido extends THREE.Object3D {
  constructor() {
    super();

    var textura = new THREE.MeshNormalMaterial();
    var texturaCil = new THREE.MeshNormalMaterial({opacity:0.35,transparent:true});
    var geoBola = new THREE.SphereGeometry( 1, 20, 20 );
    var geoCilindro = new THREE.CylinderGeometry (10,10,10,20);
  }


  update () {
    /*this.rotation.y += 0.01;
    this.satelite3.rotation.y += 0.01;
    this.satelite2.rotation.y += -0.01;*/

}
}
