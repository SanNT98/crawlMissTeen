const request = require('request');
const cheerio = require('cheerio');
const MongoClient = require('mongodb').MongoClient;
const dbURL = 'mongodb://localhost:27017';
const dbName = 'missteen';


MongoClient.connect(dbURL, { useNewUrlParser: true }, function (err, client) {
    const db = client.db(dbName);
    var i = 1;
    var url = "http://missteen.vn/thisinh-";

    function main() {
        if (i < 10000) {
            layThiSinh(url + i, () => {
                
                i++;
                main();
            });
        }
        else {
            console.log("Done");
        }

    }
    main();



    // for(var i = 1; i<1000; i++){
    //     var url="http://missteen.vn/thisinh-"+i;
    //     layThiSinh(url);

    // }
    function layThiSinh(url, cb) {
        request(url, function (error, response, body) {
            
            const $ = cheerio.load(body)
            if (kiemTraURL(url, response)) {
                luuDB(layThongTin($), cb)
            } else {
                cb()
            }
        })
    }
    function kiemTraURL(url, response) {
        if (url == response.request.uri.href) {

            return true;
        }
        else return false;
    }
    function layThongTin($) {
        var thongTin = {
            sbd: "",
            ten: "",
            tuoi: "",
            que: "",
            chieuCao: "",
            vote: ""
        }
        thongTin.sbd = $('.sbd').text().split(' ')[1];
        thongTin.ten = $('.tt').text();
        thongTin.que = $('.p span').text();
        thongTin.tuoi = $('.p').text().trim().split('\n')[2].trim().split(' ')[1];
        thongTin.chieuCao = $('.p').text().trim().split('\n')[3].trim().split(' ')[2];
        thongTin.vote=$('span.text').text();
        return (thongTin);
    }
    function luuDB(thongTin, cb) {
        db.collection("thi_sinh").insertOne(thongTin).then(() => {
            console.log(`Done ${i}`)
            cb()
        });
    }

})