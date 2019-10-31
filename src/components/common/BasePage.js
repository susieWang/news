import React, {Component } from 'react';
import FooterBabs from "./FooterTabs";

export default class BasePage extends Component {
    //返回处理
    _backHandle = () => {
        let {backCallback} = this.props;
        if(backCallback){          
            backCallback();
        }
    }
    _pageShowHandle = () => {
        let self = this;
        setTimeout(function() {
            if(history.pushState && history.length > 1){
                history.pushState({}, "", "");
                window.addEventListener("popstate",self._backHandle, false);
            }
        }, 0);
    }
    changeTitle = () => { //修改title
        let {headerTitle} = this.props;
        if(headerTitle){
            document.getElementsByTagName('title')[0].text = headerTitle;
        }
    }
    componentWillMount(){
        let self = this;
        let {backCallback} = this.props;
        if(backCallback){
            self._pageShowHandle();
        }
        this.changeTitle();
    }
    componentWillUnmount(){
        let self = this;
        window.removeEventListener("popstate",self._backHandle, false);
    }
    componentDidMount(){
        let bodyH = window.innerHeight;
        document.getElementById("bodyContainer").style.height = bodyH+"px";
    }
    render(){
        let {headerTitle,headerRightTitle,headerRightHandle,headerLeftHandle,currentTab,currentPage} = this.props;
        return(<div className="container" id="bodyContainer">
                {this.props.children}
                {currentTab ? <FooterBabs currentPage={currentPage} currentTab={currentTab}/> : null}
            </div>);
    }
}
