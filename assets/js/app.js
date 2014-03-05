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
 
function goto_top_timer() {
var y = goto_top_type == 1 ? document.documentElement.scrollTop : document.body.scrollTop;
var moveby = 15;
 
y -= Math.ceil(y * moveby / 100);
if (y < 0) {
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

// end of back to Top 
///////////////////////////////////////////////////////////

$(function() {
	$("#post-action-cat-select li a").click(function(){
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
	var obj = event.srcElement;

	if (obj.value == "") {
		obj.parentNode.className = "reply-box";
	}
}

function onCommentActionSubmitBtnClick() {
	var obj = event.srcElement;
}