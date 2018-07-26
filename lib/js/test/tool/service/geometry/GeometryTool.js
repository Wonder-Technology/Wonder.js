'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../TestTool.js");
var GameObjectTool$Wonderjs = require("../gameObject/GameObjectTool.js");
var DeviceManagerService$Wonderjs = require("../../../../src/service/record/all/device/DeviceManagerService.js");
var RenderGeometryService$Wonderjs = require("../../../../src/service/record/main/geometry/RenderGeometryService.js");

function getIndexType(state) {
  return RenderGeometryService$Wonderjs.getIndexType(DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */18]));
}

function getIndexTypeSize(state) {
  return RenderGeometryService$Wonderjs.getIndexTypeSize(DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */18]));
}

function isGeometry(geometry) {
  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* >= */2], Wonder_jest.Expect[/* expect */0](geometry), 0);
}

function batchDisposeGeometryByCloseContractCheck(gameObjectArr, state) {
  TestTool$Wonderjs.closeContractCheck(/* () */0);
  var state$1 = GameObjectTool$Wonderjs.batchDisposeGameObject(gameObjectArr, state);
  TestTool$Wonderjs.openContractCheck(/* () */0);
  return state$1;
}

exports.getIndexType = getIndexType;
exports.getIndexTypeSize = getIndexTypeSize;
exports.isGeometry = isGeometry;
exports.batchDisposeGeometryByCloseContractCheck = batchDisposeGeometryByCloseContractCheck;
/* Wonder_jest Not a pure module */
