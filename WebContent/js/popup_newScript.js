function showPopUp(offeringId, parentId, resultName)
{
	assetsHolder.innerHTML = "";
	
	var results; // TODO remove if you dont want caching 
	
	var url = "";
	url = config.weburl + "/PSAP/Assets?offeringId="+offeringId+"&parentId="+parentId+""
	
	//alert("url is *"+url+"*")
	
	httpRequest( url, callback );
	
	function callback( respText )
	{
		results = JSON.parse( respText ); // TODO add var
		buildPopUp( results.result );
		localStorage.setItem("search_results", JSON.stringify(results) ); // TODO remove if you dont want caching
	}
	numberOfResults.innerHTML = assetsSlider.getElementsByClassName("asset").length;
	sizeAssets(buttonForSizing, document.getElementsByClassName("assetSmallererParent"));
	
	if(resultName !== undefined)
	{		
		document.querySelector("#resultsName").innerHTML = "for "+resultName;		
	}
	assetsSlider.classList.remove("hidden");
	slideArrowDown();
}

function hidePopUp()
{
	assetsSlider.classList.add("hidden");
	slideArrowUp();
	processBreadCrum(breadCrumsPos['offerings']['cubieMesh'],'offerings');
}

function toggleExpanded( e )
{
	console.log(e);
	//e.style.height = e.getBoundingClientRect().height;
	toggleClass( e, "hidden" );
}

var lastClicked; // TODO remove?
function openButton(buttonClicked)
{
	buttonClicked = buttonClicked || lastClicked;
 
	var buttonClickedBoundingRect = buttonClicked.getBoundingClientRect();
	
	//buttonClicked.classList.add("finallyOpen");
	console.log("look here at "+77)
	
	lastClicked = buttonClicked
	
	// start of moving up so it can nicely transition to open
	var placeHolder = buttonClicked.cloneNode();
	placeHolder.style.background = "rgba(0,0,0,0)";
	placeHolder.id = buttonClicked.id+"PlaceHolder";
	placeHolder.style.border = "0px";
	placeHolder.onclick = buttonClicked.onclick
	buttonClicked.parentElement.appendChild( placeHolder );
	
	document.querySelector("body").appendChild(buttonClicked);
	
	buttonClicked.style.left = (buttonClickedBoundingRect.left - config.assetMargin)+"px";
	buttonClicked.style.top = (buttonClickedBoundingRect.top - config.assetMargin)+"px";
	buttonClicked.style.zIndex = 10;
	buttonClicked.style.position = "fixed";
	// end of moving up so it can nicely transition to open
	
	// start of animating motion of div
	console.log("buttonClicked.style.left is "+buttonClicked.style.left) // TODO remove
	console.log("buttonClicked.style.top is "+buttonClicked.style.top) // TODO remove
	
	setButtonPosition( buttonClicked );
	
	console.log("buttonClicked.style.left is "+buttonClicked.style.left) // TODO remove
	console.log("buttonClicked.style.top is "+buttonClicked.style.top) // TODO remove
	
	/*/ this is the toggle for auto sizing of the div
	buttonClicked.style.width = "80vw";
	buttonClicked.style.height = "auto";
	
	buttonClicked.style.width = buttonClicked.getBoundingClientRect().width;
	buttonClicked.style.height = buttonClicked.getBoundingClientRect().height;
	/*/
	buttonClicked.style.width = "85%";
	buttonClicked.style.height = "85%";
	//*/
	
	buttonClicked.classList.add("open");
	buttonClicked.classList.remove("closed");
	// end of animating motion of div
	
	//buttonClicked.getElementsByClassName( "contentHolder" )
	
	buttonClicked.onclick = ""
	
	//greyOutBox.style.zIndex = 1;		
	//greyOutBox.classList.remove("hidden")
	
	buttonClicked.addEventListener("transitionend", function(e)
	{
		if( buttonClicked.classList.contains("open") )
		{
			xIcon.classList.remove("hidden")
			//buttonClicked.parentElement.appendChild(xIcon);
			moveX(buttonClicked);		
			document.querySelector(".asset.open > .contentHolder").classList.remove("hidden");
		}
		
	}, false)
	function setButtonPosition( buttonClicked )
	{
		buttonClicked.style.left = emToPx(1)+"px"; // TODO change this so it is centered in the page
		buttonClicked.style.top = emToPx(1)+"px";		
	}
}

function closeButton()
{
	var openButtons = document.querySelectorAll(".asset.open")
	
	for( var i=0; i<openButtons.length; i++)//.forEach(function(buttonToClose)
	{
		buttonToClose = openButtons[i];
		xIcon.classList.add("hidden")
			
		var placeHolder = document.getElementById( buttonToClose.id+"PlaceHolder" );
		placeHolderBoundingRect = placeHolder.getBoundingClientRect()
	
		buttonToClose.style.left = (placeHolderBoundingRect.left - config.assetMargin)+"px";
		buttonToClose.style.top = (placeHolderBoundingRect.top - config.assetMargin)+"px";;
		//buttonToClose.style.zIndex = "";
		
		document.querySelector(".asset.open > .contentHolder").classList.add("hidden");
	
		buttonToClose.style.width = placeHolder.style.width;
		buttonToClose.style.height = placeHolder.style.height;
		buttonToClose.classList.remove("open");
		buttonToClose.classList.add("closed");
		buttonToClose.onclick = placeHolder.onclick;
		
		//greyOutBox.style.zIndex = -1;		
		//greyOutBox.classList.add("hidden");
		
		
		buttonToClose.addEventListener("transitionend", function(e)
		{
			if( buttonToClose.classList.contains("closed") )
			{
				if( !placeHolder.classList.contains("removed") )
				{
					placeHolder.parentElement.appendChild(buttonToClose);
					
					placeHolder.parentElement.removeChild( placeHolder );
					placeHolder.classList.add("removed")					
					
					buttonToClose.style.position = "";	
					buttonToClose.style.zIndex = "";
				}					
			}			
		}, false)
	}
}









