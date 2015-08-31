jQuery(document).ready(function() {

	var tabs = '';
	var first = 1;
	var retrievedObject = '';

	$.fn.bringDivName = function(this_item){
		var temp = jQuery(this_item).parents();
		for (var i = 0; i < temp.length; i++) {
			if (temp[i].id == 'quick-reports'){
				return 'quick-reports';	
			}
			if (temp[i].id == 'my-team-folders'){
				return 'my-team-folders';	
			}
		};
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
						$("nav #action-list"+(i+1)+" li:"+array[j]+" a").attr("href",quickActions[i].actions[j].url);
						$("nav #action-list"+(i+1)+" li:"+array[j]+" a").html(quickActions[i].actions[j].label);
					};
				};
			});
	}

	$.fn.loadDataLocally = function(){
		console.log('load local data from function');
		retrievedObject = localStorage.getItem('sites');
		tabs[0] = JSON.parse(retrievedObject);
		for (var i = 0; i < tabs[0].options.sites.length ; i++) {
			$('input[name="site'+(i+1)+'name"]').val(tabs[0].options.sites[i].name);
			$('input[name="site'+(i+1)+'url"]').val(tabs[0].options.sites[i].url);
		};
	}

	$.fn.fixHttp = function(tabsNew){
		console.log('fix http');
		for (var i = 0; i < tabsNew.options.sites.length; i++) {
			if (tabsNew.options.sites[i].url && tabsNew.options.sites[i].url.length==7 && tabsNew.options.sites[i].url.match("^http://")) {
				console.log('delete http');
				tabsNew.options.sites[i].url='';
			}
		};
		return tabsNew;
	}

	$.fn.saveDataLocally = function(){ 
		console.log('saving data locally');
		var tabsNew = {
			"options": {
				"rowLabel": "Report",
				"sites": [
				{"name":$('input[name="site1name"]').val(), "url":$.fn.addhttp($('input[name="site1url"]').val())},
				{"name":$('input[name="site2name"]').val(), "url":$.fn.addhttp($('input[name="site2url"]').val())},
				{"name":$('input[name="site3name"]').val(), "url":$.fn.addhttp($('input[name="site3url"]').val())},
				{"name":$('input[name="site4name"]').val(), "url":$.fn.addhttp($('input[name="site4url"]').val())},
				{"name":$('input[name="site5name"]').val(), "url":$.fn.addhttp($('input[name="site5url"]').val())},
				{"name":$('input[name="site6name"]').val(), "url":$.fn.addhttp($('input[name="site6url"]').val())}
				]
			}
		};
		tabs[0]=tabsNew;
		tabs[0]=$.fn.fixHttp(tabs[0]);
		localStorage.setItem('sites', JSON.stringify(tabs[0]));
	}

	$.fn.closeSettings = function(div_name){
		console.log('close settings');
		jQuery('#' +div_name+ ' >div:first-child').removeClass('sites-div-turnon').addClass('sites-div-turnoff');
	}

	$.fn.showFirstIframe = function(div_name) {
		if (div_name == 'quick-reports') {
			j=1;
		} else {
			j=4;
		}
		for (var i = j; i < (j+3); i++) {
			if ($('input[name="site'+(i)+'name"]').val()){
				$("#"+div_name+" iframe").attr("src", tabs[0].options.sites[i-1].url);
				return;
			} 
		};
	}

	$.fn.selectItemVisibility = function(div_name) {
		var j;
		if (div_name == 'quick-reports') {
			j=1;
		} else {
			j=4;
		}
		if ($('input[name="site'+j+'name"]').val() || $('input[name="site'+(j+1)+'name"]').val() || $('input[name="site'+(j+2)+'name"]').val()){
			$('#'+div_name+' select').css("visibility", "visible");
			$('#'+div_name+' select').empty();

			for (var i = j; i < (3+j); i++) {
				if ($('input[name="site'+i+'name"]').val()) {
					$('#'+div_name+' select').append('<option value="'+i+'">'+tabs[0].options.sites[i-1].name+'</option>');
				};
			};
		} else {
			$('#'+div_name+' select').css("visibility", "hidden");			
		}
	}

	$.fn.addhttp = function(url) {
		if (url.match("^http")) {
			return url;
		} else {
			var new_url = 'http://'+url;
			return new_url;
		}
	}

	$.fn.isUrlValid = function(url) {
		console.log(url);
		if (/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(url)){
			console.log("valid");
			return 1;
		} else {
			console.log("not valid");
			return 0;			
		}
	}

	$.fn.checkUrl = function(div_name) {
		var j;
		if (div_name == 'quick-reports') {
			j=1;
		} else {
			j=4;
		}
		var valid=1;
		for (var i = j; i < (j+3); i++) {
			if ($('input[name="site'+i+'url"]').val() && $('input[name="site'+i+'name"]').val()) {
				$('#'+div_name+' #site'+i+'name').css("background-color", "white");
				if ($.fn.isUrlValid($.fn.addhttp($('input[name="site'+i+'url"]').val()))){
					$('#'+div_name+' #site'+i+'url').css("background-color", "white");
				} else {
					$('#'+div_name+' #site'+i+'url').css("background-color", "red");
					valid=0;
				}
			} else if (!$('input[name="site'+i+'url"]').val() && $('input[name="site'+i+'name"]').val()) {
				console.log('2');
				$('#'+div_name+' #site'+i+'url').css("background-color", "red");
				$('#'+div_name+' #site'+i+'name').css("background-color", "white");
				valid=0;
			} else if (!$('input[name="site'+i+'name"]').val() && $('input[name="site'+i+'url"]').val()) {
				console.log('3');
				$('#'+div_name+' #site'+i+'name').css("background-color", "red");
				if ($.fn.isUrlValid($.fn.addhttp($('input[name="site'+i+'url"]').val()))){
					$('#'+div_name+' #site'+i+'url').css("background-color", "white");
				} else {
					$('#'+div_name+' #site'+i+'url').css("background-color", "red");
				}
				valid=0;
			}

		};
		return valid;
	}

	$.fn.changeTabs = function(div_name) {
		console.log('change tab YAZOM');
		var classAttr = $('#'+div_name).attr('class');
		if (classAttr=='tab_turnon'){
			return;	
		}
		jQuery('#'+div_name).show().removeClass('tab_turnoff').addClass('tab_turnon');
		jQuery('#'+div_name).siblings('div').hide().removeClass('tab_turnon').addClass('tab_turnoff');
		jQuery('#li-'+div_name).removeClass('turnoff').addClass('turnon');
		jQuery('#li-'+div_name).siblings().removeClass('turnon').addClass('turnoff');
		$.fn.windowhash();
	}

	$.fn.removeAttrSelected = function(div_name) {
		if (div_name == 'quick-reports') {
			j=1;
		} else {
			j=4;
		}
		for (var i = j; i < (j+3); i++) {
			$('option[value="'+i+'"]').removeAttr("selected");		
		};
	}

	$.fn.callLoadFunc = function() {
		retrievedObject = localStorage.getItem('sites');
		if (retrievedObject) {
			console.log('local data exist, loading it...');
			retrievedObject = localStorage.getItem('sites');
			console.log(JSON.parse(retrievedObject));
			$.fn.loadDataLocally();
		}
	}

	$.fn.windowhash = function() {
		var array = ['quick-reports' , 'my-folders' , 'my-team-folders', 'public-folders'];
		var div_name = '';
		for (var i = 0; i < array.length; i++) {
			div_name = array[i];
			var classAttr = $('#'+div_name).attr('class');
			if (classAttr=='tab_turnon'){
				window.location.hash = div_name;
				window.scrollTo(0, 0);
				event.preventDefault();
				  setTimeout(function() {
				    window.scrollTo(0, 0);
				  }, 0);
				return;	
			}
		};
	}
	
	$('select').change(function() {
		console.log('change \"select\"');
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
		console.log('change tab');
		var href = jQuery(this).attr('href');
		jQuery(href).show().removeClass('tab_turnoff').addClass('tab_turnon');
		jQuery(href).siblings('div').hide().removeClass('tab_turnon').addClass('tab_turnoff');
		jQuery(this).parent('li').removeClass('turnoff').addClass('turnon');
		jQuery(this).parent('li').siblings().removeClass('turnon').addClass('turnoff');
		$.fn.windowhash();
		e.preventDefault();
	});

	jQuery('.settings').on('click', function(e)  {
		console.log('pressing settings');			
		var div_name = $.fn.bringDivName(this);
		var class_name = jQuery('#'+div_name+' >div:first-child').attr('class');
		if (class_name=='sites-div-turnoff') {
			$.fn.loadDataLocally(div_name);
			jQuery('#'+div_name+' >div:first-child').removeClass('sites-div-turnoff').addClass('sites-div-turnon');
			e.preventDefault();
		} else {
			jQuery('#'+div_name+' >div:first-child').removeClass('sites-div-turnon').addClass('sites-div-turnoff');
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
		jQuery('#'+div_name+' >div:first-child').removeClass('sites-div-turnon').addClass('sites-div-turnoff');
		$.fn.closeSettings(div_name);
		e.preventDefault();
	});

	jQuery(".form").submit(function(e){
		$.fn.windowhash();
		console.log("submit not for search bar");
		var div_name = $.fn.bringDivName(this);
		if (div_name=='quick-reports' || div_name=='my-team-folders') {
			if ($.fn.checkUrl(div_name)){
				$.fn.saveDataLocally();
				$.fn.closeSettings(div_name);
				$.fn.selectItemVisibility(div_name);
				$.fn.showFirstIframe(div_name);
			} else {
				console.log("submit fail - url is not valid");
			}
		};
		e.preventDefault();
	});

	jQuery(".search-box").submit(function(e){
		$.fn.windowhash();
		var found=0;
		var array=["quick-reports","my-team-folders"];
		for (var i = 0; i < tabs[0].options.sites.length; i++) {
			if ((tabs[0].options.sites[i].name) && (tabs[0].options.sites[i].name.toLowerCase() == $('input[name="q"]').val().toLowerCase())) {
				found=1;
				$( ".notifications" ).html( "<p>" + "</p>" );
				var div_name = (i < 3) ? array[0] : array[1];
				$.fn.removeAttrSelected(div_name);
				$.fn.changeTabs(div_name);			
				$.fn.closeSettings(div_name);
				$.fn.selectItemVisibility(div_name);
				$('#' + div_name +' option[value="'+(i+1)+'"]').attr("selected","selected");		
				$('#' + div_name +' select').change();
				e.preventDefault();
				return;
			}
		};//end for

		if (!found) {
			$( ".notifications" ).html( "<p>" + "The searched report " + $('input[name="q"]').val().toLowerCase() + " was not found. </p>" );			
		}
		e.preventDefault();
	});

	$.getJSON("data/config.json", function(data){
		$.fn.windowhash();
		window.scrollTo(0, 0);
		console.log('load data from json');
		tabs = data.tabsList;
		for (var i = 0; i < tabs[0].options.sites.length; i++) {
			$('input[name="site'+(i+1)+'name"]').val(tabs[0].options.sites[i].name);
			$('input[name="site'+(i+1)+'url"]').val(tabs[0].options.sites[i].url);
		};			
		
		$("#quick-reports .iframe-div").append('<iframe src=""></iframe>');
		$("#my-team-folders .iframe-div").append('<iframe src=""></iframe>');
		$("#my-folders").append('<iframe src=""></iframe>');
		$("#public-folders").append('<iframe src=""></iframe>');
		$("#my-folders iframe").attr("src", tabs[1].options.url);
		$("#public-folders iframe").attr("src", tabs[3].options.url);
		console.log('end')

		$.fn.callLoadFunc()
		$.fn.loadnotification();
		$.fn.loadquickActions();
	});
});