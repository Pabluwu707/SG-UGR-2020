
class MyDiamante extends THREE.Object3D {
  constructor() {
    super();


    var shape  = new THREE.Shape( );
    shape.lineTo(-0.8,1);
    shape.lineTo(0,2);
    shape.lineTo(0.8,1);
    var opciones = { amount: 0.1,bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: 0.1, bevelThickness:0.1};
    var geometry = new THREE.ExtrudeBufferGeometry( shape, opciones );
    var unMaterial = new THREE.MeshNormalMaterial();
    this.diamante = new THREE.Mesh (geometry, unMaterial);
    this.add (this.diamante);

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
