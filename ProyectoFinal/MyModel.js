
class MyModel extends THREE.Object3D {
  constructor(urlObj, urlMat, gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    // Esto es una Mickey-herramienta que utilizaremos más adelante
    var clase = this;

    // Instanciamos un MTLLoader y OBJLoader
    var mtlLoader = new THREE.MTLLoader();
    var objLoader = new THREE.OBJLoader();

    // Función de carga de materiales (cargamos los materiales y después objetos)
    mtlLoader.load(
       // URL del material a usar
       urlMat,

       // Función invocada tras cargar materiales
       function(materials) {
          objLoader.setMaterials(materials);

          // Función de carga del objeto
          objLoader.load(
             // URL del objeto a cargar
             urlObj,

             // Función callback invocada una vez se termina de cargar el objeto
             function ( object ) {
            	 clase.add( object );
             },

             // Funcion invocada mientras se carga el objeto
             function ( xhr ) {
             	 console.log( ( xhr.loaded / xhr.total * 100 ) + '% cargado' );
             },

             // Función invocada en caso de error
             function ( error ) {
            	 console.log( 'Se ha producido en error' );
             }
          );
       }
    );

    this.userData = this;

    this.left = false;
    this.right = false;
    this.forward = false;
    this.backward = false;

  }

  createGUI (gui,titleGui) {
    // Controles
    this.guiControls = new function () {
      this.giroContinuo = false;
    }

    // Se crea una sección para los controles
    var that = this;
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    folder.add (this.guiControls, 'giroContinuo').name ('Giro continuo: ').listen();
  }

  update () {
    if (this.guiControls.giroContinuo)
      this.rotation.y += 0.006;

    if (this.left)
      this.position.x += 0.1;

    if (this.right)
      this.position.x -= 0.1;

    if (this.forward)
      this.position.z += 0.5;

    if (this.backward)
      this.position.z -= 0.2;
  }
}
