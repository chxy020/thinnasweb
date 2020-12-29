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
    
    // var filePath = "";
    // var fileId = "";

    var userInfo = {};
    function getUserInfo(userid){
        var user = window.sessionStorage.getItem("__userinfo") || "";
        if(user){
            user = JSON.parse(user);
            $("#userId").val(user.userId);
            userInfo = user;
        }else{
            top.location.href = setter.loginUrl;
        }
    }
    
    getUserInfo();

    //监听提交
    form.on('submit(submit)', function(data){
        updateUserImage();

        return false;
    });

    

    function updateUserImage(){
        layer.load(2);

        var url = server + "/ADMINM/user/updateUserImage";
        
        var formdata = new FormData(document.getElementById("form"))

        $.Ajax({
            async: false,
            url: url,
            method: 'post',
            data:formdata,
            processData:false,   //  告诉jquery不要处理发送的数据
            contentType:false,   // 告诉jquery不要设置content-Type请求头
            success: function(obj) {
                layer.closeAll();
                
                if(obj.code == 0){
                    layer.msg("修改成功");


                    setTimeout(function(){
                        //刷新父页面
                        window.parent.location.reload();
                        var index = parent.layer.getFrameIndex(window.name);
               		    parent.layer.close(index);
                    },500);
                }else{
                    layer.msg(obj.msg || "添加失败");
                }
            }
        });
    }


});