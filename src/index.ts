import _ from 'lodash';
import { jsonFileWriter } from './jsonwriter';
import tagJSON from '../sheet_json/tag.json';   //이런 방식으로 export한 json 파일 import
import goodsJSON from '../data/goods.json';
import dbdata from '../data/accountdata.json'
class OutputSample{
    id: number;
    date: string;
    date_gmt: string;
    type: string;
    link: string;
    title: object;
    content: object;
    featured_media: number;
    categories: number[];
    tags: number[];
    featured_image_src: string;
    constructor(id, date, date_gmt, type, link, title, content, featured_media, categories, tags, featured_image_src){
        this.id = id;
        this.date = date;
        this.date_gmt = date_gmt;
        this.type = type;
        this.link = link;
        this.title = title;
        this.content = content;
        this.featured_media = featured_media;
        this.categories = categories;
        this.tags = tags;
        this.featured_image_src = featured_image_src;
    }
}

//console.log(_.filter(tmp, _.matches({name:'화'}))); //lodash function
const sampleFunction = (tag: any[]) => {     //화살표 함수
    let outputArr: OutputSample[] = [];
    //console.log(_.filter(tag, _.matches({name: '유모차'}))) // 해당 tag array 내에서 name 값이 유모차인 값을 필터

    for(let i in tag){
        if(tag[i].category0 == null) continue;
        
        //tmp 값을 넣는 로직
        let now = tag[i];
        let content = {}, site = "", category = [180];
        if (now.site === "naver-blog") {
            content = { rendered: now.fullUrl, protected: false }
            site = "naver";
        }
        else{ 
            content = { rendered: now.embedHTML, protected: false };
            site = "youtube";
        }
        category.push(now.category1);
        category.push(now.category2);
        let tmp = new OutputSample(now.category0, now.CreatedAt, now.UpdatedAt,
            site, now.fullUrl, {rendered: site +" "+ now.searchKeyword},
            content, 0, category, [now.Tag1], now.thumbnailUrl);
        
        outputArr.push(tmp);
        console.log(tmp);
        //break;
    }

    jsonFileWriter('./', 'output', outputArr);

}
sampleFunction(goodsJSON);

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://daniel:" + dbdata.password + 
"@cluster0.qp0wy.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {
  const collection = client.db("test").collection("contents");
  // perform actions on the collection object
  client.close();
});