//显示新闻头
var zhuantiIp="";
var zhuantiPage=1;
var zhuantiPagenum=12;
var zhuantiAllCount=0;
var zhuantiDiv="pagebardiv";
function zhuantiInit(ztTitle)
{
	$.ajax({
       	url: zhuantiIp+'/iphoneInterface/iphoneServlet.do?data={"serviceCode":"zhuantiList","token":"tokennihao00000000","rmsFormat":"1","orderBy":"4","page":"'+zhuantiPage+'","pageCount":"'+zhuantiPagenum+'"}&jsoncallback=?',
      	cache:false,
      	type: "GET",
      	async:false,
	  	dataType:'json',
	    success: function(data)
	    		{ 
				
	    	viewZhuanTi(data);
	      
	     },
	     error:function(jqXHR, textStatus, errorThrown) 
	     {

	     }
 	}
	);
}
function viewZhuanTi(data)
{
}
function playZhuanti(code)
{
	//return zhuantiIp+"/phoneres/viewZhuanTi.do?divLever=1&urlAction=&listvo.ztCode="+code;
	return zhuantiIp+"/phoneres/viewZhuanTi.do?divLever=1&urlAction=success&listvo.ztCode="+code;
}
//翻页
//container 容器，count 总数量， pageindex 当前页数，kpcount 每页显示数
function setZhuantiPageHtml() 
{
	var container = document.getElementById(zhuantiDiv);
	var count = Math.ceil(zhuantiAllCount/zhuantiPagenum);
	var pageindex = zhuantiPage;
	//alert(pageindex);
	var a = [];
	//onclick=\"javascript:ajaxRmsInfo('"+rmsPath+"','"+kpid+"','"+ktitle+"','"+korder+"','"+kbdate+"','"+kedate+"','"+pageindex+"','"+kpcount+"')\"
	//总页数少于10 全部显示,大于10 显示前3 后3 中间3 其余....
	a[a.length] = "<span class=\"pNum hidden-xs\">页次："+pageindex+"/"+count+" 共"+zhuantiAllCount+"条</span>";
	//a[a.length] = "<li><a href=\"javascript:void(0);\">&laquo;</a></li>";
  
  
  
	a[a.length] = "<li><a>首页</a></li>";
  a[a.length] = "<li><a>上一页</a></li>";

	function setZhuantiPageList() 
	{
	    if (pageindex == i) 
	    {
	      a[a.length] = "<li class=\"active\"><a href=\"javascript:void(0);\" >" + i + "</a></li>";
	    } else {
	      a[a.length] = "<li><a>" + i + "</a></li>";
	    }
	}
	//总页数小于10
	var lk=10;
	var bk=lk/2;
	
	var minPager=(count-pageindex>=4)?(pageindex >= 3 ? pageindex - 2
				: 1):(pageindex >= (3 + 2 - count + pageindex) ? (pageindex
					- 4 + count - pageindex)
					: 1);
	var maxPager=(minPager + 4 > count) ? count : (minPager + 4);
	for(var i=minPager;i<=maxPager;i++)
	{
		setZhuantiPageList();
	}
	
  a[a.length] = "<li><a>下一页</a></li>";
	a[a.length] = "<li><a>末页</a></li>";
	
	//var s=;
	//alert(s);
	container.innerHTML =a.join("");
	//事件点击
	var pageClick = function() 
	{
		var oAlink = container.getElementsByTagName("a");
		var inx = pageindex; //初始的页码
		oAlink[0].onclick = function() 
		{ //点击首页
			if (inx == 1) 
			{
				return false;
			}
			inx=1;
			zhuantiPage=1;
			
			zhuantiPageQuery();
			//ajaxRmsInfo(rmsPath,kpid,ktitle,korder,kbdate,kedate,inx,kpcount);
			return false;
		};
		oAlink[1].onclick = function() 
		{ //点击上一页
			if (inx == 1) 
			{
				return false;
			}
			inx--;
			//setPage(container, count, inx);
			zhuantiPage=inx;
			
			zhuantiPageQuery();
			//ajaxRmsInfo(rmsPath,kpid,ktitle,korder,kbdate,kedate,inx,kpcount);
			return false;
		};
		for (var i = 2; i < oAlink.length - 2; i++) 
		{ //点击页码
			oAlink[i].onclick = function() 
			{
				inx = parseInt(this.innerHTML);
				//setPage(container, count, inx);
				zhuantiPage=inx;
				zhuantiPageQuery();
				return false;
			};
		}
		oAlink[oAlink.length - 2].onclick = function() 
		{ //点击下一页
			if (inx == count) 
			{
				return false;
			}
			inx++;
			//setPage(container, count, inx);
			zhuantiPage=inx;
			zhuantiPageQuery();
			return false;
		};
		oAlink[oAlink.length -1].onclick = function() 
		{ //点击末页
			if (inx == count) 
			{
				return false;
			}
			inx=count;
			//setPage(container, count, inx);
			zhuantiPage=count;
			zhuantiPageQuery();
			return false;
		};
} ();
}
function zhuantiPageQuery()
{
}