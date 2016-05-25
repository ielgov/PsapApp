function toggleExpanded( e )
{
	console.log(e);
	//e.style.height = e.getBoundingClientRect().height;
	toggleClass( e, "hidden" );
}

var lastClicked;
function openButton(buttonClicked)
{
	console.log("Welcome to the open button function")
	console.log( buttonClicked );
	gbc = buttonClicked;
	
	lastClicked = buttonClicked || lastClicked;
	
	var buttonClickedBoundingRect = buttonClicked.getBoundingClientRect();
	
	if( buttonClicked.classList.contains("open") ) // need to hide
	{
		var placeHolder = document.getElementById( buttonClicked.id+"PlaceHolder" );
		placeHolderBoundingRect = placeHolder.getBoundingClientRect()
		
		buttonClicked.style.left = placeHolderBoundingRect.left - config.assetMargin;
		buttonClicked.style.top = placeHolderBoundingRect.top - config.assetMargin;
		buttonClicked.style.zIndex = "";
		
		buttonClicked.style.width = placeHolder.style.width;
		buttonClicked.style.height = placeHolder.style.height;
		buttonClicked.classList.remove("open");
		buttonClicked.classList.add("closed");
		
		greyOutBox.style.zIndex = -1;		
		greyOutBox.classList.add("hidden")
		
		buttonClicked.addEventListener("transitionend", function(e)
		{
			if( buttonClicked.classList.contains("closed") )
			{
				buttonClicked.style.position = "";		
			}
			
		}, false)
		
	}
	else // need to show	
	{
		// start of moving up so it can nicely transition to open
		var placeHolder = buttonClicked.cloneNode();
		placeHolder.style.background = "rgba(0,0,0,0)";
		placeHolder.id = buttonClicked.id+"PlaceHolder";
		placeHolder.onclick = buttonClicked.onclick
		buttonClicked.parentElement.appendChild( placeHolder );
		
		buttonClicked.style.left = buttonClickedBoundingRect.left - config.assetMargin;
		buttonClicked.style.top = buttonClickedBoundingRect.top - config.assetMargin;
		buttonClicked.style.zIndex = 2;
		buttonClicked.style.position = "fixed";
		// end of moving up so it can nicely transition to open
		
		// start of animating motion of div
		buttonClicked.style.left = emToPx(1);
		buttonClicked.style.top = emToPx(1);
		buttonClicked.style.width = "90%";
		buttonClicked.style.height = "90%";
		buttonClicked.classList.add("open");
		// end of animating motion of div
		
		greyOutBox.style.zIndex = 1;		
		greyOutBox.classList.remove("hidden")
		
		buttonClicked.addEventListener("transitionend", function(e)
		{
			if( buttonClicked.classList.contains("open") )
			{
				xIcon.classList.remove("hidden")
				moveX(buttonClicked);			
			}
			
		}, false)
		
	}
}









