/*
A Category contains one to many solutions.
A Solution contains one to many offerings.
A Solution has one to many parent (Category)
*/

var webServerIP = config.weburl;

//extract all categories available
//http://172.27.50.134:9080/PSAP/Categories?type=CATEGORY&parentId=0
function getCategories(parentId)
{
	console.log("Function :: getCategories, for parentId - " + parentId);	
	var rest = new Object();
	var restURL = webServerIP+"/PSAP/Categories?type=CATEGORY&parentId=" + parentId;
	getRESTRequest(restURL,true);
}

//extract all solutions for a category
//http://172.27.50.134:9080/PSAP/Categories?type=SOLUTION&parentId=01
//category 'ILP' has ID '01'
function getSolutions(parentId)
{
	console.log("Function :: getSolutions, for parentId - " + parentId);
	var rest = new Object();
	var restURL = webServerIP+"/PSAP/Categories?type=SOLUTION&parentId=" + parentId;
	getRESTRequest(restURL,true);
}

//extract all offerings for a solution
//http://172.27.50.134:9080/PSAP/Categories?type=OFFERING&parentId=101
//solutions 'EAI' has ID '101'
function getOfferings(parentId)
{
	console.log("Function :: getOfferings, for parentId - " + parentId);
	var rest = new Object();
	var restURL = webServerIP+"/PSAP/Categories?type=OFFERING&parentId=" + parentId;
	getRESTRequest(restURL,true);
}

//extract all assets under an offering of a solution
//http://172.27.50.134:9080/PSAP/Assets?offeringId=1001&parentId=101
//solutions “EAI” which carries the ID “101” and offerings “Products” which carries an ID “1001”
function getAssets(parentId, offeringId)
{
	console.log("Function :: getAssets, for parentId =  " + parentId + " and for offeringId = " + offeringId);
	var rest = new Object();
	var restURL = webServerIP+"/PSAP/Assets?offeringId=" + offeringId + "&parentId=" + parentId;
	getRESTRequest(restURL,true);
}

function getRESTRequest(restURL,usejson)
{
	console.log("Function :: getRESTRequest, for URL = " + restURL);
	var useJSON = usejson || true;
	var response;
	
	var xhr = new XMLHttpRequest(); //valid for current versions of IE, GC, FF
	
	xhr.open('GET', restURL, true);
	
	xhr.onload = function(){
		if (xhr.status >=200 && xhr.status < 400)
		{
			debugger;
			if(useJSON)
			{
				response = JSON.parse(xhr.responseText);
			}
			else
			{
				response = xhr.responseText;
			}
			console.log("Response - " + response);
			
			return response;
		}
	};
	
	//request resulted in connection error - possibly no internet
	xhr.onerror = function()
	{
		console.log("Error in connecting");
	};

	xhr.send();
}

function getData(obj)
{
	console.log("Function :: getData", obj);
	var result;
	var returnData;
	if (obj.type == 'categories')
	{
		//result = getCategories(0);
		result = categoryJSON;
		
		//Parse the result
		//different for each scenario
		if (result.hasOwnProperty('categories'))
		{
			var categoriesArray = result.categories;
			returnData = categoriesArray;
		}
	}
	else if (obj.type == 'solutions')
	{
		//Get all solutions for category with ID
		//What is category ID
		//getSolutions(obj.parentId);
		
		/*
		obj: "CategoryId": "02","Name": "CCOEM","Display": "Command Control, Ops, and Emegency Mgmt"
		getSolutions(02);

		//This returns "01": [
		{
			"CategoryId": "101",
			"Name": "ILE",
			"Display": "Tactical Lead Generation"
			}, 
			{
			"CategoryId": "102",
			"Name": "IDRes",
			"Display": "Identity Resolution"
			}.....
			
		*/
		//debugger;
		var categoryId = obj['getDataFor']['CategoryId'];
		var display = obj['getDataFor']['Display'];
		result = getSolutions(obj.parentId);
		console.log('getting solutions for',categoryId,display);
		returnData = result['result'];
		
		/*for (var i=0; i<result.length;i++)
		{
			var RES = result[i];
			if (RES.hasOwnProperty(obj.parentId))
			{
				
			}
		}*/
		
		/*if (result.hasOwnProperty('02'))
		{
			var dataArray = result['02'];
			returnData = dataArray;
		}*/
	}
	else if (obj.type == 'offerings')
	{
		//Get all solutions for solution with ID
		//What is solution ID
		var categoryId = obj['getDataFor']['CategoryId'];
		var display = obj['getDataFor']['Display'];
		//result = getOfferings(parentId);
		result = getOfferings(obj.parentId);
		returnData = result['result'];
		console.log('getting solutions for',categoryId,display);
		
		//result = offeringsJSON;
		
		/*if (result.hasOwnProperty('101'))
		{
			var dataArray = result['101'];
			returnData = dataArray;
		}*/
	}
	else if (obj.type == 'assets')
	{
		//Get all assets under an offering of a solution
		//What is solution ID and offerings ID
		//getAssets(parentId, offeringId)
	}
	
	return returnData;
}