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
    
    var role_ID = setter.getUrlParam("role_ID",uri) || "";

    if(role_ID){
        //编辑
        $.Ajax({
            async: false,
            url: server + "/ADMINM/role/menuqx",
            dataType: "json",
            method: 'get',
            data:{"ROLE_ID":role_ID},
            success: function(obj) {
                if(obj.code == 1){
                    changeRoleHtml(obj.data || {});
                }else{
                    layer.msg(obj.msg || "获取角色详情错误");
                }
               
            }
        });
    }


    
    //模拟数据
    data = [{
        title: '一级1'
        ,id: 1
        ,field: 'name1'
        ,checked: true
        ,spread: true
        ,children: [{
        title: '二级1-1 可允许跳转'
        ,id: 3
        ,field: 'name11'
        ,href: 'https://www.layui.com/'
        ,children: [{
            title: '三级1-1-3'
            ,id: 23
            ,field: ''
            ,children: [{
            title: '四级1-1-3-1'
            ,id: 24
            ,field: ''
            ,children: [{
                title: '五级1-1-3-1-1'
                ,id: 30
                ,field: ''
            },{
                title: '五级1-1-3-1-2'
                ,id: 31
                ,field: ''
            }]
            }]
        },{
            title: '三级1-1-1'
            ,id: 7
            ,field: ''
            ,children: [{
            title: '四级1-1-1-1 可允许跳转'
            ,id: 15
            ,field: ''
            ,href: 'https://www.layui.com/doc/'
            }]
        },{
            title: '三级1-1-2'
            ,id: 8
            ,field: ''
            ,children: [{
            title: '四级1-1-2-1'
            ,id: 32
            ,field: ''
            }]
        }]
        },{
        title: '二级1-2'
        ,id: 4
        ,spread: true
        ,children: [{
            title: '三级1-2-1'
            ,id: 9
            ,field: ''
            ,disabled: true
        },{
            title: '三级1-2-2'
            ,id: 10
            ,field: ''
        }]
        },{
        title: '二级1-3'
        ,id: 20
        ,field: ''
        ,children: [{
            title: '三级1-3-1'
            ,id: 21
            ,field: ''
        },{
            title: '三级1-3-2'
            ,id: 22
            ,field: ''
        }]
        }]
    },{
        title: '一级2'
        ,id: 2
        ,field: ''
        ,spread: true
        ,children: [{
        title: '二级2-1'
        ,id: 5
        ,field: ''
        ,spread: true
        ,children: [{
            title: '三级2-1-1'
            ,id: 11
            ,field: ''
        },{
            title: '三级2-1-2'
            ,id: 12
            ,field: ''
        }]
        },{
        title: '二级2-2'
        ,id: 6
        ,field: ''
        ,children: [{
            title: '三级2-2-1'
            ,id: 13
            ,field: ''
        },{
            title: '三级2-2-2'
            ,id: 14
            ,field: ''
            ,disabled: true
        }]
        }]
    },{
        title: '一级3'
        ,id: 16
        ,field: ''
        ,children: [{
        title: '二级3-1'
        ,id: 17
        ,field: ''
        ,fixed: true
        ,children: [{
            title: '三级3-1-1'
            ,id: 18
            ,field: ''
        },{
            title: '三级3-1-2'
            ,id: 19
            ,field: ''
        }]
        },{
        title: '二级3-2'
        ,id: 27
        ,field: ''
        ,children: [{
            title: '三级3-2-1'
            ,id: 28
            ,field: ''
        },{
            title: '三级3-2-2'
            ,id: 29
            ,field: ''
        }]
        }]
    }]
    //树型组件基本演示
    tree.render({
        elem: '#test12'
        ,data: data
        ,showCheckbox: true  //是否显示复选框
        ,id: 'demoId1'
        ,isJump: true //是否允许点击节点时弹出新窗口跳转
        ,click: function(obj){
        var data = obj.data;  //获取当前点击的节点数据
        layer.msg('状态：'+ obj.state + '<br>节点数据：' + JSON.stringify(data));
        }
    });



    //监听提交
    form.on('submit(submit)', function(data){
        // alert(888)
        // layer.msg(JSON.stringify(data.field),function(){
        //     location.href='index.html'
        // });
        console.log(data.field)
        var condi = {};
        condi = data.field;
        if(role_ID){
            //编辑
            editRole(condi);
        }else{
            addRole(condi);
        }
        
        return false;
    });

    function changeRoleHtml(obj){
        $("#ROLE_NAME").val(obj.ROLE_NAME || "");
        $("#ROLE_BZ").val(obj.ROLE_BZ || "");
    }

    function addRole(condi){
        $.Ajax({
            async: false,
            url: server + "/ADMINM/role/add",
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
                    },1500);
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