
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




var util ={

	isLocalStorage: function() {
		if ('localStorage' in window && window.localStorage !== null){
			return true;
		}
	}
};
	// Highlighting code with Google prettify 
	var prettify = function(){	
		$('#wmd-preview pre').addClass('prettyprint');
		prettyPrint();
	};


$(window).load(function() {

    // preparing clipboard
 /*   ZeroClipboard.setMoviePath('swf/ZeroClipboard10.swf');

    var copyMd = new ZeroClipboard.Client(),
		copyHtml = new ZeroClipboard.Client();

    copyMd.addEventListener('mouseOver', function (client) {
		copyMd.setText('<p><markdown>\n'+ '#' + $('#title').val() + '#\n' + $('#wmd-input').val() +'\n</markdown></p>');
	});
	copyHtml.addEventListener('mouseOver', function (client) {
		copyHtml.setText($('#wmd-output').text());
	});

	copyMd.addEventListener('complete', function (client, text) {
		alert("Markdown copied to clipboard");
    });
	copyHtml.addEventListener('complete', function (client, text) {
		alert("HTML copied to clipboard");
    });

    copyMd.glue( 'copy_md_btn', 'copy_md' );
    copyHtml.glue( 'copy_html_btn', 'copy_html' );

	*/

	// Resizable textarea
    $('textarea.resizable:not(.processed)').TextAreaResizer();

		var reflush = function(){
			prettify();
			if(util.isLocalStorage()){
				localStorage.text  = $('#wmd-input').val();
				localStorage.title = $('#title').val();
				localStorage.url   = $('#url').val();
			}
	  };
	

	$('#wmd-input').keyup(reflush);
	$('#wmd-input').keydown(reflush);
	$('#wmd-input').mousedown(reflush);
	$('#wmd-input').mouseup(reflush);
	$('#wmd-input').mouseover(reflush);
	$('#wmd-input').mouseenter(reflush);
	
	// storing text locally
	if(util.isLocalStorage()){
		if(localStorage.text){		
			$('#wmd-input').val(localStorage.text);
			prettify();
		}
		if (localStorage.title) {
			$('#title').val(localStorage.title);
		}
		if (localStorage.url) {
			$('#url').val(localStorage.url);
		}

	}
	
	// remove data locally when textarea is cleared, so the text reverts to defaults
	$('#clear').click(function(){
        $('#wmd-input').val('');
        $('#wmd-preview').html('');
        $('#wmd-output').html('');
        $('#title').val('');
        $('#url').val('');
		if(util.isLocalStorage()){
			localStorage.removeItem('text');
			localStorage.removeItem('title');
			localStorage.removeItem('url');
		}
    });
	
	// added by yynote.com
	var obj = document.getElementById('category');
	obj.onchange = selectLangChanged;

	prettify();

});

function selectLangChanged() {
	var subcat_wrapper = document.getElementById('subcat-wrapper');
	var cat_wrapper = document.getElementById('category');
	var index = cat_wrapper.selectedIndex;
	//序号，取当前选中选项的序号
	var val = cat_wrapper.options[index].value;

	if (val != 'tech') {
		subcat_wrapper.style.display = "none";
	} else {
		subcat_wrapper.style.display = "inline";
	}
}

$(function(){
	$('button#submit').click(function(){
			prettify();

			title = trim($('#title').val());
			url = trim($('#url').val());
			mdcontents = trim($('#wmd-input').val());
			contents = trim($('#wmd-preview').html());
			
			if (title == '' || url == '') {
				alert('Please enter title or url ...');
				return;
			}

			if (mdcontents == '') {
				alert('please enter contents ...');
				return;
			}

			if (contents == '') {
				alert('process error: get html from markdown failed.');
				return;
			}

			cat_selector = document.getElementById('category');
			index = cat_selector.selectedIndex;
			
			cat_url = cat_selector.options[index].value;
			cat_label = cat_selector.options[index].text;

			subcat_url = "";
			subcat_label = "";
			subcat_selector = document.getElementById('sub-category');
			if (cat_url == 'tech') {
				subindex     = subcat_selector.selectedIndex;
				subcat_url   = subcat_selector.options[subindex].value;
				subcat_label = subcat_selector.options[subindex].text;
			}

			data = {
					'title' : '',
					'url' : '',
					'cat_url' :'',
					'cat_label' : '',
					'subcat_url' : '',
					'subcat_label' : '',
					'mdcontents' : '',
					'contents' : '',
					'session':'',
			}

			data.title = title;
			data.url = url;
			data.cat_url = cat_url;
			data.cat_label = cat_label;
			data.subcat_url = subcat_url;
			data.subcat_label = subcat_label;
			data.mdcontents = mdcontents;
			data.contents = contents;
			data.session = 'yynote.com';
		
			$.post('/blog/addpost', data, function(data){
							alert(data);
					});
			/*
					.success(function() { alert("second success"); })
					.error(function() { alert("error"); })
					.complete(function() { alert("complete"); });
*/
		});		
});



