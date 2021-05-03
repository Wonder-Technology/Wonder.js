

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as GLBTool$Wonderjs from "./GLBTool.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as RenderJobsTool$Wonderjs from "../../../../tool/job/no_worker/loop/RenderJobsTool.js";
import * as LoopRenderJobTool$Wonderjs from "../../../../tool/job/no_worker/loop/LoopRenderJobTool.js";
import * as GenerateSceneGraphAPI$Wonderjs from "../../../../../src/api/asset/GenerateSceneGraphAPI.js";
import * as GenerateSceneGraphSystemTool$Wonderjs from "./GenerateSceneGraphSystemTool.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

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

export {
  _createState ,
  generateWDB ,
  
}
/* Sinon Not a pure module */
