layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    setter: "config"
}).use(['setter','form'], function(){
    // var laydate = layui.laydate;
    var  form = layui.form;
    var $ = layui.$;
    var setter = layui.setter;
    var url = setter.baseUrl;

    var userInfo = {};
    function getUserInfo(userid){
        var user = window.sessionStorage.getItem("__userinfo") || "";
        if(user){
            user = JSON.parse(user);
            userInfo = user;
        }else{
            top.location.href = setter.loginUrl;
        }
    }
    
    getUserInfo();

    var active = {
        smsCode: function() {
            console.log("smsCode--------");
            var phone = $("#phone").val();
            if(phone){
                if(!setter.isTel(phone)){
                    layer.msg("手机号输入错误");
                    return false;
                }
                getSmsCode(phone);
            }else{
                layer.msg("请输入手机号")
            }
            
        }
    };

    $('#LAY-user-getsmscode').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    
    //监听提交
    form.on('submit(submit)', function(data){
        var condi = {};
        var phone = data.field.phone;
        if(!setter.isTel(phone)){
			layer.msg("手机号输入错误");
			return false;
        }
        condi.userId = userInfo.userId;
        condi.code = data.field.code;
        condi.phone = phone;

        updatePhone(condi);
        return false;
    });

    function updatePhone(condi){
        $.ajax({
            async: true,
            type: "post",
            url: url + "/ADMINM/user/updatePhone",
            datatype: 'json',
            data:condi,
            xhrFields: {
                withCredentials: true
            },
            //成功的回调函数
            success: function (obj) {
                if (obj.code == 0) {
                    layer.msg("修改成功");

                    window.sessionStorage.setItem("__userinfo",JSON.stringify(obj.data));

                    setTimeout(function(){
                        //刷新父页面
                        window.parent.location.reload();
                        var index = parent.layer.getFrameIndex(window.name);
               		    parent.layer.close(index);
                    },500);
                }else{
                    layer.msg(obj.data || "修改手机号失败");
                }
            },
            error: function (error) {
                console.log(error);
            }
        })
    }


    function getSmsCode(phone){
        $.ajax({
            async: true,
            type: "post",
            url: url + "/ADMINM/code/sendsms",
            datatype: 'json',
            data:{"phone":phone},
            xhrFields: {
                withCredentials: true
            },
            //成功的回调函数
            success: function (obj) {
                if (obj.code == 0) {
                    
                }else{
                    layer.msg(obj.data || "验证码发送失败");
                }
                smsBtnTimeCount();
            },
            error: function (error) {
                console.log(error);
                smsBtnTimeCount();
            }
        })
    }

    var time = 60;
    function smsBtnTimeCount(){
        $("#LAY-user-getsmscode").attr("disabled","disabled");
        $("#LAY-user-getsmscode").text(time + "秒后重新获取");
        setTimeout(function(){
            time--;
            if(time == 0){
                time = 60;
                $("#LAY-user-getsmscode").removeAttr("disabled");
                $("#LAY-user-getsmscode").text("获取验证码");
            }else{
                smsBtnTimeCount();
            }     
        },1000);
    }
    
});