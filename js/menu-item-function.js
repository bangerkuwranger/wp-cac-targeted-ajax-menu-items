jQuery( document ).ready(function( $ ) {
	//Get all items added to the menu, and ensure that they exist. If so, changes link behavior.
	//Note that if the walker has been modified to remove or alter menu item classes, this will not work as expected... links will just take user to the content rendered as a page.
	var $ajaxMenuItems = $('.menu-item-object-ajaxmenucontent');
	if ($ajaxMenuItems.length > 0) {
		$ajaxMenuItems.each(function() {
			$(this).find('a').click(function( event ) {
				event.preventDefault();
				loadContent( $(this).attr('href') );
				
			});
		});
	}
	function loadContent( href ) {
		console.log( 'href: ' + href );
		var slug = getSlug( href );
		console.log( 'slug: ' + slug );
	}
});
function getSlug(url)
{
	   var qstart = url.indexOf('?');
       var query = qstart >= 0 ? url.substring(qstart + 1) : null;
       if( query ) {
		   var vars = query.split("&");
		   for (var i=0;i<vars.length;i++) {
				   var pair = vars[i].split("=");
				   if(pair[0] == 'ajaxmenucontent'){return pair[1];}
		   }
		}
       return(false);
}