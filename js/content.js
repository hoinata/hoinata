function ajaxContent(book,kpid,likepid)
{
	if(rmsIp!=null && rmsIp!="")
	{
		$.ajax({
			url: rmsIp+'/ks/getPublicTree.do?listvo.likePid='+likepid+'&listvo.ksPid='+kpid+'&listvo.bookCode='+book+'&listvo.flag=1&jsoncallback=?',
			//url: 'http://192.168.1.122/get_public_roster.action?jid=<s:property value="userCode" />&jsoncallback=?',
			cache:false,
			type: "GET",
			async:false,
			dataType:'json',
			success: function(data)
					{ 
					
					   if(data)
						{
						  
						   viewContent(data);
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
}
function viewContent(data)
{
}
