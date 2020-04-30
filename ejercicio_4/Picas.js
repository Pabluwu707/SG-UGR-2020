
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
    this.base = new THREE.Mesh (geometryB, unMaterial);
    this.add(this.base);
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
    this.pica = new THREE.Mesh (geometry, unMaterial);
    this.pica.scale.set(0.83,0.83,0.83);
    this.pica.rotation.set (0,0,3.14159);
    this.pica.position.y = 2;
    this.add (this.pica);

    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación

  }
}
