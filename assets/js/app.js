/**
 * @author dubin
 */
$(function() {
	var showOrHideNavbar = function() {
		var st = $(window).scrollTop();
		var top = parseInt($('.navbar').css('top'));

		if (st <= 90 && top < -10) {
			$('.navbar').css({
				'top' : -60
			}).delay(10).animate({
				'top' : 0
			}, 200);
		} else if (st > 100 && top >= -5) {
			$('.navbar').css({
				'top' : 0
			}).delay(10).animate({
				'top' : -60
			}, 200);
		}
	};

	var showOrHidePostNewBlog = function() {
		var st = $(window).scrollTop();
		if (st <= 90) {
			$('.post-new-blog-navbar-btn-wrap').css('display', 'none');
			$('.post-new-blog-btn').css('display', 'block');
			
		} else if (st > 100) {
			$('.post-new-blog-navbar-btn-wrap').css('display', 'block');
			$('.post-new-blog-btn').css('display', 'none');
			
		}
	};

	$(window).bind("scroll", showOrHidePostNewBlog);
});


/**
 * 
 */
/**
 *
 * @auth: db, created at 2013.10.19
 *        www.yynote.com
 *
 */
function trim(str) { 
　　     return str.replace(/(^\s*)|(\s*$)/g, "");
}

function ltrim(str) { 
　　     return str.replace(/(^\s*)/g,"");
}

function rtrim(str) { 
　　     return str.replace(/(\s*$)/g,"");
}



/**
 * 0 : view 
 * 1 : edit 
 */

var g_editor_mode = 0; 
function showEditor(title, content) {
	$("#yy-wysiwyg-editor #editor").html(content);
	$('#title-in-edit-mode input').val(trim(title));
	
	$('#content').css('display', 'none');
	$("#yy-wysiwyg-editor").css('display', 'inline-block');

	$('#btnEdit').css('display', 'none');
	$('#btnSave').css('display', 'inline-block');

	$('#yy-edit-article-title #title-in-view-mode').css('display', 'none');
	$('#yy-edit-article-title #title-in-edit-mode').css('display', 'inline-block');
	g_editor_mode = 1;
}

function showViewer(title, content) {
	$("#yy-edit-article-title #title-in-view-mode p#title0").text(title);
	$("#content").html(content);
	
	$('#content').css('display', 'inline-block');
	$("#yy-wysiwyg-editor").css('display', 'none');

	$('#btnEdit').css('display', 'inline-block');
	$('#btnSave').css('display', 'none');

	$('#yy-edit-article-title #title-in-view-mode').css('display', 'inline-block');
	$('#yy-edit-article-title #title-in-edit-mode').css('display', 'none');
	
	g_editor_mode = 0;
}

function hideAlertInputTitleMsg() {
	var obj = $("#alert-msg");
		obj.fadeOut("500", function() {
		});
}

function showAlertInputTitleMsg(now) {
	var obj = $("#alert-msg");
	if (now) {
		obj.css('display', 'inline');
	}
	else {
		obj.fadeIn("500", function() {
		});
	}
}

function edit(str) {
	var actived = $("#list-detail-items .yy-list-items ul li.active");
	if (actived.length <= 0) {editNew(); return ;}
	
	var contents = $('#content').html();
	var title = trim($('#title-in-view-mode #title0').text());
	
	showEditor(title, contents);
}

function editNew() {
		if (g_editor_mode == 1) {
			var ret = SaveAndCloseAllEditors("");
			if (ret == 1) {
				return;
			}
		}
		
			
	$("#btnEditNew").hide();
	$("#btnEdit").show();
	$("#btnDel").show();
		
		var actived = $('#list-detail-items .yy-list-items ul').find("li.active");
		if (actived.length > 0) 
		{
			actived.removeClass("active");
		}
		
		var htmlContent = '<li class="active" data-section="1">'
						+ '<div class="title"> Unknown Title'
						+ '</div> '
						+ '<div class="description">'
						+ '<span class="date">2013-10-15</span>'
						+ '<span class="summary">Our life is important....</span>'
						+ '</div>'
						+ '</li>';
		
		$("#list-detail-items .yy-list-items ul").prepend(htmlContent);
		
		var total = $('#list-detail-items .yy-list-items ul').find("li");
		
		if (total.length > 5) {
			$("#list-detail-items .yy-list-items ul li").last().remove();
		}
	
	$('#title-in-edit-mode input').attr("placeholder", "Input new title");
	showEditor("", "");

}

function SaveAndCloseAllEditors(str) {
	var title = trim($("#title-in-edit-mode input").val());
	if (title == "") {
		showAlertInputTitleMsg(true);
		return 1;
	}
	var contents = $("#yy-wysiwyg-editor #editor").html();
 	showViewer(title, contents);
 	
	var summary = trim($("#yy-wysiwyg-editor #editor").text()).substr(0, 45) + " ...";
	
	$("#list-detail-items .yy-list-items ul li.active").find("div.title").text(title);
	$("#list-detail-items .yy-list-items ul li.active").first().find("div.description span.summary").html(summary);
	
	return 0;
}


function delNote() {
	var actived = $("#list-detail-items .yy-list-items ul li.active");
	if (actived.length <= 0) { return ;}
	
	var nextObj = actived.next();
	if (nextObj.length <= 0) {
		/* 
		 *  TODO: load next note from server
		 */
		
		nextObj = actived.prev();
		if (nextObj.length <= 0) {
			actived.remove();
			showViewer("", "");
			$("#btnEditNew").show();
			$("#btnEdit").hide();
			$("#btnDel").hide();			
			return;
		}
	}
	
	nextObj.addClass("active");
	actived.remove();
	
	var titleHtml_0 = nextObj.find(".title").text();
	var contentHtml_0 = '<div>' 
			+ '<p> Date:' + nextObj.find(".description .date").text()
			+ '</p>'
			+ 'summary:' + nextObj.find(".description .summary").text()
			+ '<ul>' 
			+ '<li>'
			+ '<span> First Test</span>'
			+ '<br>'
			+ '</li>'
			+ '<li>'
			+ '<span>dasfadsfa</span>'
			+ '<br>'
			+ '</li>'
			+ '</ul>'
			+ '</div>';
	
	showViewer(titleHtml_0, contentHtml_0);
	
	var summary = trim($("#yy-wysiwyg-editor #editor").text()).substr(0, 45) + " ...";
	nextObj.find("div.title").text(title);
	nextObj.find("div.description span.summary").html(summary);
}

$(function() {
/** 
 * not support -- 2013-11-03
 * 
 * 
	$("div.yy-side-nav-menu-item").click(function() {
		var parent = $(this).parent();
		var pparent = parent.parent();
		var sub_menu = parent.find("ul.yy-side-nav-sub-menus");

		var kz = parent.attr("class");
		var expand = sub_menu.attr("expand");

		if (kz == "active") {

			if (sub_menu.length > 0) {

				if (expand == "true") {
					sub_menu.slideUp("noraml", function() {});
					sub_menu.attr("expand", "false");
					$(this).find("span i:last").removeClass("icon-caret-down");
					$(this).find("span i:last").addClass("icon-caret-right");
				} else if (expand == "false") {
					sub_menu.slideDown("noraml", function() {});
					sub_menu.attr("expand", "true");
					$(this).find("span i:last").removeClass("icon-caret-right");
					$(this).find("span i:last").addClass("icon-caret-down");
				}
			} else {
			}
		} else {
			var actived = pparent.find("li.active");
			var icon_dom = actived.find(".yy-side-nav-menu-item span i:last");
			var actived_submenu = actived.find(".yy-side-nav-sub-menus");

			if (actived_submenu.length > 0) {
				actived_submenu.slideUp("noraml", function() {
					actived.removeClass("active");
				});
				actived_submenu.attr("expand", "false");
				icon_dom.removeClass("icon-caret-down");
				icon_dom.addClass("icon-caret-right");
			} else {
				actived.removeClass("active");
			}

			if (sub_menu.length > 0) {
				sub_menu.slideDown("noraml", function() {
					parent.toggleClass("active");
				});
				sub_menu.attr("expand", "true");
				$(this).find("span i:last").removeClass("icon-caret-right");
				$(this).find("span i:last").addClass("icon-caret-down");
			} else {
				parent.toggleClass("active");
			}
		}

	});
	
 	* 
 	* end of -- not support
	*/ 
	
	$(".yy-side-nav-sub-menus li").click(function() {
		var kz = $(this).attr("class");
		if (kz == "sub-active") {
			return;
		}
		
		var actived = $(this).parent().find("li.sub-active");
		if (actived.length > 0) 
		{
			actived.removeClass("sub-active");
		}
		
		$(this).addClass("sub-active");
	});
	
	$('#title-in-edit-mode input').click(function() {
		hideAlertInputTitleMsg();
		
	});
	$('#editor').click(function() {
		hideAlertInputTitleMsg();
	});
	
});

$(function() {
	$('#list-detail-items .yy-list-items ul#yy-list-items-wrap').delegate('li' ,"click", function() {
		var kz = $(this).attr("class");
		if (kz == "active") {
			return;
		}
		
		if (g_editor_mode == 1) {
			var ret = SaveAndCloseAllEditors("");
			if (ret == 1) {
				return;
			}
		}
		
		hideAlertInputTitleMsg();
		
		var actived = $(this).parent().find("li.active");
		if (actived.length > 0) 
		{
			actived.removeClass("active");
		}
		
		$(this).addClass("active");
		var data_section = $(this).attr("data-section");

		var headerHtml_0 = trim($(this).find(".title").text());
		var contentHtml_0 = '<div>' 
			+ 'data-section:' + data_section
			+ '<ul>' 
			+ '<li>'
			+ '<span> First Test</span>'
			+ '<br>'
			+ '</li>'
			+ '<li>'
			+ '<span>dasfadsfa</span>'
			+ '<br>'
			+ '</li>'
			+ '</ul>'
			+ '</div>';
		
			$("#yy-edit-article-title #title-in-view-mode p#title0").text(headerHtml_0);
			$("#content").html(contentHtml_0);
	});
});


$(function() {
	$('#list-detail-items #yy-new-note-btns-group #btnNew').click(editNew);
});


$(function() {
	$("ul.navigation-bar-top li").hover(function() {
		//$(this).find("a span").css("border-bottom"," 1px solid #0088cc");
		//$(this).find("a span.nav-text").css("color","#0088cc");
	}, function() {
		var kz = $(this).attr("class");
		if (kz == "currently") {
			return;
		}
		//$(this).find("a span").css("border-bottom","0px");
		//$(this).find("a span.nav-text").css("color","#777777");
	});

});

$(function() {
	$("div.content-area span").hover(function() {
		$(this).css("background-color", "#f2f2f2");
		$(this).css("border-radius", "4px");

	}, function() {
		$(this).css("background-color", "#ffffff");
	});

	$("div.content-area p span").click(function() {
		var word = $(this).text();
		word = word.toLowerCase();

		$("div#rd-tool-side-dics").css("display", "block");
		$("div#rd-tool-side-dics #rd-tool-side-dics-wd").html(word);

	});

	$("#rd-tool-side-close").click(function() {
		var obj = $("div#rd-tool-side-dics");
		obj.fadeOut("500", function() {
			obj.css("display", "none");
		});
	});
});

$(function() {
	$("#add-dict").click(function() {
		var data = {
			"word" : "two",
			"b_pr" : "[kad]",
			"a_pr" : "[ked]",
			"sm" : "n,一个\nv,大个",
			"synonym" : "word-s",
			"antonym" : "word-a",
			"usage" : "a word\n big word\nwords like",
			"tense_1" : "worded",
			"tense_2" : "",
			"tense_3" : "wording",
			"tense_4" : "",
			"tense_5" : "",
			"plural" : "word-p",
		}

		// Post
		$.post('http://192.168.56.101/dict/add/one', data, function(data, status) {
			alert("OK");
			alert(respons.code.code);
			alert(respons.code);
		});

	});
});

