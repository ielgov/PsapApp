var lastCubie,lastPosition={};
var mouseMoved = false;
var mouseSelectX =0, mouseSelectY=0;
var currentPosition = {};
var movedCount = 0;
var multipleTouch = false;
function onDocumentMouseDown( event )
{
	//console.log("Function :: onDocumentMouseDown");
	event.preventDefault();	
	
	document.querySelector("#WebGL-output").addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.querySelector("#WebGL-output").addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.querySelector("#WebGL-output").addEventListener( 'mouseout', onDocumentMouseOut, false );
	
	if (activeRubiksCube && activeRubiksCube.group)
	{
		activeRubiksCube.allowRotation = true;
	}		
	
	mouseXOnMouseDown = event.clientX - windowHalfX;
	targetRotationOnMouseDownX = targetRotationX;
	
	mouseYOnMouseDown = event.clientY - windowHalfY;
	targetRotationOnMouseDownY = targetRotationY;
	
	//lastPosition.x = event.clientX;
	//lastPosition.y = event.clientY;
	
	//mouseSelectX = event.clientX;
	//mouseSelectY = event.clientY;
	//debugger;
	var obj = getComputedTranslate(document.getElementById('WebGL-output'));
	mouseSelectX = event.clientX - 0 + Math.abs(obj['X']);
	mouseSelectY = event.clientY - $('#WebGL-output').parent()[0].offsetTop;
	
	lastPosition.x = mouseSelectX;
	lastPosition.y = mouseSelectY;
}

function onDocumentMouseMove( event ) 
{
	//console.log("Function :: onDocumentMouseMove");
	mouseMoved = true;
	movedCount++;
	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;	
	
	targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.02;
	targetRotationX = targetRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * 0.02;
		
	//mouseSelectX = event.clientX;
	//mouseSelectY = event.clientY;
	var obj = getComputedTranslate(document.getElementById('WebGL-output'));
	mouseSelectX = event.clientX - 0 + Math.abs(obj['X']);
	mouseSelectY = event.clientY - $('#WebGL-output').parent()[0].offsetTop;
}


function onDocumentMouseUp( event ) 
{
	//console.log("Function :: onDocumentMouseUp");
	document.querySelector("#WebGL-output").removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.querySelector("#WebGL-output").removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.querySelector("#WebGL-output").removeEventListener( 'mouseout', onDocumentMouseOut, false );
	
	//currentPosition.x = event.clientX;
	//currentPosition.y = event.clientY;
	var obj = getComputedTranslate(document.getElementById('WebGL-output'));
	currentPosition.x = event.clientX - 0 + Math.abs(obj['X']);
	currentPosition.y = event.clientY -  $('#WebGL-output').parent()[0].offsetTop;
	
	var movedX = Math.abs(currentPosition.x - lastPosition.x);
	var movedY = Math.abs(currentPosition.y - lastPosition.y);
	//console.log('movedX',movedX);
	//console.log('movedY',movedY);
	//console.log('mouseMoved',mouseMoved);
	//console.log('movedCount',movedCount);
	
	if (movedX === 0 && movedY === 0)
	{
		console.log('CLICK!!!');
		//...........Stop all rotations and mouse events when the objects are moving
		
		if(activeRubiksCube)
		{
			activeRubiksCube.allowRotation = false;
			//activeRubiksCube.removeAllCubieClicks();
			//onCubieMouseDown(lastCubieEvent, lastCubieClicked);
			if (checkSelected(currentPosition.x,currentPosition.y))
			{
				
			}
			else
			{
				activeRubiksCube.allowRotation = true;
			}
		}
		else
		{
			console.log("no active rubiks cube");
		}		
	}
	else
	{
		console.log("No click!!!");
	}
		
	mouseMoved = false;
	movedCount = 0;
}

function onDocumentMouseOut( event ) 
{
	//console.log("Function :: onDocumentMouseOut");
	document.querySelector("#WebGL-output").removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.querySelector("#WebGL-output").removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.querySelector("#WebGL-output").removeEventListener( 'mouseout', onDocumentMouseOut, false );
	
	mouseMoved=false;
}

function onDocumentTouchStart( event ) 
{
	//console.log("Function :: onDocumentTouchStart");
	//console.log('event touches = '+event.touches.length);
    if ( event.touches.length == 1 ) 
    {
		event.preventDefault();
		console.log("single touchSTART");
		
		multipleTouch = false;
		
		orbitControl.enabled = false;
		console.log("orbitContorl disabled");
		
		if (activeRubiksCube && activeRubiksCube.group)
		{
			activeRubiksCube.allowRotation = true;
		}
		
		mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
		targetRotationOnMouseDownX = targetRotationX;
		
		mouseYOnMouseDown = event.touches[ 0 ].pageY - windowHalfY;
		targetRotationOnMouseDownY = targetRotationY;
				
		/*currentPosition.x = event.touches[ 0 ].pageX;
		currentPosition.y = event.touches[ 0 ].pageY;*/
		
		mouseSelectX = event.touches[ 0 ].pageX - 0;
		mouseSelectY = event.touches[ 0 ].pageY - $('#WebGL-output').parent()[0].offsetTop;
		
		lastPosition.x = mouseSelectX;
		lastPosition.y = mouseSelectY;
    }
    else if (event.touches.length > 1)
    {
    	
    	event.preventDefault();
    	multipleTouch = true;
    	console.log("multiple touchSTART");
    	orbitControl.enabled = true;
		console.log("orbitContorl enabled");
    }
}

function onDocumentTouchMove( event ) 
{
	//console.log('Function :: onDocumentTouchMove');
	//console.log('event touches = '+event.touches.length);
    if ( event.touches.length == 1 ) 
    {
    	console.log("single touchMOVE");
        event.preventDefault();
        
        multipleTouch = false;
        
        orbitControl.enabled = false;
		console.log("orbitContorl disabled");

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        targetRotationX = targetRotationOnMouseDownX + ( mouseX - mouseXOnMouseDown ) * 0.05;//0.05
        
        mouseY = event.touches[ 0 ].pageY - windowHalfY;
        targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.05;//0.05
        
        mouseMoved = true;
    	movedCount++;
        mouseSelectX = event.touches[ 0 ].pageX - 0;
    	mouseSelectY = event.touches[ 0 ].pageY - - $('#WebGL-output').parent()[0].offsetTop;
    	
    		
    }
    else if ( event.touches.length > 1 /* == 2*/)
    {
    	console.log("multiple touchMOVE");
    	multipleTouch = true;
    	orbitControl.enabled = true;
		console.log("orbitContorl enabled");
    }

}

function onDocumentTouchEnd( event )
{
	//console.log('Function :: onDocumentTouchEnd');
	//console.log('event touches = '+event.touches.length);
	
	//if ( event.touches.length == 1 )
	if (!multipleTouch)
	{
		console.log("single touchEND");
		event.preventDefault();
				
		currentPosition.x = mouseSelectX;
		currentPosition.y = mouseSelectY;
		
		var movedX = Math.abs(currentPosition.x - lastPosition.x);
		var movedY = Math.abs(currentPosition.y - lastPosition.y);
		//console.log('movedX',movedX);
		//console.log('movedY',movedY);
		//console.log('mouseMoved',mouseMoved);
		//console.log('movedCount',movedCount);
				
		if (movedX === 0 && movedY === 0 && !mouseMoved)
		{
			console.log('CLICK!!!');
			//...........Stop all rotations and mouse events when the objects are moving
			
			if(activeRubiksCube)
			{
				activeRubiksCube.allowRotation = false;
				//activeRubiksCube.removeAllCubieClicks();
				//onCubieMouseDown(lastCubieEvent, lastCubieClicked);
				if (checkSelected(currentPosition.x,currentPosition.y))
				{
					
				}
				else
				{
					activeRubiksCube.allowRotation = true;
				}
			}
			else
			{
				console.log("no active rubiks cube");
			}		
		}
		else
		{
			console.log("No click!!!");
			console.log("single touchEND");
			orbitControl.enabled = true;
			console.log("orbitContorl enabled");
		}
			
		mouseMoved = false;
		movedCount = 0;
	}
	else
	{
		console.log("multiple touchEND");
		orbitControl.enabled = true;
		console.log("orbitContorl enabled");
	}
}

function onDocumentTouchCancel( event )
{
	//console.log('Function :: onDocumentTouchCancel');
	
}

function checkSelected(currX,currY)
{
	console.log("Function :: checkSelected");
	//console.log("currX = " + currX + " || currY = " + currY);
	
	var projector = new THREE.Projector();
	var x = (currX / webGLWidth) * 2 - 1;
	var y = -(currY / webGLHeight) * 2 + 1;
	var vector = new THREE.Vector3(x,y,0.5);
	vector.unproject(camera);
	
	var checkCubiesClick = [];
	checkCubiesClick = activeRubiksCube.allDrawnCubies.slice();
	if (breadCrumsCubies.length > 0)
	{
		checkCubiesClick = checkCubiesClick.concat(breadCrumsCubies);
	}
	
	var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
	//intersects = raycaster.intersectObjects(activeRubiksCube.allDrawnCubies);
	intersects = raycaster.intersectObjects(checkCubiesClick);
	
	if (intersects.length > 0)
	{
		console.log("Intersected cube face",intersects[0]);
		//console.log("Hit @ ",intersects[0].point);
		
		colorThisFace(intersects[0]);
		/*
		var materialINDEX = intersects[0].face.materialIndex;
		//intersects[0].face.color.setHex( 0xff0000 );
		var material = intersects[0].object.material;
		material.materials[materialINDEX].color.setHex(0xff0000);
		
		intersects[0].object.geometry.colorsNeedUpdate = true;
		*/
		/*
		var geom = intersects[ 0 ].object.geometry;
		for ( var i = 0; i < geom.faces.length; i ++ ) 
		{
		    //geom.faces[ i ].color.setHex( Math.random() * 0xffffff );
			//geom.faces[i].color.setRGB(randomRed, 0, 0);
			//geom.faces[i].color.setHex(0xff0000);
		}
		
		var geometry = intersects[ 0 ].object.geometry;		
		 var hex = Math.random() * 0xffffff;

         if(intersects[0].face.normal.x==0 && intersects[0].face.normal.y==0 &&intersects[0].face.normal.z==-1){
             intersects[0].face.color.setHex(hex);
             geometry.faces[intersects[0].face.materialIndex].color.setHex(hex);
             console.log(intersects[0].face);
         }
         if(intersects[0].face.normal.x==0 && intersects[0].face.normal.y==0 &&intersects[0].face.normal.z==1){
             intersects[0].face.color.setHex(hex);
             geometry.faces[intersects[0].face.materialIndex].color.setHex(hex);
             console.log(intersects[0].face);
         }
         if(intersects[0].face.normal.x==1 && intersects[0].face.normal.y==0 &&intersects[0].face.normal.z==0){
             intersects[0].face.color.setHex(hex);
             geometry.faces[intersects[0].face.materialIndex].color.setHex(hex);
             console.log(intersects[0].face);
         }
         if(intersects[0].face.normal.x==0 && intersects[0].face.normal.y==-1 &&intersects[0].face.normal.z==0){
             intersects[0].face.color.setHex(hex);
             geometry.faces[intersects[0].face.materialIndex].color.setHex(hex);
             console.log(intersects[0].face);
         }
         if(intersects[0].face.normal.x==-1 && intersects[0].face.normal.y==0 &&intersects[0].face.normal.z==0){
             intersects[0].face.color.setHex(hex);
             geometry.faces[intersects[0].face.materialIndex].color.setHex(hex);
             console.log(intersects[0].face);
         }
         if(intersects[0].face.normal.x==0 && intersects[0].face.normal.y==1 &&intersects[0].face.normal.z==0){
             intersects[0].face.color.setHex(hex);
             geometry.faces[intersects[0].face.materialIndex].color.setHex(hex);
             console.log(intersects[0].face);
         }
		*/	
		
		return true;
	}
	else
	{
		console.log("nothing intersected");
		return false;
	}	
}


//Breadcrum functions

/*//nextLevelDataOBj = {"categoryid":"02","display":"Command and Control, Operations, and Emergency Management"}
*///rubiksCubeType = categories
var prevBreadCrumItem = undefined;
function show2dBreadCrum(nextLevelDataOBj, rubiksCubeType)
{
	//console.log("Function :: show2dBreadCrum");
	//console.log('nextLevelDataOBj',JSON.stringify(nextLevelDataOBj));
	//console.log('rubiksCubeType',rubiksCubeType);
	$('.breadcrum-container .' + rubiksCubeType).text(nextLevelDataOBj['display']);
	$('.breadcrum-container .' + rubiksCubeType + '-parent').fadeIn('slow', function(){
		//console.log('fadeIn complete');
		highlightBreadCrum(rubiksCubeType);
	});
	
}

function hide2dBreamCrum(breadCrumType)
{
	//console.log("Function :: hide2dBreamCrum");
	//console.log('breadCrumType',breadCrumType);
	$('.breadcrum-container .' + breadCrumType + '-parent').fadeOut('fast', function(){
		//console.log('fadeOut complete');
		$('.breadcrum-container .' + breadCrumType).text('');
	});	
}

function highlightBreadCrum(breadCrumType)
{
	//console.warn("Function :: highlightBreadCrum",breadCrumType);
	if (prevBreadCrumItem)
	{
		$('.breadcrum-container .' + prevBreadCrumItem  + '-parent .breadcrum-items').removeClass('highlight-breadcrum');
		$('.breadcrum-container .' + prevBreadCrumItem  + '-parent .triangle').removeClass('highlight-breadcrum');
	}
		
	
	$('.breadcrum-container .' + breadCrumType  + '-parent .breadcrum-items').addClass('highlight-breadcrum');
	$('.breadcrum-container .' + breadCrumType  + '-parent .triangle').addClass('highlight-breadcrum');
	prevBreadCrumItem = breadCrumType;
}


//getComputedTranslate(document.getElementById('WebGL-output'))
function getComputedTranslate(obj)
{
    if(!window.getComputedStyle) return;
    var style = getComputedStyle(obj),
        transform = style.transform || style.webkitTransform || style.mozTransform;
    var mat = transform.match(/^matrix3d\((.+)\)$/);
    if(mat) return parseFloat(mat[1].split(', ')[13]);
    mat = transform.match(/^matrix\((.+)\)$/);
    //return mat ? parseFloat(mat[1].split(', ')[5]) : 0;
    var x=0,y=0,z=0;
    x = mat ? parseFloat(mat[1].split(', ')[4]) : 0;
    y = mat ? parseFloat(mat[1].split(', ')[5]) : 0;
    z = mat ? parseFloat(mat[1].split(', ')[6]) : 0;
    
    x = isNaN(x) ? 0 : x;
    y = isNaN(y) ? 0 : y;
    z = isNaN(z) ? 0 : z;
    return {'X':x ,'Y':y,'Z':z,'mat':mat};
}

