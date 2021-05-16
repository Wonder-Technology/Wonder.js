

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as StateAPI$Wonderjs from "../../../../src/api/StateAPI.js";
import * as FakeGlTool$Wonderjs from "../../gl/FakeGlTool.js";
import * as RenderConfigTool$Wonderjs from "../renderConfig/RenderConfigTool.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as StateDataMainService$Wonderjs from "../../../../src/service/state/main/state/StateDataMainService.js";
import * as OperateSettingService$Wonderjs from "../../../../src/service/record/main/setting/OperateSettingService.js";
import * as SharedArrayBufferTool$Wonderjs from "../../SharedArrayBufferTool.js";
import * as ConfigDataLoaderSystem$Wonderjs from "../../../../src/asset/ConfigDataLoaderSystem.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function getStateData(param) {
  return StateAPI$Wonderjs.getStateData(/* () */0);
}

function unsafeGetState(param) {
  return StateDataMainService$Wonderjs.unsafeGetState(StateAPI$Wonderjs.getStateData(/* () */0));
}

function setState(state) {
  return StateDataMainService$Wonderjs.setState(StateAPI$Wonderjs.getStateData(/* () */0), state);
}

function createState(param) {
  Curry._1(SharedArrayBufferTool$Wonderjs.setSharedArrayBufferToBeArrayBuffer, /* () */0);
  return StateAPI$Wonderjs.createState(/* () */0);
}

function createNewCompleteState(sandbox) {
  var state = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), (Curry._1(SharedArrayBufferTool$Wonderjs.setSharedArrayBufferToBeArrayBuffer, /* () */0), StateAPI$Wonderjs.createState(/* () */0)));
  var newrecord = Caml_array.caml_array_dup(state);
  return ConfigDataLoaderSystem$Wonderjs._createRecordWithState((newrecord[/* settingRecord */0] = OperateSettingService$Wonderjs.setSetting(/* record */[
                    /* canvasId */"",
                    /* memory */undefined,
                    /* buffer */undefined,
                    /* isDebug */undefined,
                    /* context */undefined,
                    /* gpu */undefined,
                    /* worker */undefined
                  ]), newrecord));
}

function createNewCompleteStateWithRenderConfig(sandbox) {
  var state = createNewCompleteState(sandbox);
  return RenderConfigTool$Wonderjs.create(RenderConfigTool$Wonderjs.buildRenderConfig(undefined, undefined, /* () */0), state);
}

function testShadowCopyArrayLikeMapData(getMapFunc, state) {
  Curry._1(getMapFunc, state).forEach((function (map) {
          MutableSparseMapService$WonderCommonlib.set(0, MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), map);
          return /* () */0;
        }));
  var copiedState = StateAPI$Wonderjs.deepCopyForRestore(state);
  Curry._1(getMapFunc, copiedState).forEach((function (map) {
          MutableSparseMapService$WonderCommonlib.deleteVal(0, map);
          return /* () */0;
        }));
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, map) {
          var targetArr = param[1];
          var sourceArr = param[0];
          sourceArr.push(MutableSparseMapService$WonderCommonlib.unsafeGet(0, map));
          targetArr.push(undefined);
          return /* tuple */[
                  sourceArr,
                  targetArr
                ];
        }), /* tuple */[
        /* array */[],
        /* array */[]
      ], Curry._1(getMapFunc, state));
  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[0].includes(undefined)), false);
}

var deepCopyForRestore = StateAPI$Wonderjs.deepCopyForRestore;

var restore = StateAPI$Wonderjs.restoreState;

export {
  deepCopyForRestore ,
  restore ,
  getStateData ,
  unsafeGetState ,
  setState ,
  createState ,
  createNewCompleteState ,
  createNewCompleteStateWithRenderConfig ,
  testShadowCopyArrayLikeMapData ,
  
}
/* Wonder_jest Not a pure module */
