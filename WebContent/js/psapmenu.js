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
	
	//var searchcount = 0;
	/*$('input[type="text"][name="searchbox"]').on('search', function () {
	    // search logic here
	    // this function will be executed on click of X (clear button)
		
	});*/
	
	$('input[type="text"][name="searchbox"]').on('keyup', function(e){
		if (e.keyCode === 13)
		{
			assetsSlider.classList.add("hidden");
			handleSearch(function(){
				$('#search-results').removeClass('display-none');
			});
		}
	});
	
	$('#search-send').bind(onUserAction, function(e){
		e.preventDefault();
		assetsSlider.classList.add("hidden");
		handleSearch(function(){
			$('#search-results').removeClass('display-none');
		});
	});
	
	$('#search-show-all').bind(onUserAction, function(e){
		e.preventDefault();
		assetsSlider.classList.remove("hidden");
		$('#search-results').addClass('display-none');
		$('#WebGL-output').addClass('translateX-38');
		
		var tween = new TWEEN.Tween(activeRubiksCube.group.rotation).to({x:degToRad(5),y:degToRad(-45)}, 500).easing(TWEEN.Easing.Linear.None);
		/*tween.onUpdate(function(){
			grpObject.rotation.x = x;
			grpObject.rotation.y = y;
			grpObject.rotation.z = z;
		});*/
		tween.start();
		tween.onComplete(function(){
			//console.log("tween onComplete");
			activeRubiksCube.group.rotation.set(degToRad(25),degToRad(-45),0);
			activeRubiksCube.allowRotation = false;
		});
		
	});
	
	
	$('#pxIcon').bind(onUserAction, function(e){
		e.preventDefault();
		hideAssetOverlay();
	});
}
var searchcount = 0;
function handleSearch(func)
{
	console.log("Function :: handleSearch");
	
	resetBreadCrumAndCube();
	
	var searchText  = $('#searchbox').val();
	console.log("Search event",searchcount++);
	console.log("serachText = " + searchText + ", length = " + searchText.length);
	
	hideAssetOverlay();
	emptySearchResults();
	
	$('.jumpToBar').hide();
	
	if (searchText.length == 0)
	{
		$('#search-results').addClass('display-none');
	}
	else if (searchText.length > 0)
	{		
		if(DEVELOPMENT)
		{
			var carray = categoryJSON['categories'];
			for (var i=0;i<carray.length;i++)
			{
				populateSearchResults(carray[i]);
			}
		}
		else
		{
			doSearch(searchText, function(){
				
				//console.log('psapmenu :: doSearch callback');
				
				if (func)
					func();
			});
			
		}
		//assignSearchClicks();
		//$('#search-results').removeClass('display-none');
	}		
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
