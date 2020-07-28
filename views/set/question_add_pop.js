layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form','jquery'], function () {
    var $ = layui.jquery,
    form = layui.form,
    layer = layui.layer;

    // 添加分类&选择分类切换
    $(document).on('click','#addClassbtn',function(){
        $('#addClass').hide();
        $('#cgClass').show();
    });
    $(document).on('click','#cgClassbtn',function(){
        $('#addClass').show();
        $('#cgClass').hide();
    });



});