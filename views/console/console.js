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
    var mapCode = {
        adcode:"100000"
    };
    var mapOptions = {
        title:{
            text:"中国",
            show:true,
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
            backgroundColor: '#11183c',
            grid: {
                left: '5%',
                right: '2%',
                top: '10%',
                bottom: '15%',
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
                data: ['C1', 'C2', 'C3', 'D1', 'D2', 'D3'],
                itemWidth: 20,
                itemHeight: 10,
                textStyle: {
                    fontSize: 14,
                    color: '#65aaf1',
                },
                right: '35%', //距离右侧
                top: "5%"
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
                    name: 'C1',
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
                    name: 'C2',
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
                    name: 'C3',
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
                    name: 'D1',
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
                },
                {
                    name: 'D2',
                    type: 'line',
                    stack: '总量',
                    symbol: 'circle',
                    symbolSize: 8,
                    showSymbol: false,
                    itemStyle: {
                        normal: {
                            color: '#6FE81A',
                            lineStyle: {
                                color: "#6FE81A",
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
                    data: dataD2
                },
                {
                    name: 'D3',
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
                                    color: 'rgba(0,212,199,0.9)'
                                }]),
                            }
                        }
                    },
                    data: dataD3
                }
            ]
        };
        return option;
    }

    function pieChart(){
        var option = {
            backgroundColor: "#0f375f",
            legend: {
                orient: 'vertical',
                top: "center",
                right: "5%",
                data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7'],
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
                        name: 'rose1',
                        itemStyle: {
                            color: "rgba(50,123,250,0.7)",
                            borderColor: "rgba(50,123,250,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: 2,
                        name: 'rose2',
                        itemStyle: {
                            color: "rgba(244,201,7,0.7)",
                            borderColor: "rgba(244,201,7,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: 3,
                        name: 'rose3',
                        itemStyle: {
                            color: "rgba(23,216,161,0.7)",
                            borderColor: "rgba(23,216,161,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: 4,
                        name: 'rose4',
                        itemStyle: {
                            color: "rgba(122,60,235,0.7)",
                            borderColor: "rgba(122,60,235,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: 5,
                        name: 'rose5',
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


    function addLineChart(){
        var line1 = $("#line1");
        var linechart1 = echarts.init(line1[0]);
        var option = lineChart();
        linechart1.setOption(option);

        var line2 = $("#line2");
        var linechart2 = echarts.init(line2[0]);
        var option = lineChart();
        linechart2.setOption(option);

        var line3 = $("#line3");
        var linechart3 = echarts.init(line3[0]);
        var option = lineChart();
        linechart3.setOption(option);

        var line4 = $("#line4");
        var linechart4 = echarts.init(line4[0]);
        var option = lineChart();
        linechart4.setOption(option);

        var line5 = $("#line5");
        var linechart5 = echarts.init(line5[0]);
        var option = lineChart();
        linechart5.setOption(option);

        var line6 = $("#line6");
        var linechart6 = echarts.init(line6[0]);
        var option = lineChart();
        linechart6.setOption(option);

        var line7 = $("#line7");
        var linechart7 = echarts.init(line7[0]);
        var option = lineChart();
        linechart7.setOption(option);
    }

    function addUserActiveLine(){
        var useractiveline = $("#useractiveline");
        var chart = echarts.init(useractiveline[0]);
        var option = lineChart2();
        chart.setOption(option);
    }

    function addFileTypePie(){
        
        var filetypepie = $("#filetypepie");
        var chart = echarts.init(filetypepie[0]);
        var option = pieChart();
        chart.setOption(option);
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



    
    var mapChart;
    function mapInit(){
        
        mapChart = echarts.init($("#mapchart")[0]);
        
        mapChart.on('click', function(params){
            console.log(params);
            
            if (!params.name) return;
            if (this.config.adcodepath.length == 4) return;

            let name = params.name;
           
            let cd = this.getCityCode(name,false);
            //cd 可能是 省,市,区
            if(cd.length > 0){
                this.config.city_code = cd[0].citycode;
                this.config.county_code = cd[0].countycode || -1;

                let adcode = cd[0].adcode || "";
                if(adcode){
                    // this.options.title.text = name;

                    this.config.adcode = adcode;
                    this.config.adcodepath.push(adcode);

                    this.config.title = name;
                    this.options.title.text = name;
                    this.config.adnamepath.push(name);
                    
                    this.loadData();

                    this.previewEffectService.clickMapDownSub(this.config);
                }
            }else{
                this.config.city_code = -1;
                this.config.county_code = -1;
                this.previewEffectService.clickMapDownSub(this.config);
            }
        }.bind(this));


        registerMap(mapCode.adcode,mapCode.adcode)
        
        // .subscribe(t => {
            // this.setSeries(this.respData,this.config.adcode);
            
            // this.options.geo.map = this.config.adcode;
            // this.chart.setOption(this.options);
            // this.chart.resize();

            // this.setHotPoint([]);
        // });
    }

    function registerMap(code,name) {
        // const _url = `assets/echarts/hebei.json`;
        let _url = `/assets/geoJson/100000.json`;
        if(code != "100000"){
            if(code.substring(2,6) == "0000"){
                //省
                _url = `/assets/geoJson/100000/` + code + ".geoJson";
            }else if(code.substring(4,6) == "00"){
                //市
                let file = code.substring(0,2);
                _url = `/assets/geoJson/100000/` + file + "0000/" + code + ".geoJson";
            }else{
                //县
                let file1 = code.substring(0,2);
                let file2 = code.substring(0,4);
                _url = `/assets/geoJson/100000/` + file1 + "0000/" + file2 +"00/" + code + ".geoJson";
            }
        }
        
        $.Ajax({
            async: false,
            url: _url,
            dataType: "json",
            method: 'get',
            success: function(mapjson) {
                echarts.registerMap(name, mapjson);
                mapChart.setOption(mapOptions);
                mapChart.resize();
            }
        });

        // this.setSeries(this.respData,this.config.adcode);
                
        //         this.options.geo.map = this.config.adcode;
        //         this.chart.setOption(this.options);
        //         this.chart.resize();

        //         this.setHotPoint([]);
    }

});
