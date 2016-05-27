var mats = [];
mats.push(new THREE.MeshBasicMaterial({ color: 0x009e60 , vertexColors: THREE.FaceColors , map: dynamicTextures[0].texture}));//material index = 0
mats.push(new THREE.MeshBasicMaterial({ color: 0x0051ba , vertexColors: THREE.FaceColors , map: dynamicTextures[1].texture}));//1
mats.push(new THREE.MeshBasicMaterial({ color: 0xffd500 , vertexColors: THREE.FaceColors , map: dynamicTextures[2].texture}));//2
mats.push(new THREE.MeshBasicMaterial({ color: 0xff5800 , vertexColors: THREE.FaceColors , map: dynamicTextures[3].texture}));//3
mats.push(new THREE.MeshBasicMaterial({ color: 0xC41E3A , vertexColors: THREE.FaceColors , map: dynamicTextures[4].texture}));//4
mats.push(new THREE.MeshBasicMaterial({ color: 0xffffff , vertexColors: THREE.FaceColors , map: dynamicTextures[5].texture}));//5
cubeMaterials = new THREE.MeshFaceMaterial(mats);

var mats1 = [];
mats1.push(new THREE.MeshBasicMaterial({ color: 0xa5a8ab , vertexColors: THREE.FaceColors , map: dynamicTextures[0].texture}));//material index = 0
mats1.push(new THREE.MeshBasicMaterial({ color: 0xa5a8ab , vertexColors: THREE.FaceColors , map: dynamicTextures[1].texture}));//1
mats1.push(new THREE.MeshBasicMaterial({ color: 0xa5a8ab , vertexColors: THREE.FaceColors , map: dynamicTextures[2].texture}));//2
mats1.push(new THREE.MeshBasicMaterial({ color: 0xa5a8ab , vertexColors: THREE.FaceColors , map: dynamicTextures[3].texture}));//3
mats1.push(new THREE.MeshBasicMaterial({ color: 0xa5a8ab , vertexColors: THREE.FaceColors , map: dynamicTextures[4].texture}));//4
mats1.push(new THREE.MeshBasicMaterial({ color: 0xa5a8ab , vertexColors: THREE.FaceColors , map: dynamicTextures[5].texture}));//5
cubeMaterials = new THREE.MeshFaceMaterial(mats1);

//drawAllCubes();

function drawAllCubes()
{
	console.log("Function :: drawAllCubes");
	for(var i = 0; i < dimensions; i ++) //along x axis, left to right 
	{
		for(var j = 0; j < dimensions; j ++) //along y axis, bottom to top 
		{
			for(var k = 0; k < dimensions; k ++) //along z axis, back to front
			{
				var x = (i - positionOffset) * increment;
				var y = (j - positionOffset) * increment;
				var z = (k - positionOffset) * increment;
				/*var x = (i + positionOffset) * increment;
				var y = (j + positionOffset) * increment;
				var z = (k + positionOffset) * increment;*/
				newCube(x, y, z);
			}
		}
	}
	
	/*
	for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 3; y++) {
            for (var z = 0; z < 3; z++) {
                var cubeGeom = new THREE.BoxGeometry(2.9, 2.9, 2.9);
                var cube = new THREE.Mesh(cubeGeom, cubeMaterials);
                cube.position.copy(new THREE.Vector3(x * 3 - 3, y * 3, z * 3 - 3).clone());
                cube.castShadow = true;
                cube.receiveShadow = false;
                cube.$cubenum = cubenum;
                cubenum++;
                group.add(cube);
                allCubes.push(cube);
            }
        }
    }
    scene.add(group);
    */
}

function newCube(x,y,z)
{	
	console.log("Function :: newCube");
	console.log('x = '+ x + ' | y = ' + y + ' | z = ' + x + ' | cubenum = ' + cubenum);
	var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
    cube.castShadow = true;
    cube.receiveShadow = false;
    //cube.position = new THREE.Vector3(x, y, z);
    cube.position.copy(new THREE.Vector3(x, y, z).clone());
    console.log(cube.position);
    cube.rubikPosition = cube.position.clone();
    cube.$cubenum = cubenum;
    cubenum++;
    
    setCubeClicks(cube);
    
    group.add(cube);
    //scene.add(cube);
    allCubes.push(cube); 

}

function generateDynamicTexture()
{
	for (var i=0;i<6;i++)
	{
		var dynamicTexture	= new THREEx.DynamicTexture(512,512)
		dynamicTexture.context.font	= "bold "+(0.2*512)+"px Arial";
		dynamicTexture.texture.anisotropy = renderer.getMaxAnisotropy();
		// update the text
		dynamicTexture.clear('white')
		// dynamictexture.drawText('Hello', undefined, 256, 'red')
		dynamicTexture.drawTextCooked({
			text		: i.toString(),
			lineHeight	: 0.5,
			fillStyle	: 'black',
			align		: 'center',
			font		: "bold "+(0.5*512)+"px Arial",
		});
		
		dynamicTextures.push(dynamicTexture);
	}
}
//generateDynamicTexture();