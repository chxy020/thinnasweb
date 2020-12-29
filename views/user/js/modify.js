layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    setter: "config"
}).use(['setter','form'], function(){
    var form = layui.form;
    var $ = layui.$;
    var setter = layui.setter;
    var server = setter.baseUrl;

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

    $("#pwdeye1,#pwdeye2,#pwdeye3").bind('click',function(){
        if($(this).hasClass("icon-hide")){
            $(this).removeClass("icon-hide");
            $(this).addClass("icon-show");
            $(this).prev().attr("type","text");
        }else{
            $(this).removeClass("icon-show");
            $(this).addClass("icon-hide");
            $(this).prev().attr("type","password");
        }
    });

    getUserInfo();

    //监听提交
    form.on('submit(submit)', function(data){
        console.log(data.field)

        if(data.field.password2 != data.field.password3){
            layer.msg("新密码输入不一致");
            return false;
        }

        var condi = {};
        condi.old_pw = data.field.password1;
        condi.new_pw = data.field.password2;
        condi.userId = userInfo.userId;

        updatePassWord(condi);
        
        return false;
    });

    function updatePassWord(condi){
        $.Ajax({
            async: false,
            url: server + "/ADMINM/user/updatePassWord",
            dataType: "json",
            method: 'post',
            data:condi,
            success: function(obj) {
                if(obj.code == 0){
                    layer.msg("修改成功");
                    logOut();
                    // setTimeout(function(){
                    //     //刷新父页面
                    //     window.parent.location.reload();
                    //     var index = parent.layer.getFrameIndex(window.name);
               		//     parent.layer.close(index);
                    // },500);
                }else{
                    layer.msg(obj.msg || "修改失败");
                }
            }
        });
    }

    function logOut(){
        $.Ajax({
            async: false,
            type: "post",
            // url:server + "/ADMINM/logout",
            url:server + "/ADMINM/login/logout",
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            success: function(obj) {
                if(obj.code == 0){
                    window.sessionStorage.setItem("__userinfo","");
                    top.location.href = setter.loginUrl;
                }else{
                    layer.msg(obj.msg);
                }
            },
            //失败的回调函数
            error: function() {
                console.log("error")
            }
        })
    }
});