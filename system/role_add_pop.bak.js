layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form','jquery','tree','util'], function () {
    var $ = layui.$,
    setter = layui.setter,
    form = layui.form,
    layer = layui.layer,
    router = layui.router(),
    tree = layui.tree,//树型组件
    util = layui.util,//树型组件
    data = '';
    // var server = setter.baseUrl;



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

    
    $.Ajax({
        async: false,
        url: server + "/ADMINM/user/goAddU",
        dataType: "json",
        method: 'get',
        success: function(obj) {
            console.log(obj);
            roleSelectHtml(obj.roleList);
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
        var phone = data.field.PHONE;
        condi = data.field
        if(!setter.isTel(phone)){
			layer.msg("手机号输入错误");
			return false;
        }
        var status = $("#STATUS").prop("checked") == true ? 0 : 1;
        condi.STATUS = status;
        
        //写死 USERNAME(用户名) PASSWORD（密码）
        // condi.USERNAME = "USER" + new Date().getTime();
        // condi.PASSWORD = "PWD" + new Date().getTime();

        addSystemUser(condi);
        return false;
    });

    function roleSelectHtml(roleList){
        for (i = 0; i < roleList.length; i++) {
            var role = roleList[i] || {};
            $('#roleselset').append(new Option(role.role_NAME, role.role_ID));
        }
        layui.form.render("select");
    }


    function addSystemUser(condi){
        // USERNAME(用户名) NUMBER（编号） 
        // PASSWORD（密码） NAME（名字） PHONE（电话） BZ （备注） STATUS （0正常1冻结） 
        // ROLE_ID（goAddU返回的参数选择哪个角色就是绑定这个id）

        $.Ajax({
            async: false,
            url: server + "/ADMINM/user/saveU",
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
    

});