
function WeixinTop()
{
	this.init();
}
WeixinTop.prototype = {
	constructor: WeixinTop,
	init: function(){		
		this._initBackTop();
	},	
	_initBackTop: function(){
		var $backTop = this.$backTop = $('<div class="cbbfixed">'+
						'<a class="weixin cbbtn" title="扫码下载手机客户端" href="'+weixinIp+'/web/app.action" id="iphoneDown" target="_blank">'+
							'<span class="weixin-icon"></span><div><li id="qrcodeAndroid"></li><span>手机客户端</span></div>'+
						'</a>'+
						'<a class="weixin cbbtn" title="点击进入软件下载" href="'+weixinIp+'/web/app.action" id="clientDown" target="_blank">'+
							'<span class="client-icon"></span><div id="clientDown" style="top:0;"><img src="'+qrcodeIp+'/images/client.png" /><span>防控软件下载</span></div>'+
						'</a>'+
						'<a class="gotop cbbtn" title="返回顶部">'+
							'<span class="up-icon"></span>'+
						'</a>'+
					'</div>');
		$('body').append($backTop);
		
		$('.gotop').click(function(){
			$("html, body").animate({
				scrollTop: 0
			}, 800);
		});
		var timmer = null;
		$(window).bind("scroll",function() {
            var d = $(document).scrollTop(),
            e = $(window).height();
            //0 < d ? $backTop.css("bottom", "20px") : $backTop.css("bottom", "-200px");
            //$backTop.css("bottom", "30%");
			clearTimeout(timmer);
			timmer = setTimeout(function() {
                clearTimeout(timmer)
            },100);
	   });
	}
}
var WeixinTop = new WeixinTop();
$("#qrcodeAndroid").qrcode({width: 90,height: 90,text: weixinIp+"/web/app.action"});