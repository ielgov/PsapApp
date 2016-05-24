window.onload = function(){
	assetsSlider.style.height = "75%";
	console.log(assetsSubSlider.getBoundingClientRect().height)
	console.log(assetsSlider.height)
	
	var contentObj = {
		"paragraph":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque imperdiet vestibulum magna nec faucibus. Vestibulum mollis non enim quis cursus. Morbi auctor sapien quis mattis blandit. Suspendisse accumsan rhoncus sapien, sit amet feugiat mi dapibus vitae. Nullam sit amet condimentum nibh, non maximus sem. Quisque aliquam, orci quis suscipit venenatis, elit justo ultricies massa, sed varius risus mauris at eros. Nam pharetra ante diam, eget bibendum ex sagittis eget.",
		"paragraph2":"Peter Piper picked a peck of pickled peppers. A peck of pickled peppers Peter Piper picked. If Peter Piper picked a peck of pickled peppers, Where's the peck of pickled peppers Peter Piper picked?<br><br>Denise sees the fleece, Denise sees the fleas. At least Denise could sneeze and feed and freeze the fleas.",
		"link":{"text":"Click to go to IBM", "url": 'http://www.ibm.com/'}
	}
	
	revealAssets();
	
	//return; // this needs to be removed to go back to first thought
	
	//addButtons(14, contentObj);
	
		
	assetsSlider.addEventListener("transitionend", function(e)
	{
		if( !assetsSlider.classList.contains("hidden") && assetsSlider === e.srcElement )
		{
			//button2.click();
			//assetsSlider.
		}
		
	}, false)
}

var isBlue = true;//TODO remove
function addButtons(numberOfButtons, contentObj) // TODO remove or change to use real data
{
	var popUpSections = {};
	for(var i=0; i<numberOfButtons; i++)
	{
		var sectionName = "";
		var section;
		
		if( Math.random() > .5 )//TODO remove series of blocks
		{
			sectionName = "first";
		}
		else
		{
			sectionName = "second";
		}
		
		if( popUpSections[sectionName] === undefined )
		{
			section = document.createElement("div");
			popUpSections[sectionName] = section;
			
			section.id = sectionName;
			assetsSlider.appendChild(section);
			
			section.classList.add("subSlider")
			
			if(isBlue)
			{
				section.style.background = "blue";
				isBlue = false;
			}
			else 
			{
				section.style.background = "green";
			}
		}
		else
		{
			section = popUpSections[sectionName];
		}
		
		var d = document.createElement("div");
		var title = document.createElement("div");
		title.classList.add("title");
		d.appendChild(title);
		
		if( config.allowRandomLinks && Math.random() > .5 ) // randomly make link or button
		{
			title.innerHTML ="link"+i;
			d.setAttribute("onclick", "open_in_new_tab('http://www.ibm.com/')" );
		}
		else
		{
			var contentHolder = document.createElement("div");
			contentHolder.classList.add("contentHolder")
			contentHolder.classList.add("hidden")
			
			var p = document.createElement("div");
			p.innerHTML = contentObj.paragraph;
			p.classList.add("buttonContent");
			
			var l = document.createElement("div");
			l.innerHTML = contentObj.link.text;
			l.classList.add("buttonContent");
			l.id="l"+i;
			l.onclick = function(){open_in_new_tab(contentObj.link.url)}
			
			var p2 = document.createElement("div");
			p2.innerHTML = contentObj.paragraph2;
			p2.classList.add("buttonContent");
			
			var hr = document.createElement("hr");
			hr.style.width = "90%";
						
			//contentHolder.appendChild( hr.cloneNode() )
			contentHolder.appendChild(l)
			//contentHolder.appendChild( hr.cloneNode() )
			contentHolder.appendChild(p)
			//contentHolder.appendChild( hr )
			contentHolder.appendChild(p2)
			d.appendChild(contentHolder);
			
			title.innerHTML ="button"+i;
			d.setAttribute("onclick", "openButton(this)");
			
			d.addEventListener("transitionend", function(e)
			{
				if( !e.srcElement.classList.contains("open") && e.propertyName === "width" )
				{
					console.log("in if");
					console.log(e.srcElement);
					console.log(e.propertyName);
					greyOutBox.style.zIndex = -1;
				
					var placeHolder = placeHolders[ e.srcElement.id+"PlaceHolder" ];
		
					assetsSubSlider.appendChild( placeHolder )
			
					console.log( placeHolder.getBoundingClientRect() );
					
					placeHolder.parentElement.removeChild( placeHolder );
					
					console.log(e.srcElement)
			
					e.srcElement.style.position = "";
					e.srcElement.style.zIndex = "";
					e.srcElement.style.left = "";//placeHolder.getBoundingClientRect().left
					e.srcElement.style.top = "";//placeHolder.getBoundingClientRect().top;		
					e.srcElement.onclick = placeHolder.onclick;
				}
			}, false);
		}
		
		if(i==3) // TODO remove this whole block
		{
			title.innerHTML = "This is a really long title that I hope will show an unrealistic length that we will never reach for an asset title";
		}
		
		d.id = title.innerHTML;
		d.style.order = i;
		
		d.classList.add("asset");
		
		section.appendChild(d);
		
		title.style.marginTop =( d.getBoundingClientRect().height - d.getElementsByClassName("title")[0].getBoundingClientRect().height)/2;
	}
}

//var oldState = {}; // TODO remove all occurences 
var placeHolders = {};
var lastClicked;
function openButton(buttonClicked) // the order of doing thing in this function is very sensitive 
{
	buttonClicked = buttonClicked || lastClicked; // TODO this seems shakey 
	
	//if(buttonClicked === undefined]){return;}
	
	var parent = buttonClicked.parentElement;
	
	if( buttonClicked.classList.contains("open")) // fork for closing
	{	
		var placeHolder = placeHolders[ buttonClicked.id+"PlaceHolder" ].getBoundingClientRect();
		
		buttonClicked.style.left = placeHolder.left - config.assetMargin;
		buttonClicked.style.top = placeHolder.top - config.assetMargin;
		
		greyOutBox.classList.add("hidden");
		
		buttonClicked.classList.remove("open"); // this block is setting button back to where it was
		buttonClicked.style.width = placeHolder.width;
		buttonClicked.style.height = placeHolder.height;
		buttonClicked.style.zIndex = "";
		
		var needToShow = buttonClicked.getElementsByClassName("contentHolder"); // hides the content of the button
		for(var k=0; k< needToShow.length; k++)
		{
			needToShow[k].classList.add("hidden");
		}
		xIcon.classList.add("hidden")
			
	}
	else
	{	
		buttonClickedRect = buttonClicked.getBoundingClientRect()
		var left = buttonClicked.getBoundingClientRect().left
		var top = buttonClicked.getBoundingClientRect().top;
		lastClicked = buttonClicked;
		
		greyOutBox.style.zIndex = 1;
		greyOutBox.classList.remove("hidden")	
		
		//oldState.left = left - config.assetMargin;
		//oldState.top = top - config.assetMargin;// THIS NUMBER BEING SUBTRACTED HAS TO BE THE SAME AS THE MARGIN VALUE IN THE CSS
		//oldState["width"] = buttonClickedRect.width; //TODO remove
		//oldState["height"] = buttonClickedRect.height; //TODO remove
		//oldState.onclick = buttonClicked.onclick;
		
		buttonClicked.style.position = "fixed"
		buttonClicked.style.left = left - config.assetMargin; // THIS NUMBER BEING SUBTRACTED HAS TO BE THE SAME AS THE MARGIN VALUE IN THE CSS
		buttonClicked.style.top =  top  - config.assetMargin;	
		buttonClicked.onclick = "";
		buttonClicked.style.zIndex = 2;
		
		var buttonPlaceHolder = buttonClicked.cloneNode();
		buttonPlaceHolder.id = buttonPlaceHolder.id+"PlaceHolder";
		buttonPlaceHolder.classList.add("placeHolder")
		buttonPlaceHolder.style.boxShadow = "none";
		parent.appendChild(buttonPlaceHolder);		
		
		placeHolders[buttonPlaceHolder.id] = buttonPlaceHolder;
		
		sizePopUpWidth( buttonClicked )
		
		buttonClicked.classList.add("open");
			
		var needToShow = buttonClicked.getElementsByClassName("contentHolder");
		for(var k=0; k< needToShow.length; k++)
		{
			needToShow[k].classList.remove("hidden");
		}
		
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
	
	function sizePopUpWidth( buttonClicked, moveXFlag)
	{
		moveXFlag = moveXFlag || false;
		
		if( buttonClicked == undefined && !lastClicked.classList.contains("open") )
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
}

function toggleClass(e, className)
{
	if( (typeof e) == "number" || (typeof e) == "string" || (typeof e) == "function")
	{
		return;
	}
	
	if(e.classList.contains(className))
	{
		e.classList.remove(className);
	}
	else
	{
		e.classList.add(className);
	}
}






















