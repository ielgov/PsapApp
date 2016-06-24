function addToCurrentParents()
{
	var categoryName = assetsCategories.selectedOptions[0].getAttribute("name");
	var solutionName = assetsSolutions.selectedOptions[0].getAttribute("name");
	var assetName = assetsOfferings.selectedOptions[0].getAttribute("name");
	
	if(categoryName != null || solutionName != null || assetName != null)
	{
		var toAdd = getParentsHTML( categoryName, solutionName, assetName, true )
		document.querySelector("#assets .currentParents").appendChild(toAdd);
	}
	else alert("Make sure to select a category, solution and offering.");
}

function getParentsHTML(categoryName, solutionName, offeringName, deleteButtonFlag)
{
	/*
	<div>
		<div class="deleteButton">
			Delete
		</div>
		<div class="assetParent category">
			Category: <span class="selectedParent">category name here</span>
		</div>
		<div class="assetParent solution">
			Solution:<span class="selectedParent">solution name here</span>
		</div>
		<div class="assetParent offering">
			Offering: <span class="selectedParent">Offering name here</span>
		</div>
	</div>
	*/
	
	var holder = document.createElement("div");
	
	if(deleteButtonFlag)
	{
		var deleteButton = document.createElement("div")
		deleteButton.innerHTML = "Delete";
		deleteButton.classList.add("delete");
		deleteButton.classList.add("button");
		deleteButton.setAttribute("onclick", "deleteClicked(this)");
	
		holder.appendChild(deleteButton)
	}
	
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
	
	holder.setAttribute("parentId", getItemObject(offeringName, "solutions").catid)
	console.log(getItemObject(offeringName, "solutions"));
	
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
	console.log("showAssetSearchResults");
	toggleClass(solutionSearchResultsHolder, "hidden")
}

// page should be the tab it was called from
function assetRequest(button)
{
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
		o.AdminComments = undefined; //o.AdminComments = page.querySelector('[name="AdminComments"]').value;  //TODO fix this
		o.OfferingID = getParentOfferingIDs( page.querySelectorAll(".currentParents > *") ); //o.OfferingID = page.querySelector('[name="OfferingID"]').value; // TODO fix this
	}
	console.log(o)
	var urls = buildURL(o, pageID);
	doRequests(urls)
	
	function getParentOfferingIDs( elementArr )
	{
		var toReturn = [];
		for(var i=0; i<elementArr.length; i++)
		{
			toReturn.push( elementArr[i] );
		}
		return toReturn;		
	}
	
	function buildURL(o, pageID)
	{
		var length = getObjectLength(o);
		var url = [config.url+"/PSAP/dbCategories?"];
		
		var count=0;
		for(var k in o)
		{
			if( k == "OfferingID" )
			{
				url[0] += o[k].length > 0 ? k +"=\""+ o[k][0] +"\"" : k +"=\"\"" ;
				console.log(o)
			}
			else
			{
				url[0] += k +"=\""+ o[k] +"\"";
			}
			url[0] += count+1 < length ? "&" : "" ;
			count++;
		}
		
		console.log(url[0]);
		
		if(pageID == "assets")
		{
			for(var i=1; i<o["OfferingID"].length; i++)
			{
				// TODO make this add but not remove what is there by adding url to url array
			}
		}
		
		return url;		
	}
}

function doRequests(urls)
{
	console.log(urls)
	console.log("would have done the requests");
}












