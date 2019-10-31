import fetchJsonp from "fetch-jsonp";
import util from "./util";
import * as fetchAlias from './fetch';
import {Popup,Loading,globalDialog} from  "../components/common/PopUp";
import API from '../constants/config';

const postInitParams = {
    method: 'POST',
    mode:"cors",
    headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body:"",
    credentials: 'include',
    cache: 'default'

};

const commonParamsV = {
    requestTime:util.getCurrentTime()
};
var $ = {
    getJSON: function(url, params, callbackFuncName, callback){
        var paramsUrl ="",
            jsonp = this.getQueryString(url)[callbackFuncName];
        for(var key in params){
            paramsUrl+="&"+key+"="+encodeURIComponent(params[key]);
        }
        url+=paramsUrl;
        window[jsonp] = function(data) {
            window[jsonp] = undefined;
            try {
                delete window[jsonp];
            } catch(e) {}
            if (head) {
                head.removeChild(script);
            }
            callback(data);
        };
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.charset = "UTF-8";
        script.src = url;
        head.appendChild(script);
        return true;
    },
    getQueryString: function(url) {
        var result = {}, queryString = (url && url.indexOf("?")!=-1 && url.split("?")[1]) || location.search.substring(1),
            re = /([^&=]+)=([^&]*)/g, m;
        while (m = re.exec(queryString)) {
            result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        return result;
    }
};

function getIP(callback) {
    let recode = {};
    let RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    // 如果不存在则使用一个iframe绕过
    if (!RTCPeerConnection) {
        // 因为这里用到了iframe，所以在调用这个方法的script上必须有一个iframe标签
        // <iframe id="iframe" sandbox="allow-same-origin" style="display:none;"></iframe>
        let win = iframe.contentWindow;
        RTCPeerConnection = win.RTCPeerConnection || win.mozRTCPeerConnection || win.webkitRTCPeerConnection;
    }
    //创建实例，生成连接
    let pc = new RTCPeerConnection();
    // 匹配字符串中符合ip地址的字段
    function handleCandidate(candidate) {
        let ip_regexp = /([0-9]{1,3}(\.[0-9]{1,3}){3}|([a-f0-9]{1,4}((:[a-f0-9]{1,4}){7}|:+[a-f0-9]{1,4}){6}))/;
        let ip_isMatch = candidate.match(ip_regexp)[1];
        if (!recode[ip_isMatch]) {
            callback(ip_isMatch);
            recode[ip_isMatch] = true;
        }
    }
    //监听icecandidate事件
    pc.onicecandidate = (ice) => {
        if (ice.candidate) {
            handleCandidate(ice.candidate.candidate);
        }
    };
    //建立一个伪数据的通道
    pc.createDataChannel('');
    pc.createOffer((res) => {
        pc.setLocalDescription(res);
    }, () => {});
    //延迟，让一切都能完成
    setTimeout(() => {
        let lines = pc.localDescription.sdp.split('\n');
        lines.forEach(item => {
            if (item.indexOf('a=candidate:') === 0) {
                handleCandidate(item);
            }
        })
    }, 1000);
}
export default {
    fetchFun(url,params,hideLoading){
        if(!hideLoading)Loading("open");
        var initParams = postInitParams;
        var p0 = new Promise(function(resolve,reject){
            if(API.outerIP){
                resolve(API.outerIP);
            }else{
                $.getJSON("https://api.ipify.org/?format=jsonp&v="+Math.random()+"&callback=test", null, "callback", function(data){
                    API.outerIP = data.ip;
                    resolve(data.ip);
                });
            }
        });
        var p1 =  new Promise(function(resolve, reject) {
            if(API.deviceId){
                resolve(API.deviceId);    
            }else{
                Fingerprint2.get({}, function (components) {
                    var values = components.map(function (component) { return component.value })
                    var murmur = Fingerprint2.x64hash128(values.join(''), 31)
                    API.deviceId = murmur;
                    resolve(murmur);
                })
            }
        });
        var p2 = new Promise(function(resolve,reject){
            //内网ip
            if(API.innerIP){
                resolve(API.innerIP);
            }else{
                getIP( function (ip) {
                    API.innerIP = ip;
                    resolve(ip);
                })               
            }
        });

        return Promise.all([p1,p2,p0]).then(values => {
            //根据项目不同，设置不同
            var commonParams = {};            
            let objJson = util.objClone(values[0]);
            objJson.push({
                key:'outerIP',
                value: values[2]//通过接口获取的到ip
            });
            objJson.push({
                key:'innerIP',
                value:values[1]
            })
            let objJsonS = objJson.map(function (component) { return component.value});
            let murmur = Fingerprint2.x64hash128(objJsonS.join(""),31); //生成指纹信息
            commonParams.deviceId = murmur;

            var otherParams = params ? params : {};
            otherParams = util.objectAssign(commonParams,otherParams);
            var requestData = "";
            for(let key in otherParams){
                var value = otherParams[key]?otherParams[key]:"";
                requestData += '&' + key + '=' + value;
            }
            requestData = requestData.slice(1);
            initParams = util.objectAssign(initParams,{
                body:requestData
            })
            return fetch(url,initParams).then(function(response) {
                return response.json();
            }).then(function (data) {
                var result = util.formatResult(data);
                Loading();
                return new Promise(function (resolve) {
                    resolve(result);
                });
            }).catch(function (e) {
                Loading();
                Popup("系统异常，请稍后重试");
            });
        });
    },
    fetchGetFun(url,params,notFormatResult){
        var self = this;        
        var p0 = new Promise(function(resolve,reject){//外网ip
            if(API.outerIP){
                resolve(API.outerIP);
            }else{
                $.getJSON("https://api.ipify.org/?format=jsonp&v="+Math.random()+"&callback=fnOne", null, "callback", function(data){
                    API.outerIP = data.ip;
                    resolve(data.ip);
                });
            }
        });
        var p1 =  new Promise(function(resolve, reject) {
            if(API.deviceInfos){
                resolve(API.deviceInfos);    
            }else{
                Fingerprint2.get({}, function (components) {
                    API.deviceInfos = components;
                    // var values = components.map(function (component) { return component.value })
                    // var murmur = Fingerprint2.x64hash128(values.join(''), 31)
                    resolve(components);
                })
            }
        });
        var p2 = new Promise(function(resolve,reject){
            //内网ip
            if(API.innerIP){
                resolve(API.innerIP);
            }else{
                getIP( function (ip) {
                    API.innerIP = ip;
                    resolve(ip);
                })               
            }
        });
        return Promise.all([p1,p2,p0]).then(values => {
            var initParams={
                method: 'GET',
                mode:"cors",
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body:"",
                cache: 'default'
            };
            // credentials: 'include',
            var commonParams = {};
            
            let objJson = util.objClone(values[0]);
            objJson.push({
                key:'outerIP',
                value: values[2]//通过接口获取的到ip
            });
            objJson.push({
                key:'innerIP',
                value:values[1]
            })
            let objJsonS = objJson.map(function (component) { return component.value});
            let murmur = Fingerprint2.x64hash128(objJsonS.join(""),31); //生成指纹信息
            commonParams.deviceId = murmur;
            
            var otherParams = params ? params : {};
            otherParams = util.objectAssign(commonParams,otherParams);
            var requestData = "";
            for(let key in otherParams){
                var value = otherParams[key]?otherParams[key]:"";
                requestData += '&' + key + '=' + value;
            }
            requestData = requestData.slice(1);
            url = url + "?"+requestData;

            return fetch(url,initParams).then(function(response) {
                return response.json();
            }).then(function (data){
                var result = null;
                if(notFormatResult){
                    result = data;
                }else{
                    result = util.formatResult(data);
                }
                return new Promise(function (resolve) {
                    resolve(result);
                });
            });
        });

    },
    simpleReq(url,successCallback){
        var initParams = {
            jsonpCallbackFunction: 'getIP'
        };
        return fetchJsonp(url,initParams).then(function(response) {
            return response.json();
        }).then(function(data) {
            //成功的回调
            successCallback(data)
        }).catch(function(e) {
            //失败
            console.log('error');
        });
    },
    handelMaidian(params){ //埋点处理
        var p0 = new Promise(function(resolve,reject){//外网ip
            if(API.outerIP){
                resolve(API.outerIP);
            }else{
                $.getJSON("https://api.ipify.org/?format=jsonp&v="+Math.random()+"&callback=fnTwo", null, "callback", function(data){
                    API.outerIP = data.ip;
                    resolve(data.ip);
                });
            }
        });
        var p1 =  new Promise(function(resolve, reject) {
            if(API.deviceInfos){
                resolve(API.deviceInfos);    
            }else{
                Fingerprint2.get({}, function (components) {
                    API.deviceInfos = components;
                    resolve(components);
                })
            }
        });
        var p2 = new Promise(function(resolve,reject){
            //内网ip
            if(API.innerIP){
                resolve(API.innerIP);
            }else{
                getIP( function (ip) {
                    API.innerIP = ip;
                    resolve(ip);
                })               
            }
        });

        return Promise.all([p1,p2,p0]).then(values => {
            var initParams={
                method: 'post',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body:""
            };
            //common: uid url createTime
            //other: eventId eventName newsId
            var commonParams = {
                createTime : new Date().getTime(),
                url:location.href
            };
            let objJson = util.objClone(values[0]);
            objJson.push({
                key:'outerIP',
                value: values[2]//通过接口获取的到ip
            });
            objJson.push({
                key:'innerIP',
                value:values[1]
            })
            let objJsonS = objJson.map(function (component) { return component.value});
            let murmur = Fingerprint2.x64hash128(objJsonS.join(""),31); //生成指纹信息
            commonParams.uId = murmur;
            
            var otherParams = params ? params : {};
            otherParams = util.objectAssign(commonParams,otherParams);
            initParams = util.objectAssign(initParams,{
                body:JSON.stringify(otherParams)
            })
            return fetch(API.api.maidianUrl,initParams).then(function(response) {
                return response.json();
            }).then(function (data){});
        });
    }
}
