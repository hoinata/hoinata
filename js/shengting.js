//预警滚动信息
function scrollNews_home(){
  var newsTimer = setInterval(_newsScroll, 4000);
  var newslen = Math.ceil($('.warning_content ul li a').length/3);
  var newsHeight = 40;
  var newsindex = 0;
  $('.news_qh p').click(function() {
    clearInterval(newsTimer);
    if ($(this).is('#news_down')) {
      newsindex++;
    } else{
      newsindex--;
    };
    if(newsindex == newslen){
      newsindex = 0;
    };
    if(newsindex == -1){
      newsindex = newslen - 1;
    };
    showNews(newsindex,newsHeight);
    newsTimer = setInterval(_newsScroll, 5000);
  });
  function showNews(newsindex,newsHeight){
    var nowTop = -newsindex * newsHeight;
    $(".warning_content ul li").stop(true, true).animate({"top": nowTop}, 1000);
  }
  function _newsScroll(){
    showNews(newsindex,newsHeight);
    newsindex ++ ;
    if(newsindex == newslen){
      newsindex = 0;
    };
  };
}
function code2_show(){
	$(".qrcode-main").hover(function(){
		var isShow = $(".invalid").css("display");
		if(isShow == "block"){
		}
		else{
			$(".code2").css("left","-10px");
			$(".iPhone").stop().fadeIn(300);
		}
	},function(){		
			$(".code2").css("left","54px");
			$(".iPhone").hide();
	})
}

function whatBrowser(){//浏览器检测
 if (window.navigator.userAgent.indexOf('compatible') != -1) {
    if ((window.navigator.userAgent.indexOf('MSIE 7.0') != -1)||(window.navigator.userAgent.indexOf('MSIE 8.0') != -1)||(window.navigator.userAgent.indexOf('MSIE 9.0') != -1)){
    //alert('360兼容模式并且版本低');
      $(".browser_tips").show();        
    }     
  }   
}

function friendlinks()
{
	  $(".friend_links>h1").css("height",$(".friend_links").height()); //友情链接标题高度调整
}

//滚动插件
function scrollNews(){
  (function($){
    $.fn.extend({
        Scroll:function(opt,callback){
          //参数初始化
          if(!opt) var opt={};
          var _this=this.eq(0).find("ul:first");
          var lineH=_this.find("li:first").height(), //获取行高
              line=opt.line?parseInt(opt.line,10):parseInt(this.height()/lineH,10), //每次滚动的行数，默认为一屏，即父容器高度
              speed=opt.speed?parseInt(opt.speed,10):500, //卷动速度，数值越大，速度越慢（毫秒）
              timer=opt.timer?parseInt(opt.timer,10):3000; //滚动的时间间隔（毫秒）
          if(line==0) line=1;
          var upHeight=0-line*lineH;
          //滚动函数
          scrollUp=function(){
            _this.animate({
              marginTop:upHeight
            },speed,function(){
              for(i=1;i<=line;i++){
                      _this.find("li:first").appendTo(_this);
              }
              _this.css({marginTop:0});
            });
          }
          //鼠标事件绑定
          _this.hover(function(){
             clearInterval(timerID);
          },function(){
                  timerID=setInterval("scrollUp()",timer);
          }).mouseout();
        }        
    })
  })(jQuery);
  $("#scrollDiv").Scroll({line:1,speed:0,timer:0});
}

    