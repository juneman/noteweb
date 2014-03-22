/**
 * @author dubin
 */
/**
 * String Util 
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
	var showNavSearchBar = function() {
		$('.aside-navbar .aside-nav-search').removeClass('inactive');
  		 $('.aside-navbar .aside-nav-search').addClass('active');
  		 $('.aside-navbar .aside-nav-search.active input').focus();
  		 $('.aside-navbar .aside-nav-search.active input').animate(
  		 	{width: 150}, 200
  		 );
	};
	
	var hideNavSearchBar = function() {
		var val = trim($('.aside-navbar .aside-nav-search.active input').val());
		if (val != "") return;
		
		$('.aside-navbar .aside-nav-search.active input').animate(
  		 	{width: 0}, 200, function() {
  		 		 $('.aside-navbar .aside-nav-search').removeClass('active');
  		 		$('.aside-navbar .aside-nav-search').addClass('inactive');
  		 	}
  		 );
	};
	
	$(".aside-navbar .aside-nav-search").hover(function(){
		 showNavSearchBar();
	});
	
	$(".aside-navbar .aside-nav-search-wrapper").focusout(function(){
  		 hideNavSearchBar();
	}).mouseleave(function(){
		 hideNavSearchBar();
	});
	
	$('.aside-navbar .aside-nav-search span.clear-icon').click(function(){
		 $('.aside-navbar .aside-nav-search.active input').val("");
	});
	
	/// bind 
	$('.aside-navbar .aside-nav-search input').keydown(function(event) {  
         if(event.keyCode==13){  
             alert("nihoa");  
        }  
     });  

	
});
 
////////////////////////////////////////
$(function() {
	var delFixedNav = function(){
		var bottomWrapperTop = $('.bottom-wrapper').offset().top;
		var scrollTop = $(window).scrollTop() ;
		var viewscrollTop =  scrollTop + $(window).height();
		var navTop = $('#aside-wrapper1').css('top');
		// alert(navTop);
		if (bottomWrapperTop < viewscrollTop && navTop == '0px') {
				$('#aside-wrapper1').removeClass('fixed');
				$('#aside-wrapper1').addClass('absoluted');
				$('#aside-wrapper1').css('top',  scrollTop  + 'px');
		} else if (bottomWrapperTop > viewscrollTop && navTop != '0px') {
				$('#aside-wrapper1').removeClass('absoluted');
				$('#aside-wrapper1').addClass('fixed');
				$('#aside-wrapper1').css('top', '0');
			}
	};
	  
	delFixedNav();
	   
	$(window).scroll(function() {
		delFixedNav();
	});
});

//////////////////////////////////

$(function() {
	$(".post-action-cat-select li a").click(function(){
  		var selText = $(this).text();
  		$(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
	});
});
 
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

