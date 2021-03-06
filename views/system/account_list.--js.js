layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'table', 'jquery','form'], function() {
    var table = layui.table,
        setter = layui.setter,
        form = layui.form;
        $ = layui.jquery;

    var server = setter.baseUrl;
    var devices = {};
    var arrangeList = [];

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
    

//表格加载渲染
table.render({
    elem: '#test-table-operate',
    height: 'full-100',//必须留着
    // url: server + "/ADMINM/role",
    // where:{
    //     "keywords":keywords||""
    // },
    method: 'get',
    xhrFields: {
        withCredentials: true
    }
    
    ,data: [
        {
            add_QX: "2244102192095174",
            bz: "水电费",
            cha_QX: "560135202614009798",
            del_QX: "2251798773489606",
            edit_QX: "1125898866646982",
            member: [
                {phone: "15859903204", name: "天地图"},
                {phone: "13566233663", name: "李四"},
                {phone: "2147483647", name: "张三"},
                {phone: "13808888888", name: "as"}
            ],
            parent_ID: "1",
            rights: "51314",
            role_ID: "3264c8e83d0248bb9e3ea6195b4c0216",
            role_NAME: "一级管理员",
        },
        {
            add_QX: "2244102192095174",
            bz: "水电费",
            cha_QX: "560135202614009798",
            del_QX: "2251798773489606",
            edit_QX: "1125898866646982",
            member: [
                {phone: "15859903204", name: "天地图"},
            ],
            parent_ID: "1",
            rights: "51314",
            role_ID: "3264c8e83d0248bb9e3ea6195b4c0216",
            role_NAME: "一级管理员",
        },
        {
            add_QX: "2244102192095174",
            bz: "水电费",
            cha_QX: "560135202614009798",
            del_QX: "2251798773489606",
            edit_QX: "1125898866646982",
            member: [],
            parent_ID: "1",
            rights: "51314",
            role_ID: "3264c8e83d0248bb9e3ea6195b4c0216",
            role_NAME: "一级管理员",
        },
        {
            add_QX: "2244102192095174",
            bz: "水电费",
            cha_QX: "560135202614009798",
            del_QX: "2251798773489606",
            edit_QX: "1125898866646982",
            member: [
                {phone: "15859903204", name: "天地图"},
                {phone: "13566233663", name: "李四"},
                {phone: "2147483647", name: "张三"},
                {phone: "13566233663", name: "李四"},
                {phone: "2147483647", name: "张三"},
                {phone: "13566233663", name: "李四"},
                {phone: "2147483647", name: "张三"},
                {phone: "13566233663", name: "李四"},
                {phone: "2147483647", name: "张三"},
                {phone: "13808888888", name: "as"}
            ],
            parent_ID: "1",
            rights: "51314",
            role_ID: "3264c8e83d0248bb9e3ea6195b4c0216",
            role_NAME: "一级管理员",
        },
        {
            add_QX: "2244102192095174",
            bz: "水电费",
            cha_QX: "560135202614009798",
            del_QX: "2251798773489606",
            edit_QX: "1125898866646982",
            member: [
                {phone: "15859903204", name: "天地图"},
                {phone: "13566233663", name: "李四"},
                {phone: "2147483647", name: "张三"},
                {phone: "13808888888", name: "as"}
            ],
            parent_ID: "1",
            rights: "51314",
            role_ID: "3264c8e83d0248bb9e3ea6195b4c0216",
            role_NAME: "一级管理员",
        },
        {
            add_QX: "2244102192095174",
            bz: "水电费",
            cha_QX: "560135202614009798",
            del_QX: "2251798773489606",
            edit_QX: "1125898866646982",
            member: [
                {phone: "15859903204", name: "天地图"},
                {phone: "13566233663", name: "李四"},
                {phone: "2147483647", name: "张三"},
                {phone: "13808888888", name: "as"}
            ],
            parent_ID: "1",
            rights: "51314",
            role_ID: "3264c8e83d0248bb9e3ea6195b4c0216",
            role_NAME: "一级管理员",
        },
        {
            add_QX: "2244102192095174",
            bz: "水电费",
            cha_QX: "560135202614009798",
            del_QX: "2251798773489606",
            edit_QX: "1125898866646982",
            member: [
                {phone: "15859903204", name: "天地图"},
                {phone: "13566233663", name: "李四"},
                {phone: "2147483647", name: "张三"},
                {phone: "13808888888", name: "as"}
            ],
            parent_ID: "1",
            rights: "51314",
            role_ID: "3264c8e83d0248bb9e3ea6195b4c0216",
            role_NAME: "一级管理员",
        },
        {
            add_QX: "2244102192095174",
            bz: "水电费",
            cha_QX: "560135202614009798",
            del_QX: "2251798773489606",
            edit_QX: "1125898866646982",
            member: [
                {phone: "15859903204", name: "天地图"},
                {phone: "13566233663", name: "李四"},
                {phone: "2147483647", name: "张三"},
            ],
            parent_ID: "1",
            rights: "51314",
            role_ID: "3264c8e83d0248bb9e3ea6195b4c0216",
            role_NAME: "一级管理员",
        },
        {
            add_QX: "2244102192095174",
            bz: "水电费",
            cha_QX: "560135202614009798",
            del_QX: "2251798773489606",
            edit_QX: "1125898866646982",
            member: [
                {phone: "15859903204", name: "天地图"},
            ],
            parent_ID: "1",
            rights: "51314",
            role_ID: "3264c8e83d0248bb9e3ea6195b4c0216",
            role_NAME: "一级管理员",
        },
        {
            add_QX: "2244102192095174",
            bz: "水电费",
            cha_QX: "560135202614009798",
            del_QX: "2251798773489606",
            edit_QX: "1125898866646982",
            member: [
                {phone: "15859903204", name: "天地图"},
                {phone: "13566233663", name: "李四"},
            ],
            parent_ID: "1",
            rights: "51314",
            role_ID: "3264c8e83d0248bb9e3ea6195b4c0216",
            role_NAME: "一级管理员",
        }
        // ,
        // {
        //     add_QX: "2244102192095174",
        //     bz: "水电费",
        //     cha_QX: "560135202614009798",
        //     del_QX: "2251798773489606",
        //     edit_QX: "1125898866646982",
        //     member: [
        //         {phone: "15859903204", name: "天地图"},
        //         {phone: "13566233663", name: "李四"},
        //         {phone: "2147483647", name: "张三"},
        //         {phone: "13808888888", name: "as"}
        //     ],
        //     parent_ID: "1",
        //     rights: "51314",
        //     role_ID: "3264c8e83d0248bb9e3ea6195b4c0216",
        //     role_NAME: "一级管理员",
        // }
        // ,
        // {
        //     add_QX: "2244102192095174",
        //     bz: "水电费",
        //     cha_QX: "560135202614009798",
        //     del_QX: "2251798773489606",
        //     edit_QX: "1125898866646982",
        //     member: [
        //         {phone: "15859903204", name: "天地图"},
        //         {phone: "13566233663", name: "李四"},
        //         {phone: "2147483647", name: "张三"},
        //         {phone: "13808888888", name: "as"}
        //     ],
        //     parent_ID: "1",
        //     rights: "51314",
        //     role_ID: "3264c8e83d0248bb9e3ea6195b4c0216",
        //     role_NAME: "一级管理员",
        // }
        // ,
        // {
        //     add_QX: "2244102192095174",
        //     bz: "水电费",
        //     cha_QX: "560135202614009798",
        //     del_QX: "2251798773489606",
        //     edit_QX: "1125898866646982",
        //     member: [
        //         {phone: "15859903204", name: "天地图"},
        //         {phone: "13566233663", name: "李四"},
        //         {phone: "2147483647", name: "张三"},
        //         {phone: "13808888888", name: "as"}
        //     ],
        //     parent_ID: "1",
        //     rights: "51314",
        //     role_ID: "3264c8e83d0248bb9e3ea6195b4c0216",
        //     role_NAME: "一级管理员",
        // }
        // ,
        // {
        //     add_QX: "2244102192095174",
        //     bz: "水电费",
        //     cha_QX: "560135202614009798",
        //     del_QX: "2251798773489606",
        //     edit_QX: "1125898866646982",
        //     member: [
        //         {phone: "15859903204", name: "天地图"},
        //         {phone: "13566233663", name: "李四"},
        //         {phone: "2147483647", name: "张三"},
        //         {phone: "13808888888", name: "as"}
        //     ],
        //     parent_ID: "1",
        //     rights: "51314",
        //     role_ID: "3264c8e83d0248bb9e3ea6195b4c0216",
        //     role_NAME: "一级管理员",
        // }
        // ,
        // {
        //     add_QX: "2244102192095174",
        //     bz: "水电费",
        //     cha_QX: "560135202614009798",
        //     del_QX: "2251798773489606",
        //     edit_QX: "1125898866646982",
        //     member: [
        //         {phone: "15859903204", name: "天地图"},
        //         {phone: "13566233663", name: "李四"},
        //         {phone: "2147483647", name: "张三"},
        //         {phone: "13808888888", name: "as"}
        //     ],
        //     parent_ID: "1",
        //     rights: "51314",
        //     role_ID: "3264c8e83d0248bb9e3ea6195b4c0216",
        //     role_NAME: "一级管理员",
        // }
        // ,
        // {
        //     add_QX: "2244102192095174",
        //     bz: "水电费",
        //     cha_QX: "560135202614009798",
        //     del_QX: "2251798773489606",
        //     edit_QX: "1125898866646982",
        //     member: [
        //         {phone: "15859903204", name: "天地图"},
        //         {phone: "13566233663", name: "李四"},
        //         {phone: "2147483647", name: "张三"},
        //         {phone: "13808888888", name: "as"}
        //     ],
        //     parent_ID: "1",
        //     rights: "51314",
        //     role_ID: "3264c8e83d0248bb9e3ea6195b4c0216",
        //     role_NAME: "一级管理员",
        // }
        // ,
        // {
        //     add_QX: "2244102192095174",
        //     bz: "水电费",
        //     cha_QX: "560135202614009798",
        //     del_QX: "2251798773489606",
        //     edit_QX: "1125898866646982",
        //     member: [
        //         {phone: "15859903204", name: "天地图"},
        //         {phone: "13566233663", name: "李四"},
        //         {phone: "2147483647", name: "张三"},
        //         {phone: "13808888888", name: "as"}
        //     ],
        //     parent_ID: "1",
        //     rights: "51314",
        //     role_ID: "3264c8e83d0248bb9e3ea6195b4c0216",
        //     role_NAME: "一级管理员",
        // }
        // ,
        // {
        //     add_QX: "2244102192095174",
        //     bz: "水电费",
        //     cha_QX: "560135202614009798",
        //     del_QX: "2251798773489606",
        //     edit_QX: "1125898866646982",
        //     member: [
        //         {phone: "15859903204", name: "天地图"},
        //         {phone: "13566233663", name: "李四"},
        //         {phone: "2147483647", name: "张三"},
        //         {phone: "13808888888", name: "as"}
        //     ],
        //     parent_ID: "1",
        //     rights: "51314",
        //     role_ID: "3264c8e83d0248bb9e3ea6195b4c0216",
        //     role_NAME: "一级管理员",
        // }
        // ,
        // {
        //     add_QX: "2244102192095174",
        //     bz: "水电费",
        //     cha_QX: "560135202614009798",
        //     del_QX: "2251798773489606",
        //     edit_QX: "1125898866646982",
        //     member: [
        //         {phone: "15859903204", name: "天地图"},
        //         {phone: "13566233663", name: "李四"},
        //         {phone: "2147483647", name: "张三"},
        //         {phone: "13808888888", name: "as"}
        //     ],
        //     parent_ID: "1",
        //     rights: "51314",
        //     role_ID: "3264c8e83d0248bb9e3ea6195b4c0216",
        //     role_NAME: "一级管理员",
        // }
        // ,
        // {
        //     add_QX: "2244102192095174",
        //     bz: "水电费",
        //     cha_QX: "560135202614009798",
        //     del_QX: "2251798773489606",
        //     edit_QX: "1125898866646982",
        //     member: [
        //         {phone: "15859903204", name: "天地图"},
        //         {phone: "13566233663", name: "李四"},
        //         {phone: "2147483647", name: "张三"},
        //         {phone: "13808888888", name: "as"}
        //     ],
        //     parent_ID: "1",
        //     rights: "51314",
        //     role_ID: "3264c8e83d0248bb9e3ea6195b4c0216",
        //     role_NAME: "一级管理员",
        // }
        
    ]
    ,page: {
        layout: ['prev', 'page', 'next', 'count', 'skip']
    },
    cols: [
        [ //表头
            {
                type: 'checkbox',
                fixed: 'left',
            },
            {
                field: 'id',
                title: '序号',
                unresize: 'false',
                width:60,
                templet: function(data) {
                    return data.LAY_INDEX;
                }
            },
            {
                title: '操作',
                toolbar: '#test-table-operate-barDemo',
                align: 'left',
            },
            {
                field: 'role_NAME',
                title: '角色名称',
                align: 'left',
            },
            {
                field: 'member',
                title: '成员',
                width: 120,
                align: 'left',
                templet: function(data) {
                    if(data.member.length){
                        var names = [];
                        data.member.forEach(function(item){
                            names.push(item.name);
                        });
                        // console.log(names);
                        var htmlStr = "";
                        for (i = 0; i < data.member.length; i++) { 
                            // console.log("000")
                            htmlStr += "<tr><td>"+data.member[i].name+"</td><td>"+data.member[i].phone+"</td></tr>";
                        }
                        // console.log("htmlStr====",htmlStr);
                        var contStr = "<div class='moreOperate'><span class='layui-badge table-icon-style2'>"+data.member.length+"</span><div class='moreOperateA'><div class='moreOperateArr'></div><div class='moreOperateAa'><table class='tableb'><tr><th>姓名</th><th>手机号</th></tr>"+htmlStr+"</table></div></div></div>"
                        // console.log("contStr====",contStr);
                        return names.slice(0,2).join(',') + contStr
                    }else{
                        return ''
                    }
                        
                },
            },
            {
                field: 'bz',
                title: '备注',
                align: 'left',
            }
            ,
            {
                field: 'bz',
                title: '备注',
                align: 'left',
            }
            ,
            {
                field: 'bz',
                title: '备注',
                align: 'left',
            },
            {
                field: 'bz',
                title: '备注',
                align: 'left',
            },
            

        ]
    ],
    parseData: function(res){
        return {
            "code": 0,
            "msg": "",
            "count": 0,
            "data": res.roleList_z || [] 
        }
    },
    
    event: true,
    page: true,
    limit: Number.MAX_VALUE,
    skin: 'line',
    even: true,
    // limits: [5, 10, 15],
    done: function(res, curr, count) {
        // table_data = res.data;

        // layer.closeAll('loading');
        // arrangeList.length = 0;
        // layer.close(layer.index); //它获取的始终是最新弹出的某个层，值是由layer内部动态递增计算的
        // layer.close(index);    //返回数据关闭loading
    },
});
    
    //表格刷新渲染
    window.reloads = function() {
        table.render({
            elem: '#test-table-operate',
            height: 'full-100',//必须留着
            url: "https://f.longjuli.com/meeting/findMeetingBylayui" //数据接口
            ,method: 'get',
            xhrFields: {
                withCredentials: true
            },
            page: {
                layout: ['prev', 'page', 'next', 'count', 'skip']
            },
            cols: [
                [ //表头
                    {
                        type: 'checkbox',
                        fixed: 'left',
                    },
                    {
                        field: 'id',
                        title: '序号',
                        unresize: 'false',
                        width:60,
                    },
                    {
                        width: 100,
                        title: '操作',
                        toolbar: '#test-table-operate-barDemo',
                    },
                    {
                        field: 'name',
                        title: '姓名',
                        align: 'left',
                    }, {
                        field: 'roomname',
                        title: '手机号',
                        align: 'left',
                    },
                    {
                        field: 'roomname',
                        title: '角色',
                        align: 'left',
                        templet: function(data) {
                                return data.name + "<span class='layui-badge table-icon-style2'>2</span>"
                        },
                    },
                    {
                        field: 'roomname',
                        title: '备注',
                        align: 'left',
                    },
                    {
                        field: 'roomname',
                        title: '最近登录',
                        align: 'left',
                        templet: function(data) {
                            return data.name + "<i class='layui-icon table-icon-style3'>&#xe60e;</i>"
                        },
                    },
                    {
                        field: 'modifytime',
                        title: '创建时间',
                        align: 'left',
                    },
                ]
            ],
            event: true,
            page: true,
            limit: 15,
            skin: 'line',
            even: true,
            limits: [5, 10, 15],
            done: function(res, curr, count) {
                table_data = res.data;
                layer.closeAll('loading');
                arrangeList.length = 0;
                // layer.close(layer.index); //它获取的始终是最新弹出的某个层，值是由layer内部动态递增计算的
                // layer.close(index);    //返回数据关闭loading
            },

        });
    }
    window.onkeyup = function(ev) {
        var key = ev.keyCode || ev.which;
        if (key == 27) { //按下Escape
            layer.closeAll('iframe'); //关闭所有的iframe层
        }
        if (key == 13) { //按下Escape
            $('#search').click();

        }
    }
    //监听表格复选框选择
    table.on('checkbox(test-table-operate)', function(obj) {
        console.log(obj)
    });
    table.on('checkbox(test-table-operate)', function(obj) {
        // console.log(obj.checked); //当前是否选中状态
        // // console.log(obj.data); //选中行的相关数据
        // console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
        // // console.log(table.checkStatus('test-table-operate').data); // 获取表格中选中行的数据
        if (obj.checked && obj.type == 'one') {
            var devi = {};
            devi = obj.data.id;
            arrangeList.push(devi)
        }
        if (!obj.checked && obj.type == 'one') {
            var index = arrangeList.indexOf(obj.data.id);
            if (index > -1) {
                arrangeList.splice(index, 1);
            }
        }
        if (!obj.checked && obj.type == 'all') {
            arrangeList.length = 0;

        }
        if (obj.checked && obj.type == 'all') {
            $.each(table.checkStatus('test-table-operate').data, function(idx, con) {
                var devi = {};
                devi = con.id;

                arrangeList.push(devi)
            });
            arrangeList = Array.from(new Set(arrangeList))
        }
        // console.log(arrangeList)

    });
    //监听工具条
    table.on('tool(test-table-operate)', function(obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            /**
             * @param {Object} index
             * 编排规则的借口提供之后需要接入删除
             */
            layer.confirm('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除后无法恢复！确定删除吗？&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',{title:'删除提醒',btnAlign:'c'}, function() {
                $.ajax({
                    async: false,
                    type: "get",
                    url: url + "/ruletemplate/deleteruletemplate",
                    dataType: "json",
                    xhrFields: {
                        withCredentials: true
                    },
                    //成功的回调函数
                    data: {
                        "id": data.id
                    },
                    success: function (msg) {

                        if (msg.code == '0') {
                            layer.msg("删除成功");
                            reloads();
                        } else {
                            layer.msg("删除失败");

                        }

                    },
                    //失败的回调函数
                    error: function () {
                        console.log("error")
                    }
                })
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            layer.open({
                type: 2,
                title: '编辑账号',
                area: ['500px', '400px'],
                btn: ['保存', '取消'],
                btnAlign: 'c',
                maxmin: true,
                content: 'account_edit_pop.html',
                // content: 'account_edit_pop.html?id=" + data.id,
                yes: function(index, layero) {
                }
            });
        } else if (obj.event === 'switch') {
            console.log("data.id=====",data.id)
            console.log("data.jz=====",data.jz)
            if(data.jz==1){
                data.jz=2
                console.log("data.jz=====11",data.jz)
                layer.msg("账号已禁用")
                //把数据提交到接口里
            }else{
                data.jz=1
                layer.msg("账号已启用")
                console.log("data.jz=====22",data.jz)
                //把数据提交到接口里
            }
        } else if (obj.event === 'openlog'){
            console.log("data.id=====",data.id)
            console.log("00000000000000")
            //在主窗口打开 操作日志 页面 
            // top.layui.index.openTabsPage("system/operation_log.html", '操作日志');
        }

    })
    var $ = layui.$,
        active = {
            //点击搜索
            search: function() {
                table.render({
                    elem: '#test-table-operate',
                    height: 'full-100',
                    url: "https://f.longjuli.com/meeting/findMeetingBylayui" //数据接口
                        ,
                    xhrFields: {
                        withCredentials: true
                    },
                    where: {
                        "rule": $('#demoReload').val(),
                        "status":0
                    },
                    method: 'get',
                    page: {
                        layout: ['prev', 'page', 'next', 'count', 'skip']
                    },
                    cols: [
                        [ //表头
                            {
                                type: 'checkbox',
                                fixed: 'left',
                            },
                            {
                                field: 'id',
                                title: '序号',
                                unresize: 'false',
                                width:60,
                            },
                            {
                                width: 100,
                                title: '操作',
                                toolbar: '#test-table-operate-barDemo',
                            },
                            {
                                field: 'name',
                                title: '姓名',
                                align: 'left',
                            }, {
                                field: 'roomname',
                                title: '手机号',
                                align: 'left',
                            },
                            {
                                field: 'roomname',
                                title: '角色',
                                align: 'left',
                                templet: function(data) {
                                        return data.name + "<span class='layui-badge table-icon-style2'>2</span>"
                                },
                            },
                            {
                                field: 'roomname',
                                title: '备注',
                                align: 'left',
                            },
                            {
                                field: 'roomname',
                                title: '最近登录',
                                align: 'left',
                                templet: function(data) {
                                    return data.name + "<i class='layui-icon table-icon-style3'>&#xe60e;</i>"
                                },
                            },
                            {
                                field: 'modifytime',
                                title: '创建时间',
                                align: 'left',
                            },
                            
                        ]
                    ],
                    event: true,
                    page: true,
                    limit: 15,
                    skin: 'line',
                    even: true,
                    limits: [5, 10, 15],
                    done: function(res, curr, count) {
                        table_data = res.data;

                        layer.closeAll('loading');
                        arrangeList.length = 0;
                        // layer.close(layer.index); //它获取的始终是最新弹出的某个层，值是由layer内部动态递增计算的
                        // layer.close(index);    //返回数据关闭loading
                    },
                });
            },
            //点击添加
            add: function() {
                layer.open({
                    type: 2,
                    title: '新增账号',
                    area: ['500px', '400px'],
                    btn: ['保存', '取消'],
                    btnAlign: 'c',
                    maxmin: true,
                    content: 'account_add_pop.html',
                    yes: function(index, layero) {
                        var submit = layero.find('iframe').contents().find("#ruleclick");
                        submit.click();
                    }
                });
            },
            //点击删除
            del: function() { 
                if ( arrangeList.length == 0 ) {
                    return layer.msg("请选择再批量删除")
                }
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
            //重置密码
            resetPassword: function() { 
                if ( arrangeList.length == 0 ) {
                    return layer.msg("请选择再批量重置密码")
                }
                layer.confirm('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;将自动发送随机密码到指定的手机上？&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',{title:'重置密码',btnAlign:'c'}, function() {//获取选中数目
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
                                layer.msg("密码发送成功");
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
            //刷新
            refresh: function() {
                reloads();
                // reloaddata(); // 父页面刷新
            },
        };
    //给页面里的layui-dS 绑定事件
    $('.layui-ds').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
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
    /* 表格中 鼠标移上 显示更多详细CSS html js*/
    $(document).on("mouseenter",".moreOperate",function(){
            var offsetTop = $(this).offset().top;
            var documentHeihgt=$(document).height();//浏览器当前窗口文档的高度
            var moreOperateAHeihgt=$(this).children(".moreOperateA").height()+30;
            // console.log("offsetTop ,documentHeihgt ,moreOperateAHeihgt===",offsetTop ,documentHeihgt ,moreOperateAHeihgt)
            // console.log("documentHeihgt-offsetTop===",documentHeihgt-offsetTop)
            if((documentHeihgt-offsetTop)<moreOperateAHeihgt){
                // console.log("1111");
                $(this).children(".moreOperateA").css("top",-(moreOperateAHeihgt-54));
                $(this).children(".moreOperateA").children(".moreOperateArr").css({"top":"auto","bottom":"10px"})
            }
            $(".layui-table-cell").css("overflow", "visible");
            $(this).children(".moreOperateA").show();
    })
    $(document).on("mouseleave",".moreOperate",function(){
        $(".layui-table-cell").css("overflow", "hidden");
        $(this).children(".moreOperateA").hide();
    })
    /* 表格中 鼠标移上 显示更多详细CSS html js end*/




});
