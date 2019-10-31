//详情
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import InfiniteScroll from '../components/common/ReactScroll';
import BasePage from "../components/common/BasePage";
import * as listAction from '../actions/listAction';
import util from "../utils/util";
import myAjax from '../utils/myAjax';

class  Detail extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: "新闻详情"
        }
        this.itemId = "";
    }
    componentWillMount(){
        this.itemId = util.getQueryStringByName("id");
        myAjax.handelMaidian({
            eventId:"into_detail_page",
            eventName:"进入详情页面",
            newsId:this.itemId
        });
    }
    componentWillUnmount(){
        myAjax.handelMaidian({
            eventId:"leave_detail_page",
            eventName:"离开详情页面",
            newsId:this.itemId
        });
    }
    componentDidMount(){
        this.props.actions.getNewDetail({
            id :  this.itemId
        });
    }

    render(){
/*
author: "CSDN"
contents: "<div class="article-content"><img alt="做消息推送 8 年的极光，为何做物联网 JIoT 平台？" img_height="810" img_width="1080" inline="0" src="http://p1.pstatp.com/large/pgc-image/RfikPsm8VEiDUT"/><p>作者 | 伍杏玲</p><p>出品 | CSDN（<i class="chrome-extension-mutihighlight chrome-extension-mutihighlight-style-4">ID：</i>CSDNnews）</p><p>在移动开发里，开发者有三大刚需：统计分析、消息推送、统一登录。其中对于消息推送，有一家企业自移动开发的潮流伊始，便坚持为开发者提供这项基础服务，至今已坚持八个年头了。</p><p>从几个人到当前花费50余人的团队来维护这项功能，将这看起来很基础简单的事做到极致，这便是极光。</p><p>自2011年成立，如今8年时间过去，极光给我们交出一份怎样的答卷呢？</p><p>在10月19日的2019极光开发者大会上，极光创始人兼CEO罗伟东、极光IoT事业线总监吕鑫等专家集聚一堂，围绕5G、物联网、移动开发生态等热点话题，共同探讨移动开发领域的前沿技术和行业趋势。</p><img alt="做消息推送 8 年的极光，为何做物联网 JIoT 平台？" img_height="57" img_width="340" inline="0" src="http://p1.pstatp.com/large/pgc-image/RT4Gwk56bt5iOJ"/><p><strong>开发者 50 万，SDK 积累安装量达 266 亿</strong></p><p>回顾极光创立之初，当时移动开发者面临各项窘境：安卓生态碎片化，缺失统一的推送服务；开源框架不稳定，需要二次开发；消息推送是刚需，但不是核心业务，需要耗费开发者很多开发和维护成本……</p><p>为此，极光推出JPush消息推送服务。极光创始人兼CEO罗伟东表示，“极光的基因是为服务开发者而生。”</p><p>八年过去，极光在大会上交出一份亮眼的答卷：目前月独立活跃设备达11.3亿台，服务开发者达50万，服务应用128.9万，SDK积累安装量达266亿。</p><img alt="做消息推送 8 年的极光，为何做物联网 JIoT 平台？" img_height="500" img_width="900" inline="0" src="http://p1.pstatp.com/large/pgc-image/RfikPt582OYZwp"/><img alt="做消息推送 8 年的极光，为何做物联网 JIoT 平台？" img_height="57" img_width="340" inline="0" src="http://p1.pstatp.com/large/pgc-image/RT7S2kzFTfre26"/><p><strong>极光为何做物联网平台 JIoT？</strong></p><p>随着物联网的发展，各类应用场景的业务规模、终端功能、数据种类存在差异，碎片化是物联网开发在开发和部署中面临最为严峻的问题。</p><p>据极光IoT事业线总监吕鑫表示，正是基于极光服务开发者的基因，为了帮助物联网开发者应对不同终端、操作系统、平台的多样场景下的开发需求，极光推出定位于IoT设备的接入管理平台JIoT，为IoT设备优化协议、提供高并发、高覆盖的设备接入及消息通信功能，帮助开发者快速部署和完成业务。</p><p>在移动开发领域做消息推送8年的极光，为何会大胆尝试推出JIoT平台？</p><p>罗伟东进一步表示，IoT设备对数据通讯、数据上报对稳定性和可靠性的要求比<i class="chrome-extension-mutihighlight chrome-extension-mutihighlight-style-6">App</i>要求更高。例如智能门锁下发一个指令要开门，这是需要100%的可靠性。而<i class="chrome-extension-mutihighlight chrome-extension-mutihighlight-style-6">App</i>推送新闻时，用户即使没有收到可能也不在意。</p><p>而极光在做推送服务有八年的积累，如今每天处理消息有2<i class="chrome-extension-mutihighlight chrome-extension-mutihighlight-style-3">30</i>亿条，服务节点达1万台，在优化消息的送达稳定、及时性和可靠性上有很多经验积累，所以极光将此能力延伸到IoT上，形成在IoT上核心的技术和竞争力。</p><img alt="做消息推送 8 年的极光，为何做物联网 JIoT 平台？" img_height="57" img_width="340" inline="0" src="http://p3.pstatp.com/large/pgc-image/RTJXJ1kBqzfCnu"/><p><strong>开发者如何玩转JIoT？</strong></p><p>JIoT支持五大功能：</p><p>1、设备接入：采用符合物联网设备的MQTT协议，提供上下行的自定义消息，可覆盖区域就近接入。</p><p>2、设备影子：可对服务端的设备映射，减少与设备本身的频繁交互带来的流量和电量的消耗。</p><p>3、设备管理：从产品的维度来组织设备，对设备的生命周期进行管理。</p><p>4、事件日志：为每一个设备独立管理事件日志记录，掌握设备变化。</p><p>5、统计服务：提供设备新增、在线、激活等不同维度的实时统计数据与图表展示。</p><p>从业务层面来看，JIoT分三层结构：</p><p>最底层是JIoT SDK，通过MQTT/<i class="chrome-extension-mutihighlight chrome-extension-mutihighlight-style-1">HTTP</i> 与中间层连接，进行JIoT设备接入、设备管理、消息管理等操作，上层是极光Web Portal和设备服务。</p><p>主要有两大使用场景：</p><p>1、远程控制</p><p>例如共享单车解锁、共享充电宝开关、智能家居控制、POS收费远程打印票据、智能售货机等。</p><p>2、数据采集</p><p>例如智能制造设备监控、智能抄表、车位检测、烟雾报警、防盗报警、农林数据采集等场景。</p><p>开发者如何接入JIoT呢？</p><img alt="做消息推送 8 年的极光，为何做物联网 JIoT 平台？" img_height="434" img_width="682" inline="0" src="http://p3.pstatp.com/large/pgc-image/RfikQ7k3Cgehfp"/><p>以共享单车为例，因为单车锁上集成了极光IoT的SDK，设备与极光接入服务器保持连接，如需远程解锁，只需调用极光IoT <i class="chrome-extension-mutihighlight chrome-extension-mutihighlight-style-6">REST</i> API的message接口进行下发即可，这样可以减少海量请求对业务服务器的压力。</p><img alt="做消息推送 8 年的极光，为何做物联网 JIoT 平台？" img_height="447" img_width="1080" inline="0" src="http://p3.pstatp.com/large/pgc-image/RfikQ83D7hD9SN"/><p class="pgc-img-caption">平台截图</p><p>谈及未来，罗伟东表示，随着5G的到来，<i class="chrome-extension-mutihighlight chrome-extension-mutihighlight-style-6">App</i>的生态会随着5G逐渐演变。例如快应用将可能会更活跃；原来做推送文本消息的 <i class="chrome-extension-mutihighlight chrome-extension-mutihighlight-style-6">App</i> 现在可以推视频或是更多富媒体内容。</p><p>未来极光会基于最核心的通讯业务往外延伸，提供设备管理等服务，继续为开发者提供可靠的、可信赖的、可依赖的服务平台。</p><p>未来可期。</p><img alt="做消息推送 8 年的极光，为何做物联网 JIoT 平台？" img_height="266" img_width="1080" inline="0" src="http://p1.pstatp.com/large/pgc-image/RFPZeiNC2y8v00"/><p class="pgc-end-source">【END】</p></div>"
from_source: "CSDN"
id: "3318036"
image_url: "http://p3.pstatp.com/list/pgc-image/RfikRHz2oFIl0K"
news_time: "2019-10-24 09:17:28"
news_type: "推荐"
title: "做消息推送 8 年的极光，为何做物联网 JIoT 平台？"
         */
        let {pageData} = this.props;
        let newsDetail = pageData.newsDetail,
            content = newsDetail.contents ? newsDetail.contents : "" ,
            title = newsDetail.title ? newsDetail.title  : "";
        return(<BasePage headerTitle={this.state.title} >
                <div className="news-detail-container">
                    <h3 className="news-detail-title">{title ? title : this.state.title}</h3>
                    <div className="news-detail-body" dangerouslySetInnerHTML={{ __html: content }}  ></div>
                </div>
        </BasePage>)
    }
}
function mapStateToProps(state) {
    return {
        pageData: state.list,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(listAction, dispatch)
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(Detail);
