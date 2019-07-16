const request = require('request');
const cheerio = require('cheerio');
const url ='http://missteen.vn/thisinh-'
var i=1;
request(url+i, function(error, response, body){
    //console.log(url+i);
    
    var data = body
    const $= cheerio.load(data);
    var a = response.request.uri;
    console.log(a)
    //console.log($('.tt').text())
    //console.log(body)
})