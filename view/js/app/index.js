
var listData = []


var listColumn = [
    { name : '姓名' , width : '100px' , dataIndex : 'name' },
    { name : '证件' , flex : 1 , dataIndex : 'id' },
    { name : '性别' , width : '80px' , dataIndex : 'sex' },
    { name : '手机号码' , flex : 1 , dataIndex : 'phone' },
    { name : '籍贯' , flex : 1 , dataIndex : 'address' },
    { name : '职业' , width : '120px' , dataIndex : 'tag' },
]

var allProvince = ['广东省','山东省','江苏省','河南省','上海市','河北省','浙江省','香港特别行政区','陕西省','湖南省','重庆市 ','福建省','天津市','云南省','四川省 ','广西壮族自治区','安徽省','海南省 ','江西省','湖北省','山西省','辽宁省','台湾省','黑龙江','内蒙古自治区','澳门特别行政区','贵州省','甘肃省','青海省','新疆维吾尔自治区','西藏区','吉林省','宁夏回族自治区']


var app;

Vue.component('modal', {
    template: '#modal-template'
})

Vue.component('drop-item-component',{
    template : '<li><span v-bind:class="{active:selected}" v-on:click.stop="toggle">{{ text }}</span></li>',
    props : ['text'],
    data : function(){
        return {
            selected : false
        }
    },
    methods : {
        toggle : function(){
            var self = this
            this.selected = !this.selected
            if( this.selected )
            {
                app.mapSource.push( this.text )
            }
            else
            {
                app.mapSource.filter( (item,index)=>{
                    if( item === self.text )
                    {
                        app.mapSource.splice( index , 1 )
                    }
                } )
            }
        }
    }
})


Vue.component('list-component',{
    template : '#list-template',
    props : ['title','type'],
    data : function(){
        var type = this.type
        return { lists : tmpData[type] , count : 0 }
    },
    created : function(){

    },
    methods : {
        dialog : function(data){

            app.showModal = true

        }
    }
})

Vue.component('scroll-list-component',{
        template : '#scroll-list-template',
        data : function(){
            return { 
                columns : listColumn,
                totalData : listData 
            }
        },
        computed : {
            reversedMessage : function(){
                var result = [];

                if( this.totalData.length >= 10 )  
                {
                    result = this.totalData.slice(-10) //最多显示10条数据
                }
                else
                {
                    result = this.totalData
                }

                return result
            }
        },
        mounted : function(){
            $('.scroll-body').perfectScrollbar();
        },
        methods : {
            dialog : function(data){
                app.showModal = true
            }
        }
    })


app = new Vue({
    el : '#app',
    data : {
        showModal: false,
        totalAll : {},
        allProvince : allProvince,
        selectDisplay : false,
        mapSource : [],
        sourceText : '全部来源',
        eventOff : false
    },
    watch : {
        mapSource : function(){

            if( this.mapSource.length == 0 )
            {
                this.sourceText = '全部来源'
            }
            else if( this.mapSource.length <= 6 )
            {
                this.sourceText = this.mapSource.join(',')
            }
            else
            {

                var a = this.sourceText.charAt( this.sourceText.length-1  )

                console.log(a,a=='…')

                if( this.sourceText.charAt( this.sourceText.length-1  ) === '…' ){
                    return
                }
                this.sourceText += '…'
            }

        },
        selectDisplay : function(){
            this.eventOff = !this.eventOff
        }
    },
    computed : {
        total : function(){
            var  tpm = this.totalAll

            function NotoString(num){
                var str = String(num)

                if( str.length > 6 )
                {
                str = str.substring(0,str.length-6) + ','+str.substring(str.length-6,str.length)
                }

                str = str.substring(0,str.length-3) + ','+str.substring(str.length-3,str.length)

                return str
            }

            for( let key in tpm )
            {
                tpm[key] = NotoString(tpm[key])
            }

            return this.totalAll
        }
    }
})



var ws = new WebSocket('ws:localhost:8181')

ws.onopen = function(){
    console.log('Connection to server opened');
}

ws.onmessage = function(e){

    var stocksData = JSON.parse(e.data)

    listData.push( stocksData[1] )
    app.totalAll = stocksData[0]

}



