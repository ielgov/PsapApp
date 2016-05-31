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

var menuClicked = undefined;
var initScene = false;
function initializeClicks()
{
	console.log("Function :: initializeClicks");
	$('#menu-button').bind(onUserAction, function(e){
		e.preventDefault();
		console.log("Menu button",onUserAction);
		if (document.querySelector('#menu').classList.contains('translateX-100'))
		{
			openMenu();
		}
		else
		{
			closeMenu();
		}
	});
	
	$('.menu-items').bind(onUserAction, function(e){
		e.preventDefault();
		console.log("menu-items",onUserAction);
		menuClicked = $(this).data('menuitem');
		console.log('menuitem', menuClicked);
		if (!initScene)
		{
			initScene = true;
			
			//setCubeData();
		}
		else
		{
			
		}
		
		if (menuClicked == 'approach')
			reversalBreadCrum(breadCrumsPos['categories'])
		else if (menuClicked == 'services')
			reversalBreadCrum(breadCrumsPos['solutions'])
		else if (menuClicked == 'transformation')
			reversalBreadCrum(breadCrumsPos['offerings'])
		else if (menuClicked == 'logout')
			postLogout();
	});
	
}