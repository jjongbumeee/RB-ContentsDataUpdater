/***
* Implements a service that converts Google Spreadsheet to JSON
* without Node.js
* @author DanielJung(danieltiger60@gmail.com)
***/

var data;
/***
* Get number of index from column name
* @param  {string} colName The name(first row data) of column
* @return {number} col The converted number 
***/
function getCol(colName) {
  var col = data[0].indexOf(colName);
  if (col != -1) {
    return col;
  }
}

/***
* Export data
* @return {string} parsed JSON object 
***/
function exportData() {
  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getActiveSheet();
  var headerRows = 1;
  var range = sheet.getDataRange();
  var numRows = range.getNumRows();
  data = range.getValues();
  
  for(var i = headerRows; i < numRows; i++) {
    if(data[i][getCol("category0")] === "") continue; //category0
    
    let content = {}, site = "", category = [], tags = [];
    if (data[i][getCol("site")] === "naver-blog") { //site
      content = { rendered: data[i][getCol("fullUrl")], protected: false } //fullUrl
      site = "naver";
    }
    else{
      content = { rendered: data[i][getCol("embedHTML")], protected: false }; //embedHTML
      site = "youtube";
    }
    category.push(data[i][getCol("category0")]);//category0
    category.push(data[i][getCol("category1")]);//category1
    if(data[i][getCol("category2")] != "") //category2
      category.push(data[i][getCol("category2")]);
    if(data[i][getCol("Tag1")] != "") //Tag1
      tags.push(data[i][getCol("Tag1")]);
    
    var formData = {
      'id' : data[i][getCol("category0")],//category0
      'date' : data[i][getCol("createdAt")], //createadAt
      'date_gmt' : data[i][getCol("updatedAt")],//updatedAt
      'type' : site,
      'link' : data[i][getCol("fullUrl")], //fullUrl
      'title' : {
        'rendered' : site + ' ' + data[i][getCol("searchKeyword")] //searchKeyword
      },
      'content' : content,
      'featured_media' : 0,
      'categories' : category,
      'tags' : tags,
      'featured_image_src' : data[i][getCol("thumbnailUrl")] //thumbnailUrl
    }
    var payload = JSON.stringify(formData);
    Logger.log(payload);
  }
}