
class MySistemaSolar extends THREE.Object3D {
  constructor() {
    super();

    var texturaTierra = new THREE.TextureLoader().load('../imgs/tierra.jpg');
    var texturaCara = new THREE.TextureLoader().load('../imgs/cara.jpg');
    var materialTierra = new THREE.MeshPhongMaterial ({map: texturaTierra});
    var materialCara = new THREE.MeshPhongMaterial ({map: texturaCara});
    var geoTierra = new THREE.SphereGeometry( 1.5, 20, 20 );
    var geoSatelite = new THREE.SphereGeometry( 1, 20, 20 );
    geoSatelite.rotateY(-Math.PI/2);
    this.tierra = new THREE.Mesh (geoTierra, materialTierra);
    this.satelite1 = new THREE.Mesh (geoSatelite, materialCara);
    this.satelite2 = new THREE.Mesh (geoSatelite, materialCara);
    this.satelite3 = new THREE.Mesh (geoSatelite, materialCara);

    this.add (this.tierra);
    this.add (this.satelite1);
    this.add (this.satelite2);
    this.add (this.satelite3);

    this.satelite1.position.x = 3;
    this.satelite2.position.x = 6;
    this.satelite3.position.x = 9;

    this.tiempoAnterior = Date.now();
  }


  update (camara) {
    var tiempoActual = Date.now();
    var segundosTranscurridos = (tiempoActual - this.tiempoAnterior) / 1000;
    this.rotation.y += segundosTranscurridos * 0.5;

    //this.satelite2.rotation.y += -0.01;
    this.satelite1.lookAt(0,0,0);
    this.satelite2.lookAt(camara.position);
    this.satelite3.rotation.y += segundosTranscurridos * 0.5;

    this.tiempoAnterior = tiempoActual;
  }
}
