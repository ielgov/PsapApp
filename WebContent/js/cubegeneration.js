var CUBE_SIZE = 3;
var GAP_BETWEEN_CUBES = 0.2;

//Object containing 2d screen coordinate positions for breadcrums
//Idea being the breadcrums will be positioned in the 3d world/scene corresponding to top(Y) left(X) window position
var breadCrumsPos = {
		'categories':{
			'screen':{
				'X':0.95,//0.03
				'Y':0.1,//0.1
				}
			},
		'solutions':{
			'screen':{
				'X':0.95,//0.15
				'Y':0.35,//0.1
				}
		},
		'offerings':{
			'screen':{
				'X':0.95,//0.27
				'Y':0.6,//0.1
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
	console.log('nextLevelDataObj',nextLevelDataObj);
	console.log('currRubiksType',currRubiksType);
	if (currRubiksType == 'categories')
	{
		//Draw rubiks cube for 'solutions' under this category
		appData['solutions']['getDataFor'] = nextLevelDataObj;
		var returnedData = getData(appData['solutions']);
		var cubeData = appData['solutions'];
		cubeData['data'] = returnedData;
		drawRubiksCube(cubeData,nextLevelDataObj);
	}
	else if (currRubiksType == 'solutions')
	{
		//Draw rubiks cube for 'offerings' under this solution
		appData['offerings']['getDataFor'] = nextLevelDataObj;
		var returnedData = getData(appData['offerings']);
		var cubeData = appData['offerings'];
		cubeData['data'] = returnedData;
		drawRubiksCube(cubeData,nextLevelDataObj);
	}
	else if (currRubiksType == 'offerings')
	{
		//Get all assets for this offering
		console.log("Show Assets overlay - call function to show Assets popup");
		var offeringId = nextLevelDataObj['CategoryId'];
		var name = nextLevelDataObj['Name'];
		var display = nextLevelDataObj['Display'];
		var parentId = activeRubiksCube['parentData']['CategoryId'];
		console.log('parent',activeRubiksCube['parentData']);
		console.log('offeringId',offeringId);
		console.log('parentId',parentId);
		console.log('display',display);
		console.log('name',name);
		showPopUp(offeringId, parentId);
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
		setTimeout(function(){
			RC.assignDataToFaces();
			setTimeout(function(){
				//RC.drawCubiesNew();
				RC.drawCubies();
				//RC.addAllCubieClicks();
				RC.allowRotation = true;
				activeRubiksCube = RC;
				if (parentData)
					RC['parentData'] = parentData;
				setTimeout(function(){showRubiksCube(RC.group)},750);
			},500);
		},500);
	}
	else
	{
		console.warn('Rubiks Cube already drawn for',cubeData['type']);
		activeRubiksCube = cubeData.RC;
		activeRubiksCube.allowRotation = true;
		showRubiksCube(activeRubiksCube.group);
		activeRubiksCube.parentData = parentData;
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
	
	
	this.textureLineHeight = 0.2;
	this.textureFillStyle = 'black';
	this.textureAlignText = 'center';
	this.textureFont = "bold "+(0.2*512)+"px Helvetica";//Arial
	
	this.init = function(){
		if (this.dimensions == 2)
			this.maxNumOfSols = 4;
		else if (this.dimensions == 3)
			this.maxNumOfSols = 8;
		this.group = new THREE.Group();
		scene.add(this.group);
		this.group.position.set(0,25,0);
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
		//console.log("Function :: findCubieFaceColors");
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
		//console.log("Function :: assignDataToFaces");
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
							//console.log('faceMaxNumOfSols is ' + faceMaxNumOfSols + ', which has reached its limit...so being next face data assignment');
							faceMaxNumOfSols = 0;
							cubeDataCount++;
							break;
						}
						
					}
					else if (cubeDataCount >= cubeData.length)
					{
						//console.log('cubeDataCount is ' + cubeDataCount + ', which has reached its limit...so being next face data assignment');
						cubeDataCount = 0;
						break;
					}
					
				}
				else if (cubie.type == 'center')
				{
					//console.log(cubie.$cubenum + ' is center cube');
					var dataobj = {};
					dataobj['Display'] = 'CENTER';
					dataobj['Name'] = 'CENTER';
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
		//console.log(cubie.$cubenum + ' assigned data = ' + faceData['Display'] + ' | for material index = ' + materialIndex);
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
		//console.log("Function :: drawCubies");
		for (var cubenum in ref.allCubies)
		{
			//console.log('cubenum',cubenum);
			var cubie = ref.allCubies[cubenum];
			//console.log('cubie',cubie);
			
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
			ref.allDrawnCubies.push(cube);
			
			//set clicks
			//ref.setCubieClicks(cube);
		}
	};
	
	//this function generates texture for each face based upon its data
	this.generateDynamicTextures = function(cubie){
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
					text		: dataObj['Display'],//faceText['Name'],//
					lineHeight	: ref.textureLineHeight,
					fillStyle	: ref.textureFillStyle,
					align		: ref.textureAlignText,
					font		: ref.textureFont
				});*/
				
				ref.textureFont = "55px Verdana";
				
				var str = dataObj['Display'];
				var indices = [];
				for(var j=0; j<str.length;j++) 
				{
				    if (str[j] === " ") indices.push(j);
				}
				//console.log('str',str);
				//console.log('indices',indices);
				//debugger;
				if (indices.length > 4 && indices.length <=5)
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
				
				var faceMeshMat = new THREE.MeshLambertMaterial({color: cubie['color-face'+i], vertexColors: THREE.FaceColors, map: dynamicTexture.texture});
				faceMeshMat.$data = dataObj;
				materials.push(faceMeshMat);
			}
			else
			{
				var faceMeshMat = new THREE.MeshLambertMaterial({color: 0x000000, vertexColors: THREE.FaceColors});
				materials.push(faceMeshMat);
			}
		}
		
		return materials;
	};
	
	this.generateDynamicCanvas = function(cubie){
		//console.log('Function:: generateDynamicCanvas');		
		for (var i=0;i<6;i++)
		{
			if (cubie.$materialList.hasOwnProperty(i))
			{
				var dataObj = cubie.$materialList[i];
				var canvastext = dataObj['Display'];				
				
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
			console.log('cubie mousedown ',cubie);
			lastCubieClicked = cubie;
			lastCubieEvent = event;
			//onCubieMouseDown(event, cubie);
		}, false);
	};
}
var lastCubieClicked = undefined;

function onCubieMouseDown(event, cubie)
{
	console.log("Function :: onCubeMouseDown",cubie);
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
			'rotationaxis':'y'
		},
		'1':{
			'facename':'left',
			'rotationaxis':'y'
		},
		'2':{
			'facename':'top',
			'rotationaxis':'x'
		},
		'3':{
			'facename':'bottom',
			'rotationaxis':'x'
		},
		'4':{
			'facename':'front',
			'rotationaxis':'y'
		},
		'5':{
			'facename':'back',
			'rotationaxis':'y'
		}
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
	
	console.log('cubenum = ' + cubieMesh.$cubie.$cubenum + ' | materialIndex = ' + materialIndex + ' | faceIndex = ' + faceIndex);
	
	//check whether the clicked cubie is part of the rubiks cube or part of the bread crum cubies
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
				console.log('part of the bread crum for type',key);
				isBreadCrum = true;
				breadCrumType = key;
				break;
			}
		}
	}
	
	if (!isBreadCrum)
	{
		//Check to make sure that none of the INNER face (face with no text) gets clicked
		if (cubieMesh.$cubie.$materialList.hasOwnProperty(materialIndex))
		{
			cubieMesh.material.materials[materialIndex].color.setHex(0xff0000);
			cubieMesh.geometry.colorsNeedUpdate = true;
			cubieMesh.$materialClicked = materialIndex;
			cubieMesh.$materialFaceName = faceNames[materialIndex.toString()]['facename'];
			cubieMesh.$rotationaxis = faceNames[materialIndex.toString()]['rotationaxis'];
			
			//Generate next level Rubiks cube
			var nextLevelDataOBj = cubieMesh.$cubie.$materialList[materialIndex];
			console.warn('nextLevelDataOBj for breadcrum',nextLevelDataOBj);
			
			var nextStep = function(){
				console.log('next function');
				setCubeData(nextLevelDataOBj, cubieMesh.$cubie.$rubiksCubeType);
			};
			
			moveCubieToTop(cubieMesh, nextStep);
		}
		else
		{
			console.log('clicked face does not have text/data');
		}
	}
	else
	{
		breadCrumsCubies = $.grep( breadCrumsCubies ,
                function(o,i) { return o['uuid'] === cubieMesh['uuid']; },
                true);
		
		if (activeRubiksCube.rubiksCubeType != cubieMesh.$cubie.$rubiksCubeType)
		{
			hideRubiksCube(activeRubiksCube.group,-25,nextStep);
		}	
		
		reversalBreadCrum(breadCrumsPos[breadCrumType])
	}
	
	
		
}


//Move the selected the cubie to its breadcrum position and hides the rubiks cube
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
	
	THREE.SceneUtils.detach( cubieMesh, parent, scene );
	
	console.log('cubieMesh.position',cubieMesh.position);
	//This will remove cubieMesh from its original parent group (RC.group) and add it to the world scene
	//window.scene.add(cubieMesh);
	window.CM = cubieMesh;
	
	//move cubieMesh to top left spot
	var currRubiksType = cubieMesh.$cubie.$rubiksCubeType;
	console.log('currRubiksType',currRubiksType);
	
	var cubie3dPos = get3dCood(breadCrumsPos[currRubiksType]['screen'].X,breadCrumsPos[currRubiksType]['screen'].Y);
	
	breadCrumsPos[currRubiksType]['cubieMeshParentPosition'] = parentVector;
	breadCrumsPos[currRubiksType]['world3d'] = cubie3dPos;
	breadCrumsPos[currRubiksType]['cubieMesh'] = cubieMesh;
	breadCrumsPos[currRubiksType]['cubieMeshOriginalVector'] = vector;//cubieMesh.position;//
	console.log('cubie3dPos',cubie3dPos);
	
	//moveObject(cubieMesh,-10,8,-15,3000);
	moveObject(cubieMesh,cubie3dPos.x,cubie3dPos.y,-3,3000, function(){
		breadCrumsCubies.push(cubieMesh);
	});
	//startBreadcrum(cubieMesh,cubie3dPos.x,cubie3dPos.y,-3);
	
	//move the parent group along z or disappear
	//moveObject(parent,0,0,-15,3000,nextStep);
	hideRubiksCube(parent,-25,nextStep);
	window.CM = cubieMesh;
}


//reversalBreadCrum(breadCrumsPos['categories'])
//This function brings the selected breadcrum cubie back to its rubiks cube position
function reversalBreadCrum(breadCrumsObj)
{
	console.log('Function :: reversalBreadCrum');
	
	if (breadCrumsObj)
	{		
		var catCM = breadCrumsObj;
				
		if (catCM.cubieMesh)
		{
			moveObject(catCM.cubieMesh,catCM.cubieMeshOriginalVector.x,catCM.cubieMeshOriginalVector.y,catCM.cubieMeshOriginalVector.z,2000);
			
			var originalParentGroup = catCM.cubieMesh.$cubie.originalParent;
			moveObject(originalParentGroup,catCM.cubieMeshParentPosition.x,catCM.cubieMeshParentPosition.y,catCM.cubieMeshParentPosition.z,3000, function(){
				THREE.SceneUtils.attach(catCM.cubieMesh, scene, catCM.cubieMesh.$cubie.originalParent);
				
				var materialIndex = catCM.cubieMesh.$materialClicked;
				var color = catCM.cubieMesh.$cubie['color-face'+materialIndex];
				catCM.cubieMesh.material.materials[materialIndex].color.setHex(color);
				catCM.cubieMesh.geometry.colorsNeedUpdate = true;
				catCM.cubieMesh.$materialClicked = undefined;
				
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
				//activeRubiksCube.addAllCubieClicks();
			});
			//debugger;
		}		
	}	
}

function startBreadcrum(cubieMesh,X,Y,Z)
{
	//CM.position.set(0,0,10);CM.lookAt(camera.position);moveObject(CM,18,8,-3,3000);CM.rotateOnAxis(new THREE.Vector3(0,1,0),degToRad(-90));
	
	//move the cubie in front of the camera
	setTimeout(function(){
		cubieMesh.position.set(0,0,10);
	},2000);
	
	//make the cubie to look at the camera
	setTimeout(function(){cubieMesh.lookAt(camera.position);}, 3000);
	
	//apply rotation to bring the clicked face in front
	//CM.rotateOnAxis(new THREE.Vector3(0,1,0),degToRad(-90));
	
	
	window.rotationAngle = undefined;
	window.rotationAxis = undefined;
	switch(cubieMesh.$materialFaceName){
		
	case 'right':
		console.log('right');
		rotationAngle = degToRad(-90);
		rotationAxis = new THREE.Vector3(0,1,0);
		break;
	
	case 'left':
		console.log('left');
		rotationAngle = degToRad(90);
		rotationAxis = new THREE.Vector3(0,1,0);
		break;
	
	case 'top':
		console.log('top');
		rotationAngle = degToRad(90);
		rotationAxis = new THREE.Vector3(1,0,0);
		break;
	
	case 'bottom':
		console.log('bottom');
		rotationAngle = degToRad(-90);
		rotationAxis = new THREE.Vector3(1,0,0);
		break;
	
	case 'front':
		console.log('front');
		rotationAngle = degToRad(0);
		rotationAxis = new THREE.Vector3(0,1,0);
		break;
	
	case 'back':
		console.log('back');
		rotationAngle = degToRad(180);
		rotationAxis = new THREE.Vector3(0,1,0);
		break;
	
	default: break;
	
	}
	
	setTimeout(function(){
		cubieMesh.rotateOnAxis(rotationAxis,rotationAngle);
	},4000);
	
	//finally move the bread crum to its location
	setTimeout(function(){
		moveObject(cubieMesh,X,Y,Z,3000);
	},5000);
	
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
	
	console.log('angleValue',angleValue);
	console.log('angle',angle);
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