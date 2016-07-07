var config={};
config.weburl = "http://172.27.50.135:9080"; //DEV
//config.weburl = "http://9.19.48.23:9080"; //PROD-EXTERNAL
//config.weburl = "http://172.27.50.134:9080"; //PROD INTERNAL
//config.weburl = "http://172.27.50.155:9080"; //TEST
//config.weburl = "https://172.27.50.155:9443"; //TEST HTTPS

config.weburl = runFromLocalStorage == true ? "http://172.27.50.155:9080" : config.weburl ; // uses dev server if run from local file system

//config.minTileMargin = 5.5;
config.minTileMargin = 0;

config.maxCharInTile = 51;

//config.assetMargin = 8; // THIS NUMBER BEING SUBTRACTED HAS TO BE THE SAME AS THE MARGIN VALUE IN THE CSS

config.popupWidth = 95; // window percent to take up for popup; this is needed so it can stay in em and be animated
config.popupHeight = 92; // window percent to take up for popup

config.keysToShow = [
	"desc_display",
	"url"
]

config.categoriesURL = "/PSAP/dbCategories?action=search&type=SOLUTION&parentid=";
config.solutionsURL = "/PSAP/dbCategories?action=search&type=OFERING&parentid=";
config.offeringsURL = "/PSAP/dbAssets?action=search&SubmittedBy="//+"gscgov@us.ibm.com"; // this one doesnt seem to be working right

config.categories = {
	"Intelligent Lead Policing Investigative and Predictive Analytics":"01",
	"Command and Control, Operations, and Emergency Management":"02",
	"Realtime Crime / Fusion Center":"03",
	"Video, Physical Cyber Security and Surveillance":"04"
}

config.keyIsToBeShown =  function( key )
{
	for( var k in config.keysToShow)
	{
		if( config.keysToShow[k] === key )
		{
			return true
		}
	}
	return false;
}

