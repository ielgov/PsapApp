function getSearchResults(queryText,func)
{
	console.log("Function :: getSearchResults, for queryText =  " + queryText);
	var rest = new Object();
	var restURL = webServerIP+"/PSAP/Search?queryText=" + encodeURIComponent(queryText) + "&resultcount=20";
	getRESTRequest(restURL,true,func);
}
var searchTableLimit = 5;
function doSearch(queryText,func)
{
	console.log("Function :: doSearch");
	getSearchResults(queryText,function(response){
		console.log('search response',response);
		
		if (response.hasOwnProperty('result'))
		{
			var results = response['result'];
			for (var i=0; i<results.length; i++)
			{
				//console.log('results',results[i]);
				if (results[i]['asset_type'] == 'contact')
					populateSearchResults(results[i],'people');
				else
					populateSearchResults(results[i],'top-pages');			
			}		
			//showPopUpResults( results );
			
			showPopUp({'results':results},queryText);
			
			if (func)
				func();
		}		
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

function populateSearchResults(result, searchType)
{	
	var tpLen = $('#search-table> tbody.'+searchType).children().length;
	var tr = undefined;
	if (tpLen == 0)
	{
		if (searchType == 'top-pages')
			tr = '<tr><td class="cell1" rowspan="1">Top Pages</td>'+getSearchCell(result['display'],result['desc_display'],result['url'])+'</tr>';
		else if (searchType == 'people')
			tr = '<tr><td class="cell1" rowspan="1">People</td>'+getSearchCell(result['display'],result['desc_display'],result['url'])+'</tr>';
		
		$('#search-table> tbody.'+searchType).append(tr);
	}
	else if (tpLen > 0)
	{
		var rowspan = Number($('#search-table > .'+searchType).find('td[rowspan]').attr('rowspan'));
		
		if (rowspan < searchTableLimit)
		{
			rowspan++;
			$('#search-table > .'+searchType).find('td[rowspan]').attr('rowspan',rowspan);
			tr = '<tr>'+getSearchCell(result['display'],result['desc_display'],result['url'])+'</tr>';
			$('#search-table> tbody.'+searchType).append(tr);
		}		
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

function emptySearchResults()
{
	$('#search-table> tbody.top-pages').empty();
	$('#search-table> tbody.people').empty();
}

function clearSearchBox()
{
	console.log("Function :: clearSearchBox");
	$('#search-results').addClass('display-none');
	//assetsSlider.classList.add("hidden");
	//$('#searchbox').val('');
	$('#searchbox').blur();		
	emptySearchResults();
	$('.jumpToBar').show();
}