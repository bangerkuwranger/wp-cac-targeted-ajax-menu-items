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
		//look for target
		var $targets = jQuery(".cac_ajax_target");
		//request post using WP API if target exists
		if( $targets.length() == 1 ){
			jQuery.ajax({
				type : "post",
				dataType : "json",
				url : cacAjax.ajaxurl,
				data : { action: "cac_return_post", slug: slug },
				success: function(response) {
					if (response.type == "success") {
						alert("ok");
					   jQuery(".cac_ajax_target").html(response.post);
					}
					else {
					   alert("damn.");
					}
				}
			});
		}
		// if there's more than one target, just change the first one. (it happens... no need to punish the user for not reading)
		else if ( $targets.length() > 1 ) {
			jQuery.ajax({
				type : "post",
				dataType : "json",
				url : cacAjax.ajaxurl,
				data : { action: "cac_return_post", slug: slug },
				success: function(response) {
					if (response.type == "success") {
						alert("ok");
					   jQuery(".cac_ajax_target").first().html(response.post);
					}
					else {
					   alert("damn.");
					}
				}
			});
		}
		//if no target exists on page, go to the post normally. it can't do nothing...
		else {
			window.location = href;
		}
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
