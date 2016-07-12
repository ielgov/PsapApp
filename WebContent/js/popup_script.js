window.onload = function(){
	assetsSlider.style.width = "75%";
	//showPopUp(2001, 201);
}

function sizePopOutWidth( buttonClicked, moveXFlag )
{	
	moveXFlag = moveXFlag || false;
	
	if(moveXFlag)
	{
		moveX(buttonClicked);
	}
	//else{console.log("not sizing")};
	
	if( (buttonClicked == undefined) ) //	|| (lastClicked !== undefined && !lastClicked.classList.contains("open")) )
	{
		return;
	}
	
	console.log("buttonClicked.style.width is "+buttonClicked.style.width)
	console.log("buttonClicked.style.height is "+buttonClicked.style.height)
		
	buttonClicked.style.width = pxToEm( window.innerWidth * config.popupWidth / 100 )+"em";
	buttonClicked.style.height = pxToEm( window.innerHeight * config.popupHeight / 100 )+"em";
	
	console.log("buttonClicked.style.width is "+buttonClicked.style.width)
	console.log("buttonClicked.style.height is "+buttonClicked.style.height)
}


// This needs to stay
function moveX(buttonClicked)
{
	buttonClicked = buttonClicked || document.querySelector(".asset.open");
	
	if(buttonClicked == undefined)
	{
		return;
	}
	
	//console.log(buttonClicked);
	
	var boundingRect = buttonClicked.getBoundingClientRect()
	
	var left = boundingRect.left + boundingRect.width;
	var top = boundingRect.top;
	
	//console.log("boundingRect.left is "+boundingRect.left)
	//console.log("boundingRect.width is "+boundingRect.width)
	
	//console.log("left is "+left)
	//console.log("top is "+top)
	
	left -= xIcon.getBoundingClientRect().width;
	
	left -= emToPx(1.5);
	top += emToPx(1.5);
	
	xIcon.style.left = left+"px";
	xIcon.style.top = top+"px";
}

function sizeElements()
{
	//( button1.getBoundingClientRect.width() + config.assetMargin ) * 4;
	
}

// params: seedButton is the button to get the width off of
// params: containerArr is array of elements to be sized
function sizeAssets(seedButton, containerArr) // sorry, this is really jank 
{
	if( containerArr.length !== 0 )
	{
		var buttonWidth = seedButton.getBoundingClientRect().width + config.minTileMargin;
		var parentWidth = containerArr[0].getBoundingClientRect().width;
	
		var buttonCount = parseInt( parentWidth / buttonWidth );
		var marginCount = buttonCount*2;
	
		
		marginWidth = (parentWidth - ( buttonWidth*buttonCount ))/( marginCount )
		
		var assets = document.querySelectorAll(".asset")
		for(var i=0; i<assets.length; i++)
		{
			assets[i].style.marginLeft = marginWidth+"px";
			assets[i].style.marginRight = marginWidth+"px";
		}
	}
}

function resize()
{
	sizeAssets(buttonForSizing, document.querySelectorAll(".assetSmallererParent"));
	sizePopOutWidth( undefined, true );
	assetsSlider.style.width = window.innerWidth
	//resizeX();
}

function closePopUp()
{
	assetsSlider.classList.add("hidden");
}

function togglePopUpWidth()
{
	if( assetsSlider.classList.contains("expanded") ) 
	{
		assetsSlider.classList.remove("expanded");
		//slideArrowLeft();
		
	}
	else
	{
		assetsSlider.classList.add("expanded");
		//slideArrowRight();
	}
}






















