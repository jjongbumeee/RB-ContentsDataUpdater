import * as fs from "fs";

const asyncStringify = async (data: any) => {
  return JSON.stringify(data);
};

const jsonFileWriter = (filePath: string, fileName: string, data: any) => {
  return new Promise(async (resolve, reject) => {
    const exportJson = await asyncStringify(data);
    fs.writeFile(`${filePath}${fileName}.json`, exportJson, "utf8", (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`json file saved at ${filePath}${fileName}.json
            data length is ${data.length}`);
        resolve("fileUploaded!");
      }
    });
  });
};

export { jsonFileWriter };
