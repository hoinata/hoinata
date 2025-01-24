
//框架刷新远iframe内容，formid表弟id，contentid需要刷新的内容区域id如果为空，则默认为刷新主框架
var commonfunction=null;
//模拟post提交数据
var myPost = function(url,args){
    var body = $(document.body),
        form = $("<form method='post' target='topmaincontentcontner'></form>"),
        input;
    form.attr({"action":url});
    $.each(args,function(key,value){
        input = $("<input type='hidden'>");
        input.attr({"name":$(this).attr("name")});
        input.val($(this).attr("value"));
        form.append(input);
    });
    form.appendTo(document.body);
    form.submit();
    document.body.removeChild(form[0]);
}
//框架级别提交表单数据
var currenttimeout=null;
function tosubmit(href,formid,contentid,cfunction,channelid,channetype,showloadding){
	clearTimeout(currenttimeout);
	if(!showloadding)shouajaxpro(1);
	var conid="maincontent";
	if(contentid!=null&&contentid!=""){
		conid=contentid;
	}
	var data=null;
	if(formid!=null&&formid!=""){
		data=getFormJson("#"+formid);
	}
	if(channelid!=null&&channelid!=''){
		$(".sidebar li").removeClass("active");
		$("[navid='"+channelid+"']").addClass("active");
	}
	$("[contentid='maincontent']").attr("bodyid",conid);
	if(formid!=null&&formid!=""){
		var par=getFormString("#"+formid);
		myPost(href,par);
	}else{
		$("[contentid='maincontent']").attr("src",href);
	}
	commonfunction=cfunction;
	if(channetype&&channetype==1){
		$("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
		if ($("body").hasClass('sidebar-collapse')) {
			$(".sidebar-toggle").find("i").attr("class","fa fa-angle-right");
		}
	}else if(channetype==0){
		//$("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
	}
	currenttimeout=setTimeout(function(){
		var showtype=0;
		if($('#waithtml').length > 0 && !$('#waithtml').is(':hidden')){//判断进度条是否隐藏。
			showtype=1;
		}
		if(showtype==1){
			shouajaxpro(0);
			// ymPrompt.alert('获取数据出错，请刷新浏览器后重试！',null,null,'提示',null);
		}
	}, 60000);
}
//显示二级导航
function toshowseconed(id,plattype){
	$("body").removeClass('sidebar-collapse');
	$(".sidebar-toggle").find("i").attr("class","fa fa-angle-right");

	$("#navbar-top li").removeClass("dropdown active");
	$("[navid='"+id+"']").addClass("dropdown active");
	$(".sidebar ul").hide();
	$("#"+id).show();
	if(plattype==1)return;
	if($("#"+id+" li:first").find("ul").length==0){
		var onclcikjs=$("#"+id+" li:first").find("a:first").attr("href");
		window.setTimeout(function(){
			if(onclcikjs.indexOf("(")>=0){
				eval(onclcikjs);
			}else{
				window.open(onclcikjs);
			}
		}, 500)
	}else{
		$("#"+id+" li:first a").trigger("click");
		window.setTimeout(function(){
			var onclcikjs=$("#"+id+" li:first").find("ul:first").find("a:first").attr("href");
			if(onclcikjs.indexOf("(")>=0){
				eval(onclcikjs);
			}else{
				window.open(onclcikjs);
			}
		}, 500)
	}
}
function tounbind(){
	$(document).unbind("keyup");
}
function getTop() {
	var _top = self;
	var current=_top;
	var ii=0;
	while(ii<10){
	        try{
	                current=current.parent;
	                if(current.document){
	                        _top=current.self;
	                }else{
	                        break;
	                }
	        }catch(e){
	                break;
	        }
	        ii++;
	}

	return _top;
}
function tosetcheckboxstyle(){
	$('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue'
      });
      //Red color scheme for iCheck
      $('input[type="checkbox"].minimal-red, input[type="radio"].minimal-red').iCheck({
        checkboxClass: 'icheckbox_minimal-red',
        radioClass: 'iradio_minimal-red'
      });
      //Flat red color scheme for iCheck
      $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
        checkboxClass: 'icheckbox_flat-green',
        radioClass: 'iradio_flat-green'
      });
      $('input').on('ifChecked', function(event){
    	  if($(this).attr("id")=="all"&&$(this).attr("checkallname")){
    		  $("input[name='"+$(this).attr("checkallname")+"']").iCheck('check');
    	  }
      });
      $('input').on('ifChanged', function(event){
      	  if($(this).attr("onclick")){
      		  eval($(this).attr("onclick"));
      	  }
        });
      $('input').on('ifUnchecked', function(event){
    	  if($(this).attr("id")=="all"&&$(this).attr("checkallname")){
    		  $("input[name='"+$(this).attr("checkallname")+"']").iCheck('uncheck');
    	  }
      });
}
function getFormJson(form) {
	var o = {};
	var a = $(form).serializeArray();
	$.each(a, function () {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
			o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
}
function getFormString(form) {
	var ostring=$(form).serializeArray();
	return ostring;
}
var divfunction,divfunctionsecond,commonvariables,torefreshdiv1,torefreshdiv2;
var functionarray=new Array();
var refresharray=new Array();
var commonvariablesarray=new Array();
function client(){
    if(window.innerHeight !== undefined){
        return {
             "width": window.innerWidth,
             "height": window.innerHeight
         }
     }else if(document.compatMode === "CSS1Compat"){
             return {
                 "width": document.documentElement.clientWidth,
                 "height": document.documentElement.clientHeight
             }
     }else{
        return {
             "width": document.body.clientWidth,
              "height": document.body.clientHeight
        }
     }
}
//显示div title:标题，src：路径，width：弹出层宽度，height：弹出层高度，commonfunc：回调方法，type：弹出窗口类型，torefresh：关闭窗口是否回调commonfunc，默认不刷新,nohead不要标题栏
function toshowdiv(title,src,width,height,commonfunc,type=1,torefresh,commonvar,hideclose,fullscreen,nohead = false){
	if (typeof top.topShowDialog === "function") {
		if(type==1){
			divfunction=commonfunc;
			torefreshdiv1=torefresh;
		}else if(type==2){
			divfunctionsecond=commonfunc;
			torefreshdiv2=torefresh;
		}
		// 如果有刷新，走原本刷新逻辑
		refresharray[type]=torefresh;
		functionarray[type]=commonfunc;
		commonvariablesarray[type]=commonvar;
		// 其他转译成门户弹窗
		top.topShowDialog(title, src, width + 'px', height + 'px', commonfunc, type, {}, null, torefresh);
		return;
	}
	var box =300;
	var h =document.body.clientHeight;
	var h2=$(window).height();
	var th= ((h2>h?h:h2)-height)/2;
	var rw =$(window).width()/2-width/2;
	if(!type)type=1;
	if(th<=0)th=30;
	var number = (1+Math.random()*(4-1)).toFixed(0);
	var tleft=0,ttop=0;
	if(type==1){
		divfunction=commonfunc;
		torefreshdiv1=torefresh;
	}else if(type==2){
		divfunctionsecond=commonfunc;
		torefreshdiv2=torefresh;
	}
	functionarray[type]=commonfunc;
	refresharray[type]=torefresh;
	commonvariablesarray[type]=commonvar;
	//计算随机高度
	if(number==1){
		tleft=rw;
		ttop=-height;
	}else if(number==2){
		tleft=rw;
		ttop=window.screen.height/2;
	}else if(number==3){
		tleft=-rw;
		ttop=th;
	}else if(number==4){
		tleft=window.screen.width/2;
		ttop=th;
	}
	var bigheight=client().height-50;
	//if(bigheight<height)height=bigheight;
	var html="<div id=\"___float"+type+"\" __showopen='1'><div class=\"modal-backdrop  in\" id=\"maskAllall"+type+"\" style=\"z-index:"+(12000+type)+";\"></div>"+
		"<div id=\"float"+type+"\" tofull=\"\" width=\""+width+"\" height=\""+height+"\" top=\"\" left=\"\" class=\"modal\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" style=\"position:"+(bigheight<height?"absolute":"fixed")+";z-index:"+(12000+type+1)+"; border-radius:"+(nohead ? '10px':'0')+"; top:0px;left:"+rw+"px;width:"+width+"px;height:"+height+"px;display:none;\">"+
		"<div class=\"modal-dialog\" style=\"width:100%;height:"+height+";margin:0;\">"+
    (nohead?("<div class=\"modal-content\" style='height: 100%'>" + "<div class=\"modal-body\" style=\"width:100%;margin:0px;padding:0px; height: 100%\">"): ("<div class=\"modal-content\"><div class=\"modal-header\">"+(hideclose==null?("<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" onClick=\"tohidediv("+type+",null,true)\">&times;</button>"):"")+
			  "<h4 class=\"modal-title\">"+title+"</h4>"+
			"</div>"+"<div class=\"modal-body\" style=\"width:100%;margin:0px;padding:0px;\">"))
			+
    (nohead?("<a href=\"javascript:;\" style=\"position: absolute; top: 10px; z-index: 999;right: 10px; font-size: 30px; line-height: 30px; color: #999; \" onClick=\"tohidediv("+type+",null,true)\"><i class=\"el-dialog__close el-icon el-icon-close\"></i></a>"):'') +
				"<iframe name=\"floatiframe"+type+"\" id=\"floatiframe"+type+"\" src=\""+src+"\" width=\"100%\" height=\""+(nohead?height:(height-60))+"\" frameborder=\"0\" scrolling=\"auto\" onload=\"iframeLoad("+type+")\"></iframe>"+
			"</div>"+
          "<div class=\"clearfix\"></div>"+
		  "</div>"+
		"</div>"+
	"</div></div>";
	$(document.body).append(html);
	//if($("div[__showopen=1]").length==1){
		if(bigheight>height)$("body").css("overflow","hidden");
		else $("body").css("overflow","");
	//}
	$("#float"+type).animate({opacity:"show",width:width+"px",height:height+"px",left:rw+"px",top:th+"px"},500);
	$("#float"+type).attr("left",rw).attr("top",th);
}
// 同toshowdiv，不显示title行。
//显示div title:标题，src：路径，width：弹出层宽度，height：弹出层高度，commonfunc：回调方法，type：弹出窗口类型，torefresh：关闭窗口是否回调commonfunc，默认不刷新,nohead不要标题栏
function toshowdialog(title,src,width,height,commonfunc,type=1,torefresh,commonvar,hideclose,fullscreen,nohead = false){
	if (typeof top.topShowDialog === "function") {
		// 如果有刷新，走原本刷新逻辑
		refresharray[type]=torefresh;
		functionarray[type]=commonfunc;
		// 其他转译成门户弹窗
		top.topShowDialog(title, src, width + 'px', (height - 60) + 'px', commonfunc, type);
		return;
	}
    var box =300;
    var h =document.body.clientHeight;
    var h2=$(window).height();
    var th= ((h2>h?h:h2)-height)/2;
    var rw =$(window).width()/2-width/2;
    if(!type)type=1;
    if(th<=0)th=30;
    var number = (1+Math.random()*(4-1)).toFixed(0);
    var tleft=0,ttop=0;
    if(type==1){
        divfunction=commonfunc;
        torefreshdiv1=torefresh;
    }else if(type==2){
        divfunctionsecond=commonfunc;
        torefreshdiv2=torefresh;
    }
    functionarray[type]=commonfunc;
    refresharray[type]=torefresh;
    commonvariablesarray[type]=commonvar;
    //计算随机高度
    if(number==1){
        tleft=rw;
        ttop=-height;
    }else if(number==2){
        tleft=rw;
        ttop=window.screen.height/2;
    }else if(number==3){
        tleft=-rw;
        ttop=th;
    }else if(number==4){
        tleft=window.screen.width/2;
        ttop=th;
    }
    var bigheight=client().height-50;
    //if(bigheight<height)height=bigheight;
    var html="<div id=\"___float"+type+"\" __showopen='1'><div class=\"modal-backdrop  in\" id=\"maskAllall"+type+"\" style=\"z-index:"+(12000+type)+";\"></div>"+
        "<div id=\"float"+type+"\" tofull=\"\" width=\""+width+"\" height=\""+height+"\" top=\"\" left=\"\" class=\"modal\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" style=\"position:"+(bigheight<height?"absolute":"fixed")+";z-index:"+(12000+type+1)+"; border-radius:"+(nohead ? '10px':'0')+"; top:0px;left:"+rw+"px;width:"+width+"px;height:"+height+"px;display:none;\">"+
        "<div class=\"modal-dialog\" style=\"width:100%;height:"+height+";margin:0;\">"+
        (nohead?("<div class=\"modal-content\" style='height: 100%'>" + "<div class=\"modal-body\" style=\"width:100%;margin:0px;padding:0px; height: 100%\">"): ("<div class=\"modal-content\">"+(hideclose==null?("<button type=\"button\" style=\"position: absolute; top: 10px; right:10px; z-index: 9\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" onClick=\"tohidediv("+type+",null,true)\">&times;</button>"):"")+
		"<div class=\"modal-body\" style=\"width:100%;margin:0px;padding:0px;\">"))
        +
        (nohead?("<a href=\"javascript:;\" style=\"position: absolute; top: 10px; z-index: 999;right: 10px; font-size: 30px; line-height: 30px; color: #999; \" onClick=\"tohidediv("+type+",null,true)\"><i class=\"el-dialog__close el-icon el-icon-close\"></i></a>"):'') +
        "<iframe name=\"floatiframe"+type+"\" id=\"floatiframe"+type+"\" src=\""+src+"\" width=\"100%\" height=\""+height+"\" frameborder=\"0\" scrolling=\"auto\" onload=\"iframeLoad("+type+")\"></iframe>"+
        "</div>"+
        "<div class=\"clearfix\"></div>"+
        "</div>"+
        "</div>"+
        "</div></div>";
    $(document.body).append(html);
    //if($("div[__showopen=1]").length==1){
    if(bigheight>height)$("body").css("overflow","hidden");
    else $("body").css("overflow","");
    //}
    $("#float"+type).animate({opacity:"show",width:width+"px",height:height+"px",left:rw+"px",top:th+"px"},500);
    $("#float"+type).attr("left",rw).attr("top",th);
}
function toopenfull(type){
	if($("#float"+type).attr("tofull")==""){
		//$(obj).removeClass("full");
		//$(obj).addClass("fullback");
		$("#float"+type).attr("tofull","full")
		$("#float"+type).css({width:window.screen.width+"px",height:(window.screen.height-100)+"px",left:"0px",top:"0px"});
		$("#float"+type+" .modal-body").css("height",(window.screen.height-100)+"px");
		$("#float"+type+" iframe").css("height",(window.screen.height-160)+"px");
		return "1";
	}else{
		//$(obj).removeClass("fullback");
		//$(obj).addClass("full");
		var height=$("#float"+type).attr("height");
		$("#float"+type).attr("tofull","")
		$("#float"+type).css({width:$("#float"+type).attr("width")+"px",height:height+"px",left:$("#float"+type).attr("left")+"px",top:$("#float"+type).attr("top")+"px"});
		$("#float"+type+" .modal-body").css("height",height+"px");
		$("#float"+type+" iframe").css("height",(height-60)+"px");
		return "0";
	}

}
var hidetype=0;
//隐藏div,type:隐藏第几个弹出层，refresh是否调用刷新方法，toprefresh：弹出层关闭按钮是否调用刷新方法。
function tohidediv(type=1,refresh,toprefresh){
	hidetype=1;
	if(!type)type=1;
	if (typeof top.topHideDialog === "function") {
		top.topHideDialog(type);
		var __func=functionarray[type];
		if(toprefresh){//如果是框架关闭窗口，判断是否刷新
			try{
				if(refresharray[type]==true)__func();
			}catch(e){}
		}else{//用户自定义是否刷新
			try{
				if(refresh==true)__func();
			}catch(e){}
		}
		return;
	}
	var number = (1+Math.random()*(4-1)).toFixed(0);
	var tleft=0,ttop=0;
	if(number==1){
		$("#float"+type).animate({opacity:"hide",top:"0px",left:window.screen.width/2+"px",width:"0px",height:"0px"},500,function(){
			closeback(type,refresh,toprefresh);
		});
	}else if(number==2){
		ttop=window.screen.height;
		$("#float"+type).animate({opacity:"hide",top:ttop+"px",left:window.screen.width/2+"px",width:"0px",height:"0px"},500,function(){
			closeback(type,refresh,toprefresh);
		});
	}else if(number==3){
		$("#float"+type).animate({opacity:"hide",left:"0px",top:window.screen.height/2+"px",width:"0px",height:"0px"},500,function(){
			closeback(type,refresh,toprefresh);
		});
	}else if(number==4){
		tleft=window.screen.width;
		$("#float"+type).animate({opacity:"hide",left:tleft+"px",top:window.screen.height/2+"px",width:"0px",height:"0px"},500,function(){
			closeback(type,refresh,toprefresh);
		});
	}
}
function closeback(type,refresh,toprefresh){
	$("#___float"+type).hide();
	if($("div[__showopen=1]").length==1){
		$("body").css("overflow","auto");
	}
	try{
		$("#floatiframe"+type).contents().find("body").children().remove();
		$("#floatiframe"+type).contents().find("body").remove();
		$("#floatiframe"+type).remove();
		$("#___float"+type).remove();
	}catch(e){
		$("#___float"+type).remove();
	}

	var __func=functionarray[type];
	if(toprefresh){//如果是框架关闭窗口，判断是否刷新
		try{
			if(refresharray[type]==true)__func();
		}catch(e){}
	}else{//用户自定义是否刷新
		try{
			if(refresh==true)__func();
		}catch(e){}
	}

	functionarray[type]=null;
	refresharray[type]=null;
	commonvariablesarray[type]=null;
	hidetype=0;
}
//回调方法
function callbackfunction(type=1,v1,v2,v3,v4,v5,v6,v7){
	if(!type)type=1;
	if (typeof top.topCallBack === "function") {
		top.topCallBack(type,v1,v2,v3,v4,v5,v6,v7);
		return;
	}
	var __func=functionarray[type];
	try{
		__func(v1,v2,v3,v4,v5,v6,v7);
	}catch(e){}
}
//向上传递的参数
function callbackvariables(type){
	if(!type)type=1;
	var __vari=commonvariablesarray[type];
	return __vari;
}
function getWidth(){
	var currrentobj=null;
	$("[showtype='probutton']").each(function(){
		if($(this).is(':visible')){
			currrentobj=$(this);
		}
	});
	if(currrentobj){
		var btn_width = currrentobj.parent().parent().parent().width();
		currrentobj.parent().css("width",btn_width);
	}
}

function iframeLoad(type){
	if(document.getElementById("floatiframe" + type)){
		var content = document.getElementById("floatiframe" + type).contentDocument || document.getElementById("floatiframe" + type).contentWindow.document;
		if(content.body.scrollHeight <= document.getElementById("floatiframe" + type).height){
			content.body.style.height="auto";
		}
	}
}
var copybutton=null;
function fixHeader(){
	// getWidth();
	// var window_y = $(window).scrollTop();

	// var currentbutton=null;
	// $("[showtype='probutton']").each(function(){
	// 	if($(this).is(':visible')){
	// 		currentbutton=$(this).parent();
	// 	}
	// });
	// if(currentbutton==null)return;
	// if (window_y>=currentbutton.offset().top){
	// 	if($("[clonetype='1']").length>0)return;
	// 	copybutton=currentbutton.clone(true);
	// 	copybutton.attr("clonetype","1");
	// 	copybutton.find("[showtype='probutton']").attr("showtype","");
	// 	copybutton.find("[removetype='1']").remove();
	// 	$(currentbutton).parent().append(copybutton);
	// 	copybutton.css("position","fixed");
	// 	copybutton.css("z-index","9999");
	// 	copybutton.css("top","0");
	// 	copybutton.css("box-shadow","0 1px 2px #ccc");
	// }else {
	// 	$("[clonetype='1']").remove();
	// 	copybutton=null;
	// }
}
$(window).resize(function() {
	getWidth();
});
$(window).scroll(function(){
	getWidth();
	fixHeader();
})
jQuery(function($){
	getWidth();
	//var selnav=$("#firstlist [class='sel']");

	//$("#welcome").attr("height",windowbodyheight);
	//$("#welcome").css("height",windowbodyheight);
	//alert(windowbodyheight);
	//var navchild=$("#"+selnav.attr("navid")+" dd");


	//toClassUpPage
})
