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
function getSolutions(parentId, func)
{
	console.log("Function :: getSolutions, for parentId - " + parentId);
	var rest = new Object();
	var restURL = webServerIP+"/PSAP/Categories?type=SOLUTION&parentId=" + parentId;
	getRESTRequest(restURL,true,func);
}

//extract all offerings for a solution
//http://172.27.50.134:9080/PSAP/Categories?type=OFFERING&parentId=101
//solutions 'EAI' has ID '101'
function getOfferings(parentId, func)
{
	console.log("Function :: getOfferings, for parentId - " + parentId);
	var rest = new Object();
	var restURL = webServerIP+"/PSAP/Categories?type=OFFERING&parentId=" + parentId;
	getRESTRequest(restURL,true,func);
}

//extract all assets under an offering of a solution
//http://172.27.50.134:9080/PSAP/Assets?offeringId=1001&parentId=101
//solutions “EAI” which carries the ID “101” and offerings “Products” which carries an ID “1001”
function getAssets(parentId, offeringId,func)
{
	console.log("Function :: getAssets, for parentId =  " + parentId + " and for offeringId = " + offeringId);
	var rest = new Object();
	var restURL = webServerIP+"/PSAP/Assets?offeringId=" + offeringId + "&parentId=" + parentId;
	getRESTRequest(restURL,true);
}

function getRESTRequest(restURL,usejson,func)
{
	console.log("Function :: getRESTRequest, for URL = " + restURL);
	
	if (DEVELOPMENT)
	{
		console.warn("DEVELOPMENT environment");
		if (func)
			func("DEVELOPMENT");
		return;
	}
	else
	{
		console.warn("NOT DEVELOPMENT");
		var useJSON = usejson || true;
		var response;
		
		var xhr = new XMLHttpRequest(); //valid for current versions of IE, GC, FF
		
		xhr.open('GET', restURL, true);
		
		xhr.onload = function(){
			if (xhr.status >=200 && xhr.status < 400)
			{
				//debugger;
				if(useJSON)
				{
					response = JSON.parse(xhr.responseText);
				}
				else
				{
					response = xhr.responseText;
				}
				//console.log("Response - " + JSON.stringify(response));
				
				//return response;
				if (response.hasOwnProperty('result'))
				{
					if (response['result'].length == 0)
					{
						console.log("Empty data received");
						console.log("Response - " + JSON.stringify(response));
						if (!errorCube.visible && !activeRubiksCube.visible)
						{
							errorCube.refreshCubeFaces({'Display':'Coming soon',
														'Name':'Coming soon',
														'errortype':'Coming soon'});
							errorCube.showErrorCube();
						}
					}
					else
					{
						console.log("Data returned with results");
						console.log("Response with RESULT - " + JSON.stringify(response));
						if (func)
							func(response);
					}					
				}
				else if (response.hasOwnProperty('email'))
				{
					console.log("Response Email id",response['email']);
					if (func)
						func(response);
				}
				else
				{
					console.log("Response - " + JSON.stringify(response));
					if (response.indexOf('html'))
					{
						//window.location.href = "http://172.27.50.135:9080/PSAP/index.html";
						window.location.href = response;
					}
				}				
			}
		};
		
		//request resulted in connection error - possibly no internet
		xhr.onerror = function(error)
		{
			console.log("Error in connecting",error);
			errorCube.refreshCubeFaces({'Display':'Connection Error',
										'Name':'Connection Error',
										'errortype':'Connection Error'});
			if (!errorCube.visible && !activeRubiksCube.visible)
			{
				errorCube.showErrorCube();
			}
				
			if (func)
				func('ERROR');
		};

		xhr.send();
	}
	
}

function getData(obj,func)
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
			return returnData;
		}
	}
	else if (obj.type == 'solutions')
	{
		//Get all solutions for category with ID
		//What is category ID
		var categoryId = obj['getDataFor']['CategoryId'];
		var display = obj['getDataFor']['Display'];
		getSolutions(obj.parentId, func);
		
	}
	else if (obj.type == 'offerings')
	{
		//Get all solutions for solution with ID
		//What is solution ID
		var categoryId = obj['getDataFor']['CategoryId'];
		var display = obj['getDataFor']['Display'];
		getOfferings(obj.parentId, func);
		
	}
	else if (obj.type == 'assets')
	{
		//Get all assets under an offering of a solution
		//What is solution ID and offerings ID
		//getAssets(parentId, offeringId)
	}
	
	//return returnData;
}
