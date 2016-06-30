function addToCurrentParents()
{
	var categoryName = assetsCategories.selectedOptions[0].getAttribute("name");
	var solutionName = assetsSolutions.selectedOptions[0].getAttribute("name");
	var assetName = assetsOfferings.selectedOptions[0].getAttribute("name");
	
	if(categoryName != null || solutionName != null || assetName != null)
	{
		var toAdd = getParentsHTML( categoryName, solutionName, assetName, getItemObject(assetName, "solutions").catid )
		document.querySelector("#assets .currentParents").appendChild(toAdd);
	}
	else alert("Make sure to select a category, solution and offering.");
}

function getParentsHTML(categoryName, solutionName, offeringName, catid)
{
	var holder = document.createElement("div");
	
	var deleteButton = document.createElement("div")
	deleteButton.innerHTML = "Delete";
	deleteButton.classList.add("delete");
	deleteButton.classList.add("button");
	deleteButton.setAttribute("onclick", "deleteClicked(this)");
	
	holder.appendChild(deleteButton)
	
	var category = document.createElement("div")
	category.innerHTML = "Category: ";
		var textSpan = document.createElement("span")
		textSpan.classList.add("selectedParent")
		textSpan.innerHTML = abrivateString(categoryName, 22);
		category.appendChild(textSpan);
	category.classList.add("assetParent");
	category.classList.add("category");
	category.setAttribute("name", categoryName)
	
	var solution = document.createElement("div")
	solution.innerHTML = "Solution: ";
		var textSpan = document.createElement("span")
		textSpan.classList.add("selectedParent")
		textSpan.innerHTML = abrivateString(solutionName, 22);
		solution.appendChild(textSpan);
	solution.classList.add("assetParent");
	solution.classList.add("solution");
	solution.setAttribute("name", solutionName)
	
	var offering = document.createElement("div")
	offering.innerHTML = "Offering: ";
		var textSpan = document.createElement("span")
		textSpan.classList.add("selectedParent")
		textSpan.innerHTML = abrivateString(offeringName, 22);
		offering.appendChild(textSpan);
	offering.classList.add("assetParent");
	offering.classList.add("offering");
	offering.setAttribute("name", offeringName)
	
	holder.setAttribute("parentId", catid)
	//console.log(getItemObject(offeringName, "solutions"));
	
	holder.appendChild(category)
	holder.appendChild(solution)
	holder.appendChild(offering)
	
	return holder;	
}

function deleteClicked(buttonClicked)
{
	console.log("removing...");console.log(buttonClicked);
	buttonClicked.parentElement.parentElement.removeChild( buttonClicked.parentElement )
}

function showAssetSearchResults()
{
	var table = document.querySelectorAll(".asset.searchResult table > *")[0];
	document.querySelectorAll(".asset.searchResult")[0].classList.remove("hidden");
	
	var toRemove = document.querySelectorAll(".asset.searchResult table > * > :not(.title)"); // removes all current results
	for(var k=0; k<toRemove.length; k++)
	{
		toRemove[k].parentElement.removeChild( toRemove[k] );
	}
		
	console.log("showAssetSearchResults");
	document.querySelector(".asset.searchResult").classList.remove("hidden")
	
	var email = document.querySelector('#assets .searchBar input[placeholder="Email"]').value;
	console.log("email is ");
	
	var url = config.weburl+"/PSAP/dbAssets?action=search&SubmittedBy="+email;
	console.log("url is "+url)
	
	httpRequest(url, function(data){
		data = JSON.parse(data).result;
		currentData["assets"] = data;
		
		for(var k in data)
		{
			var row = document.createElement("tr")
			var theData = data[k];
			row.setAttribute("onclick", "populateAsset("+k+")");
			
			var id = document.createElement("td");
			id.innerHTML = data[k].AssetDetail.assetid;
			
			var name = document.createElement("td");
			name.innerHTML = data[k].AssetDetail.assetdisplayname;
			
			var submitedBy = document.createElement("td")
			submitedBy.innerHTML = data[k].AssetDetail.submittedby;
			
			row.appendChild(id)
			row.appendChild(name)
			row.appendChild(submitedBy)
			table.appendChild(row);
		}
	}, "GET")
}

function populateAsset( k )
{
	//console.log(currentData["assets"][k]);
	data = currentData["assets"][k];
	//console.log(data.AssetDetail)
	page = assets;
	
	page.querySelector('[name="AssetID"]').value = data.AssetDetail.assetid; 
	page.querySelector('[name="AssetDisplayName"]').value = data.AssetDetail.assetdisplayname; 
	page.querySelector('[name="AssetDisplayDescription"]').value = data.AssetDetail.assetdisplaydescription; 				// fix
	page.querySelector('[name="URL"]').value = data.AssetDetail.url; 
	page.querySelector('[name="ActionType"]').selectedIndex = setSelectIndex( data.AssetDetail.actiontype, page.querySelector('[name="ActionType"]')); 
	page.querySelector('[name="AssetType"]').selectedIndex = setSelectIndex( data.AssetDetail.assettype, page.querySelector('[name="AssetType"]')); 
	page.querySelector('[name="SourceType"]').selectedIndex = setSelectIndex( data.AssetDetail.sourcetype, page.querySelector('[name="SourceType"]')); 
	page.querySelector('[name="AssetGroupingText"]').value = data.AssetDetail.assetgroupingtext; 
	page.querySelector('[name="SubmittedBy"]').value = data.AssetDetail.submittedby; 
	page.querySelector('[name="Status"]').selectedIndex = setSelectIndex( data.AssetDetail.status, page.querySelector('[name="Status"]')); 
	page.querySelector('[name="AdminComments"]').selectedIndex = data.AssetDetail.AdminComments; 
// I think this is set up just fine	getParentOfferingIDs( page.querySelectorAll(".currentParents > *") ) = data.AssetDetail.AssetID;
	addParents(data.AssetParents);
	
	document.querySelector(".asset.searchResult").classList.add("hidden")
	
	function setSelectIndex( str, select)
	{		
		selectG = select;
		for( var i=0; i<select.options.length; i++)
		{
			//console.log( select.options[i] );
			if( select.options[i].innerHTML === str )
			{
				console.log("setSelectIndex is retrunging "+1);
				return i;
			}
			else if(false)
			{
				console.log(select.options[i]);
				console.log(str);
			}
		}
		console.log("failed");
	}
	
	function addParents(parents)
	{
		var parent = document.querySelector("#assets .currentParents");
		var toRemove = parent.querySelectorAll("*");
		
		for(var k=0; k<toRemove.length; k++)
		{
			toRemove[k].parentElement.removeChild( toRemove[k] );
		}
		
		console.log(parents)
		//var parentsHTML = getParentsHTML(categoryName, solutionName, offeringName, catid);
		for(var k in parents)
		{
			console.log(parents[k]);
			console.log(parents[k].offering);
			console.log(parents[k].solution	);
			console.log(parents[k].category);
			parentsHTML = getParentsHTML(parents[k].category, parents[k].solution, parents[k].offering, parents[k].offeringid);
			console.log(parentsHTML)
			parent.appendChild(parentsHTML)
		}
	}
}

// page should be the tab it was called from
function assetRequest(button)
{
	if(document.querySelectorAll(".currentParents > *").length < 1)
	{
		alert("You must first add parents to the asset");
		return;
	}
	
	var page = document.querySelector(".bodySection:not(.hidden)");
	var pageID = page.id;
	pageG = page;

	var o = {};
	o.action = button.getAttribute("actionName");
	
	if( pageID == "solutions" )
	{
		o.parentid = page.querySelector("#solutionsSolutions").selectedOptions[0].getAttribute("catid");
		o.type = "SOLUTION";
		o.displayname = page.querySelector('[name="displayname"]').value;
		o.description = page.querySelector('[name="description"]').value;
	}
	else if( pageID == "offerings" )
	{
		o.parentid = page.querySelector("#offeringsOfferings").selectedOptions[0].getAttribute("catid");
		o.type = "OFFERING";
		o.displayname = page.querySelector('[name="displayname"]').value;
		o.description = page.querySelector('[name="description"]').value;
	}
	else if( pageID == "assets" )
	{
		o.AssetID = page.querySelector('[name="AssetID"]').value; 
		o.AssetDisplayName = page.querySelector('[name="AssetDisplayName"]').value; 
		o.AssetDisplayDescription = page.querySelector('[name="AssetDisplayDescription"]').value; 
		o.URL = page.querySelector('[name="URL"]').value; 
		o.ActionType = page.querySelector('[name="ActionType"]').selectedOptions[0].value; 
		o.AssetType = page.querySelector('[name="AssetType"]').selectedOptions[0].value; 
		o.SourceType = page.querySelector('[name="SourceType"]').selectedOptions[0].value; 
		o.AssetGroupingText = page.querySelector('[name="AssetGroupingText"]').value; 
		o.SubmittedBy = page.querySelector('[name="SubmittedBy"]').value; 
		o.Status = page.querySelector('[name="Status"]').selectedOptions[0].value; 
		o.AdminComments = page.querySelector('[name="AdminComments"]').value; //undefined;
		o.OfferingID = getParentOfferingIDs( page.querySelectorAll(".currentParents > *") );
	}
	console.log(o)
	var urls = buildURL(o, pageID);
	
	console.log("o.AssetID is -"+o.AssetID+"-")
	console.log("type of o.AssetID is "+typeof o.AssetID)
		
	//var id = o.action == "add" ? "" : o.AssetID || page.querySelector('[containsId]').selectedOptions[0].getAttribute("catid");
	var id = o.AssetID;
	if(id == undefined)
	{
		id = page.querySelector('[containsId]').selectedOptions[0].getAttribute("catid");
	}
	
	doRequests(urls, button.getAttribute("actionName"), id, pageID);
	
	function getParentOfferingIDs( elementArr )
	{
		var toReturn = [];
		for(var i=0; i<elementArr.length; i++)
		{
			toReturn.push( elementArr[i].getAttribute("parentid") );
		}
		return toReturn;		
	}
	
	function buildURL(o, pageID)
	{
		var length = getObjectLength(o);
		var baseUrl = config.weburl+"/PSAP/";
		var url = [];
		
		o.action = o.action === "modify" ? "add" : o.action; // can you call modify if the data has been deleted? can you call add with an id?
				
		baseUrl += pageID == "assets" ? "dbAssets?" : "dbCategories?";
		
		var count=0;
		for(var k in o)
		{
			baseUrl += k +"="
			
			baseUrl += o[k] +"";
			
			baseUrl += count+1 < length ? "&" : "" ;
			count++;
		}
		url.push(baseUrl);
		
		console.log(baseUrl);
		
		console.log("***returning \""+url+"\"")
		console.log("***returning length is "+url.length)
		return url;		
	}
}

function doRequests(urls, type, itemid, pageID) 
// TODO change dbCategories for all but assets and to dbAssets for assets if it is an asset 
// AssetID for assets and itemid for cat and solutions last one this needs type
{	

	console.log("urls is "+urls)	
	console.log("type is "+type)	
	console.log("itemid is "+itemid)
	
	var dbEndpoint = pageID == "assets" ? "dbAssets" : "dbCategories";
	var idStr = pageID == "assets" ? "AssetID" : "itemid"; 
	
	if( type === "delete")
	{
		urls = [];
	}
	
	if(type === "modify" || type === "delete")
	{
		var deleteUrl = config.weburl+"/PSAP/"+dbEndpoint+"?"+idStr+"="+itemid+"&action=delete";
		urls.unshift(deleteUrl)	
	}
	
	console.log("about to request "+JSON.stringify(urls) )
	doSingleRequest(urls, 0);
	
	
	function doSingleRequest(arr, index)
	{
		if( index >= arr.length )
		{
			console.log("should be done. Index is "+index+". arr is "+arr)
			alert("action completed successfully");
			return;
		}
		else
		{
			//return;// TODO remove			
			httpRequest(arr[index], function()
			{
				console.log("callback")
				doSingleRequest(arr, index+1);
			}, "POST", function(){/*alert("doing request "+index);*/console.log("")})
		}
	}
}

function clearAssetFields ()
{
	var toSetToEmpty = document.querySelectorAll('#assets .assetsFieldHolder [type="text"]');
	
	for(var i=0; i<toSetToEmpty.length; i++)
	{
		toSetToEmpty[i].value = "";
	}
	
	var toSetToEmpty = document.querySelectorAll('#assets .assetsFieldHolder select')
	
	for(var i=0; i<toSetToEmpty.length; i++)
	{
		toSetToEmpty[i].selectedIndex  = 0;
	}
	
	document.querySelector('.currentParents').innerHTML = "";
}
















