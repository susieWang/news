import * as Type from '../constants/actionType';

let initState = {
    //advertData:[]
    newsList:[],
    newsDetail:{}
};

export default function baseInfo (state=initState, action) {
    var respData = action.data ? action.data : {};
    switch (action.type) {
        case Type.GET_NEWS_LIST:
            // state.jxwList.concat(respData.list)
            if(respData.offset == "0"){
                state.newsList = [];
            }
            return Object.assign({},state,{
                newsList : respData && respData.list ? state.newsList.concat(respData.list) : state.newsList,
            });
        case Type.GET_NEWS_DETAIL:
            return Object.assign({},state,{
                newsDetail : respData  ? respData : initState.newsDetail,
            });
        default:
            return state
    }
}
