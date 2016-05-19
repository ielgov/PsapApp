var config={};

config.allowRandomLinks = !true; // TODO remove

config.animationTime = 400; // number of ms to wait for open and close animation to finish

config.popupWidth = 90; // window percent to take up for popup // this is needed so it can stay in em and be animated
config.popupHeight = 90; // window percent to take up for popup

function pxToEm( px )
{
	return ( 1/divForFindingEMSize.getBoundingClientRect().width ) * px;
}
	
function emToPx( em )
{
	return ( divForFindingEMSize.getBoundingClientRect().width/1 ) * em;
}

