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
    
    var $ = layui.$,
    active = {
        rclose:function(){
            layer.closeAll();
        }
        //刷新
        // update: function() {
        //     layer.open({
        //         type: 2,
        //         title: '更新软件版本',
        //         area: ['40%', '50%'],
        //         btn: ['确定', '取消'],
        //         btnAlign: 'c',
        //         maxmin: true,
        //         content: 'update_pop.html',
        //         yes: function(index, layero) {
        //             var submit = layero.find('iframe').contents().find("#submit");
        //             submit.click();
        //         }
        //     });
        // },
    };

    //给页面里的layui-dS 绑定事件
    $('.layui-ds').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    var tabid = "alltab";
    $("#versiontab > li").bind("click",function(ele){
        var id = $(ele.currentTarget).attr("id");
        tabid = id;
        getVersionList(id);
    });

    function getVersionList(id){
        if(id == "alltab"){
            getAllVersionList(0);
        }else if(id == "androidtab"){
            getAllVersionList(1);
        }else{
            getAllVersionList(2);
        }
    }

    getVersionList("alltab");

    function getAllVersionList(type){
        // var server = "http://139.196.147.194:8084";
        layer.load(2);
        $.Ajax({
            async: true,
            url: server + "/jqkj/tvApk/getTypeAllApp",
            dataType: "json",
            method: 'get',
            data:{type:type},
            success: function(obj) {
                layer.closeAll();
                if(obj.status == 0){
                    var list = obj.data || [];
                    buildAllVersionHtml(list);
                }else{
                    layer.msg("获取历史记录错误");
                }
            },
            error:function(obj){
                layer.closeAll();
            }
        });
    }

    function logicalDel(id){
        // var server = "http://139.196.147.194:8084";
        layer.load(2);
        $.Ajax({
            async: true,
            url: server + "/jqkj/file/logicalDel",
            dataType: "json",
            method: 'post',
            data:{id:id,isdelete:1},
            success: function(obj) {
                layer.closeAll();
                if(obj.status == 0){
                    getVersionList(tabid);
                    // var list = obj.data || [];
                    // buildAllVersionHtml(list);
                }else{
                    layer.msg("删除apk错误");
                }
            },
            error:function(obj){
                layer.closeAll();
            }
        });
    }
    
    function buildAllVersionHtml(list){
        var html = [];
        for(var i = 0,len = list.length; i < len; i++){
            var item = list[i] || {};
            html.push('<tr>');
            html.push('<th> V ' + item.version + '<span>更新时间：' + item.updatetime + '</span></th>');
            html.push('<th width="30%">');
            if(item.isdelete == 1){
                html.push('<button disabled style="background:#ccc;" type="button" data="' + item.path + '" class="downloadbtn layui-btn layui-btn-normal">点击下载</button>');
                html.push('<button disabled style="background:#ccc;" type="button" data="' + item.id + '" class="deletebtn layui-btn layui-btn-danger">删除文件</button>');
                
            }else{
                html.push('<button type="button" data="' + item.path + '" class="downloadbtn layui-btn layui-btn-normal">点击下载</button>');
                html.push('<button type="button" data="' + item.id + '" class="deletebtn layui-btn layui-btn-danger">删除文件</button>');
            }
            html.push('</th>');
            html.push('</tr>');
            html.push('<tr>');
            html.push('<td colspan=3>');
            html.push('<p class="tc">上传用户：' + item.username + '</p>');
            html.push('<h3>更新内容：</h3>');
            html.push('<p>' + item.description + '</p>');
            html.push('</td>');
            html.push('</tr>');
        }
        
        if(html.length > 0){

            $("#allversion").html(html.join(''));

            $("#allversion .downloadbtn").bind("click",function(ele){
                var data = $(ele.currentTarget).attr("data");
                window.open(data,"_blank")
            }.bind(this));
            $("#allversion .deletebtn").bind("click",function(ele){
                var data = $(ele.currentTarget).attr("data");
                // console.log(data)
                
                layer.confirm('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除后无法恢复！确定删除吗？&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',{title:'删除提醒',btnAlign:'c'}, function() {
                    logicalDel(data);
                });
            }.bind(this));
        }else{
            html.push('<tr>');
            html.push('<td colspan=3>');
            html.push('<p>暂无数据</p>');
            html.push('</td>');
            html.push('</tr>');

            $("#allversion").html(html.join(''));
        }
    }



});
