/*
TODO resize popup when window resizes -> px and em to and from percent?
*/

window.onload = function(){
	assetsSlider.style.height = "75%";
	console.log(assetsSubSlider.getBoundingClientRect().height)
	console.log(assetsSlider.height)
	
	var contentObj = {
		"paragraph":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque imperdiet vestibulum magna nec faucibus. Vestibulum mollis non enim quis cursus. Morbi auctor sapien quis mattis blandit. Suspendisse accumsan rhoncus sapien, sit amet feugiat mi dapibus vitae. Nullam sit amet condimentum nibh, non maximus sem. Quisque aliquam, orci quis suscipit venenatis, elit justo ultricies massa, sed varius risus mauris at eros. Nam pharetra ante diam, eget bibendum ex sagittis eget."
	}
	
	addButtons(14, contentObj);
	
	buttonclick();
	//setTimeout(function(){button2.click();}, config.animationTime)
}

function addButtons(numberOfButtons, contentObj) // TODO remove or change to use real data
{
	for(var i=0; i<numberOfButtons; i++)
	{
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
			l.innerHTML = contentObj.paragraph;
			l.classList.add("buttonContent");
			l.id="l"+i;
			l.onclick = "open_in_new_tab('http://www.ibm.com/')"
						
			contentHolder.appendChild(l)
			contentHolder.appendChild(p)
			d.appendChild(contentHolder);
			
			title.innerHTML ="button"+i;
			d.setAttribute("onclick", "openButton(this)");
		}
		
		d.id = title.innerHTML;
		d.style.order = i;
		
		d.classList.add("asset");
		
		assetsSubSlider.appendChild(d);
		
		title.style.marginTop =( d.getBoundingClientRect().height - document.getElementsByClassName("title")[0].getBoundingClientRect().height)/2;
	}
}

var oldState = {};
var placeHolders = {};
var lastClicked;
function openButton(buttonClicked)
{
	buttonClicked = buttonClicked || lastClicked; // TODO this seems shakey 
	
	//if(buttonClicked === undefined]){return;}
	
	//console.log("buttonClicked is ")
	//console.log(buttonClicked)
	
	//var title = buttonClicked.getElementsByClassName("title")[0]
		
	var parent = buttonClicked.parentElement
	if( buttonClicked.classList.contains("open"))
	{	
		greyOutBox.classList.add("hidden")
		
		setTimeout(function(){ greyOutBox.style.zIndex = -1 }, config.animationTime)
		
		buttonClicked.classList.remove("open");
		buttonClicked.style.width = oldState.width
		buttonClicked.style.height = oldState.height
		
		//*/
		buttonClicked.style.top = oldState.topStep1
		buttonClicked.style.left = oldState.leftStep1
		buttonClicked.style.position = oldState.positionStep1
		//*/
		
		var needToShow = buttonClicked.getElementsByClassName("contentHolder");
		for(var k=0; k< needToShow.length; k++)
		{
			needToShow[k].classList.add("hidden");
		}
		xIcon.classList.add("hidden")
		
		setTimeout( function(){			
			var placeHolder = placeHolders[ buttonClicked.id+"PlaceHolder" ];
		
			assetsSubSlider.appendChild( placeHolder )
			placeHolder.classList.remove("hidden")
			placeHolder.parentElement.removeChild( placeHolder );
			parent.removeChild(buttonClicked);
			document.getElementById("assetsSubSlider").appendChild(buttonClicked);
			
			//console.log( buttonClicked.parentElement )		
		
			//*
			buttonClicked.style.position = "";
			buttonClicked.style.zIndex = "";
			buttonClicked.style.left = oldState.left
			buttonClicked.style.top = oldState.top		
			buttonClicked.onclick = oldState.onclick;
			//*/
		
		}, config.animationTime ) // this needs to be the same as the animation time for shrinking

	}
	else
	{	
		lastClicked = buttonClicked;
			
		buttonClicked.style.zIndex = 3;
		greyOutBox.style.zIndex = 2;
		greyOutBox.classList.remove("hidden")
				
		// TODO make a filler so it doesnt crash down without animation
		var left = buttonClicked.getBoundingClientRect().left
		var top = buttonClicked.getBoundingClientRect().top;
		
		//console.log("left "+buttonClicked.getBoundingClientRect().left+" & "+left)
		//console.log("top "+buttonClicked.getBoundingClientRect().top+" & "+top)
		
		oldState["left"] = left - 8;// THIS number being subtracted HAS TO BE THE SAME AS THE MARGIN VALUE IN THE CSS
		oldState["top"] = top - 8;// THIS number being subtracted HAS TO BE THE SAME AS THE MARGIN VALUE IN THE CSS
		oldState["width"] = buttonClicked.getBoundingClientRect().width;
		oldState["height"] = buttonClicked.getBoundingClientRect().height;
		oldState.onclick = buttonClicked.onclick;
		
		buttonClicked.style.position = "fixed"
		buttonClicked.style.left = oldState["left"]; 
		buttonClicked.style.top = oldState["top"];	
		buttonClicked.onclick = "";
		
		var buttonPlaceHolder = buttonClicked.cloneNode();
		buttonPlaceHolder.id = buttonPlaceHolder.id+"PlaceHolder";
		buttonPlaceHolder.classList.add("placeHolder")
		buttonPlaceHolder.style.boxShadow = "none";
		//console.log( buttonPlaceHolder );
		parent.appendChild(buttonPlaceHolder);
		
		//console.log( buttonPlaceHolder.getBoundingClientRect() );
		
		placeHolders[buttonPlaceHolder.id] = buttonPlaceHolder;
		
		console.log(169)
		
		sizePopUpWidth( buttonClicked )
		
		setTimeout(function(){ // i have no idea why this needs a timetout
			buttonClicked.classList.add("open");
			
			var needToShow = buttonClicked.getElementsByClassName("contentHolder");
			for(var k=0; k< needToShow.length; k++)
			{
				needToShow[k].classList.remove("hidden");
			}			
		}, 0);
		
		setTimeout(function(){
			xIcon.classList.remove("hidden")
			moveX(buttonClicked);
		}, config.animationTime)
	}
}

function sizePopUpWidth( buttonClicked, moveXFlag)
{
	moveXFlag = moveXFlag || false;
	buttonClicked = buttonClicked || lastClicked
	
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
	
	console.log("boundingRect.left is "+boundingRect.left)
	console.log("boundingRect.width is "+boundingRect.width)
	
	console.log("left is "+left)
	console.log("top is "+top)
	
	left -= xIcon.getBoundingClientRect().width;
	
	left -= emToPx(1.5);
	top += emToPx(1.5);
	
	xIcon.style.left = left
	xIcon.style.top = top
}

function buttonclick()
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






















