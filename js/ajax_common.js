function shouajaxpro(type,message){
	try{
		if(type==1){
			$("#waithtml",top.document.body).html("<img src='../common/images/extanim32.gif' /><span style='color:#ffffff;'>"+(message==null?"正在处理数据，请稍后....":message)+"</span>");
			$("#waithtml",top.document.body).show();
			$("#maskAllwrite",top.document.body).show();
		}else{
			$("#waithtml",top.document.body).hide();
			$("#maskAllwrite",top.document.body).hide();
		}
	}catch(e){}
	
}
function shouajaxprolocal(type,message){
	try{
		if(type==1){
			$("#waithtml").html("<img src='../common/images/extanim32.gif' /><span>"+(message==null?"正在处理数据，请稍后....":message)+"</span>");
			$("#waithtml").show();
			$("#maskAllwrite").show();
		}else{
			$("#waithtml").hide();
			$("#maskAllwrite").hide();
		}
	}catch(e){}
	
}
//jquery远程调用
function ajaxJson(url,data,uncode,fun){
	var myDate = new Date();
	//shouajaxpro(1);
  	jQuery(function($){
  		$.getJSON(interurll+url+"&time="+myDate.getSeconds()+"&reqEncoding="+uncode+"&jsoncallback=?",data,function(result){
	  		fun(result);
	  		//shouajaxpro(0);
	  	})
  	});
}
//jquery调用
function commonajaxJson(url,data,fun){
	var myDate = new Date();
	//shouajaxpro(1);
  	jQuery(function($){
  		$.getJSON(url+"&time="+myDate.getSeconds(),data,function(result){
	  		fun(result);
	  		//shouajaxpro(0);
	  	})
  	});
}
function randomsuijishu(){
	var r=parseInt(Math.random()*38);
	var array=[];
	var back="";
	for(var i=0;i<7;i++){ 
		var flag=0; 
		do {
			for(var j=0;j<array.length;j++)  {
			   if(array[j]==r) {flag=1;break;}  
			}  
			if(!flag){array[array.length]=r;  }  
			else  {   r=parseInt(Math.random()*38);  } }
		while(!flag);
	}
	for(var j=0;j<array.length;j++)back=back+array[j];
	return back;
}
/*得到http对象 end*/
/**/
function sendRequest(callback,url,method,xml){
/**
  var _method="get";
  if(null!=method)
     _method=method;
  xmlHttp=getXmlHttpObject();
  xmlHttp.open(_method,url,true);
  xmlHttp.onreadystatechange=callback;
  xmlHttp.send(null);
 */ 
   shouajaxpro(1);
   $.ajax({ 
	    url:url, 
	    type: method, 
	    datatype: 'xml',//这里可以不写，但千万别写text或者html!!! 
	    timeout: 600000,
	    data:xml,
	    error: function(xml){ 
	         //maskAllall.style.display="none";
            //_loginObj.error('登录超时！');
            //alert('数据调用出错!');
            shouajaxpro(0);
           //top.location= _common.getCurrServerPath()+"/login/toLoginPage.do";
           // _common.timeout(null);//超时
	    }, 
	    success: function(xml){ 
	    shouajaxpro(0);
	     //alert(typeof(xml));
	     //alert(xml);
	     if('string'==typeof(xml)){
	       //alert('string'==typeof(xml));
	       if(xml.indexOf('body')>0){
	          alert('登录超时，请重新登录！');
	          return;
	       }
	     }
	     callback(xml);
	    }
	 })
}
function getUserInfo(user_url)
{
	/*var usercode=getcookle("usercode");
	var user=getcookle("username").split("_");;
	commonajaxJson(user_url+"/get_userinfo.action?jsoncallback=?",function(xml){
		if(xml.ret)
		{
			//alert(xml.info.nickname);
            var html="<li>欢迎您&nbsp;&nbsp;<a href=\"javascript:void(0)\" class=\"login-btn\">"+xml.info.nickname+"</a></li>";
            html+="<li class=\"devider\">&nbsp;</li>";
            html+="<li><a href=\""+user_url+"/admin/login.action\" >个人中心</a></li>";
            html+="<li class=\"devider\">&nbsp;</li>";
            html+="<li><a href=\""+user_url+"/admin/quit.action\">退出登录</a></li>";

			$("#logininfo").html(html);
			userLoginType=1;
			
			$("#div_loginUser").hide();
			
			$("#u_login_ok").show();
			$("#loginPanel").hide();
			var headim=xml.info.himg;
			if(!headim)headim=basePath+'/newportal/assets/img/touxiang.png';
			var newshowhtml='<dl>'+
			            	'<dt><img src="'+headim+'"></dt>'+
			                '<dd>欢迎您</dd>'+
			                '<dd><a href="'+user_url+'/admin/login.action" class="text-blue">'+xml.info.nickname+'</a></dd>'+
			                '<dd class="success_txt"><img src="'+basePath+'/images/login_ok.png">&nbsp;&nbsp;登录成功!</dd>'+
			            '</dl>        '    +
			            '<div class="btn_user">'+
			            	'<a href="'+user_url+'/admin/login.action"><i class="ico-usr"></i>个人中心</a>'+
			                '<a href="'+user_url+'/admin/quit.action"><i class="ico-exit"></i>退出登录</a>'+
			            '</div>';
				
			
			$("#u_login_ok").html(newshowhtml);
			successUser();
		}else{
			userLoginType=0;
			successUser();
		}
		
	})*/
}
function successUser()
{
}
