import React, {Component} from 'react';
import BasePage from "../components/common/BasePage";
import util from "../utils/util";
class  Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: "登录"
        }
    }
    render(){
        return (<BasePage headerTitle={this.state.title} >
            <div>
                <img src = {require("../styles/images/logo.png")}/>
                <div>
                    
                </div>
            </div>
        </BasePage>)
    }
}
export default Login;