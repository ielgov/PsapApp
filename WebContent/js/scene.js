//
var container, stats;

var camera, scene, renderer;

var orbitControl;

var spotLight;

var group, text, plane;

var webGLWidth, webGLHeight;

var allCubes = [];

var targetRotationX = 0;
var targetRotationOnMouseDownX = 0;

var targetRotationY = 0;
var targetRotationOnMouseDownY = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var mouseY = 0;
var mouseYOnMouseDown = 0;

//var windowHalfX = window.innerWidth / 2;
//var windowHalfY = window.innerHeight / 2;
var windowHalfX, windowHalfY;

var finalRotationY;



var mouseSphereCoords = null;
var mouseSphere=[];

var cubenum = 1;

var dynamicTextures = [];
var dimensions = 3;
var cubeSize = 3, spacing = 0.2;
var increment = cubeSize + spacing;
var maxExtent = (cubeSize * dimensions + spacing * (dimensions - 1)) / 2;
var positionOffset = (dimensions - 1) / 2;

var CUBE_SIZE = 3;
var GAP_BETWEEN_CUBES = 0.2;


/*var colours = [0xC41E3A, 0x009E60, 0x0051BA, 0xFF5800, 0xFFD500, 0xFFFFFF];
var faceMaterials = colours.map(function(c) 
		{
			return new THREE.MeshBasicMaterial({ color: c , ambient: c });
		});
var cubeMaterials = new THREE.MeshFaceMaterial(faceMaterials);*/
var cubeMaterials, faceMaterials;
var domEvents;
var clickVector, clickFace;

var currentDynTexCount = 0;

var spotLightShowLines = false;
var debug = false;

function initializeScene()
{
	console.log("Function :: initializeScene");
	//stats = initStats();

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    //camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera = new THREE.PerspectiveCamera(45, $('#WebGL-output').innerWidth() / $('#WebGL-output').innerHeight(), 0.1, 1000);

    // create a render and set the size
    renderer = new THREE.WebGLRenderer({ alpha: true } );

    //renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setClearColor(0x000000,0);
    //renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize( $('#WebGL-output').innerWidth(), $('#WebGL-output').innerHeight() );
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;
    
    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(50, 40, 1, 1);
    var planeMaterial = new THREE.MeshBasicMaterial({color: 0xfefefa, side: THREE.DoubleSide});
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // rotate and position the plane
    plane.rotation.x = degToRad(-90);
    plane.position.x = 0;
    plane.position.y = -7;
    plane.position.z = -2;

    // add the plane to the scene
    //scene.add(plane);

    // position and point the camera to the center of the scene
    camera.position.x = 0;//-20
    camera.position.y = 0;//30//10
    camera.position.z = 22;//20//32
    camera.lookAt(scene.position);
    
    //THREE.Object3D._threexDomEvent.camera(camera);
    domEvents = new THREEx.DomEvents(camera, renderer.domElement)
    
    orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
    disableCameraControl();
    
    setSpotLight(20,20,20,spotLightShowLines);
    setSpotLight(-20,20,20,spotLightShowLines);
    setSpotLight(20,20,-20,spotLightShowLines);
    setSpotLight(-20,20,-20,spotLightShowLines);
    setSpotLight(10,-20,10,spotLightShowLines);
    // add the output of the renderer to the html element
    $("#WebGL-output").append(renderer.domElement);

    window.group = new THREE.Group();
        
    scene.add(group);
    
    var newSphereGeom= new THREE.SphereGeometry(0.25,0.25,0.25);
	var sphere= new THREE.Mesh(newSphereGeom, new THREE.MeshBasicMaterial({ color: 0x2266dd }));
	scene.add(sphere);
	mouseSphere.push(sphere);
    
    if(debug) 
    {
        scene.add(new THREE.AxisHelper( 40 ));
    }
    
    document.querySelector("#WebGL-output").addEventListener( 'mousedown', onDocumentMouseDown, false );
    //document.querySelector("#WebGL-output").addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.querySelector("#WebGL-output").addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.querySelector("#WebGL-output").addEventListener( 'touchmove', onDocumentTouchMove, false );
    
    
    onWindowResize();
		
	//render();
	animate();
	
	//drawRubiksCube(appData['level-two']);
}


function onWindowResize() 
{
	console.log("Function :: onWindowResize");
	//camera.aspect = window.innerWidth / window.innerHeight;
	camera.aspect = $('#WebGL-output').innerWidth() / $('#WebGL-output').innerHeight();
	camera.updateProjectionMatrix();
	//renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setSize( $('#WebGL-output').innerWidth(), $('#WebGL-output').innerHeight() );
	
	webGLWidth = $('#WebGL-output').innerWidth();
	webGLHeight = $('#WebGL-output').innerHeight();
	
	windowHalfX = webGLWidth / 2;
	windowHalfY = webGLHeight / 2;
}

function setSpotLight(X,Y,Z,spotLightShowLines)
{
	// add subtle ambient lighting
    // var ambientLight = new THREE.AmbientLight(0x0c0c0c);
    // scene.add(ambientLight);

    // add spotlight for the shadows
    spotLight = new THREE.SpotLight(0xA1A1A1,2);
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

function initStats() 
{
    var stats = new Stats();

    stats.setMode(0); // 0: fps, 1: ms

    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    $("#Stats-output").append(stats.domElement);

    return stats;
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

var CC,CCe;

function setCubeClicks(cube)
{
	//console.log("Function :: setCubeClicks");
	/*cube.on('mousedown', function(e) {
	onCubeMouseDown(e, cube);
	});*/
	
	domEvents.addEventListener(cube, 'mousedown', function(event){
		console.log('cube mousedown - cube = ',cube);
		CC = cube;
		CCe = event;
		onCubeMouseDown(event, cube);
	}, false);
	
	domEvents.addEventListener(cube, 'mouseover', function(event){
		console.log('cube mouseover - cube = '/*,cube*/);
	}, false);
	
	domEvents.addEventListener(cube, 'mouseup', function(event){
		console.log('cube mouseup - cube = '/*,cube*/);
		onCubeMouseUp(event, cube);
	}, false);
	
	domEvents.addEventListener(cube, 'mouseout', function(event){
		console.log('cube mouseout - cube = '/*,cube*/);
		onCubeMouseOut(event, cube);
	}, false);
}


/*
Each type of Piece (edge, center, corner) has a unique coordinate pattern. 
For a 3x3 cube, 
		a corner piece has no zeros in its position vector ((-1, 1, 1)), 
		an edge has exactly one zero ((1, 0, -1)), and 
		a center piece has two zeroes ((-1, 0, 0))

*/
//drawRubiksCube(appData['level-one']);
var currCubeDimensions=0;
var numberOfCells = 0;
function drawRubiksCube(appDataObj)
{
	console.log("Function :: drawRubiksCube");
	//First cube is of dimensions 2, for categories
    //Textures set to 4 categories
	window.rCubeData = getData(appDataObj);
	console.log('Data to be populated on Rubiks cube - ',rCubeData);
	appDataObj['data'] = rCubeData;
	window.ADO = appDataObj;
	
	appDataObj['positionOffset'] = (appDataObj['dimensions'] - 1) / 2;
	appDataObj['cubes'] = [];
	currCubeDimensions = appDataObj['dimensions'];
	
	if (currCubeDimensions == 2)
		numberOfCells = 4;
	else if (currCubeDimensions == 3)
		numberofCells = 8;
    drawAllCubesNew(appDataObj);
}
var cornerCubes = [];
var edgeCubes = [];
var centerCubes = [];

//key : value = cubenum : solution number (starts with 0)
var dim2SolMap = {	'1':0,'2':1,'3':2,'4':3,'5':1,'6':0,'7':3,'8':2};

//For dimension 3
//corner cubes = [1, 3, 7, 9, 19, 21, 25, 27]
//edge cubes = [2, 4, 6, 8, 10, 12, 16, 18, 20, 22, 24, 26]
//center cubes = [5, 11, 13, 15, 17, 23]
//key : value = cubenum (starts with 1) : solution number (starts with 0)
var dim3SolMap = {	'1':0,'2':4,'3':1,'4':5,'5':8,'6':6,'7':2,'8':7,'9':3,
					'10':4,'11':8,'12':7,'13':8,'14':9,'15':8,'16':7,'17':8,'18':4,
					'19':3,'20':7,'21':2,'22':6,'23':8,'24':5,'25':1,'26':4,'27':0,
					};

var rowNumber=0, columnNumber=0;
var cellsOccupied = 0;

function get_cube_mesh(init_x_loc, init_y_loc, init_z_loc, cubeNum, appDataObj) 
{
	//console.warn('x = '+ init_x_loc + ' | y = ' + init_y_loc + ' | z = ' + init_z_loc + ' | cubenum = ' + cubeNum);
		  
    var materials = [];
    //var color_px = "red", color_nx = "orange", color_py = "green", color_ny = "blue", color_pz = "yellow", color_nz = "white";
    var color_px = "black", color_nx = "black", color_py = "black", color_ny = "black", color_pz = "black", color_nz = "black";
	 //var middle = (dimensions-1)/2;//1
    var min = 0;
    var max = appDataObj['dimensions']-1;
    
    var colorMaterials = [];
    var colorNames = [];
   
    if(init_x_loc == max) {
        color_px = 0xa5a8ab;//yellow
        colorMaterials.push(0);
        colorNames.push('yellow');
       
    }

    if(init_x_loc == 0) {
        color_nx = 0xa5a8ab;//white
        colorMaterials.push(1);
        colorNames.push('white');
        
    }
    
    if(init_y_loc == max) {
        color_py = 0xa5a8ab;//blue
        colorMaterials.push(2);
        colorNames.push('blue');
      
    }

    if(init_y_loc == 0) {
        color_ny = 0xa5a8ab;//orange
        colorMaterials.push(3);
        colorNames.push('orange');
        
    }

    if(init_z_loc == max) {
        color_nz = 0xa5a8ab;//green
        colorMaterials.push(4);
        colorNames.push('green');
        
    }

    if(init_z_loc == 0) {
        color_pz = 0xa5a8ab;//red
        colorMaterials.push(5);
        colorNames.push('red');
       
    }
    
    
    //debugger;
    var cubeType = '';
    var singleExtFace = false;
    
    if (colorMaterials.length == 0)
    {
    	cubeType = 'center of rubiks';
    	console.log(cubeNum + ' is center of rubiks');
    }
    else if (colorMaterials.length == 1)
    {
    	singleExtFace = true;
    	console.log(cubeNum + ' has single exterior face cube / center cube');
    	cubeType = 'center';
    	console.log(cubeNum + ' is center cube');
    	centerCubes.push(cubeNum);
    }
    else if (colorMaterials.length == 2)
    {
    	cubeType = 'middle';
    	console.log(cubeNum + ' is middle/edge cube');
    	edgeCubes.push(cubeNum);
    }
    else if (colorMaterials.length == 3)
    {
    	cubeType = 'corner';
    	console.log(cubeNum + ' is corner cube');
    	cornerCubes.push(cubeNum);
    }
    
    window.solutionMapping = undefined;
    if (appDataObj['dimensions'] == 2)
    {
    	solutionMapping = dim2SolMap;
    }
    else if (appDataObj['dimensions'] == 3)
    {
    	solutionMapping = dim3SolMap;
    }
    
    var faceText = {};
    if (solutionMapping[cubeNum] >= appDataObj['data'].length)
    {
    	faceText['Display'] = 'Center';
    	faceText['Name'] = 'Center';
        console.log('data for cubenum - ' + cubeNum + ' = ' + faceText['Display']);
    }
    else
    {
    	faceText = appDataObj['data'][solutionMapping[cubeNum]];
        console.log('data for cubenum - ' + cubeNum + ' = ' + faceText['Display']);
    }
    
    var dynamicTexture	= new THREEx.DynamicTexture(512,512)
	//dynamicTexture.context.font	= "bold "+(0.2*512)+"px Arial";
	dynamicTexture.texture.anisotropy = renderer.getMaxAnisotropy();
	// update the text
	dynamicTexture.clear('white')
	// dynamictexture.drawText('Hello', undefined, 256, 'red')
	dynamicTexture.drawTextCooked({
		text		: faceText['Display'],//cubeNum.toString(),//faceText['Name'],//
		lineHeight	: 0.2,
		fillStyle	: 'black',
		align		: 'center',
		font		: "bold "+(0.2*512)+"px Arial",
	}); 
	
	materials.push(new THREE.MeshLambertMaterial({color: color_px, map: dynamicTexture.texture})); //plane whose normal is + X-axis (right in the screen)
    materials.push(new THREE.MeshLambertMaterial({color: color_nx, map: dynamicTexture.texture})); //plane whose normal is - X-axis
    materials.push(new THREE.MeshLambertMaterial({color: color_py, map: dynamicTexture.texture})); //plane whose normal is + Y-axis (up in the screen)
    materials.push(new THREE.MeshLambertMaterial({color: color_ny, map: dynamicTexture.texture})); //plane whose normal is - Y-axis
    materials.push(new THREE.MeshLambertMaterial({color: color_nz, map: dynamicTexture.texture})); //plane whose normal is + Z-axis (coming out of screen)
    materials.push(new THREE.MeshLambertMaterial({color: color_pz, map: dynamicTexture.texture})); //plane whose normal is - Z-axis
    
    //texture = THREE.ImageUtils.loadTexture('crate.gif'),
    var geometry = new THREE.BoxGeometry( CUBE_SIZE, CUBE_SIZE, CUBE_SIZE ,1,1,1);

    var material = new THREE.MeshFaceMaterial(materials);
    
    var material1 =  new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("images/IBM_logo.svg")});
   
    //var texture2 = new THREE.Texture(canvas);
    //texture2.needsUpdate = true;
    //texture2.minFilter=THREE.LinearFilter;
    //var material2 = new THREE.MeshLambertMaterial( {map: texture2, color: 0x00ff00} );
    //material2.transparent = false;

    var cube = new THREE.Mesh(geometry, material);

    //console.warn(color_px, color_nx , color_py , color_ny , color_pz , color_nz);
    cube.$colorMaterials = colorMaterials;
    cube.$colorNames = colorNames;
    appDataObj['cubes'].push(cube);
    
    return cube;
}

function drawAllCubesNew(appDataObj)
{
	console.log("Function :: drawAllCubesNew");
	for(var x_loc = 0; x_loc < appDataObj['dimensions']; x_loc++) 
	{
        for(var y_loc = 0; y_loc < appDataObj['dimensions']; y_loc++) 
        {
            for(var z_loc = 0; z_loc < appDataObj['dimensions']; z_loc++) 
            {
                var cube_mesh_obj = get_cube_mesh(x_loc, y_loc, z_loc, cubenum, appDataObj);

                cube_mesh_obj.position.x = (x_loc - appDataObj['positionOffset'])*(CUBE_SIZE + GAP_BETWEEN_CUBES);
                cube_mesh_obj.position.y = (y_loc - appDataObj['positionOffset'])*(CUBE_SIZE + GAP_BETWEEN_CUBES);
                cube_mesh_obj.position.z = (z_loc - appDataObj['positionOffset'])*(CUBE_SIZE + GAP_BETWEEN_CUBES);
                //console.log(cube_mesh_obj.position);
                cube_mesh_obj.castShadow = true;
                cube_mesh_obj.receiveShadow = false;
                //cube.position = new THREE.Vector3(x, y, z);
                //cube_mesh_obj.position.copy(new THREE.Vector3(init_x_loc, init_y_loc, init_z_loc).clone());
                cube_mesh_obj.rubikPosition = cube_mesh_obj.position.clone();
                cube_mesh_obj.$cubenum = cubenum;
                
                cubenum++;

                //cube_wrappers.push(new cube_wrapper(x_loc, y_loc, z_loc, cube_mesh_obj));

                setCubeClicks(cube_mesh_obj);
                
                //scene.add(cube_mesh_obj);
                
                group.add(cube_mesh_obj);
                
                //scene.add(cube);
                
                allCubes.push(cube_mesh_obj);
            }
        }
    }
}







function drawAllCubesNew_2(appDataObj)
{
	console.log("Function :: drawAllCubesNew");
	for(var x_loc = 0; x_loc < appDataObj['dimensions']; x_loc++) 
	{
        for(var y_loc = 0; y_loc < appDataObj['dimensions']; y_loc++) 
        {
            for(var z_loc = 0; z_loc < appDataObj['dimensions']; z_loc++) 
            {
                var cube_mesh_obj = get_cube_mesh_2(x_loc, y_loc, z_loc, cubenum, appDataObj);
                
                cube_mesh_obj.x = (x_loc - appDataObj['positionOffset'])*(CUBE_SIZE + GAP_BETWEEN_CUBES);
                cube_mesh_obj.y = (y_loc - appDataObj['positionOffset'])*(CUBE_SIZE + GAP_BETWEEN_CUBES);
                cube_mesh_obj.z = (z_loc - appDataObj['positionOffset'])*(CUBE_SIZE + GAP_BETWEEN_CUBES);
                
               
                cube_mesh_obj.$cubenum = cubenum;
                
                globalCubes[cubenum] = cube_mesh_obj;
                
                cubenum++;               
                
            }
        }
    }
}


var globalCubes = {};
function get_cube_mesh_2(init_x_loc, init_y_loc, init_z_loc, cubeNum, appDataObj) 
{
	//console.warn('x = '+ init_x_loc + ' | y = ' + init_y_loc + ' | z = ' + init_z_loc + ' | cubenum = ' + cubeNum);
		  
    var materials = [];
    //var color_px = "red", color_nx = "orange", color_py = "green", color_ny = "blue", color_pz = "yellow", color_nz = "white";
    var color_px = "black", color_nx = "black", color_py = "black", color_ny = "black", color_pz = "black", color_nz = "black";
	 //var middle = (dimensions-1)/2;//1
    var min = 0;
    var max = appDataObj['dimensions']-1;
    
    var colorMaterials = [];
    var colorNames = [];
    var cubeObj = {};
    cubeObj['colorFaces'] = [];
    if(init_x_loc == max) {
        color_px = 'yellow';//0xa5a8ab;//yellow
        colorMaterials.push(0);
        colorNames.push('yellow');
        cubeObj['colorFaces'].push('yellow');
    }

    if(init_x_loc == 0) {
        color_nx = 'white';//0xa5a8ab;//white
        colorMaterials.push(1);
        colorNames.push('white');
        cubeObj['colorFaces'].push('white');
    }
    
    if(init_y_loc == max) {
        color_py = 'blue';//0xa5a8ab;//blue
        colorMaterials.push(2);
        colorNames.push('blue');
        cubeObj['colorFaces'].push('blue');
    }

    if(init_y_loc == 0) {
        color_ny = 'orange';//0xa5a8ab;//orange
        colorMaterials.push(3);
        colorNames.push('orange');
        cubeObj['colorFaces'].push('orange');
    }

    if(init_z_loc == max) {
        color_nz = 'green';//0xa5a8ab;//green
        colorMaterials.push(4);
        colorNames.push('green');
        cubeObj['colorFaces'].push('green');
    }

    if(init_z_loc == 0) {
        color_pz = 'red';//0xa5a8ab;//red
        colorMaterials.push(5);
        colorNames.push('red');
        cubeObj['colorFaces'].push('red');
    }
    
    //debugger;
    var cubeType = '';
    var singleExtFace = false;
    
    if (colorMaterials.length == 0)
    {
    	cubeType = 'center of rubiks';
    	console.log(cubeNum + ' is center of rubiks');
    }
    else if (colorMaterials.length == 1)
    {
    	singleExtFace = true;
    	console.log(cubeNum + ' has single exterior face cube / center cube');
    	cubeType = 'center';
    	console.log(cubeNum + ' is center cube');
    	centerCubes.push(cubeNum);
    }
    else if (colorMaterials.length == 2)
    {
    	cubeType = 'middle';
    	console.log(cubeNum + ' is middle/edge cube');
    	edgeCubes.push(cubeNum);
    }
    else if (colorMaterials.length == 3)
    {
    	cubeType = 'corner';
    	console.log(cubeNum + ' is corner cube');
    	cornerCubes.push(cubeNum);
    }
       
    var cube = {};

    cube.$colorMaterials = colorMaterials;
    cube.$colorNames = colorNames;
    cube.$cubeObj = cubeObj;
    return cube;
}



function nearlyEqual(a, b, d) 
{
    d = d || 0.001;
    return Math.abs(a - b) <= d;
}




//RENDER Loop

var step = 0;
function render() {
    //stats.update();
    
    //rubik cube rotation
    //group.rotation.y = step += 0.01;
    
	//horizontal rotation   
	group.rotation.y += ( targetRotationX - group.rotation.y ) * 0.1;//0.1//0.25
	   
	//vertical rotation 
	finalRotationY = (targetRotationY - group.rotation.x);	
	    
	if (group.rotation.x <= 1 && group.rotation.x >= -1) 
	{	
	   group.rotation.x += finalRotationY * 0.1;
	}
	   
	/*if (group.rotation.x > 1) 
	{	
	   group.rotation.x = 1;
	}
	else if (group.rotation.x < -1) 
	{	
	   group.rotation.x = -1;
	}*/
	if (group.rotation.x > 0.5) 
	{	
	   group.rotation.x = 0.5;
	}
	else if (group.rotation.x < -0.5) 
	{	
	   group.rotation.x = -0.5;
	}

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

function getTexture()
{
	console.log("Function :: getTexture");
	canvas = document.getElementById("textureCanvas");
	context = canvas.getContext('2d');
	canvas.width  = 1024;
	canvas.height = 1024;
	var html="<span style='color:red;font-size:48px;font-weight:bold;'>some text = hello world!!</span>";
	rasterizeHTML.drawHTML(html).then(function (renderResult) {
	    context.drawImage(renderResult.image, 1024, 1024);
	}, function(error){
		console.log('error - ',error);
	});
}