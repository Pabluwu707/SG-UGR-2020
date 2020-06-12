
class MyModel extends THREE.Object3D {
  constructor(urlObj, urlMat, colorMaterial = 0x000000, opacity = 1, colorLinea = 0xFFFFFF) {
    super();

    var clase = this;

    // Instanciamos un MTLLoader y OBJLoader
    var objLoader = new THREE.OBJLoader();


    var materials = new THREE.MeshToonMaterial({color: colorMaterial});

    materials.transparent = true;
    materials.opacity = opacity;

    var mesh;

    // Función de carga del objeto
    objLoader.load(
       // URL del objeto a cargar
       urlObj,

       // Función callback invocada una vez se termina de cargar el objeto
       function ( object ) {
          object.traverse( function( child ) {
            if ( child instanceof THREE.Mesh ) {
               child.material = materials;

               // Líneas de distinto color
               var edges = new THREE.EdgesGeometry( child.geometry );
               var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: colorLinea } ) );
               line.material.opacity = 0.20;
               line.material.transparent = true;
               clase.add( line );
            }
          } );

          mesh = object;

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

    this.elmesh = mesh;

    this.userData = this;

    this.left = false;
    this.right = false;
    this.forward = false;
    this.backward = false;

  }

   getMesh() {
       return this.elmesh;
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
