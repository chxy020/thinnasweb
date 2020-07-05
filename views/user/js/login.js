layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    setter: "config"
}).use(['setter','form'], function(){
    // var laydate = layui.laydate;
    var form = layui.form;
    var $ = layui.$;
    var setter = layui.setter;
    var server = setter.baseUrl;

    var saveAccount = false;

    $("#username").val("admin");
    $("#password").val("Zj666");

    var active = {
        forgetPop: function() {
            layer.open({
                type: 2,
                title: '忘记密码',
                area: ['400px', '300px'],
                maxmin: true,
                content: 'forget.html',
                yes: function(index, layero) {
                }
            });
        },
        codeImg:function(){
            console.log("codeImg----");
            getImageCode();
        }
    };

    $('.layadmin-link,.layadmin-user-login-codeimg').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    form.on('checkbox(login-form-checkbox)', function(data){
        var checked = data.elem.checked;
        saveAccount = checked;
    });

    //监听提交
    $("#login").bind('click',function(evt){
        // alert(888)
        // layer.msg(JSON.stringify(data.field),function(){
        //     location.href='./index.html'
        // });
        login();
        return false;
    });

    $("#pwdeye").bind('click',function(){
        if($(this).hasClass("icon-hide")){
            $(this).removeClass("icon-hide");
            $(this).addClass("icon-show");
            $("#password").attr("type","text");
        }else{
            $(this).removeClass("icon-show");
            $(this).addClass("icon-hide");
            $("#password").attr("type","password");
        }
    });

    function saveAccountName(){
        var name = $("#username").val();
        if(saveAccount && name){
            window.localStorage.setItem("__accountname",name);
        }else{
            window.localStorage.setItem("__accountname","");
        }
    }

    function isSaveAccountName(){
        var name = window.localStorage.getItem("__accountname") || "";
        if(name){
            saveAccount = true;
            $("#accountcheckbox").prop("checked",true);
            $("#username").val(name);
        }else{
            saveAccount = false;
            $("#accountcheckbox").prop("checked",false);
        }
        layui.form.render("checkbox");
    }

    function getImageCode(){
        console.log("getImageCode----");
        // http://39.107.249.187:8080/ADMINM/code.do
        var t = new Date().getTime();
        $("#codeImg").attr("src",server + "/ADMINM/code.do?t=" + t);
    }
    
    function login(){
        // KEYDATA格式qwer+用户名+,fh,+密码Q+,fh,+图片验证码
        var username = $("#username").val();
        var password = $("#password").val();
        var code = "qwer"+username+",fh,"+password+"Q"+",fh,"+$("#code").val();
        // data:{KEYDATA:"qweradmin,fh,Zj666Q,fh,zykj",tm:new Date().getTime()},
        console.log(123123)
        $.ajax({
            type: "POST",
            url: server + "/ADMINM/login_login",
            dataType: 'json',
            async: true,
            data: {KEYDATA:code,tm:new Date().getTime()},
            xhrFields: {
                withCredentials: true
            },
            // xhrFields: {
            //     withCredentials: true
            // },
            // contentType: "application/json;charset=utf-8",
            // data: JSON.stringify({
            //     "KEYDATA":"qweradmin,fh,Zj666Q,fh,zykj"
            // }),
            // data:{
            //     KEYDATA:"qweradmin,fh,Zj666Q,fh,zykj"
            // },
            //成功的回调函数
            success: function (data) {
                var msg = "";
                if("success" == data.result){
                    saveAccountName();

                    location.href = "../index.html"
                    // window.location.href="main/index";
                    // alert("登录成功");
                    return;
                }else if("usererror" == data.result){
                    msg = "用户名或密码有误";
                }else if("codeerror" == data.result){
                    msg = "验证码输入有误";
                }else{
                    msg = "缺少参数";
                }
                layer.msg(msg);
            },
            error: function (error) {
                console.log(error)
            }
        });

    }

    isSaveAccountName();
    getImageCode();
});
