layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    setter: "config"
}).use(['setter','form'], function(){
    // var laydate = layui.laydate;
    var  form = layui.form;
    var $ = layui.$;
    var setter = layui.setter;
    var url = setter.baseUrl;

    var active = {
        smsCode: function() {
            console.log("smsCode--------");
            getSmsCode();
        }
    };

    $('#LAY-user-getsmscode').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    
    //监听提交
    form.on('submit(login)', function(data){
        // alert(888)
        console.log("重置密码------")
        // layer.msg(JSON.stringify(data.field),function(){
        //     location.href='./index.html'
        // });
        return false;
    });


    function getSmsCode(){
        $.ajax({
            async: false,
            type: "get",
            url: url + "/permission/getpremission",
            datatype: 'json',
            xhrFields: {
                withCredentials: true
            },
            //成功的回调函数
            success: function (msg) {
                var data = msg.data;
                if (msg.code != 0) {
                }
            },
            error: function (error) {
                console.log(error)
            }
        })
    }
    
});