import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BasePage from "../components/common/BasePage";

export default class Radio extends Component{
    constructor(props){
        super(props);
        this.state={
            title:'视频'
        }
    }
    render(){
        return(<BasePage headerTitle={this.state.title} currentTab="radio" currentPage={this}>
            <div className="mine-container">
                <span><i className="iconfont icon-kulian"></i></span>
                <div className="tips">程序员很懒，尚未开发</div>
            </div>
        </BasePage>);
    }
}
Radio.contextTypes = {
    router: PropTypes.object
}