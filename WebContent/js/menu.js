function openMenu()
{
	document.querySelector('#menu').classList.remove('translateX-100');
	document.querySelector('#menu-button').classList.add('rotateZ-90');
}

function closeMenu()
{
	document.querySelector('#menu').classList.add('translateX-100');
	document.querySelector('#menu-button').classList.remove('rotateZ-90');
}

var initScene = false;
function initializeClicks()
{
	console.log("Function :: initializeClicks");
	$('#menu-button').bind(onUserAction, function(e){
		e.preventDefault();
		console.log("Menu button ",onUserAction);
		if (document.querySelector('#menu').classList.contains('translateX-100'))
		{
			openMenu();
		}
		else
		{
			closeMenu();
		}
	});
	
	$('#sc1-button').bind(onUserAction, function(e){
		e.preventDefault();
		console.log("sc1 button ",onUserAction);
		if (!initScene)
		{
			initScene = true;
			drawRubiksCube(appData['level-one']);
		}
		else
		{
			
		}
	});
	
	$('#sc2-button').bind(onUserAction, function(e){
		e.preventDefault();
		console.log("sc2 button ",onUserAction);
		if (!initScene)
		{
			initScene = true;
			drawRubiksCube(appData['level-two']);
		}
		else
		{
			
		}
	});
	$('#sc5-button').bind(onUserAction, function(e){
		e.preventDefault();
		console.log("sc5 button ",onUserAction);
		postLogout();
	});
}