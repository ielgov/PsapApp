function clickTab(e)
{	
	document.querySelectorAll(".tab.selected").forEach(function(e){
		e.classList.remove("selected");
	});
	
	document.querySelectorAll(".bodySection").forEach(function(e){
		e.classList.add("hidden");
	});
	
	document.getElementsByName(e.getAttribute("name")).forEach(function(e){
		e.classList.remove("hidden");
	});
	
	e.classList.add("selected");
}

function optionsContinue()
{
	var clicked = undefined
	document.querySelectorAll(".bodySection input").forEach(function(e){
		if(e.checked)
		{
			clicked = e;
		}
	})
	if(clicked == undefined){alert("Make a slection before moving on.");return;}
	
	document.querySelector( "#"+clicked.getAttribute("tab") ).click();
}

















