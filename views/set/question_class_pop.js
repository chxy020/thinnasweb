layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form','jquery'], function () {
    var $ = layui.jquery,
    form = layui.form,
    layer = layui.layer;




});