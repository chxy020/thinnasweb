layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'table', 'jquery','form','laydate'], function() {
    var table = layui.table,
        setter = layui.setter,
        laydate = layui.laydate,
        form = layui.form;
        $ = layui.jquery;

    var server = setter.baseUrl;

    function getlistQusetionC(){
        $.Ajax({
            async: false,
            url: server + "/ADMINM/question/listQusetionC",
            dataType: "json",
            method: 'get',
            success: function(obj) {
                console.log(obj);
                if(obj.code == 1){
                    setTypeQusetionCSelect(obj.questionC || []);
                }
            }
        });
    }

    function addQuestionC(name){
        $.Ajax({
            async: false,
            url: server + "/ADMINM/question/saveQuestionC",
            dataType: "json",
            method: 'get',
            data:{"NAME":name},
            success: function(obj) {
                console.log(obj);
                if(obj.code == 1){
                    layer.msg("添加成功");
                    $("#typename").val("");
                }
            }
        });
    }
    

    
    function setTypeQusetionCSelect(list){
        for (i = 0; i < list.length; i++) {
            var item = list[i] || {};
            $('#typeselect').append(new Option(item.name, item.qcid));
        }
        layui.form.render("select");
    }


    getlistQusetionC();

    $('#typename').on('keydown', function (event) {
		if (event.keyCode == 13) {
            var name = $("#typename").val() || "";
            if(!name){
                layer.msg("请输入分类名称");
                return;
            }
            addQuestionC(name);
			return false;
		}
    });
    
    // 添加分类&选择分类切换
    $(document).on('click','#addClassbtn',function(){
        $('#addClass').hide();
        $('#cgClass').show();
    });
    $(document).on('click','#cgClassbtn',function(){
        $('#addClass').show();
        $('#cgClass').hide();
    });



});