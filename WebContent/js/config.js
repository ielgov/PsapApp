var config={};
config.weburl = "http://172.27.50.135:9080"; //DEV
//config.weburl = "http://9.19.48.23:9080"; //TEST
//config.weburl = "http://172.27.50.134:9080"; //PROD INTERNAL
//config.weburl = "http://172.27.50.155:9080"; //PROD_EXTERNAL

config.allowRandomLinks = !true; // TODO remove

config.assetMargin = 8; // THIS NUMBER BEING SUBTRACTED HAS TO BE THE SAME AS THE MARGIN VALUE IN THE CSS

config.popupWidth = 95; // window percent to take up for popup; this is needed so it can stay in em and be animated
config.popupHeight = 92; // window percent to take up for popup

config.keysToShow = [
	"DESC_DISPLAY",
	"URL"
]

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