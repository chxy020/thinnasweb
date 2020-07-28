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
    var devices = {};
    var arrangeList = [];

    var day2 = new Date();
    day2.setTime(day2.getTime());
    var s2 = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
    var ins22 = laydate.render({
        elem: '#rangetime',
        range: true
        // min: s2,
        // max: '2080-10-14',
        // format: 'yyyy年MM月dd日',
        // theme: 'molv'
    });

    function isEmptyObject(obj) {
        var jlength = 0;
        for (var key in obj) {
            if (key != "null") {
                jlength++;
            }
        };
        return jlength
    };
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
                area: ['500px', '340px'],
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
            layer.confirm('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除后无法恢复！确定删除吗？&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',{title:'删除提醒',btnAlign:'c'}, function() {//获取选中数目
            $.ajax({
                    async: false,
                    type: "post",
                    // url: url+"/roomtemplate/batchRemove",
                    dataType: "json",
                    //成功的回调函数
                    data: {
                        "roomid":arrangeList.join(",")
                    },
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function(msg) {
                        if (msg.code == 0) {
                            layer.msg("删除成功");
                            reloaddata(); // 父页面刷新
                        } else {
                            layer.msg(msg.msg);
                        }
            
                    },
                    //失败的回调函数
                    error: function() {
                        console.log("error")
                    }
                })
            })
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
    






});
