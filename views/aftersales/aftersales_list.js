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

    var statusarr = ["","解决中","已关闭","已解决","待定"];
    var types = ["","硬件故障","软件故障","硬件使用障碍","软件使用障碍","优化建议","投诉反馈","其它"];
    var arrangeList = [];
    var rangetimeStart = "";
    var rangetimeEnd = "";
    var rangetime = laydate.render({
        elem: '#rangetime',
        range: true,
        // min: s2,
        // max: '2080-10-14',
        // format: 'yyyy年MM月dd日',
        // theme: 'molv'
        change: function(value, date, endDate){
            //日期时间被切换后的回调
            // console.log(value); //得到日期生成的值，如：2017-08-18
            // console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            // console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
        }
        ,done: function(value, date, endDate){//控件选择完毕后的回调—点击日期、清空、现在、确定均会触发。
            if(value){
                var d = value.split(" - ");
                rangetimeStart = d[0];
                rangetimeEnd = d[1];
            }else{
                rangetimeStart = "";
                rangetimeEnd = "";
            }
            tableRender();
            // console.log(value); //得到日期生成的值，如：2017-08-18
            // console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            // console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
        }
    });




    function tableRender(){
        var type = types[+$("#FEEDBACKTYPE").val()];
        var status = statusarr[+$("#STATUS").val()];
        //表格加载渲染
        table.render({
            elem: '#test-table-operate',
            height: 'full-100',//必须留着
            // 暂时用DATA数据
            // url: server + "/ADMINM/aftersales/listAfterSales",
            url: server + "/ADMINM/aftersales/getAftersalesList",
            where:{
                "feedbacktype":type,
                "solve_status":status,
                "startTime":rangetimeStart ? rangetimeStart + " 00:00:00" : "",
                "endTime":rangetimeEnd ? rangetimeEnd + " 00:00:00" : ""
            },
            method: 'post',
            xhrFields: {
                withCredentials: true
            }
            // DATA数据
            // ,data:[
            //     {
            //         createtime: "2020-08-02 20:03:06",
            //         describe: "qwerqwer",
            //         feedbacktype: "软件使用障碍",
            //         id: 7,
            //         imgpath: "http://img1.99114.com/group3/M00/44/ED/rBADvVsg22mAB3PxAANeHq0SdqE776.jpg,http://img4.99114.com/group3/M00/1B/6D/rBADu18f9UeAesGwAAIfkhymy_M075.jpg,http://www.99114.com/group3/M00/1A/D9/rBADu18MDt6AasDcAAAuc92Fgoo993.jpg,http://www.99114.com/group3/M00/1A/D7/rBADu18L_6SAK7FLAAAuASbSqhQ063.jpg",
            //         jjr: null,
            //         phone: "222",
            //         qq: "4444",
            //         reason: "dddsdf解决了",
            //         status: "已解决",
            //         tjr: "admin",
            //         updatetime: "2020-08-02 20:10:54",
            //         wechat: "333",
            //     }
            //     ,{
            //         createtime: "2020-08-02 18:45:08",
            //         describe: "123",
            //         feedbacktype: "投诉反馈",
            //         id: 6,
            //         imgpath: "http://img.99114.com/group3/M00/44/E9/rBADvFsg24mADgpIAALIvglpQGg430_80_80.jpg,http://img4.99114.com/group3/M00/1B/A7/rBADu18oHxOAAYT3AADF37JrfjY236.jpg,http://www.99114.com/group3/M00/1A/D9/rBADu18MDt6AasDcAAAuc92Fgoo993.jpg,http://www.99114.com/group3/M00/1A/D7/rBADu18L_6SAK7FLAAAuASbSqhQ063.jpg,http://www.99114.com/group3/M00/1A/D7/rBADu18L_6SAK7FLAAAuASbSqhQ063.jpg",
            //         jjr: "admin",
            //         phone: "123",
            //         qq: "",
            //         reason: "ffffff",
            //         status: "已关闭",
            //         tjr: "admin",
            //         updatetime: "2020-08-02 20:20:57",
            //         wechat: "123"
            //     }
            //     ,{
            //         createtime: "2020-08-02 18:45:08",
            //         describe: "123",
            //         feedbacktype: "投诉反馈",
            //         id: 8,
            //         imgpath: "http://www.99114.com/group3/M00/1A/D7/rBADu18L_6SAK7FLAAAuASbSqhQ063.jpg",
            //         jjr: "admin",
            //         phone: "123",
            //         qq: "",
            //         reason: "ffffff",
            //         status: "已关闭",
            //         tjr: "admin",
            //         updatetime: "2020-08-02 20:20:57",
            //         wechat: "123"
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
                        title: '序号',
                        unresize: 'false',
                        width:48,
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
                        field: 'feedbacktype',
                        title: '反馈类型',
                        align: 'left',
                    },
                    {
                        field: 'describe',
                        title: '问题描述',
                        align: 'left',
                    },
                    {

                        field: 'imgpath',
                        title: '图片',
                        unresize: true,
                        sort: false,
                            templet:function (d) {
                                if(d.images){
                                    var imgpathArr = d.images || [];
                                    if(imgpathArr.length > 0){
                                        var htmlStr = "";
                                        for (i = 0; i < imgpathArr.length; i++) { 
                                            if(i==0){
                                                // htmlStr += "<img src="+server+imgpathArr[i] +"></img>";
                                                htmlStr += "<img src="+ imgpathArr[i].imgurl +"></img>";
                                            }else{
                                                // htmlStr += "<img src="+server+imgpathArr[i] +" style='display: none;'></img>";
                                                htmlStr += "<img src="+ imgpathArr[i].imgurl +" style='display: none;'></img>";
                                            }
                                        }
                                        var contStr = "<div class='layer-photos-demo"+ d.id +" style='cursor:pointer;'>"+htmlStr+"</div>"
                                        return contStr;
                                    }else{
                                        return '';
                                    }
                                }else{
                                    return '';
                                }
                            }

                    },
                    {
                        field: 'phone',
                        title: '手机号',
                        align: 'left',
                    },{
                        field: 'wechat',
                        title: '微信号',
                        align: 'left',
                    },{
                        field: 'qq',
                        title: 'QQ',
                        align: 'left',
                    },{
                        field: 'tjr',
                        title: '添加人',
                        align: 'left',
                    },{
                        field: 'createtime',
                        title: '添加时间',
                        align: 'left',
                    },{
                        field: 'updatetime',
                        title: '更新时间',
                        align: 'left',
                    },{
                        field: 'status',
                        title: '解决进展',
                        align: 'left',
                        templet: function(data) {
                            if(data.status=="解决中"){
                                return '<span style="color:#3691FF">'+data.status+'</span>'
                            }else if(data.status=="已关闭"){
                                return '<span style="color:#ff0000">'+data.status+'</span>'
                            }else if(data.status=="已解决"){
                                return '<span style="color:#00d134">'+data.status+'</span>'
                            }else if(data.status=="待定"){
                                return '<span style="color:#ff6600">'+data.status+'</span>'
                            }else{
                                return '<span style="color:#fff">'+(data.status || "") +'</span>'
                            }
                        },
                    },{
                        field: 'reason',
                        title: '解决原因',
                        align: 'left',
                    },{
                        field: 'jjr',
                        title: '解决人',
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
            
            event: true,
            page: true,
            limit: 15,
            skin: 'line',
            even: true,
            limits: [10, 15,30],
            done: function(res, curr, count) {
                //表格内嵌相册
                if(res.data.length){
                    for (i = 0; i < res.data.length; i++) { 
                        layer.photos({
                            photos:'.layer-photos-demo'+res.data[i].id,
                            anim:2
                        })
                    }
                }


                // table_data = res.data;
                // layer.closeAll('loading');
                // arrangeList.length = 0;
                // layer.close(layer.index); //它获取的始终是最新弹出的某个层，值是由layer内部动态递增计算的
                // layer.close(index);    //返回数据关闭loading
                

            },
        });
    }

    function deleteAfterSales(id){
        $.Ajax({
            async: false,
            url: server + "/ADMINM/aftersales/deleteAftersales",
            dataType: "json",
            method: 'post',
            data:{"id":id},
            success: function(obj) {
                console.log(obj);
                if(obj.code == 0){
                    tableRender();

                    layer.msg("删除成功");
                }
            }
        });
    }

    function deleteAfterSalesByIds(ids){
        $.Ajax({
            async: false,
            url: server + "/ADMINM/aftersales/batchDeleteAftersales",
            dataType: "json",
            method: 'post',
            data:{"ids":ids},
            success: function(obj) {
                console.log(obj);
                if(obj.code == 0){
                    tableRender();

                    layer.msg("删除成功");
                }
            }
        });
    }


    //监听指定开关
    // form.on('switch(switchTest)', function(data){
    //     layer.msg('开关checked：'+ (this.checked ? 'true' : 'false'), {
    //         offset: '6px'
    //     });
    //     layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
    // });
    
    form.on('select(component-types)', function(data){
        tableRender();
    });
    form.on('select(component-status)', function(data){
        tableRender();
    });

    tableRender();

    
    window.onkeyup = function(ev) {
        var key = ev.keyCode || ev.which;
        if (key == 27) { //按下Escape
            layer.closeAll('iframe'); //关闭所有的iframe层
        }
        if (key == 13) { //按下Escape
            // $('#search').click();
        }
    }

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
                deleteAfterSales(data.id);
                // layer.close(index);
            });
        } else if (obj.event === 'edit') {
            window.sessionStorage.setItem("__aftersales_"+data.id,JSON.stringify(data));
            layer.open({
                type: 2,
                title: '编辑反馈',
                area: ['100%', '100%'],
                btn: ['保存', '取消'],
                btnAlign: 'c',
                maxmin: true,
                content: 'aftersales_edit_pop.html?id='+data.id,
                yes: function(index, layero) {
                    var submit = layero.find('iframe').contents().find("#submit");
                    submit.click();
                }
            });
        }

    });

    var $ = layui.$,
    active = {
        //点击搜索
        search: function() {
            
        },
        //点击添加
        add: function() {
            layer.open({
                type: 2,
                title: '添加反馈',
                area: ['100%', '100%'],
                btn: ['保存', '取消'],
                btnAlign: 'c',
                maxmin: true,
                content: 'aftersales_add_pop.html',
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
                deleteAfterSalesByIds(arrangeList.join(','));
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
        $(".layui-table-cell").css("overflow", "visible");
        $(this).children(".moreOperateA").show();
    })
    $(document).on("mouseleave",".moreOperate",function(){
        $(".layui-table-cell").css("overflow", "hidden");
        $(this).children(".moreOperateA").hide();
    })
    /* 表格中 鼠标移上 显示更多详细CSS html js end*/




});
