var rmsAllCount=0;
var defaultType="";//
var defaultOrder="";
var defaultTime="";
var defaultTitle="";

var rmsPage=1;
var rmsPagenum=12;
var rmsIp="";
var rmsPageDiv="divAnfangPageBar";
var showFunction="1";//1=默认，2，特殊
function RmsInfo(rmsCode,rmsTitle,rmsDesc,imagePic,rmsAuthor,rmsCreateDate,rmsFormatMark,rmsFormatPhone,rmsKsId,rmsVksCode,rmsPublisher,rmsSize,rmsTypeCodeName,downNumber,houseNumber,recommendNumber,rmsTimeLong,resCompleteImg)
{
	this.rmsCode=rmsCode;
	this.rmsTitle=rmsTitle;
	this.rmsDesc=rmsDesc;
	this.imagePic=imagePic;
	this.rmsAuthor=rmsAuthor;
	this.rmsCreateDate=rmsCreateDate;
	this.rmsFormatMark=rmsFormatMark;
	this.rmsFormatPhone=rmsFormatPhone;
	this.rmsKsId=rmsKsId;
	this.rmsVksCode=rmsVksCode;
	this.rmsPublisher=rmsPublisher;
	this.rmsSize=rmsSize;
	this.rmsTypeCodeName=rmsTypeCodeName;
	this.downNumber=downNumber;
	this.houseNumber=houseNumber;
	this.recommendNumber=recommendNumber;
	this.rmsTimeLong=rmsTimeLong;
	this.resCompleteImg=resCompleteImg;
	return this;
}

function jsonDataValue(data,val,pkid)
{
	if(pkid!="")
	{
		if(data=="")
		{
			data="'"+pkid+"':'"+val+"'";
		}else
		{
			data+=",'"+pkid+"':'"+val+"'";
		}
	}
	return data;
}
/*
 * 资源管理地址，图书编号，资源目录，资源标题，推荐类型，页码，每页显示数
 * */
function ajaxRmsInfo(bookCode,rmsKsId,rmsTypeCode,rmsTuiJianType,page,pageCount,backfunc)
{
	var arr = new Array();
	var data="";
	data=jsonDataValue(data,rmsKsId,"rmsKsId");
	data=jsonDataValue(data,rmsTypeCode,"rmsTypeCode");
	data=jsonDataValue(data,page,"page");
	data=jsonDataValue(data,pageCount,"pageCount");
	data=jsonDataValue(data,bookCode,"bookCode");
	data=jsonDataValue(data,rmsTuiJianType,"rmsTuiJianType");
	data=jsonDataValue(data,defaultOrder,"rmsOrder");
	data=jsonDataValue(data,defaultTime,"rmsTime");	
	data=jsonDataValue(data,defaultTitle,"rmsTitle");
	//alert(ktitle);

	var timestamp = Date.parse(new Date());

	if(rmsIp!=null && rmsIp!="")
	{
		$.ajax({
			url: rmsIp+'/resource/publicResInfo.do?jsonData={'+data+'}&timestamp='+timestamp+'&jsoncallback=?',
			cache:false,
			type: "GET",
			async:true,
			dataType:'json',
			success: function(data)
					{ 
					
					   if(data)
						{
						   if(page=="1")
						   {
							   rmsAllCount=data.ResCount;
						   }
						   backfunc(data,page,pageCount);
						}else
						{	
							
						}
			  
			 },
			 error:function(jqXHR, textStatus, errorThrown) 
			 {
	
			 }
		}
		);
	}
	return arr;
}
function viewRms(data)
{
}
function RmsFormat(kid,kname,kv1,kv2)
{
	this.kid=kid;
	this.kname=kname;
	this.kv1=kv1;
	this.kv2=kv2;
	return this;
}
var typeArr=new Array();
typeArr[0]=new RmsFormat(0,"全部","","");
typeArr[1]=new RmsFormat(1,"信号提示","AF001","");
typeArr[2]=new RmsFormat(2,"标志图例","AF002","");
typeArr[3]=new RmsFormat(3,"法律法规","AF003","");
typeArr[4]=new RmsFormat(4,"安全教育","AF004","");
typeArr[5]=new RmsFormat(5,"应急演练","AF005","");
//typeArr[6]=new RmsFormat(6,"安全专题","AF006","");
var orderArr=new Array();
orderArr[0]=new RmsFormat(0,"最新上传","0","");
orderArr[1]=new RmsFormat(1,"推荐最多","1","");
orderArr[2]=new RmsFormat(2,"人气最高","2","");
orderArr[3]=new RmsFormat(3,"收藏最多","3","");
var timeArr=new Array();
timeArr[0]=new RmsFormat(0,"不限","","");
timeArr[1]=new RmsFormat(1,"三天内","1","");
timeArr[2]=new RmsFormat(2,"一周内","2","");
timeArr[3]=new RmsFormat(3,"一个月内","3","");
timeArr[4]=new RmsFormat(4,"一年内","4","");
var bookTypeArr=new Array();
bookTypeArr[0]=new RmsFormat(0,"全部","","");
bookTypeArr[1]=new RmsFormat(1,"教案参考","RT001","");
bookTypeArr[2]=new RmsFormat(2,"教学课件","RT003","");
bookTypeArr[3]=new RmsFormat(3,"习题检测","RT004","");
bookTypeArr[4]=new RmsFormat(4,"事故案例","RT005","");
bookTypeArr[5]=new RmsFormat(5,"标志图例","RT006","");
bookTypeArr[6]=new RmsFormat(6,"安防知识","RT007","");
bookTypeArr[7]=new RmsFormat(7,"拓展链接","RT008","");
bookTypeArr[8]=new RmsFormat(8,"消防安全","RT009","");
bookTypeArr[9]=new RmsFormat(9,"自然灾害","RT010","");
bookTypeArr[10]=new RmsFormat(10,"食品安全","RT011","");
bookTypeArr[11]=new RmsFormat(11,"交通安全","RT012","");
bookTypeArr[12]=new RmsFormat(12,"其他广播","RT013","");
bookTypeArr[13]=new RmsFormat(13,"安全素材","RT014","");
bookTypeArr[14]=new RmsFormat(14,"文化素材","RT015","");

function playUrl(code)
{
	return rmsIp+"/resplay/rmsPlay.do?data={'rcode':'"+code+"','type':'1','urltypes':'1'}";
}
//翻页
//container 容器，count 总数量， pageindex 当前页数，kpcount 每页显示数
function setPageHtml() 
{
	var container = document.getElementById(rmsPageDiv);
	var count = Math.ceil(rmsAllCount/rmsPagenum);
	var pageindex = rmsPage;
	//alert(pageindex);
	var a = [];
	//onclick=\"javascript:ajaxRmsInfo('"+rmsPath+"','"+kpid+"','"+ktitle+"','"+korder+"','"+kbdate+"','"+kedate+"','"+pageindex+"','"+kpcount+"')\"
	//总页数少于10 全部显示,大于10 显示前3 后3 中间3 其余....
	a[a.length] = "<span class=\"pNum hidden-xs\">页次："+pageindex+"/"+count+" 共"+rmsAllCount+"条</span>";
	//a[a.length] = "<li><a href=\"javascript:void(0);\">&laquo;</a></li>";
    
    
    
	a[a.length] = "<li><a>首页</a></li>";
    a[a.length] = "<li><a>上一页</a></li>";

	function setPageList() 
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
		setPageList();
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
			rmsPage=1;
			
			pageQuery();
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
			rmsPage=inx;
			
			pageQuery();
			//ajaxRmsInfo(rmsPath,kpid,ktitle,korder,kbdate,kedate,inx,kpcount);
			return false;
		};
		for (var i = 2; i < oAlink.length - 2; i++) 
		{ //点击页码
			oAlink[i].onclick = function() 
			{
				inx = parseInt(this.innerHTML);
				//setPage(container, count, inx);
				rmsPage=inx;
				pageQuery();
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
			rmsPage=inx;
			pageQuery();
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
			rmsPage=count;
			pageQuery();
			return false;
		};
  } ();
}
function viewRmsTime(indx)
{
	defaultTime=indx;
	var s="";
	if(timeArr)
	{
		for(var i=0;i<timeArr.length;i++)
		{
			
			var f="";
			if(indx==timeArr[i].kv1)
			{
				f=" class=\"select_now\" ";
			}
			s+="<a "+f+" onclick=\"javascript:clickRmsTime('"+timeArr[i].kv1+"');\" href=\"javascript:void(0);\">"+timeArr[i].kname+"</a>";
		}
	}
	$("#divRmsTime").html(s);
}
function clickRmsTime(indx)
{
	viewRmsTime(indx);
	rmsPage=1;
	pageQuery();	
}
function viewRmsType(indx)
{
	defaultType=indx;
	var s="";
	if(typeArr)
	{
		for(var i=0;i<typeArr.length;i++)
		{
			
			var f="";
			if(indx==typeArr[i].kv1)
			{
				f=" class=\"select_now\" ";
			}
			s+="<a "+f+" onclick=\"javascript:clickRmsType('"+typeArr[i].kv1+"');\" href=\"javascript:void(0);\">"+typeArr[i].kname+"</a>";
		}
	}
	$("#divRmsType").html(s);
}
function clickRmsType(indx)
{
	viewRmsType(indx);
	rmsPage=1;
	pageQuery();
}
function viewRmsOrder(indx)
{
	defaultOrder=indx;
	var s="";
	if(orderArr)
	{
		for(var i=0;i<orderArr.length;i++)
		{
			
			var f="";
			if(indx==orderArr[i].kv1)
			{
				f=" class=\"sel\" ";
			}
			s+="<li "+f+"><a onclick=\"javascript:clickRmsOrder('"+orderArr[i].kv1+"');\" href=\"javascript:void(0);\">"+orderArr[i].kname+"</a></li>";
		}
	}
	$("#divRmsOrder").html(s);
}
function clickRmsOrder(indx)
{
	viewRmsOrder(indx);
	rmsPage=1;
	pageQuery();
}