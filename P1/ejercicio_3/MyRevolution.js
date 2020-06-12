
class MyRevolution extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    this.points = [];
    this.points.push (new THREE.Vector3 (0.0, -1.4, 0.0));
    this.points.push (new THREE.Vector3 (1.0, -1.4, 0.0));
    this.points.push (new THREE.Vector3 (1.0, -1.1, 0.0));
    this.points.push (new THREE.Vector3 (0.5, -0.7, 0.0));
    this.points.push (new THREE.Vector3 (0.4, -0.4, 0.0));
    this.points.push (new THREE.Vector3 (0.4, 0.5, 0.0));
    this.points.push (new THREE.Vector3 (0.5, 0.6, 0.0));
    this.points.push (new THREE.Vector3 (0.3, 0.6, 0.0));
    this.points.push (new THREE.Vector3 (0.5, 0.8, 0.0));
    this.points.push (new THREE.Vector3 (0.55, 1.0, 0.0));
    this.points.push (new THREE.Vector3 (0.5, 1.2, 0.0));
    this.points.push (new THREE.Vector3 (0.3, 1.4, 0.0));
    this.points.push (new THREE.Vector3 (0.0, 1.45, 0.0));

    var lineGeometry = new THREE.Geometry();
    lineGeometry.vertices = this.points;
    var unMaterial = new THREE.MeshNormalMaterial();
    var geometry = new THREE.LatheGeometry(this.points,3,0,1);
    this.peon = new THREE.Mesh (geometry, unMaterial);
    this.add (this.peon);
  }

  createGUI (gui,titleGui) {
    // Controles para la orientación y la resoluciçon
    this.guiControls = new function () {
      this.resolution = 3.0;
      this.angle = 1.0



      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.resolution = 3.0;
        this.angle = 1.0

      }
    }

    // Se crea una sección para los controles
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'resolution', 3.0, 20.0, 1.0).name ('Resolucion : ').listen();
    folder.add (this.guiControls, 'angle', 0.1, 6.3, 0.1).name ('Angulo : ').listen();


    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.peon.geometry = new THREE.LatheGeometry(this.points,this.guiControls.resolution,0,this.guiControls.angle);
  }
}
