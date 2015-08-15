jQuery(document).ready(function() {

	jQuery('.tabs li a').on('click', function(e)  {
		var href = jQuery(this).attr('href');
		jQuery(href).show().removeClass('tab_turnoff').addClass('tab_turnon');
		jQuery(href).siblings('div').hide().removeClass('tab_turnon').addClass('tab_turnoff');

		jQuery(this).parent('li').removeClass('turnoff').addClass('turnon');
		jQuery(this).parent('li').siblings().removeClass('turnon').addClass('turnoff');

		e.preventDefault();
	});

	jQuery('#settings').on('click', function(e)  {

		var name1;
		var url1;
		$.getJSON("data/config.json", function(data){
			var tabs = data.tabsList;
			name1 = (tabs[0].options.sites[0].name);
			url1 = (tabs[0].options.sites[0].url);
			alert(name1);
		// alert(tabs[0].options.sites[1].url);
		});
		alert("url " + name1);
		$('input[name="site1name"]').val(name1);
		$('input[name="site1url"]').val(url1);

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