import React, { Component } from 'react';
import util from "../../utils/util";

export default class FooterTabs extends Component{
    constructor(props){
        super(props);
        this.state={}
    }

    handleClick=(flag)=>{
        let {currentPage} = this.props;
        if(currentPage && flag){
            
            util.intoNextPage(currentPage,flag);
        }
    }

    render(){
        let {currentTab,currentPage} = this.props;
        return (
            <div className="navBar" id="bodyFooter">
                <ul>
                    <li className={currentTab == 'home' ? "active" : ""}  onClick={() => { this.handleClick('index')} }>
                        <span><i className="iconfont icon-shouye"></i></span>
                        <p>首页</p>
                    </li>
                    <li  className={currentTab == 'radio' ? "active" : ""} onClick={() => { this.handleClick('radio')} }>
                        <span><i className="iconfont icon-shipin"></i></span>
                        <p>视频</p>
                    </li>
                    <li  className={currentTab == 'mine' ? "active" : ""} onClick={() => { this.handleClick('mine')} }>
                        <span><i className="iconfont icon-profile"></i></span>
                        <p>我的</p>
                    </li>
                </ul>
            </div>
        )
    }
}