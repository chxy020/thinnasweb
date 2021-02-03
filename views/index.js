layui.config({
    base: '../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index','laydate','form'],function () {
    var $ = layui.$,
    element = layui.element,
    setter = layui.setter;
    // window.element = layui.element;
    var server = setter.baseUrl;

    $.Ajax({
        async: false,
        type: "POST",
        // url: server + "/ADMINM/main/index",
        url: server + "/ADMINM/menu/getParentMeun",
        // url: server + "/ADMINM/role",
        datatype: 'json',
        // contentType:"application/x-www-form-urlencoded",
        // crossDomain:true, //设置跨域为true
        xhrFields: {
            withCredentials: true
        },
        //成功的回调函数
        success: function (obj) {
            if(obj.user){
                // window.__user = obj.user;
                // getUserInfo(obj.user.user_ID);
            }

            getUserInfo();
            if(obj && obj instanceof Array){
                let menu = obj || []
                buildMenuData(menu);
            }
            // var data = msg.data;
            // if (msg.code != 0) {
            //     // location.href = "user/login.html"
            //     console.log(msg.code);
            // }
            // if (isEmptyObject(data) != 0) {

            //     if ($.inArray("user", data) == -1) {
            //         $('#user').addClass('layui-hide');
            //     }
            //     if ($.inArray("role", data) == -1) {
            //         $('#role').addClass('layui-hide');
            //     }
            //     if ($.inArray("meet", data) == -1) {
            //         $('#meet').addClass('layui-hide');
            //     }
            //     if ($.inArray("meeting", data) == -1) {
            //         $('#meeting').addClass('layui-hide');
            //     }
            //     if ($.inArray("person", data) == -1) {
            //         $('#person').addClass('layui-hide');
            //     }
            //     if ($.inArray("type", data) == -1) {
            //         $('#type').addClass('layui-hide');
            //     }
            //     if ($.inArray("rule", data) == -1) {
            //         $('#rule').addClass('layui-hide');
            //     }
            //     if ($.inArray("user", data) == -1 && $.inArray("role", data) == -1) {
            //         $('#avirGroup').addClass('layui-hide');
            //     }


            // } else {
            //     console.log("2")
            //     $('#user').addClass('layui-hide');
            //     $('#role').addClass('layui-hide');
            //     $('#avirGroup').addClass('layui-hide');
            // }
        },
        error: function (error) {
            window.sessionStorage.setItem("__userinfo","");
            location.href = setter.loginUrl;
            console.log(error);
        },
    });

    window.__getUserInfo = getUserInfo;
    function getUserInfo(userid){
        var user = window.sessionStorage.getItem("__userinfo") || "";
        if(user){
            user = JSON.parse(user);
            if(user.headimg != "" && user.headimg.indexOf("headImg.png") == -1){
                $("#headimg").attr("src",user.headimg);
            }
            $("#phone").html(user.phone || "");
            $("#username").html(user.name || "");

            window.__user = user;
        }else{
            window.sessionStorage.setItem("__userinfo","");
            location.href = setter.loginUrl;
        }

        // $.Ajax({
        //     async: false,
        //     type: "GET",
        //     url: server + "/ADMINM/user/userInfo",
        //     datatype: 'json',
        //     data:{"USER_ID":userid},
        //     xhrFields: {
        //         withCredentials: true
        //     },
        //     //成功的回调函数
        //     success: function (obj) {
        //         if(obj.code == 1){
        //             var user = obj.user || {};
        //             if(user.headimg != "" && user.headimg.indexOf("headImg.png") == -1){
        //                 $("#headimg").attr("src",server + user.headimg);
        //             }

        //             $("#phone").html(user.phone || "");
        //             $("#username").html(user.username || "");

        //             window.__user = obj.user;
        //         }
        //     },
        //     error: function (error) {
        //         console.log(error)
        //     },
        // });
    }
    
    function buildMenuData(data){
        var html = [];
        var imgclass= ["","icon-data-analysis","icon-yonghuguanli","icon-shebeishebeiguanli","icon-xitongguanli","","","","","icon-fuwu2","icon-zu13","icon-shezhi","","","","","icon-zu12"]
        if(data && data.length > 0){
            data.forEach(function(obj){
                var name = obj.menuName || "";
                var url = obj.menuHtml || "";
                var icon = imgclass[obj.menuId] || ""
                html.push('<li data-name="get" class="layui-nav-item">');

                if(obj.children && obj.children.length > 0){
                    html.push('<a href="javascript:;" lay-tips="' + name + '">');
                }else{
                    html.push('<a href="javascript:;" lay-href="' + url +'" lay-tips="' + name + '">');
                }
                html.push('<i class="layui-icon iconfont ' + icon +'"></i>');
                html.push('<cite>' + name + '</cite>');
                html.push('</a>');
                
                // debugger
                if(obj.children && obj.children.length > 0){
                    html.push('<dl class="layui-nav-child">');
                    obj.children.forEach(function(cnode){
                        var name = cnode.menuName || "";
                        var url = cnode.menuHtml || "";
                        if(name == "退出登录"){
                            html.push('<dd id="loginoutbtn"><a href="javascript:;">'+name+'</a></dd>');
                        }else if(name == "修改密码"){
                            html.push('<dd id="forgetbtn"><a href="javascript:;">'+name+'</a></dd>');
                        }else{
                            html.push('<dd ><a lay-href="' + url +'">'+name+'</a></dd>');
                        }
                    });
                    html.push('</dl>');
                }
                html.push('</li>');
            });

            // html.push('<li data-name="get" class="layui-nav-item">');
            // html.push('<a href="javascript:;" lay-href="software/software_list.html" lay-tips="软件应用" lay-direction="2">');
            // html.push('<i class="layui-icon iconfont icon-jurassic_apply"></i>');
            // html.push('<cite>软件应用</cite>');
            // html.push('</a>');
            // html.push('</li>');

            $("#LAY-system-side-menu").html(html.join(''));
        }

        element.render();

        $("#loginoutbtn").bind("click",function(){
            loginOut();
        });
        $("#forgetbtn").bind("click",function(){
            changePwd();
        });
    }

    function changePwd(){
        layer.open({
            type: 2,
            title: '修改密码',
            area: ['400px', '300px'],
            btn: ['确定', '取消'],
            btnAlign: 'c',
            maxmin: true,
            content: 'user/modify.html',
            yes: function(index, layero) {
                var submit = layero.find('iframe').contents().find("#submit");
                submit.click();
            }
        });
    }
    function loginOut(){
        layer.confirm('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;确定退出系统吗？&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',{title:'退出登录',btnAlign:'c'}, function() {
            $.Ajax({
                async: false,
                type: "post",
                // url:server + "/ADMINM/logout",
                url:server + "/ADMINM/login/logout",
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                success: function(obj) {
                    if(obj.code == 0){
                        window.sessionStorage.setItem("__userinfo","");
                        location.href = setter.loginUrl;
                    }else{
                        layer.msg(obj.msg);
                    }
                },
                //失败的回调函数
                error: function() {
                    console.log("error")
                }
            })
        });
    }


    var $ = layui.$,
    active = {
        loginout: function() {
            loginOut();
            return;
        },
        changepwd: function() {
            changePwd();
            return;
        }
    };
    //给页面里的layui-dS 绑定事件
    $('.layui-ds').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });


    // function isEmptyObject(obj) {
    //     var jlength = 0;
    //     for (var key in obj) {
    //         if (key != "null") {
    //             jlength++;
    //         }
    //     };
    //     return jlength
    // };
    // $.ajax({
    //     async: false,
    //     type: "get",
    //     url: url + "/user/getuser",
    //     datatype: 'json',

    //     xhrFields: {
    //         withCredentials: true
    //     },
    //     //成功的回调函数
    //     success: function (msg) {
    //         // if (msg.code == 0) {
    //         //     $('#username').text(msg.data.anotherName)
    //         // }
    //         // if (msg.code == 20090) {
    //         //     layer.msg(msg.msg, {
    //         //         offset: "15px",
    //         //         icon: 2,
    //         //         time: 1000
    //         //     }, function () {
    //         //         parent.location.href = "user/login.html"
    //         //     })
    //         // }
    //         // if (msg.code == 300) {
    //         //     layer.msg(msg.msg, {
    //         //         offset: "15px",
    //         //         icon: 2,
    //         //         time: 1000
    //         //     }, function () {
    //         //         parent.location.href = "user/login.html"
    //         //     })
    //         // }

    //     },
    //     error: function (error) {
    //         console.log(error)
    //     },
    // })
    // $("#logout").click(function () {
    //     $.ajax({
    //         async: false,
    //         type: "get",
    //         url: url + "/quit",
    //         datatype: 'json',
    //         xhrFields: {
    //             withCredentials: true
    //         },
    //         //成功的回调函数
    //         success: function (msg) {
    //             location.href = "user/login.html"
    //         },
    //         error: function (error) {
    //             console.log(error)
    //         },
    //     })
    // });
})