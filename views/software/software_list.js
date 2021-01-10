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
    
    var $ = layui.$,
    active = {
        history:function(){
            showHistoryList();
        },
        //刷新
        update: function() {
            updateApp();
        },
    };

    //给页面里的layui-dS 绑定事件
    $('.layui-ds').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    getNowApp();

    function getNowApp(){
        // var server = "http://139.196.147.194:8084";
        layer.load(2);
        $.Ajax({
            async: true,
            url: server + "/jqkj/tvApk/getNowApp",
            dataType: "json",
            method: 'get',
            success: function(obj) {
                layer.closeAll();
                if(obj.status == 0){
                    var list = obj.data || [];
                    buildNowVersionHtml(list);
                }else{
                    layer.msg("获取最新版本错误");
                }
            },
            error:function(obj){
                layer.closeAll();
            }
        });
    }

    function buildNowVersionHtml(list){
        for(var i = 0,len = list.length; i < len; i++){
            var item = list[i] || {};
            var type = item.type;
            if(type === 0){
                var html = [];
                html.push('<td rowspan=2 width="20%"><h4 class="softbt">AI存储APP</h4></td>');
                html.push('<td width="15%"><i class="layui-icon iconfont icon-anzhuo"></i> V ' + item.version + '</td>');
                html.push('<td width="20%">适用系统：Android 5.5.0 及以上</td>');
                html.push('<td width="25%">更新时间：'+ item.updatetime + '</td>');
                html.push('<td width="10%"><div data="1_' + item.version + '" class="layui-ds updatebtn" style="cursor: pointer;"><i class="layui-icon iconfont icon-shuaxin"></i> 更新</div></td>');
                html.push('<td width="10%"><a href="javascript:;" class="layui-ds lishi-btn lishibtn">历史版本</a></td>');
                
                $("#app0").html(html.join(''));
            }else if(type == 1){
                var html = [];
                html.push('<td rowspan=2 width="20%"><h4 class="softbt">ThinNAS PC电脑端</h4></td>');
                html.push('<td width="15%"><i class="layui-icon iconfont icon-windows"></i> V ' + item.version + '</td>');
                html.push('<td width="20%">适用系统：Windows 7 及以上</td>');
                html.push('<td width="25%">更新时间：'+ item.updatetime + '</td>');
                html.push('<td width="10%"><div data="2_' + item.version + '" class="layui-ds updatebtn" style="cursor: pointer;"><i class="layui-icon iconfont icon-shuaxin"></i> 更新</div></td>');
                html.push('<td width="10%"><a href="javascript:;" class="layui-ds lishi-btn lishibtn">历史版本</a></td>');
                $("#app1").html(html.join(''));
            }
        }
        
        $(".lishibtn").unbind("click");
        $(".lishibtn").bind("click",function(){
            showHistoryList();
        });
        $(".updatebtn").unbind("click");
        $(".updatebtn").bind("click",function(ele){
            var data = $(ele.currentTarget).attr("data");
            console.log(data);
            var d = data.split('_');
            updateApp(d[0],d[1]);
        });
    }

    function showHistoryList(){
        layer.open({
            type: 2,
            title: '历史版本',
            area: ['100%', '100%'],
            // btn: ['保存', '取消'],
            // btnAlign: 'c',
            maxmin: true,
            content: 'history_list.html',
            yes: function(index, layero) {
                // var submit = layero.find('iframe').contents().find("#submit");
                // submit.click();
            }
        });
    }

    function updateApp(t,v){
        layer.open({
            type: 2,
            title: '更新软件版本',
            area: ['100%', '100%'],
            btn: ['确定', '取消'],
            btnAlign: 'c',
            maxmin: true,
            content: 'update_pop.html?t=' + t + '&v=' + v,
            yes: function(index, layero) {
                var submit = layero.find('iframe').contents().find("#submit");
                submit.click();
            }
        });
    }
});
