layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
    ,formSelects: 'formSelects-v4'//多选
}).use(['index', 'form','jquery','formSelects'], function () {
    var $ = layui.$,
        form = layui.form,
        formSelects = layui.formSelects;//多选
        setter = layui.setter,
        router = layui.router();

        //多选  接口获取数据
        formSelects.data('select1', 'local', {
            arr: [
                // {"name": "分组-1", "type": "optgroup"},
                {"name": "管理员", "value": 1},
                {"name": "子账号", "value": 2},
                // {"name": "分组-2", "type": "optgroup"},
                {"name": "客服人员", "value": 3},
                {"name": "客服人员A", "value": 4},
                {"name": "客服人员B", "value": 5}
            ]
        });
        //多选 取值
        /*
        layui.formSelects.value('select1');				//取值默认数组
        layui.formSelects.value('select1', 'val');		//取值val数组
        layui.formSelects.value('select1', 'valStr');	//取值val字符串
        layui.formSelects.value('select1', 'name');		//取值name数组
        layui.formSelects.value('select1', 'nameStr');	//取值name字符串
        */
        //多选 赋值
        //layui.formSelects.value('select1', []);          //赋值空数组, 清空所有
        layui.formSelects.value('select1', [1, 2]);      //赋值 北京,上海
        //layui.formSelects.value('select1', [5], true);   //追加赋值 天津
        //layui.formSelects.value('select1', [1], false);  //删除 已选择 [北京]



        var $ = layui.$,
            active = {
            //重置密码
            resetPassword: function() {
                var _this=this;
                //点击重设密码显示密码发送中，请求接口发送
                var index = layer.msg('密码发送中', {
                    icon: 16
                    ,shade: 0.01
                    ,time: 0
                });
                //发送成功后layer.msg关闭，此按钮移除，已发送密码按钮显示
                setTimeout(function(){
                    layer.close(index);//关闭发送中
                    $(_this).remove()
                    $('#sendSuccess').removeClass("layui-hide")
                    // layer.msg("密码发送成功");//变相关闭发送中
                },3000)

                /*$.ajax({
                        async: false,
                        type: "post",
                        // url: url+"/roomtemplate/batchRemove",
                        dataType: "json",
                        //成功的回调函数
                        data: {
                            "roomid":''
                        },
                        xhrFields: {
                            withCredentials: true
                        },
                        success: function(msg) {
                            if (msg.code == 0) {
                                layer.msg("密码发送成功");
                                reloaddata(); // 父页面刷新
                            } else {
                                layer.msg(msg.msg);
                            }
                
                        },
                        //失败的回调函数
                        error: function() {
                            console.log("error")
                        }
                    })*/
                },
        };
    //给页面里的layui-dS 绑定事件
    $('.layui-ds').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });


})