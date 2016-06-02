window.onload = function(){
	/*
	var contentObj = {
		"paragraph":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque imperdiet vestibulum magna nec faucibus. Vestibulum mollis non enim quis cursus. Morbi auctor sapien quis mattis blandit. Suspendisse accumsan rhoncus sapien, sit amet feugiat mi dapibus vitae. Nullam sit amet condimentum nibh, non maximus sem. Quisque aliquam, orci quis suscipit venenatis, elit justo ultricies massa, sed varius risus mauris at eros. Nam pharetra ante diam, eget bibendum ex sagittis eget.",
		"paragraph2":"Peter Piper picked a peck of pickled peppers. A peck of pickled peppers Peter Piper picked. If Peter Piper picked a peck of pickled peppers, Where's the peck of pickled peppers Peter Piper picked?<br><br>Denise sees the fleece, Denise sees the fleas. At least Denise could sneeze and feed and freeze the fleas.",
		"link":{"text":"Click to go to IBM", "url": 'http://www.ibm.com/'}
	}
	
	assetsSlider.addEventListener("transitionend", function(e)
	{
		if( !assetsSlider.classList.contains("hidden") && assetsSlider === e.srcElement )
		{
			//button2.click();
			//assetsSlider.
		}
		
	}, false)
	*/
	
	showPopUp(2001, 201);
}
	
// This needs to stay
function sizePopUpWidth( buttonClicked, moveXFlag)
{
	moveXFlag = moveXFlag || false;
	
	if( (buttonClicked == undefined) ) //	|| (lastClicked !== undefined && !lastClicked.classList.contains("open")) )
	{
		return;
	}
	else if( buttonClicked == undefined )
	{
		buttonClicked = lastClicked
	}
		
	buttonClicked.style.width = pxToEm( window.innerWidth * config.popupWidth / 100 )+"em";
	buttonClicked.style.height = pxToEm( window.innerHeight * config.popupHeight / 100 )+"em";
	
	if(moveXFlag)
	{
		console.log("moving x");
		moveX(buttonClicked);
	}
}


// This needs to stay
function moveX(buttonClicked)
{
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
	
	xIcon.style.left = left
	xIcon.style.top = top
}

function revealAssets()
{
	toggleClass(assetsSlider, "hidden");
	//height = assetsHolder.getBoundingClientRect().height + assetsTitle.getBoundingClientRect().height+ 16+16;
	//assetsSlider.style.height = height > 50 ? 50 : height
}

function sizeElements()
{
	//( button1.getBoundingClientRect.width() + config.assetMargin ) * 4;
	
}

// params: seedButton is the button to get the width off of
function sizeAssets(seedButton, containerArr) // sorry, this is really jank 
{
	//console.log(seedButton);
	for( var i=0; i<containerArr.length; i++ )
	{
		containerArr[i].style.marginLeft = 0;	
		containerArr[i].style.marginRight = 0;	
	}
	
	buttonWidth = seedButton.getBoundingClientRect().width + config.assetMargin*2;
	numberElementsAcross = parseInt( window.innerWidth / buttonWidth );
	expectedButtonsWidths = numberElementsAcross * buttonWidth;
	margin = ( window.innerWidth - expectedButtonsWidths ) / 2
	
	
	for( var i=0; i<containerArr.length; i++ )
	{
		containerArr[i].style.marginLeft = margin/2;	
		containerArr[i].style.marginRight = margin/2;	
	}
}

function resize()
{
	sizeAssets(buttonForSizing, document.getElementsByClassName("assetSmallererParent"));
	sizePopUpWidth( undefined, true);
	assetsSlider.style.width = window.innerWidth
}






















