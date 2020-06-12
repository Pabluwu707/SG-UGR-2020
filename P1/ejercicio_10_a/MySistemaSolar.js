
class MySistemaSolar extends THREE.Object3D {
  constructor() {
    super();

    // Definimos el objeto Tierra y los Satélites, junto con sus texturas, materiales y geometrías
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

    // Agregamos los objetos creados a la clase
    this.add (this.tierra);
    this.add (this.satelite1);
    this.add (this.satelite2);
    this.add (this.satelite3);

    // Ajustamos las posiciones de los satélites acordemente
    this.satelite1.position.x = 3;
    this.satelite2.position.x = 6;
    this.satelite3.position.x = 9;

    // Tomamos la primera instancia del TiempoAnterior
    this.tiempoAnterior = Date.now();
  }


  update (camara) {
     // Tomamos el TiempoActual para poder medir cuanto tiempo ha pasado desde
     // la última ejecución de update(), y aplicamos la velocidad acordemente
    var tiempoActual = Date.now();
    var segundosTranscurridos = (tiempoActual - this.tiempoAnterior) / 1000;
    this.rotation.y += segundosTranscurridos * 0.5;

    // Calculamos la orientación de cada uno de los satélites
    this.satelite1.lookAt(0,0,0);
    this.satelite2.lookAt(camara.position);
    this.satelite3.rotation.y += segundosTranscurridos * 0.5;

    // Actualizamos la variable tiempoAnterior
    this.tiempoAnterior = tiempoActual;
  }
}
