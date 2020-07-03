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




})