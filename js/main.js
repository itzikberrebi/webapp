jQuery(document).ready(function() {

	var tabs = '';
	var first = 1;

	$.fn.bringDivName = function(this_item){
		var temp = jQuery(this_item).parents();
		console.log(temp);
		for (var i = 0; i < temp.length; i++) {
			if (temp[i].id == 'quick-reports'){
				return 'quick-reports';	
			}
			if (temp[i].id == 'my-team-folders'){
				return 'my-team-folders';	
			}
		};
	}

	$.fn.loadJson = function(){ 
		$.getJSON("data/config.json", function(data){
			tabs = data.tabsList;
			for (var i = 0; i < tabs[0].options.sites.length; i++) {
				$('input[name="site'+(i+1)+'name"]').val(tabs[0].options.sites[i].name);
				$('input[name="site'+(i+1)+'url"]').val(tabs[0].options.sites[i].url);
			};			
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
			var array=["first-child","nth-child(2)","last-child"];
			var array=["first-child","nth-child(2)","nth-child(3)","last-child"];
			var quickActions=data.quickActions;
			var jloop;
			for (var i = 0; i < 3; i++) {
				if (i==1) {jloop=4} else {jloop=3}
					for (var j = 0; j < jloop; j++) {
						$("nav #action-list"+i+" li:"+array[j]+" a").attr("href",quickActions[i].actions[j].url);
						$("nav #action-list"+i+" li:"+array[j]+" a").html(quickActions[i].actions[j].label);
					};
				};
			});
	}

	$.fn.loadJsonSecondery = function(){
		for (var i = 0; i < tabs[0].options.sites.length ; i++) {
			console.log('array length is: ' + tabs[0].options.sites.length);
			$('input[name="site'+(i+1)+'name"]').val(tabs[0].options.sites[i].name);
			$('input[name="site'+(i+1)+'url"]').val(tabs[0].options.sites[i].url);
		};
	}

	$.fn.saveJson = function(){ 
		console.log('saving');
		var tabsNew = {
			"options": {
				"rowLabel": "Report",
				"sites": [
				{"name":$('input[name="site1name"]').val(), "url": $('input[name="site1url"]').val()},
				{"name":$('input[name="site2name"]').val(), "url":$('input[name="site2url"]').val()},
				{"name":$('input[name="site3name"]').val(), "url":$('input[name="site3url"]').val()},
				{"name":$('input[name="site4name"]').val(), "url":$('input[name="site4url"]').val()},
				{"name":$('input[name="site5name"]').val(), "url":$('input[name="site5url"]').val()},
				{"name":$('input[name="site6name"]').val(), "url":$('input[name="site6url"]').val()}
				]
			}
		};
		tabs[0]=tabsNew;
	}

	$.fn.closeSettings = function(div_name){
		jQuery('#' +div_name+ ' #sites-div').removeClass('sites-div-turnon').addClass('sites-div-turnoff');
	}

	$.fn.showFirstIframe = function(div_name) {

		for (var i = 0; i < tabs[0].options.sites.length; i++) {
			if ($('input[name="site'+(i+1)+'name"]').val()){
				$("#"+div_name+" iframe").attr("src", tabs[0].options.sites[i].url);
			} 
		};
	}

	$.fn.selectItemCheck = function(div_name) {
		var j;
		if (div_name == 'quick-reports') {
			j=0;
		} else {
			j=3;
		}
		if ($('input[name="site'+j+'name"]').val() || $('input[name="site'+(j+1)+'name"]').val() || $('input[name="site'+(j+2)+'name"]').val()){
			$('select').css("visibility", "visible");
			$('select').empty();

			for (var i = (1+j); i < (4+j); i++) {
				if ($('input[name="site'+i+'name"]').val()) {
					$('#'+div_name+' select').append('<option value="'+i+'">'+$('input[name="site'+i+'name"]').val()+'</option>');
				};
			};
		} else {
			$('select').css("visibility", "hidden");			
		}
	}

	$.fn.addhttp = function() {
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

	$.fn.checkUrl = function(div_name) {
		var valid=1;
		for (var i = i; i < 7; i++) {
			if ($('input[name="site'+i+'url"]').val() && $('input[name="site'+i+'name"]').val()) {
				if ($.fn.isUrlValid($('input[name="site'+i+'url"]').val())){
					$('#'+div_name+'#form-ul li:first-child input').css("background-color", "white");
				} else {
					$('#'+div_name+'#form-ul li:first-child input').css("background-color", "red");
					valid=0;
				}
			} else if ($('input[name="site'+i+'url"]').val() || $('input[name="site'+i+'name"]').val()) {
				$('#'+div_name+'#form-ul li:first-child input').css("background-color", "red");
				valid=0;
			}
		};
		return valid;
	}

	$('select').change(function() {
		var div_name = $.fn.bringDivName(this);
		var eventTypeName = $("#"+div_name+" option:selected");
		if (div_name == 'quick-reports') {
			j=1;
		} else {
			j=4;
		}
		for (var i = j; i < (j+3); i++) {
			if (eventTypeName.is('[value="'+i+'"]') ) {
				$("#"+div_name+" iframe").attr("src", tabs[0].options.sites[(i-1)].url);
			}
		};
	});	

	jQuery('.tabs li a').on('click', function(e){
		var href = jQuery(this).attr('href');
		jQuery(href).show().removeClass('tab_turnoff').addClass('tab_turnon');
		jQuery(href).siblings('div').hide().removeClass('tab_turnon').addClass('tab_turnoff');
		jQuery(this).parent('li').removeClass('turnoff').addClass('turnon');
		jQuery(this).parent('li').siblings().removeClass('turnon').addClass('turnoff');
		e.preventDefault();
	});

	jQuery('.settings').on('click', function(e)  {
		var div_name = $.fn.bringDivName(this);
		$.fn.loadJsonSecondery(div_name);
		console.log('after pressing settings for second time');			
		e.preventDefault();
		var class_name = jQuery('#'+div_name+' #sites-div').attr('class');
		if (class_name=='sites-div-turnoff') {
			jQuery('#'+div_name+' #sites-div').removeClass('sites-div-turnoff').addClass('sites-div-turnon');
			e.preventDefault();
		} else {
			jQuery('#'+div_name+' #sites-div').removeClass('sites-div-turnon').addClass('sites-div-turnoff');
			e.preventDefault();
		};
	});

	jQuery('.expand').on('click', function(e)  {
		var div_name = $.fn.bringDivName(this);
		var class_name = jQuery('#'+div_name+' iframe').attr('src');
		if (class_name!=null) {
			var win = window.open(class_name);
			win.focus();
			e.preventDefault();
		}
	});

	jQuery('.cancel').on('click', function(e)  {
		var div_name = $.fn.bringDivName(this);
		jQuery('#'+div_name+' #sites-div').removeClass('sites-div-turnon').addClass('sites-div-turnoff');
		$.fn.closeSettings(div_name);
		e.preventDefault();
	});

	jQuery("form").submit(function(e){
		var div_name = $.fn.bringDivName(this);
		$.fn.addhttp();
		if ($.fn.checkUrl()){
			$.fn.saveJson();
			console.log('submit');
			console.log(tabs);
			$.fn.closeSettings(div_name);
			$.fn.selectItemCheck(div_name);
			$.fn.showFirstIframe(div_name);
		} else {
			console.log("submit fail");
		}
		e.preventDefault();
	});

	$.fn.removeAttrSelected = function() {
		for (var i = 1; i < 7; i++) {
			$('option[value="'+i+'"]').removeAttr("selected");		
		};
	}

	jQuery(".search-box").submit(function(e){
		var div_name = $.fn.bringDivName(this);
		console.log('search submit');
		var found=0;
		for (var i = 0; i < tabs[0].options.sites.length; i++) {
			if (tabs[0].options.sites[i].name.toLowerCase() == $('input[name="q"]').val().toLowerCase()) {
				found=1;
				$.fn.closeSettings(div_name);
				$.fn.removeAttrSelected(div_name);
				$( ".notifications" ).html( "<p>" + "</p>" );
				
				if (i<3) {			
					$('#quick-reports option[value="'+i+'"]').attr("selected","selected");		
					$('#quick-reports select').change();
				} else {
					$('#my-team-folders option[value="'+i+'"]').attr("selected","selected");		
					$('#my-team-folders select').change();
				}
			}
		};
		if (!found) {
			$( ".notifications" ).html( "<p>" + "   cant find " + $('input[name="q"]').val().toLowerCase() + "</p>" );			
		}
		e.preventDefault();
	});

	$.fn.loadJson();
	$.fn.loadnotification();
	$.fn.loadquickActions();

});