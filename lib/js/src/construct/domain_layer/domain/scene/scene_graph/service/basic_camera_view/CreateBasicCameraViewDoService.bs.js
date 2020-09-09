'use strict';

var BasicCameraViewEntity$Wonderjs = require("../../entity/BasicCameraViewEntity.bs.js");
var IndexComponentDoService$Wonderjs = require("../IndexComponentDoService.bs.js");
var IndexBasicCameraViewDoService$Wonderjs = require("./IndexBasicCameraViewDoService.bs.js");

function create(param) {
  var index = IndexBasicCameraViewDoService$Wonderjs.getMaxIndex(undefined);
  var newIndex = IndexComponentDoService$Wonderjs.generateIndex(index);
  IndexBasicCameraViewDoService$Wonderjs.setMaxIndex(newIndex);
  return BasicCameraViewEntity$Wonderjs.create(index);
}

exports.create = create;
/* No side effect */
