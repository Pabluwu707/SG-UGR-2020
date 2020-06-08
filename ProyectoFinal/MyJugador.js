
class MyJugador extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);


    var cristal = new MyModel("../models/cristal.obj","../models/cristal.mtl", 0xF9C80E, 0.5);
    var carroceria = new MyModel("../models/carroceria.obj","../models/carroceria.mtl", 0xFF3864);
    var partesNegras = new MyModel("../models/partesNegras.obj","../models/partesNegras.mtl", 0x2E2157);
    var soportes = new MyModel("../models/partesSoporte.obj","../models/partesSoporte.mtl");

    // Un Mesh se compone de geometría y material
    var boxGeom = new THREE.BoxGeometry (3,3,3);
    // Como material se crea uno a partir de un color
    var boxMat = new THREE.MeshNormalMaterial();

    // Ya podemos construir el Mesh
    this.mesh = new THREE.Mesh (boxGeom, boxMat);
    var box = this.mesh;

    //this.add(box);

    // Y añadirlo como hijo del Object3D (el this)
    this.add (cristal);
    this.add (soportes);
    this.add (partesNegras);
    this.add (carroceria);

    this.invulnerabilidad = false;

    this.scale.set(1.5,1.5,1.5);

    // Inclinación de la moto usando Tween
    this.primeraEjecucion = false;
    this.rotacionInicio = 0;
    var origen = {p: 0.3};
    var destino = {p: 0};
    var that = this;

    var movimiento = new TWEEN.Tween(origen)
      .to(destino,2000)
      .onUpdate(function(){
         that.rotation.z = origen.p;

      })
      .start();

    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
  }

  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.rotX = 0.0;
      this.rotY = 0.0;
      this.rotZ = 0.0;

      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
         this.rotX = 0.0;
         this.rotY = 0.0;
         this.rotZ = 0.0;
      }
    }

    // Se crea una sección para los controles de la caja
    var objeto = this;
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice


    folder.add (this.guiControls, 'rotX', 0.0, Math.PI/2, 0.1).name ('Rotación X : ').listen();
    folder.add (this.guiControls, 'rotY', 0.0, Math.PI/2, 0.1).name ('Rotación Y : ').listen();
    folder.add (this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.1).name ('Rotación Z : ').listen();

    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  updateGeometry () {
    this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
  }

  getMesh() {
     return this.mesh;
 }

  update () {
     // Modificación del modelo
     if (this.invulnerable) {
     }
     
     //console.log(this.rotation.z);

     // Opciones de movimiento
     if(this.left){

        this.primeraEjecucion = true;
        if(this.position.x <= 43){
           this.position.x += 0.6;
           if (this.rotation.z > -0.3) {
             this.rotation.z -= 0.05;
           }
        }
     }
     else if(this.right){
        this.primeraEjecucion = true;
        if(this.position.x >= -43){
          this.position.x -= 0.6;
          if (this.rotation.z < 0.3) {
            this.rotation.z += 0.05;
          }
        }
     }
     else {
        /*if (this.primeraEjecucion) {
           this.rotacionInicio = this.rotation.z;
           this.primeraEjecucion = false;
        }
        TWEEN.update();*/
        // Devolver rotación a 0, está bugeado
        // Intentaré hacerlo con Tween para evitar errores
        /*if (this.rotation.z > 0) {
          this.rotation.z -= 0.05;
        } else if (this.rotation.z < 0) {
          this.rotation.z += 0.05;
       }*/
       this.rotation.z = 0;
     }

     if (this.forward)
      this.position.z += 0.5;

     if (this.backward)
      this.position.z -= 0.5;


    //this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
  }
}
