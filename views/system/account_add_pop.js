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

    
    $.Ajax({
        async: false,
        url: server + "/ADMINM/user/goAddU",
        dataType: "json",
        method: 'get',
        success: function(obj) {
            console.log(obj);
            roleSelectHtml(obj.roleList);
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
        
        //写死 USERNAME(用户名) PASSWORD（密码）
        // condi.USERNAME = "USER" + new Date().getTime();
        // condi.PASSWORD = "PWD" + new Date().getTime();

        addSystemUser(condi);
        return false;
    });

    function roleSelectHtml(roleList){
        for (i = 0; i < roleList.length; i++) {
            var role = roleList[i] || {};
            $('#roleselset').append(new Option(role.role_NAME, role.role_ID));
        }
        layui.form.render("select");
    }


    function addSystemUser(condi){
        // USERNAME(用户名) NUMBER（编号） 
        // PASSWORD（密码） NAME（名字） PHONE（电话） BZ （备注） STATUS （0正常1冻结） 
        // ROLE_ID（goAddU返回的参数选择哪个角色就是绑定这个id）

        $.Ajax({
            async: false,
            url: server + "/ADMINM/user/saveU",
            dataType: "json",
            method: 'post',
            data:condi,
            success: function(obj) {
                if(obj.code == 1){
                    layer.msg("添加成功");

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
    

});