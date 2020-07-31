layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'table', 'jquery','form','laydate','upload'], function() {
    var table = layui.table,
    element = layui.element,
    setter = layui.setter,
    laydate = layui.laydate,
    form = layui.form;
    $ = layui.jquery;

    var server = setter.baseUrl;

    function listCourse(){
        $.Ajax({
            async: false,
            url: server + "/ADMINM/course/listCourse",
            dataType: "json",
            method: 'get',
            success: function(obj) {
                console.log(obj);
                if(obj.code == 1){
                    listCourseHtml(obj.courseList || []);
                }
            }
        });
    }


    function listCourseHtml(list){
        var html = [];
        var vid = "";

        for(var i = 0,len = list.length; i < len; i++){
            var item = list[i] || {};
            var id = item.id;
            var name = item.name;
            var path = item.path;
            if(i == 0){
                vid = id;
            }
            // on hide
            if(i == 0){
                html.push('<li class="on"><a href="javascript:;">' + name + '</a></li>');
            }else{
                html.push('<li><a href="javascript:;">' + name + '</a></li>');
            }
        }
        
        $("#contleftlist").html(html.join(''));
        
        // $(".rightbtn span").bind("click",function(){
        //     var ids = $(this).attr("id").split("_");
        //     var id = ids[1];
        //     if(!id){
        //         return;
        //     }
        //     if($(this).hasClass("icon-zu227")){
        //         layer.confirm('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除后无法恢复！确定删除吗？&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',{title:'删除提醒',btnAlign:'c'}, function() {
        //             deleteQuestionC(id);
        //         });
        //     }else if($(this).hasClass("icon-zu225")){
        //         var name = $("#q_" + id).text();
        //         layer.open({
        //             type: 2,
        //             title: '编辑问题分类',
        //             area: ['500px', '200px'],
        //             btn: ['确定', '取消'],
        //             btnAlign: 'c',
        //             maxmin: true,
        //             content: 'question_class_pop.html?name='+name+'&id='+id,
        //             yes: function(index, layero) {
        //                 var submit = layero.find('iframe').contents().find("#submit");
        //                 submit.click();
        //             }
        //         });
        //     }else if($(this).hasClass("icon-status")){
        //         if($(this).hasClass("icon-show")){
        //             $(this).removeClass("icon-show");
        //             $(this).addClass("icon-hide");
        //             $(this).parent().parent().addClass("hide");

        //             updateStatusQuestionC(id,0);
        //         }else{
        //             $(this).removeClass("icon-hide");
        //             $(this).addClass("icon-show");
        //             $(this).addClass("icon-show");
        //             $(this).parent().parent().removeClass("hide");

        //             updateStatusQuestionC(id,1);
        //         }
        //     }
        // });

        // $(".questiontype").bind('click',function(){
        //     var ids = $(this).attr("id").split("_");
        //     var id = ids[1];
        //     if(!id){
        //         return;
        //     }
            
        //     $("#contleftlist > li").removeClass("on");
        //     $(this).parent().addClass("on");

        //     getlistQusetion(id);
        // })

        // getlistQusetion(id);
    }

    listCourse();

    var $ = layui.$,
    active = {
        //点击添加
        addcourse: function() {
            layer.open({
                type: 2,
                title: '添加教程',
                area: ['500px', '300px'],
                btn: ['确定', '取消'],
                btnAlign: 'c',
                maxmin: true,
                content: 'course_add_pop.html',
                yes: function(index, layero) {
                    var submit = layero.find('iframe').contents().find("#submit");
                    submit.click();
                }
            });
        },
        //点击编辑
        editcourse: function() {
            layer.open({
                type: 2,
                title: '编辑教程',
                area: ['500px', '300px'],
                btn: ['确定', '取消'],
                btnAlign: 'c',
                maxmin: true,
                content: 'course_add_pop.html',
                yes: function(index, layero) {
                    var submit = layero.find('iframe').contents().find("#ruleclick");
                    submit.click();
                }
            });
        },
        //点击删除
        delcourse: function() { 
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
        }
    };

    //给页面里的layui-dS 绑定事件
    $('.layui-btn').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    //重新上传视频
    upload.render({
        elem: '#uploadcourse'
        ,url: 'https://httpbin.org/post' //改成您自己的上传接口
        ,accept: 'video' //视频
        ,done: function(res){
        layer.msg('上传成功');
        console.log(res)
        }
    });


});
