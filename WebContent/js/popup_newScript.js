function showPopUp(offeringId, parentId)
{
	assetsSlider.style.height = "75%";
	var results; // TODO remove if you dont want caching 
	
	var url = "";
	//url = "http://172.27.50.135:9080/PSAP/Assets?offeringId=2001&parentId=201"
	//url = "http://"+config.serverAddress+"/PSAP/Assets?offeringId=2001&parentId=201"
	url = "http://"+config.serverAddress+"/PSAP/Assets?offeringId="+offeringId+"&parentId="+parentId+""
	
	try{
		httpRequest( url, callback );
	}catch(e){}
	
	function callback( respText )
	{
		results = JSON.parse( respText ); // TODO add var
		buildPopUp( results.result );
		localStorage.setItem("search_results", JSON.stringify(results) ); // TODO remove if you dont want caching
		revealAssets();
	}
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
		
		buttonClicked.style.left = placeHolderBoundingRect.left - config.assetMargin;
		buttonClicked.style.top = placeHolderBoundingRect.top - config.assetMargin;
		buttonClicked.style.zIndex = "";
			
		document.querySelector(".asset.open > .contentHolder").classList.add("hidden");
		
		buttonClicked.style.width = placeHolder.style.width;
		buttonClicked.style.height = placeHolder.style.height;
		buttonClicked.classList.remove("open");
		buttonClicked.classList.add("closed");
		buttonClicked.onclick = placeHolder.onclick;
		
		//greyOutBox.style.zIndex = -2;		
		greyOutBox.classList.add("hidden");
		
		
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
		lastClicked = buttonClicked
		
		// start of moving up so it can nicely transition to open
		var placeHolder = buttonClicked.cloneNode();
		placeHolder.style.background = "rgba(0,0,0,0)";
		placeHolder.id = buttonClicked.id+"PlaceHolder";
		placeHolder.onclick = buttonClicked.onclick
		buttonClicked.parentElement.appendChild( placeHolder );
		
		console.log(87)
		
		buttonClicked.style.left = buttonClickedBoundingRect.left - config.assetMargin;
		buttonClicked.style.top = buttonClickedBoundingRect.top - config.assetMargin;
		buttonClicked.style.zIndex = 4;
		buttonClicked.style.position = "fixed";
		// end of moving up so it can nicely transition to open
		
		console.log(95)
		
		// start of animating motion of div
		buttonClicked.style.left = emToPx(1);
		buttonClicked.style.top = emToPx(1);
		buttonClicked.style.width = "85%";
		buttonClicked.style.height = "85%";
		buttonClicked.classList.add("open");
		buttonClicked.classList.remove("closed");
		// end of animating motion of div
		
		buttonClicked.getElementsByClassName( "contentHolder" )
		
		buttonClicked.onclick = ""
		
		//greyOutBox.style.zIndex = 3;		
		//greyOutBox.classList.remove("hidden")
		
		buttonClicked.addEventListener("transitionend", function(e)
		{
			if( buttonClicked.classList.contains("open") )
			{
				console.log("moving xIcon")
				xIcon.classList.remove("hidden")
				moveX(buttonClicked);		
				document.querySelector(".asset.open > .contentHolder").classList.remove("hidden");
			}
			
		}, false)
		
	}
}









