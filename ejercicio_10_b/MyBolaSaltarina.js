
class MyBolaSaltarina extends THREE.Object3D {
  constructor() {
    super();

    this.bolay = 0.2;
    var texturaCil = new THREE.MeshNormalMaterial({opacity:0.35,transparent:true});
    var textura = new THREE.MeshNormalMaterial();
    var geoBola = new THREE.SphereGeometry( 1, 20, 20 );
    var geoCilindro = new THREE.CylinderGeometry (10,10,10,20);
    geoBola.translate(11,0,0)

    this.bola = new THREE.Mesh (geoBola, textura);
    this.cilindro = new THREE.Mesh (geoCilindro, texturaCil);

    this.add (this.bola);
    this.add (this.cilindro);


  }


  update (radio) {
    this.cilindro.geometry = new THREE.CylinderGeometry (radio,radio,10,20);
    this.bola.rotation.y += 0.05;
    this.bola.position.y+=this.bolay
    if(this.bola.position.y >= 4){
      this.bolay = -this.bolay;
    }
    if(this.bola.position.y <= -4){
      this.bolay = -this.bolay;
    }

}
}
