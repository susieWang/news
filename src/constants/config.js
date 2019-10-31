'use strict';
//TODO 请求待替换
//const apiUrl =  "http://172.16.12.142:3000";
const apiUrl = "http://172.16.9.35:16104";

//getNewsList : apiUrl + '/newslist',
//getNewDetail : apiUrl + "/newsDetail"
module.exports = {
    api:{
        getNewsList : apiUrl + '/v1/news/list',
        getNewDetail : apiUrl + "/v1/news/details",
        maidianUrl : apiUrl + "/v1/event/add" 
    },
    token_invalid:'',
    appKey:'',
    slotId:'',
    outerIP:"",
    innerIP:"",
    deviceInfos:null,
    deviceId:"",
    newsTypes:[{
        "title":"综合",
        "type":"11111"
    },{
        "title":"推荐",
        "type":"BA8J7DG9wangning"
    },{
        "title":"军事",
        "type":"BAI67OGGwangning"
    },{
        "title":"国内",
        "type":"BD29LPUBwangning"
    },{
        "title":"国际",
        "type":"BD29MJTVwangning"
    },{
        "title":"历史",
        "type":"C275ML7Gwangning"
    },{
        "title":"娱乐",
        "type":"BA10TA81wangning"
    },{
        "title":"电视",
        "type":"BD2A86BEwangning"
    },{
        "title":"电影",
        "type":"BD2A9LEIwangning"
    },{
        "title":"明星",
        "type":"BD2AB5L9wangning"
    },{
        "title":"音乐",
        "type":"BD2AC4LMwangning"
    },{
        "title":"影视歌",
        "type":"C2769L6Ewangning"
    },{
        "title":"独家",
        "type":"BAI5E21Owangning"
    },{
        "title":"轻松一刻",
        "type":"BD21K0DLwangning"
    },{
        "title":"旅游",
        "type":"BEO4GINLwangning"
    },{
        "title":"汽车",
        "type":"BA8DOPCSwangning"
    },{
        "title":"科技",
        "type":"BA8D4A3Rwangning"
    },{
        "title":"科学",
        "type":"D90S2KJMwangning"
    },{
        "title":"手机",
        "type":"BAI6I0O5wangning"
    },{
        "title":"数码",
        "type":"BAI6JOD9wangning"
    },{
        "title":"明星",
        "type":"BD2AB5L9wangning"
    },{
        "title":"政务",
        "type":"BA8J7DG9wangning"
    },{
        "title":"财经",
        "type":"BA8EE5GMwangning"
    },{
        "title":"体育",
        "type":"BA8E6OEOwangning"
    },{
        "title":"商业",
        "type":"BD2C24VCwangning"
    },{
        "title":"时尚",
        "type":"BA8F6ICNwangning"
    },{
        "title":"教育",
        "type":"BA8FF5PRwangning"
    },{
        "title":"游戏",
        "type":"BAI6RHDKwangning"
    },{
        "title":"亲子",
        "type":"BEO4PONRwangning"
    },{
        "title":"健康",
        "type":"BDC4QSV3wangning"
    },{
        "title":"校园",
        "type":"BA8J7DG9wangning"
    }]
};