'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var StateAPI$Wonderjs = require("../../../../src/api/StateAPI.js");
var FakeGlTool$Wonderjs = require("../../gl/FakeGlTool.js");
var RenderConfigTool$Wonderjs = require("../renderConfig/RenderConfigTool.js");
var ArrayService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ArrayService.js");
var StateDataMainService$Wonderjs = require("../../../../src/service/state/main/state/StateDataMainService.js");
var OperateSettingService$Wonderjs = require("../../../../src/service/record/main/setting/OperateSettingService.js");
var SharedArrayBufferTool$Wonderjs = require("../../SharedArrayBufferTool.js");
var ConfigDataLoaderSystem$Wonderjs = require("../../../../src/asset/ConfigDataLoaderSystem.js");
var MutableSparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/MutableSparseMapService.js");

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

exports.deepCopyForRestore = deepCopyForRestore;
exports.restore = restore;
exports.getStateData = getStateData;
exports.unsafeGetState = unsafeGetState;
exports.setState = setState;
exports.createState = createState;
exports.createNewCompleteState = createNewCompleteState;
exports.createNewCompleteStateWithRenderConfig = createNewCompleteStateWithRenderConfig;
exports.testShadowCopyArrayLikeMapData = testShadowCopyArrayLikeMapData;
/* Wonder_jest Not a pure module */
