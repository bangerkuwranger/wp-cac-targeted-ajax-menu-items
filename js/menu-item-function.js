jQuery( document ).ready(function( $ ) {
	//Get all items added to the menu, and ensure that they exist. If so, changes link behavior.
	//Note that if the walker has been modified to remove or alter menu item classes, this will not work as expected... links will just take user to the content rendered as a page.
	var $ajaxMenuItems = $('.menu-item-object-ajaxmenucontent');
	if ($ajaxMenuItems.length > 0) {
		$ajaxMenuItems.each(function() {
			$(this).find('a').click(function( event ) {
				event.preventDefault();
				loadContent( $(this).parent().attr('class') );
				
			});
		});
	}
	function loadContent( contentSlug ) {
		console.log( contentSlug );
	}
});