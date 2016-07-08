global=undefined;//TODO remove

function buildPopUp( results )
{	
	results = getGroups( results );
	
	var clusterSelect = document.querySelector(".jumpToBar select")
	clusterSelect.innerHTML = "";
	var option = document.createElement("option");
	option.innerHTML = "Make a selection";
	clusterSelect.appendChild( option );
	
	for(var k in results)
	{
		
		var assetParent = makeAssetParent()
		var breakLine = document.createElement("hr");
		var title = makeTitle( k );
		var assetSmallerParent = makeAssetSmallerParent( results[k], undefined );
		
		assetParent.setAttribute("id", k);
		
		console.log( assetParent );
		
		assetParent.appendChild( title );
		assetParent.appendChild( breakLine );
		assetParent.appendChild( assetSmallerParent );
		
		assetsHolder.appendChild( assetParent );
		
		var option = document.createElement("option");
		option.innerHTML = k;
		clusterSelect.appendChild( option );
	}
	
	/*// this is the part to center the text in the tile on the slid up
	
	var assets = document.getElementsByClassName("asset");// start of sizing margin for asset
	for(var i=0; i<assets.length; i++)
	{
		if( assets[i].classList.contains("offScreen") )
		{
			continue;
		}
		
		//console.log( assets[i] );
		
		var title = assets[i].getElementsByClassName("title")[0];
		//console.log( title );
		
		marginTop = ( assets[i].getBoundingClientRect().height/2 - title.getBoundingClientRect().height/2 ) -10 ; // with the 10 it looks nice
					
		title.style.marginTop = marginTop+"px";
	}
	*/
	
	numberOfResults.innerHTML = assetsSlider.getElementsByClassName("asset").length;	
	resize();
}

/* TODO remove
function addToJumpList( str )
{
	var item = document.createElement("a");
	item.innerHTML = " | "+abrivateString(str, 23);
	item.setAttribute("href", "#"+str);
	jumpList.appendChild( item )
}
*/

function getGroups( results )
{
	var toReturn = {};
	for( var k in results )
	{
		if( toReturn[ results[k].assetgroup ] == undefined )
		{
			toReturn[ results[k].assetgroup ] = [];
		}
		toReturn[ results[k].assetgroup ].push( results[k]  );
	}
	return toReturn;
}

function makeAssetParent()
{
	var assetParent = document.createElement("div")
	assetParent.classList.add("assetParent");
	return assetParent;
}

function makeTitle( titleStr )
{
	var title = document.createElement("div");
	title.classList.add("title")
	title.innerHTML = titleStr;
	return title;
}

function makeAssetSmallerParent(assets, id)
{	
	var assetSmallerParent = document.createElement("div");
	assetSmallerParent.classList.add("assetSmallerParent")
	
	var assetSmallererParent = document.createElement("div");
	assetSmallererParent.classList.add("assetSmallererParent")
	
	var i=0;
	for(var k in assets)
	{
		var asset = makeAsset( assets[k], i );
		
		assetSmallererParent.appendChild( asset );
		
		var contentHolder = document.createElement("div");
		contentHolder.classList.add("contentHolder")
		//contentHolder.classList.add("hidden")
		
		for( var l in assets[k] ) // TODO this should be moved to the makeAsset function
		{
			if( config.keyIsToBeShown(l) ) // TODO remove
			{
				var div = makeDivWithData( assets[k], l )
				//contentHolder.appendChild( document.createElement("br") );
				contentHolder.appendChild( div );
			}
		}
		asset.appendChild( contentHolder ); // TODO this should be moved to the makeAsset function
		i++;
	}
	
	assetSmallerParent.appendChild( assetSmallererParent );
	return assetSmallerParent;
	
	//------------start of functions---------------------------
	function getColumn(  parent, elementNumber )
	{
		document.querySelector
	}
	
	function makeAsset(assetObj, i)
	{
		var hasDescription = false;
		if( assetObj.desc_display != undefined && assetObj.desc_display != "" )
		{
			hasDescription = true;
		}
		
		console.log(assetObj);
		var asset = document.createElement("div");
		asset.classList.add("asset");
		asset.style.order = i;
		
		var icon = document.createElement("img");
		icon.setAttribute("src", "images/black.png")// TODO change to be relevant to the icon
		asset.appendChild( icon )
		
		var title = document.createElement("div");
		title.appendChild(abrivateStringWithMore( assetObj.display, config.maxCharInTile, function(e){ e.stopPropagation(); openButton(asset); }, hasDescription ));
		title.classList.add("title");
		asset.appendChild( title )
	
		//asset.onclick = function(){ openButton(this); }
		asset.onclick = function(){open_in_new_tab(assetObj.url)}
		//asset.onclick = function(){console.log("asdf");console.log( asset );}
		
		asset.setAttribute("desc_display", assetObj.desc_display);
		asset.setAttribute("display", assetObj.display);
		asset.setAttribute("hasDescription", hasDescription);
		console.log(assetObj)
		
		return asset;
	}
	
	function makeDivWithData(data, l)
	{
		
		var div = document.createElement( "div" );
		div.classList.add("assetContent")
		if( l === "url")
		{	
			//console.log("data is " + JSON.stringify( data ))
			div.onclick = function(){ open_in_new_tab( data[l] ) };
			//div.innerHTML = l+": "+data[l] + " ("+data['asset_type']+")";
			
			//*/
			if( data['asset_type'].toUpperCase() != "DESCRIPTION ONLY" )
			{				
				try
				{
					var img = document.createElement("img")
					img.classList.add("linkIcon");
					img.src = config.weburl + "/PSAP/images/icons/" + data['asset_type'].toUpperCase() + ".png"
					div.appendChild(img);				
				}
				catch(e)
				{
					var innerDiv = document.createElement("div")
					innerDiv.innerHTML += data['asset_type']					
				}	
			}
			//*/
		}
		else
		{
			div.innerHTML = data[l];
			//div.classList.add("hidden");
			
		}
		return div;
	}
}

function slideArrowLeft()
{
	var slideArrow = document.querySelector("#slideUpCloseArrow");
	var slideArrowChildren = document.querySelectorAll("#slideUpCloseArrow > *");
	var boundingRect = slideArrow.getBoundingClientRect();
	
	line1 = slideArrowChildren[0]
	line1.setAttribute("x1", boundingRect.width);
	line1.setAttribute("y1", 0);	
	line1.setAttribute("x2", 0);
	line1.setAttribute("y2", boundingRect.height/2);
	
	line2 = slideArrowChildren[1]
	line2.setAttribute("x1", 0);
	line2.setAttribute("y1", boundingRect.height/2);	
	line2.setAttribute("x2", boundingRect.width);
	line2.setAttribute("y2", boundingRect.height);
	
	slideArrow.appendChild(line1);
	slideArrow.appendChild(line2);
}

function slideArrowRight()
{
	var slideArrow = document.querySelector("#slideUpCloseArrow");
	var slideArrowChildren = document.querySelectorAll("#slideUpCloseArrow > *");
	var boundingRect = slideArrow.getBoundingClientRect();
	
	line1 = slideArrowChildren[0]
	line1.setAttribute("x1", 0);
	line1.setAttribute("y1", 0);	
	line1.setAttribute("x2", boundingRect.width);
	line1.setAttribute("y2", boundingRect.height/2);
	
	line2 = slideArrowChildren[1]
	line2.setAttribute("x1", boundingRect.width);
	line2.setAttribute("y1", boundingRect.height/2);	
	line2.setAttribute("x2", 0);
	line2.setAttribute("y2", boundingRect.height);
	
	slideArrow.appendChild(line1);
	slideArrow.appendChild(line2);
}

function abrivateStringWithMore( str, length, action, hasDescription )
{
	var addMore = hasDescription || str.length > length;
	
	if( addMore && str.length+7 > length )
	{
		str = str.substring(0, length-3);
	}	
	
	var e = document.createElement("span");
	e.innerHTML = str;
	
	if( addMore )
	{
		var a = document.createElement("a");
		if( action != undefined )
		{
			a.onclick = action;
		}
		a.innerHTML = "...More"
		e.appendChild(a);
	}
	
	return e;
}

function abrivateStringWithMore_old( str, length, action, hasDescription )
{
	
	var addMore = false;
	
	if( hasDescription )
	{
		addMore = true;
		length-=4;
	}
	else if( str.length >  length )
	{
		addMore = true;
		console.log("else if")
		length-=4;
	}
	
	var needToShorten = str.length > length;
	
	//str.length > length ? str.substring(0, length-3)+"..." : str;
	
	var str = abrivateString(str, length);
	
	if( addMore || needToShorten )
	{
	}
	else
	{
		
	}
	
	
	e.innerHTML = str;
	
	return e;	
}


















