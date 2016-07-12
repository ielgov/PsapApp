function getSearchResults(queryText,func)
{
	console.log("Function :: getSearchResults, for queryText =  " + queryText);
	var rest = new Object();
	var restURL = webServerIP+"/PSAP/Search?queryText=" + queryText;
	getRESTRequest(restURL,true,func);
}

function doSearch(queryText)
{
	console.log("Function :: doSearch");
	getSearchResults(queryText,function(response){
		var returnData = response['result'];
		console.log('search response',returnData);
	});
}

//$('.search-table .top-pages').find('td[rowspan]').attr('rowspan',4);
//$('.search-table .people').find('td[rowspan]').attr('rowspan',1);
//$('#search-table> tbody.top-pages').empty()
//$('#search-table> tbody.top-pages')

//Intelligence Led Policing
//Intelligence Led Policing
var getSearchCell = function(title,desc){
	var searchItemCell = '<td class="cell2"><div class="search-result-item"><div class="title">'+title+'</div><div class="desc">'+desc+'</div>' + '</div></td>';
	return searchItemCell;
};

function populateSearchResults(title,desc)
{	
	var tpLen = $('#search-table> tbody.top-pages').children().length;
	if (tpLen == 0)
	{
		var tr = '<tr><td class="cell1" rowspan="1">Top Pages</td>'+getSearchCell(title,desc)+'</tr>';		
		$('#search-table> tbody.top-pages').append(tr);
	}
	else if (tpLen > 0)
	{
		var rowspan = Number($('#search-table > .top-pages').find('td[rowspan]').attr('rowspan'));
		rowspan++;
		$('#search-table > .top-pages').find('td[rowspan]').attr('rowspan',rowspan);
		var tr = '<tr>'+getSearchCell(title,desc)+'</tr>';
		$('#search-table> tbody.top-pages').append(tr);
	}
}

function emptyTopPages()
{
	$('#search-table> tbody.top-pages').empty();
}