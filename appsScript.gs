
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
  var data = range.getValues();
  
  for(var i = headerRows; i < numRows; i++) {
    //Logger.log(data[i][9]);
    if(data[i][9] === null) continue; //category0
    
    let content = {}, site = "", category = [], tags = [];
    if (data[i][3] === "naver-blog") { //site
      content = { rendered: data[i][4], protected: false } //fullUrl
      site = "naver";
    }
    else{
      content = { rendered: data[i][6], protected: false }; //embedHTML
      site = "youtube";
    }
    category.push(data[i][9]);//category0
    category.push(data[i][10]);//category1
    if(data[i][11] != null) //category2
      category.push(data[i][11]);
    if(data[i][17] != null) //Tag1
      tags.push(data[i][17]);
    
    var formData = {
      'id' : data[i][9],//category0
      'date' : data[i][23], //createadAt
      'date_gmt' : data[i][24],//updatedAt
      'type' : site,
      'link' : data[i][4], //fullUrl
      'title' : {
        'rendered' : site + ' ' + data[i][1] //searchKeyword
      },
      'content' : content,
      'featured_media' : 0,
      'categories' : category,
      'tags' : tags,
      'featured_image_src' : data[i][5] //thumbnailUrl
    }
    var payload = JSON.stringify(formData);
    Logger.log(payload);
  }
}