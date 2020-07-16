# export sheet

staticContents_품목7가지(앱 주요 물품)

staticContents_시기

<hr/>

## sampleoutput
```
{
"id": 5900,
    "date": "2020-07-15T15:58:33",  //생성 시간 date
    "date_gmt": "2020-07-15T06:58:33",
    "type": "post", //naver or youtube 
    "link": "https:\/\/readybaby.net\/time-guide\/midtrimester\/5900\/", //fullUrl
    "title": {
      "rendered": "임신중기4~8개월" //[site] + searchkeyword
    },
    "content": {
      //naver면 fullUrl /youtube면 embed-->
      "rendered": "",
      "protected": false
    },    
    "featured_media": 0, 
    //카테고리
    "categories": [
      188
    ],
    //태그
    "tags": [
      231,
      230,
      143,
      145
    ],
    "featured_image_src": null, //thumnailUrl      
}
```


### 개발환경 세팅
 <hr>

vscode
* https://code.visualstudio.com/

wsl 1 설치 (2버전은 선택사항  cpu 가상화 지원시 해도 좋다.)

* https://lahuman.github.io/windows-wsl-setting/
```
설치완료시 vscode에서 ctrl+` 로 터미널창 띄우고 default shell WSL bash로 변경

 wsl home 디렉토리 window 경로 : \\wsl\$Ubuntu-18.04\home\username

 wsl2 사용시 해당 경로에 올려야 속도도 정상적이고 파일 변경 이벤트가 문제없이 적용됨
```
*  해당 페이지에서 node까지 설치후 

```
 $ npm install -g yarn
 ```
* 프로젝트 clone 이후 

 ```
 $ yarn 
```

vscode-exetension (ctrl+shift+x)

* Remote-wsl
* https://musma.github.io/2019/07/11/vscode-extension.html


git GUI Client (취향)

* https://desktop.github.com/
* https://www.gitkraken.com/
* https://www.sourcetreeapp.com/



 
mongodb atlas 연결 
* https://moonsupport.tistory.com/262
* https://docs.mongodb.com/manual/reference/method/js-collection/
