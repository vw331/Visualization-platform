

const WebSocketServer = require('ws').Server
const fs = require('fs')
const wss = new WebSocketServer({ port: 8181 })
const wss2 = new WebSocketServer({ port : 8182 })


function RndNum(n){
    var rnd="";
    for(var i=0;i<n;i++)
        rnd+=Math.floor(Math.random()*10);
    return rnd;
}


let [ name , sex , phone ,address ,tag ] = [
        ['刘丽','王梁','张磊','陈洪方','赵子龙','小唐唐','施恩慧','李四','小乔','赵雷'],
        ['男','女','男','女','男','女','男','女','男','女','男','女'],
        ['男','女','男','女','男','女','男','女','男','女','男','女'],
        ['13872471754','157894897','1248794897','132487948','12485984897','12487984987','1357894897','1879848974','2418978944','2185789'],
        ['浙江杭州','浙江温州','江西南昌','北京朝阳区','上海松江区','海南三亚','美国旧金山','湖北武汉','齐齐哈尔','新疆哈密'],
        ['程序员','架构师','设计师','销售','前台','行政','财务','客服','售后']
    ]

let [ no1 , no2 , no3 , no4 , no5 , no6 ] = [ 81879 , 74874 , 1257, 34897 , 1248 , 18789 ]



function stockUpdates(ws){

    if( ws.readyState == 1 )
    {

        let stocksObj =[{
                no1 : no1 + RndNum(3),
                no2 : no2 + RndNum(3),
                no3 : no3 + RndNum(3),
                no4 : no4 + RndNum(3),
                no5 : no5 + RndNum(3),
                no5 : no5 + RndNum(3),
                no6 : no6 + RndNum(3),
            },
            {
                name : name[ RndNum(1) ],
                sex : sex[ RndNum(1) ],
                phone : phone[ RndNum(1) ],
                address : address[ RndNum(1) ],
                id : '1879848977',
                tag : tag[ RndNum(1) ]
        }]

        ws.send( JSON.stringify(stocksObj) )
    }

}

wss.on('connection',(ws)=>{


    setInterval(function(){

        stockUpdates(ws)

    },1800)


})


function updateMapData(ws){

    fs.readFile('./test.json','utf-8',function(err,data){

        if( err ) throw err
        var data = JSON.parse(data)

        ws.send( JSON.stringify(data) )

    })

}


wss2.on('connection',(ws)=>{


    setInterval(function(){

        updateMapData( ws )

    },1800)


})