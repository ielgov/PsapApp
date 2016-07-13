function getSearchResults(queryText,func)
{
	console.log("Function :: getSearchResults, for queryText =  " + queryText);
	var rest = new Object();
	var restURL = webServerIP+"/PSAP/Search?queryText=" + encodeURIComponent(queryText) + "&resultcount=20";
	getRESTRequest(restURL,true,func);
}

function doSearch(queryText,func)
{
	console.log("Function :: doSearch");
	getSearchResults(queryText,function(response){
		console.log('search response',response);
		var results = response['result'];
		for (var i=0; i<results.length; i++)
		{
			console.log('results',results[i]);
			populateSearchResults(results[i]);
		}		
		//showPopUpResults( results );
		
		showPopUp({'results':results},queryText);
		
		if (func)
			func();
	});
}

//$('.search-table .top-pages').find('td[rowspan]').attr('rowspan',4);
//$('.search-table .people').find('td[rowspan]').attr('rowspan',1);
//$('#search-table> tbody.top-pages').empty()
//$('#search-table> tbody.top-pages')

//Intelligence Led Policing
//Intelligence Led Policing
var getSearchCell = function(title,desc,url){
	var clickURL = undefined;
	if(url)
	{
		clickURL = "window.open('"+url+"');return false;";
	}
	else
	{
		clickURL = "window.open('http://www.ibm.com/us-en/');return false;";
	}
	
	var searchItemCell = '<td class="cell2 click-search" onclick='+clickURL+'><div class="search-result-item"><div class="title">'+title+'</div><div class="desc">'+desc+'</div>' + '</div></td>';
	return searchItemCell;
};

function populateSearchResults(result)
{	
	var tpLen = $('#search-table> tbody.top-pages').children().length;
	var tr = undefined;
	if (tpLen == 0)
	{
		tr = '<tr><td class="cell1" rowspan="1">Top Pages</td>'+getSearchCell(result['display'],result['desc_display'],result['url'])+'</tr>';		
		$('#search-table> tbody.top-pages').append(tr);
	}
	else if (tpLen > 0)
	{
		var rowspan = Number($('#search-table > .top-pages').find('td[rowspan]').attr('rowspan'));
		rowspan++;
		$('#search-table > .top-pages').find('td[rowspan]').attr('rowspan',rowspan);
		tr = '<tr>'+getSearchCell(result['display'],result['desc_display'],result['url'])+'</tr>';
		$('#search-table> tbody.top-pages').append(tr);
	}
}

function assignSearchClicks()
{
	console.log("Function :: assignSearchClicks");
	$('.cell2.click-search').on(onUserAction, function(e){
		e.preventDefault();
		console.log('click-search',$(this));
	});
}

function emptyTopPages()
{
	$('#search-table> tbody.top-pages').empty();
}