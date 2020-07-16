import _ from 'lodash';


let tmp: any[] = [ {id:123, name:'화'}, {id:123, name:'이'}, {id:123, name:'팅'}];


console.log(_.filter(tmp, _.matches({name:'화'})));



console.log('hello world?');
