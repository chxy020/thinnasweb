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
    var timer = null;
    var isFull = false;
    

    var chartData;
    function getAllChartData(){
        $.Ajax({
            async: false,
            type: "POST",
            url: server + "/ADMINM/echarts/getEchartsData",
            datatype: 'json',
            xhrFields: {
                withCredentials: true
            },
            //成功的回调函数
            success: function (obj) {
                if(obj.code == 0){
                    var data = obj.data || {};
                    chartData = data;
                    //总用户数
                    var totalUser = data.totalUser || null;
                    if(totalUser){
                        var count = totalUser.totalUser || 0;
                        $("#totalUser").html('<span>'+count+'</span>个');
                    }
                    var dailyLife = data.dailyLife || null;
                    if(dailyLife){
                        var count = dailyLife.dailyLife || 0;
                        $("#dailyLife").html('<span>'+count+'</span>个');
                    }
                    var userProportion = data.userProportion || null;
                    if(userProportion){
                        var count = userProportion.userProportion || 0;
                        $("#userProportion").html('<span>'+count+'</span>%');
                    }
                    var deviceProportion = data.deviceProportion || null;
                    if(deviceProportion){
                        var userProportion1 = deviceProportion.userProportion1 || 0;
                        var userProportion2 = deviceProportion.userProportion2 || 0;
                        $("#userProportion1").html(userProportion1 + '<i>台</i>');
                        $("#userProportion2").html(userProportion2 + '%');
                    }
                    var publicIp = data.publicIp || null;
                    if(publicIp){
                        var publicIp = publicIp.publicIp || 0;
                        $("#publicIp").html('<span>' + publicIp +'</span>个');
                    }
                    var storage_capacity = data.storage_capacity || null;
                    if(storage_capacity){
                        var storage_capacity = storage_capacity.storage_capacity || 0;
                        $("#storage_capacity").html('<span>' + (+storage_capacity/1024/1024).toFixed(2) +'</span>TB');
                    }
                    var share_space = data.share_space || null;
                    if(share_space){
                        var share_space = share_space.share_space || 0;
                        $("#share_space").html('<span>' + share_space +'个</span>');
                    }
                }
            },
            error: function (error) {
            },
        });
    }

    // 0 用户 1 设备
    var mapType = 0;
    var cityName = "全国";
    var mapCode = "100000";
    var mapDataList = [];
    var usedUserNum = 0;
    var totalUserNum = 0;
    function getMapChartData(type,country,mapType){
        $.Ajax({
            async: true,
            type: "POST",
            url: server + "/ADMINM/echarts/getMapList",
            datatype: 'json',
            data:{
                type:type,
                country:country,
                mapType:mapType
            },
            xhrFields: {
                withCredentials: true
            },
            //成功的回调函数
            success: function (obj) {
                if(obj.code == 0){
                    var data = obj.data || {};
                    var mapdata = data.map || [];

                    usedUserNum = data.usedUserNum || 0;
                    totalUserNum = data.totalUserNum || 0;

                    mapdata = mapdata.filter(function(item){
                        var name = item.name;
                        var mapname = mapDataList.filter(function(d){
                            return d.indexOf(name) > -1;
                        });
                        item.name = mapname[0] || name;
                        return +item.value > 0;
                    });

                    // mapdata = [
                    //     {"name":"北京","value":200},
                    //     {"name":"广东","value":100}
                    // ];
                    
                    // mapOptions
                    setSeries(mapdata);

                    mapOptions.geo.map = mapCode == "100000" ? "china" : mapCode;
                    mapOptions.series[1].map = mapCode == "100000" ? "china" : mapCode;
                    

                    mapChart.setOption(mapOptions);
                    mapChart.resize();
                }
            },
            error: function (error) {
            }
        });
    }
    

    var mapOptions = {
        title:{
            text:"中国",
            show:false,
            top:3,
            left:90,
            textStyle:{
                color:'#fff',
                fontSize:22,
                fontWeight:"normal"
            }
        },
        tooltip: {
            show: true,
            formatter: function(params) {
                var data = params.data || "";
                if (data) {
                    return '&nbsp;&nbsp;' + params.name + '&nbsp;&nbsp;&nbsp;' + data.value[2] + '&nbsp;&nbsp;';
                }
            }
        },
        geo: {
            map: 'china',
            label: {
                normal: {
                    show: false,
                    color: '#4ecfdd'
                }
            },
            roam: false,
            zoom:1.2,
            itemStyle: {
                normal: {
                    areaColor: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 2.5,
                        colorStops: [{
                            offset: 0, color: '#ffffff00' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#ffffff80' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    },
                    borderWidth: 1,
                    borderColor: '#548AA3'
                },
                emphasis: {
                    areaColor: '#389BB7'
                }
            }
        },
        // visualMap: {
        //     show:false,
        //     left: '3%',
        //     bottom: '6%',
        //     itemHeight:15,
        //     itemWidth:15,
        //     pieces: [{
        //         gte: 1000,
        //         label: "1000",
        //         color: "#F72A22"
        //     }, {
        //         gte: 800,
        //         lt: 1000,
        //         label: "800-1000",
        //         color: "#FF8226"
        //     }, {
        //         gte: 600,
        //         lt: 800,
        //         label: "600-800",
        //         color: "#FFF200"
        //     }, {
        //         gte: 300,
        //         lt: 600,
        //         label: "300-600",
        //         color: "#4DFAFF"
        //     }, {
        //         lt: 300,
        //         gte: 0,
        //         label: "0-300",
        //         color: "#0FFF64"
        //     }],
        //     textStyle:{
        //         color:"#fff",
        //         fontSize: "14px"
        //     }
        // },
        series: [
            // {
            //     type: 'scatter',
            //     coordinateSystem: 'geo',
            //     zlevel: 2,
            //     symbolSize: 6,
            //     itemStyle: {
            //         normal: {
            //             color: '#54FAFE',
            //         }
            //     },
            //     data: [
            //         {name:"河北",value:100}
            //     ]
            // },
            
            {
                type: 'effectScatter',
                coordinateSystem: 'geo',
                label: {
                    normal: {
                        show: true,
                        color: '#ffffff',
                        fontWeight: 'bold',
                        position: 'insideLeft',
                        formatter: function(para) {
                            // return para.name + '-' + '{cnNum|' + para.data.value[2] + '}'
                            return para.data.value[2];
                        }
                    },
                },
                symbol: 'circle',
                symbolSize :1,
                data: [],
                zlevel: 1
            },
            {
                // name: '全国',
                type: 'map',
                map: 'china',
                zoom:1.2,
                geoIndex: 0,
                label: {
                    show: true
                },
                nameMap:{
                },
                data: [
                    
                ]
            }
        ]
    };


    function fullScreen(){
        var docElm = document.documentElement;
        //W3C
        if(docElm.requestFullscreen){
            docElm.requestFullscreen();
        }
        //FireFox
        else if(docElm.mozRequestFullScreen){
            docElm.mozRequestFullScreen();
        }
        //Chrome等
        else if(docElm.webkitRequestFullScreen){
            docElm.webkitRequestFullScreen();
        }
        //IE11
        else if(elem.msRequestFullscreen){
            elem.msRequestFullscreen();
        }
        isFull = true;
    }
    function exitScreen(){
        var el = document;
        var cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen;
    
        //typeof cfs != "undefined" && cfs
        if (cfs) {
            cfs.call(el);
        }
        else if (typeof window.ActiveXObject !== "undefined") {
            //for IE，这里和fullScreen相同，模拟按下F11键退出全屏
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript != null) {
                wscript.SendKeys("{F11}");
            }
        }
        isFull = false;
    }
    function getCurrentDate(){
        //console.log(format);
        clearTimeout(timer);

        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        month = month < 10 ? ("0"+month) : month;
        var date = now.getDate();
        date = date < 10 ? ("0"+date) : date;
        var day = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六")[now.getDay()];
        var hour = now.getHours() < 10 ? ("0" + now.getHours()) : now.getHours();
        var minute = now.getMinutes() < 10 ? ("0" + now.getMinutes()) : now.getMinutes();
        var second = now.getSeconds() < 10 ? ("0" + now.getSeconds()) : now.getSeconds();
        
        var today = hour+":" + minute +":" + second + " " + year + "-" + month + "-" + date + " " + day;
        
        $("#console_top_time").html(today);
        this.timer = setTimeout(function(){
            getCurrentDate();
        },1000);
    }


    function lineChart(xdata,ydata){
        var option = {
            tooltip: {
                trigger: 'axis'
            },
            xAxis: [{
                type: 'category',
                data: xdata || [],
                show:false
            }],
            yAxis: [{
                type: 'value',
                splitNumber: 4,
                splitLine: {
                    show:false,
                    lineStyle: {
                        type: 'dashed',
                        color: '#DDD'
                    }
                },
                axisLabel:{
                    show:false
                },
                axisTick:{
                    show:false
                },
                axisLine: {
                    show: false
                },
                splitArea: {
                    show: false
                }
            }],
            series: [{
                name: '用户数',
                type: 'line',
                symbolSize: 0,
                data: ydata || [],
                lineStyle: {
                    normal: {
                        width: 2,
                        color: {
                            type: 'linear',
                            colorStops: [{
                                offset: 0,
                                color: '#0464D5' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#06DED0' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        shadowColor: 'rgba(72,216,191, 0.3)',
                        shadowBlur: 10,
                        shadowOffsetY: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#fff',
                        borderWidth: 1,
                        /*shadowColor: 'rgba(72,216,191, 0.3)',
                        shadowBlur: 100,*/
                        borderColor: "#A9F387"
                    }
                },
                smooth: true
            }]
        };

        return option;
    }

    function lineChart2(data){
        let dataC1 =[120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 260, 280];
        let dataC2 =[220, 182, 191, 210, 230, 270, 270, 201, 154, 140, 240, 250]
        let dataC3 =[150, 232, 201, 154, 190, 180, 210, 150, 182, 201, 154, 190]
        let dataD1 =[150, 232, 201, 154, 190, 180, 210, 150, 182, 201, 154, 190]
        let dataD2 =[150, 232, 201, 154, 190, 180, 210, 150, 182, 201, 154, 190]
        let dataD3 =[200, 232, 201, 200, 190, 190, 210, 190, 182, 201, 154, 190]
        // let xData = ['01:00', '03:00', '05:00', '07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00', '23:00'];
        let xData = data.dailyLifeIntervalX || [];
        let yData = data.dailyLifeIntervalY || {};
        let all = yData.all || [];
        let download = yData.download || [];
        let select = yData.select || [];
        let upload = yData.upload || [];
        for(var i = 0;i<xData.length;i++){
            all.splice(i,1,{name:xData[i],value:all[i]});
            download.splice(i,1,{name:xData[i],value:download[i]});
            select.splice(i,1,{name:xData[i],value:select[i]});
            upload.splice(i,1,{name:xData[i],value:upload[i]});
            // dataC1.splice(i,1,{name:xData[i],value:dataC1[i]});
            // dataC2.splice(i,1,{name:xData[i],value:dataC2[i]});
            // dataC3.splice(i,1,{name:xData[i],value:dataC3[i]});
            // dataD1.splice(i,1,{name:xData[i],value:dataD1[i]});
            // dataD2.splice(i,1,{name:xData[i],value:dataD2[i]});
            // dataD3.splice(i,1,{name:xData[i],value:dataD3[i]});
        }

        var fontColor = '#30eee9';
        var option = {
            grid: {
                left: '5%',
                right: '2%',
                top: '15%',
                bottom: '5%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    lineStyle: {
                        color: '#57617B'
                    }
                }
            },
            legend: {
                data: ['上传', '下载', '浏览', '全部'],
                itemWidth: 20,
                itemHeight: 10,
                textStyle: {
                    fontSize: 14,
                    color: '#65aaf1',
                },
                top: "3%"
                // left : '50%'
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    color: '#65aaf1'
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#0a2b52',
                        width: 1
                    }
                },
                /*axisTick:{
                            show:false,
                        },  
                        splitLine:{
                            show:true,
                            lineStyle:{
                                color:'#195384'
                            }
                        },*/
                data:xData
            }],
            yAxis: [{
                type: 'value',
                // name: 'kw/h',
                nameTextStyle: {
                    color: '#65aaf1',
                    fontStyle: 'normal'
                },
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: '#65aaf1'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#0a2b52'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#0a2b52',
                        width: 1,
                        type: 'solid'
                    }
                }
            }],
            series: [{
                    name: '上传',
                    type: 'line',
                    stack: '总量',
                    symbol: 'circle',
                    showSymbol: false,
                    symbolSize: 8,
                    itemStyle: {
                        normal: {
                            color: '#0092f6',
                            lineStyle: {
                                color: "#0092f6",
                                width: 1
                            },
                            areaStyle: {
                                //color: '#94C9EC'
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0.4,
                                    color: 'rgba(7,44,90,0.1)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(0,146,246,0.9)'
                                }]),
                            }
                        }
                    },
                    markPoint: {
                        itemStyle: {
                            normal: {
                                color: 'red'
                            }
                        }
                    },
                    data:upload
                },
                {
                    name: '下载',
                    type: 'line',
                    stack: '总量',
                    symbol: 'circle',
                    showSymbol: false,
                    symbolSize: 8,
        
                    itemStyle: {
                        normal: {
                            color: '#00d4c7',
                            lineStyle: {
                                color: "#00d4c7",
                                width: 1
                            },
                            areaStyle: {
                                //color: '#94C9EC'
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0.4,
                                    color: 'rgba(7,44,90,0.1)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(0,212,199,0.9)'
                                }]),
                            }
                        }
                    },
                    data: download
                },
                {
                    name: '浏览',
                    type: 'line',
                    stack: '总量',
                    symbol: 'circle',
                    showSymbol: false,
                    symbolSize: 8,
                    itemStyle: {
                        normal: {
                            color: '#aecb56',
                            lineStyle: {
                                color: "#aecb56",
                                width: 1
                            },
                            areaStyle: {
                                //color: '#94C9EC'
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0.4,
                                    color: 'rgba(7,44,90,0.1)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(114,144,89,0.9)'
                                }]),
                            }
                        }
                    },
                    data: select
                },
                {
                    name: '全部',
                    type: 'line',
                    stack: '总量',
                    symbol: 'circle',
                    showSymbol: false,
                    symbolSize: 8,
                    itemStyle: {
                        normal: {
                            color: '#3A44FB',
                            lineStyle: {
                                color: "#3A44FB",
                                width: 1
                            },
                            areaStyle: {
                                //color: '#94C9EC'
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0.4,
                                    color: 'rgba(7,46,101,0.1)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(0,166,246,0.9)'
                                }]),
                            }
                        }
                    },
                    data: all
                }
            ]
        };
        return option;
    }

    function pieChart(data){
        var serise = [{
            value: 5,
            name: '文档',
            itemStyle: {
                color: "#FBB033",
                borderColor: "rgba(50,123,250,1)",
                borderWidth: 0
            }
        },
        {
            value: 2,
            name: '图片',
            itemStyle: {
                color: "#8D83FE",
                borderColor: "rgba(244,201,7,1)",
                borderWidth: 0
            }
        },
        {
            value: 3,
            name: '视频',
            itemStyle: {
                color: "#007FFD",
                borderColor: "rgba(23,216,161,1)",
                borderWidth: 0
            }
        },
        {
            value: 4,
            name: '音频',
            itemStyle: {
                color: "#F1D669",
                borderColor: "rgba(122,60,235,1)",
                borderWidth: 0
            }
        },
        {
            value: 5,
            name: '应用',
            itemStyle: {
                color: "#87E187",
                borderColor: "rgba(15,197,243,1)",
                borderWidth: 0
            }
        },
        {
            value: 6,
            name: '其它',
            itemStyle: {
                color: "#D2CFD0",
                borderColor: "rgba(15,197,243,1)",
                borderWidth: 0
            }
        }];

        var storage_capacity_X = data.storage_capacity_X || [];
        var storage_capacity_Y = data.storage_capacity_Y || [];
        for(var i = 0,len = storage_capacity_Y.length; i < len; i++){
            serise[i].name = storage_capacity_Y[i].name;
            serise[i].value = storage_capacity_Y[i].value;
        }

        var option = {
            legend: {
                orient: 'vertical',
                top: "center",
                right: "5%",
                data: storage_capacity_X,
                textStyle: {
                    color: "#fff",
                    fontSize: 16
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [{
                name: '半径模式',
                type: 'pie',
                radius: ['30%', '60%'],
                center: ['40%', '50%'],
                roseType: 'radius',
                label: {
                    show: true,
                    normal: {
                        position: 'outside',
                        fontSize: 16
                    }
                },
                labelLine: {
                    length: 1,
                    length2: 20,
                    smooth: true
                },
                data:serise
            }]
        };
        return option;
    }

    var linechart1;
    var linechart2;
    var linechart3;
    var linechart4;
    var linechart5;
    var linechart6;
    var linechart7;
    function addLineChart(){
        var line1 = $("#line1");
        linechart1 = echarts.init(line1[0]);
        var option = lineChart(chartData.totalUser.totalUserX,chartData.totalUser.totalUserY);
        option.series[0].name = "用户数";
        option.series[0].lineStyle.normal.color = {
            type: 'linear',
            colorStops: [{
                offset: 0,
                color: '#0464D5' // 0% 处的颜色
            }, {
                offset: 1,
                color: '#06DED0' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
        };
        linechart1.setOption(option);

        var line2 = $("#line2");
        linechart2 = echarts.init(line2[0]);
        var option = lineChart(chartData.dailyLife.dailyLifeX,chartData.dailyLife.dailyLifeY);
        option.series[0].name = "日活用户数";
        option.series[0].lineStyle.normal.color = {
            type: 'linear',
            colorStops: [{
                offset: 0,
                color: '#3A5EFF' // 0% 处的颜色
            }, {
                offset: 1,
                color: '#2EC3FF' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
        };
        linechart2.setOption(option);

        var line3 = $("#line3");
        linechart3 = echarts.init(line3[0]);
        var option = lineChart(chartData.userProportion.userProportionX,chartData.userProportion.userProportionY);
        option.series[0].name = "设备用户比例";
        option.series[0].lineStyle.normal.color = {
            type: 'linear',
            colorStops: [{
                offset: 0,
                color: '#C26BD6' // 0% 处的颜色
            }, {
                offset: 1,
                color: '#3927B0' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
        };
        linechart3.setOption(option);

        var line4 = $("#line4");
        linechart4 = echarts.init(line4[0]);
        var option = lineChart(chartData.deviceProportion.deviceProportionX,chartData.deviceProportion.deviceProportionY);
        option.series[0].name = "设备数总";
        option.series[0].lineStyle.normal.color = {
            type: 'linear',
            colorStops: [{
                offset: 0,
                color: '#FABC4F' // 0% 处的颜色
            }, {
                offset: 1,
                color: '#F8892F' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
        };
        linechart4.setOption(option);

        var line5 = $("#line5");
        linechart5 = echarts.init(line5[0]);
        var option = lineChart(chartData.publicIp.publicIpX,chartData.publicIp.publicIpY);
        option.series[0].name = "公网IP数";
        option.series[0].lineStyle.normal.color = {
            type: 'linear',
            colorStops: [{
                offset: 0,
                color: '#F13633' // 0% 处的颜色
            }, {
                offset: 1,
                color: '#D70E34' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
        };
        linechart5.setOption(option);

        var line6 = $("#line6");
        linechart6 = echarts.init(line6[0]);
        var option = lineChart(chartData.storage_capacity.storage_capacity_X,chartData.storage_capacity.storage_capacity_Y);
        option.series[0].name = "存储容量";
        option.series[0].lineStyle.normal.color = {
            type: 'linear',
            colorStops: [{
                offset: 0,
                color: '#3A5EFF' // 0% 处的颜色
            }, {
                offset: 1,
                color: '#2EC3FF' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
        };
        linechart6.setOption(option);

        var line7 = $("#line7");
        linechart7 = echarts.init(line7[0]);
        var option = lineChart(chartData.share_space.share_space_X,chartData.share_space.share_space_Y);
        option.series[0].name = "共享空间数";
        option.series[0].lineStyle.normal.color = {
            type: 'linear',
            colorStops: [{
                offset: 0,
                color: '#FABC4F' // 0% 处的颜色
            }, {
                offset: 1,
                color: '#F8892F' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
        };
        linechart7.setOption(option);
    }

    var userLineChart;
    function addUserActiveLine(){
        var useractiveline = $("#useractiveline");
        userLineChart = echarts.init(useractiveline[0]);
        var option = lineChart2(chartData.dailyLifeInterval);
        userLineChart.setOption(option);
    }

    var fileTypePieChart;
    function addFileTypePie(){
        
        var filetypepie = $("#filetypepie");
        fileTypePieChart = echarts.init(filetypepie[0]);
        var option = pieChart(chartData.classified);
        fileTypePieChart.setOption(option);
    }
    
    getCurrentDate();

    getAllChartData();

    addLineChart();

    addUserActiveLine();

    addFileTypePie();

    mapInit();

    $("#console_top_full").bind("click",function(){
        if(!isFull){
            fullScreen();
        }else{
            exitScreen();
        }
    });



    
    var chinaCode = {
        "河南":"410000",
        "广东":"440000",
        "内蒙古":"150000",
        "黑龙江":"230000",
        "新疆":"650000",
        "湖北":"420000",
        "辽宁":"210000",
        "山东":"370000",
        "江苏":"320000",
        "陕西":"610000",
        "上海":"310000",
        "贵州":"520000",
        "重庆":"500000",
        "西藏":"540000",
        "安徽":"340000",
        "福建":"350000",
        "湖南":"430000",
        "海南":"460000",
        "青海":"630000",
        "广西":"450000",
        "宁夏":"640000",
        "江西":"360000",
        "浙江":"330000",
        "河北":"130000",
        "香港":"810000",
        "台湾":"710000",
        "澳门":"820000",
        "甘肃":"620000",
        "四川":"510000",
        "吉林":"220000",
        "天津":"120000",
        "云南":"530000",
        "北京":"110000",
        "山西":"140000"
    };


    var geoCoordMap;
    var mapChart;
    function mapInit(){
        
        mapChart = echarts.init($("#mapchart")[0]);
        
        mapChart.on('click', function(params){
            // console.log(params);
            
            if (!params.name){
                return;
            }
            // // if (this.config.adcodepath.length == 4) return;
            var adcode = chinaCode[params.name] || "";
            if(!adcode){
                return;
            }
            cityName = params.name;
            mapCode = adcode;
            registerMap(adcode);

        }.bind(this));

        registerMap(mapCode);
    }

    function registerMap(code) {
        // let _url = `/assets/geoJson/100000.json`;
        let _url = `/ADMINM/static/assets/geoJson/100000.json`;

        if(code != "100000"){
            if(code.substring(2,6) == "0000"){
                //省
                _url = `/ADMINM/static/assets/geoJson/100000/` + code + ".geoJson";
                // _url = `/assets/geoJson/100000/` + code + ".geoJson";
            }else if(code.substring(4,6) == "00"){
                //市
                let file = code.substring(0,2);
                // _url = `/assets/geoJson/100000/` + file + "0000/" + code + ".geoJson";
                _url = `/ADMINM/static/assets/geoJson/100000/` + file + "0000/" + code + ".geoJson";
            }else{
                //县
                let file1 = code.substring(0,2);
                let file2 = code.substring(0,4);
                _url = `/ADMINM/static/assets/geoJson/100000/` + file1 + "0000/" + file2 +"00/" + code + ".geoJson";
            }
        }
        
        $.Ajax({
            async: false,
            url: _url,
            dataType: "json",
            method: 'get',
            success: function(mapjson) {
                echarts.registerMap(code == "100000" ? "china" : code, mapjson);

                // mapOptions.geo.map = code;
                mapDataList = [];
                geoCoordMap = {};
                var features = mapjson.features;
                features.forEach(item =>{
                    // 地区名称
                    var name = item.properties.name;
                    // 地区经纬度
                    geoCoordMap[name] = item.properties.cp || item.properties.center;
                    mapDataList.push(name);
                });

                getMapChartData(cityName == "全国" ? 0 : 1,cityName == "全国" ? "" : cityName,mapType);
                
            }
        });
    }


    function setSeries(mapdata) {
        
        // mapOptions.series[0].data = mapdata;
        mapOptions.series[0].data = convertData(mapdata || []);
        mapOptions.series[1].data = convertData(mapdata || []);

        setMapLiHtml(mapdata);
    }

    function convertData(outdata){
        let res = [];
        for (let i = 0; i < outdata.length; i++) {
            let geoCoord = geoCoordMap[outdata[i].name];
            if (geoCoord) {
                res.push({
                    name: outdata[i].name,
                    value: geoCoord.concat(outdata[i].value),
                });
            }
        }
        return res;
    }

    function setMapLiHtml(data){
        var ul = [];
        for(var i = 0,len = data.length; i < len; i++){
            var item = data[i];
            ul.push('<li>' + (i + 1) + '.' +  item.name + ':' + item.value + '</li>');
        }
        $("#mapdatali").html(ul.join(''));
        $("#allmapdata").html('在线用户数：<span class="a">' + usedUserNum + '</span>/<span>'+totalUserNum+'</span>');
    }

    $("#mapbackbtn").bind("click",function(){
        if(mapCode != "100000"){
            mapCode = "100000";
            cityName = "全国";
            registerMap(mapCode);
        }
    });

    $("#usermap").bind("click",function(){
        $("#usermap").addClass("on");
        $("#devicemap").removeClass("on");
        mapType = 0;
        registerMap(mapCode);
    });
    $("#devicemap").bind("click",function(){
        $("#devicemap").addClass("on");
        $("#usermap").removeClass("on");
        mapType = 1;
        registerMap(mapCode);
    });

    var tout = null;
    $(window).bind("resize",function(){
        clearTimeout(tout);
        setTimeout(function(){
            if(linechart1 && userLineChart && fileTypePieChart && mapChart){
                linechart1.resize();
                linechart2.resize();
                linechart3.resize();
                linechart4.resize();
                linechart5.resize();
                linechart6.resize();
                linechart7.resize();
                userLineChart.resize();
                fileTypePieChart.resize();
                mapChart.resize();
            }
        },500);
    });


    //定时刷新数据
    setInterval(function(){
        getAllChartData();
        getMapChartData(cityName == "全国" ? 0 : 1,cityName == "全国" ? "" : cityName,mapType);
    }.bind(this), 5 * 60 * 1000);
});
