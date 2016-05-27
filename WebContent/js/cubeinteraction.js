var mouseSelectX, mouseSelectY;
var INTERSECTED;

var baseColor=new THREE.Color( 0x44dd66 );
var highlightedColor=new THREE.Color( 0xddaa00 );
var selectedColor=new THREE.Color( 0x4466dd );

var EE;
function onDocumentMouseDown( event ) 
{
	EE = event;
	console.log("Function :: onDocumentMouseDown");
	event.preventDefault();
	
	document.querySelector("#WebGL-output").addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.querySelector("#WebGL-output").addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.querySelector("#WebGL-output").addEventListener( 'mouseout', onDocumentMouseOut, false );
	
	mouseXOnMouseDown = event.clientX - windowHalfX;
	targetRotationOnMouseDownX = targetRotationX;
	
	mouseYOnMouseDown = event.clientY - windowHalfY;
	targetRotationOnMouseDownY = targetRotationY;
	
	mouseSelectX = event.clientX - $('#WebGL-output').position().left;
	mouseSelectY = event.clientY - $('#WebGL-output').position().top;
	//checkSelected();
	
}

function onDocumentMouseMove( event ) 
{
	console.log("Function :: onDocumentMouseMove");
	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;	
	
	targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.02;
	targetRotationX = targetRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * 0.02;
	
	mouseSelectX = event.clientX - $('#WebGL-output').position().left;
	mouseSelectY = event.clientY - $('#WebGL-output').position().top;
}

function onDocumentMouseUp( event ) 
{
	console.log("Function :: onDocumentMouseUp");
	document.querySelector("#WebGL-output").removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.querySelector("#WebGL-output").removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.querySelector("#WebGL-output").removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function onDocumentMouseOut( event ) 
{
	console.log("Function :: onDocumentMouseOut");
	document.querySelector("#WebGL-output").removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.querySelector("#WebGL-output").removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.querySelector("#WebGL-output").removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function onDocumentTouchStart( event ) 
{
	console.log("Function :: onDocumentTouchStart");
    if ( event.touches.length == 1 ) 
    {
		event.preventDefault();
		
		mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
		targetRotationOnMouseDownX = targetRotationX;
		
		mouseYOnMouseDown = event.touches[ 0 ].pageY - windowHalfY;
		targetRotationOnMouseDownY = targetRotationY;
    }
}

function onDocumentTouchMove( event ) 
{
	console.log("Function :: onDocumentTouchMove");

	if ( event.touches.length == 1 ) 
	{	
		event.preventDefault();
		
		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		targetRotationX = targetRotationOnMouseDownX + ( mouseX - mouseXOnMouseDown ) * 0.05;//0.05
		
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
		targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.05;//0.05	
	}

}


function checkSelected()
{
	console.log("Function :: checkSelected");
	console.log("mouseSelectX = " + mouseSelectX + " || mouseSelectX = " + mouseSelectY);
	var projector = new THREE.Projector();
	
	var x = (mouseSelectX / webGLWidth) * 2 - 1;
	var y = -(mouseSelectY / webGLHeight) * 2 + 1;
	var vector = new THREE.Vector3(x,y,0.5);
	
	projector.unprojectVector(vector, camera);
	
	var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
	// create an array containing all objects in the scene with which the ray intersects
	window.intersects = raycaster.intersectObjects(allCubes);
	
	if (intersects.length > 0)
	{
		console.log("Intersected cubes");
		/*intersects[0].object.material.transparent = true;
		if (intersects[0].object.material.opacity === 0.5)
		{
			intersects[0].object.material.opacity = 1;
		}
		else
		{
			intersects[0].object.material.opacity = 0.5;
		}*/
		
		console.log("Hit @ " + toString( intersects[0].point ) );
		// change the color of the closest face.
		var randomRed = 0.8 * Math.random();
		//intersects[ 0 ].face.color.setRGB( randomR + 0.2, 0, 0 ); 
		
		var geom = intersects[ 0 ].object.geometry;
		for ( var i = 0; i < geom.faces.length; i ++ ) 
		{
		    //geom.faces[ i ].color.setHex( Math.random() * 0xffffff );
			//geom.faces[i].color.setRGB(randomRed, 0, 0);
			geom.faces[i].color.setHex(0xff00ff);
		}
		
		intersects[ 0 ].object.geometry.colorsNeedUpdate = true;
	}
	else
	{
		console.log("nothing intersected");
	}	
}

function checkHighlight()
{
	console.log("Function :: checkHighlight");
	console.log("mouseSelectX = " + mouseSelectX + " || mouseSelectX = " + mouseSelectY);
	var projector = new THREE.Projector();
	
	var x = (mouseSelectX / webGLWidth) * 2 - 1;
	var y = -(mouseSelectY / webGLHeight) * 2 + 1;
	var vector = new THREE.Vector3(x,y,0.5);
	
	projector.unprojectVector(vector, camera);
	
	var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
	window.intersects = raycaster.intersectObjects(allCubes);
	
	// if there is one (or more) intersections
	if ( intersects.length > 0 )
	{	// case if mouse is not currently over an object
		if(INTERSECTED==null){
			INTERSECTED = intersects[ 0 ];
			INTERSECTED.face.color = highlightedColor;
		}
		else{	// if thse mouse is over an object
			INTERSECTED.face.color= baseColor;
			INTERSECTED.object.geometry.colorsNeedUpdate=true;
			INTERSECTED = intersects[ 0 ];
			INTERSECTED.face.color = highlightedColor;			
		}
		// upsdate mouseSphere coordinates and update colors
		mouseSphereCoords = [INTERSECTED.point.x,INTERSECTED.point.y,INTERSECTED.point.z];
		INTERSECTED.object.geometry.colorsNeedUpdate=true;
		
	} 
	else // there are no intersections
	{
		// restore previous intersection object (if it exists) to its original color
		if ( INTERSECTED ){
			INTERSECTED.face.color = baseColor;
			INTERSECTED.object.geometry.colorsNeedUpdate=true;
		}
		// remove previous intersection object reference
		//     by setting current intersection object to "nothing"
		
		INTERSECTED = null;
		mouseSphereCoords = null;
		
		
	}
}

function checkMouseSphere()
{
	// if the coordinates exist, make the sphere visible
	if(mouseSphereCoords != null){
		console.log(mouseSphereCoords[0].toString()+","+mouseSphereCoords[1].toString()+","+mouseSphereCoords[2].toString());
		mouseSphere[0].position.set(mouseSphereCoords[0],mouseSphereCoords[1],mouseSphereCoords[2]);
		mouseSphere[0].visible = true;
	}
	else{ // otherwise hide the sphere
		mouseSphere[0].visible = false;
	}
}



//Mouse events On CUBES

function onCubeMouseDown(e, cube)
{
	console.log("Function :: onCubeMouseDown");
	//disableCameraControl();

    //Maybe add move check in here
    //if(true || !isMoving) {
/*      clickVector = cube.rubikPosition.clone();
      
      var centroid = e.intersect.face.centroid.clone();
      centroid.applyMatrix4(cube.matrixWorld);

      //Which face (of the overall cube) did we click on?
      if(nearlyEqual(Math.abs(centroid.x), maxExtent))
        clickFace = 'x';
      else if(nearlyEqual(Math.abs(centroid.y), maxExtent))
        clickFace = 'y';
      else if(nearlyEqual(Math.abs(centroid.z), maxExtent))
        clickFace = 'z'; */  
    //}
      
      //console.log("Clicked on face - " + clickFace);
	
	var faceIntersect = e.intersect;//...which is equal to window.intersects = raycaster.intersectObjects(allCubes);intersects[0]
	console.log("Hit @ " + toString( faceIntersect.point ) );
	// change the color of the closest face.
	var randomRed = 0.8 * Math.random();
	//intersects[ 0 ].face.color.setRGB( randomR + 0.2, 0, 0 ); 
	
	var geom = faceIntersect.object.geometry;	
	window.materialINDEX = faceIntersect.face.materialIndex;
	/*for ( var i = 0; i < geom.faces.length; i ++ ) 
	{
	    //geom.faces[ i ].color.setHex( Math.random() * 0xffffff );
		//geom.faces[i].color.setRGB(randomRed, 0, 0);
		
		//Use this for changing color of individual FACEs
		geom.faces[i].color.setHex(0xff00ff);
	}*/
	
	//Use this for changing color of indivial MATERIALs
	var material = faceIntersect.object.material;
	var materialColors = faceIntersect.object.$colorMaterials;
	/*for ( var i = 0; i < material.materials.length; i ++ ) 
	{
	    
		material.materials[i].color.setHex(0xff0000);
	}*/
	for ( var i = 0; i < materialColors.length; i ++ ) 
	{	    
		material.materials[materialColors[i]].color.setHex(0xff0000);
	}
	
	faceIntersect.object.geometry.colorsNeedUpdate = true;	
}

function onCubeMouseUp(e, cube)
{
	console.log("Function :: onCubeMouseUp");	
}

function onCubeMouseOut(e, cube)
{
	console.log("Function :: onCubeMouseOut");	
}
function toString(v) { return "[ " + v.x + ", " + v.y + ", " + v.z + " ]"; }

function DV(T, value)
{
	return (T == undefined) ? value : T;
}
function moveObject(object,X,Y,Z,T,EASE)
{
	T = DV(T);
	X = DV(X,0);
	Y = DV(Y,0);
	Z = DV(Z,0);
	EASE = DV(EASE, TWEEN.Easing.Linear.None);//TWEEN.Easing.Elastic.InOut
		
	//var sourceQuat = object.position;
	//var relativeQuat = new THREE.Quaternion();
	//relativeQuat.setFromEuler(new THREE.Vector3(X,Y,Z));
		
	//this.anim = new TWEEN.Tween(this.param).to({t: 1.0}, time ).easing( EASING );
	//var tween = new TWEEN.Tween(sourceQuat).to(relativeQuat, T).easing(EASE);
	
	var sourceVector = object.position;
	var targetVector = new THREE.Vector3(X,Y,Z);
	var tween = new TWEEN.Tween(sourceVector).to(targetVector, T).easing(EASE);
	tween.onUpdate(function(){
		object.position.x = sourceVector.x;
		object.position.y = sourceVector.y;
		object.position.z = sourceVector.z;
	});
	tween.delay(1000);
	//tween.easing(TWEEN.Easing.Elastic.InOut);
	tween.start();
}