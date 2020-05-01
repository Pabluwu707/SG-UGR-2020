
class MyPendulo extends THREE.Object3D {
  constructor(gui,titleGui,titleGui2) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui,titleGui2);

    var matVer = new THREE.MeshPhongMaterial({color: 0x52CE26});
    var matVerD = new THREE.MeshPhongMaterial({color: 0x2E930B});
    var matRo = new THREE.MeshPhongMaterial({color: 0xCE2626});
    var matAz = new THREE.MeshPhongMaterial({color: 0x335FD1});

    this.soporteY=0.8;
    this.medY = 1;
    this.miniY = 2;
    this.incrementoPendulo = 1;
    this.incrementoPenduloMini = 1;
    var superior = new THREE.BoxGeometry (0.5,this.soporteY,0.2);
    var medio = new THREE.BoxGeometry (0.5,this.medY,0.2);
    var penduloMini = new THREE.BoxGeometry (0.3,this.miniY,0.1);
    var soporte1 = new THREE.CylinderGeometry(0.16,0.16,0.3,8);
    var soporte2 = new THREE.CylinderGeometry(0.08,0.08,0.3,8);
    soporte1.rotateX(Math.PI/2);
    soporte2.rotateX(Math.PI/2);
    penduloMini.translate(0,-(this.miniY/2)+0.2,0.2);
    soporte2.translate(0,0,0.15)
    var sup = new THREE.Mesh (superior, matVer);
    var sop1 = new THREE.Mesh (soporte1, matVerD);
    this.inf = new THREE.Mesh (superior, matVer);
    this.med = new THREE.Mesh (medio, matRo);
    this.sop2 = new THREE.Mesh (soporte2, matVerD);
    this.mini = new THREE.Mesh (penduloMini, matAz);
    this.med.position.y =-(this.soporteY/2 + this.medY/2);
    this.inf.position.y=this.med.position.y*2;
    this.rotation.z = this.guiControls.rotacion;
    this.sop2.position.y = -(this.soporteY/2 + this.medY*10/100);
    this.add (sup);
    this.add (sop1);
    this.add (this.inf);
    this.add (this.med);
    this.add (this.sop2);
    this.add (this.mini);

    this.tiempoAnterior = Date.now();
  }

  createGUI (gui,titleGui,titleGui2) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.escala = 1.0;
      this.rotacion = 0.0;
      this.rotacionMini = 0.0;
      this.posicionMini = 1.0;
      this.escalaMini = 1.0;
      this.animacion1 = false;
      this.animacion2 = false;
      this.velocidad1 = 0.0;
      this.velocidad2 = 0.0;

      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.escala = 1.0;
        this.rotacion = 0.0;
        this.rotacionMini = 0.0;
        this.posicionMini = 10.0;
        this.escalaMini = 1.0;


      }

      this.reset2 = function () {
        this.animacion1 = false;
        this.animacion2 = false;
        this.velocidad1 = 0.0;
        this.velocidad2 = 0.0;


      }
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'escala', 1.0, 2.0, 0.1).name ('Escala : ').listen();
    folder.add (this.guiControls, 'rotacion', -0.8, 0.8, 0.1).name ('Giro : ').listen();
    folder.add (this.guiControls, 'rotacionMini', -0.8, 0.8, 0.1).name ('GiroMini : ').listen();
    folder.add (this.guiControls, 'posicionMini', 10.0, 90.0, 1.0).name ('PosicionMini : ').listen();
    folder.add (this.guiControls, 'escalaMini', 1.0, 2.0, 0.1).name ('EscalaMini : ').listen();


    folder.add (this.guiControls, 'reset').name ('[ Reset ]');

    var folder2 = gui.addFolder (titleGui2);

    folder2.add (this.guiControls, 'animacion1').name ('Péndulo 1 : ');
    folder2.add (this.guiControls, 'velocidad1', 0.0, 2.0, 0.05).name ('Velocidad (Rads/s) : ').listen();
    folder2.add (this.guiControls, 'animacion2').name ('Péndulo 2 : ');
    folder2.add (this.guiControls, 'velocidad2', 0.0, 2.0, 0.05).name ('Velocidad (Rads/s) : ').listen();
    folder2.add (this.guiControls, 'reset2').name ('[ Reset ]');
  }

  update () {

    this.med.scale.y = this.guiControls.escala;
    this.mini.scale.y = this.guiControls.escalaMini;
    this.med.position.y =-(this.soporteY/2 + this.medY*this.guiControls.escala/2);
    this.inf.position.y = this.med.position.y*2;
    this.mini.position.y = -(this.soporteY/2 + this.medY*this.guiControls.escala*this.guiControls.posicionMini/100+((this.miniY*this.guiControls.escalaMini-this.miniY)/10));
    this.sop2.position.y = -(this.soporteY/2 + this.medY*this.guiControls.escala*this.guiControls.posicionMini/100);



    var tiempoActual = Date.now();
    var segundosTranscurridos = (tiempoActual - this.tiempoAnterior) / 1000;

    if(this.guiControls.animacion1){
      this.rotation.z += this.guiControls.velocidad1 * segundosTranscurridos * this.incrementoPendulo;
      if(this.rotation.z >= 0.8){
        this.incrementoPendulo = -this.incrementoPendulo;
      }
      if(this.rotation.z <= -0.8){
        this.incrementoPendulo = -this.incrementoPendulo;
      }
    }
    else{
      this.rotation.z = this.guiControls.rotacion;
    }
    if(this.guiControls.animacion2){
      this.mini.rotation.z+= this.guiControls.velocidad2 * segundosTranscurridos * this.incrementoPenduloMini;
      if(this.mini.rotation.z >= (0.8)){
        this.incrementoPenduloMini = -this.incrementoPenduloMini;
      }
      if(this.mini.rotation.z <= (-0.8)){
        this.incrementoPenduloMini = -this.incrementoPenduloMini;
      }
    }
    else{
      this.mini.rotation.z = this.guiControls.rotacionMini;
    }

    this.tiempoAnterior = tiempoActual;

}
}
