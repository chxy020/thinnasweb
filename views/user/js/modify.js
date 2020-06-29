layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    setter: "config"
}).use(['setter','form'], function(){
    // var laydate = layui.laydate;
    var  form = layui.form;
    //监听提交
    form.on('submit(login)', function(data){
        // alert(888)
        layer.msg(JSON.stringify(data.field),function(){
            location.href='index.html'
        });
        return false;
    });

    var $ = layui.$,
        active = {
            forgetPop: function() {
                layer.open({
                    type: 2,
                    title: '忘记密码',
                    area: ['400px', '300px'],
                    // btn: ['确定', '取消'],
                    // btnAlign: 'c',
                    maxmin: true,
                    content: 'forget.html',
                    yes: function(index, layero) {
                    }
                });
            },
        };

    $('.layadmin-link').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
});