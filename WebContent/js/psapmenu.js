var menuClicked = undefined;
var initScene = false;
function initializeClicks()
{
	console.log("Function :: initializeClicks");
	
	$('.breadcrum-container').children().fadeOut(10);
	$('.breadcrum-strip').children().fadeOut(10);
	
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
		//console.log("menu-items",onUserAction);
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
		
		/*
		if (menuClicked == 'approach')
			reversalBreadCrum(breadCrumsPos['categories'])
		else if (menuClicked == 'services')
			reversalBreadCrum(breadCrumsPos['solutions'])
		else if (menuClicked == 'transformation')
			reversalBreadCrum(breadCrumsPos['offerings'])
		*/
		
		if (menuClicked == 'logout')
			postLogout();
			
	});
	
	$('.breadcrum-items').bind(onUserAction, function(e){
		e.preventDefault();
		//console.log("breadcrum-items",onUserAction);
		//var current = $('breadcrum-container').find("[data-breadcrumitem='" + menuClicked + "']");
		var breadCrumClicked = $(this).data('breadcrumitem');
		console.log('breadCrumClicked', breadCrumClicked);
		processBreadCrum(breadCrumsPos[breadCrumClicked]['cubieMesh'],breadCrumClicked);
	});
	var searchcount = 0;
	$('input[type="search"][name="searchbox"]').on('search', function () {
	    // search logic here
	    // this function will be executed on click of X (clear button)
		var searchText  = $('#searchbox').val();
		console.log("Search event",searchcount++);
		console.log("serachText = " + searchText + ", length = " + searchText.length);
		
		if (searchText.length == 0)
		{
			$('#search-results').addClass('display-none');
			emptyTopPages();
		}
		else if (searchText.length > 0)
		{
			emptyTopPages();
			
			var carray = categoryJSON['categories'];
			for (var i=0;i<carray.length;i++)
			{
				populateSearchResults(carray[i]['display'],carray[i]['display']);
			}
			$('#search-results').removeClass('display-none');
			
		}
		
	});
}


function postLogout()
{
	console.log("Function :: postLogout");
	var restURL = config.weburl+"/PSAP/Logout";
	window.open(restURL, "_self");
}


function getUserDetails()
{
	console.log("Function :: getSignedUser");
	var restURL = config.weburl+"/PSAP/UsrList?type=getSignedUser";
	var email = "abc@us.ibm.com";
	console.log("sample emailId",email);
	document.querySelector('#emailId').innerHTML = email;
	
	getRESTRequest(restURL,true,function(response){
		if (response == "DEVELOPMENT")
		{
			var email = "developer@us.ibm.com";
			console.log("development emailId",email);
			document.querySelector('#emailId').innerHTML = email;
		}
		else if (response == "ERROR")
		{
			var email = "abc@us.ibm.com";
			console.log("error emailId",email);
			document.querySelector('#emailId').innerHTML = email;
		}
		else
		{
			console.log('get user RESPONSE',response);
			var email = response['email'];
			console.log("response emailId",email);
			document.querySelector('#emailId').innerHTML = email;
		}
	});
}

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
