var errorCube = undefined;
function initialErrorCubeSetup()
{
	console.log("Function :: initialErrorCubeSetup");
	errorCube = new ErrorCube({
		'cubeSize':4,
		'startingPosition':{x:0,y:25,z:0},
		'cubeData':{
					'display':'Coming Soon',
					/*'Name':'Coming Soon',*/
					'errortype':'not implemented'
					}
	});
	errorCube.init();
}

function ErrorCube(options)
{
	var ref = this;
	this.options = options;
	this.cubeSize = options.cubeSize || CUBE_SIZE;
	
	this.backGroundColor = 0x00b2ef;//0xf2f1eb;//0xa5a8ab

	this.textureLineHeight = 0.2;
	this.textureFillStyle = 'black';
	this.textureAlignText = 'center';
	this.textureFont = "55px Verdana";//Arial
	
	this.geometry = undefined;
	this.material = undefined;
	this.cube = undefined;
	
	this.allowRotation = false;
	
	this.visible = false;
	
	this.startingPosition = options.startingPosition || {x:0,y:50,z:0};
	
	
	this.cubeData = options.cubeData || undefined;
	
	this.init = function(){
		var meshMaterial = this.generateDynamicTexture();
		this.geometry = new THREE.BoxGeometry( ref.cubeSize, ref.cubeSize, ref.cubeSize, 1, 1, 1);
		this.material = meshMaterial;						
		this.cube = new THREE.Mesh(this.geometry, this.material);
		
		this.cube.castShadow = true;
		this.cube.receiveShadow = false;	
		
		this.cube.position.set(ref.startingPosition.x,ref.startingPosition.y,ref.startingPosition.z);
		
		scene.add(this.cube);
	};
	
	this.generateDynamicTexture = function(){
		console.log("Function :: generateDynamicTexture");
		var dynamicTexture	= new THREEx.DynamicTexture(512,512);
		dynamicTexture.texture.anisotropy = renderer.getMaxAnisotropy();
		dynamicTexture.clear('white');
		
		dynamicTexture = ref.getFaceData(ref.cubeData, dynamicTexture);
		
		var faceMeshMat = new THREE.MeshLambertMaterial({color: ref.backGroundColor, vertexColors: THREE.FaceColors, map: dynamicTexture.texture});
		faceMeshMat.$data = ref.cubeData;
		return faceMeshMat;
	};
	
	this.getFaceData = function(dataObj, dynamicTexture){
		console.log("Function :: getFaceData");
		var str = dataObj['display'];
		console.log('str',str);
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
	};
	
	this.refreshCubeFaces = function(dataObj){
		ref.cubeData = dataObj;
		var meshMaterial = ref.generateDynamicTexture();
		ref.cube.material = meshMaterial;
		ref.cube.material.needsUpdate = true;
	};
	
	this.showErrorCube = function(){
		console.log("Function :: showErrorCube");
		showRubiksCube(ref.cube, function(){
			ref.visible = true;
			ref.allowRotation = true;
			console.log('tween complete - show error cube');
		});
	};
	
	this.hideErrorCube = function(){
		console.log("Function :: hideErrorCube");
		hideRubiksCube(ref.cube,-25, function(){
			ref.visible = false;
			ref.allowRotation = false;
			console.log('tween complete - hide error cube');
		});
	};
	
}