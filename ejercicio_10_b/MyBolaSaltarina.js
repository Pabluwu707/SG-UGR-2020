class MyBolaSaltarina extends THREE.Object3D {
  constructor() {
    super();

    this.ascendiendo = true;

    // Creación de material y geometría de la Bola
    var texturaBola = new THREE.MeshNormalMaterial();
    var geoBola = new THREE.SphereGeometry( 1, 20, 20 );
    this.bola = new THREE.Mesh (geoBola, texturaBola);
    this.bola.position.x = 4;

    // Creación de material y geometría del Cilindro
    var texturaCil = new THREE.MeshNormalMaterial({opacity:0.35,transparent:true});
    var geoCilindro = new THREE.CylinderGeometry (1,1,10,20);
    this.cilindro = new THREE.Mesh (geoCilindro, texturaCil);

    // Creamos el siguiente nodo, que será el que rotaremos horizontalmente
    this.bolaPosicionada = new THREE.Object3D ();
    this.bolaPosicionada.add ( this.bola );

    // Unimos las partes
    this.add(this.cilindro);
    this.add(this.bolaPosicionada);


    // Temporizamos el movimiento vertical con Tween
    var origen = {p: -4};
    var destino = {p: 4};
    var that = this;

    var movimiento = new TWEEN.Tween(origen)
      .to(destino,2000)
      .repeat(Infinity)
      .yoyo(true)
      .onUpdate(function(){
         that.bola.position.y = origen.p;

      })
      .start();


    // Temporizamos la rotación alrededor del cilindro con Tween
    var origen2 = { p: 0 };
    var destino2 = { p: 2*Math.PI };

    var movimiento2 = new TWEEN.Tween(origen2)
      .to(destino2,4000)
      .repeat(Infinity)
      .onUpdate(function(){
         that.bolaPosicionada.rotation.y = origen2.p;
      })
      .start();

  }

  update (radio) {

    //Escalado de Cilindro
    this.cilindro.scale.set(radio,1,radio);
    this.bola.position.x = radio+1;

    TWEEN.update();

  }
}
