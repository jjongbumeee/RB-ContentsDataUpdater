import _ from 'lodash';
import tagJSON from '../sheet_json/tag.json';   //이런 방식으로 export한 json 파일 import

let tmp: any[] = [ {id:123, name:'화'}, {id:123, name:'이'}, {id:123, name:'팅'}];

class OutputSample{
    

}

console.log(_.filter(tmp, _.matches({name:'화'}))); //lodash function

const sampleFunction = (tag: any[]) => {     //화살표 함수
    console.log(tag.length);
    let outputArr: OutputSample[] = [];
    
    console.log(_.filter(tag, _.matches({name: '유모차'}))) // 해당 tag array 내에서 name 값이 유모차인 값을 필터
    for(let i in tag){
        console.log(tag[i].id);
        //do something 
        let tmp: OutputSample; 

        //tmp 값을 넣는 로직


        outputArr.push(tmp);
    }

}



console.log('hello world?');


sampleFunction(tagJSON);