layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form','jquery','tree','util','upload'], function () {
    var $ = layui.$,
    upload = layui.upload,
    setter = layui.setter,
    form = layui.form,
    layer = layui.layer,
    setter = layui.setter,
    router = layui.router(),
    data = '';
    // var server = setter.baseUrl;

    var server = setter.baseUrl;
    var uri = window.location.search;
    
    var userInfo = {};
    function getUserInfo(userid){
        var user = window.sessionStorage.getItem("__userinfo") || "";
        if(user){
            user = JSON.parse(user);
            userInfo = user;
        }else{
            top.location.href = setter.loginUrl;
        }
    }
    
    getUserInfo();

    var type = +setter.getUrlParam("t",uri) || "";
    var version = setter.getUrlParam("v",uri) || "";

    var titles = ["","AI存储APP","ThinNAS PC电脑端"];
    var icons = ["","icon-anzhuo","icon-windows"];
    if(type){
        $("#title").html(titles[type]);
        $("#appicon").addClass(icons[type]);
    }
    
    if(version){
        $("#versionnum").html(version);
    }
    
    $("#username").val("test");


    // var userHeadImg = "images/headImg.png";

    // function setUserInfoHtml(){
    //     if(user.headimg != "" && user.headimg.indexOf("headImg.png") == -1){
    //         $("#headimg").attr("src",server + user.headimg);
    //         userHeadImg = user.headimg;
    //     }
    //     $("#username").val(user.username);
    //     $("#role_NAME").val(user.role.role_NAME);
    //     $("#name").val(user.name);
        
    // }
    // setUserInfoHtml();

    var _token;
    var url = server + "/ADMINM/qiniu/getQiniuyinToken";
    $.Ajax({
        async: false,
        url: url,
        // dataType: "json",
        method: 'post',
        // data:formdata,
        // processData:false,   //  告诉jquery不要处理发送的数据
        // contentType:false,   // 告诉jquery不要设置content-Type请求头
        success: function(obj) {
            layer.closeAll();
            
            if(obj.code == 0){
                var token = obj.data;
                _token = token;
            }
        },
        error:function(){
            layer.closeAll();
        }
    });


    var videoKey;
    var videoSize;
    var videoType = "mp4";
    var observer = {
        next(res){
            var total = Math.ceil(res.total.percent);
            if(total == 100){
                videoSize = res.total.size;

                $("#videoSize").html((videoSize/1024/1024).toFixed(2)+"MB");
            }
            $("#uploadbg").show();
            $('#progressbar1').LineProgressbar({
                percentage: total,
                duration:0
            });
        },
        error(err){
            layer.msg("上传视频错误");
            $("#file").val('');
            // console.log("error----",err);
        },
        complete(res){
            $("#uploadbg").hide();
            layer.msg("上传视频成功");
            videoKey = res.key;
        }
    };
    
    function uploadFile(files){
        if(_token){
            var putExtra = {};
            var config = {
                // useCdnDomain: true,
                // region: qiniu.region.z2
            };
            var guid = getGuid();
            var observable = qiniu.upload(files,guid, _token, putExtra, config)
            var subscription = observable.subscribe(observer) // 上传开始
            // or
            // var subscription = observable.subscribe(next, error, complete) // 这样传参形式也可以
            // subscription.unsubscribe() // 上传取消
        }else{
            layer.msg("没有获取到token");
        }
    }



	function getGuid(){
		var guid = "";
		for (var i = 1; i <= 32; i++){
			var n = Math.floor(Math.random()*16.0).toString(16);
			guid += n;
			if((i==8)||(i==12)||(i==16)||(i==20)){
				guid += "-";
			}
		}
		return guid;
	};




    $("#file").bind("change",function(obj){
        var files = obj.currentTarget.files;
        uploadFile(files[0]);
    });


    //监听提交
    form.on('submit(submit)', function(data){
        
        if(!videoKey){
            layer.msg("没有上传文件");
            return false;
        }
        var condi = {};
        condi.fileKey = videoKey;
        condi.fileSize = videoSize;
        condi.version = data.field.version;
        condi.description = data.field.description;
        condi.username = userInfo.username;

        saveApp(condi);
        return false;
    });


    function saveApp(condi){
        layer.load(2);
        // server = "http://139.196.147.194:8084"
        // var url = server + "/jqkj/user/updateAppVersion";
        // var formdata = new FormData(document.getElementById("form"))

        $.Ajax({
            async: false,
            url: server + "/ADMINM/user/updateAppVersion",
            dataType: "json",
            method: 'post',
            data:condi,
            // processData:false,   //  告诉jquery不要处理发送的数据
            // contentType:false,   // 告诉jquery不要设置content-Type请求头
            success: function(obj) {
                layer.closeAll();

                if(obj.code == 1){
                    layer.msg("上传成功");
                    
                    setTimeout(function(){
                        //刷新父页面
                        window.parent.location.reload();
                        var index = parent.layer.getFrameIndex(window.name);
               		    parent.layer.close(index);
                    },1500);
                }else{
                    layer.msg(obj.msg || "上传失败");
                }
            },
            error:function(){
                layer.closeAll();
            }
        });
    }

    

});