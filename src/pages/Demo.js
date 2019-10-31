import React, {Component } from 'react';
import BasePage from "../components/common/BasePage";

export default class Demo extends Component {
    componentWillMount(){

    }
    backHandle = () => {
        location.href="http://www.baidu.com";
    }
    render(){
        return(<BasePage headerTitle="demo" backCallback={this.backHandle}>
            <div>
                <text>demo页面</text>
            </div>
        </BasePage>);
    }
}