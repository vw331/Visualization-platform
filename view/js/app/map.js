(function(){


    var geoCoordMap , targetData , series ,

        mapApi = '../server/hangzhou.json',

        geoCoordMapApi = '../server/geoCoordMap.json',

        realTimeDataApi = '../server/test.json',

        beijinBusLineApi = '../server/lines-bus.json',

        hangzhouTracksApi = '../server/hangzhou-tracks.json',

        mapChart = echarts.init(document.getElementById('map')),

        convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        }

    mapChart.showLoading()

    //基本配置
    var option = {
        backgroundColor: "transparent",
        title : {
            show : true,
            text : '杭州地区24小时降雨预警',
            top : 120,
            left : 40,
            zlevel : 10,
            textStyle: {
                fontSize : 24,
                fontWeight : 'normal',
                color: '#fff'
            }
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            top : 240,
            left : 40,
            zlevel : 10,
            itemWidth : 18,
            itemGap : 16,
            itemHeight : 30,
            data : [
                { name : '极端天气' , icon : 'rect' },
                { name : '降雪' , icon : 'rect' },
                { name : '降雨' , icon : 'rect' },
                { name : '冰雹' , icon : 'rect' }
            ],
            textStyle : {
                fontSize : 20,
                color : '#ffffff'
            }
        },
        tooltip : {
            trigger: 'item',
            backgroundColor : '#00205a ',
            padding : 10,
            border : '#2b7ef4',
            formatter : '{b0}: {c0}<br />{a1}: {b1}'
        },
        bmap: {
            center: [120.24, 30.26],  //杭州
            //center: [116.46, 40.92],  //北京
            zoom: 12,
            roam: true,
            mapStyle: {
                'styleJson': [
                    {
                        'featureType': 'water',
                        'elementType': 'all',
                        'stylers': {
                            'color': '#031628'
                        }
                    },
                    {
                        'featureType': 'land',
                        'elementType': 'geometry',
                        'stylers': {
                            'color': '#000102'
                        }
                    },
                    {
                        'featureType': 'highway',
                        'elementType': 'all',
                        'stylers': {
                            'color': '#21dfff',
                            //'visibility': 'off'
                        }
                    },
                    {
                        'featureType': 'arterial',
                        'elementType': 'geometry.fill',
                        'stylers': {
                            'color': '#000000'
                        }
                    },
                    {
                        'featureType': 'arterial',
                        'elementType': 'geometry.stroke',
                        'stylers': {
                            'color': '#0b3d51'
                        }
                    },
                    {
                        'featureType': 'local',
                        'elementType': 'geometry',
                        'stylers': {
                            'color': '#000000'
                        }
                    },
                    {
                        'featureType': 'railway',
                        'elementType': 'geometry.fill',
                        'stylers': {
                            'color': '#000000'
                        }
                    },
                    {
                        'featureType': 'railway',
                        'elementType': 'geometry.stroke',
                        'stylers': {
                            'color': '#08304b'
                        }
                    },
                    {
                        'featureType': 'subway',
                        'elementType': 'geometry',
                        'stylers': {
                            'lightness': -70
                        }
                    },
                    {
                        'featureType': 'building',
                        'elementType': 'geometry.fill',
                        'stylers': {
                            'color': '#000000'
                        }
                    },
                    {
                        'featureType': 'all',
                        'elementType': 'labels.text.fill',
                        'stylers': {
                            'color': '#857f7f'
                        }
                    },
                    {
                        'featureType': 'all',
                        'elementType': 'labels.text.stroke',
                        'stylers': {
                            'color': '#000000'
                        }
                    },
                    {
                    w    'featureType': 'building',
                        'elementType': 'geometry',
                        'stylers': {
                            'color': '#022338'
                        }
                    },
                    {
                        'featureType': 'green',
                        'elementType': 'geometry',
                        'stylers': {
                            'color': '#062032'
                        }
                    },
                    {
                        'featureType': 'boundary',
                        'elementType': 'all',
                        'stylers': {
                            'color': '#465b6c'
                        }
                    },
                    {
                        'featureType': 'manmade',
                        'elementType': 'all',
                        'stylers': {
                            'color': '#022338'
                        }
                    },
                    {
                        'featureType': 'label',
                        'elementType': 'all',
                        'stylers': {
                            'visibility': 'off'
                        }
                    }
                ]
            }
        }

    }

    function updateSeries(data){

        option.series = [{
            name : '降雨',
            type : 'scatter',
            coordinateSystem : 'bmap',
            zlevel : 100,
            data : data.filter(function(value){
                if( value.value[2] < 200 ) return value
            }),
            symbolSize: function (val) {
                return val[2] / 10;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#6bff48'
                }
            }
        },
            {
                name: '极端天气',
                zlevel : 99,
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data:  data.filter( function(value){
                    if( value.value[2] >= 200 ) return value
                }),
                symbolSize: function (val) {
                    return val[2] / 10;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#fb4735',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                }
            }
        ]

        mapChart.setOption(option)
        mapChart.hideLoading()

    }


    var ws2 = new WebSocket('ws:localhost:8182')

    ws2.onopen = function(){
        console.log('Connection2 to server opened')
    }

    ws2.onmessage = function(e){

        console.log( JSON.parse(e.data)  )
        updateSeries(JSON.parse(e.data) )
    }

})()