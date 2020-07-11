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
    // var uri = window.location.search;
    
    var role_ID = setter.getUrlParam("role_ID") || "";
    var role_NAME = setter.getUrlParam("role_NAME") || "";

    var treeData = [];

    if(role_ID){
        $("#role_NAME").val(role_NAME);        
        //编辑
        $.Ajax({
            async: false,
            url: server + "/ADMINM/role/menuqx",
            dataType: "json",
            method: 'get',
            data:{"ROLE_ID":role_ID},
            success: function(obj) {
                if(obj.code == 1){
                    buildTreeData(obj.data || []);
                }else{
                    layer.msg(obj.msg || "获取角色详情错误");
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

        // console.log(data.field)
        // var condi = {};
        // condi = data.field;
        // if(role_ID){
        //     //编辑
        //     editRole(condi);
        // }else{
        //     addRole(condi);
        // }
        
        var checkData = tree.getChecked('menutree');

        console.log(checkData);

        var menusIds = [];
        getTreeCheckedIds(checkData,menusIds);

        var condi = {};
        condi.ROLE_ID = role_ID;
        condi.menuIds = menusIds.join(',');
        console.log(menusIds);
        saveRoleMenuIds(condi);
        // {"ROLE_ID":ROLE_ID,"menuIds":ids};

        return false;
    });

    function buildTreeData(data){
        var checkids = [];
        if(data && data.length > 0){
            data.forEach(function(obj){
                var node = {
                    id:obj.menu_ID,
                    title:obj.menu_NAME,
                    checked:obj.hasMenu || false,
                    // checked:false,
                    spread:true,
                    children:[]
                };
                // if(obj.hasMenu){
                //     checkids.push(obj.menu_ID);
                // }
                if(obj.subMenu && obj.subMenu.length > 0){
                    obj.subMenu.forEach(function(cnode){
                        if(!cnode.hasMenu){
                            node.checked = false;
                        }
                    });
                    if(obj.hasMenu == node.checked && node.checked){
                        //子集都是tree,只要父级为tree,不然复选框错误
                        obj.subMenu.forEach(function(cnode){
                            cnode.hasMenu = false;
                        });
                    }

                    obj.subMenu.forEach(function(cnode){
                        var n = {
                            id:cnode.menu_ID,
                            title:cnode.menu_NAME,
                            // checked:false,
                            checked:cnode.hasMenu || false,
                            // spread:true,
                            children:[]
                        };
                        // if(!cnode.hasMenu){
                        //     node.checked = false;
                        // }
                        // if(cnode.hasMenu){
                        //     checkids.push(cnode.menu_ID);
                        // }

                        node.children.push(n);

                        //无限级树checked赋值有问题，暂不处理。我们就二级
                        // if(cnode.subMenu && cnode.subMenu.length > 0){
                        //     getChildrenNode(cnode,n.children);
                        // }
                    });
                    
                }
                treeData.push(node);
            });
        }
        console.log(treeData);
        initTree(treeData);

        // setTimeout(function(){
        //     tree.setChecked("menutree", checkids);
        // },1000)
       
        // console.log("checkids----",checkids)
        // // setChecked
        // layui.form.render();
    }

    function getChildrenNode(data,child){
        
        data.subMenu.forEach(function(cnode,index){
            var n = {
                id:cnode.menu_ID,
                title:cnode.menu_NAME,
                // checked:false,
                // checked:cnode.hasMenu || false,
                // spread:true,
                children:[]
            }
            // if(!cnode.hasMenu){
            //     child.checked = false;
            // }
            if(cnode.hasMenu){
                checkids.push(cnode.menu_ID);
            }
            child.push(n);
            if(cnode.subMenu && cnode.subMenu.length > 0){
                getChildrenNode(cnode,n.children,checkids)
            }
        });
    }

    function initTree(data){
        //树型组件基本演示
        tree.render({
            elem: '#test12'
            ,data: data
            ,showCheckbox: true  //是否显示复选框
            ,id: 'menutree'
            ,isJump: true //是否允许点击节点时弹出新窗口跳转
            ,click: function(obj){
                // var data = obj.data;
                // console.log(data)
                // //获取当前点击的节点数据
                // layer.msg('状态：'+ obj.state + '<br>节点数据：' + JSON.stringify(data));
            }
        });
    }


    function getTreeCheckedIds(data,menusIds){
        if(data && data.length > 0){
            data.forEach(function(obj){
                menusIds.push(obj.id);
                if(obj.children && obj.children.length > 0){
                    obj.children.forEach(function(cnode){
                        menusIds.push(cnode.id);
                        if(cnode.children && cnode.children.length > 0){
                            getTreeChildrenCheckedIds(cnode,menusIds);
                        }
                    });
                    
                }
            });
        }
    }

    function getTreeChildrenCheckedIds(data,menusIds){
        data.children.forEach(function(cnode){
            menusIds.push(cnode.id);
            if(cnode.children && cnode.children.length > 0){
                getTreeChildrenCheckedIds(cnode,menusIds);
            }
        });
    }

    function saveRoleMenuIds(condi){
        $.Ajax({
            async: false,
            url: server + "/ADMINM/role/saveMenuqx",
            dataType: "json",
            method: 'post',
            data:condi,
            success: function(obj) {
                if(obj.code == 1){
                    layer.msg("角色栏目设置成功");

                    setTimeout(function(){
                        //刷新父页面
                        window.parent.location.reload();
                        var index = parent.layer.getFrameIndex(window.name);
               		    parent.layer.close(index);
                    },1500);
                }else{
                    layer.msg(obj.msg || "角色栏目设置失败");
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
                ,checked: true
                ,field: ''
            },{
                title: '五级1-1-3-1-2'
                ,id: 31
                ,checked: false
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
    }];

    // initTree(data);
});