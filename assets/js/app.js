/**
 * @author dubin
 */

/*
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
*/

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


function adjustEditorToolbar() {
	var o = document.getElementById("editor");
	var w = o.offsetWidth;  //宽度
	
	$('#yy-note-title-input').css('width', w + 'px');
	$('#wysiwyg-toolbar').css('width', w + 'px');
}

$(function() {
	
	$('#title-in-edit-mode input').click(function() {
		hideAlertInputTitleMsg();
		
	});
	$('#editor').click(function() {
		hideAlertInputTitleMsg();
	});
	
	
});
