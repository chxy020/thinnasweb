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
            url: server + "/ADMINM/role",
            // where:{
		    //     "keywords":keywords||""
            // },
            method: 'get',
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
                        field: 'role_NAME',
                        title: '角色名称',
                        align: 'left',
                    },
                    {
                        field: 'member',
                        title: '成员',
                        align: 'left',
                        templet: function(data) {
                            var names = [];
                            data.member.forEach(function(item){
                                names.push(item.name);
                            });
                            return names.join(',') + "<span class='layui-badge table-icon-style2'>" + names.length + "</span>";
                        },
                    },
                    {
                        field: 'roomname',
                        title: '描述',
                        align: 'left',
                    }
                ]
            ],
            parseData: function(res){
                return {
                    "code": 0,
                    "msg": "",
                    "count": 0,
                    "data": res.roleList_z || [] 
                }
            },
            
            event: true,
            page: false,
            limit: Number.MAX_VALUE,
            skin: 'line',
            even: true,
            // limits: [5, 10, 15],
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
            devi = obj.data.role_ID;
            arrangeList.push(devi)
        }
        if (!obj.checked && obj.type == 'one') {
            var index = arrangeList.indexOf(obj.data.role_ID);
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
                devi = con.role_ID;

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
                    type: "get",
                    url: server + "/ADMINM/role/delete",
                    dataType: "json",
                    data: {
                        "ROLE_ID": data.role_ID
                    },
                    //成功的回调函数
                    success: function (msg) {
                        if (msg.code == 1) {
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
            layer.open({
                type: 2,
                title: '编辑角色',
                area: ['600px', '300px'],
                btn: ['保存', '取消'],
                btnAlign: 'c',
                maxmin: true,
                content: 'role_add_pop.html?role_ID='+data.role_ID,
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
                content: 'role_menu.html?role_ID='+data.role_ID,
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
                        url:server + "/ADMINM/role/delete",
                        dataType: "json",
                        //成功的回调函数
                        data: {
                            "USER_IDS":arrangeList.join(",")
                        },
                        xhrFields: {
                            withCredentials: true
                        },
                        success: function(obj) {
                            var list = obj.list || [];
                            var msg = list[0] || {};
                            if (msg.code == 1) {
                                layer.msg("删除成功");
                                tableRender();
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

    /* 点击查看更多操作 三部分组成 CSS html js 3.10 */
    // if($(".layui-table-header table tr").length==1){
    //     $(".layui-table-header").css("min-height",195)
    // }else{
    //     $("table").find("tr:last").find("td:nth-child(6)").find(".moreOperateA").css("top",-55);
    //     $("table").find("tr:last").find("td:nth-child(6)").find(".moreOperateArr").css({"top":49,"background-image":"url('../../../images/tips_darr.png')"});
    // }
    $('.moreOperate').each(function(){
        $(this).hover(function() {
            var X = $(this).offset().left;
            var parentX = $(this).parent().offset().left;

            console.log(X)
            console.log(parentX)
            $(this).children(".moreOperateA").css("left",X-parentX-37).show();
        }, function() {
            $(this).children(".moreOperateA").hide();
        });
    })




    /* 点击查看更多操作 三部分组成 CSS html js end 3.10 */




});
