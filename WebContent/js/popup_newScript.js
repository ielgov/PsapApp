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
	
	assetsSlider.addEventListener("animationend", function(){
		console.log("animationend")
		sizeAssets(buttonForSizing, document.getElementsByClassName("assetSmallererParent"));
	})
	
	if(resultName !== undefined)
	{		
		document.querySelector("#resultsName").innerHTML = "for "+resultName;		
	}
	assetsSlider.classList.remove("hidden");
	//slideArrowLeft();
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
	
	//buttonClicked.style.left = (buttonClickedBoundingRect.left - config.assetMargin)+"px";
	//buttonClicked.style.top = (buttonClickedBoundingRect.top - config.assetMargin)+"px";
	
	//TODO if this next part works remove left and top from above
	buttonClicked.style.left = "20%";
	buttonClicked.style.top = "20%";
	
	buttonClicked.style.zIndex = 10;
	buttonClicked.style.position = "fixed";
	// end of moving up so it can nicely transition to open
	
	// start of animating motion of div
	console.log("buttonClicked.style.left is "+buttonClicked.style.left) // TODO remove
	console.log("buttonClicked.style.top is "+buttonClicked.style.top) // TODO remove
	
	//setButtonPosition( buttonClicked );
	
	console.log("buttonClicked.style.left is "+buttonClicked.style.left) // TODO remove
	console.log("buttonClicked.style.top is "+buttonClicked.style.top) // TODO remove
	
	buttonClicked.style.width = "60%";
	buttonClicked.style.height = "auto";
	
	buttonClicked.classList.add("open");
	buttonClicked.classList.remove("closed");
	// end of animating motion of div
	
	buttonClicked.getAttribute("display")
	buttonClicked.querySelector(".title").innerHTML = "";
	buttonClicked.querySelector(".title").appendChild( abrivateStringWithMore( buttonClicked.getAttribute("display"), Number.MAX_VALUE, undefined, false ) )
	
	buttonClicked.onclick = ""
	
	//buttonClicked.addEventListener("transitionend", function(e)
	{
		if( buttonClicked.classList.contains("open") )
		{
			xIcon.classList.remove("hidden")
			moveX(buttonClicked);		
			document.querySelector(".asset.open > .contentHolder").classList.remove("hidden");
		}
		
	}
	//, false)
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
		var buttonToClose = openButtons[i];
		xIcon.classList.add("hidden")
			
		var placeHolder = document.getElementById( buttonToClose.id+"PlaceHolder" );
		placeHolderBoundingRect = placeHolder.getBoundingClientRect()
	
		buttonToClose.style.left = (placeHolderBoundingRect.left - config.assetMargin)+"px";
		buttonToClose.style.top = (placeHolderBoundingRect.top - config.assetMargin)+"px";
	
		buttonToClose.style.width = placeHolder.style.width;
		buttonToClose.style.height = placeHolder.style.height;
		buttonToClose.classList.remove("open");
		buttonToClose.classList.add("closed");
		buttonToClose.onclick = placeHolder.onclick;
		
		//greyOutBox.style.zIndex = -1;		
		//greyOutBox.classList.add("hidden");
						
		buttonToClose.getAttribute("display")
		buttonToClose.querySelector(".title").innerHTML = "";
		buttonToClose.querySelector(".title").appendChild( abrivateStringWithMore( buttonToClose.getAttribute("display"), config.maxCharInTile, 
			function(e)
			{ 
				e.stopPropagation(); 
				openButton(buttonToClose); 
			}, buttonToClose.getAttribute("hasDescription") ) )
				
		//buttonToClose.addEventListener("transitionend", function(e)
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
		}
		//, false)
	}
}

function selectJumpTo(e)
{
	if(e.target.selectedIndex !== 0)
	{
		var a = document.createElement("a");
		a.href = "#"+e.target.value;
		a.click();
	}
	else
	{
		/*
		var a = document.createElement("a");
		a.href = "";
		a.click();	
		*/		
	}
}









