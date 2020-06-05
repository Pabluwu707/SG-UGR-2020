
class MyCorazonEx extends THREE.Object3D {
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

    var pts = [];
    pts.push (new THREE.Vector3 (0.0, 0.0, 0.0));
    pts.push (new THREE.Vector3 (0.5, 3.0, 0.5));
    pts.push (new THREE.Vector3 (-0.5, 9.0, -0.5));
    pts.push (new THREE.Vector3 (0.0, 12.0, 0.0));
    var path = new THREE.CatmullRomCurve3(pts);
    var options ={steps:50, curveSegments: 4, extrudePath:path};
    var geometry = new THREE.ExtrudeGeometry(shape, options);
    geometry.translate(0,-6,0);
    var unMaterial = new THREE.MeshNormalMaterial();
    this.corazonex = new THREE.Mesh (geometry, unMaterial);
    this.add (this.corazonex);
    this.corazonex.scale.set(0.4,0.4,0.4);
  }

  update (animacion) {
    if(animacion){
      this.corazonex.rotation.x += 0.01;
    }

  }
}
