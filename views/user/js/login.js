layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    setter: "config"
}).use(['setter','form'], function(){
    // var laydate = layui.laydate;
    var form = layui.form;
    var $ = layui.$;
    var setter = layui.setter;
    var url = setter.baseUrl;

    var active = {
        forgetPop: function() {
            layer.open({
                type: 2,
                title: '忘记密码',
                area: ['400px', '300px'],
                maxmin: true,
                content: 'forget.html',
                yes: function(index, layero) {
                }
            });
        },
        codeImg:function(){
            console.log("codeImg----");
            getImageCode();
        }
    };

    $('.layadmin-link,.layadmin-user-login-codeimg').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    
    //监听提交
    form.on('submit(login)', function(data){
        // alert(888)
        // layer.msg(JSON.stringify(data.field),function(){
        //     location.href='./index.html'
        // });
        return false;
    });


    function getImageCode(){
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


//登录框位置
function wLoanWrapPosition(params,contDiv) {
    var windowH=$(window).height();
    console.log("1",windowH);
    console.log("1",params);
    if(windowH > params){
        $(contDiv).css({'margin-top':(windowH-params)/2});
    }else{
        $(contDiv).css({'margin-top':'20px'});
        $('.login-bg').css({'height':'540px'});
    }
}
wLoanWrapPosition(540,'.layui-anim-up');
//浏览器窗口变化时 位置重置
$(window).resize(function() {
    wLoanWrapPosition(540,'.layui-anim-up');
});