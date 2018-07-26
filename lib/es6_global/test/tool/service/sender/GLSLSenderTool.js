

import * as $$Array from "../../../../../../node_modules/bs-platform/lib/es6/array.js";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as CameraTool$Wonderjs from "../camera/CameraTool.js";
import * as FakeGlTool$Wonderjs from "../../gl/FakeGlTool.js";
import * as DirectorTool$Wonderjs from "../../core/DirectorTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../state/MainStateTool.js";
import * as RenderJobsTool$Wonderjs from "../../job/no_worker/loop/RenderJobsTool.js";
import * as GLSLLocationTool$Wonderjs from "../location/GLSLLocationTool.js";
import * as SparseMapService$Wonderjs from "../../../../src/service/atom/SparseMapService.js";
import * as LoopRenderJobTool$Wonderjs from "../../job/no_worker/loop/LoopRenderJobTool.js";
import * as DeviceManagerService$Wonderjs from "../../../../src/service/record/all/device/DeviceManagerService.js";
import * as HashMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";
import * as CreateRenderStateMainService$Wonderjs from "../../../../src/service/state/main/render/CreateRenderStateMainService.js";
import * as VertexAttribArrayRenderService$Wonderjs from "../../../../src/service/state/render/sender/VertexAttribArrayRenderService.js";

function getGLSLSenderRecord(state) {
  return state[/* glslSenderRecord */30];
}

function disableVertexAttribArray(state) {
  VertexAttribArrayRenderService$Wonderjs.disableVertexAttribArray(DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), CreateRenderStateMainService$Wonderjs.createRenderState(state));
  return state;
}

function clearLastSendGeometry(state) {
  state[/* glslSenderRecord */30][/* lastSendGeometryData */11] = undefined;
  return state;
}

function clearShaderCache(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* glslSenderRecord */30];
  newrecord[/* glslSenderRecord */30] = /* record */[
    /* attributeSendDataMap */init[/* attributeSendDataMap */0],
    /* instanceAttributeSendDataMap */init[/* instanceAttributeSendDataMap */1],
    /* uniformCacheMap */init[/* uniformCacheMap */2],
    /* uniformRenderObjectSendModelDataMap */init[/* uniformRenderObjectSendModelDataMap */3],
    /* uniformRenderObjectSendMaterialDataMap */SparseMapService$Wonderjs.mapValid((function (uniformRenderObjectSendMaterialDataArr) {
            return uniformRenderObjectSendMaterialDataArr.map((function (record) {
                          return /* record */[
                                  /* shaderCacheMap */HashMapService$WonderCommonlib.createEmpty(/* () */0),
                                  /* name */record[/* name */1],
                                  /* pos */record[/* pos */2],
                                  /* getDataFunc */record[/* getDataFunc */3],
                                  /* sendDataFunc */record[/* sendDataFunc */4]
                                ];
                        }));
          }), state[/* glslSenderRecord */30][/* uniformRenderObjectSendMaterialDataMap */4]),
    /* uniformShaderSendNoCachableDataMap */init[/* uniformShaderSendNoCachableDataMap */5],
    /* uniformShaderSendCachableDataMap */init[/* uniformShaderSendCachableDataMap */6],
    /* uniformShaderSendCachableFunctionDataMap */init[/* uniformShaderSendCachableFunctionDataMap */7],
    /* uniformInstanceSendNoCachableDataMap */init[/* uniformInstanceSendNoCachableDataMap */8],
    /* vertexAttribHistoryArray */init[/* vertexAttribHistoryArray */9],
    /* lastSendMaterialData */init[/* lastSendMaterialData */10],
    /* lastSendGeometryData */init[/* lastSendGeometryData */11]
  ];
  return newrecord;
}

function prepareSendUniformData(sandbox, prepareGameObjectFunc, state) {
  var match = Curry._2(prepareGameObjectFunc, sandbox, state);
  var gameObject = match[1];
  var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
  var state$1 = match$1[0];
  return /* tuple */[
          state$1,
          gameObject,
          /* tuple */[
            GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$1),
            match[3]
          ],
          match$1[2],
          match$1[3]
        ];
}

function testSendMatrix4(sandbox, name, setFunc, targetData, prepareGameObjectFunc, $staropt$star, _) {
  var testFunc = $staropt$star !== undefined ? $staropt$star : (function () {
        return /* () */0;
      });
  describe("send " + (String(name) + ""), (function () {
          var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
          beforeEach((function () {
                  state[0] = RenderJobsTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, LoopRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0));
                  return /* () */0;
                }));
          Wonder_jest.test("test send", (function () {
                  var match = prepareSendUniformData(sandbox, prepareGameObjectFunc, state[0]);
                  var state$1 = Curry._4(setFunc, match[2][0], match[3], match[4], match[0]);
                  var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                  var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, name);
                  var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                  DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                  return Sinon.toCalledWith(/* array */[
                              0,
                              false,
                              targetData
                            ], Wonder_jest.Expect[/* expect */0](uniformMatrix4fv));
                }));
          return Curry._1(testFunc, prepareSendUniformData);
        }));
  return /* () */0;
}

function testSendMatrix3(sandbox, name, setFunc, targetData, prepareGameObjectFunc, $staropt$star, _) {
  var testFunc = $staropt$star !== undefined ? $staropt$star : (function () {
        return /* () */0;
      });
  describe("send " + (String(name) + ""), (function () {
          var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
          beforeEach((function () {
                  state[0] = RenderJobsTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, LoopRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0));
                  return /* () */0;
                }));
          Wonder_jest.test("test send", (function () {
                  var match = prepareSendUniformData(sandbox, prepareGameObjectFunc, state[0]);
                  var state$1 = Curry._4(setFunc, match[2][0], match[3], match[4], match[0]);
                  var uniformMatrix3fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                  var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, name);
                  var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniformMatrix3fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                  DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                  return Sinon.toCalledWith(/* array */[
                              0,
                              false,
                              targetData
                            ], Wonder_jest.Expect[/* expect */0](uniformMatrix3fv));
                }));
          return Curry._1(testFunc, prepareSendUniformData);
        }));
  return /* () */0;
}

function testSendShaderVector3(sandbox, name, setFunc, targetData, $staropt$star, $staropt$star$1, _) {
  var prepareGameObjectFunc = $staropt$star !== undefined ? $staropt$star : RenderJobsTool$Wonderjs.prepareGameObject;
  var testFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : (function () {
        return /* () */0;
      });
  describe("send " + (String(name) + ""), (function () {
          var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
          var _prepare = function (sandbox, state) {
            var match = prepareSendUniformData(sandbox, prepareGameObjectFunc, state[0]);
            var match$1 = match[2];
            var state$1 = Curry._4(setFunc, match[1], /* tuple */[
                  match$1[0],
                  match$1[1]
                ], /* tuple */[
                  match[3],
                  match[4]
                ], match[0]);
            var uniform3f = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
            var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, name);
            var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniform3f), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
            var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
            return /* tuple */[
                    state$3,
                    0,
                    uniform3f
                  ];
          };
          beforeEach((function () {
                  state[0] = RenderJobsTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, LoopRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0));
                  return /* () */0;
                }));
          Wonder_jest.test("test send", (function () {
                  var match = _prepare(sandbox, state);
                  return Sinon.toCalledWith(/* array */[match[1]].concat($$Array.of_list(targetData)), Wonder_jest.Expect[/* expect */0](match[2]));
                }));
          return Curry._1(testFunc, prepareSendUniformData);
        }));
  return /* () */0;
}

function testSendVector3(sandbox, name, setFunc, targetData, $staropt$star, $staropt$star$1, _) {
  var prepareGameObjectFunc = $staropt$star !== undefined ? $staropt$star : RenderJobsTool$Wonderjs.prepareGameObject;
  var testFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : (function () {
        return /* () */0;
      });
  describe("send " + (String(name) + ""), (function () {
          var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
          var _prepare = function (sandbox, state) {
            var match = prepareSendUniformData(sandbox, prepareGameObjectFunc, state[0]);
            var match$1 = match[2];
            var state$1 = Curry._4(setFunc, match[1], /* tuple */[
                  match$1[0],
                  match$1[1]
                ], /* tuple */[
                  match[3],
                  match[4]
                ], match[0]);
            var uniform3f = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
            var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, name);
            var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniform3f), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
            var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
            return /* tuple */[
                    state$3,
                    0,
                    uniform3f
                  ];
          };
          beforeEach((function () {
                  state[0] = RenderJobsTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, LoopRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0));
                  return /* () */0;
                }));
          Wonder_jest.test("if cached, not send", (function () {
                  var match = _prepare(sandbox, state);
                  DirectorTool$Wonderjs.runWithDefaultTime(match[0]);
                  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(match[1], match[2]))), 1);
                }));
          Wonder_jest.test("test send", (function () {
                  var match = _prepare(sandbox, state);
                  return Sinon.toCalledWith(/* array */[match[1]].concat($$Array.of_list(targetData)), Wonder_jest.Expect[/* expect */0](match[2]));
                }));
          return Curry._1(testFunc, prepareSendUniformData);
        }));
  return /* () */0;
}

function testSendFloat(sandbox, name, setFunc, targetData, $staropt$star, $staropt$star$1, _) {
  var prepareGameObjectFunc = $staropt$star !== undefined ? $staropt$star : RenderJobsTool$Wonderjs.prepareGameObject;
  var testFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : (function () {
        return /* () */0;
      });
  describe("send " + (String(name) + ""), (function () {
          var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
          var _prepare = function (sandbox, state) {
            var match = prepareSendUniformData(sandbox, prepareGameObjectFunc, state[0]);
            var match$1 = match[2];
            var state$1 = Curry._4(setFunc, match[1], /* tuple */[
                  match$1[0],
                  match$1[1]
                ], /* tuple */[
                  match[3],
                  match[4]
                ], match[0]);
            var uniform1f = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
            var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, name);
            var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniform1f), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
            var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
            return /* tuple */[
                    state$3,
                    0,
                    uniform1f
                  ];
          };
          beforeEach((function () {
                  state[0] = RenderJobsTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, LoopRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0));
                  return /* () */0;
                }));
          Wonder_jest.test("if cached, not send", (function () {
                  var match = _prepare(sandbox, state);
                  DirectorTool$Wonderjs.runWithDefaultTime(match[0]);
                  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(match[1], match[2]))), 1);
                }));
          Wonder_jest.test("test send", (function () {
                  var match = _prepare(sandbox, state);
                  return Sinon.toCalledWith(/* array */[
                              match[1],
                              targetData
                            ], Wonder_jest.Expect[/* expect */0](match[2]));
                }));
          return Curry._1(testFunc, prepareSendUniformData);
        }));
  return /* () */0;
}

var JudgeSendUniformData = /* module */[
  /* prepareSendUniformData */prepareSendUniformData,
  /* testSendMatrix4 */testSendMatrix4,
  /* testSendMatrix3 */testSendMatrix3,
  /* testSendShaderVector3 */testSendShaderVector3,
  /* testSendVector3 */testSendVector3,
  /* testSendFloat */testSendFloat
];

export {
  getGLSLSenderRecord ,
  disableVertexAttribArray ,
  clearLastSendGeometry ,
  clearShaderCache ,
  JudgeSendUniformData ,
  
}
/* Sinon Not a pure module */
