'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var GLBTool$Wonderjs = require("./GLBTool.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var RenderJobsTool$Wonderjs = require("../../../../tool/job/no_worker/loop/RenderJobsTool.js");
var LoopRenderJobTool$Wonderjs = require("../../../../tool/job/no_worker/loop/LoopRenderJobTool.js");
var GenerateSceneGraphAPI$Wonderjs = require("../../../../../src/api/asset/GenerateSceneGraphAPI.js");
var GenerateSceneGraphSystemTool$Wonderjs = require("./GenerateSceneGraphSystemTool.js");
var MutableSparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/MutableSparseMapService.js");

function _createState(sandbox) {
  return RenderJobsTool$Wonderjs.initWithJobConfigAndBufferConfig(sandbox, LoopRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0), SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
}

function generateWDB(buildWDBGameObjectFunc) {
  var sandbox = /* record */[/* contents */Sinon$1.sandbox.create()];
  var state = _createState(sandbox);
  GenerateSceneGraphSystemTool$Wonderjs.prepareCanvasForCubemapTexture(sandbox);
  GLBTool$Wonderjs.prepare(sandbox[0]);
  var match = Curry._1(buildWDBGameObjectFunc, state);
  var match$1 = GenerateSceneGraphAPI$Wonderjs.generateWDB(match[1], MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), true, match[0]);
  Curry._1(Sinon.restoreSandbox, sandbox[0]);
  return match$1[2];
}

exports._createState = _createState;
exports.generateWDB = generateWDB;
/* Sinon Not a pure module */
