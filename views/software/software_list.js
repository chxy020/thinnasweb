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
    var $ = layui.$,
    active = {
        //刷新
        update: function() {
            layer.open({
                type: 2,
                title: '更新软件版本',
                area: ['40%', '50%'],
                btn: ['确定', '取消'],
                btnAlign: 'c',
                maxmin: true,
                content: 'update_pop.html',
                yes: function(index, layero) {
                    var submit = layero.find('iframe').contents().find("#submit");
                    submit.click();
                }
            });
        },
    };

    //给页面里的layui-dS 绑定事件
    $('.layui-ds').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });





});
