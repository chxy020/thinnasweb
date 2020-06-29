layui.config({
    base: '../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index','laydate','form'],function () {
    var $ = layui.$,
    setter = layui.setter;
    window.element = layui.element;
    var url = setter.baseUrl;
    console.log(url)
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
                // location.href = "user/login.html"
                console.log(msg.code);
            }
            if (isEmptyObject(data) != 0) {

                if ($.inArray("user", data) == -1) {
                    $('#user').addClass('layui-hide');
                }
                if ($.inArray("role", data) == -1) {
                    $('#role').addClass('layui-hide');
                }
                if ($.inArray("meet", data) == -1) {
                    $('#meet').addClass('layui-hide');
                }
                if ($.inArray("meeting", data) == -1) {
                    $('#meeting').addClass('layui-hide');
                }
                if ($.inArray("person", data) == -1) {
                    $('#person').addClass('layui-hide');
                }
                if ($.inArray("type", data) == -1) {
                    $('#type').addClass('layui-hide');
                }
                if ($.inArray("rule", data) == -1) {
                    $('#rule').addClass('layui-hide');
                }
                if ($.inArray("user", data) == -1 && $.inArray("role", data) == -1) {
                    $('#avirGroup').addClass('layui-hide');
                }


            } else {
                console.log("2")
                $('#user').addClass('layui-hide');
                $('#role').addClass('layui-hide');
                $('#avirGroup').addClass('layui-hide');
            }
        },
        error: function (error) {
            console.log(error)
        },
    })


    function isEmptyObject(obj) {

        var jlength = 0;
        for (var key in obj) {
            if (key != "null") {
                jlength++;
            }
        };
        return jlength
    };
    $.ajax({
        async: false,
        type: "get",
        url: url + "/user/getuser",
        datatype: 'json',

        xhrFields: {
            withCredentials: true
        },
        //成功的回调函数
        success: function (msg) {
            // if (msg.code == 0) {
            //     $('#username').text(msg.data.anotherName)
            // }
            // if (msg.code == 20090) {
            //     layer.msg(msg.msg, {
            //         offset: "15px",
            //         icon: 2,
            //         time: 1000
            //     }, function () {
            //         parent.location.href = "user/login.html"
            //     })
            // }
            // if (msg.code == 300) {
            //     layer.msg(msg.msg, {
            //         offset: "15px",
            //         icon: 2,
            //         time: 1000
            //     }, function () {
            //         parent.location.href = "user/login.html"
            //     })
            // }

        },
        error: function (error) {
            console.log(error)
        },
    })
    $("#logout").click(function () {
        $.ajax({
            async: false,
            type: "get",
            url: url + "/quit",
            datatype: 'json',
            xhrFields: {
                withCredentials: true
            },
            //成功的回调函数
            success: function (msg) {
                location.href = "user/login.html"
            },
            error: function (error) {
                console.log(error)
            },
        })
    })
})