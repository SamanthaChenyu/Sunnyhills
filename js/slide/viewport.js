var d = window.document;
var spPWidth = 640;
var spLWidth = 640;
var tabPWidth = 1024;
var tabLWidth = 1024;
var respUsePWidth;
var respUseLWidth;
var respFlg = false;
var scalable = window.userScalable ? 'yes' : 'no';

if(navigator.userAgent.indexOf('iPhone') != -1 || navigator.userAgent.indexOf('iPod') != -1 || (navigator.userAgent.indexOf('Android') != -1 && navigator.userAgent.indexOf('Mobile') != -1)) {
	respFlg = false;
	respUsePWidth = spPWidth;
	respUseLWidth = spLWidth;
} else if( navigator.userAgent.indexOf('iPad') != -1) {
	respFlg = false;
	respUsePWidth = tabPWidth;
	respUseLWidth = tabLWidth;
}

function changeViewPort() {
    if($(window).height() > $(window).width()){
        $("meta[name=viewport]").attr('content', 'width=' + respUsePWidth + ', user-scalable='+scalable);
    } else {
        $("meta[name=viewport]").attr('content', 'width=' + respUseLWidth + ', user-scalable='+scalable);
    }
}

if(respFlg) {

	$(function(){
		$(window).bind('resize load',function(){
            changeViewPort();
		});
	});
	changeViewPort();
}
