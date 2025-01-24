var _loginState = null; // 获取登陆状态的定时器
var _is_have_account = null; // 判断是否有多个账号的延时器
setSecretKeyStatic();

Vue.component('qr_code', {
    // 声明 props 属性值不能使用大写
    props: {
        _verification_img: {
            type: String,
            default: system.usercenter + "/common/code.jsp?" + new Date().getTime()
        },
        qr_code_img: {
            type: String,
            default: system.usercenter + "/admin/getLoginQrcode.action?time=" + new Date().getTime()
        },

        is_show_qrcode: {
            type: Boolean,
            default: true
        },

        type: {
            type: Boolean,
            default: true
        },

        is_email: {
            type: Boolean,
            default: true
        },
    },
    template: `
        <div style="position: relative">
        <div class="wx_bg" v-if="isweixin()" style="background: rgba(0,0,0,0.7);  width: 350px;  height: 418px;
  top: -10px;  position: absolute;  left: -25px;  z-index: 999;  display: flex;  justify-content: center;  align-items: center;    color: #fff;">请使用谷歌浏览器访问页面！</div>
            <div class="u_login_ok" v-if="is_logined">
                <div>
                    <div class="userheadimg"><img :src="user_img"></div>
                    <h6>欢迎您</h6>
                    <h5>{{user_name}}</h5>
                    <h4><i class="iconfont icon_success"></i>登录成功!</h4>
                </div>
                <div class="btn_user">
                    <a @click="user_center()"><i class="iconfont icon_usermine"></i>个人中心</a>
                    <a href="#" @click="login_out()"><i class="iconfont icon_exit"></i>退出登录</a>
                </div>
            </div>            

            <ul class="nav nav-tabs" role="tablist" v-if="!is_logined">
                <li @click="is_qrcode_login(0)" role="presentation" :style="{'width': hasweixin ? '33%': '50%' }" id="account_login"><a href="#home1" aria-controls="home1" role="tab" data-toggle="tab" type="0">账号登录</a></li>
                <li v-show="is_show_qrcode" @click="is_qrcode_login(1)" :style="{'width': hasweixin ? '33%': '50%' }" class="active" role="presentation"id="qrcode_login"><a href="#profile1" aria-controls="profile1" role="tab" data-toggle="tab" type="1">APP登录</a></li>
                <li @click="is_qrcode_login(2)" style="width: 33%" :style="{'display': hasweixin ? 'block': 'none' }" role="presentation"><a href="#profile2" aria-controls="profile2" role="tab" data-toggle="tab"  type="2" >微信扫码</a
        >
      </li>
            </ul>

            <div class="tab-content" v-show="!is_logined">
                <form role="tabpanel" class="tab-pane fade" id="home1" :class="login_type == 0 ? 'active in': ''" method="post">
                    <ul class="login_input">
                        <li>
                            <div class="inputbox username">
                                <input v-model="account" type="text" name="user.username" id="account" :placeholder="is_email?'账号/邮箱/手机号':'账号/手机号'" @blur="blurInput" @keydown="buKeyDown($event)">

                                <span id="cancel_text" @click="clear_input()">清空</span>
                            </div>
                        </li>

                        <li>
                        <div class="inputbox" :class="userIsFirst ? 'yzcode' : 'password'" :style="userIsFirst?{width: '210px'}:''">
              <input name="user.password" id="password" :type="userIsFirst? 'text':(passShow?'text':'password')" :placeholder="userIsFirst? '发送验证码' :'密码'" @keydown="buKeyDown($event)"/>
              <a class="forget" v-if="!userIsFirst"  style="color:#999!important" @click="showPass()"><i style="font-size:28px" class="iconfont-common" :class="passShow?'icon-yanjing-zhengyan':'icon-yanjing-biyan'"></i></a>
              <a class="right-box" v-else @click="getVerificationCode" style="position: absolute;right: -90px;line-height: 45px;background: #3d75da;padding: 0 10px;color: #fff!important;top: 0;">{{yzcodeValue}}</a>
            </div>
                        </li>
                        <span v-if="userIsFirst && phone"  style="font-size: 10px; color: #999">{{phoneshow}}</span>
                        <div class="schoolBox" v-show="is_show_school_lit">
                            <span v-for="(school,index) in school_list" @click="selSchool(school.usercode,school)">{{school.username}}({{school.role}})</span>
                        </div>
                        <li>
                            <input type="checkbox" id="readagree">已阅读并同意
                            <a
                            style="color: #3075dc;" 
                            class="agreebtn" 
                            target="agreementiframe" 
                            @click="showAgreementInfo('/client/serviceagreement.jsp')">《用户协议》</a>和<a
                            style="color: #3075dc;"
                            class="agreebtn" 
                            target="agreementiframe"
                            @click="showAgreementInfo('/client/privacypolicy.jsp')">《隐私政策》</a>
                        </li>

                        <li class="err_msg" v-if="err_msg">
                            <span>{{err_msg}}</span>
                        </li>

                        <li @click="_loginBtnClickNew()">
                            <a class="btn btn-block btn-primary">登录</a>
                        </li>

                        <li class="clearfix" style="padding-bottom:15px; ">
                        <a class="pull-left" @click="forgetPassword()">忘记密码</a>
                            <a class="pull-right" data-toggle="modal" data-target="#myModal2">登录帮助</a>
                        </li>
                    </ul>
                </form>

                <div role="tabpanel" class="tab-pane fade" :class="login_type == 1 ? 'active in': ''" id="profile1" v-show="(login_status == 0) || login_status == 3">
                    <div class="loginewm">
                        <div class="ewmcode" style="position: relative">
                            <img :src="qr_code_img" id="qrcodeImg">

                            <div class="qrcodeMask" v-show="login_status == 3">
                                <div class="qrcodeInval">
                                    <span>二维码已失效</span>
                                    <a style="color: #fff;font-size: 13px;padding: 4px 8px;background: #3075dc;" @click="_refish()">请点击刷新</a>
                                </div>
                            </div>
                        </div>

                        <p>打开<a href="#" class="download"> {{phone_client}}客户端 </a> 扫描二维码</p>
                    </div>
                    <div class="qr-coagent">
                        <ul>
                            <li><b></b><em>免输入</em></li>
                            <li><b class="faster"></b><em>更快&nbsp;</em></li>
                            <li><b class="more-safe"></b><em>更安全</em></li>
                            <div class="clearfix"></div>
                        </ul>
                    </div>
                </div>

                <div class="_checkLoginType_qrcode_sure">
                    <img id="qrcodeToSureImg" :src="system.static + 'service/safeportal/quanguo/newportal/assets/img/code2_ok.png'"/>
                    <div class="center">扫描成功</div>
                    <div class="center" style="color: #777;text-align: center;display: block;font-size: 15px;margin-bottom: 15px;">请在手机上登录</div>
                    <div style="width: 100%;color: #3498db" class="center" @click="backQrcode()">返回二维码登录</div>
                </div>
                <div id="profile2" class="tab-pane wxbox" :class="login_type == 2 ? 'active in': ''"></div>
            </div>

            <div class="agreementInfoBox">
                <div class="agreementIframeBox">
                    <span @click="closeIframe()">确定</span>
                    <iframe width="100%" height="90%" id="agreementIframe"> 
                </div>
            </div>
        </div>
	`,

    data: function () {
        return {
            login_status: 0,
            school_list: [],
            is_show_school_lit: false,
            account: "",
            is_logined: false,
            user_img: updateNullString(aesDecryptStatic("headimageurl"), ""),
            user_name: "",
            phone_client: "",
            verifyurl: 0,
            err_msg: "",
            user_info: null,
            imgurl: "",
            miniimgurl: "",
            block_y: null,
            imgSends: null,
            chenckMoveid: null,
            passShow: false, //密码显示隐藏
            login_type: 1, // 当前显示
            yzcodeValue: '免费获取验证码',
            phone: null, // 当前用户电话
            phoneshow: '',
            obj: null,
            wait: 300,
            hasweixin: false,
            userIsFirst: false
        }
    },

    mounted: function mounted() {
        // 判断system里面有值且usercenter有值，没有就跳转到后端对应接口
        if(!window.system  || window.system == {}|| !window.system.usercenter) {
            window.location.href = window.location.origin + '/service/usercenter/v1/noCheckToken/checkSystem';
        }
        this.err_msg = updateNullString(getURLParameter("showmessage"), "");
        // this.err_msg = updateNullString(getURLParameter("showmessage"), "");
        if (!this.user_img) {
            this.user_img = system.static + "/static/common/app/images/main_avatar.png"
        }
        // 获取弹出参数
        // this.remindMessage();
        // 获取微信参数
        this.getWeixin();
        if ($.cookie("password")) {
            $("#record_possword").attr("checked", "");
            this.account = $.cookie("usercode");
            $("#password").val($.cookie("password"));
        }
        // 调用获取用户信息，判断用户是否已经登陆
        this.is_login();
        this.phone_client = commonconfig.phone_client;
        var that = this;
        if (!isEmpty(this.err_msg)) {
            setTimeout(function () {
                // that.showAccountLogin();
            }, 200);
        }
        console.log(this.type);
        // if (!this.type) {
        //     $("#home1")[0].className = "tab-pane fade active in"
        //     $("#profile1")[0].className = "tab-pane fade"
        // } else {
        //     $("#home1")[0].className = "tab-pane fade"
        //     $("#profile1")[0].className = "tab-pane fade active in"
        // }
    },

    methods: {
        // 微信浏览器禁止登录
        isweixin () {
            var ua = navigator.userAgent.toLowerCase();
            var isWeixin = ua.indexOf('micromessenger') != -1;
            return isWeixin;
        },
        // 密码显示隐藏
        showPass () {
            this.passShow = !this.passShow;
        },
        // 清空输入框
        clear_input() {
            $("#account").val('');
            this.account = "";
        },
        //获取验证码
        getVerificationCode() {
            // 免费获取验证码
            this.yzcodeValue = '发送中...'
            this.setSecretKey();
            var secret = getSecretKey();
            var timestamp = new Date().getTime(); // 毫秒时间戳
            var json = aesEncrypt(this.phone, timestamp);
            var paramDic = {
                'phone': json,
                'secret': secret,
                'timestamp': timestamp
            };
            var url = system.newusercenter + "/pay/getVerificationCode";
            let that = this;
            $.ajax({url:url, type: 'post', data: JSON.stringify(paramDic),contentType: 'application/json',success:function(result){
                console.log(result, '11111111111111');
                    if (result.ret) {
                        alert('发送验证码成功!');
                        that.timeBtn(that.wait);
                    } else
                    {
                        alert(result.msg || '验证码发送异常');
                        that.yzcodeValue = '重新发送'
                    }
                }});
            // jQuery_Request_Post(url, paramDic, "json", false, function (responseData) {
            //     if (responseData.ret) {
            //         this.$message({
            //             message: '发送验证码成功!',
            //             type: 'success',
            //             showClose: true
            //         });
            //         this.timeBtn(this.wait);
            //     } else
            //     {
            //         this.$message({
            //             message: res.msg || '验证码发送异常',
            //             type: 'warning'
            //         });
            //         this.yzcodeValue = '重新发送'
            //     }
            // }, function (error) {
            //     console.log(error);
            // })
        },
        //验证码倒计时
        timeBtn(t) {
            if (this.wait == 0) {
                this.yzcodeValue="免费获取验证码";
                this.wait = 300;
                if(timeOut){
                    clearTimeout(timeOut)
                }
            } else {
                this.yzcodeValue="重新发送(" + this.wait + ")";
                this.phoneshow = '短信验证码已发送到' + this.phone.substr(0,3) + '*****' + this.phone.substr(7, 4);
                this.wait--;
                if(this.wait==0){
                    this.yzcodeValue="免费获取验证码";
                    this.wait = 300;
                    return;
                }
                let that = this;
                this.timeOut = setTimeout(()=>{
                    that.timeBtn(that.wait)
                },1000)
            }
        },
        // 账号框失去焦点
        blurInput (val) {
            // 没输入密码（不处理浏览器自动填入密码的情况，改情况理解为不是第一次登录）
                console.log('blurInput', val);
                this.setSecretKey();
                const timestamp = new Date().getTime(), // 毫秒时间戳
                    secret = getSecretKey(),
                    username = aesEncrypt($('#account').val(), timestamp);
                let params = {
                    username: username,
                    secret: secret,
                    timestamp:timestamp
                };
                let that = this;
                var url = system.newusercenter + "/v1/slide/checkUserFirstLogin";
                jQuery_Request_Post(url, params, "json", false, function (responseData) {
                        if (responseData.ret) {
                            let data = responseData.data;
                            if (data.checkUserFirstLogin) {
                                that.userIsFirst = true;
                                that.phone = aesDecrypt(data.phone, timestamp);
                                $('#password').val('');
                            } else {
                                that.userIsFirst = false;
                            }
                        }
                }, function (error) {
                    console.log(error);
                })
        },
        // 判断是否记住密码
        is_remmber_pwd(e) {
            if (!e.target.checked) {
                $.cookie("password", "")
            }
        },
        showPass () {
            this.passShow = !this.passShow;
        },
        // 打开页面时判断弹出
        // remindMessage () {
        //     let nowHerf = window.location.href;
        //     let herfL = nowHerf.split('?');
        //     let query = herfL.length>0 ? (herfL[1].split('#')[0].split('&')) : [];
        //     let message = '';
        //     query.forEach((item) => {
        //         let e =item.split('=');
        //         if (e[0] == 'remindMessage') {
        //             message = e[1]
        //         }
        //     })
        //     if (message) {
        //         alert(message);
        //     }
        // },
        // 获取微信配置
        getWeixin () {
            this.setSecretKey();
            const timestamp = new Date().getTime(), // 毫秒时间戳
                secret = getSecretKey();
            let paramDic = {
                code: 'wxlogin',
                secret: secret,
                timestamp: timestamp,
                type: 2
            };
            var url = system.newusercenter + "/v1/codeDict/getCodeDict";
            let that = this;
            jQuery_Request_Post(url, paramDic, "json", false, function (responseData) {
                console.log('wwwwwwwwwwwwwwww', responseData);
                if (responseData.ret) {
                    let weixin = JSON.parse(aesDecrypt(responseData.data, timestamp));
                    console.log('微信配置', weixin);
                    var redirect_uri = encodeURI(weixin.value_1);
                    let host = window.location.host;
                    let noweixinList = weixin.value_4.split(',');
                    let noweixin = noweixinList.findIndex(item => item === host);
                    if (noweixin==-1) {
                        that.hasweixin = true;
                        that.obj = new WxLogin({
                            self_redirect:false,
                            id:"profile2",
                            appid: weixin.value_2,
                            scope: "snsapi_login",
                            redirect_uri: redirect_uri,
                            state: window.location.origin,
                            style: "",
                            href: "https://cdn.ss360.org/upload/logo/wxcss.css"
                        });
                    }
                } else {
                    console.log(responseData.msg);
                }
            }, function (error) {
                console.log(error + '获取微信配置失败');
            });
        },
        // 判断是否是二维码登陆
        is_qrcode_login(login_type) {
            this.login_type = login_type;
            //1是二维码，0,2是账号微信
            if (login_type != 1) {
				$("._checkLoginType_qrcode_sure")[0].style.display = "none";
                clearInterval(_loginState)
            } else {
				// $("._checkLoginType_qrcode_sure")[0].style.display = "flex";
                this._getLoginState();
                clearInterval(_loginState)
                _loginState = setInterval(this._getLoginState, 3000);
            }
        },

        //显示账号登录
        showAccountLogin() {
            $("._checkLoginType_qrcode_sure").hide();
            $("#qrcode_login").removeClass("active");
            $("#account_login").addClass("active");
            $("#profile1").removeClass("active");
            $("#home1").addClass("active");
            $("#home1").addClass("in");
        },

        // 返回登陆二维码
        backQrcode() {
            $("#profile1").show();
            $("._checkLoginType_qrcode_sure").hide();
            this.qr_code_img = system.usercenter + "/admin/getLoginQrcode.action?time=" + new Date().getTime();
            _loginState = setInterval(this._getLoginState, 3000);
        },

        // 当二维码过期的时候，刷新二维码
        _refish() {
            clearInterval(this._getLoginState);
            _loginState = setInterval(this._getLoginState, 3000);
            $("#qrcodeImg").attr("src", system.usercenter + "/admin/getLoginQrcode.action?time=" + new Date().getTime());
            $(".qrcodeMask").hide();
        },

        // 获取登陆状态接口
        // _getLoginState() {
        //     var that = this;
        //     var paramDic = {
        //         "logintype": "0"
        //     };
        //     var url = system.usercenter + "/admin/getLoginStates.action";

        //     jQuery_Request_Post(url, paramDic, "json", true, function (responseData) {
        //         if (responseData.ret) {
        //             that.login_status = responseData.type;
        //             // 根据当前不同的登陆状态展示不同的页面效果
        //             /**
        //              * 0：待扫描
        //              * 1：已扫描，待确认
        //              * 2：登陆成功
        //              */
        //             switch (that.login_status) {
        //                 case "0":
        //                     break;
        //                 case "1":
        //                     $("._checkLoginType_qrcode_sure")[0].style.display = "flex";
        //                     that.$forceUpdate();
        //                     break;
        //                 case "2":
        //                     clearInterval(_loginState);
        //                     $("#home1").attr("action", system.usercenter + "/admin/login.action");

        //                     if (responseData.platlist && responseData.platlist.usercenter && responseData.platlist.usercenter != "") {
        //                         location.href = responseData.platlist.usercenter + "/web/weblogin.action?token=" + responseData.token;
        //                     } else {
        //                         location.href = system.usercenter + "/web/weblogin.action?token=" + responseData.token;
        //                     }

        //                     break;
        //                 default:
        //                     break;
        //             }
        //         } else {
        //             // 展示二维码过期效果
        //             that.login_status == 3;
        //             clearInterval(_loginState);
        //             $(".qrcodeMask")[0].style.display = "flex";
        //         }
        //     }, function (error) {
        //         console.log(error + "获取登陆状态码失败");
        //     })
        // },
        checkUserFirstLogin (paramDic) {
            return new Promise((resolve, reject) => {
                var url = system.newusercenter + "/v1/slide/checkUserFirstLogin";
                jQuery_Request_Post(url, paramDic, "json", true, function (responseData) {
                    resolve(responseData);
                }, function (error) {
                    reject(error);
                })
            })
        },
        getLoginStates() {
            return new Promise((resolve, reject) => {
                var paramDic = {
                    "logintype": "0"
                };
                var url = system.usercenter + "/admin/getLoginStates.action";
                jQuery_Request_Post(url, paramDic, "json", true, function (responseData) {
                    resolve(responseData);
                }, function (error) {
                    reject(error);
                })
            })
        },
        getCodeDict(paramDic) {
            return new Promise((resolve, reject) => {
                var url = system.newusercenter + "/v1/codeDict/getCodeDict";
                jQuery_Request_Post(url, paramDic, "json", true, function (responseData) {
                    resolve(responseData);
                }, function (error) {
                    reject(error);
                })
            })
        },

        // 加密存储用户信息
        saveUserInfo() {
            return new Promise(reslove => {
                this.getUserInfo().then((responseData) => {
                        responseData.username = responseData.nickname;
                        responseData.jobnamess = responseData.role;
                        responseData.usercode = responseData.jid;
                        var userinfo = responseData;

                        for (var key in userinfo) {
                            userinfo[key] = updateNullString(userinfo[key], '');
                        }
                        var timestamp = new Date().getTime();
                        setSecretKeyStatic();
                        window.user_info = userinfo;
                        var information = aesEncryptStatic(JSON.stringify(userinfo), timestamp);
                        sessionStorage.setItem('userinfo', information);
                        sessionStorage.setItem('information', information);
                        sessionStorage.setItem('timestamp', timestamp);
                        reslove(responseData);

                }).catch(error => {
                    alert('catchUserInfo')
                    reslove('');
                });
            });
        },

        getUserInfo () {
            return new Promise((resolve,reject) => {
                window.XaTool.getUserInfo(window.system.newusercenter).then((res) => {
                    resolve(res);
                }).catch(error => {
                    reject(error);
                });
            })
        },

        // 关闭前的回调
        toShowComplate () {
            var actionname = system.usercenter + '/web/completeInfoPage.action';
            top.toshowdiv('完善信息', actionname, 455, 500, function () {
                top.location.href = system.static;
            }, 5);
        },

        // 获取登陆状态接口
        _getLoginState() {
            var that = this;
            var paramDic = {};

            this.getLoginStates(paramDic)
                .then((responseData) => {
                    if (responseData.ret) {
                        that.login_status = responseData.type;

                        // 根据当前不同的登陆状态展示不同的页面效果
                        /**
                         * 0：待扫描
                         * 1：已扫描，待确认
                         * 2：登陆成功
                         */
                        switch (that.login_status) {
                            case '0':
                                break;
                            case '1':
                                // clearInterval(_loginState);
                                $('._checkLoginType_qrcode_sure')[0].style.display = 'flex';
                                break;
                            case '2':
                                this.saveUserInfo().then((res) => {
                                    var local_host = location.host;

                                    if (responseData.data.usercenter.search(local_host) === -1) {
                                        // alert(responseData.data.usercenter);
                                        // alert('账号密码1')
                                        location.href = responseData.data.usercenter;
                                    } else {
                                        // 当前登录用户信息
                                        if (
                                            responseData.data.completeInfo &&
                                            responseData.data.completeInfo == 1
                                        ) {
                                            this.toShowComplate();
                                        } else {
                                            // alert('账号密码2');
                                            console.log(responseData.data.isSignInNewPortal);
                                            location.href = system.static + 'usercenter/#/main/home';
                                            // if (responseData.data.isSignInNewPortal) {
                                            //     location.href = system.usercenter + 'usercenter/#/main/home';
                                            // } else {
                                            //     location.href = system.usercenter + '/admin/adminlogin.action';
                                            // }
                                        }
                                    }
                                });

                                clearInterval(_loginState);
                                break;
                            default:
                                break;
                        }
                    } else {
                        // 展示二维码过期效果
                        // $(".qrcodeMask").show();
                        that.login_status == 3;
                        clearInterval(_loginState);
                        $('.qrcodeMask')[0].style.display = 'flex';
                    }
                })
                .catch((error) => {
                    console.log(error + '获取登陆状态码失败');
                });
        },

        // 选择绑定的学校并回显到页面上
        selSchool(userCode, school) {
            this.user_info = school;
            var local_href = location.href.split("/")[0] + "//" + location.href.split("/")[2];
            var curren_url = school.list.usercenter;
            this.account = userCode;

            $(".schoolBox").hide();
            $("#account").val(userCode);


            // 判断是否需要跳转
            if (this.verifyurl != 0) {
                // 如果拿到的负载地址和当前链接的地址不同，则跳转到拿到的负载地址里
                location.href = curren_url
            }
        },

        // 查看用户协议和隐私政策
        showAgreementInfo(url) {
            this.$emit("show_iframe", system.usercenter + url);
        },

        // 关闭用户协议和隐私政策模态框
        closeIframe() {
            $(".agreementInfoBox").hide();
        },

        // 忘记密码跳转到重置密码页面
        forgetPassword() {
            location.href = system.usercenter + "/web/forgotPassword.action"
        },

        // // 登陆按钮点击方法
        // _loginBtnClick() {
        //     var that = this;

        //     if (!$("#account").val()) {
        //         that.err_msg = "请输入用户名";
        //         return
        //     }

        //     if (!$("#password").val()) {
        //         that.err_msg = "请输入密码";
        //         return
        //     }

        //     if (!$("#vscode").val()) {
        //         that.err_msg = "请输入验证码";
        //         return
        //     }

        //     if (!($('#readagree').is(':checked'))) {
        //         that.err_msg = "请阅读并同意《用户协议》和《隐私政策》";
        //         return
        //     }
        //     // 判断是否需要记住密码
        //     if ($('#record_possword').is(':checked')) {
        //         // $.cookie('password', md5(md5($("#password").val()).toUpperCase()).toUpperCase());
        //         $.cookie('password', $("#password").val());
        //     }
        //     $.cookie('usercode', $("#account").val());
        //     $("#home1").attr("action", system.usercenter + "/admin/login.action");
        //     setTimeout(function () {
        //         // $("#password").val(md5(md5($("#password").val()).toUpperCase()).toUpperCase());
        //         $("#password").val(sha512(md5($("#password").val()).toUpperCase()));
        //         $("#home1").submit();
        //     }, 100);
        // },
        _loginBtnClickNew () {
            // 如果第一次登录
            let that = this;
            if (!$('#readagree').is(':checked')) {
                alert('请阅读并同意《用户协议》和《隐私政策》');
                return;
            }
            if (this.userIsFirst) {
                that._loginBtnClick($('#password').val());
                return;
            };
            if (!$('#account').val()) {
                alert('请输入用户名');
                return;
            }

            if (!$('#password').val()) {
                alert('请输入密码');
                return;
            }
            this.toshowSlide();
        },
        // 登陆按钮点击方法
        _loginBtnClick () {
            // 如果第一次登录
            let that = this;
            if (this.userIsFirst) {
                that.toLoginOk($('#password').val());
                return;
            };
            if (!$('#account').val()) {
            ymPrompt.alert('请输入用户名');
            return;
            }

            if (!$('#password').val()) {
            ymPrompt.alert('请输入密码');
            return;
            }

            if (!$('#readagree').is(':checked')) {
            ymPrompt.alert('请阅读并同意《用户协议》和《隐私政策》');
            return;
            }
            this.toshowSlide();
        },
        // 登录滑块
        toshowSlide () {
            let that = this;
            let encryptPassword = sha512(md5($('#password').val()).toUpperCase());
            let password = updateNullString(encryptPassword, '');
            localStorage.setItem('loginT', JSON.stringify({password: password, username: $('#account').val()}));
            top.toshowdiv("安全验证", '/csafety/usercenter/static/slide_image.html', 450, 370, function (responseData) {
                // that.toLoginOk(left, chenckMoveid);
                if (responseData.ret) {
                    that.dealLoginSuceessData(responseData, function () {
                        if (func) {
                            // 判断是否需要记住密码
                            if ($('#record_possword').is(':checked')) {
                                Cookies.set('password', encryptPassword);
                            }
                        }
                    });
                } else {
                    that.showAlert(responseData.msg);
                }
            }, 8);
        },
        showAlert (msg) {
            alert(msg);
        },
        // 确认登录
        toLoginOk (left, chenckMoveid) {
            let encryptPassword = sha512(md5($('#password').val()).toUpperCase());
            let password = updateNullString(encryptPassword, '');
            this.setSecretKey();
            const timestamp = new Date().getTime(), // 毫秒时间戳
                json = aesEncrypt(left, timestamp),
                name = aesEncrypt($('#account').val(), timestamp),
                npassword = aesEncrypt(password, timestamp),
                secret = getSecretKey(),
                loginType = aesEncrypt('1', timestamp);
            let paramDic = {
                vcode: json,
                secret: secret,
                timestamp: timestamp
            };
            if (this.userIsFirst) {
                paramDic['user.username']= name,
                    paramDic.loginType = loginType
            } else {
                paramDic['user.username']= name,
                    paramDic['user.password'] = npassword;
                paramDic['chenckMoveid'] = this.chenckMoveid
            }
            this.toLogin(paramDic).then((responseData) => {
                console.log(responseData);
                if (responseData.ret) {
                    this.dealLoginSuceessData(responseData, function () {
                        if (func) {
                            // 判断是否需要记住密码
                            if ($('#record_possword').is(':checked')) {
                                Cookies.set('password', encryptPassword);
                            }
                        }
                    });
                } else {
                    ymPrompt.alert(responseData.msg);
                }

            }).catch((error) => {
                // this.verification_img = system.usercenter + '/common/code.jsp?' + new Date().getTime();
                ymPrompt.alert(error)
            });
        },

        toLogin (paramDic) {
            return new Promise((reslove,reject) => {
                var urlString = system.usercenter + "/ajax_web_login.action";
                jQuery_Request_Post(urlString, paramDic, "json", true,function (responseData) {
                        reslove(responseData);
                    },function (error) {
                        reject(error);
                    },
                    {
                        "interceptor": "0"//设置不过拦截器
                    }
                )
            })
        },

        // 处理登录成功后的数据【路由设置、数据存储等】
        dealLoginSuceessData (responseData, func) {
            clearInterval(_loginState);
            if (responseData.ret) {
                if (
                    responseData.data.completeInfo &&
                    responseData.data.completeInfo == 1
                ) {
                    this.toShowComplate();
                } else if (
                    responseData.data.updatepassword &&
                    responseData.data.updatepassword == 1
                ) {
                    location.href = system.usercenter + '/web/ajaxtoEditPwd.action?ids=' + responseData.data.ids;
                } else {
                    this.saveUserInfo().then(() => {
                        var local_host = location.host;
                        if (responseData.data.usercenter.search(local_host) === -1) {
                            location.href = responseData.data.usercenter;
                        } else {
                            setTimeout(() => {
                                // if (responseData.data.isSignInNewPortal) {
                                    location.href = system.static + 'usercenter/#/main/home'
                                // } else {
                                //     // alert('saveUserInfo2');
                                //     location.href = system.usercenter + '/admin/adminlogin.action';
                                // }
                            });
                        }
                    });
                }
            } else {
                this.verification_img = system.usercenter + '/common/code.jsp?' + new Date().getTime();
                // ymPrompt.alert(updateNullString(responseData.msg, '登陆失败'));
            }
        },

        buKeyDown(e) {
            if (e.keyCode == 13) {
                this._loginBtnClickNew();
            }
        },
        setSecretKey() {
            var array = [],
                sum = 0,
                realStr = '';

            for (var i = 0; i < 7; i++) {
                var randomNumber = randomRange(0, 9)
                sum += randomNumber
                realStr += randomNumber
            }
            var lastValue = sum % 9
            realStr += lastValue
            localStorage.setItem('localSecretKey', realStr)
        },

        // 调取用户信息判断用户是否已经登陆
        is_login() {
            var that = this;
            var paramDic = {};
            var showUserCode = updateNullString($.cookie('usercode'), '');

            if (showUserCode.length > 0) {
                paramDic = {
                    "usercode": showUserCode,
                    "token": ''
                };
            }
            window.XaTool.getUserInfo(window.system.newusercenter, showUserCode).then((res) => {
                that.is_logined = true;
                that.user_name = updateNullString(aesDecryptStatic("username"), "");
            }).catch(error => {
                clearInterval(that._getLoginState);
                _loginState = setInterval(that._getLoginState, 3000);
                console.log(error + "获取登陆状态码失败");
            });
        },
        user_center() {
            location.href = system.static + 'usercenter/#/main/home';
        },

        login_out() {
            location.href = system.usercenter + "/admin/quit.action"
        },
    },

    watch: {
        account(n, o) {
            var reg = /^[0-9A-Za-z]+$/;
            if (n.length > 26) {
                ymPrompt.alert('账号最多只能输入26个字符');
            }

            if (reg.test(n) || (!n)) {
                // this._getSchoolList(n);
            } else {
                setTimeout(function () {
                    $("#account").val("");
                    ymPrompt.alert('请输入正确的账号');
                }, 100)
            }
        }
    }
})


