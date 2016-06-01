var camera, scene, renderer, spotLight;
var spotLightShowLines = false;
var debug = true;
var domEvents;
var orbitControl;
var worldGroups = {};
function initializeScene()
{
	console.log("Function :: initializeScene");
	
	// create a scene, that will hold all our elements such as objects, cameras and lights.
    scene = new THREE.Scene();    
    
    // create a render and set the size
    renderer = new THREE.WebGLRenderer({ alpha: true } );
    
    //renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setClearColor(0x000000,0);
    //renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize( webGLWidth, webGLHeight );
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;
    
    // add the output of the renderer to the html element
    $("#WebGL-output").append(renderer.domElement);
    
    // create a camera, which defines where we're looking at.
    //camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera = new THREE.PerspectiveCamera(45, webGLWidth / webGLHeight, 0.1, 1000);
    
    // position and point the camera to the center of the scene
    camera.position.x = 0;//-20
    camera.position.y = 0;//30//10
    camera.position.z = 22;//20//32
    
    scene.add(camera);
    camera.lookAt(scene.position);
    
    
    orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
    enableCameraControl();
    //disableCameraControl();
    
    setSpotLight(20,20,20,spotLightShowLines);
    setSpotLight(-20,20,20,spotLightShowLines);
    setSpotLight(20,20,-20,spotLightShowLines);
    setSpotLight(-20,20,-20,spotLightShowLines);
    setSpotLight(10,-20,10,spotLightShowLines);
    
    //THREE.Object3D._threexDomEvent.camera(camera);
    domEvents = new THREEx.DomEvents(camera, renderer.domElement)
    
    //addGroundPlane();
    
    var sphereGeom= new THREE.SphereGeometry(0.25,0.25,0.25);
	var sphere= new THREE.Mesh(sphereGeom, new THREE.MeshBasicMaterial({ color: 0x2266dd }));
	scene.add(sphere);
    
	
	cameraCube = new THREE.Mesh( new THREE.BoxGeometry( 3, 3, 3 ), new THREE.MeshBasicMaterial({ color: 0xFF00FF } ) );
	//cameraCube.position.set( -14, 7, -22);
	//camera.add(cameraCube);
	
	//moveObject(CM,-17.64,7.16,0,3000);
	//cameraCube.position.set( -16.64,6.16,0);
	//scene.add(cameraCube);
	
	if(debug) 
    {
        scene.add(new THREE.AxisHelper( 40 ));
    }
	
    onWindowResize();
    
    //render();
	animate();
	
	initialCubeSetup();
	
	document.querySelector("#WebGL-output").addEventListener( 'mousedown', onDocumentMouseDown, false );
}



//RENDER Loop

var step = 0;
function render() 
{
    
    // render using requestAnimationFrame
    //requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function update()
{
	//checkHighlight();
	//checkMouseSphere();
	TWEEN.update();
}

function animate()
{
	requestAnimationFrame( animate );
	render();		
	update();
}

function onWindowResize() 
{
	console.log("Function :: onWindowResize");
		
	webGLWidth = $('#WebGL-output').innerWidth();
	webGLHeight = $('#WebGL-output').innerHeight();
	
	windowHalfX = webGLWidth / 2;
	windowHalfY = webGLHeight / 2;
	
	//camera.aspect = window.innerWidth / window.innerHeight;
	camera.aspect = webGLWidth / webGLHeight;
	camera.updateProjectionMatrix();
	
	//renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setSize( webGLWidth, webGLHeight );
}

function setSpotLight(X,Y,Z,spotLightShowLines)
{
	// add subtle ambient lighting
    // var ambientLight = new THREE.AmbientLight(0x0c0c0c);
    // scene.add(ambientLight);

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xA1A1A1,2);
    //spotLight.position.set(-10, 15, 0);
    spotLight.position.set(X,Y,Z);
    spotLight.angle = 0.5;
    spotLight.distance = 70;
    spotLight.exponent = 1;
    spotLight.target.position.set( 0, 0, 0 );
    spotLight.castShadow = true;
    spotLight.shadowDarkness = 0.5;
    spotLight.shadowCameraVisible = spotLightShowLines;
    scene.add(spotLight);
    //scene.add(new THREE.PointLightHelper(spotLight, 1));
}

function addGroundPlane()
{
	console.log("Function :: addGroundPlane");
	// create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(50, 40, 1, 1);
    var planeMaterial = new THREE.MeshBasicMaterial({color: 0xfefefa, side: THREE.DoubleSide});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    
    // rotate and position the plane
    plane.rotation.x = degToRad(-90);
    plane.position.x = 0;
    plane.position.y = -7;
    plane.position.z = -2;

    // add the plane to the scene
    scene.add(plane);
}

function enableCameraControl()
{
	orbitControl.noRotate = false;
}

function disableCameraControl()
{
	orbitControl.noRotate = true;
}

function degToRad(degrees)
{
	return degrees * Math.PI / 180;
}

function radToDeg(angle) 
{
	return angle * (180 / Math.PI);
}

//screenToWorld(cameraCube.position)
/*function screenToWorld(_screenPos)
{
	var worldPos = _screenPos.clone();
    worldPos.x = worldPos.x / windowHalfX - 1;
    worldPos.y = - worldPos.y / windowHalfY + 1;
    //var projector = new THREE.Projector();
    //projector.unprojectVector( worldPos, camera );
    worldPos.unproject( camera );
    return worldPos; 
}

function toScreenXY(position, camera, jqdiv)
{
	var pos = position.clone();
	var projScreenMat = new THREE.Matrix4();
	projScreenMat.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );
	projScreenMat.multiplyVector3( pos );
	return { x: ( pos.x + 1 ) * jqdiv.width() / 2 + jqdiv.offset().left,
			 y: ( - pos.y + 1) * jqdiv.height() / 2 + jqdiv.offset().top };
}*/

//getXY(cameraCube)
function getXY(obj3d)
{
	var widthHalf = webGLWidth / 2, heightHalf = webGLHeight / 2;

	var vector = new THREE.Vector3();
	var projector = new THREE.Projector();
	projector.projectVector( vector.setFromMatrixPosition( obj3d.matrixWorld ), camera );
	
	//vector.setFromMatrixPosition(obj3d.matrixWorld);
    //vector.project(camera);
	
	vector.x = ( vector.x * widthHalf ) + widthHalf;
	vector.y = - ( vector.y * heightHalf ) + heightHalf;
	console.log('vector',vector);
}

function get3dCood(X,Y)
{
	var vector = new THREE.Vector3();

	/*vector.set(
	    ( event.clientX / window.innerWidth ) * 2 - 1,
	    - ( event.clientY / window.innerHeight ) * 2 + 1,
	    0.5 );*/
	
	vector.set(
		    ( X / window.innerWidth ) * 2 - 1,
		    - (Y / window.innerHeight ) * 2 + 1,
		    0.5 );

	vector.unproject( camera );

	var dir = vector.sub( camera.position ).normalize();

	var distance = - camera.position.z / dir.z;

	var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
	console.log('pos',pos);
	return pos;
}

//moveObject(CM,-17.64,7.16,0,3000);
function onDocumentMouseDown(event)
{
	
	mouseSelectX = event.clientX - $('#canvas-container').position().left;
	mouseSelectY = event.clientY - $('#canvas-container').position().top;
	console.log('mouseSelectX',mouseSelectX);
	console.log('mouseSelectY',mouseSelectY);
	get3dCood(mouseSelectX,mouseSelectY);
}