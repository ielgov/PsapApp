function buildPopUp( results )
{	
	results = getGroups( results );
	
	for(var k in results)
	{
		var assetParent = makeAssetParent()
		var title = makeTitle( k );
		var assetSmallerParent = makeAssetSmallerParent( results[k], undefined );
		
		assetParent.appendChild( title );
		assetParent.appendChild( assetSmallerParent );
		
		assetsHolder.appendChild( assetParent );
	}
	
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
	
	resize();
	numberOfResults.innerHTML = assetsSlider.getElementsByClassName("asset").length;	
}

function getGroups( results )
{
	var toReturn = {};
	for( var k in results )
	{
		if( toReturn[ results[k].ASSETGROUP ] == undefined )
		{
			toReturn[ results[k].ASSETGROUP ] = [];
		}
		toReturn[ results[k].ASSETGROUP ].push( results[k]  );
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
		var asset = makeAsset( assets[k], i++ );
		assetSmallererParent.appendChild( asset );
		
		var contentHolder = document.createElement("div");
		contentHolder.classList.add("contentHolder")
		contentHolder.classList.add("hidden")

		for( var l in assets[k] ) // TODO this should be moved to the makeAsset function
		{
			if( config.keyIsToBeShown(l) )
			{
				var div = makeDivWithData( assets[k], l )
				contentHolder.appendChild( document.createElement("br") );
				contentHolder.appendChild( div );
			}
		}
		asset.appendChild( contentHolder ); // TODO this should be moved to the makeAsset function
	}
	
	assetSmallerParent.appendChild( assetSmallererParent );
	return assetSmallerParent;
	
	//------------start of functions---------------------------
	function makeAsset(assetObj, i)
	{
		var asset = document.createElement("div");
		asset.classList.add("asset");
		asset.style.order = i;
		
		var title = document.createElement("div");
		title.innerHTML = assetObj.Display;
		title.classList.add("title");
		asset.appendChild( title )
	
		if( assetObj.ASSETACTION == "BLURB" ) // is meant to be a pop up
		{
			asset.onclick = function(){openButton(this)}
		}
		else // is meant to be a link
		{
			asset.onclick = function(){open_in_new_tab(assetObj.URL)}
		}
		
		return asset;
	}
	
	function makeDivWithData(data, l)
	{
		var div = document.createElement( "div" );
		if( l === "URL")
		{	
			console.log("data is ")
			console.log();
			div.onclick = function(){ open_in_new_tab( data[l] ) };
			//div.innerHTML = l+": "+data[l] + " ("+data['ASSET_TYPE']+")";
			
			var html = data['ASSET_TYPE']=="" ? "" : "<img class='linkIcon' src='images/icons/"+data['ASSET_TYPE']+".png'></img>";			
			div.innerHTML += html
		}
		else
		{
			div.innerHTML = data[l];
			//div.classList.add("hidden");
			
		}
		return div;
	}
}


















