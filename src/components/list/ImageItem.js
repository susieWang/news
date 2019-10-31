import React, {Component,PureComponent} from 'react';

export default class ImageItem extends Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }

    handleClick=()=>{
        let { data,noticeCallback } = this.props;
        if(data && data.promoteUrl){
            noticeCallback && noticeCallback(data);
            location.href = data.promoteUrl;
        }
    }

    render(){
        let { data } = this.props;
        let imageUrl = data && data.bannerPngUrl ? data.bannerPngUrl : null;
        return(
                <li className="img-content" onClick={this.handleClick}>
                    {imageUrl ? <img src={imageUrl} /> : null}
                </li>
        );
    }
}
