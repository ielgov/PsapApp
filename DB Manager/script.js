var currentData = undefined;

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

function test()
{
	//httpRequest(config.url+"/PSAP/dbCategories?action=search&type=SOLUTION&parentid="+"01", function(d){console.log("d is "+d);});
	//httpRequest(config.url+"/PSAP/dbCategories?action=search&type=OFERING&parentid="+"101", function(d){console.log("d is "+d);});
	httpRequest(config.url+"/PSAP/dbAssets?action=search&SubmittedBy="+"edgingtn@us.ibm.com", function(d){console.log("d is "+d);});
	
	//httpRequest(config.url+"/PSAP/dbCategories?type=OFERING&action=search&parentid="+"101", getSelectData);
}

function selectChange(changedSelect, nextId, type)
{
	var nextElement = document.querySelector("#"+nextId);
	
	if(changedSelect.value == "Make a selection" || changedSelect.value == "There were no results")
	{
		nextElement.innerHTML = "<option>Make a "+type.toLowerCase()+" selection</option>";
	}
	else
	{	
		var URLSegment = undefined;
		var parentID = "";
	
		if( type.toLowerCase() === "categories" )
		{
			console.log("c "+type.toLowerCase())
			URLSegment = config.categoriesURL;
			console.log("changedSelect is... ");console.log(changedSelect.value);
			parentID = config.categories[ changedSelect.value ]; //fix this
		}
		else if( type.toLowerCase() === "solutions" )
		{
			console.log("s "+type.toLowerCase())
			URLSegment = config.solutionsURL;
			parentID = getItemObject( changedSelect.value ).catid;
		}
		else if( type.toLowerCase() === "offerings" )
		{
			console.log("o "+type.toLowerCase())
			URLSegment = config.offeringsURL;
			parentID = "edgingtn@us.ibm.com";
		}
	
		httpRequest(config.url+URLSegment+parentID, function(data){ currentData=JSON.parse(data); setSelect( nextElement,  currentData);});
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
		option.innerHTML = data[i].catdisplayname;
		option.name = data[i].catid;
		select.appendChild(option);
	}
}

function populateEdit( changedSelect, tabId)
{
	var obj = getItemObject( changedSelect.value );
	document.querySelector('#'+ tabId +' input[placeholder=Name]').value = obj.catdisplayname;
	document.querySelector('#'+ tabId +' input[placeholder=Description]').value = obj.catdesc;
}

function getItemObject(itemName)
{
	for(var i=0; i<currentData.result.length; i++)
	{
		if( currentData.result[i].catdisplayname === itemName )
		{
			console.log("returning"+ currentData.result[i].catid);
			return currentData.result[i];
		}
	}
	console.log("didnt find requested solution")
	console.log("currentData is...");console.log(currentData);
}















