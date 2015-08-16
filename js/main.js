jQuery(document).ready(function() {

	$.fn.myFunction = function(){ 
		$.getJSON("data/config.json", function(data){
			var tabs = data.tabsList;
			$('input[name="site1name"]').val(tabs[0].options.sites[0].name);
			$('input[name="site1url"]').val(tabs[0].options.sites[0].url);
			$('input[name="site2name"]').val(tabs[0].options.sites[1].name);
			$('input[name="site2url"]').val(tabs[0].options.sites[1].url);
			$('input[name="site3name"]').val(tabs[0].options.sites[2].name);
			$('input[name="site3url"]').val(tabs[0].options.sites[2].url);
		});
	}

	jQuery('.tabs li a').on('click', function(e)  {
		var href = jQuery(this).attr('href');
		jQuery(href).show().removeClass('tab_turnoff').addClass('tab_turnon');
		jQuery(href).siblings('div').hide().removeClass('tab_turnon').addClass('tab_turnoff');

		jQuery(this).parent('li').removeClass('turnoff').addClass('turnon');
		jQuery(this).parent('li').siblings().removeClass('turnon').addClass('turnoff');

		e.preventDefault();
	});

	jQuery('#settings').on('click', function(e)  {
		$.fn.myFunction();
		var class_name = jQuery('#sites-div').attr('class');
		if (class_name=='sites-div-turnoff') {
			jQuery('#sites-div').removeClass('sites-div-turnoff').addClass('sites-div-turnon');
			e.preventDefault();
		} else {
			jQuery('#sites-div').removeClass('sites-div-turnon').addClass('sites-div-turnoff');
			e.preventDefault();
		};
	});

	jQuery('#expand').on('click', function(e)  {
		var class_name = jQuery('iframe').attr('src');
		if (class_name!=null) {
			var win = window.open(class_name);
			win.focus();
			e.preventDefault();
		}
	});

	jQuery('#cancel').on('click', function(e)  {
		jQuery('#sites-div').removeClass('sites-div-turnon').addClass('sites-div-turnoff');
		e.preventDefault();

	});

	jQuery("form").submit(function(e){
		alert("Submitted");

		e.preventDefault();
	});



});