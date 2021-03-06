layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'table', 'jquery','form'], function() {
    var table = layui.table,
        setter = layui.setter,
        form = layui.form;
        $ = layui.jquery;

    var server = setter.baseUrl;
    var devices = {};
    var arrangeList = [];

    function isEmptyObject(obj) {
        var jlength = 0;
        for (var key in obj) {
            if (key != "null") {
                jlength++;
            }
        };
        return jlength
    };


    function tableRender(){
        //表格加载渲染
        table.render({
            elem: '#test-table-operate',
            height: 'full-100',//必须留着
            // url: server + "/ADMINM/role",
            url: server + "/ADMINM/role/getRoleList",
            // where:{
		    //     "keywords":keywords||""
            // },
            method: 'post',
            xhrFields: {
                withCredentials: true
            }
            // ,data: [
            //     {
            //         id:1,
            //         jz:1,//1是开 2是禁止
            //         name:"运营管运营管理员",
            //         namelist:[{
            //                 name:"张三",
            //                 tel:"152000000"
            //             }
            //         ],
            //         moble:'15201466512',
            //         jues:"运营、管理员",
            //         beizi:"无",
            //         denglv:"1分钟前",
            //         time:"2020-7-2"
            //     }
                
            // ]
            ,page: {
                layout: ['prev', 'page', 'next', 'count', 'skip']
            },
            cols: [
                [ //表头
                    {
                        type: 'checkbox',
                        fixed: 'left',
                    },
                    {
                        field: 'id',
                        title: '序号',
                        unresize: 'false',
                        width:60,
                        templet: function(data) {
                            return data.LAY_INDEX;
                        }
                    },
                    {
                        title: '操作',
                        toolbar: '#test-table-operate-barDemo',
                        align: 'left',
                    },
                    {
                        field: 'roleName',
                        title: '角色名称',
                        align: 'left',
                    },
                    {
                        field: 'member',
                        title: '成员',
                        minWidth: 120,
                        align: 'left',
                        templet: function(data) {
                            if(data.userList.length){
                                var names = [];
                                data.userList.forEach(function(item){
                                    names.push(item.name);
                                });
                                // console.log(names);
                                var htmlStr = "";
                                for (i = 0; i < data.userList.length; i++) { 
                                    // console.log("000")
                                    htmlStr += "<tr><td>"+data.userList[i].name+"</td><td>"+data.userList[i].phone+"</td></tr>";
                                }
                                // 表格中 鼠标移上 显示更多详细CSS html js
                                // console.log("htmlStr====",htmlStr);
                                var contStr = "<div class='moreOperate'><span class='layui-badge table-icon-style2'>"+data.userList.length+"</span><div class='moreOperateA'><div class='moreOperateArr'></div><div class='moreOperateAa'><table class='tableb'><tr><th>姓名</th><th>手机号</th></tr>"+htmlStr+"</table></div></div></div>"
                                // console.log("contStr====",contStr);
                                return names.slice(0,2).join(',') + contStr
                            }else{
                                return ''
                            }
                                
                        }
                    },
                    {
                        field: 'bz',
                        title: '备注',
                        align: 'left',
                    }
                ]
            ],
            parseData: function(res){
                if(res.code == 302){
                    top.location.href = setter.loginUrl;
                    return;
                }
                if(res.code == 0){
                    //res 即为原始返回的数据
                    return {
                        "code": 0,
                        "msg": "",
                        "count": res.count,
                        "data": res.data
                    };
                }else{
                    return {
                        "code": 0,
                        "msg": "接口数据错误",
                        "count": 0, 
                        "data": [] 
                    }
                }
            },
            
            page: true,
            event: true,
            limit: 15,
            skin: 'line',
            even: true,
            limits: [10, 15,30],
            done: function(res, curr, count) {
                // table_data = res.data;

                // layer.closeAll('loading');
                // arrangeList.length = 0;
                // layer.close(layer.index); //它获取的始终是最新弹出的某个层，值是由layer内部动态递增计算的
                // layer.close(index);    //返回数据关闭loading
            },
        });
    }

    //表格里滑动开关
    // form.on('submit(formDemo)', function(data){
    //     layer.msg(JSON.stringify(data.field));
    //     return false;
    // });

    //监听指定开关
    form.on('switch(switchTest)', function(data){
        layer.msg('开关checked：'+ (this.checked ? 'true' : 'false'), {
        offset: '6px'
        });
        layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
    });
    

    tableRender();

    
    // window.onkeyup = function(ev) {
    //     var key = ev.keyCode || ev.which;
    //     if (key == 27) { //按下Escape
    //         layer.closeAll('iframe'); //关闭所有的iframe层
    //     }
    //     if (key == 13) { //按下Escape
    //         $('#search').click();

    //     }
    // }
    //监听表格复选框选择
    // table.on('checkbox(test-table-operate)', function(obj) {
    //     console.log(obj)
    // });
    table.on('checkbox(test-table-operate)', function(obj) {
        // console.log(obj.checked); //当前是否选中状态
        // // console.log(obj.data); //选中行的相关数据
        // console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
        // // console.log(table.checkStatus('test-table-operate').data); // 获取表格中选中行的数据
        if (obj.checked && obj.type == 'one') {
            var devi = {};
            devi = obj.data.roleId;
            arrangeList.push(devi)
        }
        if (!obj.checked && obj.type == 'one') {
            var index = arrangeList.indexOf(obj.data.roleId);
            if (index > -1) {
                arrangeList.splice(index, 1);
            }
        }
        if (!obj.checked && obj.type == 'all') {
            arrangeList.length = 0;

        }
        if (obj.checked && obj.type == 'all') {
            $.each(table.checkStatus('test-table-operate').data, function(idx, con) {
                var devi = {};
                devi = con.roleId;

                arrangeList.push(devi)
            });
            arrangeList = Array.from(new Set(arrangeList))
        }
        // console.log(arrangeList)

    });
    //监听工具条
    table.on('tool(test-table-operate)', function(obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            /**
             * @param {Object} index
             * 编排规则的借口提供之后需要接入删除
             */
            layer.confirm('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除后无法恢复！确定删除吗？&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',{title:'删除提醒',btnAlign:'c'}, function() {
                $.Ajax({
                    async: false,
                    type: "post",
                    url: server + "/ADMINM/role/deleteRole",
                    dataType: "json",
                    data: {
                        "roleId": data.roleId
                    },
                    //成功的回调函数
                    success: function (msg) {
                        if (msg.code == 0) {
                            layer.msg("删除成功");
                            tableRender();
                        } else {
                            layer.msg("删除失败");

                        }
                    },
                    //失败的回调函数
                    error: function () {
                        console.log("error")
                    }
                })
                // layer.close(index);
            });
        } else if (obj.event === 'edit') {

            window.sessionStorage.setItem("role_" + data.roleId,JSON.stringify(data));
            layer.open({
                type: 2,
                title: '编辑角色',
                area: ['600px', '300px'],
                btn: ['保存', '取消'],
                btnAlign: 'c',
                maxmin: true,
                content: 'role_add_pop.html?roleId='+data.roleId,
                yes: function(index, layero) {
                    var submit = layero.find('iframe').contents().find("#submit");
                    submit.click();
                }
            });
        } else if (obj.event === 'menu') {
            //设置角色权限栏目
            layer.open({
                type: 2,
                title: '设置角色权限',
                area: ['700px', '500px'],
                btn: ['保存', '取消'],
                btnAlign: 'c',
                maxmin: true,
                content: 'role_menu.html?roleId='+data.roleId+"&roleName="+data.roleName,
                yes: function(index, layero) {
                    var submit = layero.find('iframe').contents().find("#submit");
                    submit.click();
                }
            });
        } else if (obj.event === 'openlog'){
            console.log("data.id=====",data.id)
            console.log("00000000000000")
            //在主窗口打开 操作日志 页面 
            // top.layui.index.openTabsPage("system/operation_log.html", '操作日志');
        }

    })
    var $ = layui.$,
        active = {
            //点击搜索
            search: function() {
                
            },
            //点击添加
            add: function() {
                layer.open({
                    type: 2,
                    title: '新增角色',
                    area: ['600px', '300px'],
                    btn: ['保存', '取消'],
                    btnAlign: 'c',
                    maxmin: true,
                    content: 'role_add_pop.html',
                    yes: function(index, layero) {
                        var submit = layero.find('iframe').contents().find("#submit");
                        submit.click();
                    }
                });
            },
            //点击删除
            del: function() { 
                if(arrangeList.length == 0 ) {
                    return layer.msg("请选择再批量删除")
                }
                layer.confirm('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除后无法恢复！确定删除吗？&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',{title:'删除提醒',btnAlign:'c'}, function() {
                    //获取选中数目
                    $.Ajax({
                        async: false,
                        type: "post",
                        url:server + "/ADMINM/role/batchDeleteRole",
                        dataType: "json",
                        //成功的回调函数
                        data: {
                            "ids":arrangeList.join(',')
                        },
                        xhrFields: {
                            withCredentials: true
                        },
                        success: function(obj) {
                            if (obj.code == 0) {
                                layer.msg("删除成功");
                                tableRender();
                            } else {
                                layer.msg(obj.msg || "删除失败");
                            }
                
                        },
                        //失败的回调函数
                        error: function() {
                            console.log("error")
                        }
                    })
                })
            },
            //重置密码
            resetPassword: function() { 
                if ( arrangeList.length == 0 ) {
                    return layer.msg("请选择再批量重置密码")
                }
                layer.confirm('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;将自动发送随机密码到指定的手机上？&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',{title:'重置密码',btnAlign:'c'}, function() {//获取选中数目
                $.ajax({
                        async: false,
                        type: "post",
                        // url: url+"/roomtemplate/batchRemove",
                        dataType: "json",
                        //成功的回调函数
                        data: {
                            "roomid":arrangeList.join(",")
                        },
                        xhrFields: {
                            withCredentials: true
                        },
                        success: function(msg) {
                            if (msg.code == 0) {
                                layer.msg("密码发送成功");
                                reloaddata(); // 父页面刷新
                            } else {
                                layer.msg(msg.msg);
                            }
                
                        },
                        //失败的回调函数
                        error: function() {
                            console.log("error")
                        }
                    })
                })
            },
            //刷新
            refresh: function() {
                tableRender();
                // reloaddata(); // 父页面刷新
            },
        };
    //给页面里的layui-dS 绑定事件
    $('.layui-ds').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    /*右侧菜单HOVER显示提示文字*/
    var subtips;
    $('.pop_text button').each(function(){
        var _id = $(this).attr('id');
        var _data = $(this).attr('data');
        $("#" + _id).hover(function() {
            openMsg();
        }, function() {
            if(subtips){
                layer.close(subtips);
            }
        });
        function openMsg() {
            subtips = layer.tips(_data, '#'+_id,{tips:[3,'#666'],time: 30000});
        }
    })
    /*右侧菜单HOVER显示提示文字 end*/

    /* 表格中 鼠标移上 显示更多详细CSS html js*/
    $(document).on("mouseenter",".moreOperate",function(){
        var offsetTop = $(this).offset().top;
        var documentHeihgt=$(document).height();//浏览器当前窗口文档的高度
        var moreOperateAHeihgt=$(this).children(".moreOperateA").height()+30;
        // console.log("offsetTop ,documentHeihgt ,moreOperateAHeihgt===",offsetTop ,documentHeihgt ,moreOperateAHeihgt)
        // console.log("documentHeihgt-offsetTop===",documentHeihgt-offsetTop)
        if((documentHeihgt-offsetTop)<moreOperateAHeihgt){
            // console.log("1111");
            $(this).children(".moreOperateA").css("top",-(moreOperateAHeihgt-54));
            $(this).children(".moreOperateA").children(".moreOperateArr").css({"top":"auto","bottom":"10px"})
        }
        $(".layui-table-cell").css("overflow", "visible");
        $(this).children(".moreOperateA").show();
    })
    $(document).on("mouseleave",".moreOperate",function(){
        $(".layui-table-cell").css("overflow", "hidden");
        $(this).children(".moreOperateA").hide();
    })
    /* 表格中 鼠标移上 显示更多详细CSS html js end*/




});
