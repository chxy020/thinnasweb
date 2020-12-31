layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form','jquery','tree','util','upload'], function () {
    var $ = layui.$,
    upload = layui.upload,
    setter = layui.setter,
    form = layui.form,
    layer = layui.layer,
    setter = layui.setter,
    router = layui.router(),
    data = '';
    // var server = setter.baseUrl;

    var server = setter.baseUrl;
    var uri = window.location.search;
    
    var user = window.parent.__user;
    
    var userHeadImg = "images/headImg.png";

    function setUserInfoHtml(){
        if(user.headimg != "" && user.headimg.indexOf("headImg.png") == -1){
            $("#headimg").attr("src",user.headimg);
            userHeadImg = user.headimg;
        }
        $("#username").val(user.username);
        $("#roleName").val(user.role.roleName);
        $("#name").val(user.name);
        
    }
    window.parent.__getUserInfo();
    setUserInfoHtml();

    //普通图片上传 头像上传
    // upload.render({
    //     elem: '#test1',
    //     url: server + "/ADMINM/user/uploadHeadImg", 
    //     exts: 'jpg|png|jpeg', //只允许图片
    //     acceptMime:"image/jpg, image/png, image/jpeg",
    //     field:"headImg",
    //     before: function(obj){
    //         //预读本地文件示例，不支持ie8
    //         // obj.preview(function(index, file, result){
    //         //     $('#demo1').attr('src', result); //图片链接（base64）
    //         // });
    //     },
    //     done: function(res){
    //         //如果上传失败
    //         if(res.code == 1){
    //             userHeadImg = res.HEADIMG;
    //             $("#headimg").attr("src",server + res.HEADIMG);
    //         }
    //         //上传成功
    //     },
    //     error: function(){
    //         //演示失败状态，并实现重传
    //         // var demoText = $('#demoText');
    //         // demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
    //         // demoText.find('.demo-reload').on('click', function(){
    //         //     uploadInst.upload();
    //         // });
    //     }
    // });

    
    //监听提交
    form.on('submit(submit)', function(data){
        // alert(888)
        // layer.msg(JSON.stringify(data.field),function(){
        //     location.href='index.html'
        // });
        
        console.log(data.field)
        var condi = {};
        // condi.HEADIMG = userHeadImg;
        condi.name = data.field.name;
        // condi.USER_ID = user.user_ID;
        updateUserInfo(condi);

        return false;
    });


    

    function updateUserInfo(condi){
        condi.userId = user.userId;
        $.Ajax({
            async: false,
            url: server + "/ADMINM/user/update",
            dataType: "json",
            method: 'post',
            data:condi,
            success: function(obj) {
                if(obj.code == 0){
                    layer.msg("修改成功");
                    
                    // user.headimg = obj.HEADIMG;
                    user.name = condi.name;

                    window.sessionStorage.setItem("__userinfo",JSON.stringify(user));

                    window.parent.__getUserInfo();
                    // setTimeout(function(){
                    //     //刷新父页面
                    //     window.parent.location.reload();
                    //     var index = parent.layer.getFrameIndex(window.name);
               		//     parent.layer.close(index);
                    // },1500);
                }else{
                    layer.msg(obj.msg || "修改失败");
                }
            }
        });
    }


    var $ = layui.$,
    active = {
        //更换手机号
        replaceMobile: function() {
            layer.open({
                type: 2,
                title: '更换手机号',
                area: ['420px', '260px'],
                btn: ['确定', '取消'],
                btnAlign: 'c',
                maxmin: true,
                content: 'replaceMobile_pop.html',
                yes: function(index, layero) {
                    var submit = layero.find('iframe').contents().find("#submit");
                    submit.click();
                }
            });
        },
        updateheader:function(){
            layer.open({
                type: 2,
                title: '修改头像',
                area: ['500px', '200px'],
                btn: ['确定', '取消'],
                btnAlign: 'c',
                maxmin: true,
                content: 'header_pop.html',
                yes: function(index, layero) {
                    var submit = layero.find('iframe').contents().find("#submit");
                    submit.click();
                }
            });
        }
    };
    
    //给页面里的layui-dS 绑定事件
    $('.layui-ds').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });


    

});