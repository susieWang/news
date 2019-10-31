import config from "../constants/config";
import {Popup} from "../components/common/PopUp";

const getCurrentTime = function () {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
};
const getBrowser  = function() {
    var ua = navigator.userAgent.toLowerCase();
    var isWX = ua.match(/micromessenger\/([\d\.]+)/),
        isQQ = ua.match(/qq\/([\d\.]+)/);
    if (isWX) {
        return 'Wechat';
    }else if(isQQ){
        return 'QQ';
    }else {
        return "Other";
    }
};
const objectAssign  =  function(target) {
    'use strict';
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source != null) {
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
    }
    return target;
};
const changePageTitle  =  function (title) {
    if(title){
        document.title = title;
    }
};
const getEnvKey  =  function(){ //获取当前 环境 对应的key
    let envKey = "production";
    let currentHost = location.host;
    if(location.hostname == "localhost"){ //本地环境访问
        return "localhost";
    }
    let arr = currentHost.split(".");
    if(arr[0]){
        let arr2 = arr[0].split("-");
        if(arr2[1]){
            envKey = arr2[1];
        }
    }
    return envKey;
};
const formatResult   =   function (json) {
    var result = {
        respCode:null,
        respMesg:null,
        respData:{},
        attach:null
    }
    if(json){
        result.respCode = json.code == '200' ? '000' : json.code;
        result.respMesg = json.msg;
        result.respData = json.content ? json.content :"";
        if(result.respData && typeof result.respData == "string"){
            try {
                result.respData = JSON.parse(result.respData);
            }catch (e){
            }
        }
        result.attach = json.attach;
    }
    return result;
};
const numAdd  =  function(num1, num2) { //为防止精度问题，以下四个函数是js计算加减乘除
    var baseNum, baseNum1, baseNum2, number1, number2;
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    try {
        number1 = parseInt(num1.toString().replace('.',''));
        number2 = parseInt(num2.toString().replace('.',''));

        if(baseNum1 > baseNum2){
            number2 = number2 * Math.pow(10,(baseNum1 - baseNum2))
        }else if(baseNum1 < baseNum2){
            number1 = number1 * Math.pow(10,(baseNum2 - baseNum1))
        }
    } catch (e) {

    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    return (number1 + number2) / baseNum;
};
const numSub  =   function(num1, num2) { //减法
    return numAdd(num1,-num2);
};
const numMulti  =  function(num1, num2) { //乘法
    var baseNum = 0;
    try {
        baseNum += num1.toString().split(".")[1].length;
    } catch (e) {}
    try {
        baseNum += num2.toString().split(".")[1].length;
    } catch (e) {}
    return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
};
const numDiv  =  function(num1, num2) { //除法
    var baseNum1 = 0,
        baseNum2 = 0;
    var baseNum3, baseNum4;
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum3 = Number(num1.toString().replace(".", ""));
    baseNum4 = Number(num2.toString().replace(".", ""));

    return numMulti((baseNum3 / baseNum4), Math.pow(10, baseNum2 - baseNum1));
};
const supports_html5_storage = function () {
    try {
        var hasLocalstorage = 'localStorage' in window && window['localStorage'] !== null;
        if (hasLocalstorage) {
            return true;
        }
    } catch (e) {
        return false;
    }
}
const supports_html5_sessionStorage = function () {
    try {
        var hasLocalstorage = 'sessionStorage' in window && window['sessionStorage'] !== null;
        if (hasLocalstorage) {
            return true;
        }
    } catch (e) {
        return false;
    }
}
//localStorage 设置，获取，删除
const lStorage_set = function (key, value) {
    if(supports_html5_storage() && key){
        localStorage.setItem(key, JSON.stringify(value));
    }
}
const lStorage_get = function (key) {
    if(supports_html5_storage() && key){
        var result = localStorage.getItem(key);
        return result ? JSON.parse(result) : result;
    }
}
const lStorage_remove = function (key) {
    if(supports_html5_storage() && key){
        localStorage.removeItem(key);
    }
}
//sessionStorage 设置，获取，删除
const sStorage_set = function (key, value) {
    if(supports_html5_storage() && key){
        sessionStorage.setItem(key, JSON.stringify(value));
    }
}
const sStorage_get = function (key) {
    if(supports_html5_storage() && key){
        var result = sessionStorage.getItem(key);
        return result ? JSON.parse(result) : result;
    }
}
const sStorage_remove = function (key) {
    if(supports_html5_storage() && key){
        sessionStorage.removeItem(key);
    }
}
//点击控制（防重，可自定义时间间隔,默认间隔控制在1s）
const NoDoublePress = {
    pressMiddleCount: 1000,
    lastPressTime: 1,
    onClick(callback,timers,cancelBack){
        let middleTimes = timers != undefined ? parseInt(timers) : this.pressMiddleCount;
        let curTime = new Date().getTime();
        if (curTime - this.lastPressTime > middleTimes) {
            this.lastPressTime = curTime;
            if(callback)callback();
        }else{
            if(cancelBack)cancelBack();
        }
    },
}

const formatMoney = function (money) {//传入金额为整数，单位为分
    if(money == undefined) return "";
    money = money + "";
    money = money.replace(/[^\d]/g,"");

    money = parseInt(money)/100;
    money = money.toFixed(2);
    var arr = money.split(".");
    var l = arr[0].split("").reverse(), r = arr[1];
    var t = "";
    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
};
const formatIntMoney = function (money) {//传入金额为整数，单位为元
    if(money == undefined ) return "";
    money = money + "";
    money = money.replace(/[^\d]/g,"");

    var arr = money.split("").reverse();
    var t = "",len = arr.length;
    for (let i = 0; i < len; i++) {
        t += arr[i] + ((i + 1) % 3 == 0 && (i + 1) != len ? "," : "");
    }
    return t.split("").reverse().join("");
};
/*
* location.href 跳转
*
* routeName： 路由名称
* routeParams： 参数,类似 {key1:"",key2:""}
* */
const intoNextPageByHref = function (routeName, routeParams) {
    if(routeParams){
        let params = "?";
        for(let key in routeParams){
            params  = params +  key + "=" + routeParams[key] + "&";
        }
        params = params.replace(/&$/g,"");
        location.href = window.appName + routeName + params;
    }else {
        location.href = window.appName + routeName;
    }
}
/*
 obj: 当前作用域，一般是this；
 routeName： 路由名称
 routeParams： 参数,类似 {key1:"",key2:""}
* */
const intoNextPage = function (obj,routeName,routeParams) {
    if(obj && obj.context && obj.context.router && obj.context.router.push){
        obj.props.location.pathname = "";
        if(routeParams){
            let params = "?";
            for(let key in routeParams){
                params  = params +  key + "=" + routeParams[key] + "&";
            }
            params = params.replace(/&$/g,"");
            //obj.props.history.pushState(null,window.appName+routeName+params);
            obj.context.router.push(window.appName+routeName+params);
        }else {
            //obj.props.history.pushState(null,window.appName+routeName);
            obj.context.router.push(window.appName+routeName);
        }
    }
}
//获取对应参数的值
const getQueryStringByName = function(name){
    var url = location.href;
    var search0 =  url.split("?")[0];
    var result0 = search0.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));

    var search = url.split("?")[1],
        result1 = null;
    if(search){
        var arr = search.split("&");
        for(let i=0;i<arr.length;i++){
            let el = arr[i],
                elArr = el.split("="),
                key =elArr ?  elArr[0] : null,
                value= elArr ?  elArr[1] : "";
            if(elArr[0] == "return_url"){
                for(let i=2;i<elArr.length;i++){
                    value = value + "=" + elArr[i];
                }
            }
            if(key == name){
                result1 = value;
            }
        }
    }
    if(result1){
        return result1;
    }else if(result0 &&  result0.length > 1){
        return result0[1];
    } else{
        return "";
    }
}

//设置gps
const setLocation = function(obj){
    let latitude = obj && obj.latitude ?  obj.latitude.toFixed(6)+"" : "";
    let longitude = obj && obj.longitude ?  obj.longitude.toFixed(6)+"" : "";
    sStorage_set("location_latitude",latitude);
    sStorage_set("location_longitude",longitude);
}
//获取gps信息
const getLocation  = function () {
    let latitude = sStorage_get("location_latitude"),
        longitude =  sStorage_get("location_longitude");
    return {
        latitude:latitude ? latitude : "",
        longitude:longitude ? longitude : ""
    }
}
const getArrForObj = function(obj){
    let arr = [];
    for(let key in obj){
        //if(!obj.hasOwnProperty(key) ){
        if(!obj.hasOwnProperty(key) || obj[key].aliCode == ''){//aliCode==''的不展示且不支持
            continue;
        }
        let item = {};
        item = obj[key];
        arr.push(item);
    }
    return arr;
}
const  objClone = function(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0; i < obj.length;i++) {
            copy[i] = objClone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = objClone(obj[attr]);
        }
        return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
};
const Base64 = function() {

    // private property
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}
const fetchCallback = function(result){
    //fetch 通用错误处理
    if(!(result && result.respCode && result.respCode == config.token_invalid)){
        let msg  = result &&  result.respMesg ? result.respMesg : "系统异常，稍后重试";
        setTimeout(function () {
            Popup(msg);
        },0)
    }
}
const getDevInfo = function(){
    // let info = new MobileDetect(window.navigator.userAgent);
    // return info
    return "";
}

const getNetworkType = function() {
    var ua = navigator.userAgent;
    var networkStr = ua.match(/NetType\/\w+/) ? ua.match(/NetType\/\w+/)[0] : 'NetType/other';
    networkStr = networkStr.toLowerCase().replace('nettype/', '');
    var networkType;
    switch(networkStr) {
        case 'wifi':
            networkType = 'wifi';
            break;
        case '4g':
            networkType = '4g';
            break;
        case '3g':
            networkType = '3g';
            break;
        case '3gnet':
            networkType = '3g';
            break;
        case '2g':
            networkType = '2g';
            break;
        default:
            networkType = 'other';
    }
    return networkStr
}

const handelMaiDian = function (eventId, paramsObj) {
    if(Agent && Agent.customizeEvent){
        var data = paramsObj || {};
        var hashMap = new HashMap();
        for (var key in data) {
            hashMap.put(key, data[key]);
        }
        Agent.customizeEvent(eventId, hashMap);
    }
}


module.exports = {
    getCurrentTime,
    getBrowser,
    objectAssign,
    changePageTitle,
    getEnvKey,
    formatResult,
    numAdd,
    numSub,
    numMulti,
    numDiv,
    supports_html5_storage,
    supports_html5_sessionStorage,
    lStorage_set,
    lStorage_get,
    lStorage_remove,
    sStorage_set,
    sStorage_get,
    sStorage_remove,
    formatMoney,
    formatIntMoney,
    intoNextPage,
    getQueryStringByName,
    setLocation,
    getLocation,
    intoNextPageByHref,
    getArrForObj,
    objClone,
    Base64,
    fetchCallback,
    getDevInfo,
    getNetworkType,
    handelMaiDian
}