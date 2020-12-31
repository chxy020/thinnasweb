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
    tree = layui.tree,//树型组件
    util = layui.util,//树型组件
    data = '';
    // var server = setter.baseUrl;

    var server = setter.baseUrl;
    var uri = window.location.search;
    
    var roleId = setter.getUrlParam("roleId",uri) || "";
    
    if(roleId){
        //编辑
        // $.Ajax({
        //     async: false,
        //     url: server + "/ADMINM/role/toEdit",
        //     dataType: "json",
        //     method: 'get',
        //     data:{"roleId":roleId},
        //     success: function(obj) {
        //         if(obj.code == 1){
        //             changeRoleHtml(obj.data || {});
        //         }else{
        //             layer.msg(obj.msg || "获取角色详情错误");
        //         }
               
        //     }
        // });
        var roleData =  window.sessionStorage.getItem("role_" + roleId);
        if(roleData){
            roleData = JSON.parse(roleData);
            changeRoleHtml(roleData);
        }
    }

    //监听提交
    form.on('submit(submit)', function(data){
        // alert(888)
        // layer.msg(JSON.stringify(data.field),function(){
        //     location.href='index.html'
        // });
        console.log(data.field)
        var condi = {};
        condi = data.field;
        //写死组id
        // condi.PARENT_ID = 1;
        // condi.parentId = 1;

        if(roleId){
            //编辑
            editRole(condi);
        }else{
            addRole(condi);
        }
        
        return false;
    });

    function changeRoleHtml(obj){
        $("#roleName").val(obj.roleName || "");
        $("#bz").val(obj.bz || "");
    }

    function addRole(condi){
        $.Ajax({
            async: false,
            url: server + "/ADMINM/role/add",
            dataType: "json",
            method: 'post',
            data:condi,
            success: function(obj) {
                if(obj.code == 0){
                    layer.msg("添加成功");

                    setTimeout(function(){
                        //刷新父页面
                        window.parent.location.reload();
                        var index = parent.layer.getFrameIndex(window.name);
               		    parent.layer.close(index);
                    },1500);
                }else{
                    layer.msg(obj.msg || "添加失败");
                }
            }
        });
    }

    function editRole(condi){
        condi.roleId = roleId;

        $.Ajax({
            async: false,
            // url: server + "/ADMINM/role/edit",
            url: server + "/ADMINM/role/update",
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