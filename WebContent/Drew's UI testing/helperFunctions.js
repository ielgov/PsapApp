function open_in_new_tab(url)
{
	var win = window.open(url, '_blank');
	win.focus();
}

function pxToEm( px )
{
	px += "";
	px = px.split("px").join("");
	px = parseFloat(px)
	return ( 1/divForFindingEMSize.getBoundingClientRect().width ) * px;
}
	
function emToPx( em )
{
	em += "";
	em = em.split("em").join(""); // TODO chnage to work with regex?
	em = parseFloat(em)
	return ( divForFindingEMSize.getBoundingClientRect().width/1 ) * em;
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

var o = [
	{
		"x":0,
		"y":67,
	},
	{
		"x":67,
		"y":67,
	},
	{
		"x":67,
		"y":0,
	},
]
//alert( makeSVGImage(o, 100, 100) )

function makeSVGImage(pointsArr, width, height)
{
	var dStr = "";
	for(var i=0; i<pointsArr.length; i++)
	{
		dStr += i===0 ? "M" : " L";
		dStr += ""+pointsArr[i].x + " " + pointsArr[i].y
	}
	return dStr;
}



















