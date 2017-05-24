(function(){



   var option = {
        title : {
            text : '数据排行',
            top : 10,
            left : 10,
            textStyle : {
                fontSize : 20,
                fontWeight : 'normal',
                color : '#00daff'
            }
        },
        legend : {
            right : 10,
            top : 20,
            selectedMode : 'single',
            data : [
                { name : '入境'},
                { name : '出境'}
            ],
            textStyle : {
                color : '#ffffff'
            }
        },
        color: ['#3b91ff','#0750ae'],
        tooltip : {
            trigger: 'axis',
            backgroundColor : '#00205a ',
            padding : 10,
            border : '#2b7ef4',
            axisPointer : {
                type : 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        yAxis : [
            {
                type : 'category',
                data : ['星期日', '星期六', '星期五', '星期四', '星期三', '星期二', '星期一'],
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel : {
                    textStyle : {
                        color : '#ffffff'
                    }
                },
                axisLine : {
                    lineStyle : {
                        color : '#135fdf',
                        type : 'solid'
                    }
                },
                splitLine : {
                    show : true,
                    lineStyle : {
                        color : '#083d96',
                    }
                }
            }
        ],
        xAxis : [
            {
                type : 'value',
                axisLabel: {
                    inside: false,
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                axisTick: {
                    show: true
                },
                axisLine: {
                    show: true,
                    lineStyle : {
                        color : '#083d96',
                        type : 'solid'
                    }
                },
                splitLine : {
                    show : true,
                    lineStyle : {
                        color : '#083d96',
                    }
                }
            }
        ],
        series : [
            {
                name:'入境',
                type:'bar',
                barWidth: '40%',
                data : [54,180,200,220,{
                        value:'334',
                        itemStyle : {
                            normal : {
                                color : '#0fd874'
                            }
                        }
                    },
                    {
                        value:'334',
                        itemStyle : {
                            normal : {
                                color : '#f8e221'
                            }
                        }
                    },
                    {
                    value:'390',
                    itemStyle : {
                        normal : {
                                color : '#fc403a'
                            }
                        }
                    }
                ]
            },
            {
                name:'出境',
                type:'bar',
                barWidth: '40%',
                data : [33,45,97,180,290,355,454]
            }
        ]
    };



// 初始化echarts实例
    var myChart = echarts.init(document.getElementById('histogram'))

    myChart.setOption(option);


})()