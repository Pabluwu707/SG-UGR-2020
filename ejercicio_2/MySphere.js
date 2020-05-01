
class MySphere extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    // Un Mesh se compone de geometría y material
    var sphereGeom = new THREE.SphereGeometry( 1, 9, 6 );
    // Como material se crea uno a partir de un color
    var sphereMat = new THREE.MeshNormalMaterial();

    // Ya podemos construir el Mesh
    this.sphere = new THREE.Mesh (sphereGeom, sphereMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.sphere);

    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
  }

  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.radius = 1.0;
      this.ecuator = 9.0;
      this.meridian =6.0;


      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.radius = 1.0;
        this.ecuator = 9.0;
        this.meridian =6.0;

      }
    }

    // Se crea una sección para los controles de la caja
    var objeto = this;
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'radius', 0.1, 5.0, 0.1).name ('Radio : ').onChange(function(){objeto.updateGeometry()});
    folder.add (this.guiControls, 'ecuator', 3.0, 20.0, 1.0).name ('Res. Ecuador : ').onChange(function(){objeto.updateGeometry()});
    folder.add (this.guiControls, 'meridian', 3.0, 20.0, 1.0).name ('Res. Meridiano : ').onChange(function(){objeto.updateGeometry()});


    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  updateGeometry() {
     this.sphere.geometry = new THREE.SphereGeometry(this.guiControls.radius,this.guiControls.ecuator,this.guiControls.meridian);
  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación

    this.sphere.rotation.z += 0.01;
    this.sphere.rotation.y += 0.01;
    this.sphere.rotation.x += 0.01;
  }
}
