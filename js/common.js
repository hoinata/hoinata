






//checkBox,全选或全不选
var __showlog=false;
function checkall(obj,objname) {
	if($(obj).attr("checked")){
		$("input[name='"+objname+"']").attr("checked",true);
	}else{
		$("input[name='"+objname+"'][checktype!=1]").attr("checked",false);
	}
}
//当全选后，如果取消列表中其中一个，咋取消全选选中。
function uncheck(obj,allid){
	if(!$(obj).attr("checked")){
		$("#"+allid).attr("checked",false);
	}else{
		if($("input[name='"+$(obj).attr("name")+"']").length==$("input[name='"+$(obj).attr("name")+"']:checked").length){
			$("#"+allid).attr("checked",true);
		}
		
	}
}
//检查输入内容是否为电话号码
function CheckPhone(objField) {
  if (objField == "") return true;
  var RE = objField.match(/^1[2|3|4|5|6|7|8|9]\d{9}$/);
  if (!RE) {
    return false;
  }
  return true;
}
/*得到选中的CheckBox值,返回的数据以,分割*/
function getCheckBoxvalue(objname){
	var idvalue="";
	var objarray=$("input[name='"+objname+"']:checked");
	var count=0;
	objarray.each(function(){
		if(count==0){
			idvalue=$(this).val();
		}else{
			idvalue=idvalue+","+$(this).val();
		}
		count++;
	});
	return idvalue;
}

/*得到选中的CheckBox值,返回的数据以,分割*/
function getCheckBoxAllvalue(objname){
	var idvalue="";
	var objarray=$("input[name='"+objname+"']");
	var count=0;
	objarray.each(function(){
		if(count==0){
			idvalue=$(this).val();
		}else{
			idvalue=idvalue+","+$(this).val();
		}
		count++;
	});
	return idvalue;
}
/*得到选中的自定义CheckBox值,返回的数据以,分割*/
function getCheckBoxAttrvalue(objname,attrname){
	var idvalue="";
	var objarray=$("input[name='"+objname+"']:checked");
	var count=0;
	objarray.each(function(){
		if(count==0){
			idvalue=$(this).attr(attrname);
		}else{
			idvalue=idvalue+","+$(this).attr(attrname);
		}
		count++;
	});
	return idvalue;
}
/*得到CheckBox是否选中了多个，返回选中的checkbox的个数*/
function getCheckBoxSelectNumber(objname){
	var objarray=$("input[name='"+objname+"']:checked");
	return objarray.length;
}
//翻页提交
function __turnpage(num){
	$("#pageIndex").val(num);
	$("form:first").submit();
}
//格式化数字大小
function formatsize(size){
	if(size/(1024*1024*1024)>=1){
		var num=size/(1024*1024*1024)+"";
		if(num.lastIndexOf(".")>=0&&(num.lastIndexOf(".")+4)<num.length)
			return num.substring(0,num.lastIndexOf(".")+4)+"G"
		else
			return num+"G";
	}else if(size/(1024*1024)>=1){
		var num=size/(1024*1024)+"";
		if(num.lastIndexOf(".")>=0&&(num.lastIndexOf(".")+4)<num.length)
			return num.substring(0,num.lastIndexOf(".")+4)+" M"
		else
			return num+"M";
	}else{
		var num=size/(1024)+"";
		if(num.lastIndexOf(".")>=0&&(num.lastIndexOf(".")+4)<num.length)
			return num.substring(0,num.lastIndexOf(".")+4)+" K"
		else
			return num+"K";
	}
}
//格式化时间
function formattime(time){
	var back="";
	if(time/(60*60)>=1){
		var t=parseInt(time/(60*60));
		if(t<10)
			back="0"+t+":";
		else
			back=t+":";
	}else{
		back="00:";
	}
	if(time%(60*60)>=1){
		var t=parseInt((time%(60*60))/60);
		if(t<10)
			back=back+"0"+t+":";
		else
			back=back+t+":";
	}else{
		back=back+"00:";
	}

	if(time%(60*60)%60>=1){
		var t=parseInt((time%(60*60))%60);
		if(t<10)
			back=back+"0"+t;
		else
			back=back+t;
	}else{
		back=back+"00";
	}
	return back;
}
//退出
function logonout(){	
    top.location="../index.html";
}
//获取cookle
function getcookle(name){
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    	if(arr != null&&arr!="") return unescape(arr[2]);
    	return "";
}
//保存cookle
function   saveCookie(name,   value,   expires,   path,   domain,   secure){  
      var   strCookie   =   name   +   "="   +   value;  
      if   (expires){  
            //   计算Cookie的期限,   参数为天数  
            var   curTime   =   new   Date();  
            curTime.setTime(curTime.getTime()   +   expires*24*60*60*1000);  
            strCookie   +=   ";   expires="   +   curTime.toGMTString();  
      }  
      //   Cookie的路径  
      strCookie   +=     (path)   ?   ";   path="   +   path   :   "";    
      //   Cookie的Domain  
      strCookie   +=     (domain)   ?   ";   domain="   +   domain   :   "";  
      //   是否需要保密传送,为一个布尔值  
      strCookie   +=     (secure)   ?   ";   secure"   :   "";  
      document.cookie   =   strCookie;  
} 
var _bodyheigth=0,__count=0,__bodyheigth=0;
function changeiframeh(){
	var bodyheigth=270;

	//var sectionheight=jQuery(".section:first").height();
	bodyheigth=jQuery('body').children().eq(0).height();
	
	//if(bheight>sectionheight)bodyheigth=bheight;
	//else bodyheigth=sectionheight;
	
	//测试日志
	if(__showlog){
		try{
			if($("#showmessage").length==0)$("body").append('<div style="position: absolute;top:'+Math.ceil(Math.random()*200)+'px;left: 10px; height: 30px;width: 150px;background: #fff;" id="showmessage"></div>');
			$("#showmessage").html(bodyheigth+"ss"+_bodyheigth+"__"+jQuery(".section:first").height()+"sdfd"+jQuery("body").height()+"__"+_bodyheigth+"__________"+jQuery(".conLeft:first").height());
		}catch(e){}
	}
	
	if(bodyheigth<top.windowbodyheight&&$("div[__showopen=1]",top.document.body).css("display")!='block')bodyheigth=top.windowbodyheight;
	if(bodyheigth!=_bodyheigth){
		if(bodyheigth-_bodyheigth>30||_bodyheigth-bodyheigth>30)_bodyheigth=bodyheigth;
		else return;
	}
	else return;
	__count++;
	
	//alert("jqery:"+jQuery(document.body).height()+"scrollHeight:"+document.body.scrollHeight+",current:"+__currrentbodyheight);
	//window.name=bodyheigth;
	try {
		var ifrs = parent.document.getElementsByTagName('iframe');
   		for (var i = 0, j = ifrs.length; i < j; i++)
        if (ifrs[i].contentWindow == window) {
            if(!$(ifrs[i]).is(":visible"))return;
        }
		if($(parent.document.body).attr("top")){
			if($("div[__showopen=1]",parent.document.body).css("display")!='block'){//如果不是弹出层，则调整iframe高度
				$("#"+top.currentwindowid+"_iframe",parent.document.body).attr("height",_bodyheigth);
				$("#"+top.currentwindowid+"_iframe",parent.document.body).css("height",_bodyheigth);
			}
		}if($(parent.document.body).attr("webtop")){
			if($("div[__showopen=1]",parent.document.body).css("display")!='block'){//如果不是弹出层，则调整iframe高度
				$("#webframe",parent.document.body).attr("height",_bodyheigth);
				$("#webframe",parent.document.body).css("height",_bodyheigth);
			}
		}else{
			$("#centerframe",parent.document.body).attr("height",_bodyheigth);
			$("#centerframe",parent.document.body).css("height",_bodyheigth);
		}
		
		//$("#"+top.currentwindowid,parent.document.body).parent().css("height",_bodyheigth);
	}catch(e){}
}
function changeCustomiframe(id,divid){
	var bodyheigth=jQuery('body').children().eq(0).height()+20;
	if(divid)bodyheigth=$("#"+divid).height()+20;
	//测试日志
	if(__showlog){
		try{
			if($("#showmessage").length==0)$("body").append('<div style="position: absolute;top:50px;left: 100px; height: 30px;width: 300px;background: #fff;" id="showmessage"></div>');
			$("#showmessage").html(bodyheigth+"ssdddd");
		}catch(e){}
	}
	if(bodyheigth<top.windowbodyheight)bodyheigth=top.windowbodyheight;
	if(bodyheigth!=__bodyheigth){
		if(bodyheigth-__bodyheigth>30||__bodyheigth-bodyheigth>30)__bodyheigth=bodyheigth;
		else return;
	}
	else return;
	__count++;
	//window.name=bodyheigth;
	try {
		$("#"+id,parent.document.body).attr("height",__bodyheigth);
		$("#"+id,parent.document.body).css("height",__bodyheigth);
		//$(".conLeft",parent.document.body).attr("height",__bodyheigth);
		//$(".conLeft",parent.document.body).css("height",__bodyheigth);
	}catch(e){}
}

$(document).ready(function(){
	$("[type='text']").each(function(){
		if($(this).attr("onfocus")==null&&!$(this).attr("readonly")){
			$(this).focus();
			return false; 
		}
	});
	$("td").each(function(){
		if($(this).html().indexOf("select")<0&&$(this).attr("avoid")!=1&&$(this).parent().attr("class")!="tFooter"){
			var contenttext=$(this).text().replace(/[	]/g,"").replace(/[\r\n]/g, "").replace(/[ ]/g, "");
			if(contenttext.length>100){
				$(this).attr("title",contenttext.substring(0,100)+"...");
			}else{
				$(this).attr("title",contenttext);
			}
		};
	});
	//隐藏页面家长进度提示
	if(top!=this){
		try{
			$("#maskAllwrite",parent.document.body).hide();
			$("#waithtml",parent.document.body).hide();
		}catch(e){}
	}
	//设置页面高度自适应。
	window.setInterval(function(){
		changeiframeh(1);
	},500);
	
	try {
		if(!$('input:text:first').attr("onfocus"))$('input:text:first').focus();
	    //var $inp = $('input:text');
	    //$inp.attr("AUTOCOMPLETE","off")
	    //支持回车输入框下移动
	    /*$inp.bind('keydown', function (e) {
	        var key = e.which;
	        if (key == 13) {
	            e.preventDefault();
	            var nxtIdx = $inp.index(this) + 1;
	            $(":input:text:eq(" + nxtIdx + ")").focus();
	            if($inp.length-1==$inp.index(this)){
	            	if($(":input:text:eq(" + nxtIdx + ")").val()!=""){
	            		 $("button:first").click();
	            	}
	            }
	        }
	    });*/
	}catch(e){}
	if($("div[__showopen=1]",parent.document.body).css("display")!='block'){
		$(window.parent.document).scroll(function() {
		  	$("#hint").css("top",$(window.parent.document).scrollTop()+80);
		});
	}
	
});

function timeRender(value) {
    if(value == null || value == 'null') return '';
    if(value.length == 14)
        return value.substring(0,4) + '-' + value.substring(4,6) + '-' + value.substring(6,8) + ' ' + value.substring(8,10) + ':' + value.substring(10,12) + ':' + value.substring(12);
    else if(value.length == 6)
        return value.substring(0,2) + ':' + value.substring(2,4) + ':' + value.substring(4);
    else if(value.length == 8)
        return value.substring(0,4) + '-' + value.substring(4,6) + '-' + value.substring(6);
    else
        return value;
}

function dateRender(v1, v2) {
    if(v1 == null || v1 == 'null') v1 = '';
    if(v1 == '') {
        if(v2.length >= 8)
            return v2.substring(0,4) + '-' + v2.substring(4,6) + '-' + v2.substring(6,8);
    } else {
        if(v1.length == 8)
            return v1.substring(0,4) + '-' + v1.substring(4,6) + '-' + v1.substring(6);
    }
    return v1;
}
function setShowORHide(obj){
	var img=$(obj).find("img");
	if(img.attr("src").indexOf("btnMinus.png")>=0){
		img.attr("src","../images/btnPlus.png");
	}else{
		img.attr("src","../images/btnMinus.png");
	}
	var ctr=$(obj).parent().next();
	while(true){
		if(ctr.is("tr")){
			if(!ctr.attr("class")){
				if(ctr.is(":hidden")){
					ctr.show();
				}else{
					ctr.hide();
				}
				
				ctr=ctr.next();
			}else{
				break;
			}
		}else{
			break;
		}
	}
}
//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外  
function banBackSpace(e){     
    var ev = e || window.event;//获取event对象     
    var obj = ev.target || ev.srcElement;//获取事件源     
      
    var t = obj.type || obj.getAttribute('type');//获取事件源类型
    
    var contenteditable = obj.getAttribute('contenteditable');//获取事件源类型
    var flag3=(ev.keyCode == 8 && contenteditable=="true")  
                ?true:false;
    if(flag3){     
        return true;     
    }
    //获取作为判断条件的事件类型  
    var vReadOnly = obj.getAttribute('readonly');  
    var vEnabled = obj.getAttribute('enabled');  
    //处理null值情况  
    vReadOnly = (vReadOnly == null) ? false : vReadOnly;  
    vEnabled = (vEnabled == null) ? true : vEnabled;  
      
    //当敲Backspace键时，事件源类型为密码或单行、多行文本的，  
    //并且readonly属性为true或enabled属性为false的，则退格键失效  
    var flag1=(ev.keyCode == 8 && (t=="password" || t=="text" || t=="textarea")   
                && (vReadOnly==true || vEnabled!=true))?true:false;  
     
    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效  
    var flag2=(ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea")  
                ?true:false;  
                        
    
	
    //判断  
    if(flag2){  
        return false;  
    }  
    if(flag1){     
        return false;     
    } 
     
}  
function flashChecker(){
	var hasFlash=0;         //是否安装了flash
	var flashVersion=0; //flash版本
	var isIE=/*@cc_on!@*/0;      //是否IE浏览器
	
	if(isIE)
	{
	var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash'); 
	if(swf) {
	hasFlash=1;
	VSwf=swf.GetVariable("$version");
	flashVersion=parseInt(VSwf.split(" ")[1].split(",")[0]); 
	}
	}else{
	if (navigator.plugins && navigator.plugins.length > 0)
	{
	var swf=navigator.plugins["Shockwave Flash"];
	    if (swf)
	     {
	hasFlash=1;
	        var words = swf.description.split(" ");
	        for (var i = 0; i < words.length; ++i)
	{
	            if (isNaN(parseInt(words[i]))) continue;
	            flashVersion = parseInt(words[i]);
	}
	    }
	}
	}
	return {f:hasFlash,v:flashVersion};
} 
//禁止后退键 作用于Firefox、Opera  
document.onkeypress=banBackSpace;  
//禁止后退键  作用于IE、Chrome
document.onkeydown=banBackSpace;  