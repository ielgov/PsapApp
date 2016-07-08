var currentData = {};

function clickTab(e)
{	
	
	var removeSelected = document.querySelectorAll(".tab.selected");
	for( var i=0; i<removeSelected.length; i++)
	{
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
		if (removeHidden[i].innerText == 'Search'){
			console.log('Search Tab');
			document.querySelector(".asset.searchResult").classList.remove("hidden")
		}else if (removeHidden[i].innerText == 'Assets' ||
				removeHidden[i].innerText == 'Offerings' ||
				removeHidden[i].innerText == 'Options' || 
				removeHidden[i].innerText == 'Solutions'){
			document.querySelector(".asset.searchResult").classList.add("hidden")
		}
	}
	
	e.classList.add("selected");
}

function optionsContinue()
{
	var clicked = undefined
	var elements = document.querySelectorAll(".bodySection input")
	for(var i=0; i<elements.length; i++)
	{
		var e = elements[i];
		if(e.checked)
		{
			clicked = e;
		}
	}
	if(clicked == undefined){alert("Make a slection before moving on.");return;}
	
	document.querySelector( "#"+clicked.getAttribute("tab") ).click();
}

function test()
{
	//httpRequest(config.weburl+"/PSAP/dbCategories?action=search&type=SOLUTION&parentid="+"01", function(d){console.log("d is "+d);});
	//httpRequest(config.weburl+"/PSAP/dbCategories?action=search&type=OFERING&parentid="+"101", function(d){console.log("d is "+d);});
	httpRequest(config.weburl+"/PSAP/dbAssets?action=search&SubmittedBy="+"edgingtn@us.ibm.com", function(d){console.log("d is "+d);});
	
	//httpRequest(config.weburl+"/PSAP/dbCategories?type=OFERING&action=search&parentid="+"101", getSelectData);
}

function selectChange(changedSelect, nextId, type)
{
	var nextElement = document.querySelector("#"+nextId);
	
	changedSelectG = changedSelect // TODO remove
	selectedStr = changedSelect.selectedOptions[0].getAttribute('name');
	
	if(selectedStr == "Make a selection" || selectedStr == "There were no results")
	{
		nextElement.innerHTML = "<option>Make a "+type.toLowerCase()+" selection</option>";
	}
	else
	{	
		var URLSegment = undefined;
		var parentID = "";
	
		if( type.toLowerCase() === "categories" )
		{
			URLSegment = config.categoriesURL;
			parentID = config.categories[ selectedStr ]; //fix this
		}
		else if( type.toLowerCase() === "solutions" )
		{
			URLSegment = config.solutionsURL;
			parentID = getItemObject( selectedStr,  "categories").catid;
		}
		else if( type.toLowerCase() === "offerings" )
		{
			URLSegment = config.offeringsURL;
			parentID = "edgingtn@us.ibm.com";
		}
		
		//alert("config.weburl id is "+config.weburl)
	
		httpRequest(config.weburl+URLSegment+parentID, function(data)
		{
			currentData[type.toLowerCase()] = JSON.parse(data); 
			setSelect( nextElement,  currentData[type.toLowerCase()]);
		});
	}
}

function getSelectData(data, nextElement)
{
	data = JSON.parse(data);
	console.log("\t\tdata is "+data);
	console.log("\t\tdata.result is "+data.result);
	setSelect( nextElement, data )
}

function setSelect(select, data)
{
	data = data.result;
	console.log("data is "+data);
	
	select.innerHTML = "";
	
	var option = document.createElement("option");
	option.innerHTML = data.length > 0 ? "Make a selection": "There were no results";
	select.appendChild(option);
	
	for(var i=0; i<data.length; i++)
	{
		var option = document.createElement("option");
		option.innerHTML = data[i].catdisplayname.substring(0, 19)+"...";
		option.setAttribute("name", data[i].catdisplayname);
		option.setAttribute("catid", data[i].catid);
		select.appendChild(option);
	}
}

function populateEdit( changedSelect, tabId, dataType)
{
	var obj = getItemObject( changedSelect.selectedOptions[0].getAttribute('name'), dataType );
	document.querySelector('#'+ tabId +' input[placeholder=Name]').value = obj.catdisplayname;
	document.querySelector('#'+ tabId +' input[placeholder=Description]').value = obj.catdesc;
}

// data type is the parent that was called to get to this point not the actual data you want; this could be fixed
function getItemObject(itemName, dataType)
{
	console.log("itemName is "+itemName);
	console.log("129 dataType is "+dataType);
	if(dataType==undefined) alert("130 dataType is "+dataType);
	for(var i=0; i<currentData[dataType].result.length; i++)
	{
		if( currentData[dataType].result[i].catdisplayname === itemName || currentData[dataType].result[i].catdisplayname.substring(0, 19)+"..." === itemName)
		{
			console.log("returning"+ currentData[dataType].result[i].catid);
			return currentData[dataType].result[i];
		}
	}
	alert("ERROR: Didn't find requested solution for \""+itemName+"\"");
	console.log("currentData["+dataType+"] is...");console.log(currentData[dataType]);
}












