
class MyPicas extends THREE.Object3D {
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
    //this.add(this.base);
    this.base.position.z=0.05;

    var shape  = new THREE.Shape( );
    shape.moveTo(0,0);
    shape.bezierCurveTo(0,0,-0.1,0.4,-0.81,1.115);
    shape.bezierCurveTo(-0.877,1.115,-1.25,2,-0.5,2);
    shape.bezierCurveTo(-0.5,2,-0.23,2,0,1.75);
    shape.bezierCurveTo(0,1.7,0.23,2,0.5,2);
    shape.bezierCurveTo(0.5,2,1.25,2,0.81,1.115);
    shape.bezierCurveTo(0.877,1.115,0.1,0.4,0,0);
    var opciones = { amount: 0.1,bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: 0.1, bevelThickness:0.1};
    var geometry = new THREE.ExtrudeBufferGeometry( shape, opciones );
    geometry.translate(0,-1,0);
    this.pica = new THREE.Mesh (geometry, unMaterial);
    this.pica.scale.set(0.83,0.83,0.83);
    this.pica.rotation.set (0,0,3.14159);
    this.cd = new THREE.Object3D();
    this.cd.position.x = 1.5;
    this.cd.position.y = -1.5;
    this.cd.add(this.pica);
    this.cd.add(this.base);
    this.e = new THREE.Object3D();
    this.e.add(this.cd);
    this.add (this.e);

    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
  }

  update (animacion) {
    if(animacion){
      this.pica.rotation.y += 0.01;
      this.base.rotation.y += 0.01;
      this.cd.rotation.z -= 0.01;
      this.e.rotation.z += 0.01;
    }

  }
}
