layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form','jquery'], function () {
    var $ = layui.$,
    setter = layui.setter,
    form = layui.form,
    layer = layui.layer,
    setter = layui.setter;
    // var server = setter.baseUrl;

    var server = setter.baseUrl;
    var uri = window.location.search;
    
    var name = setter.getUrlParam("name",uri) || "";
    var qcid = setter.getUrlParam("id",uri) || "";
    $("#name").val(name);

    //监听提交
    form.on('submit(submit)', function(data){
        // console.log(data.field)
        var condi = {};
        var name = $("#name").val();
        condi.name = name;
        condi.id = qcid;
        updateQuestionC(condi);
        return false;
    });

    function updateQuestionC(condi){
        $.Ajax({
            async: false,
            url: server + "/ADMINM/quest/updateQuestClassify",
            dataType: "json",
            method: 'post',
            data:condi,
            success: function(obj) {
                if(obj.code == 0){
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