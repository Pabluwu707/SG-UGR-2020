
class MyCorazon extends THREE.Object3D {
  constructor() {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz

    var shape  = new THREE.Shape( );
    shape.bezierCurveTo(0,0,-0.1,0.4,-0.81,1.115);
    shape.bezierCurveTo(-0.877,1.115,-1.25,2,-0.5,2);
    shape.bezierCurveTo(-0.5,2,-0.23,2,0,1.75);
    shape.bezierCurveTo(0,1.7,0.23,2,0.5,2);
    shape.bezierCurveTo(0.5,2,1.25,2,0.81,1.115);
    shape.bezierCurveTo(0.877,1.115,0.1,0.4,0,0);


    var opciones = { amount: 0.1,bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: 0.1, bevelThickness:0.1};
    var geometry = new THREE.ExtrudeBufferGeometry( shape, opciones );
    geometry.translate(0,-1,0);
    var unMaterial = new THREE.MeshNormalMaterial();
    this.corazon = new THREE.Mesh (geometry, unMaterial);
    this.add (this.corazon);
    this.cd = new THREE.Object3D();
    this.cd.position.x = 1.5;
    this.cd.position.y = 1.5;
    this.cd.add(this.corazon);
    this.e = new THREE.Object3D();
    this.e.add(this.cd);
    this.add (this.e);

    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
  }



  update (animacion) {
    if(animacion){
      this.corazon.rotation.y += 0.01;
      this.cd.rotation.z -= 0.01;
      this.e.rotation.z += 0.01;
    }

  }
}
