/**
 * Created by susieWang on 2019/3/19.
 */
import React, {Component } from 'react';
import PropTypes from 'prop-types';

export default class DragLoad extends Component {
    constructor () {
        super();
        this.maxTop = 0;
        this.state = {
            loadType : null,
            loading : false
        }
        this.startLoading = false;
        this.startTop = -1;
    }
    getOsType = () => {
        var ua = navigator.userAgent.toLowerCase();
        if (/android/i.test(ua)) {
            return 'android';
        } else if (/ipad|ipod|iphone/i.test(ua)) {
            return 'ios';
        }else{
            return 'pc';
        }
    }
    bindHandleScroll = (e) => {
        let {refreshProcess,loadMore,hasNext} = this.props;
        let deriction = '',pageY = e.changedTouches[0].pageY;
        let pageYCut = pageY - this.startTop;
        if((this.getOsType() == "android" && pageYCut > 50) || (this.getOsType() != "android" && pageYCut > 100)){
            deriction = "down";
        }else if(pageYCut < 0){
            deriction = "up";
        }

        //this.scrollTop =  document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

        this.scrollTop  = document.getElementById('dragLoadContainer').scrollTop;

        let loading = this.state.loading;
        if(deriction == "down" && !loading && !this.startLoading && this.scrollTop < 1 && this.state.loadType != 'up'){
            this.startLoading = true;
            this.setState({
                loadType:'up'
            });
            let self = this;
            setTimeout(()=>{
                self.setState({
                    loading:true
                });
                if(refreshProcess)refreshProcess(()=>{
                    self.startLoading = false;
                    self.setState({
                        loading:false,
                        loadType:null
                    });
                });
            },500)
        }else if(deriction == "up" && hasNext && !loading && !this.startLoading  && this.maxTop > 0 && this.scrollTop > this.maxTop ){
            this.startLoading = true;
            this.setState({
                loadType:'down'
            });
            let self = this;
            setTimeout(()=>{
                self.setState({
                    loading:true
                });
                if(loadMore)loadMore(()=>{
                    self.startLoading = false;
                    self.setState({
                        loading:false,
                        loadType:null
                    });
                });
            },500)
        }else if(deriction == "up" && !hasNext && this.state.loadType != 'endTip' && this.maxTop > 0 && this.scrollTop > this.maxTop){
            this.setState({
                loadType : 'endTip'
            });
        }
    }
    moveStartProcess = (e) => {
        this.startTop = e.changedTouches[0].pageY;
    }
    componentDidMount(){
        //window.addEventListener('scroll',this.bindHandleScroll);
        window.addEventListener('touchmove',this.bindHandleScroll);
        window.addEventListener('touchstart',this.moveStartProcess);
    }
    componentWillUnmount(){
        //touchmove touchend
        //window.removeEventListener('scroll',this.bindHandleScroll);
        window.removeEventListener('touchmove',this.bindHandleScroll);
        window.removeEventListener('touchstart',this.moveStartProcess);
    }
    getTotalHeight = () => {
        let {paddingBottom} = this.props;
        setTimeout(()=>{
            let scrollTotalH = document.getElementById('dragLoad').offsetHeight;
            this.maxTop = scrollTotalH - window.screen.height - 30 - paddingBottom;

            //this.maxTop = document.body.scrollHeight - window.screen.height-30;
        },0);
    }
    render () {
        this.getTotalHeight();
        let {recordList,paddingTop,paddingBottom} = this.props;

        let displayInfoUp = null,displayInfoDown = null;
        let loadType = this.state.loadType,isRequesting = this.state.loading;

        if(loadType == 'up' && isRequesting){
            displayInfoUp = <div className="loading-info"><em className="drag-load-loading"><i>&nbsp;</i></em><span>努力加载中...</span></div>
        }else if(loadType == 'up' && !isRequesting){
            displayInfoUp = <div className="loading-info"><em className="drag-load-touch-down">&nbsp;</em><span>下拉刷新</span></div>;
        }
        if(loadType == 'down' && isRequesting){
            displayInfoDown = <div className="loading-info"><em className="drag-load-loading"><i>&nbsp;</i></em><span>努力加载中...</span></div>
        }else if(loadType == 'down' && !isRequesting){
            displayInfoDown = <div className="loading-info"><em className="drag-load-touch-up">&nbsp;</em><span>上拉加载更多</span></div>;
        }
        if(loadType == 'endTip'){
            displayInfoDown = <div className="loading-info"><span className="load-no-data">--我也是有底线的--</span></div>;
        }

        let screenH = window.screen.height;
        return (
            <div style={{'height':screenH,'overflow':'hidden'}}>
                <div style={{'height':screenH,'overflow':'auto'}}  id="dragLoadContainer">
                    <div className="drag-load" id="dragLoad" style={{'paddingTop':paddingTop != undefined ? paddingTop : 0}}>
                        {displayInfoUp}
                        {recordList}
                        {displayInfoDown}
                        <div style={{'height':paddingBottom != undefined ? paddingBottom : 0}}>&nbsp;</div>
                    </div>
                </div>
            </div>
        );
    }

}
