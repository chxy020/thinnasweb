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
        var types = $("#typeselect").val() || "";
        //表格加载渲染
        table.render({
            elem: '#test-table-operate',
            height: 'full-60',//必须留着
            url: server + "/ADMINM/logger/getSysOperationLog",
            method: 'post',
            where:{
                "search":keywords||"",
                "o_state":types,
                "startTime":bindtimeStart ?  bindtimeStart + " 00:00:00" : "",
                "endTime":bindtimeEnd ? bindtimeEnd + " 00:00:00" : ""
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
                        align: 'left'
                    }, {
                        field: 'name',
                        title: '昵称',
                        align: 'left'
                    },
                    {
                        field: 'roleName',
                        title: '角色',
                        align: 'left'
                    },
                    {
                        field: 'createtime',
                        title: '操作时间',
                        align: 'left',
                    },
                    {
                        field: 'rpLength',
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
    form.on('select(component-usernameselect)', function(data){
        tableRender();
    });

    tableRender();


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
