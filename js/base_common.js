/* 存放App端公共方法 */

//forEach还是map在IE6-8下都不兼容（不兼容的情况下在Array.prototype上没有这两个方法）,那么需要我们自己封装一个都兼容的方法，代码如下：
/**
 * map遍历数组
 * @param callback [function] 回调函数；
 * @param context [object] 上下文；
 */
Array.prototype.myMap = function myMap(callback, context) {
	context = context || window;
	if ('map' in Array.prototye) {
		return this.map(callback, context);
	}
	//IE6-8下自己编写回调函数执行的逻辑
	var newAry = [];
	for (var i = 0, len = this.length; i < len; i++) {
		if (typeof callback === 'function') {
			var val = callback.call(context, this[i], i, this);
			newAry[newAry.length] = val;
		}
	}
	return newAry;
}
/**
 * forEach遍历数组
 * @param callback [function] 回调函数；
 * @param context [object] 上下文；
 */
Array.prototype.myForEach = function myForEach(callback, context) {
	context = context || window;
	if ('forEach' in Array.prototye) {
		this.forEach(callback, context);
		return;
	}
	//IE6-8下自己编写回调函数执行的逻辑
	for (var i = 0, len = this.length; i < len; i++) {
		callback && callback.call(context, this[i], i, this);
	}
}

/* 获取公共url后追加参数信息 */
function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[
		1].replace(/\+/g, '%20')) || null;
}

//获取url参数 兼容某些带#url
function getURLParameterArgument(_arg) {
	var realUrl = decodeURIComponent(window.location.href)
	var _t = realUrl.split("?")
	if (_t.length > 1) {
		var reg = new RegExp("(^|&)" + _arg + "=([^&]*)(&|$)");
		var r = _t[1].match(reg);
		if (r != null) return unescape(r[2]).replace(/\+/g, '%20');
		return "";
	}
	return "";
}

function getGenderString(string) {
	if ((string == "男") || (string == "Y") || (string == "1")) {
		return "男";
	} else if ((string == "女") || (string == "N") || (string == "0")) {
		return "女";
	}
	return "未知";
}

//将图片压缩转成base64 
function getBase64Image(img) {
	img.crossOrigin = 'anonymous';
	var canvas = document.createElement("canvas");
	var width = img.width;
	var height = img.height;
	// calculate the width and height, constraining the proportions 
	if (width > 1000) {
		height = height / 1.5;
		width = width / 1.5;
	}

	if (height > 1000) {
		height = height / 1.5;
		width = width / 1.5;
	}

	canvas.width = width; /*设置新的图片的宽度*/
	canvas.height = height; /*设置新的图片的长度*/

	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, width, height); /*绘图*/

	var dataURL = canvas.toDataURL("image/png", 1);
	return dataURL.replace("data:image/png;base64,", "");
}

function convertBase64UrlToBlob(urlData) {
	var bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte
	//处理异常,将ascii码小于0的转换为大于0
	var ab = new ArrayBuffer(bytes.length);
	var ia = new Uint8Array(ab);
	for (var i = 0; i < bytes.length; i++) {
		ia[i] = bytes.charCodeAt(i);
	}
	return new Blob([ab], {
		type: 'image/png'
	});
}
// ----------------------------验证
// 验证中文名称
function isChinaName(name) {
	var pattern = /^[\u4E00-\u9FA5]{1,6}$/;
	return pattern.test(name);
}

// 验证手机号
function isPhoneNo(phone) {
	if (phone.length == 11) {
		// var pattern = /^1[34578]\d{9}$/;
		// return pattern.test(phone);
		return true; //跟平台保持一致,只验证11位
	}
	return false;
}

// 验证身份证 
function isCardNo(card) {
	var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	return pattern.test(card);
}
//验证是否是数字金额
function isMoney(number) {
	var patrn = /^\d+(\.\d+)?$/;
	var result = true;
	if (!patrn.test(number)) {
		result = false;
	}
	return result;
}

function randomRange(start, end) {
	//x上限，y下限     
	var x = end;
	var y = start;
	var rand = parseInt(Math.random() * (x - y + 1) + y);
	return rand;
}


/** 密钥,规则详看showdoc
 * */
function setSecretKey() {
    var array = [],
        sum = 0,
        realStr = '';

    for (var i = 0; i < 7; i++) {
        var randomNumber = randomRange(0, 9)
        sum += randomNumber
        realStr += randomNumber
        // array.push(randomNumber.toString())
    }
    var lastValue = sum % 9
    realStr += lastValue
    localStorage.setItem('localSecretKey', realStr)
}

function getRealSecretKey(timestamp) {
	var key = localStorage.getItem('localSecretKey').toString()
	// array.push(lastValue.toString())
	key += timestamp

	var secretKey = key.split('')
	secretKey.sort(function(a, b) {
		return a - b
	}).reverse()
	var realSecretKey = secretKey.slice(0, 16)
	return realSecretKey.join('')
}
/** 获取密钥
 * */
function getSecretKey() {
	var realSecretKey = localStorage.getItem('localSecretKey')
	if (realSecretKey == null || realSecretKey == undefined || realSecretKey.length <= 0) {
		return ""
	}
	return realSecretKey.toString()
}

// 这些人进来，都是统一为当前用户投保，筛选一下
function filterInsuredPeopleCurrentUser() {
	var localRealusertype = localStorage.getItem('usertype')
	if (localRealusertype == '40' || localRealusertype == '60') {
		return false
	}
	return true
}
// if(os.isAndroid || os.isPhone){alert("-----");}
//判断当前终端
var os = function() {
	var ua = navigator.userAgent,
		isWindowsPhone = /(?:Windows Phone)/.test(ua),
		isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
		isAndroid1 = /(?:android)/.test(ua),
		isAndroid = /(?:Android)/.test(ua),
		isFireFox = /(?:Firefox)/.test(ua),
		isChrome = /(?:Chrome|CriOS)/.test(ua),
		isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(
			ua)),
		isIos = /(?:ios)/.test(ua)||/(?:iOS)/.test(ua),
		isPhone = /(?:iPhone)/.test(ua) && !isTablet,
		isPc = !isPhone && !isAndroid && !isSymbian && !isIos && !isAndroid1;
	return {
		isTablet: isTablet,
		isPhone: isPhone || isIos,
		isAndroid: isAndroid || isAndroid1,
		isPc: isPc
	};
}();


//图片等比缩放
// 1.按宽度250压缩,不限制高度 按比例压缩 οnlοad="autoResizeImage(250,0,this)"
// 2.按高度250压缩,不限制宽度 按比例压缩 οnlοad="autoResizeImage(0,250,this)" 
// 3.按高度250宽度250 按比例压缩 οnlοad="autoResizeImage(250,250,this)"
// 4.高宽不等比例压缩 （400 X 512）,此时高度不变，会自动按高度的比例压缩。οnlοad="autoResizeImage(400,512,this)"
// 5.高宽不等比例压缩 （300 X 600）,此时宽度不变，会自动按宽度的比例压缩。οnlοad="autoResizeImage(300,600,this)"
// 6.如果图片本来的高度和宽度小于压缩的最大高度和宽度，则不会拉大显示图片（按原图显示 原图444 x 207,压缩为 500 x 600,将保持原图显示 οnlοad="autoResizeImage(500,600,this)"
function autoResizeImage(maxWidth, maxHeight, objImg) {
	var img = new Image();
	img.src = objImg.src;
	var hRatio;
	var wRatio;
	var Ratio = 1;
	var w = img.width;
	var h = img.height;
	wRatio = maxWidth / w;
	hRatio = maxHeight / h;
	if (maxWidth == 0 && maxHeight == 0) {
		Ratio = 1;
	} else if (maxWidth == 0) { //
		if (hRatio < 1) Ratio = hRatio;
	} else if (maxHeight == 0) {
		if (wRatio < 1) Ratio = wRatio;
	} else if (wRatio < 1 || hRatio < 1) {
		Ratio = (wRatio <= hRatio ? wRatio : hRatio);
	}
	if (Ratio < 1) {
		w = w * Ratio;
		h = h * Ratio;
	}
	objImg.height = h;
	objImg.width = w;
}
/*
		changeURLPar()函数参数说明：
			uri:需要改变的链接
			par:需要改变或者曾加的参数名称
			par_value:需要改变或者曾加的参数值

	*/
function changeURLPar(uri, par, par_value) {
	var pattern = par + '=([^&]*)';
	var replaceText = par + '=' + par_value;
	if (uri.match(pattern)) { //如果连接中带这个参数
		var re = eval('/(' + par + '=)([^&]*)/gi');
		var tmp = uri.replace(re, par + '=' + par_value);
		return (tmp);
	} else {
		if (uri.match('[\?]')) { //如果链接中不带这个参数但是有其他参数
			return uri + '&' + replaceText;
		} else { //如果链接中没有带任何参数
			return uri + '?' + replaceText;
		}
	}
	return uri + '\n' + par + '\n' + par_value;
}

function delUrlParams(url, name) {
	//根据#号拆分
	var poundArr = url.split('#')
	//？拆分
	var questionArr = []
	if (poundArr) {
		//把#接上
		poundArr.forEach(function (element, index) {
		  if (index > 0) {
		    element = '#' + element;
		  }
		
		  var tempArr = element.split('?');
		
		  if (!tempArr) {
		    return true;
		  }
		
		  tempArr.forEach(function (item, idx) {
		    //保留问号
		    if (idx > 0) {
		      item = '?' + item;
		    }
		
		    questionArr.push(item);
		  });
		});
	} else {
		questionArr = url.split('?')
		if (questionArr) {
			questionArr.forEach(function (item, idx) {
			  if (idx > 0) {
			    item = '?' + item;
			  }
			});
		}
	}

	if (!questionArr) {
		return url
	}

	//&符号的处理
	var andArr = []
	questionArr.forEach(function (item, index) {
	  var andIdx = item.indexOf('&');
	
	  if (andIdx <= -1) {
	    andArr.push(item);
	    return true;
	  }
	
	  var tempAndArr = item.split('&');
	  tempAndArr.forEach(function (ele, idx) {
	    if (idx > 0) {
	      ele = '&' + ele;
	    }
	
	    andArr.push(ele);
	  });
	});

	var newUrl = ''
	andArr.forEach(function (item) {
	  var nameIndex = item.indexOf(name + '='); //不拼接要删除的参数
	  if (nameIndex > -1) {
	    //保留第一个问号
	    var questionIdx = item.indexOf('?');
	
	    if (questionIdx == 0) {
	      newUrl += '?';
	    }
	
	    return true;
	  }
	
	  newUrl += item;
	});
	return newUrl.replace(/\?\&/g, "?")
}

//更新颜色,常瑞和设计的左右结构 请选择 按钮
function updateDefaultBtnColor(val) {
	var str = $(val).text().replace(/\s+/g, "");
	if (str == "") {
		str = "请选择";
	}
	var defaultStr = "请选择";
	if (str == defaultStr) {
		$(val).css("color", "#bbbbbb");
		$(val).text(defaultStr)
	} else {
		$(val).css("color", "#666666");
	}
}
//请求返回数据为空或失败显示的空页面
function commonShowRequestErrorEmpty(appendDom, errorMsg, isNetwork, isShowRetry, func) {
	var imgpath = "../../common/app/images/nopage/img_noList.png";
	if (isNetwork == false) {
		imgpath = "../../common/app/images/nopage/img_noNetwork.png"
	}
	//空页面[接口请求失败]
	$.Empty.showEmptyView({
		"imgPath": imgpath,
		"errorMsg": errorMsg,
		"isShowMsg": true,
		"isShowRetry": isShowRetry,
		"appendDom": appendDom
	}, function() {
		//重新刷新数据
		if (func) {
			func()
		}
	});
}
//设置 常瑞设计的统一左侧带有蓝色滑块小图标的顶部颜色区域
function setCustomSectionColor(val) {
	// 给secion-title格式的增加顶部间隔，UI上呈现
	var sectionHeader = $('.section-title');
	if (sectionHeader.length > 0) {
		for (var i = 0; i < sectionHeader.length; i++) {
			if (val > 0) {
				if (i > 0 && i < sectionHeader.length) {
					var target = sectionHeader[i];
					$(target).css("border-top", "5px solid rgb(239,239,244)");
				}
			} else {
				if (i < sectionHeader.length) {
					var target = sectionHeader[i];
					$(target).css("border-top", "5px solid rgb(239,239,244)");
				}
			}

		}
	}
}

function generateUUID() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return uuid;
};

// AES解密方法
function aesDecrypt(word, timestamp) {
	//获取密钥
	var cachek = getRealSecretKey(timestamp)
	var key = CryptoJS.enc.Utf8.parse(cachek);
	var encryptedHexStr = CryptoJS.enc.Hex.parse(word);
	console.log(encryptedHexStr)
	var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
	var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return decryptedData.toString(CryptoJS.enc.Utf8);
}

// AES加密方法
function aesEncrypt(word, timestamp) {
	//获取密钥
	var cachek = getRealSecretKey(timestamp)
	var key = CryptoJS.enc.Utf8.parse(cachek);
	var encrypted = CryptoJS.AES.encrypt(word, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return encrypted.ciphertext.toString();
}

// 获取真实显示的价格单位
function getRealShowPriveCycleString(val) {
	if (val == 'Y' || val == 'y' || val == '年') {
		return '年'
	} else if (val == 'M' || val == 'm' || val == '月') {
		return '月'
	} else if (val == 'D' || val == 'd' || val == '日') {
		return '日'
	}

}

// 复制内容到粘贴板
function clipboard(string) {
	const input = document.createElement('input');
	document.body.appendChild(input);
	input.setAttribute('readonly', 'readonly');
	input.setAttribute('value', string);
	input.setSelectionRange(0, 99999);
	if (document.execCommand('copy')) {
		document.execCommand('copy')
		mui.toast("复制成功！");
	}
	document.body.removeChild(input);
}

/**数组根据数组对象中的某个属性值进行排序的方法
 * 使用例子：newArray.sort(sortBy('number',false)) //表示根据number属性降序排列;若第二个参数不传递，默认表示升序排序
 * @param attr 排序的属性 如number属性
 * @param rev true表示升序排列，false降序排序
 * */
function sortBy(attr, rev) {
	//第二个参数没有传递 默认升序排列
	if (rev == undefined) {
		rev = 1;
	} else {
		rev = (rev) ? 1 : -1;
	}

	return function(a, b) {
		a = a[attr];
		b = b[attr];
		if (a < b) {
			return rev * -1;
		}
		if (a > b) {
			return rev * 1;
		}
		return 0;
	}
}


// 刷新处理
function weiXinRefresh() {
	var isPageHide = false;
	window.addEventListener('pageshow', function() {
		if (isPageHide) {
			console.log("页面刷新")
			//window.location.href = location.href+'?time='+((new Date()).getTime());(会导致两级页面无法后退)
			window.location.reload();
		}
	});
	window.addEventListener('pagehide', function() {
		isPageHide = true;
	});
}

/* 判断是否是微信内打开 */
function isWeiXin() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false;
	}
}
/* App页面后退方法 */
function xa_appGoBack(isBack) {
	// if (isWeiXin()) {
	// 	//alert("weixin");
	// 	console.log("weixin");
	// 	location.href = document.referrer;
	// } else {
		console.log("no weixin");
		//alert("no weixin");
		history.go(-1);
		if (isBack) {
			//在ajax请求内调用history.go(-1)偶现不起作用，需要再back一次才可正常使用，不清楚为什么 专项检查设置不检查页出现此现象???
			history.back();
		}
	// }
}
