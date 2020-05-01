
class MyRecorrido extends THREE.Object3D {
  constructor() {
    super();

    var textura = new THREE.TextureLoader().load('../imgs/textura-ajedrezada.jpg');
    var Textura = new THREE.LineBasicMaterial({color: 0xff0000});
    var material= new THREE.MeshPhongMaterial ({map: textura});
    var geom = new THREE.ConeGeometry (0.5,1,3);
    geom.rotateX( Math.PI/2);
    this.coche = new THREE.Mesh (geom, material);

    var spline1 = new THREE.CatmullRomCurve3([new THREE.Vector3(0,2,0),new THREE.Vector3(5,1,3),
      new THREE.Vector3(7,1,4),new THREE.Vector3(10,2,4),new THREE.Vector3(14,4,3),new THREE.Vector3(10,5,2),
    new THREE.Vector3(8,5,0),new THREE.Vector3(4,4,0),new THREE.Vector3(0,3,0)]);
    var spline2 = new THREE.CatmullRomCurve3([new THREE.Vector3(0,3,0),
    new THREE.Vector3(-2,1,1), new THREE.Vector3(-6,-1,1),new THREE.Vector3(-10,0,0),
    new THREE.Vector3(-7,4,0),new THREE.Vector3(-6,4,0),new THREE.Vector3(-5,4,0),
    new THREE.Vector3(-3,3,0),new THREE.Vector3(0,2,0)] );
    var geometryLine1 = new THREE.Geometry();
    var geometryLine2 = new THREE.Geometry();
    geometryLine1.vertices = spline1.getPoints(100);
    var visibleSpline1 = new THREE.Line( geometryLine1, Textura);
    geometryLine2.vertices = spline2.getPoints(100);
    var visibleSpline2 = new THREE.Line( geometryLine2, Textura);
    this.add(visibleSpline1);
    this.add(visibleSpline2);
    this.add(this.coche);


    var origen1 = { x: 0, y: 2};
    var destino1 = { x: 0, y: 3};
    var origen2 = { x: 0, y: 2};
    var destino2 = { x: 0, y: 3};

    var animacion1 = new TWEEN.Tween(origen1).to(destino1,4000).easing(TWEEN.Easing.Quadratic.InOut);
    var animacion2 = new TWEEN.Tween(origen2).to(destino2,8000).easing(TWEEN.Easing.Quadratic.InOut);
    animacion1.chain(animacion2);
    animacion2.chain(animacion1);
    var that = this;
    animacion1.onUpdate(function(){

      var posicion = spline1.getPointAt(origen1.y-2);
      that.coche.position.copy(posicion);
      var tangente = spline1.getTangentAt(origen1.y-2);
      posicion.add(tangente);
      that.coche.lookAt(posicion);
    });

    animacion2.onUpdate(function(){
      var posicion = spline2.getPointAt(origen2.y-2);
      that.coche.position.copy(posicion);
      var tangente = spline2.getTangentAt(origen2.y-2);
      posicion.add(tangente);
      that.coche.lookAt(posicion);
    });

    animacion1.start();
  }


  update () {
    TWEEN.update();

}
}
