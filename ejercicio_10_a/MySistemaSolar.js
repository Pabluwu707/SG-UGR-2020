
class MySistemaSolar extends THREE.Object3D {
  constructor() {
    super();

    var texturaTierra = new THREE.TextureLoader().load('../imgs/tierra.jpg');
    var texturaCara = new THREE.TextureLoader().load('../imgs/cara.jpg');
    var materialTierra = new THREE.MeshPhongMaterial ({map: texturaTierra});
    var materialCara = new THREE.MeshPhongMaterial ({map: texturaCara});
    var geoTierra = new THREE.SphereGeometry( 1.5, 20, 20 );
    var geoSastelite = new THREE.SphereGeometry( 1, 20, 20 );
    this.tierra = new THREE.Mesh (geoTierra, materialTierra);
    this.satelite1 = new THREE.Mesh (geoSastelite, materialCara);
    this.satelite2 = new THREE.Mesh (geoSastelite, materialCara);
    this.satelite3 = new THREE.Mesh (geoSastelite, materialCara);

    this.add (this.tierra);
    this.add (this.satelite1);
    this.add (this.satelite2);
    this.add (this.satelite3);

    this.satelite1.position.x = 3;
    this.satelite2.position.x = 6;
    this.satelite3.position.x = 9;
    this.satelite1.rotation.y = Math.PI;
    this.satelite3.rotation.y = Math.PI;
  }


  update () {
    /*this.rotation.y += 0.01;
    this.satelite3.rotation.y += 0.01;
    this.satelite2.rotation.y += -0.01;*/

}
}
