import React, {Component,PureComponent,Fragment} from 'react';

const hotSearchList = [{
    "id":"3318036",
    "title":"物联网 JIoT 平台"
},{
    "id":"3318015",
    "title":"印度创业公司"
},{
    "id":"3318016",
    "title":"赵丽颖产后复工"
},{
    "id":"3318018",
    "title":"中国商务旅行晴雨表"
},{
    "id":"3318014",
    "title":"马拉松跑无风感音乐节"
}];
export default class SearchItem extends Component{
    constructor(props){
        super(props)
        this.state = {
            showTipList:false
        }
        this.searchValue = "";
    }
    setSearch = (e) => {
        this.searchValue = e.target.value;
    }
    handleClick=()=>{
        let { searchHandle } = this.props;
        if(searchHandle){
            searchHandle(this.searchValue);
        }
    }
    focusProcess = (e) => {
        //console.log("focusProcess");
        let v = e.target.value;
        this.setState({
            showTipList:true
        });
    }
    keyUpProcess = (e) => {
        //console.log("keyUpProcess");
        let v = e.target.value;
        if(v && this.state.showTipList){
            this.closeSearchTip();
        }else if(!v && !this.state.showTipList){
            this.setState({
                showTipList:true
            });
        }
    } 
    closeSearchTip = () => {
        this.setState({
            showTipList:false
        });
    }
    editProcess = () => {
        //发布处理
    }
    _intoDetail = (item) => {
        let {intoDetail} = this.props;
        intoDetail(item.id);
    }
    _renderHotSearchList = () => {
        return hotSearchList.map((item,index)=>(<div onClick={() => {this._intoDetail(item)}} key={item.id} className="search-tip-item">{item.title}</div>));
    }
    componentDidUpdate(){
        let {topHeight} = this.props;
        if(topHeight && document.getElementById("searchHotTips")){
            document.getElementById("searchHotTips").style.height = (window.innerHeight - topHeight)+"px";
        }
    }
    render(){
       
        return(
            <div>
            <div style={{display:"flex"}}>
                <div style={{marginLeft: "0.5rem",marginTop: ".1rem"}} >
                    <img className="news-edit-img" src = {require("../../styles/images/logoNew.png")}/>
                </div>
                <div className ="news-search-container">
                  <input onFocus={this.focusProcess} onKeyUp={this.keyUpProcess} onChange={this.setSearch} className="news-search-input" placeholder="猪肉为什么这么贵..." type="text" name="searchInfo" />
                  <div onClick={this.handleClick} className="news-search-btn"><img className="search-icon" src={require("../../styles/images/searchIcon.png")}/></div>
                </div>
            </div>
            {this.state.showTipList ? 
            <div className="news-search-tip-container" id="searchHotTips">
                {this._renderHotSearchList()}
                <div onClick={this.closeSearchTip} className='news-tip-close'><i className="iconfont icon-guanbi"></i></div>
            </div> : null}
            </div>
        );
    }
}