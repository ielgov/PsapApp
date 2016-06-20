function clickTab(e)
{	
	var removeSelected = document.querySelectorAll(".tab.selected");
	for( var i=0; i<removeSelected.length; i++)
	{
		console.log(removeSelected[i]);
		removeSelected[i].classList.remove("selected");
	}
	
	var addHidden = document.querySelectorAll(".bodySection");
	for( var i=0; i<addHidden.length; i++ )
	{
		addHidden[i].classList.add("hidden");
	}

	var removeHidden = document.getElementsByName(e.getAttribute("name"));
	for( var i=0; i<removeHidden.length; i++ )
	{
		removeHidden[i].classList.remove("hidden");
	}
	
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

















