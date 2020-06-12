
class MyJugador extends THREE.Object3D {
  constructor() {
    super();

    // Cargamos los modelos

    this.cristal = new MyModel("../models/cristal.obj","../models/cristal.mtl", 0xF9C80E, 0.5);
    this.carroceria = new MyModel("../models/carroceria.obj","../models/carroceria.mtl", 0xFF3864);
    this.partesNegras = new MyModel("../models/partesNegras.obj","../models/partesNegras.mtl", 0x2E2157);
    this.soportes = new MyModel("../models/partesSoporte.obj","../models/partesSoporte.mtl");

    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.cristal);
    this.add (this.soportes);
    this.add (this.partesNegras);
    this.add (this.carroceria);

    // Creamos una luz orientada hacia delante para simular unos faros
    this.spotLight = new THREE.SpotLight( 0xffffff, 0.5, 150 );
    this.spotLight.position.set( 0, 2, 0 );
    this.spotLight.target.position.set( 0, 0, 2 );
    this.spotLight.angle = Math.PI/6;
    this.add (this.spotLight);

    this.invulnerabilidad = false;
    this.vidaCogida = false;

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
    this.velocidad = 1.0;
    this.tiempoAnterior = Date.now();
  }

  updateGeometry () {
    this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
  }

  getMesh() {
     return this.mesh;
 }

   hacerMotoInvisible () {
      this.carroceria.traverse( function ( child ) {
         if ( child instanceof THREE.Mesh ) {
            child.material.opacity = 0.2;
         }
      } );

      this.partesNegras.traverse( function ( child ) {
         if ( child instanceof THREE.Mesh ) {
            child.material.opacity = 0.2;
         }
      } );

      this.soportes.traverse( function ( child ) {
         if ( child instanceof THREE.Mesh ) {
            child.material.opacity = 0.2;
         }
      } );
   }

   hacerMotoVisible () {
      this.carroceria.traverse( function ( child ) {
         if ( child instanceof THREE.Mesh ) {
            child.material.opacity = 1;
         }
      } );

      this.partesNegras.traverse( function ( child ) {
         if ( child instanceof THREE.Mesh ) {
            child.material.opacity = 1;
         }
      } );

      this.soportes.traverse( function ( child ) {
         if ( child instanceof THREE.Mesh ) {
            child.material.opacity = 1;
         }
      } );
   }

   update () {

     var tiempoActual = Date.now();
     var segundosTranscurridos = (tiempoActual - this.tiempoAnterior) / 1000;

     // Opciones de movimiento
     if(this.left){

        this.primeraEjecucion = true;
        if(this.position.x <= 43){
           this.position.x += segundosTranscurridos*27*this.velocidad;
           if (this.rotation.z > -0.3) {
             this.rotation.z -= segundosTranscurridos*4;
           }
        }
     }
     else if(this.right){
        this.primeraEjecucion = true;
        if(this.position.x >= -43){
          this.position.x -= segundosTranscurridos*27*this.velocidad;
          if (this.rotation.z < 0.3) {
            this.rotation.z += segundosTranscurridos*4;
          }
        }
     }
     else {

       this.rotation.z = 0;
     }
    this.tiempoAnterior = tiempoActual;

  }
}
