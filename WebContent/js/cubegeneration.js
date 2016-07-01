var cubielabelarray = [];
var cubielabelpos = [100,200,300,400,500];
var CUBE_SIZE = 3;
var GAP_BETWEEN_CUBES = 0.2;
var selectionColor = 0x008abf;//0x003f89;//0x00b2ef;//0xff0000;//0xb2ccce;//0xdaeff2;
var testCounterSol = 0;
var testCounterOff = 0;
var testDataSol=undefined;
var testDataOff=undefined;
var startingPositions = {
		'categories':{
			'x':0,
			'y':0,
			'z':25
		},
		'solutions':{
			'x':0,
			'y':25,
			'z':0
		},
		'offerings':{
			'x':0,
			'y':25,
			'z':0
		},
};

//Object containing 2d screen coordinate positions for breadcrums
//Idea being the breadcrums will be positioned in the 3d world/scene corresponding to top(Y) left(X) window position
var breadCrumsPos = {
		'categories':{
			'type':'categories',
			'screen':{
				'X':0.03,//0.03,//0.95
				'Y':0.05,//0.1
				}
			},
		'solutions':{
			'type':'solutions',
			'screen':{
				'X':0.18,//0.95
				'Y':0.05,//0.07,//0.35
				}
		},
		'offerings':{
			'type':'offerings',
			'screen':{
				'X':0.33,//0.37,//0.95
				'Y':0.05//0.07,//0.6
				}
		}
};

//Current Rubiks Cube at the center of the 3d world
var activeRubiksCube = undefined;

//Create initial rubiks cube for 'categories'
function initialCubeSetup()
{
	console.log("Function :: initialCubeSetup");
	var returnedData = getData(appData['categories']);
	var cubeData = appData['categories'];
	cubeData['data'] = returnedData;
	drawRubiksCube(cubeData);
}
function setCubeData(nextLevelDataObj, currRubiksType)
{
	console.log("Function :: setCubeData");
	//console.log('nextLevelDataObj',nextLevelDataObj);
	//console.log('currRubiksType',currRubiksType);
	if (currRubiksType == 'categories')
	{
		//Draw rubiks cube for 'solutions' under this category
		appData['solutions']['getDataFor'] = nextLevelDataObj;
		appData['solutions']['parentId'] = nextLevelDataObj['categoryid'];
		getData(appData['solutions'], function(response){
			if (DEVELOPMENT)
			{
				var returnData=undefined;
				if (testCounterSol%2 == 0)
				{
					returnData = solutionJSON['01'];
				}
				else
				{
					returnData = solutionJSON['02'];
				}
				testCounterSol++;
				var cubeData = appData['solutions'];
				testDataSol = returnData;
				cubeData['data'] = returnData;
				drawRubiksCube(cubeData,nextLevelDataObj);
			}
			else
			{
				if (response == 'ERROR')
				{
					console.log("ERROR in connecting to the backend");
				}
				else
				{
					//console.log('callback for solutions',response);
					var returnData = response['result'];
					var cubeData = appData['solutions'];
					cubeData['data'] = returnData;
					drawRubiksCube(cubeData,nextLevelDataObj);
				}
				
			}			
		});		
	}
	else if (currRubiksType == 'solutions')
	{
		//Draw rubiks cube for 'offerings' under this solution
		appData['offerings']['getDataFor'] = nextLevelDataObj;
		appData['offerings']['parentId'] = nextLevelDataObj['categoryid'];
		getData(appData['offerings'], function(response){
			if (DEVELOPMENT)
			{
				var returnData=undefined;
				if (testCounterOff%2 == 0)
				{
					returnData = offeringsJSON['101'];
				}
				else
				{
					returnData = offeringsJSON['102'];
				}
				testCounterOff++;
				var cubeData = appData['offerings'];
				testDataOff = returnData;
				cubeData['data'] = returnData;
				drawRubiksCube(cubeData,nextLevelDataObj);
			}
			else
			{
				if (response == 'ERROR')
				{
					console.log("ERROR in connecting to the backend");
				}
				else
				{
					//console.log('callback for offerings',response);
					var returnData = response['result'];
					var cubeData = appData['offerings'];
					cubeData['data'] = returnData;
					drawRubiksCube(cubeData,nextLevelDataObj);
				}				
			}			
		});
		
	}
	else if (currRubiksType == 'offerings')
	{
		//Get all assets for this offering
		console.log("Show Assets overlay - call function to show Assets popup");
		var offeringId = nextLevelDataObj['categoryid'];
		//var name = nextLevelDataObj['Name'];
		var display = nextLevelDataObj['display'];
		var parentId = activeRubiksCube['parentData']['categoryid'];
		console.log('parent',activeRubiksCube['parentData']);
		console.log('offeringId',offeringId);
		console.log('parentId',parentId);
		console.log('display',display);
		//console.log('name',name);
		showPopUp(offeringId, parentId, display);
		//alert('offeringId - ' +offeringId+'display - '+display+', parentId - '+parentId);
	}
}

function drawRubiksCube(cubeData,parentData)
{
	console.log("Function :: drawRubiksCube");
	
	if (!cubeData.hasOwnProperty('RC'))
	{
		var RC = new RubiksCube(cubeData);
		RC.allowRotation = false;
		console.warn('Draw Rubiks Cube for',cubeData['type']);
		cubeData.RC = RC;
		RC.init();
		if (parentData)
			RC['parentData'] = parentData;
		RC.assignDataToFaces();
					
		setTimeout(function(){
				RC.drawCubies();			
				//RC.drawCubiesNew();
				RC.allowRotation = false;
				activeRubiksCube = RC;
				showRubiksCube(RC.group, function(){
					//console.log('showRubiksCube callback');
					activeRubiksCube.visible = true;
					var tween = new TWEEN.Tween(activeRubiksCube.group.rotation).to({x:degToRad(25),y:degToRad(-45)}, 500).easing(TWEEN.Easing.Linear.None);
					/*tween.onUpdate(function(){
						grpObject.rotation.x = x;
						grpObject.rotation.y = y;
						grpObject.rotation.z = z;
					});*/
					tween.start();
					tween.onComplete(function(){
						//console.log("tween onComplete");
						activeRubiksCube.group.rotation.set(degToRad(25),degToRad(-45),0);
						activeRubiksCube.allowRotation = false;
					});
				});
			},250);
		}
	else
	{
		console.warn('Rubiks Cube already drawn for',cubeData['type']);
		activeRubiksCube = cubeData.RC;
		activeRubiksCube.allowRotation = true;
		showRubiksCube(activeRubiksCube.group, function(){
			activeRubiksCube.visible = true;
		});
		activeRubiksCube.parentData = parentData;
		//activeRubiksCube.assignDataToFaces();
		//activeRubiksCube.setCenterCubieData();
		activeRubiksCube.cubeData = cubeData['data'];
		//cubeData['usePNG'] = false;
		if (activeRubiksCube.usePNG)
		{
			activeRubiksCube.refreshCubeFacesPNG();
		}
		else
		{
			activeRubiksCube.refreshCubeFaces();
		}		
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
	this.allDrawnCubies = [];
	
	this.faces = {};
	this.cubeData = options.data;
	this.parentData = undefined;
	this.maxNumOfSols = 0;
	
	this.usePNG = options.usePNG || false;
	
	this.visible = false;
	
	this.textureLineHeight = 0.2;
	this.textureFillStyle = 'black';
	this.textureAlignText = 'center';
	this.textureFont = "bold "+(0.2*512)+"px Helvetica";//Arial
	
	this.innerFaceColor = 0x5e5e5e;//black
	this.backGroundColor = 0xf2f1eb;//0xa5a8ab
	this.centerCubeFaceColor = 0x00649d;//0x0077be;
	
	this.init = function(){
		if (this.dimensions == 2)
			this.maxNumOfSols = 4;
		else if (this.dimensions == 3)
			this.maxNumOfSols = 8;
		this.group = new THREE.Group();
		scene.add(this.group);
		if (startingPositions[this.rubiksCubeType])
		{
			this.group.position.set(startingPositions[this.rubiksCubeType].x,startingPositions[this.rubiksCubeType].y,startingPositions[this.rubiksCubeType].z);
		}
		else
		{
			this.group.position.set(0,25,0);
		}
		worldGroups[this.rubiksCubeType] = this.group;
		breadCrumsPos[this.rubiksCubeType]['RC'] = this;
		this.findCubiePosition();		
	};

	//this function assigns positions x,y,z for each cubie
	this.findCubiePosition = function(){
		//console.log("Function :: findCubiePosition");
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
	
	//determine color for each face of the cubie
	this.findCubieFaceColors = function(x,y,z,cubenum){
		console.log("Function :: findCubieFaceColors");
		var cubie = {};
		var min = 0;
		var max = ref.dimensions - 1;
		//console.log('min = ' + min + ' | max = ' + max);
		
		var color_px = ref.innerFaceColor, color_nx = ref.innerFaceColor, color_py = ref.innerFaceColor, color_ny = ref.innerFaceColor, color_pz = ref.innerFaceColor, color_nz = ref.innerFaceColor;
		var colorMaterials = [];
	    var colorNames = [];
		
	    if(x == max) 
		{
	        color_px = ref.backGroundColor;//yellow
	        colorMaterials.push(0);
	        colorNames.push('yellow');
	        if (ref.faces.hasOwnProperty('face0') == false)
	        	ref.faces['face0'] = {};
	        ref.faces['face0'][cubenum] = cubie;
	        cubie['color-face0']=color_px;
	    }

	    if(x == 0) 
	    {
	        color_nx = ref.backGroundColor;//white
	        colorMaterials.push(1);
	        colorNames.push('white');
	        if (ref.faces.hasOwnProperty('face1')==false)
	        	ref.faces['face1'] = {};
	        ref.faces['face1'][cubenum] = cubie;
	        cubie['color-face1']=color_nx;
	    }
	    
	    if(y == max) 
	    {
	        color_py = ref.backGroundColor;//blue
	        colorMaterials.push(2);
	        colorNames.push('blue');
	        if (ref.faces.hasOwnProperty('face2')==false)
	        	ref.faces['face2'] = {};
	        ref.faces['face2'][cubenum] = cubie;
	        cubie['color-face2']=color_py;
	    }

	    if(y == 0) 
	    {
	        color_ny = ref.backGroundColor;//orange
	        colorMaterials.push(3);
	        colorNames.push('orange');
	        if (ref.faces.hasOwnProperty('face3')==false)
	        	ref.faces['face3'] = {};
	        ref.faces['face3'][cubenum] = cubie;
	        cubie['color-face3']=color_ny;
	    }

	    if(z == max) 
	    {
	        color_nz = ref.backGroundColor;//green
	        colorMaterials.push(4);
	        colorNames.push('green');
	        if (ref.faces.hasOwnProperty('face4')==false)
	        	ref.faces['face4'] = {};
	        ref.faces['face4'][cubenum] = cubie;
	        cubie['color-face4']=color_nz;
	    }

	    if(z == 0) 
	    {
	        color_pz = ref.backGroundColor;//red
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
	    	//console.log(cubenum + ' is center of rubiks');
	    	ref.rubiksCenter = cubenum;
	    	cubie.type = cubeType;
	    }
	    else if (colorMaterials.length == 1)
	    {
	    	singleExtFace = true;
	    	//console.log(cubenum + ' has single exterior face cube / center cube');
	    	cubeType = 'center';
	    	//console.log(cubenum + ' is center cube');
	    	ref.centerCubes.push(cubenum);
	    	cubie.type = cubeType;
	    }
	    else if (colorMaterials.length == 2)
	    {
	    	cubeType = 'edge';
	    	//console.log(cubenum + ' is middle/edge cube');
	    	ref.edgeCubes.push(cubenum);
	    	cubie.type = cubeType;
	    }
	    else if (colorMaterials.length == 3)
	    {
	    	cubeType = 'corner';
	    	//console.log(cubenum + ' is corner cube');
	    	ref.cornerCubes.push(cubenum);
	    	cubie.type = cubeType;
	    }
	    
	    
	    cubie.$colorMaterials = colorMaterials;
	    cubie.$colorNames = colorNames;
	    cubie.$materialList = {};
	    cubie.$rubiksCubeType = ref.rubiksCubeType;
	    return cubie;
	};
	
	//this function assigns data to the respective faces
	this.assignDataToFaces = function(){
		console.log("Function :: assignDataToFaces");
		var cubeData = ref.cubeData;
		//console.log('cubeData length',cubeData.length);
		
		var cubeDataCount = 0;		
		
		for (var facenum in ref.faces){
			//console.log('facenum',facenum);
			//console.log('face',ref.faces[facenum]);
			//console.log('Processing face',ref.faces[facenum]);
			var face = ref.faces[facenum];
			
			//ref.maxNumOfSols : Max number of solutions on a face
			var faceMaxNumOfSols = 0;
			
			for (var cubenum in face){
				//console.log('cubenum',cubenum);
				//console.log('cubie',face[cubenum]);
				//console.log('Processing cube',face[cubenum]);
				
				var cubie = face[cubenum];
				//console.log('cubenum = ' + cubie.$cubenum + ' | type = ' + cubie.type);
				
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
						//console.log('cubedatacount',cubeDataCount);
						//console.log('checking faceMaxNumOfSols',faceMaxNumOfSols);
						if (faceMaxNumOfSols < ref.maxNumOfSols)
						{
							ref.assignDataToCubieFace(cubie, facenum, cubeData[cubeDataCount]);
							cubeDataCount++;
							faceMaxNumOfSols++;
						}
						else
						{							
							//console.log('faceMaxNumOfSols is ' + faceMaxNumOfSols + ', which has reached its limit...so begin next face data assignment');
							faceMaxNumOfSols = 0;
							cubeDataCount++;
							break;
						}
						
					}
					else if (cubeDataCount >= cubeData.length)
					{
						//console.log('cubeDataCount is ' + cubeDataCount + ', which has reached its limit...so begin next face data assignment');
						cubeDataCount = 0;
						break;
					}
					
				}
				else if (cubie.type == 'center')
				{
					//console.log(cubie.$cubenum + ' is center cube');
					var dataobj = {};
					if (ref.parentData)
					{
						dataobj['display'] = ref.parentData['display'];
						//dataobj['Name'] = ref.parentData['Name'];
					}
					else
					{
						dataobj['display'] = 'CENTER';
						//dataobj['Name'] = 'CENTER';
					}
					ref.assignDataToCubieFace(cubie, facenum, dataobj);
				}				
			}
			//debugger;
			//console.log('Resetting cubeDataCount to "0"');
			cubeDataCount = 0;
		}
	};
		
	this.assignDataToCubieFace = function(cubie, facenum, faceData){
		var materialIndex = facenum.slice(-1);
		faceData['parentData'] = ref.parentData;
		cubie.$materialList[materialIndex] = faceData;
		//console.log(cubie.$cubenum + ' assigned data = ' + faceData['display'] + ' | for material index = ' + materialIndex);
	};
			
	this.setCenterCubieData = function(){
		//console.log('setCenterCubieData :: center cubie',ref.parentData);
		var dataObj = {};
		if (ref.parentData)
		{
			dataObj['display'] = ref.parentData['display'];
			//dataObj['Name'] = ref.parentData['Name'];
		}
		else
		{
			dataObj['display'] = 'CENTER';
			//dataObj['Name'] = 'CENTER';
		}
		
		for (var i=0; i < ref.centerCubes.length; i++)
		{
			var cubieNum = ref.centerCubes[i];
			var cubie = ref.allCubies[cubieNum];
					
			for (key in cubie.$materialList)
			{
				cubie.$materialList[key] = dataObj;
				var materialIndex = key;
				
				var dynamicTexture	= new THREEx.DynamicTexture(512,512);
				dynamicTexture.texture.anisotropy = renderer.getMaxAnisotropy();
				dynamicTexture.clear('white');
				
				dynamicTexture = ref.getFaceData(dataObj, dynamicTexture);
								
				cubie.materials[materialIndex].map = dynamicTexture.texture;
				cubie.materials[materialIndex].needsUpdate = true;
				
			}
		}		
		
	};
	
	this.drawCubiesNew = function(){
		//console.log("Function :: drawCubiesNew");
		for (var cubenum in ref.allCubies)
		{
			//console.log('cubenum',cubenum);
			var cubie = ref.allCubies[cubenum];
			//console.log('cubie',cubie);			
			cubie['materials']=[];
			ref.generateDynamicCanvas(cubie);
		}
	};
	
	//this function draws the cubie/mesh-geometry
	this.drawCubies = function(){
		console.log("Function :: drawCubies");
		for (var cubenum in ref.allCubies)
		{
			//console.log('cubenum',cubenum);
			var cubie = ref.allCubies[cubenum];
			//console.log('cubie',cubie);
			if (ref.usePNG)
				cubie['materials'] = ref.generatePNGTextures(cubie);
			else
				cubie['materials'] = ref.generateDynamicTextures(cubie);		
			
			var geometry = new THREE.BoxGeometry( ref.cubeSize, ref.cubeSize, ref.cubeSize, 1, 1, 1);
			var meshMaterial = new THREE.MeshFaceMaterial(cubie['materials']);						
			var cube = new THREE.Mesh(geometry, meshMaterial);
			cube.$cubeMesh = cube;			
			cube.position.x = cubie.position.x;
			cube.position.y = cubie.position.y;
			cube.position.z = cubie.position.z;
			cube.castShadow = true;
			cube.receiveShadow = false;			
			ref.group.add(cube);
			
			cube.$cubie = cubie;
			cubie.usePNG = ref.usePNG;
			ref.allDrawnCubies.push(cube);
			
			//set clicks
			//ref.setCubieClicks(cube);
		}
	};
	
	//this function generates texture for each face based upon its data
	this.generateDynamicTextures = function(cubie){
		console.log("Function :: generateDynamicTextures");
		var materials = [];
		
		
		/*var materials = [
		                 rightSide,    0    // Right side
		                 leftSide,   1    // Left side
		                 topSide,     2    // Top side
		                 bottomSide,  3    // Bottom side
		                 frontSide,   4    // Front side
		                 backSide     5    // Back side
		             ];*/
		
		for (var i=0;i<6;i++)
		{
			var dynamicTexture	= new THREEx.DynamicTexture(512,512);
			dynamicTexture.texture.anisotropy = renderer.getMaxAnisotropy();
			dynamicTexture.clear('white');
			
			if (cubie.$materialList.hasOwnProperty(i))
			{
				var dataObj = cubie.$materialList[i];
				
				/*dynamicTexture.drawTextCooked({
					text		: dataObj['display'],//faceText['Name'],//
					lineHeight	: ref.textureLineHeight,
					fillStyle	: ref.textureFillStyle,
					align		: ref.textureAlignText,
					font		: ref.textureFont
				});*/
				
				ref.textureFont = "55px Verdana";
				
				dynamicTexture = ref.getFaceData(dataObj, dynamicTexture);
				
				var faceColor = cubie['color-face'+i];
				if (cubie.type == 'center')
					faceColor = ref.centerCubeFaceColor;
				
				var faceMeshMat = new THREE.MeshLambertMaterial({color: faceColor, vertexColors: THREE.FaceColors, map: dynamicTexture.texture});
				faceMeshMat.$data = dataObj;
				materials.push(faceMeshMat);
			}
			else
			{
				var faceMeshMat = new THREE.MeshLambertMaterial({color: ref.innerFaceColor, vertexColors: THREE.FaceColors});
				materials.push(faceMeshMat);
			}
		}
		
		return materials;
	};
	
	this.refreshCubeFaces = function(){
		console.log("Function :: refreshCubeFaces");
		//console.log('rubiks cube data',ref.cubeData);
		
		for (var c=0;c<ref.allDrawnCubies.length;c++)
		{
			var thismesh = ref.allDrawnCubies[c];
			thismesh.$cubie.$materialList = {};
			var materials = thismesh.material.materials;
			for (var j=0; j<6; j++)
			{
				materials[j].dispose();
			}
		}
		
		ref.assignDataToFaces();
		//Update dynamic texture material for all cubies
		for (var cubenum in ref.allCubies)
		{
			var cubie = ref.allCubies[cubenum];
			for (var i=0; i<6; i++)
			{				
				if (cubie.$materialList.hasOwnProperty(i))
				{
					var dynamicTexture = new THREEx.DynamicTexture(512,512);
					dynamicTexture.texture.anisotropy = renderer.getMaxAnisotropy();
					dynamicTexture.clear('white');
					
					var dataObj = cubie.$materialList[i];
					
					dynamicTexture = ref.getFaceData(dataObj, dynamicTexture);
					
					var faceColor = cubie['color-face'+i];
					
					if (cubie.type == 'center')
						faceColor = ref.centerCubeFaceColor;
					
					var faceMeshMat = new THREE.MeshLambertMaterial({color: faceColor, vertexColors: THREE.FaceColors, map: dynamicTexture.texture});
					faceMeshMat.$data = dataObj;
					
					//cubie.materials[i].map = dynamicTexture.texture;
					cubie.materials[i] = faceMeshMat;
					cubie.materials[i].needsUpdate = true;
				}
				else
				{
					var faceMeshMat = new THREE.MeshLambertMaterial({color: ref.innerFaceColor, vertexColors: THREE.FaceColors});
					cubie.materials[i] = faceMeshMat;
					cubie.materials[i].needsUpdate = true;
				}
			}
		}
	};
	
	this.generatePNGTextures = function(cubie){
		console.log("Function :: generatePNGTextures");
		var materials = [];
		var imagePath = 'images/'+cubie.$rubiksCubeType+'/';
		
		for (var i=0; i<6; i++)
		{
			if (cubie.$materialList.hasOwnProperty(i))
			{
				var dataObj = cubie.$materialList[i];
				var imageName = imagePath + dataObj['categoryid'] + '.png';
				
				var faceColor = cubie['color-face'+i];
				if (cubie.type == 'center')
					faceColor = ref.centerCubeFaceColor;
				
				var loader = new THREE.TextureLoader();
	    		//var texture = loader.load("images/svg/PNG/rubiksCubeText_videoPhysicalCyber.png");
	    		var texture = loader.load(imageName);
	    						
				var uniforms = {
				        color: { type: "c", value: new THREE.Color( faceColor ) },
				        texture: { type: "t", value: texture },
				    };
				 // material
			    var material = new THREE.ShaderMaterial({
			        uniforms        : uniforms,
			        vertexShader    : document.getElementById( 'vertex_shader' ).textContent,
			        fragmentShader  : document.getElementById( 'fragment_shader' ).textContent
			    });
			    material.$data = dataObj;
			    
			    materials.push(material);
			}
			else
			{
				var uniforms = {
	    		        color: { type: "c", value: new THREE.Color( ref.innerFaceColor ) },
	    		    };
				var material = new THREE.ShaderMaterial({
    		        uniforms        : uniforms,
    		        vertexShader    : document.getElementById( 'vertex_shader' ).textContent,
    		        fragmentShader  : document.getElementById( 'fragment_shader' ).textContent
    		    });
				materials.push(material);
			}
		}
		//debugger;
		return materials;
	};
	
	this.refreshCubeFacesPNG = function(){
		console.log("Function :: refreshCubeFacesPNG");
		for (var c=0;c<ref.allDrawnCubies.length;c++)
		{
			var thismesh = ref.allDrawnCubies[c];
			thismesh.$cubie.$materialList = {};
			var materials = thismesh.material.materials;
			for (var j=0; j<6; j++)
			{
				materials[j].dispose();
			}
		}
		
		ref.assignDataToFaces();
		
		for (var cubenum in ref.allCubies)
		{
			var cubie = ref.allCubies[cubenum];
			var imagePath = 'images/'+cubie.$rubiksCubeType+'/';
			
			for (var i=0; i<6; i++)
			{
				if (cubie.$materialList.hasOwnProperty(i))
				{
					var dataObj = $materialList[i];
					var imageName = imagePath + dataObj['categoryid'] + '.png';
					var faceColor = cubie['color-face'+i];
					
					if (cubie.type == 'center')
						faceColor = ref.centerCubeFaceColor;
					
					var loader = new THREE.TextureLoader();
		    		//var texture = loader.load("images/svg/PNG/rubiksCubeText_videoPhysicalCyber.png");
		    		var texture = loader.load(imageName);
					
					var uniforms = {
		    		        color: { type: "c", value: new THREE.Color( faceColor ) },
		    		        texture: { type: "t", value: texture },
		    		    };
		        	 var material = new THREE.ShaderMaterial({
		    		        uniforms        : uniforms,
		    		        vertexShader    : document.getElementById( 'vertex_shader' ).textContent,
		    		        fragmentShader  : document.getElementById( 'fragment_shader' ).textContent
		    		    });
		        	 material.$data = dataObj;
		        	 cubie.materials[i] = material;
		        	 cubie.materials[i].needsUpdate = true;
				}
				else
				{
					var uniforms = {
		    		        color: { type: "c", value: new THREE.Color( ref.innerFaceColor ) },
		    		    };
					var material = new THREE.ShaderMaterial({
					        uniforms        : uniforms,
					        vertexShader    : document.getElementById( 'vertex_shader' ).textContent,
					        fragmentShader  : document.getElementById( 'fragment_shader' ).textContent
					});
					cubie.materials[i] = material;
					cubie.materials[i].needsUpdate = true;
				}
			}
		}
	};
	
	this.getFaceData = function(dataObj, dynamicTexture){
		//console.log("Function :: getFaceData");
		var str = dataObj['display'];
		cubielabelarray = [];
		stringDivider(str,16,"");
		var arrylen = cubielabelarray.length;
		var labelstartpos = 0;
		switch(arrylen){
			case 1:
				labelstartpos = 1;
				break;
			case 2:
				labelstartpos = 1;
				break;
			case 3:
				labelstartpos = 1;
				break;
			case 4:
				labelstartpos = 0;
				break;
			case 5:
				labelstartpos = 0;
				break;
			default: //in case no caharacters or more than 5 lines 
				return;
		}
		for ( var i=0; i < arrylen; i++){
			dynamicTexture.drawText(cubielabelarray[i],undefined,cubielabelpos[i + labelstartpos],ref.textureFillStyle,ref.textureFont);
		}
		//console.log (cubielabelarray);
		return dynamicTexture;
		/*
		var indices = [];
		for(var j=0; j<str.length;j++) 
		{
		    if (str[j] === " ") indices.push(j);
		}
		//console.log('str',str);
		//console.log('indices',indices);
		//debugger;
		if (indices.length > 5 && indices.length <=7)
		{
			var str1 = str.substring(0,indices[1]);
			var str2 = str.substring(indices[1],indices[3]);
			var str3 = str.substring(indices[3],indices[5]);
			var str4 = str.substring(indices[5],str.length);
			
			dynamicTexture.drawText(str1,undefined,150,ref.textureFillStyle,ref.textureFont);
			dynamicTexture.drawText(str2,undefined,250,ref.textureFillStyle,ref.textureFont);
			dynamicTexture.drawText(str3,undefined,350,ref.textureFillStyle,ref.textureFont);
			dynamicTexture.drawText(str4,undefined,450,ref.textureFillStyle,ref.textureFont);
		}
		else if (indices.length > 4 && indices.length <=5)
		{
			//console.log('length > 4 && <=5');
			var str1 = str.substring(0,indices[1]);
			var str2 = str.substring(indices[1],indices[3]);
			var str3 = str.substring(indices[3],str.length);
			
			dynamicTexture.drawText(str1,undefined,150,ref.textureFillStyle,ref.textureFont);
			dynamicTexture.drawText(str2,undefined,250,ref.textureFillStyle,ref.textureFont);
			dynamicTexture.drawText(str3,undefined,350,ref.textureFillStyle,ref.textureFont);
			
			//console.log('str1',str1);console.log('str2',str2);console.log('str3',str3);
		}
		else if (indices.length > 2 && indices.length <= 4)
		{
			//console.log('length > 2 && <=4');
			var str1 = str.substring(0,indices[1]);
			var str2 = str.substring(indices[1],str.length);
			
			dynamicTexture.drawText(str1,undefined,150,ref.textureFillStyle,ref.textureFont);
			dynamicTexture.drawText(str2,undefined,250,ref.textureFillStyle,ref.textureFont);
			//console.log('str1',str1);console.log('str2',str2);
		}
		else if (indices.length == 2)
		{
			//console.log('length = 2');
			var str1 = str.substring(0,indices[1]);
			var str2 = str.substring(indices[1],str.length);
			dynamicTexture.drawText(str1,undefined,150,ref.textureFillStyle,ref.textureFont);
			dynamicTexture.drawText(str2,undefined,250,ref.textureFillStyle,ref.textureFont);
			//console.log('str1',str1);console.log('str2',str2);
		}
		else if (indices.length == 1)
		{
			//console.log('length = 1');
			var str1 = str.substring(0,indices[0]);
			var str2 = str.substring(indices[0],str.length);
			dynamicTexture.drawText(str1,undefined,150,ref.textureFillStyle,ref.textureFont);
			dynamicTexture.drawText(str2,undefined,250,ref.textureFillStyle,ref.textureFont);
			//console.log('str1',str1);
		}
		else if (indices.length == 0 ||  str.length == 1)
		{
			var str1 = str;
			dynamicTexture.drawText(str1,undefined,150,ref.textureFillStyle,ref.textureFont);
		}				
		return dynamicTexture;
		*/
	};
	
	this.generateDynamicCanvas = function(cubie){
		//console.log('Function:: generateDynamicCanvas');		
		for (var i=0;i<6;i++)
		{
			if (cubie.$materialList.hasOwnProperty(i))
			{
				var dataObj = cubie.$materialList[i];
				var canvastext = dataObj['display'];				
				
				createTextureMaterialCanvas(canvastext, cubie, i, function(){
					//debugger;
					//console.log("createTextureMaterial callback");
					//console.log('this',this);
					$(this.htmlcontent).remove();
					THREE.ImageUtils.crossOrigin = '';
					var texture = new THREE.Texture(this.rootCanvas);
					console.log('rootCanvas',this.rootCanvas);
				    texture.needsUpdate = true;
				    texture.generateMipmaps = false;
				    texture.minFilter = THREE.LinearFilter;
				    //texture.magFilter = THREE.LinearFilter;
					var faceMeshMat = new THREE.MeshLambertMaterial({color: this.cubie['color-face'+this.matIndex], vertexColors: THREE.FaceColors, transparent:true,map: texture});
					faceMeshMat.$data = dataObj;
					this.cubie.materials[this.matIndex] = faceMeshMat;
					
					if (isArrayFull( this.cubie.materials ))
					{
						//console.log('cubie = ' + this.cubie.$cubenum + ', materials array is FULL');
						ref.drawThisCubie(this.cubie);
					}
					else
					{
						//console.warn('cubie = ' + this.cubie.$cubenum + ', materials array is NOT FULL');
					}
					//debugger;
				})
			}
			else
			{
				var faceMeshMat = new THREE.MeshLambertMaterial({color: 0x000000, vertexColors: THREE.FaceColors});
				//materials.push(faceMeshMat);
				cubie.materials[i] = faceMeshMat;
			}
			//console.log('I',i);
		}
		//debugger;
		//return materials;
	};
	
	this.drawThisCubie = function(cubie){
		//console.log('drawThisCubie - cubenum',cubie.$cubenum);
				
		var geometry = new THREE.BoxGeometry( ref.cubeSize, ref.cubeSize, ref.cubeSize, 1, 1, 1);
		var meshMaterial = new THREE.MeshFaceMaterial(cubie['materials']);						
		
		var cube = new THREE.Mesh(geometry, meshMaterial);
		var edges = new THREE.VertexNormalsHelper( cube, 5, 0x00ff00, 1 );
		cube.$cubeMesh = cube;			
		cube.position.x = cubie.position.x;
		cube.position.y = cubie.position.y;
		cube.position.z = cubie.position.z;
		cube.castShadow = true;
		cube.receiveShadow = false;			
		ref.group.add(cube);
		
		
		ref.group.add(edges);
		
		cube.$cubie = cubie;
		ref.allDrawnCubies.push(cube);
	};
	
	this.setCubieClicks = function(cubie){
		domEvents.addEventListener(cubie, 'mousedown', function(event){
			//event.stopPropagation();
			//console.log('cubie mousedown ',cubie);
			lastCubieClicked = cubie;
			lastCubieEvent = event;
			//onCubieMouseDown(event, cubie);
		}, false);
	};
}
var lastCubieClicked = undefined;

function onCubieMouseDown(event, cubie)
{
	//console.log("Function :: onCubeMouseDown",cubie);
	CC=cubie;
	EE=event;
	colorThisFace(event.intersect);
	//Move selected object/cubie/cubieMesh
}

/*rightSide,    0    // Right side
leftSide,   1    // Left side
topSide,     2    // Top side
bottomSide,  3    // Bottom side
frontSide,   4    // Front side
backSide     5    // Back side
*/
var faceNames = {
		'0':'right','1':'left','2':'top',
		'3':'bottom','4':'front','5':'back',
		};

var faceNames = {
		'0':{
			'facename':'right',
			'rotationaxis':'y',
			'scaleaxis':'z',
		},
		'1':{
			'facename':'left',
			'rotationaxis':'y',
			'scaleaxis':'z',
		},
		'2':{
			'facename':'top',
			'rotationaxis':'x',
			'scaleaxis':'y',
		},
		'3':{
			'facename':'bottom',
			'rotationaxis':'x',
			'scaleaxis':'y',
		},
		'4':{
			'facename':'front',
			'rotationaxis':'y',
			'scaleaxis':'z',
		},
		'5':{
			'facename':'back',
			'rotationaxis':'y',
			'scaleaxis':'z',
		}
}

function scaleBreadCrum(mesh,scaleFactor,axis,duration)
{
	console.log("Function :: scaleBreadCrum");
	var targetScale = {};
	if (axis == 'z')
	{
		targetScale = {x:1,y:1,z:scaleFactor};
	}
	else if (axis == 'x')
	{
		targetScale = {x:scaleFactor,y:1,z:1};
	}
	else if (axis == 'y')
	{
		targetScale = {x:1,y:scaleFactor,z:1};
	}
	var tween = new TWEEN.Tween(mesh.scale).to(targetScale, duration).easing(TWEEN.Easing.Linear.None);
	/*tween.onUpdate(function(){
		grpObject.rotation.x = x;
		grpObject.rotation.y = y;
		grpObject.rotation.z = z;
	});*/
	tween.start();
	tween.onComplete(function(){
		
	});
}

var breadCrumsCubies = [];
//This function colors the selected/clicked face
//Clicked face could be on the cubie which part of the rubiks cube OR the clicked face could be on the breadcrum cubie
function colorThisFace(intersectObj)
{
	console.log("Function :: colorThisFace");
	var faceIndex = intersectObj.faceIndex;
	var materialIndex = intersectObj.face.materialIndex;
	var cubieMesh = intersectObj.object;
	
	console.log('cubenum = ' + cubieMesh.$cubie.$cubenum + ' | materialIndex = ' + materialIndex + ' | faceIndex = ' + faceIndex + ' | type of cubie = ' + cubieMesh.$cubie.type);
	
	if (cubieMesh.$cubie.type == 'center')
	{
		console.log('center cube clicked');
		activeRubiksCube.allowRotation = true;
	}
	else
	{
		//check whether the clicked cubie is part of the rubiks cube OR part of the bread crum cubies
		var isBreadCrum = false;
		var breadCrumType = undefined;
		for (key in breadCrumsPos)
		{
			var obj = breadCrumsPos[key];
			if (obj.hasOwnProperty('cubieMesh'))
			{
				var breadCrumMesh = obj['cubieMesh'];
				if (cubieMesh['uuid'] == breadCrumMesh['uuid'])
				{
					console.log('part of the bread crum for type OR already clicked, colored/selected',key);
					isBreadCrum = true;
					breadCrumType = key;
					break;
				}
			}
		}
		
		//Cubie face was clicked
		//if (!isBreadCrum)
		{
			//Check to make sure that none of the INNER face (face with no text) gets clicked
			if (cubieMesh.$cubie.$materialList.hasOwnProperty(materialIndex))
			{
				if (breadCrumsCubies.length > 2)
				{
					var existingOfferingMesh = breadCrumsCubies[breadCrumsCubies.length-1];
					var ExMaterialIndex = existingOfferingMesh.$materialClicked;
					var color = existingOfferingMesh.$cubie['color-face'+ExMaterialIndex];
					if (existingOfferingMesh.$cubie.usePNG)
					{
						existingOfferingMesh.material.materials[ExMaterialIndex].uniforms.color.value.setHex(color);
					}
					else
					{
						existingOfferingMesh.material.materials[ExMaterialIndex].color.setHex(color);
						existingOfferingMesh.geometry.colorsNeedUpdate = true;
					}				
					existingOfferingMesh.$materialClicked = undefined;
					breadCrumsCubies = $.grep( breadCrumsCubies ,
					        function(o,i) { return o['uuid'] === breadCrumsPos['offerings']['cubieMesh']['uuid']; },
					        true);
					delete breadCrumsPos['offerings']['cubieMesh'];
				}
				
				
				if (cubieMesh.$cubie.usePNG)
				{
					cubieMesh.material.materials[materialIndex].uniforms.color.value.setHex(selectionColor);
				}
				else
				{
					cubieMesh.material.materials[materialIndex].color.setHex(selectionColor);
					cubieMesh.geometry.colorsNeedUpdate = true;
				}				
				cubieMesh.$materialClicked = materialIndex;
				cubieMesh.$materialFaceName = faceNames[materialIndex.toString()]['facename'];
				cubieMesh.$rotationaxis = faceNames[materialIndex.toString()]['rotationaxis'];
				
				//Generate next level Rubiks cube
				var nextLevelDataOBj = cubieMesh.$cubie.$materialList[materialIndex];
				console.warn('nextLevelDataOBj for breadcrum',JSON.stringify(nextLevelDataOBj));
				
				var nextStep = function(){
					//console.log('next function');
					activeRubiksCube.visible = false;
					setCubeData(nextLevelDataOBj, cubieMesh.$cubie.$rubiksCubeType);
				};
				show2dBreadCrum(nextLevelDataOBj, cubieMesh.$cubie.$rubiksCubeType);
				moveCubieToTop(cubieMesh, nextStep);
								
			}
			else
			{
				console.log('clicked face does not have text/data');
				activeRubiksCube.allowRotation = true;
			}
		}
		//else
		{
			//BreadCrum was clicked
			//processBreadCrum(cubieMesh,breadCrumType);
		}		
	}		
}

function processBreadCrum(cubieMesh,breadCrumType)
{
	console.log("Function :: processBreadCrum");
	breadCrumsCubies = $.grep( breadCrumsCubies ,
            function(o,i) { return o['uuid'] === cubieMesh['uuid']; },
            true);
	
	if (errorCube.visible)
	{
		errorCube.hideErrorCube();
	}
	
	if (activeRubiksCube.rubiksCubeType != cubieMesh.$cubie.$rubiksCubeType)
	{
		hideRubiksCube(activeRubiksCube.group,-25, function(){
			activeRubiksCube.visible = false;
		});
	}
	
	var solutionsVisible = false, offeringsVisible = false;
	
	if (breadCrumsPos['solutions'].hasOwnProperty('cubieMesh'))
		solutionsVisible = true;
	
	if (breadCrumsPos['offerings'].hasOwnProperty('cubieMesh'))
		offeringsVisible = true;
	
	if (breadCrumType == 'categories')
	{
		if (solutionsVisible)
		{
			console.log('get rid of solutions breadcrum');
			
			breadCrumsCubies = $.grep( breadCrumsCubies ,
			        function(o,i) { return o['uuid'] === breadCrumsPos['solutions']['cubieMesh']['uuid']; },
			        true);
			reversalBreadCrum(breadCrumsPos['solutions'],0);
			breadCrumsPos['solutions'].RC.group.position.set(0,-25,0);
			hideRubiksCube(breadCrumsPos['solutions'].RC.group,-25);
		}	
		
		if (offeringsVisible)
		{
			console.log('get rid of offerings breadcrum');
			assetsSlider.classList.add("hidden");
			breadCrumsCubies = $.grep( breadCrumsCubies ,
			        function(o,i) { return o['uuid'] === breadCrumsPos['offerings']['cubieMesh']['uuid']; },
			        true);
			
			$('#WebGL-output').removeClass('translateX-35');
			
			reversalBreadCrum(breadCrumsPos['offerings'],0);
			breadCrumsPos['offerings'].RC.group.position.set(0,-25,0);
			hideRubiksCube(breadCrumsPos['offerings'].RC.group,-25);
		}		
	}
	else if (breadCrumType == 'solutions')
	{
		if (offeringsVisible)
		{
			console.log('get rid of offerings breadcrum');
			assetsSlider.classList.add("hidden");
			breadCrumsCubies = $.grep( breadCrumsCubies ,
			        function(o,i) { return o['uuid'] === breadCrumsPos['offerings']['cubieMesh']['uuid']; },
			        true);
			$('#WebGL-output').removeClass('translateX-35');
			
			reversalBreadCrum(breadCrumsPos['offerings'],0);
			breadCrumsPos['offerings'].RC.group.position.set(0,-25,0);
			hideRubiksCube(breadCrumsPos['offerings'].RC.group,-25);
		}
	}
	
	if (breadCrumType == 'offerings')
	{
		console.log('HIDE POPup');
		assetsSlider.classList.add("hidden");
		$('#WebGL-output').removeClass('translateX-35');
	}
	
	reversalBreadCrum(breadCrumsPos[breadCrumType],1000);	
}

//reversalBreadCrum(breadCrumsPos['solutions'],0)
//breadCrumsPos['solutions'].RC.group.position.set(0,-25,0);

//Move the selected the cubie to its breadcrum position and hides the rubiks cube
function moveCubieToTop(cubieMesh, nextStep)
{
	console.log("Function :: moveCubieToTop");
	
	//move cubieMesh to top left spot
	var currRubiksType = cubieMesh.$cubie.$rubiksCubeType;
	console.warn('currRubiksType',currRubiksType);
	
	breadCrumsPos[currRubiksType]['cubieMesh'] = cubieMesh;
	
	if (currRubiksType != 'offerings')
	{
		var cubie3dPos = get3dCood(breadCrumsPos[currRubiksType]['screen'].X,breadCrumsPos[currRubiksType]['screen'].Y);
		//console.log('cubie3dPos',cubie3dPos);
		breadCrumsPos[currRubiksType]['world3d'] = cubie3dPos;	
		
		//debugger;
		//Parent must be RC.group object
		var parent = cubieMesh.parent;
		parent.updateMatrixWorld();
		var parentVector = new THREE.Vector3();
		parent.position.copy(parentVector);
		
		breadCrumsPos[currRubiksType]['cubieMeshParentPosition'] = parentVector;
		//GEt world coordinate position of the cubieMesh
		breadCrumsPos[currRubiksType]['cubieMeshOriginalPosition'] = cubieMesh.position.clone();
		var vector = new THREE.Vector3();
		vector.setFromMatrixPosition( cubieMesh.matrixWorld );
		cubieMesh.position.copy(vector);
		breadCrumsPos[currRubiksType]['cubieMeshOriginalVector'] = vector;//cubieMesh.position;//
		
		THREE.SceneUtils.detach( cubieMesh, parent, scene );
		
		//console.log('cubieMesh.position',cubieMesh.position);
		//This will remove cubieMesh from its original parent group (RC.group) and add it to the world scene
		//window.scene.add(cubieMesh);
		window.CM = cubieMesh;
		var rotationDetails = getRotation(cubieMesh);
		cubieMesh.rotationDetails = rotationDetails;
		cubieMesh.lookAt(camera.position);
		cubieMesh.rotation.set(0,0,0);
		cubieMesh.rotateOnAxis(rotationDetails['rotationAxis'],rotationDetails['rotationAngle']);
		//moveObject(cubieMesh,-10,8,-15,3000);
		
		scaleBreadCrum(cubieMesh,0.2,rotationDetails['scaleAxis'],750);
		/*moveObject(cubieMesh,cubie3dPos.x,cubie3dPos.y,-3,1000, function(){
			breadCrumsCubies.push(cubieMesh);
		});*/
		moveObject(cubieMesh,0,15,0,1000, function(){
			breadCrumsCubies.push(cubieMesh);
		});
		
		//move the parent group along z or disappear
		//moveObject(parent,0,0,-15,3000,nextStep);
		hideRubiksCube(parent,-25,nextStep);
		
		
	}
	else if (currRubiksType == 'offerings')
	{
		$('#WebGL-output').addClass('translateX-35');
		breadCrumsCubies.push(cubieMesh);
		if (nextStep)
			nextStep();
		
		var parent = cubieMesh.parent;
		moveRubiksCube(parent,-8);
	}
		
	window.CM = cubieMesh;
}


//reversalBreadCrum(breadCrumsPos['categories'])
//This function brings the selected breadcrum cubie back to its rubiks cube position
function reversalBreadCrum(breadCrumsObj, animationDuration)
{
	console.warn('Function :: reversalBreadCrum',breadCrumsObj.type);
	
	if (breadCrumsObj)
	{		
		var catCM = breadCrumsObj;
				
		if (catCM.cubieMesh)
		{
			if (catCM.type != 'offerings')
			{
				scaleBreadCrum(catCM.cubieMesh,1,catCM.cubieMesh.rotationDetails['scaleAxis'],750);
				moveObject(catCM.cubieMesh,catCM.cubieMeshOriginalVector.x,catCM.cubieMeshOriginalVector.y,catCM.cubieMeshOriginalVector.z,animationDuration,function(){
					hide2dBreamCrum(catCM.type);
					
					if (breadCrumsCubies.length > 0)
					{
						highlightBreadCrum(breadCrumsCubies[breadCrumsCubies.length-1].$cubie.$rubiksCubeType);
					}
				});
				
				var originalParentGroup = catCM.cubieMesh.$cubie.originalParent;
				moveObject(originalParentGroup,catCM.cubieMeshParentPosition.x,catCM.cubieMeshParentPosition.y,catCM.cubieMeshParentPosition.z,animationDuration, function(){
					THREE.SceneUtils.attach(catCM.cubieMesh, scene, catCM.cubieMesh.$cubie.originalParent);
					catCM.cubieMesh.position.set(catCM['cubieMeshOriginalPosition'].x,catCM['cubieMeshOriginalPosition'].y,catCM['cubieMeshOriginalPosition'].z);
					catCM.cubieMesh.rotation.set(0,0,0);
					catCM.cubieMesh.scale.set(1,1,1);
					var materialIndex = catCM.cubieMesh.$materialClicked;
					var color = catCM.cubieMesh.$cubie['color-face'+materialIndex];
					if (catCM.cubieMesh.$cubie.usePNG)
					{
						catCM.cubieMesh.material.materials[materialIndex].uniforms.color.value.setHex(color);
					}
					else
					{
						catCM.cubieMesh.material.materials[materialIndex].color.setHex(color);
						catCM.cubieMesh.geometry.colorsNeedUpdate = true;
					}				
					catCM.cubieMesh.$materialClicked = undefined;
					
					delete catCM['cubieMeshOriginalPosition'];
					delete catCM['cubieMesh'];
					delete catCM['cubieMeshOriginalVector'];
					delete catCM['cubieMeshParentPosition'];
					delete catCM['world3d'];
					
					if (activeRubiksCube)
					{
						activeRubiksCube.allowRotation = false;
						activeRubiksCube = undefined;
						targetRotationX=0;
						targetRotationY=0;
						finalRotationY=0;
					}					
					
					activeRubiksCube = catCM.RC;
					activeRubiksCube.allowRotation = true;
					activeRubiksCube.visible = true;
					//activeRubiksCube.addAllCubieClicks();

				});
			}
			else if (catCM.type == 'offerings')
			{
				var originalParentGroup = catCM.cubieMesh.$cubie.originalParent;
				moveRubiksCube(originalParentGroup,0);
				hide2dBreamCrum(catCM.type);
				if (breadCrumsCubies.length > 0)
				{
					highlightBreadCrum(breadCrumsCubies[breadCrumsCubies.length-1].$cubie.$rubiksCubeType);
				}
				var materialIndex = catCM.cubieMesh.$materialClicked;
				var color = catCM.cubieMesh.$cubie['color-face'+materialIndex];
				if (catCM.cubieMesh.$cubie.usePNG)
				{
					catCM.cubieMesh.material.materials[materialIndex].uniforms.color.value.setHex(color);
				}
				else
				{
					catCM.cubieMesh.material.materials[materialIndex].color.setHex(color);
					catCM.cubieMesh.geometry.colorsNeedUpdate = true;
				}				
				catCM.cubieMesh.$materialClicked = undefined;
				delete catCM['cubieMesh'];
				
				if (activeRubiksCube)
				{
					activeRubiksCube.allowRotation = false;
					activeRubiksCube = undefined;
					targetRotationX=0;
					targetRotationY=0;
					finalRotationY=0;
				}			
				
				activeRubiksCube = catCM.RC;
				activeRubiksCube.allowRotation = true;
				activeRubiksCube.visible = true;
				//activeRubiksCube.addAllCubieClicks();
			}			
			
			//debugger;
		}		
	}	
}

function getRotation(cubieMesh)
{
	//CM.position.set(0,0,10);CM.lookAt(camera.position);moveObject(CM,18,8,-3,3000);CM.rotateOnAxis(new THREE.Vector3(0,1,0),degToRad(-90));
	
	//move the cubie in front of the camera
	/*setTimeout(function(){
		cubieMesh.position.set(0,0,10);
	},2000);*/
	
	//make the cubie to look at the camera
	/*setTimeout(function(){cubieMesh.lookAt(camera.position);}, 3000);*/
	
	//apply rotation to bring the clicked face in front
	//CM.rotateOnAxis(new THREE.Vector3(0,1,0),degToRad(-90));
	
	
	var rotationAngle = undefined;
	var rotationAxis = undefined;
	switch(cubieMesh.$materialFaceName){
		
	case 'right':
		//console.log('right');
		rotationAngle = degToRad(-90);
		rotationAxis = new THREE.Vector3(0,1,0);
		scaleAxis = 'x';
		break;
	
	case 'left':
		//console.log('left');
		rotationAngle = degToRad(90);
		rotationAxis = new THREE.Vector3(0,1,0);
		scaleAxis = 'x';
		break;
	
	case 'top':
		//console.log('top');
		rotationAngle = degToRad(90);
		rotationAxis = new THREE.Vector3(1,0,0);
		scaleAxis = 'y';
		break;
	
	case 'bottom':
		//console.log('bottom');
		rotationAngle = degToRad(-90);
		rotationAxis = new THREE.Vector3(1,0,0);
		scaleAxis = 'y';
		break;
	
	case 'front':
		//console.log('front');
		rotationAngle = degToRad(0);
		rotationAxis = new THREE.Vector3(0,1,0);
		scaleAxis = 'z';
		break;
	
	case 'back':
		//console.log('back');
		rotationAngle = degToRad(180);
		rotationAxis = new THREE.Vector3(0,1,0);
		scaleAxis = 'z';
		break;
	
	default: break;
	
	}
	
	/*setTimeout(function(){
		cubieMesh.rotateOnAxis(rotationAxis,rotationAngle);
	},4000);*/
	
	//finally move the bread crum to its location
	/*setTimeout(function(){
		moveObject(cubieMesh,X,Y,Z,3000);
	},5000);*/
	
	return {'rotationAxis':rotationAxis,'rotationAngle':rotationAngle,'scaleAxis':scaleAxis};
}

function computeLookat(intersectObj)
{
	/*
	//http://stackoverflow.com/questions/36385478/angle-of-face-to-camera-three-js
	var triangleNormal = triangleMesh.geometry.faces[0].normal;
	var dirToCamera = camera.position.clone().sub(triangleMesh.position);
	dirToCamera.normalize();
	var angleValue = triangleNormal.dot(dirToCamera);
	var angle = Math.acos(angleValue) * 180/Math.PI;
	*/
	var faceobj = intersectObj;
	// direction the FACE is facing
	var normal = faceobj.face.normal.clone();
	
	
	var geometry = faceobj.object.geometry;
	var vertices = geometry.vertices;
	
	// If you need to calculate the center of the face, take the average positions of its vertices:
	var faceCenter = vertices[faceobj.face.a].clone()
						.add(vertices[faceobj.face.b])
						.add(vertices[faceobj.face.c])
						.divideScalar(3);
	
	// the vector pointing from the face to the camera
	// direction to the camera,  dir = cameraPosition - faceCenter
	var dirToCamera = camera.position.clone().sub(faceCenter);
	dirToCamera.normalize();
	
	// dot product of the two vectors
	var angleValue = normal.dot(dirToCamera);
	
	// angleValue will be 1 when facing the camera, 
	// 0 when 90degree, and -1 when face the opposite direction. 
	// If you need degrees instead, do this:
	var angle = Math.acos(angleValue) * 180/Math.PI;
	
	//console.log('angleValue',angleValue);
	//console.log('angle',angle);
	return {'angle':angle,'angleValue':angleValue,'faceCenter':faceCenter};
	/*
	var CO = new THREE.Object3D();
	scene.add(CO);
	var worldCoord = CM.position.clone();
	THREE.SceneUtils.attach( CM, scene, CO );
	//position the child at the center of the parent
	CM.position.set(0,0,0);
	CO.position.set(worldCoord.x,worldCoord.y,worldCoord.z);
	CO.rotateOnAxis(new THREE.Vector3(0,1,0),degToRad(temp1.angle));
	*/
	
	//CM.position.set(0,0,10);CM.lookAt(camera.position);moveObject(CM,18,8,-3,3000);
	//CM.rotateOnAxis(new THREE.Vector3(0,1,0),degToRad(-90));
	
}

function isArrayFull( arr )
{
  for ( var i = 0, l = arr.length; i < 6; i++ )
  {
    if ( 'undefined' == typeof arr[i] || null === arr[i] )
    {
      return false
    }
  }
  return true;
}


function stringDivider(str, width, spaceReplacer) {
    
    if (str.length>width) {
        var p=width
        for (;p>0 && str[p]!=' ';p--) {
        }
        if (p>0) {
            var left = str.substring(0, p);
            var right = str.substring(p+1);
            cubielabelarray.push(left);
            return left + spaceReplacer + stringDivider(right, width, spaceReplacer);
        }
    }
    cubielabelarray.push(str);
    return str;
}