function DV(T, value)
{
	return (T == undefined) ? value : T;
}

function moveObject(object,X,Y,Z,T,func,EASE)
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
	//tween.delay(1000);
	//tween.easing(TWEEN.Easing.Elastic.InOut);
	tween.start();
	tween.onComplete(function(){
		//console.log("tween onComplete");
		if (func)
		{
			func();
		}
	});
}

function hideRubiksCube(object,y,func)
{
	console.log("Function :: hideRubiksCube");
	moveObject(object,0,y,0,1000,func);
}

function showRubiksCube(object,func)
{
	console.log("Function :: showRubiksCube");
	moveObject(object,0,0,0,1000,func);
}

function resetRubiksCube()
{
	if (activeRubiksCube && activeRubiksCube.group)
	{
		activeRubiksCube.allowRotation = false;
		var arc = activeRubiksCube.group;
		var tween = new TWEEN.Tween(arc.rotation).to({x:0,y:0}, 1000).easing(TWEEN.Easing.Linear.None);
		tween.onUpdate(function(){
			
		});
		tween.delay(1000);tween.onComplete(function(){
			finalRotationY=0;
			arc.rotation.set(0,0,0);
		});
		tween.start();
	}
}