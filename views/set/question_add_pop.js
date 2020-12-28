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

    var uri = window.location.search;
    
    var qid = setter.getUrlParam("qid",uri) || "";
    var qcid = setter.getUrlParam("qcid",uri) || "";

    if(qid && qcid){
        var questionData = window.sessionStorage.getItem("question_"+qid) || "";
        if(questionData){
            questionData = JSON.parse(questionData);
            $("#qname").val(questionData.qname);
            $("#answer").val(questionData.answer);
        }
    }


    function getlistQusetionC(){
        $.Ajax({
            async: false,
            url: server + "/ADMINM/quest/getQuestClassify",
            dataType: "json",
            method: 'post',
            success: function(obj) {
                console.log(obj);
                if(obj.code == 0){
                    setTypeQusetionCSelect(obj.data || []);
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
                    getlistQusetionC();
                    $('#addClass').show();
                    $('#cgClass').hide();
                }
            }
        });
    }
    
    function toEditQusetion(qid){
        $.Ajax({
            async: false,
            url: server + "/ADMINM/question/toEditQusetion",
            dataType: "json",
            method: 'get',
            data:{"QID":qid},
            success: function(obj) {
                console.log(obj);
                if(obj.code == 1){
                    var question = obj.question || {};
                    $("#QNAME").val(question.qname);
                    $("#ANSWER").val(question.answer);
                }
            }
        });
    }

    function setTypeQusetionCSelect(list){
        for (var i = 0; i < list.length; i++) {
            var item = list[i] || {};
            $('#typeselect').append(new Option(item.name, item.id));
        }
        $('#typeselect').val(qcid);
        layui.form.render("select");
    }


    getlistQusetionC();
    // toEditQusetion(qid);


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
    
    var isclassify = false;
    // 添加分类&选择分类切换
    $(document).on('click','#addClassbtn',function(){
        $('#addClass').hide();
        $('#cgClass').show();
        isclassify = true;
    });
    $(document).on('click','#cgClassbtn',function(){
        $('#addClass').show();
        $('#cgClass').hide();
        isclassify = false;
    });


    //监听提交
    form.on('submit(submit)', function(data){
        // alert(888)
        // layer.msg(JSON.stringify(data.field),function(){
        //     location.href='index.html'
        // });
        console.log(data.field);
        
        var condi = {};
        condi.qname = data.field.qname;
        condi.answer = data.field.answer;
        condi.qcid = data.field.typeselect;
        // condi.NAME = $("#typeselect").find("option:selected").text();

        if(qcid){
            condi.id = qid;
            updateQuestion(condi);
        }else{
            if(isclassify){
                if(data.field.classify){
                    condi.classify = data.field.classify;
                    saveQuestionNAME(condi);
                }else{
                    layer.msg("请输入问题分类名称");
                }
            }else{
                if(condi.qcid){
                    saveQuestionNAME(condi);
                }else{
                    layer.msg("请选择问题分类名称");
                }
            }
        }
        return false;
    });


    function saveQuestionNAME(condi){
        $.Ajax({
            async: false,
            // url: server + "/ADMINM/question/saveQuestion",
            url: server + "/ADMINM/quest/addQuest",
            dataType: "json",
            method: 'post',
            data:condi,
            success: function(obj) {
                if(obj.code == 0){
                    layer.msg("添加成功");

                    setTimeout(function(){
                        //刷新父页面
                        window.parent.location.reload();
                        var index = parent.layer.getFrameIndex(window.name);
               		    parent.layer.close(index);
                    },500);
                }else{
                    layer.msg(obj.msg || "添加失败");
                }
            }
        });
    }


    function updateQuestion(condi){
        $.Ajax({
            async: false,
            // url: server + "/ADMINM/question/updateQuestion",
            url: server + "/ADMINM/quest/updateQuest",
            dataType: "json",
            method: 'post',
            data:condi,
            success: function(obj) {
                if(obj.code == 0){
                    layer.msg("修改成功");

                    setTimeout(function(){
                        //刷新父页面
                        window.parent.location.reload();
                        var index = parent.layer.getFrameIndex(window.name);
               		    parent.layer.close(index);
                    },500);
                }else{
                    layer.msg(obj.msg || "添加失败");
                }
            }
        });
    }

});