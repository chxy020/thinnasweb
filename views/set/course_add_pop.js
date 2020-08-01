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

    var fileId = setter.getUrlParam("fileId",uri) || "";
    var fileName = setter.getUrlParam("fileName",uri) || "";
    var filePath = setter.getUrlParam("filePath",uri) || "";
    var isEdit = setter.getUrlParam("isEdit",uri) || "";
    
    if(isEdit){
        $("#filepath").html(filePath.replace("/ADMINM/uploadFiles/file",""));
        $("#NAME").val(fileName);
    }

    //视频
    upload.render({
        elem: '#test5',
        url: server + "/ADMINM/course/uploadFile", //改成您自己的上传接口
        accept: 'video', //视频
        field:"clientFile",
        before:function(){
            layer.load(2);
        },
        done: function(res){
            layer.closeAll();
            // console.log(res)
            if(res.code == 1){
                layer.msg('上传成功');
                $("#filepath").html(res.PATH.replace("/ADMINM/uploadFiles/file",""));
                filePath = res.PATH;
                if(!isEdit){
                    fileId = res.ID;
                }
            }else{
                layer.msg('上传失败');
            }

            // ID: "81caf154951d4eaab3d5cbe4c2b99792"
            // PATH: "/ADMINM/uploadFiles/file/81caf154951d4eaab3d5cbe4c2b99792.mp4"
            // code: 1
        }
    });

    //监听提交
    form.on('submit(submit)', function(data){
        // alert(888)
        // layer.msg(JSON.stringify(data.field),function(){
        //     location.href='index.html'
        // });
        
        console.log(data.field)
        if(!filePath){
            layer.msg("没有上传文件");
            return false;
        }
        var condi = {};
        condi.NAME = data.field.NAME;
        condi.PATH = filePath;
        condi.ID = fileId;

        if(isEdit){
            updateCourse(condi);
        }else{
            saveCourse(condi);
        }
        return false;
    });

    

    function saveCourse(condi){
        $.Ajax({
            async: false,
            url: server + "/ADMINM/course/saveCourse",
            dataType: "json",
            method: 'post',
            data:condi,
            success: function(obj) {
                if(obj.code == 1){
                    layer.msg("添加成功");

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

    function updateCourse(condi){

        $.Ajax({
            async: false,
            url: server + "/ADMINM/course/updateCourse",
            dataType: "json",
            method: 'post',
            data:condi,
            success: function(obj) {
                if(obj.code == 1){
                    layer.msg("修改成功");

                    setTimeout(function(){
                        //刷新父页面
                        window.parent.location.reload();
                        var index = parent.layer.getFrameIndex(window.name);
               		    parent.layer.close(index);
                    },500);
                }else{
                    layer.msg(obj.msg || "修改失败");
                }
            }
        });
    }
    

});