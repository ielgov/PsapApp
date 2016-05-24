function toggleExpanded( e )
{
	console.log(e);
	//e.style.height = e.getBoundingClientRect().height;
	toggleClass( e, "hidden" );
}