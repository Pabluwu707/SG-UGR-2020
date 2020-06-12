
class MyRevolutionCompleto extends THREE.Object3D {
  constructor(linea) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz

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

    var unMaterial = new THREE.MeshNormalMaterial();
    if(linea){
      var geometry = new THREE.Geometry();
      geometry.vertices = this.points;
      this.peon = new THREE.Line (geometry, unMaterial);
    }
    else{
      var geometry = new THREE.LatheGeometry(this.points);
      this.peon = new THREE.Mesh (geometry, unMaterial);
    }
    this.add (this.peon);
  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación

  }
}
