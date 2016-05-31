var cubeData = undefined;
var CUBE_SIZE = 3;
var GAP_BETWEEN_CUBES = 0.2;
var breadCrumsPos = {
		'categories':{
			'screen':{
				'X':100,
				'Y':80
				}
			},
		'solutions':{
			'screen':{
				'X':300,
				'Y':80
				}
		},
		'offerings':{
			'screen':{
				'X':500,
				'Y':80
				}
		}
};
function initialCubeSetup()
{
	console.log("Function :: initialCubeSetup");
	var returnedData = getData(appData['categories']);
	cubeData = appData['categories'];
	cubeData['data'] = returnedData;
	drawRubiksCube(cubeData);
}
function setCubeData(nextLevelDataOBj, currRubiksType)
{
	console.log("Function :: setCubeData");
	console.log('nextLevelDataObj',nextLevelDataOBj);
	console.log('currRubiksType',currRubiksType);
	if (currRubiksType == 'categories')
	{
		//Draw rubiks cube for solutions under this category
		appData['solutions']['getDataFor'] = nextLevelDataOBj;
		var returnedData = getData(appData['solutions']);
		cubeData = appData['solutions'];
		cubeData['data'] = returnedData;
		drawRubiksCube(cubeData);
	}
	else if (currRubiksType == 'solutions')
	{
		//Draw rubiks cube for offerings under this solution
		appData['offerings']['getDataFor'] = nextLevelDataOBj;
		var returnedData = getData(appData['offerings']);
		cubeData = appData['offerings'];
		cubeData['data'] = returnedData;
		drawRubiksCube(cubeData);
	}
	else if (currRubiksType == 'offerings')
	{
		//Get all assets for this offering
		console.log("Show Assets overlay");
	}
}

function drawRubiksCube(cubeData)
{
	console.log("Function :: drawRubiksCube");
	var RC = new RubiksCube(cubeData);
	
	if (!cubeData.hasOwnProperty('RC'))
	{
		console.warn('Draw Rubiks Cube for',cubeData['type']);
		cubeData.RC = RC;
		RC.init();
		
		setTimeout(function(){
			RC.assignDataToFaces();
			setTimeout(function(){
				RC.drawCubies();
			},1000);
		},1000);
	}
	else
	{
		console.warn('Rubiks Cube already drawn for',cubeData['type']);
	}
}

function RubiksCube(options)
{
	var ref = this;
	
	this.options = options;
	this.rubiksCubeType = options.type;
	this.id = options.id || undefined;
	this.dimensions = options.dimensions;
	this.positionOffset = (this.dimensions -1 ) / 2;
	this.cubeSize = options.cubesize || CUBE_SIZE;
	this.gapBetweenCubes = options.gapBetweenCubes || GAP_BETWEEN_CUBES;
	this.cornerCubes = [];
	this.edgeCubes = [];
	this.centerCubes = [];
	this.rubiksCenter = undefined;
	this.cubenum = 1;
	
	this.allCubies = {};
	this.allDrawnCubes = [];
	
	this.faces = {};
	this.cubeData = options.data;
	this.maxNumOfSols = 0;
	
	
	this.textureLineHeight = 0.2;
	this.textureFillStyle = 'black';
	this.textureAlignText = 'center';
	this.textureFont = "bold "+(0.2*512)+"px Arial";
	
	this.init = function(){
		if (this.dimensions == 2)
			this.maxNumOfSols = 4;
		else if (this.dimensions == 3)
			this.maxNumOfSols = 8;
		this.group = new THREE.Group();
		scene.add(this.group);
		worldGroups[this.rubiksCubeType] = this.group;
		
		this.findCubiePosition();
		
	};
	
	//init
	//findCubiePosition()
	//assignDataToFaces()
	//drawCubies()
	
	//drawAllCubesNew
	this.findCubiePosition = function(){
		console.log("Function :: findCubiePosition");
		for(var x_loc = 0; x_loc < ref.dimensions; x_loc++) 
		{
	        for(var y_loc = 0; y_loc < ref.dimensions; y_loc++) 
	        {
	            for(var z_loc = 0; z_loc < ref.dimensions; z_loc++) 
	            {
	            	var cubie = ref.findCubieFaceColors(x_loc, y_loc, z_loc, ref.cubenum);
	            	cubie.position = {};
	            	cubie.position.x = 
	            	cubie.position.x = (x_loc - ref.positionOffset)*(ref.cubeSize + ref.gapBetweenCubes);
	            	cubie.position.y = (y_loc - ref.positionOffset)*(ref.cubeSize + ref.gapBetweenCubes);
	            	cubie.position.z = (z_loc - ref.positionOffset)*(ref.cubeSize + ref.gapBetweenCubes);
	            	
	            	cubie.castShadow = true;
	            	cubie.receiveShadow = false;
	            	
	            	cubie.originalParent = ref.group;
	            	//cubie.originalParentPosition = ref.group.position;
	            	
	            	cubie.$cubenum = ref.cubenum;
	            	ref.allCubies[ref.cubenum] = cubie;
	            	ref.cubenum++;	               
	            }
	        }
	    }
	};
	
	//get_cube_mesh
	this.findCubieFaceColors = function(x,y,z,cubenum){
		console.log("Function :: findCubieFaceColors");
		var cubie = {};
		var min = 0;
		var max = ref.dimensions - 1;
		console.log('min = ' + min + ' | max = ' + max);
		
		var color_px = "black", color_nx = "black", color_py = "black", color_ny = "black", color_pz = "black", color_nz = "black";
		var colorMaterials = [];
	    var colorNames = [];
		
	    if(x == max) 
		{
	        color_px = 0xa5a8ab;//yellow
	        colorMaterials.push(0);
	        colorNames.push('yellow');
	        if (ref.faces.hasOwnProperty('face0') == false)
	        	ref.faces['face0'] = {};
	        ref.faces['face0'][cubenum] = cubie;
	        cubie['color-face0']=color_px;
	    }

	    if(x == 0) 
	    {
	        color_nx = 0xa5a8ab;//white
	        colorMaterials.push(1);
	        colorNames.push('white');
	        if (ref.faces.hasOwnProperty('face1')==false)
	        	ref.faces['face1'] = {};
	        ref.faces['face1'][cubenum] = cubie;
	        cubie['color-face1']=color_nx;
	    }
	    
	    if(y == max) 
	    {
	        color_py = 0xa5a8ab;//blue
	        colorMaterials.push(2);
	        colorNames.push('blue');
	        if (ref.faces.hasOwnProperty('face2')==false)
	        	ref.faces['face2'] = {};
	        ref.faces['face2'][cubenum] = cubie;
	        cubie['color-face2']=color_py;
	    }

	    if(y == 0) 
	    {
	        color_ny = 0xa5a8ab;//orange
	        colorMaterials.push(3);
	        colorNames.push('orange');
	        if (ref.faces.hasOwnProperty('face3')==false)
	        	ref.faces['face3'] = {};
	        ref.faces['face3'][cubenum] = cubie;
	        cubie['color-face3']=color_ny;
	    }

	    if(z == max) 
	    {
	        color_nz = 0xa5a8ab;//green
	        colorMaterials.push(4);
	        colorNames.push('green');
	        if (ref.faces.hasOwnProperty('face4')==false)
	        	ref.faces['face4'] = {};
	        ref.faces['face4'][cubenum] = cubie;
	        cubie['color-face4']=color_nz;
	    }

	    if(z == 0) 
	    {
	        color_pz = 0xa5a8ab;//red
	        colorMaterials.push(5);
	        colorNames.push('red');
	        if (ref.faces.hasOwnProperty('face5')==false)
	        	ref.faces['face5'] = {};
	        ref.faces['face5'][cubenum] = cubie;
	        cubie['color-face5']=color_pz;
	    }
	    
	    var cubeType = '';
	    var singleExtFace = false;
	    
	    if (colorMaterials.length == 0)
	    {
	    	cubeType = 'center of rubiks';
	    	console.log(cubenum + ' is center of rubiks');
	    	ref.rubiksCenter = cubenum;
	    	cubie.type = cubeType;
	    }
	    else if (colorMaterials.length == 1)
	    {
	    	singleExtFace = true;
	    	console.log(cubenum + ' has single exterior face cube / center cube');
	    	cubeType = 'center';
	    	console.log(cubenum + ' is center cube');
	    	ref.centerCubes.push(cubenum);
	    	cubie.type = cubeType;
	    }
	    else if (colorMaterials.length == 2)
	    {
	    	cubeType = 'edge';
	    	console.log(cubenum + ' is middle/edge cube');
	    	ref.edgeCubes.push(cubenum);
	    	cubie.type = cubeType;
	    }
	    else if (colorMaterials.length == 3)
	    {
	    	cubeType = 'corner';
	    	console.log(cubenum + ' is corner cube');
	    	ref.cornerCubes.push(cubenum);
	    	cubie.type = cubeType;
	    }
	    
	    
	    cubie.$colorMaterials = colorMaterials;
	    cubie.$colorNames = colorNames;
	    cubie.$materialList = {};
	    cubie.$rubiksCubeType = ref.rubiksCubeType;
	    return cubie;
	};
	
	this.assignDataToFaces = function(){
		console.log("Function :: assignDataToFaces");
		var cubeData = ref.cubeData;
		//console.log('cubeData length',cubeData.length);
		
		var cubeDataCount = 0;		
		
		for (var facenum in ref.faces){
			//console.log('facenum',facenum);
			//console.log('face',ref.faces[facenum]);
			console.log('Processing face',ref.faces[facenum]);
			var face = ref.faces[facenum];
			
			//ref.maxNumOfSols : Max number of solutions on a face
			var faceMaxNumOfSols = 0;
			
			for (var cubenum in face){
				//console.log('cubenum',cubenum);
				//console.log('cubie',face[cubenum]);
				console.log('Processing cube',face[cubenum]);
				
				var cubie = face[cubenum];
				console.log('cubenum = ' + cubie.$cubenum + ' | type = ' + cubie.type);
				
				if (cubie.type != 'center')
				{
					//assign data to this cubie's face
					//Check if all elements of data array are assigned per face
					//That is check if data array reached its limit
					//If yes then move on to next face
					if (cubeDataCount < cubeData.length)
					{
						//Check the number of 'face data' assigned so far is less than allowed on each face
						//For dimensions 3, maximum 8 solutions allowed per face
						console.log('cubedatacount',cubeDataCount);
						console.log('checking faceMaxNumOfSols',faceMaxNumOfSols);
						if (faceMaxNumOfSols < ref.maxNumOfSols)
						{
							ref.assignDataToCubieFace(cubie, facenum, cubeData[cubeDataCount]);
							cubeDataCount++;
							faceMaxNumOfSols++;
						}
						else
						{							
							console.log('faceMaxNumOfSols is ' + faceMaxNumOfSols + ', which has reached its limit...so being next face data assignment');
							faceMaxNumOfSols = 0;
							cubeDataCount++;
							break;
						}
						
					}
					else if (cubeDataCount >= cubeData.length)
					{
						console.log('cubeDataCount is ' + cubeDataCount + ', which has reached its limit...so being next face data assignment');
						cubeDataCount = 0;
						break;
					}
					
				}
				else if (cubie.type == 'center')
				{
					console.log(cubie.$cubenum + ' is center cube');
					var dataobj = {};
					dataobj['Display'] = 'CENTER';
					dataobj['Name'] = 'CENTER';
					ref.assignDataToCubieFace(cubie, facenum, dataobj);
				}				
			}
			//debugger;
			console.log('Resetting cubeDataCount to "0"');
			cubeDataCount = 0;
		}
	};
	
	this.assignDataToCubieFace = function(cubie, facenum, faceData){
		var materialIndex = facenum.slice(-1);
		cubie.$materialList[materialIndex] = faceData;
		console.log(cubie.$cubenum + ' assigned data = ' + faceData['Display'] + ' | for material index = ' + materialIndex);
	};
	
	this.drawCubies = function(){
		console.log("Function :: drawCubies");
		for (var cubenum in ref.allCubies)
		{
			console.log('cubenum',cubenum);
			var cubie = ref.allCubies[cubenum];
			console.log('cubie',cubie);
			cubie['materials'] = ref.generateDynamicTextures(cubie);
			
			var geometry = new THREE.BoxGeometry( ref.cubeSize, ref.cubeSize, ref.cubeSize, 1, 1, 1);
			var meshMaterial = new THREE.MeshFaceMaterial(cubie['materials']);
						
			var	cube = new THREE.Mesh(geometry, meshMaterial);
			
			cube.$cubeMesh = cube;
			cube.position.x = cubie.position.x;
			cube.position.y = cubie.position.y;
			cube.position.z = cubie.position.z;
			cube.castShadow = true;
			cube.receiveShadow = false;
			cube.$cubie = cubie;
			ref.allDrawnCubes.push(cube);
			ref.group.add(cube);
			
			//set clicks
			ref.setCubieClicks(cube);
		}
	};
	
	this.generateDynamicTextures = function(cubie){
		var materials = [];
		
		for (var i=0;i<6;i++)
		{
			var dynamicTexture	= new THREEx.DynamicTexture(512,512);
			dynamicTexture.texture.anisotropy = renderer.getMaxAnisotropy();
			dynamicTexture.clear('white');
			
			if (cubie.$materialList.hasOwnProperty(i))
			{
				var dataObj = cubie.$materialList[i];
				dynamicTexture.drawTextCooked({
					text		: dataObj['Display'],//faceText['Name'],//
					lineHeight	: ref.textureLineHeight,
					fillStyle	: ref.textureFillStyle,
					align		: ref.textureAlignText,
					font		: ref.textureFont
				});
				var faceMeshMat = new THREE.MeshLambertMaterial({color: cubie['color-face'+i], map: dynamicTexture.texture});
				faceMeshMat.$data = dataObj;
				materials.push(faceMeshMat);
			}
			else
			{
				var faceMeshMat = new THREE.MeshLambertMaterial({color: 0x000000});
				materials.push(faceMeshMat);
			}
		}
		
		return materials;
	};
	
	this.setCubieClicks = function(cubie){
		domEvents.addEventListener(cubie, 'mousedown', function(event){
			console.log('cubie mousedown ',cubie);
			onCubieMouseDown(event, cubie);
		}, false);
		
		domEvents.addEventListener(cubie, 'touchstart', function(event){
			console.log('cubie touchstart ',cubie);
			onCubieMouseDown(event, cubie);
		}, false);
	};
}

function onCubieMouseDown(event, cubie)
{
	console.log("Function :: onCubeMouseDown",cubie);
	CC=cubie;
	EE=event;
	colorThisFace(event.intersect);
	//Move selected object/cubie/cubieMesh
}

function colorThisFace(intersectObj)
{
	console.log("Function :: colorThisFace");
	var faceIndex = intersectObj.faceIndex;
	var materialIndex = intersectObj.face.materialIndex;	
	var cubieMesh = intersectObj.object;
	
	console.log('cubenum = ' + cubieMesh.$cubie.$cubenum + ' | materialIndex = ' + materialIndex + ' | faceIndex = ' + faceIndex);
	cubieMesh.material.materials[materialIndex].color.setHex(0xff0000);
	cubieMesh.geometry.colorsNeedUpdate = true;
	cubieMesh.$materialClicked = materialIndex;
	
	//Generate next level Rubiks cube
	var nextLevelDataOBj = cubieMesh.$cubie.$materialList[materialIndex];
	console.log('nextLevelDataOBj',nextLevelDataOBj);
	
	var nextStep = function(){
		console.log('next function');
		setCubeData(nextLevelDataOBj, cubieMesh.$cubie.$rubiksCubeType);
	};
	
	moveCubieToTop(cubieMesh, nextStep);
		
}

function moveCubieToTop(cubieMesh, nextStep)
{
	console.log("Function :: moveCubieToTop");
	
	//Parent must be RC.group object
	var parent = cubieMesh.parent;
	parent.updateMatrixWorld();
	var parentVector = new THREE.Vector3();
	parent.position.copy(parentVector);
	
	//GEt world coordinate position of the cubieMesh
	var vector = new THREE.Vector3();
	vector.setFromMatrixPosition( cubieMesh.matrixWorld );
	cubieMesh.position.copy(vector);
	console.log('cubieMesh.position',cubieMesh.position);
	//This will remove cubieMesh from its original parent group (RC.group) and add it to the world scene
	window.scene.add(cubieMesh);
	window.CM = cubieMesh;
	
	//move cubieMesh to top left spot
	var currRubiksType = cubieMesh.$cubie.$rubiksCubeType;
	console.log('currRubiksType',currRubiksType);
	
	var cubie3dPos = get3dCood(breadCrumsPos[currRubiksType]['screen'].X,breadCrumsPos[currRubiksType]['screen'].Y);
	
	breadCrumsPos[currRubiksType]['cubieMeshParentPosition'] = parentVector;
	breadCrumsPos[currRubiksType]['world3d'] = cubie3dPos;
	breadCrumsPos[currRubiksType]['cubieMesh'] = cubieMesh;
	breadCrumsPos[currRubiksType]['cubieMeshOriginalVector'] = vector;
	console.log('cubie3dPos',cubie3dPos);
	
	//moveObject(cubieMesh,-10,8,-15,3000);
	moveObject(cubieMesh,cubie3dPos.x,cubie3dPos.y,-3,3000);
	
	//move the parent group along z or disappear
	moveObject(parent,0,0,-15,3000,nextStep);
	window.CM = cubieMesh;
}

//reversalBreadCrum(breadCrumsPos['categories'])
function reversalBreadCrum(breadCrumsObj)
{
	console.log('Function :: reversalBreadCrum');
	var catCM = breadCrumsObj;
	moveObject(catCM.cubieMesh,catCM.cubieMeshOriginalVector.x,catCM.cubieMeshOriginalVector.y,catCM.cubieMeshOriginalVector.z,2000);
	
	var originalParentGroup = catCM.cubieMesh.$cubie.originalParent;
	moveObject(originalParentGroup,catCM.cubieMeshParentPosition.x,catCM.cubieMeshParentPosition.y,catCM.cubieMeshParentPosition.z,3000, function(){
		THREE.SceneUtils.attach(catCM.cubieMesh, scene, catCM.cubieMesh.$cubie.originalParent);
		
		var materialIndex = catCM.cubieMesh.$materialClicked;
		var color = catCM.cubieMesh.$cubie['color-face'+materialIndex];
		catCM.cubieMesh.material.materials[materialIndex].color.setHex(color);
		catCM.cubieMesh.geometry.colorsNeedUpdate = true;
		catCM.cubieMesh.$materialClicked = undefined;
	});
	//debugger;
	
}