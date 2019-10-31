import React, {Component,PureComponent} from 'react';

export default class newsItem extends Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }

    handleClick=()=>{
        let {data,clickHandle } = this.props;
        if(clickHandle){
            clickHandle(data);
        }
    }
    _renderImg = (list) => {
        let len = list.length,
            wv = (parseInt(100/len) - 2)+"%";
         return list.map((item,index)=>(<img key={index} style={{width:wv,marginLeft:'1%',marginRight:"1%"}} src={item}></img>));
    }
    filterImgsList = (el) => {
        return el;
    }
    render(){
        /**
        author: "CSDN"
        from_source: "CSDN"
        id: "3318036"
        image_url: "http://p3.pstatp.com/list/pgc-image/RfikRHz2oFIl0K"
        news_time: "2019-10-24 09:17:28"
        news_type: "推荐"
        title: "做消息推送 8 年的极光，为何做物联网 JIoT 平台？"
         */
        let { data,derection} = this.props;
        let imgUrl = data && data.image_url ? data.image_url.split(","):[];
        imgUrl = imgUrl.filter(this.filterImgsList);
        return(
            <div>
                { imgUrl.length > 1 ? <div className="news-item-containerT" onClick={this.handleClick}>
                    <p>{data.title}</p>
                    <div className="news-items-downimg">
                        {this._renderImg(imgUrl)}
                    </div>
                </div> : <div onClick={this.handleClick} className='news-item-container'>
                    <p>{data.title}</p>
                    {imgUrl.length == 1 ? <div><img src={imgUrl[0]}></img></div> : null}
                </div>}
            </div>
        );
    }
}