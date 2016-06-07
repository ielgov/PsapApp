function openMenu()
{
	document.querySelector('#menu').classList.remove('translateX-100');
	document.querySelector('#menu-button').classList.add('rotateZ-90');
	var TX = $('#menu')[0].clientWidth + 'px';
	document.querySelector('#main-container').style.transform = "translateX("+TX+")";
	document.querySelector('#menu-button').classList.add('menu-turquoise');
	document.querySelector('#menu-button').classList.remove('menu-white');
}

function closeMenu()
{
	document.querySelector('#menu').classList.add('translateX-100');
	document.querySelector('#menu-button').classList.remove('rotateZ-90');
	var TX = $('#menu')[0].clientWidth + 'px';
	document.querySelector('#main-container').style.transform = "translateX(0px)";
	document.querySelector('#menu-button').classList.add('menu-white');
	document.querySelector('#menu-button').classList.remove('menu-turquoise');
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
		var current = $('#menu').find("[data-menuitem='" + menuClicked + "']");
		//current.removeClass('highlight-menu-item');
		
		menuClicked = $(this).data('menuitem');
		//$(this).addClass('highlight-menu-item');
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


function postLogout()
{
	console.log("Function :: postLogout");
	var restURL = config.weburl+"/PSAP/Logout";
	window.open(restURL, "_self");
}
