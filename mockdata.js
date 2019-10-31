var express = require('express');
var app = express();
var bodyParser = require('body-parser');
 
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
// app.use('/public', express.static('public'));
var commonProcess = function(res,data){
  //Access-Control-Allow-Credentials
  res.setHeader('Access-Control-Allow-Credentials','true');
  res.setHeader('Access-Control-Allow-Origin','http://172.16.12.142:8848');
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
}

var formatRes = function(data){
   return {
     "code":"000",
     "desc":"",
     "data":data ? data : {}
   }
}
// //参数 
// app.get('/newsList', function (req, res) {
//    // 输出 JSON 格式
//    var data = {
//        "list":[],
//        "pageNo":1,
//        "pageSize":20,
//        "nextFlag":false
//    };
//    var response = formatRes(data);
//    console.log(response);
//    commonProcess(res,response);
// })
//获取新闻列表 
/* 
参数{
  type:"",
  pageNo:,
  pageSize:
}*/
app.post('/newsList', urlencodedParser, function (req, res) {
  // 输出 JSON 格式
  var list = [];
  for(var i=0;i<20;i++){
    var item = {
      title:"习近平对科技特派员制度推行20周年作出重要指示强调 坚持人才下沉科技下乡服务“三农”用科技助力脱贫攻坚和乡村振兴",
      imgUrl : "https://p3.pstatp.com/list/pgc-image/159a826374ee410c9ebbb24b6d9ecaef",
      id:Math.random().toString().split(".")[1].substr(0,10)
    }
    list.push(item)
  }
  var data = {
      "list":list,
      "pageNo":req.body.pageNo,
      "pageSize":req.body.pageSize,
      "nextFlag":true
  };
  var response = formatRes(data);
  console.log(response);
  commonProcess(res,response);
})
app.post('/newsDetail', urlencodedParser, function (req, res) {
  // 输出 JSON 格式
  var data = {
      "title":"法定婚龄暂时不改了！网友：改吧，改成30岁……",
      "content":'<p>民法典婚姻家庭编草案21日提请十三届全国人大常委会三次审议。<strong>草案三审稿对法定婚龄暂不做修改，维持现行婚姻法规定的结婚年龄：男不得早于二十二周岁，女不得早于二十周岁。</strong></p><img src="https://p3.pstatp.com/large/pgc-image/RfcaAhO7t4sX89" img_width="656" img_height="527" inline="0" alt="法定婚龄暂时不改了！网友：改吧，改成30岁……" onerror="javascript:errorimg.call(this);"><p>报道指出，相较于草案二审稿，三审稿主要作了4方面修改。</p><p><strong>一是将“树立优良家风”写入其中，</strong>规定：家庭应当树立优良家风，弘扬家庭美德，重视家庭文明建设。同时，增加夫妻之间应当互相关爱的规定。</p><p><strong>二是确立了最有利于被收养人的原则。</strong>草案二审稿规定，收养应当有利于被收养人的健康成长，保障被收养人和收养人的合法权益。草案三审稿吸纳这一建议，将此条修改为：收养应当遵循最有利于被收养人的原则，保障被收养人和收养人的合法权益。</p><p><strong>三是关于无效或者被撤销婚姻中无过错方的损害赔偿请求权，</strong>增加规定：婚姻无效或者被撤销的，无过错方有权请求损害赔偿。</p><p><strong>四是关于离婚后的隔代探望权，</strong>草案三审稿删除了此前的相关规定。鉴于目前各方面对此尚未形成共识，可以考虑暂不在民法典中规定，祖父母、外祖父母行使隔代探望权，如与直接抚养子女的一方不能协商一致，可以通过诉讼由人民法院根据具体情况加以解决。</p><p>值得注意的是，<strong>草案三审稿维持了现行法定婚龄的规定，</strong>认为现行法定婚龄的规定已为广大社会公众所熟知和认可，如果进行修改，属于婚姻制度的重大调整，宜在进行充分的调查研究和科学的分析评估后再定。</p><img src="https://p3.pstatp.com/large/pgc-image/Rfi0rq5JERjVFU" img_width="440" img_height="914" inline="0" alt="法定婚龄暂时不改了！网友：改吧，改成30岁……" onerror="javascript:errorimg.call(this);"><p><strong>人大代表建议</strong></p><p><strong>修改法定结婚年龄</strong></p><p>在今年的全国两会上，针对我国当下存在的人口问题，全国人大代表、贝达药业董事长丁列明指出，<strong>现行法定结婚年龄及鼓励晚婚晚育的规定已与我国当前的人口发展形势、生育政策等不相适应，建议尽快对现行婚姻法的相关条款进行修订。</strong></p><p>丁列明指出，我国现行法定婚龄在国际上、我国历史上均处于最高水平。从国际来看，大多数国家的法定婚龄在18岁至16岁。鉴此，现行法定结婚年龄及晚婚晚育的规定已与计划生育政策和工作目标不相适应，需修订完善。</p><img src="https://p3.pstatp.com/large/pgc-image/RfcaAhzDPyd9Ta" img_width="599" img_height="422" inline="0" alt="法定婚龄暂时不改了！网友：改吧，改成30岁……" onerror="javascript:errorimg.call(this);"><p>在建议提出后，不少网友提出了反对意见：</p><img src="https://p3.pstatp.com/large/pgc-image/Rfi0rqT3SGfGqS" img_width="1080" img_height="300" inline="0" alt="法定婚龄暂时不改了！网友：改吧，改成30岁……" onerror="javascript:errorimg.call(this);"><img src="https://p3.pstatp.com/large/pgc-image/RfcaBGSDsvlmpC" img_width="1062" img_height="314" inline="0" alt="法定婚龄暂时不改了！网友：改吧，改成30岁……" onerror="javascript:errorimg.call(this);"><p><strong>网友又提出“神”建议：</strong></p><p><strong>改30岁如何？</strong></p><p>我国现行法定婚龄暂不调整的消息一出便冲上热搜！</p><img src="https://p3.pstatp.com/large/pgc-image/RfX0EQd6vKu6vY" img_width="413" img_height="171" inline="0" alt="法定婚龄暂时不改了！网友：改吧，改成30岁……" onerror="javascript:errorimg.call(this);"><p>不少人支持！</p><img src="https://p3.pstatp.com/large/pgc-image/RfXUFIy7BzRnC7" img_width="464" img_height="82" inline="0" alt="法定婚龄暂时不改了！网友：改吧，改成30岁……" onerror="javascript:errorimg.call(this);"><img src="https://p3.pstatp.com/large/pgc-image/RfXUFJN7fBIyiH" img_width="450" img_height="73" inline="0" alt="法定婚龄暂时不改了！网友：改吧，改成30岁……" onerror="javascript:errorimg.call(this);"><p>不过，这次网友又有新想法：</p><img src="https://p3.pstatp.com/large/pgc-image/RfXUFJa3BaEu5n" img_width="488" img_height="71" inline="0" alt="法定婚龄暂时不改了！网友：改吧，改成30岁……" onerror="javascript:errorimg.call(this);"><img src="https://p3.pstatp.com/large/pgc-image/RfX0EQz2eoHF98" img_width="628" img_height="129" inline="0" alt="法定婚龄暂时不改了！网友：改吧，改成30岁……" onerror="javascript:errorimg.call(this);"><img src="https://p3.pstatp.com/large/pgc-image/RfXUFS8IKxvXfQ" img_width="484" img_height="101" inline="0" alt="法定婚龄暂时不改了！网友：改吧，改成30岁……" onerror="javascript:errorimg.call(this);"><img src="https://p3.pstatp.com/large/pgc-image/RfXUFSR8ja6USC" img_width="432" img_height="63" inline="0" alt="法定婚龄暂时不改了！网友：改吧，改成30岁……" onerror="javascript:errorimg.call(this);"><p><strong>你怎么看？</strong></p><p class="pgc-end-source">来源：新华网，综合中国青年报、中国妇女报等</p><p class="pgc-end-source">监制：于卫亚</p><p class="pgc-end-source">编辑：关开亮、徐祥达</p><p class="pgc-end-source">实习：逯冰清、杨瑞君</p><p class="pgc-end-source">你想多少岁结婚？</p>',
      "id":req.body.id
  };
  var response = formatRes(data);
 // console.log(response);
  commonProcess(res,response);
})

// app.post('/process_post', urlencodedParser, function (req, res) {
 
//    // 输出 JSON 格式
//    var response = {
//        "first_name":req.body.first_name,
//        "last_name":req.body.last_name
//    };
//    console.log(response);
//    res.end(JSON.stringify(response));
// })
 
var server = app.listen(3000, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("http://localhost:"+port)
 
})