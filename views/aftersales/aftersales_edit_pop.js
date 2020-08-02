layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form','jquery','tree','util'], function () {
    var $ = layui.$,
    setter = layui.setter,
    form = layui.form,
    layer = layui.layer,
    setter = layui.setter,
    router = layui.router(),
    data = '';
    // var server = setter.baseUrl;

    var server = setter.baseUrl;
    var uri = window.location.search;
    var statusarr = ["","处理中","已关闭","已解决","待定"];
    var typesName = {
        "硬件故障":1,
        "软件故障":2,
        "硬件使用障碍":3,
        "软件使用障碍":4,
        "优化建议":5,
        "投诉反馈":6,
        "其它":7
    }
    var ID = setter.getUrlParam("ID",uri) || "";

    if(ID){
        //编辑
        $.Ajax({
            async: false,
            url: server + "/ADMINM/aftersales/toEditAfterSales",
            dataType: "json",
            method: 'get',
            data:{"ID":ID},
            success: function(obj) {
                console.log(obj)
                if(obj.code == 1){
                    changeSalesHtml(obj.afterSales || {});
                }else{
                    layer.msg(obj.msg || "获取详情错误");
                }
               
            }
        });
    }

    //监听提交
    form.on('submit(submit)', function(data){
        // alert(888)
        // layer.msg(JSON.stringify(data.field),function(){
        //     location.href='index.html'
        // });
        console.log(data.field)
        var condi = {};
        condi.ID = ID;
        condi.STATUS = statusarr[+data.field.STATUS];
        condi.REASON = data.field.REASON;

        updateAfterSales(condi);
        return false;
    });

    function changeSalesHtml(obj){
        $("#FEEDBACKTYPE").val(typesName[obj.feedbacktype]);
        $("#DESCRIBE").val(obj.describe || "");
        var imgs = (obj.imgpath || "").split(',');
        changeImgPathHtml(imgs);
        $("#PHONE").val(obj.phone || "");
        $("#WECHAT").val(obj.wechat || "");
        $("#QQ").val(obj.qq || "");
        
        layui.form.render();
    }
    function changeImgPathHtml(imgs){
        var html = [];
        imgs.forEach(function(img){
            html.push("<img src='" + (server + img) + "' />");
        })
        
        $("#IMGPATH").html(html.join(''));
    }

    function updateAfterSales(condi){

        $.Ajax({
            async: false,
            url: server + "/ADMINM/aftersales/updateAfterSales",
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