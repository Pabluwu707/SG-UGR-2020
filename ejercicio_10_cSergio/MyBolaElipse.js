
class MyBolaElipse extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    this.createGUI(gui,titleGui);

    var textura = new THREE.MeshNormalMaterial();
    var texturaCil = new THREE.MeshNormalMaterial({opacity:0.35,transparent:true});
    var geoBola = new THREE.SphereGeometry( 0.5, 20, 20 );
    var geoCilindro = new THREE.CylinderGeometry (3,3,1.5,20);
    geoBola.translate(3.5,0,0);

    this.bola = new THREE.Mesh (geoBola, textura);
    this.cilindro = new THREE.Mesh (geoCilindro, texturaCil);

    this.empujador = new THREE.Object3D();
    this.empujador.add(this.bola);
    this.add (this.empujador);
    this.add (this.cilindro);
    var origen1 = { p: 0};
    var destino1 = { p: 2*Math.PI};
    var origen2 = { p: 1};
    var destino2 = { p: -1};
    var animacion1 = new TWEEN.Tween(origen1).to(destino1,4000).repeat(Infinity).start();
    var animacion2 = new TWEEN.Tween(origen2).to(destino2,2000).yoyo(true).start().repeat(Infinity).easing(TWEEN.Easing.Quadratic.InOut);

    var that = this;
    animacion1.onUpdate(function(){
      that.bola.rotation.y = origen1.p;
    });


    animacion2.onUpdate(function(){
      that.empujador.position.x = (origen2.p*(that.guiControls.radio*3-3));
      console.log((origen2.p*(that.guiControls.radio*3-3)));
    });

  }

  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.radio = 1.0;



      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.radio = 1.0;

      }
    }

    // Se crea una sección para los controles de la caja
    var objeto = this;
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'radio', 1, 3, 0.1).name ('Radio : ').listen();


    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }


  update (radio) {
    this.cilindro.scale.set(this.guiControls.radio,1,1);
    TWEEN.update();

}
}
