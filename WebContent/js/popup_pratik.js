function showAssetOverlay()
{
	$('#assetOverlay').removeClass('display-none');
}

function hideAssetOverlay()
{
	$('#assetOverlay').addClass('display-none');
	$('#assetOverlay .assetOvTitle').text('');
	$('#assetOverlay .assetOvContent').text('');
	//$('#assetOverlay .assetOvLink > a').text('');
}

function pxCloseButton()
{
	
}

function populateAssetOverlay(assetObj)
{
	$('#assetOverlay .assetOvTypeImage').attr('src',"images/icons/" + assetObj['asset_type'].toUpperCase() + ".svg");
	$('#assetOverlay .assetOvTitle').text(assetObj.display);
	$('#assetOverlay .assetOvContent').text(assetObj.desc_display);
	$('#assetOverlay .assetOvLink').attr("onclick", "open_in_new_tab(\""+assetObj.url+"\");");
	//$('#assetOverlay .assetOvLink > a').text(assetObj.url);
	
	showAssetOverlay();
}