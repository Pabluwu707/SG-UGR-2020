
class MyBolaSaltarina extends THREE.Object3D {
  constructor() {
    super();

    var origen ={x:0, y: -4};
    var destino ={x:0, y: 4};
    var textura = new THREE.MeshNormalMaterial();
    var texturaCil = new THREE.MeshNormalMaterial({opacity:0.35,transparent:true});
    var geoBola = new THREE.SphereGeometry( 1, 20, 20 );
    var geoCilindro = new THREE.CylinderGeometry (1,1,10,20);
    geoBola.translate(11,0,0)

    this.bola = new THREE.Mesh (geoBola, textura);
    this.cilindro = new THREE.Mesh (geoCilindro, texturaCil);

    this.add (this.bola);
    this.add (this.cilindro);

    var movimiento = new TWEEN.Tween(origen).to(destino,700).repeat(Infinity).yoyo(true);
    var that = this;
    movimiento.onUpdate(function(){
      that.bola.position.x = origen.x;
      that.bola.position.y = origen.y;
    });

    movimiento.start();

  }


  update (radio) {
    this.cilindro.scale.set(radio,1,radio);
    this.bola.rotation.y += 0.05;
    this.bola.position.x = radio;


    TWEEN.update();

}
}
