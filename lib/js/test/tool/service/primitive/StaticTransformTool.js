'use strict';

var SourceInstanceTool$Wonderjs = require("../instance/SourceInstanceTool.js");
var StaticTransformService$Wonderjs = require("../../../../src/service/primitive/instance/StaticTransformService.js");

function isTransformStatic(sourceInstance, state) {
  var match = SourceInstanceTool$Wonderjs.getRecord(state);
  return StaticTransformService$Wonderjs.isTransformStatic(sourceInstance, match[/* isTransformStatics */3]);
}

function markModelMatrixIsStatic(sourceInstance, isStatic, state) {
  var match = SourceInstanceTool$Wonderjs.getRecord(state);
  StaticTransformService$Wonderjs.markModelMatrixIsStatic(sourceInstance, isStatic, match[/* isTransformStatics */3]);
  return state;
}

exports.isTransformStatic = isTransformStatic;
exports.markModelMatrixIsStatic = markModelMatrixIsStatic;
/* SourceInstanceTool-Wonderjs Not a pure module */
