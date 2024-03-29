import _ from 'lodash';
import config from './config';
import { jsonFileWriter } from './jsonwriter';
import goodsJSON from '../data/goods.json';
import periodJSON from "../data/period.json";
import dbdata from '../data/accountdata.json'


const MongoClient = require("mongodb").MongoClient;

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
let goodsOutputArr: OutputSample[] = [];
let periodOutputArr: OutputSample[] = [];
//console.log(_.filter(tmp, _.matches({name:'화'}))); //lodash function
const sampleFunction = async (data: any[]) => {     //화살표 함수
    
    //console.log(_.filter(tag, _.matches({name: '유모차'}))) // 해당 tag array 내에서 name 값이 유모차인 값을 필터
    let outputArr: OutputSample[] = [];
    for(let i in data){
        if(data[i].category0 == null) continue;
        
        //tmp 값을 넣는 로직
        let now = data[i];
        let content = {}, site = "", category = [], tags = [];
        if (now.site === "naver-blog") {
            content = { rendered: now.fullUrl, protected: false }
            site = "naver";
        }
        else{ 
            content = { rendered: now.embedHTML, protected: false };
            site = "youtube";
        }
        category.push(now.category0);
        category.push(now.category1);
        if(now.category2 != null)
            category.push(now.category2);
        if(now.Tag1 != null)
            tags.push(now.Tag1);
            
        let tmp = new OutputSample(now.category0, now.CreatedAt, now.UpdatedAt,
            site, now.fullUrl, {rendered: now.title},
            content, 0, category, tags, now.thumbnailUrl);
        
        outputArr.push(tmp);
        // console.log(tmp);
    }
    // TODO: if you want to File Output, erase this Annotation
    //jsonFileWriter('./', 'output', outputArr);
    return outputArr;
}

// console.log(goodsOutputArr.length);
// console.log(periodOutputArr.length);
const uploadMongo = async () => {
    goodsOutputArr = await sampleFunction(goodsJSON); //goods parsed data will be stored at outputArr
    periodOutputArr = await sampleFunction(periodJSON); //period parsed data will be stored at outputArr
    
    const uri = config.epicDev.url;

    // const uri = "mongodb+srv://daniel:" + dbdata.password +
    //     "@cluster0.qp0wy.mongodb.net/test?retryWrites=true&w=majority";
    const client = await MongoClient.connect(uri, { useNewUrlParser: true });
    // client.connect(async (err) => {
    //     // const goodsCollection = client.db("test").collection("goods");
    //     // const periodCollection = client.db("test").collection("period");

    const mongoCollection = await client.db(config.epicDev.db).collection(config.epicDev.collectionContents);
    // perform actions on the collection object
    console.log(periodOutputArr.length);
    console.log(goodsOutputArr.length);

    await mongoCollection.insertMany(periodOutputArr);
    await mongoCollection.insertMany(goodsOutputArr);

    client.close();
}


uploadMongo();