window.onload = function(){
	//assetsSlider.style.height = assetsSubSlider.getBoundingClientRect().height;
	assetsSlider.style.height = "75%";
	console.log(assetsSubSlider.getBoundingClientRect().height)
	console.log(assetsSlider.height)
	
	addButtons(50);
}

function addButtons(numberOfButtons)
{
	for(var i=0; i<numberOfButtons; i++)
	{
		var d = document.createElement("div");
		
		if( false && Math.random() > .5 ) // randomly make link or button
		{
			d.innerHTML ="link"+i;
			d.setAttribute("href", "https://www.google.com/");
		}
		else
		{
			d.innerHTML ="button"+i;
			d.setAttribute("onclick", "openButton(this)");
		}
		
		d.id=d.innerHTML;
		d.style.order = i;
		
		d.classList.add("asset");
		
		assetsSubSlider.appendChild(d);
	}
}

var isOpen = false;
var oldState = {
	"left":0,
	"top":0,
};
function openButton(buttonClicked)
{
	if( buttonClicked.classList.contains("open") || isOpen )
	{		
		buttonClicked.parentElement.removeChild(buttonClicked);
		document.getElementById("assetsSubSlider").appendChild(buttonClicked);
		
		buttonClicked.style.position = oldState.position
		buttonClicked.style.zIndex = oldState.zIndex		
		buttonClicked.style.left = oldState.left
		buttonClicked.style.top = oldState.top
		
		//*/
		buttonClicked.classList.remove("open");
		buttonClicked.classList.add("closed");
		//*/
		
		buttonClicked.style.zIndex = 1	
	}
	else
	{		
		// TODO make a filler so it doesnt crash down without animation
		var left = buttonClicked.getBoundingClientRect().left
		var top = buttonClicked.getBoundingClientRect().top;
		
		console.log("left "+buttonClicked.getBoundingClientRect().left+" & "+left)
		console.log("top "+buttonClicked.getBoundingClientRect().top+" & "+top)
		
		oldState[position] = "fixed";
		oldState[zIndex] = 2;
		oldState[left] = left - 8;
		oldState[top] = top - 8;
		
		buttonClicked.style.position = "fixed"
		buttonClicked.style.zIndex = 2		
		buttonClicked.style.left = left - 8; // THIS HAS TO BE THE SAME AS THE MARGIN VALUE IN THE CSS
		buttonClicked.style.top = top -8;
		
		buttonClicked.parentElement.removeChild(buttonClicked);
		document.getElementsByTagName("body")[0].appendChild(buttonClicked);
		
		//*/
		setTimeout(function(){ // i have no idea why this needs a timetout
			buttonClicked.classList.add("open");
			buttonClicked.classList.remove("closed");			
		}, 0);
		//*/
	}
	isOpen = !isOpen;
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