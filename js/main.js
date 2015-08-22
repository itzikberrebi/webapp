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

	$.fn.loadnotification = function(){ 
		$.getJSON("data/config.json", function(data){
			console.log('notification');
			$( ".notifications" ).html( "<p>" + data.notification + "</p>" );
		});
	}

	$.fn.loadquickActions = function(){ 
		$.getJSON("data/config.json", function(data){
			var quickActions=data.quickActions;
			console.log(quickActions[1].actions[2].label);
			$("nav #action-list1 li:first-child a" ).attr("href",quickActions[0].actions[0].url);
			$("nav #action-list1 li:first-child a" ).html(quickActions[0].actions[0].label);
			$("nav #action-list1 li:nth-child(2) a" ).attr("href",quickActions[0].actions[1].url);
			$("nav #action-list1 li:nth-child(2) a" ).html(quickActions[0].actions[1].label);
			$("nav #action-list1 li:last-child a" ).attr("href",quickActions[0].actions[2].url);
			$("nav #action-list1 li:last-child a" ).html(quickActions[0].actions[2].label);

			$("nav #action-list2 li:first-child a" ).attr("href",quickActions[1].actions[0].url);
			$("nav #action-list2 li:nth-child(2) a" ).attr("href",quickActions[1].actions[1].url);
			$("nav #action-list2 li:last-child a" ).attr("href",quickActions[1].actions[2].url);
			$("nav #action-list2 li:last-child a" ).attr("href",quickActions[1].actions[3].url);
			$("nav #action-list2 li:first-child a" ).html(quickActions[1].actions[0].label);
			$("nav #action-list2 li:nth-child(2) a" ).html(quickActions[1].actions[1].label);
			$("nav #action-list2 li:last-child a" ).html(quickActions[1].actions[2].label);
			$("nav #action-list2 li:last-child a" ).html(quickActions[1].actions[3].label);

			$("nav #action-list3 li:first-child a").attr("href",quickActions[2].actions[0].url);
			$("nav #action-list3 li:nth-child(2) a").attr("href",quickActions[2].actions[1].url);
			$("nav #action-list3 li:last-child a").attr("href",quickActions[2].actions[2].url);
			$("nav #action-list3 li:first-child a").html(quickActions[2].actions[0].label);
			$("nav #action-list3 li:nth-child(2) a").html(quickActions[2].actions[1].label);
			$("nav #action-list3 li:last-child a").html(quickActions[2].actions[2].label);

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

	$.fn.addhttp = function() {
		// $('input[name="site3url"]').val();
		// $('input[name="site3url"]').val();
		// $('input[name="site3url"]').val();
	}

	$.fn.isUrlValid = function(url) {
		if (/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(url)){
			console.log("valid");
			return 1;
		} else {
			console.log("not valid");
			return 0;			
		}
	}

	$.fn.checkUrl = function() {
		var valid=1;

		if ($('input[name="site1url"]').val() && $('input[name="site1name"]').val()) {
			if ($.fn.isUrlValid($('input[name="site1url"]').val())){
				$('#form-ul li:first-child input').css("background-color", "white");
			} else {
				$('#form-ul li:first-child input').css("background-color", "red");
				valid=0;
			}
		} else if ($('input[name="site1url"]').val() || $('input[name="site1name"]').val()) {
				$('#form-ul li:first-child input').css("background-color", "red");
				valid=0;
		}
		
		if ($('input[name="site2url"]').val() && $('input[name="site2name"]').val()) {
			if ($.fn.isUrlValid($('input[name="site2url"]').val())){
				$('#form-ul li:nth-child(2) input').css("background-color", "white");
			} else {
				$('#form-ul li:nth-child(2) input').css("background-color", "red");
				valid=0;			
			}
		} else if ($('input[name="site2url"]').val() || $('input[name="site2name"]').val()) {
				$('#form-ul li:nth-child(2) input').css("background-color", "red");
						valid=0;
		}
		
		if ($('input[name="site3url"]').val() && $('input[name="site3name"]').val()) {
			if ($.fn.isUrlValid($('input[name="site3url"]').val())){
				$('#form-ul li:last-child input').css("background-color", "white");
			} else {
				$('#form-ul li:last-child input').css("background-color", "red");
				valid=0;
			} 
		}
		else if ($('input[name="site3url"]').val() || $('input[name="site3name"]').val()) {
				$('#form-ul li:last-child input').css("background-color", "red");
								valid=0;
			}
		return valid;
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

	jQuery("#quick-reports form").submit(function(e){
		$.fn.addhttp();
		if ($.fn.checkUrl()){
			$.fn.saveJson();
			console.log('submit');
			console.log(tabs);
			$.fn.closeSettings();
			$.fn.selectItemCheck();
			$.fn.showFirstIframe();
		} else {
			console.log("submit fail");
		}
		e.preventDefault();
	});

	jQuery(".search-box").submit(function(e){
		console.log('search submit');
		console.log(('input[name="q"]').val());
		var found=0;
		if (tabs[0].options.sites[0].name.toLowerCase() == ('input[name="q"]').val().toLowerCase()) {
			found=1;
			$.fn.closeSettings();
		}
		if (!found) {
			$( ".notifications" ).html( "<p>" + "cant find " + ('input[name="q"]').val().toLowerCase() + "</p>" );			
		}
		e.preventDefault();
	});

	$.fn.loadJson();
	$.fn.loadnotification();
	$.fn.loadquickActions();

});