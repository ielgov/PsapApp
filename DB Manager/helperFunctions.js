var runFromLocalStorage = window.location.href.indexOf("file://") >= 0;

function open_in_new_tab(url)
{
	var win = window.open(url, '_blank');
	win.focus();
}

function pxToEm( px )
{
	//console.log("IN PX TO EM");
	px += "";
	px = px.split("px").join(""); // TODO chnage to work with regex?
	px = parseFloat(px)
	return ( 1/divForFindingEMSize.getBoundingClientRect().width ) * px;
}
	
function emToPx( em )
{
	//console.log("IN EM TO PX");
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

function httpRequest(url, callback, method)
{
	async = true;
	method = method || "GET";
	
	var xhttp = new XMLHttpRequest();
	
	
		console.log(52)
	xhttp.onreadystatechange = function() 
	{
		console.log("xhttp.readyState is "+xhttp.readyState)
		console.log("xhttp.status is "+xhttp.status)
		if (xhttp.readyState == 4 && xhttp.status == 200) 
		{
			//console.log( JSON.parse(xhttp.responseText) );
			
			if(callback !== undefined)
			{
				callback( xhttp.responseText );
			}
		}
	};
	console.log("requesting *"+url+"*");
	xhttp.open(method, url, async);
	try{
		xhttp.send();
	}
	catch(e){
		console.log("***Using offline data");
		callback( localStorage.getItem("search_results") )
	}
	return xhttp;
}

var pointsObj = [
	{"x":0, "y":0},
	{"x":10, "y":0},
	{"x":20, "y":0},
	{"x":10, "y":20}
]

function makeSVGImage(pointsArr, width, height)
{
	var dStr = "";
	for(var i=0; i<pointsArr.length; i++)
	{
		dStr += i===0 ? "M" : " L";
		
		if( pointsArr[i].x <= 1 ) // this is so you can use relitive fractions to the size of the points
		{
			pointsArr[i].x *= width;
		}				
		if( pointsArr[i].y <= 1 ) // this is so you can use relitive fractions to the size of the points
		{
			pointsArr[i].y *= height;
		}
		
		dStr += pointsArr[i].x + " " + pointsArr[i].y; 
	}
	return dStr;
}

function abrivateString(str, length)
{
	var toReturn = undefined;
	console.log("str is "+str)
	if((typeof str) !== "string")
	{
		alert("file type is not a string"); // TODO change this to an error that is thrown
	}
	else
	{
		toReturn = str.length > length ? str.substring(0, length-3)+"..." : str;
	}
	return toReturn;
}

function getObjectLength(o)
{
	var lengthCount = 0;
	for(var k in o)
	{
		lengthCount++;
	}
	return lengthCount;
}




















