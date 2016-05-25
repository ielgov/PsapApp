function buildPopUp(results)
{	
	//console.log("Starting to build popup. Results is...");console.log(results);
	
	for(var k in results)
	{
		var assetParent = makeAssetParent()
		var title = makeTitle( results[k].title );
		var assetSmallerParent = makeAssetSmallerParent( results[k].assets, undefined );
		
		assetParent.appendChild( title );
		assetParent.appendChild( assetSmallerParent );
		
		assetsHolder.appendChild( assetParent );
	}
	
	resize();
	numberOfResults.innerHTML = assetsSlider.getElementsByClassName("asset").length;	
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
	
	for(var k in assets)
	{
		var asset = makeAsset( assets[k] );
		assetSmallererParent.appendChild( asset );
	}
	
	assetSmallerParent.appendChild( assetSmallererParent );
	return assetSmallerParent;
	
	//------------start of functions---------------------------
	function makeAsset(assetObj)
	{
		var asset = document.createElement("div");
		asset.classList.add("asset");
		
		var title = document.createElement("div");
		title.innerHTML = assetObj.title;
		title.classList.add("title");
		asset.appendChild( title )
	
		if( assetObj.link == undefined ) // is meant to be a pop up
		{
			asset.onclick = function(){openButton(this)}
		}
		else // is meant to be a link
		{
			asset.onclick = function(){open_in_new_tab(assetObj.link)}
		}
		
		return asset;
	}
}

// start of dummy data

var results = [];

results.push({
	"title": "IOC for Emergency Management",
	"assets": [
		{
			"title": "Incident and Emergency Management Solution Kit",
			"url": {
				"label":"test link",
				"link":"http://www.ibm.com/us-en/"
			},
			"paragraph": "test",
			"link":null
		},
		{
			"title": "External IOC for EM product web page",
			"url": {
				"label":"test link",
				"link":"http://www.ibm.com/us-en/"
			},
			"paragraph": "test",
			"link":null
		},
		{
			"title": "Emergency Management solution page within the IBM Analytics Government website",
			"url": {
				"label":"test link",
				"link":"http://www.ibm.com/us-en/"
			},
			"paragraph": "test",
			"link":null
		},
		{
			"title": "IBM Analytics Safer Planet web page (see Public Safety section)",
			"url": {
				"label":"test link",
				"link":"http://www.ibm.com/us-en/"
			},
			"paragraph": "test",
			"link":null
		},
		{
			"title": "June 11 2015 IOC for EM Safer Planet - Webcast",
			"url": {
				"label":"test link",
				"link":"http://www.ibm.com/us-en/"
			},
			"paragraph": "test",
			"link":null
		},
		{
			"title": "IBM Intelligent Operations Center for Emergency Management Video",
			"url": {
				"label":"test link",
				"link":"http://www.ibm.com/us-en/"
			},
			"paragraph": "test",
			"link":null
		},
		{
			"title": "Emergency Management Podcast with G Nestler with A Crowe",
			"url": {
				"label":"test link",
				"link":"http://www.ibm.com/us-en/"
			},
			"paragraph": "test",
			"link":null
		}
	]
})

results.push({
	"title": "Intelligent Video Analytics (IVA)",
	"assets": [
		{
			"title": "IVA Solution Kit",
			"url": {
				"label":"test link",
				"link":"http://www.ibm.com/us-en/"
			},
			"paragraph": "test",
			"link":null
		},
		{
			"title": "External IVA Product Page",
			"url": {
				"label":"test link",
				"link":"http://www.ibm.com/us-en/"
			},
			"paragraph": "test",
			"link":null
		},
		{
			"title": "IVA Video Demo",
			"url": {
				"label":"test link",
				"link":"http://www.ibm.com/us-en/"
			},
			"paragraph": "test",
			"link":null
		},
		{
			"title": "Test Link",
			"url": null,
			"paragraph": "test",
			"link": "http://www.ibm.com/us-en/"
		}
	]
})

// end of dummy data


















