
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
    
    var deviceid = setter.getUrlParam("deviceid",uri) || "";
    
    if(!deviceid){
        layer.msg("没有获取到设备id");
        return;
    }

    //表格加载渲染
    table.render({
        elem: '#test-table-listDeviceUserSpace',
        height: 'full-60',//必须留着
        url: server + "/ADMINM/device/listDeviceUserSpace",
        where:{
            "DEVICEID":deviceid
        },
        method: 'get',
        xhrFields: {
            withCredentials: true
        }
        ,page: {
            layout: ['prev', 'page', 'next', 'count', 'skip']
        },
        cols: [
            [ 
                {
                    field: 'nickname',
                    title: '用户',
                    align: 'left',
                }, {
                    field: 'status',
                    title: '空间使用情况',
                    align: 'left',
                    templet: function(data) {
                        return data.total + " | " + data.used + " | " + data.available;
                    }
                },
                {
                    field: 'filecount',
                    title: '文件数量',
                    align: 'left'
                },
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
                    "data": res.userSpaceList
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
        limit: 5,
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

    window.onkeyup = function(ev) {
        var key = ev.keyCode || ev.which;
        if (key == 27) { //按下Escape
            layer.closeAll('iframe'); //关闭所有的iframe层
        }
    }

});
