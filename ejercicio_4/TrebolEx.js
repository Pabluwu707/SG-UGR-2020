
class MyTrebolEx extends THREE.Object3D {
  constructor() {
    super();

    var unMaterial = new THREE.MeshNormalMaterial();
    var shape  = new THREE.Shape( );
    shape.moveTo(0,0.8);
    shape.absellipse(-0.4,0.8,0.5,0.5,0,Math.PI*2);
    shape.lineTo(0,0.8);
    shape.absellipse(0.4,0.8,0.5,0.5,0,Math.PI*2);
    shape.lineTo(0,0.8);
    shape.absellipse(0,1.5,0.5,0.5,0,Math.PI*2);
    shape.lineTo(0,1.3);
    var pts = [];
    pts.push (new THREE.Vector3 (0.0, 0.0, 0.0));
    pts.push (new THREE.Vector3 (0.5, 3.0, 0.5));
    pts.push (new THREE.Vector3 (-0.5, 9.0, -0.5));
    pts.push (new THREE.Vector3 (0.0, 12.0, 0.0));
    var path = new THREE.CatmullRomCurve3(pts);
    var options ={steps:50, curveSegments: 4, extrudePath:path};
    var geometry = new THREE.ExtrudeGeometry(shape, options);
    geometry.translate(0,-6,0);
    this.trebolex = new THREE.Mesh (geometry, unMaterial);
    this.add (this.trebolex);
    this.trebolex.scale.set(0.4,0.4,0.4);

    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
  }


  update (animacion) {
    if(animacion){
      this.trebolex.rotation.x += 0.01;
    }

  }
}
