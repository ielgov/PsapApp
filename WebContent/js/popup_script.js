window.onload = function(){
	assetsSlider.style.height = "75%";
	//showPopUp(2001, 201);
}

function sizePopOutWidth( buttonClicked, moveXFlag )
{	
	console.log("look here on line 37")
	moveXFlag = moveXFlag || false;
	
	if(moveXFlag)
	{
		console.log("moving x");
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
	
	console.log(buttonClicked);
	
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
function sizeAssets(seedButton, containerArr) // sorry, this is really jank 
{
	console.log(seedButton);
	for( var i=0; i<containerArr.length; i++ )
	{
		containerArr[i].style.marginLeft = 0+"px";	
		containerArr[i].style.marginRight = 0+"px";	
	}
	
	buttonWidth = seedButton.getBoundingClientRect().width + config.assetMargin*2;
	numberElementsAcross = parseInt( window.innerWidth / buttonWidth );
	expectedButtonsWidths = numberElementsAcross * buttonWidth;
	margin = ( window.innerWidth - expectedButtonsWidths ) / 4
	
	console.log("numberElementsAcross is "+numberElementsAcross)		
	
	var spaceForButtons = 0;	
	spaceForButtons  += seedButton.getBoundingClientRect().width * numberElementsAcross;
	spaceForButtons  += 2 * margin * numberElementsAcross;
	console.log("spaceForButtons is "+spaceForButtons)
	
	/*/ here I am trying to get the sizing with large number of assets down
	document.querySelectorAll(".assetParent > *").forEach(function(value, key, map){
		value.style.width = spaceForButtons+"px";
	})
	//*/
	
	//(spaceForButtons+"px")
		
	for( var i=0; i<containerArr.length; i++ )
	{
		containerArr[i].style.marginLeft = margin+"px";	
		containerArr[i].style.marginRight = margin+"px";

		console.log( containerArr[i] );
		
	}
	
}

function resize()
{
	sizeAssets(buttonForSizing, document.getElementsByClassName("assetSmallererParent"));
	sizePopOutWidth( undefined, true );
	assetsSlider.style.width = window.innerWidth
	//resizeX();
}






















