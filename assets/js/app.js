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
function saveAndCloseAllEditors() {
	var title = trim($("#title-in-edit-mode input").val());
	if (title == "") {
		return 1;
	}
	var contents = $("#yy-wysiwyg-editor #editor").html();
 	if (trim(contents) == "") {
 		return 1;
 	}
 	
	alert(contents);
	return 0;
}

function clearAllEditor() {
	$("#title-in-edit-mode input").val("");
	$("#yy-wysiwyg-editor #editor").html("");
}
