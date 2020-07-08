layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
    ,formSelects: 'formSelects-v4'//多选
}).use(['index', 'form','jquery','formSelects'], function () {
    var $ = layui.$,
    setter = layui.setter,
    form = layui.form,
    layer = layui.layer,
    formSelects = layui.formSelects;//多选
    setter = layui.setter,
    router = layui.router();

    var server = setter.baseUrl;
    var uri = window.location.search;
    
    var USER_ID = setter.getUrlParam("USER_ID",uri) || "";


    $.Ajax({
        async: false,
        url: server + "/ADMINM/user/goEditU",
        dataType: "json",
        method: 'get',
        data:{"USER_ID":USER_ID},
        success: function(obj) {
            console.log(obj);
            roleSelectHtml(obj.roleList);
            changeUserHtml(obj);
        }
    });

    //监听提交
    form.on('submit(submit)', function(data){
        // alert(888)
        // layer.msg(JSON.stringify(data.field),function(){
        //     location.href='index.html'
        // });
        console.log(data.field)
        var condi = {};
        var phone = data.field.PHONE;
        condi = data.field
        if(!setter.isTel(phone)){
			layer.msg("手机号输入错误");
			return false;
        }
        var status = $("#STATUS").prop("checked") == true ? 0 : 1;
        condi.STATUS = status;

        editSystemUser(condi);
        return false;
    });
    
    function changeUserHtml(obj){
        $("#USERNAME").val(obj.USERNAME || "");
        // $("#PASSWORD").val(obj.PASSWORD || "");
        $("#NAME").val(obj.NAME || "");
        $("#PHONE").val(obj.PHONE || "");
        $("#BZ").val(obj.BZ || "");
        $('#roleselset').val(obj.ROLE_ID);
        if(+obj.STATUS == 1){
            $("#STATUS").prop("checked",false);
        }else{
            $("#STATUS").prop("checked",true);
        }
        layui.form.render();
    }

    function roleSelectHtml(roleList){
        for (i = 0; i < roleList.length; i++) {
            var role = roleList[i] || {};
            $('#roleselset').append(new Option(role.role_NAME, role.role_ID));
        }
        layui.form.render("select");
    }

    function editSystemUser(condi){
        // USERNAME(用户名) NUMBER（编号） 
        // PASSWORD（密码） NAME（名字） PHONE（电话） BZ （备注） STATUS （0正常1冻结） 
        // ROLE_ID（goAddU返回的参数选择哪个角色就是绑定这个id）

        condi.USER_ID = USER_ID;

        $.Ajax({
            async: false,
            url: server + "/ADMINM/user/editU",
            dataType: "json",
            method: 'post',
            data:condi,
            success: function(obj) {
                if(obj.code == 1){
                    layer.msg("修改成功");

                    setTimeout(function(){
                        //刷新父页面
                        window.parent.location.reload();
                        var index = parent.layer.getFrameIndex(window.name);
               		    parent.layer.close(index);
                    },1500);
                }else{
                    layer.msg(obj.msg || "添加失败");
                }
            }
        });
    }

    function resetPwd(){
        layer.confirm('&nbsp;&nbsp;&nbsp;&nbsp;是否确定重设密码?',{title:'提示'}, function(index) {
            
        });
    }

    function resetPwdHttp(){
        var index = layer.msg('密码发送中', {
            icon: 16
            ,shade: 0.01
            ,time: 0
        });
        $.Ajax({
            async: false,
            url: server + "/ADMINM/user/goEditU",
            dataType: "json",
            method: 'get',
            data:{"USER_ID":USER_ID},
            success: function(obj) {
                console.log(obj);
                // roleSelectHtml(obj.roleList);
            }
        });
    }

    

    var $ = layui.$,
        active = {
        //重置密码
        resetPassword: function() {
            resetPwd();

            // var _this=this;
            // //点击重设密码显示密码发送中，请求接口发送
            
            // //发送成功后layer.msg关闭，此按钮移除，已发送密码按钮显示
            // setTimeout(function(){
            //     layer.close(index);//关闭发送中
            //     $(_this).remove()
            //     $('#sendSuccess').removeClass("layui-hide")
            //     // layer.msg("密码发送成功");//变相关闭发送中
            // },3000)

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




















    // //多选  接口获取数据
    // formSelects.data('select1', 'local', {
    //     arr: [
    //         // {"name": "分组-1", "type": "optgroup"},
    //         {"name": "管理员", "value": 1},
    //         {"name": "子账号", "value": 2},
    //         // {"name": "分组-2", "type": "optgroup"},
    //         {"name": "客服人员", "value": 3},
    //         {"name": "客服人员A", "value": 4},
    //         {"name": "客服人员B", "value": 5}
    //     ]
    // });
    // //多选 取值
    // /*
    // layui.formSelects.value('select1');				//取值默认数组
    // layui.formSelects.value('select1', 'val');		//取值val数组
    // layui.formSelects.value('select1', 'valStr');	//取值val字符串
    // layui.formSelects.value('select1', 'name');		//取值name数组
    // layui.formSelects.value('select1', 'nameStr');	//取值name字符串
    // */
    // //多选 赋值
    // //layui.formSelects.value('select1', []);          //赋值空数组, 清空所有
    // layui.formSelects.value('select1', [1, 2]);      //赋值 北京,上海
    // //layui.formSelects.value('select1', [5], true);   //追加赋值 天津
    // //layui.formSelects.value('select1', [1], false);  //删除 已选择 [北京]



})