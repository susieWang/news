import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DragLoad from "../components/common/DragLoad";
import BasePage from "../components/common/BasePage";
import Item from "../components/list/newsItem";
import SearchItem from "../components/list/SearchItem";
import util from "../utils/util";
import * as listAction from '../actions/listAction';
import Config from '../constants/config';
import myAjax from '../utils/myAjax';
class List extends Component{
    static defaultProps = {
        title:''
    };

    constructor(props){
        super(props);
        this.state={
            title:'新闻',
            tabs:[],
            activeTabIndex:1,
            scrollPositionH : window.innerHeight,
            topHeight:0,
            navHeight:0
        }
        this.loadding = false;
        this.tabs = [];
        this.searchV = "";
    }

    componentWillMount(){
        //util.handelMaiDian('tuia_home');
        myAjax.handelMaidian({
            eventId:"into_list_page",
            eventName:"进入列表页面"
        });
    }
    componentWillUnmount(){
        myAjax.handelMaidian({
            eventId:"leave_list_page",
            eventName:"离开列表页面"
        });
    }
    getListData = (type,offset,callback,searchV) => {
        if(!this.loadding){
            this.loadding = true;
            let offsetV = parseInt(offset)*20;
            let params = {
                limit:"20",
                offset:offsetV+"",
                type : type,
                search:searchV ? searchV : ""
            }
            this.props.actions.getNewsList(params,(data)=>{
                this.loadding = false;
                if(data && data.list.length == 0){
                    this.tabs[this.state.activeTabIndex].hasNext = false;
                }
                if(callback)callback();
            });
        }
    }
    componentDidMount(){
        let headerH = document.getElementById("listSearchBlock").offsetHeight + document.getElementById("listTabsBlock").offsetHeight;
        let footerH = document.getElementById("bodyFooter").offsetHeight;
        let scrollPositionH = window.innerHeight - headerH - footerH;
        let tabs = Config.newsTypes,
            newsTab = [];
        for(let i=0;i<tabs.length;i++){
            let el = {
                title:tabs[i].title,
                type:tabs[i].type,
                active:i == this.state.activeTabIndex ? true : false,
                offset:0,
                hasNext : true
            }
            newsTab.push(el);
        }
        this.getListData(tabs[this.state.activeTabIndex].type,"0");
        this.tabs = newsTab;
        this.setState({
            scrollPositionH:scrollPositionH,
            topHeight:headerH,
            navHeight:footerH
        });

    }

    renderList=(list)=> {
        return list.map((item,index)=>(<Item data={item} key={index}></Item>))
    }
    tabClick = (item,index) => {
        //tab点击
        if(index == 0){
            this.searchHandle(this.searchV);
        }else{
            let tabs = this.tabs;
            let activeTabIndex = this.state.activeTabIndex;
            for(let i=0;i<tabs.length;i++){
                let el = tabs[i];
                if(el.type == item.type){
                    tabs[i].active = true;
                    activeTabIndex = i;
                }else{
                    tabs[i].active = false;
                }
                tabs[i].offset = 0;
            }
            this.getListData(item.type,"0");
            this.tabs = tabs;
            this.setState({
                activeTabIndex:activeTabIndex
            });
        }
    }
    renderTabs = () => {
        let tabs = this.tabs;
        return tabs.map((item,index)=>(<div onClick={()=>{this.tabClick(item,index)}} className={ item.active ? 'tab-item active' : 'tab-item'} key={"listTab"+index}>{item.title}</div>));
    }
    refresh = (callback) => { //下拉刷新
        this.tabs[this.state.activeTabIndex].offset = 0;
        let type = this.tabs[this.state.activeTabIndex].type,
            limit = "10",
            offset = "0";
        this.getListData(type,offset,function(data){
            if(callback)callback();
        });
    }
    loadMore = (callback) => {
        if(!this.loadding){
            let currentTab = this.tabs[this.state.activeTabIndex];
            let type = currentTab.type,
                limit = "10",
                offset = ++currentTab.offset + "";
            this.getListData(type,offset,function(data){
                if(callback)callback();
            });
        }
    }
    searchHandle = (v) => {
        //TODO 检索处理
        var offset = "0";
        this.setState({
            activeTabIndex:0
        });
        this.searchV = v;
        this.getListData(this.tabs[0].type,offset,function(data){
            //if(callback)callback();
        },this.searchV);
    }
    intoDetail = (data) => {
        ///v1/news/details?id=3318036
                //eventId eventName newsId
        myAjax.handelMaidian({
            eventId:"list_click_detail",
            eventName:"列表详情点击",
            newsId: data.id
        });
        util.intoNextPage(this,"detail",{id:data && data.id ? data.id : ''});
    }
    quickIntoDetail = (id) => {
        myAjax.handelMaidian({
            eventId:"list_click_detail",
            eventName:"列表详情点击",
            newsId: id
        });
        util.intoNextPage(this,"detail",{id:id});
    }
    render(){
        let { pageData }=this.props;
        let newsList = pageData && pageData.newsList ? pageData.newsList : [];

        let list = [];
        for(let i = 0; i < newsList.length; i++) {
            let item = newsList[i];
            list.push(<Item clickHandle={this.intoDetail} data={item} key={i}></Item>)
        }

        return(<BasePage headerTitle={this.state.title} currentTab="home" currentPage={this} backCallback = {function(){location.href = location.href;}}>
            <div>
                <div className='news-list-detail'>
                    <DragLoad 
                        paddingTop={this.state.topHeight}
                        paddingBottom={this.state.navHeight}
                        recordList = {list}
                        hasNext = {this.tabs.length > 0 ? this.tabs[this.state.activeTabIndex].hasNext : true}
                        refreshProcess = {this.refresh}
                        loadMore = {this.loadMore}
                    />
                </div>
                <div className="news-header-tabs" id="listTabsBlock">
                    <div className="tabs-parent">
                     {this.tabs.length > 0 ? this.renderTabs() : null}
                     </div>
                </div>
                <div className = 'news-search' id="listSearchBlock">
                    <SearchItem topHeight={this.state.topHeight} intoDetail={this.quickIntoDetail} searchHandle = {this.searchHandle}/>
                </div>
            </div>
           
        </BasePage>);
    }
}
List.contextTypes = {
    router: PropTypes.object
}
function mapStateToProps(state) {
    return {
        pageData: state.list,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(listAction, dispatch)
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(List);