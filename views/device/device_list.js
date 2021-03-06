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
    
    var uid = setter.getUrlParam("uid") || "";

    var devices = {};
    var arrangeList = [];

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
            tableRender();
            // console.log(value); //得到日期生成的值，如：2017-08-18
            // console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            // console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
        }
    });
    // var actiontime = laydate.render({
    //     elem: '#actiontime',
    //     range: true
    //     // min: s2,
    //     // max: '2080-10-14',
    //     // format: 'yyyy年MM月dd日',
    //     // theme: 'molv'
    // });

    
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


    function tableRender(){
        var keywords = $("#keyword").val() || "";
        var status = $("#statusselect").val() || "";

        //表格加载渲染
        table.render({
            elem: '#test-table-operate',
            height: 'full-60',//必须留着
            // url: server + "/ADMINM/device/listDevices",
            url: server + "/ADMINM/device/getUserDeviceList",
            where:{
                "search":keywords||"",
                "device_status":status,
                "startTime":bindtimeStart ? bindtimeStart + " 00:00:00" : "",
                "endTime":bindtimeEnd ? bindtimeEnd + " 00:00:00" : "",
                "uid":uid
            },

            method: 'post',
            xhrFields: {
                withCredentials: true
            }
            // ,data: [
            //     {
            //         id:1,
            //         jz:1,//1是开 2是禁止
            //         deviceid:"12308080",
            //         online:'离线',
            //         nickname:"张三",
            //         status:"未激活",
            //         adminuser:"苏苏",
            //         tel:'15201466512',
            //         bindtime:"2020-7-2 12:12",
            //         usercount:10,
            //         ssd:"1.37T",
            //         usecount:45000,
            //     }
            // ]
            ,page: {
                layout: ['prev', 'page', 'next', 'count', 'skip']
            },
            cols: [
                [ //表头
                    // {
                    //     type: 'checkbox',
                    //     fixed: 'left',
                    // },
                    {
                        field: 'id',
                        title: '序号',
                        unresize: 'false',
                        width:60,
                        templet: function(data) {
                            return data.LAY_INDEX;
                        }
                    },
                    // {
                    //     width: 100,
                    //     title: '操作',
                    //     toolbar: '#test-table-operate-barDemo',
                    // },
                    {
                        field: 'device_id',
                        title: '设备ID',
                        align: 'left',
                        width:240,
                        toolbar: '#test-table-operate-barDemo',
                        // templet: function(data) {
                        //     return '<a class="a_blue" lay-event="details" id="details">' + data.device_id + '</a>'
                        // },
                    }, {
                        field: 'status',
                        title: '是否在线',
                        align: 'left',
                        width:80,
                        templet: function(data) {
                            return data.status == 1 ? "在线" : "离线";
                        },
                    },

                    {
                        field: 'nickname',
                        title: '昵称',
                        align: 'left',
                        // toolbar: '#test-table-operate-barDemoMore',
                        templet: function(data) {
                            // console.log(data)
                            return data.nickname;
                                // var htmlStr = "";
                                // for (i = 0; i < data.namelist.length; i++) { 
                                //     console.log("000")
                                //     htmlStr += "<tr><td>"+data.namelist[i].name+"</td><td>"+data.namelist[i].tel+"</td></tr>";
                                // }
                                // console.log("htmlStr====",htmlStr);
                                // var contStr = "<div class='moreOperate'><span class='layui-badge table-icon-style2'>"+data.namelist.length+"</span><div class='moreOperateA'><div class='moreOperateArr'></div><div class='moreOperateAa'><table class='tableb'><tr><th>姓名</th><th>手机号</th></tr>"+htmlStr+"</table></div></div></div>"
                                // console.log("contStr====",contStr);
                                // return data.name + contStr
                        },
                    },
                    // {
                    //     field: 'status_BIND',
                    //     title: '状态',
                    //     align: 'left',
                    //     templet: function(data) {
                    //         return data.status_BIND == 1 ? "绑定激活" : "未绑定";
                    //     },
                    // },
                    {
                        field: 'phone',
                        title: '管理员',
                        align: 'left',
						templet: function(data) {
						    // console.log(data)
						    return data.phone;
						}
                        // templet: function(data) {
                        //     // return data.denglv + "<i class='layui-icon table-icon-style3' lay-event='openlog' id='openlog'>&#xe60e;</i>"
                        //     return data.uname + "<span style='font-size:12px;color:#888'> "+data.tel+"</span>"
                        // },
                    },
                    {
                        field: 'createtime',
                        title: '绑定/激活时间',
                        align: 'left',
                        // templet: function(data) {
                        //     // return data.denglv + "<i class='layui-icon table-icon-style3' lay-event='openlog' id='openlog'>&#xe60e;</i>"
                        //     return data.bindtime + " / " + data.bindtime
                        // },
                    },
                    {
                        field: 'uidnum',
                        title: '设备用户数',
                        align: 'left',
						templet: function(data) {
							return 1;
						}
                    },

                    {
                        field: 'available',
                        title: '可用空间<i class="layui-icon iconfont icon-zu200 m5" lay-tips="包含自有设备空间、共享空间、安全云空间等"></i>',
                        align: 'left',
                        width:100,
                        templet: function(data) {
                            return setter.getFileSize(data.available*1024*1024);
                            // console.log("data=========+++",data)
                            //编辑
                            // var userSpaceListArr = [];
                            // $.Ajax({
                            //     async: false,
                            //     url: server + "/ADMINM/device/DeviceDetails",
                            //     dataType: "json",
                            //     method: 'get',
                            //     data:{"DEVICEID":data.deviceid},
                            //     success: function(obj) {
                            //         if(obj.code == 1){
                            //             // console.log("obj-------------------",obj.userSpaceList)
                            //             userSpaceListArr = obj.userSpaceList;
                            //         }else{
                            //             layer.msg(obj.msg);
                            //         }
                            //     }
                            // });

                            // if(userSpaceListArr.length){
                            //     // console.log("userSpaceListArr.length-------------------",userSpaceListArr.length)
                            //     var htmlStr = "";
                            //     var usedStr = 0;
                            //     for (i = 0; i < userSpaceListArr.length; i++) { 
                            //         // console.log("000")
                            //         htmlStr += "<tr><td>"+userSpaceListArr[i].nickname+"</td><td>"+ userSpaceListArr[i].total + "MB | 可用" + userSpaceListArr[i].used + "MB | 已用" + userSpaceListArr[i].available +"MB</td><td>"+userSpaceListArr[i].filecount+"</td></tr>";
                            //         usedStr += parseInt(userSpaceListArr[i].used);
                            //     }
                            //     // console.log("htmlStr====",htmlStr);
                            //     var contStr = "<div class='moreOperate leftS'><i class='layui-icon iconfont icon-zu204' lay-event='space'></i><div class='moreOperateA'><div class='moreOperateArr'></div><div class='moreOperateAa'><table class='tableb'><tr><th>用户</th><th>空间使用情况</th><th>文件数</th></tr>"+htmlStr+"</table></div></div></div>"
                            //     // console.log("contStr====",contStr);
                            //     return +usedStr+'MB'+contStr;
                            // }else{
                            //     return data.available+'MB'
                            // }
                        },
                    },
                    {
                        field: 'times',
                        title: '近7天活跃次数<i class="layui-icon iconfont icon-zu200 m5" lay-tips="最近7天内，打开APP次数，含电视APP"></i>',
                        align: 'left',
                        width:120,
                        templet: function(data) {
                            return 0;
                        }
                    },
                    
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

    //监听指定开关
    form.on('switch(switchTest)', function(data){
        layer.msg('开关checked：'+ (this.checked ? 'true' : 'false'), {
            offset: '6px'
        });
        layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
    });
    
    $("#keyword").on({
        keyup : function(e){        
            var flag = e.target.isNeedPrevent;
            if(flag)  return;     
            tableRender();
            e.target.keyEvent = false ;
        },
        keydown : function(e){
            e.target.keyEvent = true ; 
        },
        input : function(e){
            if(!e.target.keyEvent){
                tableRender();
            }
        },
        compositionstart : function(e){
            e.target.isNeedPrevent = true ;
        },
        compositionend : function(e){
            e.target.isNeedPrevent = false;
        }
    });

    form.on('select(component-statusselect)', function(data){
        tableRender();
    });

    tableRender();

    
    window.onkeyup = function(ev) {
        var key = ev.keyCode || ev.which;
        if (key == 27) { //按下Escape
            layer.closeAll('iframe'); //关闭所有的iframe层
        }
        if (key == 13) { //按下Escape
            $('#search').click();

        }
    }
    //监听表格复选框选择
    table.on('checkbox(test-table-operate)', function(obj) {
        console.log(obj)
    });
    table.on('checkbox(test-table-operate)', function(obj) {
        // console.log(obj.checked); //当前是否选中状态
        // // console.log(obj.data); //选中行的相关数据
        // console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
        // // console.log(table.checkStatus('test-table-operate').data); // 获取表格中选中行的数据
        if (obj.checked && obj.type == 'one') {
            var devi = {};
            devi = obj.data.id;
            arrangeList.push(devi)
        }
        if (!obj.checked && obj.type == 'one') {
            var index = arrangeList.indexOf(obj.data.id);
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
                devi = con.id;

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
                $.ajax({
                    async: false,
                    type: "get",
                    url: url + "/ruletemplate/deleteruletemplate",
                    dataType: "json",
                    xhrFields: {
                        withCredentials: true
                    },
                    //成功的回调函数
                    data: {
                        "id": data.id
                    },
                    success: function (msg) {

                        if (msg.code == '0') {
                            layer.msg("删除成功");
                            reloads();
                        } else {
                            layer.msg("删除失败");

                        }

                    },
                    //失败的回调函数
                    error: function () {
                        console.log("error")
                    }
                })
                layer.close(index);
            });
        } else if (obj.event === 'details') {
            console.log("data.details_id===",data.device_id);
            layer.open({
                type: 2,
                title: '设备详情',
                offset: 'rb',
                area: ['85%', '100%'],
                // btn: ['保存', '取消'],
                // btnAlign: 'c',
                maxmin: true,
                content: 'device_details.html?device_id='+data.device_id,
                // content: 'account_edit_pop.html?id=" + data.id,
                yes: function(index, layero) {
                }
            });
        } else if (obj.event === 'openavaliable'){
            layer.open({
                type: 2,
                title: '空间详情',
                area: ["600px","400px"],
                // btn: ['保存', '取消'],
                btnAlign: 'c',
                maxmin: true,
                content: 'avaliable_details.html?deviceid='+data.deviceid,
                // content: 'account_edit_pop.html?id=" + data.id,
                yes: function(index, layero) {
                }
            });
            //在主窗口打开 操作日志 页面 
            // top.layui.index.openTabsPage("system/operation_log.html", '操作日志');
        }

    })
    var $ = layui.$,
    active = {
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
            tableRender();
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
        $(".laytable-cell-1-0-8").css("overflow", "visible");
        $(this).children(".moreOperateA").show();
    })
    $(document).on("mouseleave",".moreOperate",function(){
        $(".laytable-cell-1-0-8").css("overflow", "hidden");
        $(this).children(".moreOperateA").hide();
    })
    /* 表格中 鼠标移上 显示更多详细CSS html js end*/




});
