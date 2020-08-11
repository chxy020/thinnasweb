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
    var mapCode = "100000";

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
        geo: {
            map: '100000',
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
                    areaColor: '#163356',
                    borderWidth: 1,
                    borderColor: '#1f5c94'
                },
                emphasis: {
                    areaColor: 'lightblue'
                }
            }
        },
        series: [
            {
                type: 'scatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                symbolSize: 6,
                itemStyle: {
                    normal: {
                        color: '#54FAFE',
                    }
                },
                data: []
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


    function lineChart(){
        var option = {
            tooltip: {
                trigger: 'axis'
            },
            xAxis: [{
                type: 'category',
                data: ['2019-01','2019-02','2019-03','2019-04','2019-05','2019-06'],
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
                name: '课时',
                type: 'line',
                data: [23,60,20,36,23,85],
                lineStyle: {
                    normal: {
                        width: 1,
                        color: {
                            type: 'linear',
                            colorStops: [{
                                offset: 0,
                                color: '#A9F387' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#48D8BF' // 100% 处的颜色
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

    function lineChart2(){
        let dataC1 =[120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 260, 280];
        let dataC2 =[220, 182, 191, 210, 230, 270, 270, 201, 154, 140, 240, 250]
        let dataC3 =[150, 232, 201, 154, 190, 180, 210, 150, 182, 201, 154, 190]
        let dataD1 =[150, 232, 201, 154, 190, 180, 210, 150, 182, 201, 154, 190]
        let dataD2 =[150, 232, 201, 154, 190, 180, 210, 150, 182, 201, 154, 190]
        let dataD3 =[200, 232, 201, 200, 190, 190, 210, 190, 182, 201, 154, 190]
        let xData = ['01:00', '03:00', '05:00', '07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00', '23:00'];
        
        for(var i = 0;i<xData.length;i++){
            dataC1.splice(i,1,{name:xData[i],value:dataC1[i]});
            dataC2.splice(i,1,{name:xData[i],value:dataC2[i]});
            dataC3.splice(i,1,{name:xData[i],value:dataC3[i]});
            dataD1.splice(i,1,{name:xData[i],value:dataD1[i]});
            dataD2.splice(i,1,{name:xData[i],value:dataD2[i]});
            dataD3.splice(i,1,{name:xData[i],value:dataD3[i]});
        }
        console.log(dataC1);
        console.log(dataC2);
        console.log(dataC3);
        console.log(dataD1);
        console.log(dataD2);
        console.log(dataD3);

        var fontColor = '#30eee9';
        option = {
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
                    data:dataC1
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
                    data: dataC2
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
                    data: dataC3
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
                    data: dataD1
                }
            ]
        };
        return option;
    }

    function pieChart(){
        var option = {
            legend: {
                orient: 'vertical',
                top: "center",
                right: "5%",
                data: ['文档', '图片', '视频', '音频', '应用', '其它'],
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
                radius: ['30%', '80%'],
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
                data: [{
                        value: 1,
                        name: '文档',
                        itemStyle: {
                            color: "rgba(50,123,250,0.7)",
                            borderColor: "rgba(50,123,250,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: 2,
                        name: '图片',
                        itemStyle: {
                            color: "rgba(244,201,7,0.7)",
                            borderColor: "rgba(244,201,7,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: 3,
                        name: '视频',
                        itemStyle: {
                            color: "rgba(23,216,161,0.7)",
                            borderColor: "rgba(23,216,161,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: 4,
                        name: '音频',
                        itemStyle: {
                            color: "rgba(122,60,235,0.7)",
                            borderColor: "rgba(122,60,235,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: 5,
                        name: '应用',
                        itemStyle: {
                            color: "rgba(15,197,243,0.7)",
                            borderColor: "rgba(15,197,243,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: 6,
                        name: '其它',
                        itemStyle: {
                            color: "rgba(15,197,243,0.7)",
                            borderColor: "rgba(15,197,243,1)",
                            borderWidth: 3
                        }
                    }
                ]
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
        var option = lineChart();
        linechart1.setOption(option);

        var line2 = $("#line2");
        linechart2 = echarts.init(line2[0]);
        var option = lineChart();
        linechart2.setOption(option);

        var line3 = $("#line3");
        linechart3 = echarts.init(line3[0]);
        var option = lineChart();
        linechart3.setOption(option);

        var line4 = $("#line4");
        linechart4 = echarts.init(line4[0]);
        var option = lineChart();
        linechart4.setOption(option);

        var line5 = $("#line5");
        linechart5 = echarts.init(line5[0]);
        var option = lineChart();
        linechart5.setOption(option);

        var line6 = $("#line6");
        linechart6 = echarts.init(line6[0]);
        var option = lineChart();
        linechart6.setOption(option);

        var line7 = $("#line7");
        linechart7 = echarts.init(line7[0]);
        var option = lineChart();
        linechart7.setOption(option);
    }

    var userLineChart;
    function addUserActiveLine(){
        var useractiveline = $("#useractiveline");
        userLineChart = echarts.init(useractiveline[0]);
        var option = lineChart2();
        userLineChart.setOption(option);
    }

    var fileTypePieChart;
    function addFileTypePie(){
        
        var filetypepie = $("#filetypepie");
        fileTypePieChart = echarts.init(filetypepie[0]);
        var option = pieChart();
        fileTypePieChart.setOption(option);
    }
    
    getCurrentDate();
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

    var mapChart;
    function mapInit(){
        
        mapChart = echarts.init($("#mapchart")[0]);
        
        mapChart.on('click', function(params){
            console.log(params);
            
            if (!params.name){
                return;
            }
            // if (this.config.adcodepath.length == 4) return;
            var adcode = chinaCode[params.name] || "";
            if(!adcode){
                return;
            }
            mapCode = adcode;
            registerMap(adcode);
        }.bind(this));

        registerMap(mapCode);
    }

    function registerMap(code) {
        // const _url = `assets/echarts/hebei.json`;
        let _url = `/ADMINM/static/assets/geoJson/100000.json`;
        if(code != "100000"){
            if(code.substring(2,6) == "0000"){
                //省
                _url = `/ADMINM/static/assets/geoJson/100000/` + code + ".geoJson";
            }else if(code.substring(4,6) == "00"){
                //市
                let file = code.substring(0,2);
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
                echarts.registerMap(code, mapjson);

                mapOptions.geo.map = code;
                mapChart.setOption(mapOptions);
                mapChart.resize();
            }
        });
    }

    $("#mapbackbtn").bind("click",function(){
        if(mapCode != "100000"){
            mapCode = "100000";
            registerMap(mapCode);
        }
    });

    $("#usermap").bind("click",function(){
        $("#usermap").addClass("on");
        $("#devicemap").removeClass("on");
    });
    $("#devicemap").bind("click",function(){
        $("#devicemap").addClass("on");
        $("#usermap").removeClass("on");
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
    })
});
