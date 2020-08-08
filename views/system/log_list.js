layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'table', 'jquery','form','laydate'], function() {
    var table = layui.table,
        setter = layui.setter,
        element = layui.element,
        laydate = layui.laydate,
        form = layui.form;
        $ = layui.jquery;

    var server = setter.baseUrl;
    var devices = {};
    var arrangeList = [];

    var bindtimeStart = "";
    var bindtimeEnd = "";
    // var day2 = new Date();
    // day2.setTime(day2.getTime());
    // var s2 = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
    var rangetime = laydate.render({
        elem: '#rangetime',
        range: true,
        change: function(value, date, endDate){//日期时间被切换后的回调
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
        }
    });

    

    function tableRender(){
        var keywords = $("#keyword").val() || "";
        var types = $("#typeselect").val() || "";
        var username = $("#usernameselect").val() || "";
        //表格加载渲染
        table.render({
            elem: '#test-table-operate',
            height: 'full-60',//必须留着
            url: server + "/ADMINM/oplog/listOpLog",
            method: 'get',
            where:{
                "keywords":keywords||"",
                "TYPE":types,
                "USERNAME":username,
                "timeStart":bindtimeStart,
                "timeEnd":bindtimeEnd
            },
            xhrFields: {
                withCredentials: true
            },
            // data: [
            //     {
            //         id:1,
            //         jz:1,//1是开 2是禁止
            //         phone:"13800138000",
            //         nikename:'张三',
            //         role:"超级管理员",
            //         time:'2018-10-11 21:30',
            //         xytime:'50mS',
            //         ip:'120.111.265.158【深圳】',
            //         opent:'添加',
            //         opencont:'导入成功'
            //     },
            // ],
            page: {
                layout: ['prev', 'page', 'next', 'count', 'skip']
            },
            cols: [
                [
                    //表头
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
                        field: 'username',
                        title: '操作账号',
                        align: 'left',
                    }, {
                        field: 'name',
                        title: '昵称',
                        align: 'left',
                    },
                    {
                        field: 'role_NAME',
                        title: '角色',
                        align: 'left',
                    },
                    {
                        field: 'createtime',
                        title: '操作时间',
                        align: 'left',
                    },
                    {
                        field: 'rp_LENGTH',
                        title: '响应时长',
                        align: 'left',
                    },
                    {
                        field: 'ip',
                        title: 'IP地址',
                        align: 'left',
                    },
                    {
                        field: 'type',
                        title: '操作类型',
                        align: 'left',
                    },
                    {
                        field: 'content',
                        title: '操作内容',
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
                        "data": res.opLogList
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

    form.on('select(component-typeselect)', function(data){
        tableRender();
    });

    tableRender();


    

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
        layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis);
    });
    


    
    window.onkeyup = function(ev) {
        var key = ev.keyCode || ev.which;
        if (key == 27) { //按下Escape
            layer.closeAll('iframe'); //关闭所有的iframe层
        }
        if (key == 13) { //按下Escape
            $('#search').click();

        }
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

    // });
    
    var $ = layui.$,
    active = {
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
    });
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
    });

    /* 点击查看更多操作 三部分组成 CSS html js end 3.10 */

});
