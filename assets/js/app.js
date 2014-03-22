/**
 * @author dubin
 */
/***
 * 
 * back to Top
 * 
 */
$(function() {
	// GO TO TOP SETTING
	var offset = 220;
	var duration = 500;
	jQuery(window).scroll(function() {
		if (jQuery(this).scrollTop() > offset) {
			jQuery('.btn-back-toTop').fadeIn(duration);
		} else {
			jQuery('.btn-back-toTop').fadeOut(duration);
		}
	});
		
	jQuery('.btn-back-toTop').click(function(event) {
		event.preventDefault();
		jQuery('html, body').animate({scrollTop: 0}, duration);
		return false;
	})
});
// end of back to Top 
///////////////////////////////////////////////////////////

$(function() {
	$(".post-action-cat-select li a").click(function(){
  		var selText = $(this).text();
  		$(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
	});
});
 
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
 	
	alert($('.btn-select').text()+", "+$('.btn-select2').text());

	return 0;
}

function clearAllEditor() {
	$("#title-in-edit-mode input").val("");
	$("#yy-wysiwyg-editor #editor").html("");
	
	alert($('.btn-select').text()+", "+$('.btn-select2').text());
}


/**
 * For comment input box
 */
function onCommentTextAreaFoucsIn() {
	var obj = event.srcElement;
	obj.parentNode.className = "reply-box-expand";
}

function onCommentTextAreaFoucsOut() {
}

function onCommentActionSubmitBtnClick() {
	var obj = event.srcElement;
}

