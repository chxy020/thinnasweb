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
    
    var user = window.parent.__user || {};
    

    var type = +setter.getUrlParam("t",uri) || "";
    var version = setter.getUrlParam("v",uri) || "";

    var titles = ["","AI存储APP","ThinNAS PC电脑端"];
    var icons = ["","icon-anzhuo","icon-windows"];
    if(type){
        $("#title").html(titles[type]);
        $("#appicon").addClass(icons[type]);
    }
    if(version){
        $("#versionnum").html(version);
    }
    
    $("#username").val("test");

    console.log(user.username,type,version)

    // var userHeadImg = "images/headImg.png";

    // function setUserInfoHtml(){
    //     if(user.headimg != "" && user.headimg.indexOf("headImg.png") == -1){
    //         $("#headimg").attr("src",server + user.headimg);
    //         userHeadImg = user.headimg;
    //     }
    //     $("#username").val(user.username);
    //     $("#role_NAME").val(user.role.role_NAME);
    //     $("#name").val(user.name);
        
    // }
    // setUserInfoHtml();

    
    //监听提交
    form.on('submit(submit)', function(data){
        
        saveApp();
        return false;
    });


    function saveApp(){
        layer.load(2);
        server = "http://139.196.147.194:8084"
        var url = server + "/jqkj/user/updateAppVersion";
        var formdata = new FormData(document.getElementById("form"))
        $.Ajax({
            url: url,
            // dataType: "json",
            method: 'post',
            data:formdata,
            processData:false,   //  告诉jquery不要处理发送的数据
            contentType:false,   // 告诉jquery不要设置content-Type请求头
            success: function(obj) {
                layer.closeAll();

                if(obj.status == 1){
                    layer.msg("上传成功");
                    
                    setTimeout(function(){
                        //刷新父页面
                        window.parent.location.reload();
                        var index = parent.layer.getFrameIndex(window.name);
               		    parent.layer.close(index);
                    },1500);
                }else{
                    layer.msg(obj.msg || "上传失败");
                }
            },
            error:function(){
                layer.closeAll();
            }
        });
    }

    

});