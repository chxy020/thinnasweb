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
    
    // var filePath = "";
    // var fileId = "";

    var fileId = setter.getUrlParam("fileId",uri) || "";
    var fileName = setter.getUrlParam("fileName",uri) || "";
    var filePath = setter.getUrlParam("filePath",uri) || "";
    var isEdit = setter.getUrlParam("isEdit",uri) || "";
    
    if(isEdit){
        // $("#filepath").html(filePath.replace("/ADMINM/uploadFiles/file",""));
        $("#name").val(fileName);
    }

    //视频
    upload.render({
        elem: '#test5',
        url: server + "/ADMINM/course/uploadFile", //改成您自己的上传接口
        accept: 'video', //视频
        field:"clientFile",
        before:function(){
            layer.load(2);
        },
        done: function(res){
            layer.closeAll();
            // console.log(res)
            if(res.code == 1){
                layer.msg('上传成功');
                $("#filepath").html(res.PATH.replace("/ADMINM/uploadFiles/file",""));
                filePath = res.PATH;
                if(!isEdit){
                    fileId = res.ID;
                }
            }else{
                layer.msg('上传失败');
            }

            // ID: "81caf154951d4eaab3d5cbe4c2b99792"
            // PATH: "/ADMINM/uploadFiles/file/81caf154951d4eaab3d5cbe4c2b99792.mp4"
            // code: 1
        }
    });




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
        // alert(888)
        // layer.msg(JSON.stringify(data.field),function(){
        //     location.href='index.html'
        // });
        
        // console.log(data.field)

        
        var condi = {};
        condi.name = data.field.name;
        

        if(isEdit){
            condi.id = fileId;
            if(videoKey){
                condi.fileKey = videoKey;
            }
            updateCourse(condi);
        }else{
            if(!videoKey){
                layer.msg("没有上传文件");
                return false;
            }
            
            condi.fileKey = videoKey;

            saveCourse(condi);
        }
        

        return false;
    });

    

    function saveCourse(condi){
        layer.load(2);
        $.Ajax({
            async: false,
            url: server + "/ADMINM/aftersales/addCourse",
            dataType: "json",
            method: 'post',
            data:condi,
            success: function(obj) {
                layer.closeAll();
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
    function updateCourse(condi){
        layer.load(2);
        $.Ajax({
            async: false,
            url:server + "/ADMINM/aftersales/updateCourse",
            dataType: "json",
            method: 'post',
            data:condi,
            success: function(obj) {
                layer.closeAll();
                if(obj.code == 0){
                    layer.msg("修改成功");

                    setTimeout(function(){
                        //刷新父页面
                        window.parent.location.reload();
                        var index = parent.layer.getFrameIndex(window.name);
               		    parent.layer.close(index);
                    },500);
                }else{
                    layer.msg(obj.msg || "修改失败");
                }
            }
        });
    }


});