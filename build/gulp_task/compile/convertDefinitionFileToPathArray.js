var fs = require("fs-extra");
var path = require("path");

var definitionsPath = "src/filePath.d.ts";

var mapFilePath = function(item){
  var result = /"([^"]+)"/g.exec(item)[1];

  if(result.indexOf(".d.ts") > -1){
    return result;
  }

  return result;
};

var filterFilePath = function(item){
  return item !== "";
};

exports.convertToPathArray = function () {
  return fs.readFileSync(path.join(process.cwd(), definitionsPath), "utf8").split('\n').filter(filterFilePath).map(mapFilePath);
};

