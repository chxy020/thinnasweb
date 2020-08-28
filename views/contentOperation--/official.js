layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'table', 'jquery','form','laydate'], function() {
    var table = layui.table,
        element = layui.element,
        setter = layui.setter,
        laydate = layui.laydate,
        form = layui.form;
        $ = layui.jquery;

    var server = setter.baseUrl;

    function isEmptyObject(obj) {
        var jlength = 0;
        for (var key in obj) {
            if (key != "null") {
                jlength++;
            }
        };
        return jlength
    };

    function getlistQusetionC(){
        $.Ajax({
            async: false,
            url: server + "/ADMINM/question/listQusetionC",
            dataType: "json",
            method: 'get',
            success: function(obj) {
                console.log(obj);
                if(obj.code == 1){
                    setListQusetionCHtml(obj.questionC || []);
                }
            }
        });
    }

    function deleteQuestionC(id){
        $.Ajax({
            async: false,
            url: server + "/ADMINM/question/deleteQuestionC",
            dataType: "json",
            method: 'get',
            data:{"QCID":id},
            success: function(obj) {
                console.log(obj);
                if(obj.code == 1){
                    getlistQusetionC();
                    layer.msg("删除成功");
                }
            }
        });
    }

    function updateStatusQuestionC(id,status){
        $.Ajax({
            async: false,
            url: server + "/ADMINM/question/updateStatusQuestionC",
            dataType: "json",
            method: 'get',
            data:{"QCID":id,"STATUS":status},
            success: function(obj) {
                // console.log(obj);
                // if(obj.code == 1){
                //     setListQusetionHtml(obj.questionC || []);
                // }
            }
        });
    }

    
    function getlistQusetion(id){
        $.Ajax({
            async: false,
            url: server + "/ADMINM/question/listQusetion",
            dataType: "json",
            method: 'get',
            data:{"QCID":id},
            success: function(obj) {
                console.log(obj);
                if(obj.code == 1){
                    setListQusetionHtml(obj.questionC || []);
                }
            }
        });
    }

    function deleteQuestion(id){
        $.Ajax({
            async: false,
            url: server + "/ADMINM/question/deleteQuestion",
            dataType: "json",
            method: 'get',
            data:{"QID":id},
            success: function(obj) {
                console.log(obj);
                if(obj.code == 1){
                    var qid = obj.QID;
                    $("#qd_" + qid).parent().parent().hide();
                    // getlistQusetionC();
                    layer.msg("删除成功");
                }
            }
        });
    }

    function setListQusetionCHtml(list){
        var html = [];
        var id = "";

        for(var i = 0,len = list.length; i < len; i++){
            var item = list[i] || {};
            var qcid = item.qcid;
            var status = +item.status;
            if(i == 0){
                id = qcid;
            }
            // on hide
            if(i == 0){
                if(status){
                    html.push('<li class="on">');
                }else{
                    html.push('<li class="hide">');
                }
            }else{
                if(status){
                    html.push('<li >');
                }else{
                    html.push('<li class="hide">');
                }
            }
            
            html.push('<a class="questiontype" id="q_' + qcid + '" href="javascript:;">' + item.name + '</a>');
            html.push('<div class="rightbtn">');
            html.push('<span id="d_' + qcid + '" class="icon iconfont icon-zu227" data-type="delquestion"></span>');
            
            if(status){
                html.push('<span id="h_' + qcid + '" class="icon iconfont icon-status icon-show" ></span>');
            }else{
                html.push('<span id="h_' + qcid + '" class="icon iconfont icon-status icon-hide" ></span>');
            }
            html.push('<span id="e_' + qcid + '" class="icon iconfont icon-zu225" data-type="editquestionclass"></span>');
            html.push('<span id="m_' + qcid + '" class="icon iconfont icon-zu229" data-type=""></span>');
            html.push('</div>');
            html.push('</li>');
        }
        
        $("#contleftlist").html(html.join(''));
        
        $(".rightbtn span").bind("click",function(){
            var ids = $(this).attr("id").split("_");
            var id = ids[1];
            if(!id){
                return;
            }
            if($(this).hasClass("icon-zu227")){
                layer.confirm('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除后无法恢复！确定删除吗？&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',{title:'删除提醒',btnAlign:'c'}, function() {
                    deleteQuestionC(id);
                });
            }else if($(this).hasClass("icon-zu225")){
                var name = $("#q_" + id).text();
                layer.open({
                    type: 2,
                    title: '编辑问题分类',
                    area: ['500px', '200px'],
                    btn: ['确定', '取消'],
                    btnAlign: 'c',
                    maxmin: true,
                    content: 'question_class_pop.html?name='+name+'&id='+id,
                    yes: function(index, layero) {
                        var submit = layero.find('iframe').contents().find("#submit");
                        submit.click();
                    }
                });
            }else if($(this).hasClass("icon-status")){
                if($(this).hasClass("icon-show")){
                    $(this).removeClass("icon-show");
                    $(this).addClass("icon-hide");
                    $(this).parent().parent().addClass("hide");

                    updateStatusQuestionC(id,0);
                }else{
                    $(this).removeClass("icon-hide");
                    $(this).addClass("icon-show");
                    $(this).addClass("icon-show");
                    $(this).parent().parent().removeClass("hide");

                    updateStatusQuestionC(id,1);
                }
            }
        });

        $(".questiontype").bind('click',function(){
            var ids = $(this).attr("id").split("_");
            var id = ids[1];
            if(!id){
                return;
            }
            
            $("#contleftlist > li").removeClass("on");
            $(this).parent().addClass("on");

            getlistQusetion(id);
        })

        getlistQusetion(id);
    }

    function setListQusetionHtml(list){
        var html = [];

        for(var i = 0,len = list.length; i < len; i++){
            var item = list[i] || {};
            var qid = item.qid;
            var qcid = item.qcid;
            
            html.push('<div class="positionR">');
            html.push('<div class="contright-cont-btn">');
            html.push('<button class="layui-btn layui-ds layui-btn-primary" data-type="add" id="qu_' + qid + '_' + qcid +'" data="编辑">');
            html.push('<i class="layui-icon">&#xe642;</i>');
            html.push('</button>');
            html.push('<button class="layui-btn layui-ds layui-btn-primary" data-type="del" id="qd_' + qid + '" data="删除">');
            html.push('<i class="layui-icon">&#xe640;</i>');
            html.push('</button>');
            html.push('</div>');
            html.push('<h2>'+((i+1)+"."+item.qname)+'</h2>');
            html.push('<p>');
            html.push(item.answer);
            html.push('</p>');
            html.push('</div>');
        }
        
        $("#anwserlist").html(html.join(''));
        
        $(".contright-cont-btn button").bind("click",function(){
            var ids = $(this).attr("id").split("_");
            var type = ids[0];
            var id = ids[1];
            var qcid = ids[2];
            if(!id){
                return;
            }
            if(type == "qu"){
                updateQusetion(id,qcid);
            }else if(type == "qd"){
                layer.confirm('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除后无法恢复！确定删除吗？&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',{title:'删除提醒',btnAlign:'c'}, function() {
                    deleteQuestion(id);
                });
            }
            console.log(id);
            // getlistQusetion(id);
        });
    }

    function updateQusetion(qid,qcid){
        layer.open({
            type: 2,
            title: '编辑常见问题',
            area: ['800px', '550px'],
            btn: ['确定', '取消'],
            btnAlign: 'c',
            maxmin: true,
            content: 'question_add_pop.html?qid='+qid+'&qcid='+qcid,
            yes: function(index, layero) {
                var submit = layero.find('iframe').contents().find("#submit");
                submit.click();
            }
        });
    }


    getlistQusetionC();
    

    //表格里滑动开关
    // form.on('submit(formDemo)', function(data){
    //     layer.msg(JSON.stringify(data.field));
    //     return false;
    // });

    //监听指定开关
    form.on('switch(switchTest)', function(data){
        layer.msg('开关checked：'+ (this.checked ? 'true' : 'false'), {
            offset: '6px'
        });
        layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
    });
    

    var $ = layui.$,
        active = {
        //点击添加
        addquestion: function() {
            layer.open({
                type: 2,
                title: '添加常见问题',
                area: ['800px', '550px'],
                btn: ['确定', '取消'],
                btnAlign: 'c',
                maxmin: true,
                content: 'question_add_pop.html',
                yes: function(index, layero) {
                    var submit = layero.find('iframe').contents().find("#submit");
                    submit.click();
                }
            });
        }
    };

    //给页面里的layui-dS 绑定事件
    $('.layui-btn,.iconfont').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
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

    // $(document).on('click','#switchshow',function(){
    //     if($(this).hasClass('icon-hide')){
    //         $(this).addClass('icon-show').removeClass("icon-hide")
    //         $(this).parent().parent().addClass('hide')
    //     }else{
    //         $(this).addClass('icon-hide').removeClass("icon-show")
    //         $(this).parent().parent().removeClass('hide')
    //     }
    // });
    
    /*右侧菜单HOVER显示提示文字*/
    var subtips;
    $('.pop_text button').each(function(){
        
        var _id = $(this).attr('id');
        var _data = $(this).attr('data');
        $("#" + _id).hover(function() {
            openMsg();
        }, function() {
            if(subtips){
                layer.close(subtips);
            }
        });
        function openMsg() {
            subtips = layer.tips(_data, '#'+_id,{tips:[3,'#666'],time: 30000});
        }
    })
    /*右侧菜单HOVER显示提示文字 end*/





});
