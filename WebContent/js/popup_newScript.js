function showPopUp(offeringId, parentId, useCache)
{
	assetsHolder.innerHTML = "";
	
	var results; // TODO remove if you dont want caching 
	
	var url = "";
	url = config.weburl + "/PSAP/Assets?offeringId="+offeringId+"&parentId="+parentId+""
	
	if(!useCache)
	{
		try{
			httpRequest( url, callback );
		}catch(e){}
	}
	else
	{
		console.log("using cache");
		callback( localStorage.getItem("search_results") );
	}
	
	function callback( respText )
	{
		results = JSON.parse( respText ); // TODO add var
		buildPopUp( results.result );
		localStorage.setItem("search_results", JSON.stringify(results) ); // TODO remove if you dont want caching
	}
	numberOfResults.innerHTML = assetsSlider.getElementsByClassName("asset").length;
	sizeAssets(buttonForSizing, document.getElementsByClassName("assetSmallererParent"));
	
	assetsSlider.classList.remove("hidden");	
}

function hidePopUp()
{
	assetsSlider.classList.add("hidden");
	processBreadCrum(breadCrumsPos['offerings']['cubieMesh'],'offerings');
}

function toggleExpanded( e )
{
	console.log(e);
	//e.style.height = e.getBoundingClientRect().height;
	toggleClass( e, "hidden" );
}

var lastClicked;
function openButton(buttonClicked)
{
	buttonClicked = buttonClicked || lastClicked;
 
	var buttonClickedBoundingRect = buttonClicked.getBoundingClientRect();
	
	if( buttonClicked.classList.contains("open") ) // need to hide
	{
		xIcon.classList.add("hidden")
				
		var placeHolder = document.getElementById( buttonClicked.id+"PlaceHolder" );
		placeHolderBoundingRect = placeHolder.getBoundingClientRect()
		
		buttonClicked.style.left = (placeHolderBoundingRect.left - config.assetMargin)+"px";
		buttonClicked.style.top = (placeHolderBoundingRect.top - config.assetMargin)+"px";
		//buttonClicked.style.zIndex = "";
			
		document.querySelector(".asset.open > .contentHolder").classList.add("hidden");
		
		buttonClicked.style.width = placeHolder.style.width;
		buttonClicked.style.height = placeHolder.style.height;
		buttonClicked.classList.remove("open");
		buttonClicked.classList.add("closed");
		buttonClicked.onclick = placeHolder.onclick;
		
		//greyOutBox.style.zIndex = -1;		
		//greyOutBox.classList.add("hidden");
		
		
		buttonClicked.addEventListener("transitionend", function(e)
		{
			if( buttonClicked.classList.contains("closed") )
			{
				if( !placeHolder.classList.contains("removed") )
				{
					placeHolder.parentElement.removeChild( placeHolder );
					placeHolder.classList.add("removed")
					
					buttonClicked.style.position = "";	
				}					
			}			
		}, false)
		
	}
	else // need to show	
	{
		//buttonClicked.classList.add("finallyOpen");
		console.log("look here at "+77)
		
		lastClicked = buttonClicked
		
		// start of moving up so it can nicely transition to open
		var placeHolder = buttonClicked.cloneNode();
		placeHolder.style.background = "rgba(0,0,0,0)";
		placeHolder.id = buttonClicked.id+"PlaceHolder";
		placeHolder.onclick = buttonClicked.onclick
		buttonClicked.parentElement.appendChild( placeHolder );
		
		buttonClicked.style.left = (buttonClickedBoundingRect.left - config.assetMargin)+"px";
		buttonClicked.style.top = (buttonClickedBoundingRect.top - config.assetMargin)+"px";
		//buttonClicked.style.zIndex = 2;
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
				moveX(buttonClicked);		
				document.querySelector(".asset.open > .contentHolder").classList.remove("hidden");
			}
			
		}, false)
	}
	
	function setButtonPosition( buttonClicked )
	{
		buttonClicked.style.left = emToPx(1)+"px"; // TODO change this so it is centered in the page
		buttonClicked.style.top = emToPx(1)+"px";		
	}
}









