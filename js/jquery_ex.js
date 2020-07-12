/**
 * file:zepto扩展
 * author:ToT
 * date:2015-05-13
*/

if(typeof(jQuery) != "undefined"){
	jQuery.fn.extend({
		eachonbind: function( type,fn, scope,date ) {
			return this.each(function(){
				$(this).bind(type,date, $.proxy(fn,scope));
			});
		},
		visible: function() {
			return this.each(function(){
				$(this).css('visibility', 'visible');
			});
		},
		hidden: function() {
			return this.each(function(){
				$(this).css('visibility', 'hidden');
			});
		},
		onbind: function(evt,fn,scope,date) {
			return  $(this).bind(evt,date,$.proxy(fn,scope));
		},
		rebind:function(evt,fn,scope,date) {
			//解除绑定
			$(this).unbind(evt);
			return  $(this).bind(evt,date, $.proxy(fn,scope));
		},
		onclick: function(fn, scope ) {
			return  $(this).click($.proxy(fn,scope));
		}
	});

	jQuery.Ajax = function(option){
		if(typeof option === "object" && option != null){
			var dataType = option.dataType || "json";
			if(dataType === "jsonp"){
				//jsonp请求
				var url = option.url || "";
				if(url !== ""){
					//标示,jsonp请求,
					option.data = option.data || {};
					//option.data.rtype = 2;
					
					option.url = url + "?callback=?&timer=" + new Date().getTime();
					$.ajax(option);
				}
				else{
					return false;
				}
			}
			else{

				var url = option.url;
				// var ignoreToken = ['login', 'regist','home','getCode','codeimg','forgetPasswordPhone'];
				// var needToken = ignoreToken.filter(function(u){
				// 	return url.match(u);
				// });
				// if(!needToken.length){
				// 	option.beforeSend = function(req){
				// 		req.setRequestHeader('Authentication', Base.token);
				// 	}
				// }

				// // 'login',
				// var ignoreCross = ['loginWeb','regist','getCode'];
				// var needCross = ignoreCross.filter(function(u){
				// 	return url.match(u);
				// });
				// if(needCross.length){
				// 	option.xhrFields = {withCredentials: true};
				// 	option.crossDomain = true;
				// }
			
				option.xhrFields = {withCredentials: true};
				option.crossDomain = true;

				// option.contentType='application/x-www-form-urlencoded;';
				
				// layer.load(2);
				var error = option.error || function(){};
				option.error = function(res){
					if(res.status == 401){
						//未登陆
						// location.href = "/login/login.html";
						return;
					}
					// Utils.loadClose();
					error.call(this,res.responseJSON || {});
				}
				var success = option.success || function(){};
				option.success = function(res){
					if(res.code == 302){
						if(window != top){
							top.location.href = '/ADMINM/static/views/user/login.html';
						}else{
							location.href = '/ADMINM/static/views/user/login.html';
						}
						return;
					}
					// Utils.loadClose();
					success.call(this,res || {});
				}

				$.ajax(option);
			}
		}
		else{
			return false;
		}
	}
}

