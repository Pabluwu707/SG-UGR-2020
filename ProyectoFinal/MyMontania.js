
class MyMontania extends THREE.Object3D {
  constructor() {
    super();

    var clase = this;

    // Instanciamos un MTLLoader y OBJLoader
    var objLoader = new THREE.OBJLoader();


    var materials = new THREE.MeshToonMaterial({color: 0x090951});

    // Función de carga del objeto
    objLoader.load(
       // URL del objeto a cargar
       "../models/montania.obj",

       // Función callback invocada una vez se termina de cargar el objeto
       function ( object ) {
          object.traverse( function( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material = materials;
                var edges = new THREE.EdgesGeometry( child.geometry );
                var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x04fefd } ) );
 					 line.material.opacity = 0.40;
					 line.material.transparent = true;
                clase.add( line );
            }
          } );


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


    this.rotation.y += Math.PI/2;

    this.userData = this;

    this.left = false;
    this.right = false;
    this.forward = false;
    this.backward = false;

  }

  update () {
  }
}
