jQuery(document).ready(function() {

	var tabs = '';
	var first = 1;

	$.fn.loadJson = function(){ 
		$.getJSON("data/config.json", function(data){
			tabs = data.tabsList;
			console.log('first json ' + tabs);
			$('input[name="site1name"]').val(tabs[0].options.sites[0].name);
			$('input[name="site1url"]').val(tabs[0].options.sites[0].url);
			$('input[name="site2name"]').val(tabs[0].options.sites[1].name);
			$('input[name="site2url"]').val(tabs[0].options.sites[1].url);
			$('input[name="site3name"]').val(tabs[0].options.sites[2].name);
			$('input[name="site3url"]').val(tabs[0].options.sites[2].url);
			
			$("#my-folders iframe").attr("src", tabs[1].options.url);

			$("#public-folders iframe").attr("src", tabs[3].options.url);

		});
	}

	$.fn.loadJsonSecondery = function(){
		console.log('load for second time')
		$('input[name="site1name"]').val(tabs[0].options.sites[0].name);
		$('input[name="site1url"]').val(tabs[0].options.sites[0].url);
		$('input[name="site2name"]').val(tabs[0].options.sites[1].name);
		$('input[name="site2url"]').val(tabs[0].options.sites[1].url);
		$('input[name="site3name"]').val(tabs[0].options.sites[2].name);
		$('input[name="site3url"]').val(tabs[0].options.sites[2].url);
	}

	$.fn.saveJson = function(){ 
		console.log('saving');
		var tabsNew = {
			"options": {
				"rowLabel": "Report",
				"sites": [
				{"name":$('input[name="site1name"]').val(), "url": $('input[name="site1url"]').val()},
				{"name":$('input[name="site2name"]').val(), "url":$('input[name="site2url"]').val()},
				{"name":$('input[name="site3name"]').val(), "url":$('input[name="site3url"]').val()}
				]
			}
		};
		tabs[0]=tabsNew;
	}

	$.fn.closeSettings = function(){
		jQuery('#sites-div').removeClass('sites-div-turnon').addClass('sites-div-turnoff');
	}

	$.fn.showFirstIframe = function() {
		if ($('input[name="site1name"]').val()){
			$("#quick-reports iframe").attr("src", tabs[0].options.sites[0].url);
		} else if ($('input[name="site2name"]').val()) {
			$("#quick-reports iframe").attr("src", tabs[0].options.sites[1].url);
		} else if ($('input[name="site3name"]').val()) {
			$("#quick-reports iframe").attr("src", tabs[0].options.sites[2].url);
		}
	}

	$.fn.selectItemCheck = function() {
		if ($('input[name="site1name"]').val() || $('input[name="site2name"]').val() || $('input[name="site3name"]').val()){
			$('select').css("visibility", "visible");
    		    $('#quick-reports option[value="1"]').text($('input[name="site1name"]').val());
    		    $('#quick-reports option[value="2"]').text($('input[name="site2name"]').val());
    		    $('#quick-reports option[value="3"]').text($('input[name="site3name"]').val());


		} else {
			$('select').css("visibility", "hidden");			
		}
	}

	$('#quick-reports select').change(function() {
	    var eventTypeName = $("#quick-reports option:selected");
	    if (eventTypeName.is('[value="1"]') ) {
	    	$("#quick-reports iframe").attr("src", tabs[0].options.sites[0].url);
	    }
	    if (eventTypeName.is('[value="2"]') ) {
	    	$("#quick-reports iframe").attr("src", tabs[0].options.sites[1].url);
	    }
	    if (eventTypeName.is('[value="3"]') ) {
	    	$("#quick-reports iframe").attr("src", tabs[0].options.sites[2].url);
	    }


	});	

	jQuery('.tabs li a').on('click', function(e){
		var href = jQuery(this).attr('href');
		jQuery(href).show().removeClass('tab_turnoff').addClass('tab_turnon');
		jQuery(href).siblings('div').hide().removeClass('tab_turnon').addClass('tab_turnoff');
		jQuery(this).parent('li').removeClass('turnoff').addClass('turnon');
		jQuery(this).parent('li').siblings().removeClass('turnon').addClass('turnoff');
		e.preventDefault();
	});

	jQuery('#settings').on('click', function(e)  {
			$.fn.loadJsonSecondery();
			console.log('after pressing settings for second time');			
			console.log(tabs);
			e.preventDefault();
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
		$.fn.closeSettings();
		e.preventDefault();
	});

	jQuery("form").submit(function(e){
		$.fn.saveJson();
		console.log('submit');
		console.log(tabs);
		$.fn.closeSettings();
		$.fn.selectItemCheck();
		e.preventDefault();
	});

	$.fn.loadJson();

});