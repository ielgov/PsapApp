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
	em = em.split("em").join("").split("rem").join(""); // TODO chnage to work with regex?
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

function httpRequest(url, callback, method, async)
{
	async = async || false;
	method = method || "GET";
	
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() 
	{
		if (xhttp.readyState == 4 && xhttp.status == 200) 
		{
			console.log( JSON.parse(xhttp.responseText) );
			
			if(callback !== undefined)
			{
				callback( xhttp.responseText );
			}
		}
	};
	xhttp.open(method, url, async);
	try{
		xhttp.send();
	}
	catch(e){
		console.log("***Using offline data");
		callback( localStorage.getItem("search_results") )
	}
}



















