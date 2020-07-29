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


    function setListQusetionCHtml(list){
        var html = [];
        for(var i = 0,len = list.length; i < len; i++){
            var item = list[i] || {};
            var qcid = item.qcid;
            // on hide
            html.push('<li class="on">');
            
            html.push('<a id="q_' + qcid + '" href="javascript:;">' + item.name + '</a>');
            html.push('<div class="rightbtn">');
            html.push('<span id="d_' + qcid + '" class="icon iconfont icon-zu227" data-type="delquestion"></span>');
            html.push('<span id="h_' + qcid + '" class="icon iconfont icon-hide" id="switchshow"></span>');
            html.push('<span id="e_' + qcid + '" class="icon iconfont icon-zu225" data-type="editquestionclass"></span>');
            html.push('<span id="m_' + qcid + '" class="icon iconfont icon-zu229" data-type=""></span>');
            html.push('</div>');
            html.push('</li>');
        }
        
        $("#contleftlist").html(html.join(''));

        // $(".rightbtn span").bind("click",function(){
        //     var id = $(this).attr("id");
        //     console.log(id)
        // });
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
                    var submit = layero.find('iframe').contents().find("#ruleclick");
                    submit.click();
                }
            });
        },


        //点击编辑
        editquestion: function() {
            layer.open({
                type: 2,
                title: '编辑常见问题',
                area: ['500px', '340px'],
                btn: ['确定', '取消'],
                btnAlign: 'c',
                maxmin: true,
                content: 'question_edit_pop.html',
                yes: function(index, layero) {
                    var submit = layero.find('iframe').contents().find("#ruleclick");
                    submit.click();
                }
            });
        },
        //点击编辑分类
        editquestionclass: function() {
            layer.open({
                type: 2,
                title: '编辑问题分类',
                area: ['500px', '200px'],
                btn: ['确定', '取消'],
                btnAlign: 'c',
                maxmin: true,
                content: 'question_class_pop.html',
                yes: function(index, layero) {
                    var submit = layero.find('iframe').contents().find("#ruleclick");
                    submit.click();
                }
            });
        },


        //点击删除
        delquestion: function() { 
            var ids = $(this).attr("id").split("_");
            var id = ids[1];
            if(!id){
                return;
            }
            layer.confirm('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除后无法恢复！确定删除吗？&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',{title:'删除提醒',btnAlign:'c'}, function() {
                deleteQuestionC(id);
            });
        },
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
    $(document).on('click','#switchshow',function(){
        if($(this).hasClass('icon-hide')){
            $(this).addClass('icon-show').removeClass("icon-hide")
            $(this).parent().parent().addClass('hide')
        }else{
            $(this).addClass('icon-hide').removeClass("icon-show")
            $(this).parent().parent().removeClass('hide')
        }
    });
    
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
