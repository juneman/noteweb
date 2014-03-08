/**
 * @author dubin
 */
/***
 * 
 * back to Top
 * 
 */
var goto_top_type = -1;
var goto_top_itv = 0;
var g_scrolling = 0;

function goto_top_timer() {
var y = goto_top_type == 1 ? document.documentElement.scrollTop : document.body.scrollTop;
var moveby = 25; // 15
 
y -= Math.ceil(y * moveby / 100);
if (y < 10) { //if (y < 10)
y = 0;
}
 
if (goto_top_type == 1) {
document.documentElement.scrollTop = y;
}
else {
document.body.scrollTop = y;
}
 
if (y == 0) {
clearInterval(goto_top_itv);
goto_top_itv = 0;
g_scrolling = 0;
}
}
 
function goto_top()
{
if (goto_top_itv == 0) {
if (document.documentElement && document.documentElement.scrollTop) {
goto_top_type = 1;
}
else if (document.body && document.body.scrollTop) {
goto_top_type = 2;
}
else {
goto_top_type = 0;
}
 
if (goto_top_type > 0) {
goto_top_itv = setInterval('goto_top_timer()', 50);
}
}
}

$(function() {
	$('.btn-back-toTop').click(function(){
		$('.btn-back-toTop').css('display', 'none');
		g_scrolling = 1;
		goto_top();
	});
	
	var showOrHideScrollbar = function() {
		if (g_scrolling == 1) return true;
		
		var st = $(window).scrollTop();
		var showOrHide = $('.btn-back-toTop').css('display');
		
		if  (st > 301 && showOrHide == 'none') {
	 		$('.btn-back-toTop').css({
				'opacity' : 0, 
				'display' : 'block'
			}).animate({
				'opacity' : 0.8,
			}, 300);
		}
		
		if (st < 300  && showOrHide == 'block') {
			$('.btn-back-toTop').css({
				'opacity' : 0.8,
			}).animate({
				'opacity' : 0,
			}, 300, function() {
			  	$('.btn-back-toTop').css('display', 'none');
			});
		}
	};

	$(window).bind("scroll", showOrHideScrollbar);
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

