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




    var url = setter.baseUrl;
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }

    console.log(getUrlParam("add"))
    //监听提交
    form.on('submit(component-form-select)', function (data) {
        var field = data.field; //获取提交的字段
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引

        //提交 Ajax 成功后，关闭当前弹层并重载表格
        //$.ajax({});
        parent.layui.table.reload('test-table-operate'); //重载表格
        parent.layer.close(index); //再执行关闭
    });

    var editid = +$("#editid").val();
    if (editid) {
        //编辑
        $("#seatmapbtn").text("编辑座区图");
    }


    function editSeatMap() {
        $.ajax({
            url: url + "/roomtemplate/findByIdTemplatecode",
            type: "POST",
            data: {
                "id": editid
            },
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                console.log("---findByIdTemplatecode----", data)
                if (data.code == "0") {
                    var templatecode = data.data.templatecode;
                    sessionStorage.setItem("_seatscomplete", templatecode);
                    // var topLayui = parent === self ? layui : top.layui;
                    // topLayui.index.openTabsPage("arrange/meeting/seatmapseditor.html", "会场编辑器");

                    parent.layer.open({
                        type: 2,
                        title: '座区图',
                        content: 'seatmapseditor.html',
                        maxmin: true,
                        area: ['100%', '100%'],
                        scrollbar: false,
                        yes: function (index, layero) {
                        },
                        success: function (layero, index) {
                            var body = layer.getChildFrame('body', index);
                        }
                    });

                } else {
                    layer.msg(data.msg, {
                        icon: 5
                    });
                }
            },
            error: function (error) {

            }
        });
    }

    $("#seatmapbtn").bind("click", function () {
        if (editid) {
            //编辑
            editSeatMap();
        } else {
            //新增
            sessionStorage.setItem("_seatscomplete", "");
            parent.layer.open({
                type: 2,
                title: '座区图',
                content: 'seatmapseditor.html',
                maxmin: true,
                area: ['100%', '100%'],
                scrollbar: false,
                yes: function (index, layero) {
                },
                success: function (layero, index) {
                    var body = layer.getChildFrame('body', index);
                }
            });
        }
    })
})