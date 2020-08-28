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
    
    var types = ["","硬件故障","软件故障","硬件使用障碍","软件使用障碍","优化建议","投诉反馈","其它"];
    var imgpaths = [];

    var role_ID = setter.getUrlParam("role_ID",uri) || "";


    upload.render({
        elem: '#test5',
        multiple: true,
        url: server + "/ADMINM/aftersales/uploadImgFile", //改成您自己的上传接口
        accept: 'images', //视频
        exts: 'jpg|png|jpeg', //只允许图片
        acceptMime:"image/jpg, image/png, image/jpeg",
        field:"clientFile",
        number:9,
        before:function(){
            layer.load(2);
        },
        done: function(res){
            layer.closeAll();
            console.log(res)
            if(res.code == 1){
                layer.msg('上传成功');
                res.IMGPATH = res.IMGPATH.replace(",","");
                imgpaths.push(res.IMGPATH);
                changeImgPathHtml(res.IMGPATH);
            }else{
                layer.msg('上传失败');
            }

            // ID: "81caf154951d4eaab3d5cbe4c2b99792"
            // PATH: "/ADMINM/uploadFiles/file/81caf154951d4eaab3d5cbe4c2b99792.mp4"
            // code: 1
        }
    });


    // if(role_ID){
    //     //编辑
    //     $.Ajax({
    //         async: false,
    //         url: server + "/ADMINM/role/toEdit",
    //         dataType: "json",
    //         method: 'get',
    //         data:{"ROLE_ID":role_ID},
    //         success: function(obj) {
    //             if(obj.code == 1){
    //                 changeRoleHtml(obj.data || {});
    //             }else{
    //                 layer.msg(obj.msg || "获取角色详情错误");
    //             }
               
    //         }
    //     });
    // }
    
    //监听提交
    form.on('submit(submit)', function(data){
        // alert(888)
        // layer.msg(JSON.stringify(data.field),function(){
        //     location.href='index.html'
        // });
        // console.log(data.field)

        if(imgpaths.length == 0){
            layer.msg("请上传截图");
            return false;
        }

        var condi = {};
        condi.FEEDBACKTYPE = types[+data.field.FEEDBACKTYPE];
        condi.DESCRIBE = data.field.DESCRIBE;
        condi.IMGPATH = imgpaths.join(',');
        condi.PHONE = data.field.PHONE;
        condi.WECHAT = data.field.WECHAT;
        condi.QQ = data.field.QQ;



        saveAfterSales(condi);

        // if(role_ID){
        //     //编辑
        //     editRole(condi);
        // }else{
        //     addRole(condi);
        // }
        
        return false;
    });

    function changeImgPathHtml(img){
        var html = "<img src='" + (server + img) + "' />";
        $("#IMGPATH").append(html);
    }

    function saveAfterSales(condi){
        $.Ajax({
            async: false,
            url: server + "/ADMINM/aftersales/saveAfterSales",
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

    function editRole(condi){
        condi.ROLE_ID = role_ID;

        $.Ajax({
            async: false,
            url: server + "/ADMINM/role/edit",
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
                    },1500);
                }else{
                    layer.msg(obj.msg || "修改失败");
                }
            }
        });
    }
    

});