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
    var filePath = "";
    var fileId = "";
    var fileName = "";

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

    function deleteCourse(id,path){
        $.Ajax({
            async: false,
            url: server + "/ADMINM/course/deleteCourse",
            dataType: "json",
            method: 'get',
            data:{"ID":id,"PATH":path},
            success: function(obj) {
                console.log(obj);
                if(obj.code == 1){
                    listCourse();

                    layer.msg("删除成功");
                }
            }
        });
    }

    function listCourseHtml(list){
        var html = [];

        for(var i = 0,len = list.length; i < len; i++){
            var item = list[i] || {};
            var id = item.id;
            var name = item.name;
            var path = item.path;
            if(i == 0){
                filePath = path;
                fileId = id;
                fileName = name;
            }
            // on hide
            if(i == 0){
                html.push('<li id="' + id + '" data="'+path+'" class="on"><a href="javascript:;">' + name + '</a></li>');
            }else{
                html.push('<li id="' + id + '" data="'+path+'" ><a href="javascript:;">' + name + '</a></li>');
            }
        }
        
        $("#contleftlist").html(html.join(''));
        
        $("#video1").attr("src",server + filePath);
        

        $("#contleftlist > li").bind('click',function(){
            var path = $(this).attr("data");
            var id = $(this).attr("id");
            var name = $(this).text();
            if(!path){
                return;
            }
            
            filePath = path;
            fileId = id;
            fileName = name;
            
            $("#contleftlist > li").removeClass("on");
            $(this).addClass("on");

            $("#video1").attr("src",server + path);
        });
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
                content: 'course_add_pop.html?isEdit=1&fileId='+fileId+'&filePath='+filePath+'&fileName='+fileName,
                yes: function(index, layero) {
                    var submit = layero.find('iframe').contents().find("#submit");
                    submit.click();
                }
            });
        },
        //点击删除
        delcourse: function() { 
            layer.confirm('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除后无法恢复！确定删除吗？&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',{title:'删除提醒',btnAlign:'c'}, function() {//获取选中数目
                deleteCourse(fileId,filePath);
            })
        }
    };

    //给页面里的layui-dS 绑定事件
    $('.layui-btn').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    //重新上传视频
    // upload.render({
    //     elem: '#uploadcourse'
    //     ,url: 'https://httpbin.org/post' //改成您自己的上传接口
    //     ,accept: 'video' //视频
    //     ,done: function(res){
    //     layer.msg('上传成功');
    //     console.log(res)
    //     }
    // });


});
