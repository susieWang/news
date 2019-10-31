import React , {Component,PropTypes} from 'react';

export default class AdvertDialog extends Component{
    static propTypes = {
    }
    static defaultProps = {
    }
    constructor(props){
        super(props)
        this.state = {
        }
    }

    handleClick=()=>{
        let { data,noticeCallback } = this.props;
        if(data && data.promoteUrl){
            noticeCallback && noticeCallback(data);
        }
    }

    render(){
        let { data,showCallback } = this.props;
        let bannerPngUrl = data && data.bannerPngUrl ? data.bannerPngUrl : require('../../styles/images/defaultAd.jpg');
        let imgTitle = data && data.title ? data.title : '惊喜好礼，等你来拿！';

        if(data && data.bannerPngUrl){
            showCallback && showCallback(data);
        }

        return(
            <div className="dialog-container">
                <div className="dialog-view show">
                    <div className="dialog-content" onClick={this.handleClick}>
                        <div className="dialog-image">
                            {bannerPngUrl ? <img src={bannerPngUrl} /> : null}
                        </div>
                        <p>{imgTitle}</p>
                        <button className="yellow-btn">立即领取</button>
                    </div>
                </div>
            </div>
        )
    }
}