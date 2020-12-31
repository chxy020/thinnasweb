layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'table', 'jquery','form','laydate'], function() {
    var table = layui.table,
        setter = layui.setter,
        laydate = layui.laydate,
        form = layui.form;
        $ = layui.jquery;

    var server = setter.baseUrl;
    var uri = window.location.search;
    
    var device_id = setter.getUrlParam("device_id",uri) || "";
    device_id = "744c4da721fa5da1f7bef8aa5b291842";
    
    if(!device_id){
        layer.msg("没有获取到设备id");
        return;
    }

    if(device_id){
        //编辑
        $.Ajax({
            async: true,
            url: server + "/ADMINM/device/getUserDeviceDetails",
            dataType: "json",
            method: 'post',
            data:{"device_id":device_id},
            success: function(obj) {
                if(obj.code == 1){
                    changeDetailInfoHtml(obj.deviceInfo || {});
                    renderUserTable(obj.userLsList || []);
                    renderUserSpaceTable(obj.userSpaceList || []);


                    var table1 = [];
                    table1.push('<p>当前用户：<span>' + obj.countUser + '</span></p>');
					table1.push('<p>历史用户：<span>' + obj.countUserLs + '</span></p>');
					table1.push('<p>已使用：<span>' + obj.useDays + '天</span></p>');
                    $("#tableinfo1").html(table1.join(''));

                    var info = obj.deviceInfo || {};
                    var table2 = [];
                    table2.push('<p><span>' + info.total + 'MB</span></p>');
					table2.push('<p>可用：<span>' + info.available + 'MB</span></p>');
					table2.push('<p>已用：<span>' + info.used + 'MB</span></p>');
					table2.push('<p>文件数：<span>' + info.times + '</span></p>');
                    $("#tableinfo2").html(table2.join(''));
                }else{
                    layer.msg(obj.msg || "获取角色详情错误");
                }
            }
        });
    }

    function changeDetailInfoHtml(obj){
        var html = [];
        html.push('<p class="bt"><span>' + obj.deviceid + '</span>(' + obj.nickname + '的设备)</p>');
		html.push('<p class="states">' + (+obj.status == 1 ? "在线" : "离线") + '</p>');
		html.push('<p>IP：<span>192.168.1.1</span></p>');
		html.push('<p>存储方式：<span>RAID5</span></p>');
		html.push('<p>磁盘：<span>1</span></p>');
		html.push('<p>可靠性能：<span>高</span></p>');
		html.push('<p>容量：<span>' + obj.total + 'MB</span></p>');
        $("#info1").html(html.join(''));

        var html = [];
        html.push('<div class="detalisinfo">');
        html.push('<div class="state situation_A">');
        html.push('状态<p>' + (obj.status_BIND == 1 ? "已绑定" : "未绑定") + '</p>');
        html.push('</div>');
        html.push('<div class="state situation_B">');
        html.push('管理员<p>'+ obj.uname +'<span>('+ obj.phone + ')</span></p>');
        html.push('</div>');
        html.push('</div>');
        html.push('<div class="detalisinfo">');
        html.push('<div class="state situation_C">');
        html.push('绑定时间<p>' + obj.bindtime + '</p>');
        html.push('</div>');
        html.push('<div class="state situation_D">');
        html.push('激活时间<p>' + obj.bindtime + '</p>');
        html.push('</div>');
        html.push('</div>');
        $("#info2").html(html.join(''));
    }


    function renderUserTable(list){
        //表格A加载渲染
        table.render({
            elem: '#test-table-operateA',
            height: '278',//必须留着
            // url: "https://f.longjuli.com/meeting/findMeetingBylayui" //数据接口
            // url: server + "/ADMINM/user/listUsers",
            method: 'get',
            xhrFields: {
                withCredentials: true
            }
            ,data: list
            ,cols: [
                [ //表头
                    {
                        field: 'nickname',
                        title: '用户名',
                        align: 'left',
                    }, 
                    {
                        field: 'operation',
                        title: '操作历史',
                        align: 'left',
                    },
                    {
                        field: 'createtime',
                        title: '时间',
                        align: 'left',
                    }
                    
                ]
            ],
            page: false,
            event: true,
            limit: 15,
            done: function(res, curr, count) {
                // table_data = res.data;

                // layer.closeAll('loading');
                // arrangeList.length = 0;
                // layer.close(layer.index); //它获取的始终是最新弹出的某个层，值是由layer内部动态递增计算的
                // layer.close(index);    //返回数据关闭loading
            },
        });
    }

    function renderUserSpaceTable(list){
        table.render({
            elem: '#test-table-operateB',
            height: '278',//必须留着
            // url: "https://f.longjuli.com/meeting/findMeetingBylayui" //数据接口
            // url: server + "/ADMINM/user/listUsers",
            method: 'get',
            xhrFields: {
                withCredentials: true
            }
            ,data: list
            ,cols: [
                [ //表头
                    {
                        field: 'nickname',
                        title: '用户',
                        align: 'left',
                    }, 
                    {
                        field: 'history',
                        title: '空间使用情况',
                        align: 'left',
                        templet: function(data) {
                            return data.total + "MB | 可用" + data.used + "MB | 已用" + data.available +"MB";
                        },
                    },
                    {
                        field: 'filecount',
                        title: '文件数',
                        align: 'left',
                    }
                    
                ]
            ],
            limit: 15,
            done: function(res, curr, count) {
                // table_data = res.data;
    
                // layer.closeAll('loading');
                // arrangeList.length = 0;
                // layer.close(layer.index); //它获取的始终是最新弹出的某个层，值是由layer内部动态递增计算的
                // layer.close(index);    //返回数据关闭loading
            },
        });
    }

    function renderUserLsTable(){
        var keywords = $("#keyword").val() || "";
        //表格C加载渲染
        table.render({
            elem: '#test-table-operateC',
            height: '378',//必须留着
            url: server + "/ADMINM/device/DeviceOperationLs",
            method: 'get',
            where:{
                "keywords":keywords||"",
                "DEVICEID":deviceid,
                "bindtimeStart":bindtimeStart,
                "bindtimeEnd":bindtimeEnd
            },
            xhrFields: {
                withCredentials: true
            }
            
            ,page: {
                layout: ['prev', 'page', 'next', 'count', 'skip']
            },
            cols: [
                [ //表头
                    {
                        field: 'nickname',
                        title: '用户',
                        align: 'left',
                    }, 
                    {
                        field: 'operation',
                        title: '操作历史',
                        align: 'left',
                    },
                    {
                        field: 'createtime',
                        title: '操作时间',
                        align: 'left',
                    }
                    
                ]
            ],
            parseData: function(res){
                if(res.code == 302){
                    top.location.href = setter.loginUrl;
                    return;
                }
                if(res.code == 1){
                    //res 即为原始返回的数据
                    return {
                        "code": 0,
                        "msg": "",
                        "count": res.count,
                        "data": res.deviceCzlsList
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
            limits: [5, 10, 15],
            done: function(res, curr, count) {
                // table_data = res.data;

                // layer.closeAll('loading');
                // arrangeList.length = 0;
                // layer.close(layer.index); //它获取的始终是最新弹出的某个层，值是由layer内部动态递增计算的
                // layer.close(index);    //返回数据关闭loading
            },
        });
    
    }

    var bindtimeStart = "";
    var bindtimeEnd = "";
    // var day2 = new Date();
    // day2.setTime(day2.getTime());
    // var s2 = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
    var bindtime = laydate.render({
        elem: '#bindtime',
        range: true,
        // min: s2,
        // max: '2080-10-14',
        // format: 'yyyy年MM月dd日',
        // theme: 'molv'
        change: function(value, date, endDate){//日期时间被切换后的回调
            // console.log(value); //得到日期生成的值，如：2017-08-18
            // console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            // console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
        }
        ,done: function(value, date, endDate){//控件选择完毕后的回调—点击日期、清空、现在、确定均会触发。
            if(value){
                var d = value.split(" - ");
                bindtimeStart = d[0];
                bindtimeEnd = d[1];
            }else{
                bindtimeStart = "";
                bindtimeEnd = "";
            }
            renderUserLsTable();
            // console.log(value); //得到日期生成的值，如：2017-08-18
            // console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            // console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
        }
    });

    $("#keyword").on({
        keyup : function(e){        
            var flag = e.target.isNeedPrevent;
            if(flag)  return;     
            renderUserLsTable();
            e.target.keyEvent = false ;
        },
        keydown : function(e){
            e.target.keyEvent = true ; 
        },
        input : function(e){
            if(!e.target.keyEvent){
                renderUserLsTable();
            }
        },
        compositionstart : function(e){
            e.target.isNeedPrevent = true ;
        },
        compositionend : function(e){
            e.target.isNeedPrevent = false;
        }
    });

    renderUserLsTable();

    function isEmptyObject(obj) {
        var jlength = 0;
        for (var key in obj) {
            if (key != "null") {
                jlength++;
            }
        };
        return jlength
    };

    //表格里滑动开关
    // form.on('submit(formDemo)', function(data){
    //     layer.msg(JSON.stringify(data.field));
    //     return false;
    // });

    //监听指定开关
    // form.on('switch(switchTest)', function(data){
    //     layer.msg('开关checked：'+ (this.checked ? 'true' : 'false'), {
    //     offset: '6px'
    //     });
    //     layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
    // });
    


    //表格B加载渲染
    
    
    window.onkeyup = function(ev) {
        var key = ev.keyCode || ev.which;
        if (key == 27) { //按下Escape
            layer.closeAll('iframe'); //关闭所有的iframe层
        }
        // if (key == 13) { //按下Escape
        //     $('#search').click();

        // }
    }


    // //监听表格复选框选择
    // table.on('checkbox(test-table-operate)', function(obj) {
    //     console.log(obj)
    // });
    // table.on('checkbox(test-table-operate)', function(obj) {
    //     // console.log(obj.checked); //当前是否选中状态
    //     // // console.log(obj.data); //选中行的相关数据
    //     // console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
    //     // // console.log(table.checkStatus('test-table-operate').data); // 获取表格中选中行的数据
    //     if (obj.checked && obj.type == 'one') {
    //         var devi = {};
    //         devi = obj.data.id;
    //         arrangeList.push(devi)
    //     }
    //     if (!obj.checked && obj.type == 'one') {
    //         var index = arrangeList.indexOf(obj.data.id);
    //         if (index > -1) {
    //             arrangeList.splice(index, 1);
    //         }
    //     }
    //     if (!obj.checked && obj.type == 'all') {
    //         arrangeList.length = 0;

    //     }
    //     if (obj.checked && obj.type == 'all') {
    //         $.each(table.checkStatus('test-table-operate').data, function(idx, con) {
    //             var devi = {};
    //             devi = con.id;

    //             arrangeList.push(devi)
    //         });
    //         arrangeList = Array.from(new Set(arrangeList))
    //     }
    //     // console.log(arrangeList)

    // });
    // //监听工具条
    // table.on('tool(test-table-operate)', function(obj) {
    //     var data = obj.data;
    //     if (obj.event === 'del') {
    //         /**
    //          * @param {Object} index
    //          * 编排规则的借口提供之后需要接入删除
    //          */
    //         layer.confirm('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除后无法恢复！确定删除吗？&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',{title:'删除提醒',btnAlign:'c'}, function() {
    //             $.ajax({
    //                 async: false,
    //                 type: "get",
    //                 url: url + "/ruletemplate/deleteruletemplate",
    //                 dataType: "json",
    //                 xhrFields: {
    //                     withCredentials: true
    //                 },
    //                 //成功的回调函数
    //                 data: {
    //                     "id": data.id
    //                 },
    //                 success: function (msg) {

    //                     if (msg.code == '0') {
    //                         layer.msg("删除成功");
    //                         reloads();
    //                     } else {
    //                         layer.msg("删除失败");

    //                     }

    //                 },
    //                 //失败的回调函数
    //                 error: function () {
    //                     console.log("error")
    //                 }
    //             })
    //             layer.close(index);
    //         });
    //     } else if (obj.event === 'edit') {
    //         layer.open({
    //             type: 2,
    //             title: '编辑账号',
    //             area: ['500px', '400px'],
    //             btn: ['保存', '取消'],
    //             btnAlign: 'c',
    //             maxmin: true,
    //             content: 'account_edit_pop.html',
    //             // content: 'account_edit_pop.html?id=" + data.id,
    //             yes: function(index, layero) {
    //             }
    //         });
    //     } else if (obj.event === 'switch') {
    //         console.log("data.id=====",data.id)
    //         console.log("data.jz=====",data.jz)
    //         if(data.jz==1){
    //             data.jz=2
    //             console.log("data.jz=====11",data.jz)
    //             layer.msg("账号已禁用")
    //             //把数据提交到接口里
    //         }else{
    //             data.jz=1
    //             layer.msg("账号已启用")
    //             console.log("data.jz=====22",data.jz)
    //             //把数据提交到接口里
    //         }
    //     } else if (obj.event === 'openlog'){
    //         console.log("data.id=====",data.id)
    //         console.log("00000000000000")
    //         //在主窗口打开 操作日志 页面 
    //         // top.layui.index.openTabsPage("system/operation_log.html", '操作日志');
    //     }

    // })


    var $ = layui.$,
        active = {
            //点击搜索
            search: function() {
                table.render({
                    elem: '#test-table-operate',
                    height: 'full-100',
                    url: "https://f.longjuli.com/meeting/findMeetingBylayui" //数据接口
                        ,
                    xhrFields: {
                        withCredentials: true
                    },
                    where: {
                        "rule": $('#demoReload').val(),
                        "status":0
                    },
                    method: 'get',
                    page: {
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
                            },
                            {
                                width: 100,
                                title: '操作',
                                toolbar: '#test-table-operate-barDemo',
                            },
                            {
                                field: 'name',
                                title: '姓名',
                                align: 'left',
                            }, {
                                field: 'roomname',
                                title: '手机号',
                                align: 'left',
                            },
                            {
                                field: 'roomname',
                                title: '角色',
                                align: 'left',
                                templet: function(data) {
                                        return data.name + "<span class='layui-badge table-icon-style2'>2</span>"
                                },
                            },
                            {
                                field: 'roomname',
                                title: '备注',
                                align: 'left',
                            },
                            {
                                field: 'roomname',
                                title: '最近登录',
                                align: 'left',
                                templet: function(data) {
                                    return data.name + "<i class='layui-icon table-icon-style3'>&#xe60e;</i>"
                                },
                            },
                            {
                                field: 'modifytime',
                                title: '创建时间',
                                align: 'left',
                            },
                            
                        ]
                    ],
                    event: true,
                    page: true,
                    limit: 15,
                    skin: 'line',
                    even: true,
                    limits: [5, 10, 15],
                    done: function(res, curr, count) {
                        table_data = res.data;

                        layer.closeAll('loading');
                        arrangeList.length = 0;
                        // layer.close(layer.index); //它获取的始终是最新弹出的某个层，值是由layer内部动态递增计算的
                        // layer.close(index);    //返回数据关闭loading
                    },
                });
            },
            //点击添加
            add: function() {
                layer.open({
                    type: 2,
                    title: '新增账号',
                    area: ['500px', '400px'],
                    btn: ['保存', '取消'],
                    btnAlign: 'c',
                    maxmin: true,
                    content: 'account_add_pop.html',
                    yes: function(index, layero) {
                        var submit = layero.find('iframe').contents().find("#ruleclick");
                        submit.click();
                    }
                });
            },
            //点击删除
            del: function() { 
                if ( arrangeList.length == 0 ) {
                    return layer.msg("请选择再批量删除")
                }
                layer.confirm('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除后无法恢复！确定删除吗？&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',{title:'删除提醒',btnAlign:'c'}, function() {//获取选中数目
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
                                layer.msg("删除成功");
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
                renderUserLsTable();
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
