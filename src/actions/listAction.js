import APIS from '../constants/config';
import * as Type from '../constants/actionType';
import request from '../utils/myAjax';
import util from '../utils/util';

function setNewsData(data){
    return{
        type: Type.GET_NEWS_LIST,
        data: data
    }
}
export function getNewsList(params,callback) {
    return (dispatch, getState) => {
        // request.fetchFun(APIS.api.getNewsList, params).then(function (result) {
        //     if (result && result.respCode && result.respCode == '000') {
        //         return dispatch(setNewsData(result.respData));
        //     } else {
        //         util.fetchCallback(result);
        //     }
        // });
        request.fetchGetFun(APIS.api.getNewsList,params).then(function(result){
            if (result && result.respCode && result.respCode == '000') {
                let data = {
                    offset : params.offset,
                    list : result.respData
                }
                if(callback) callback(data);
                return dispatch(setNewsData(data));
            } else {
                if(callback) callback();
                util.fetchCallback(result);
            }
        });
    }
}
function setNewsDetail(data){
    return {
        type:Type.GET_NEWS_DETAIL,
        data:data
    }
}
export function getNewDetail(params){
    return (dispatch, getState) => {
        // request.fetchFun(APIS.api.getNewDetail, params).then(function (result) {
        //     if (result && result.respCode && result.respCode == '000') {
        //         return dispatch(setNewsDetail(result.respData));
        //     } else {
        //         util.fetchCallback(result);
        //     }
        // });
        request.fetchGetFun(APIS.api.getNewDetail,params).then(function(result){
            if (result && result.respCode && result.respCode == '000') {
                return dispatch(setNewsDetail(result.respData));
            } else {
                util.fetchCallback(result);
            }
        });
    }
}

export function setMaidian(params,callback){
    return (dispatch, getState) => {
        let comParams = {
            timer: new Date().getTime(),
            pageUrl : location.href
        }
        let paramsV = Object.assign(comParams,params);
        request.fetchGetFun(APIS.api.maidianUrl,paramsV).then(function(result){
            if (result && result.respCode && result.respCode == '000') {
                if(callback)callback()
            } 
        });
    }
}

