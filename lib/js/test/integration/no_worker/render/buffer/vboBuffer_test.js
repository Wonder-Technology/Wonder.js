'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var DisposeJob$Wonderjs = require("../../../../../src/job/no_worker/loop/DisposeJob.js");
var FakeGlTool$Wonderjs = require("../../../../tool/gl/FakeGlTool.js");
var GeometryAPI$Wonderjs = require("../../../../../src/api/geometry/GeometryAPI.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var DirectorTool$Wonderjs = require("../../../../tool/core/DirectorTool.js");
var GeometryTool$Wonderjs = require("../../../../tool/service/geometry/GeometryTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var VboBufferTool$Wonderjs = require("../../../../tool/service/vboBuffer/VboBufferTool.js");
var RenderJobsTool$Wonderjs = require("../../../../tool/job/no_worker/loop/RenderJobsTool.js");
var BoxGeometryTool$Wonderjs = require("../../../../tool/service/geometry/BoxGeometryTool.js");
var InstanceBufferTool$Wonderjs = require("../../../../tool/service/vboBuffer/InstanceBufferTool.js");
var NoWorkerJobConfigTool$Wonderjs = require("../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js");
var RenderBasicHardwareInstanceTool$Wonderjs = require("../../../../tool/render/instance/RenderBasicHardwareInstanceTool.js");

Wonder_jest.describe("test vbo buffer", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerInitPipelineConfigWithoutInitMain(/* () */0), undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerInitJobConfigWithoutInitMain(/* () */0), undefined, /* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test buffer pool", (function (param) {
                      Wonder_jest.describe("test create geometry after dispose one", (function (param) {
                              var _prepare = function (state) {
                                var state$1 = SettingTool$Wonderjs.setMemory(state, 1, /* () */0);
                                var match = BoxGeometryTool$Wonderjs.createGameObject(state$1);
                                return /* tuple */[
                                        match[0],
                                        match[1],
                                        match[2]
                                      ];
                              };
                              return Wonder_jest.test("getOrCreateBuffer should use old one(created buffer previously) in pool", (function (param) {
                                            var match = _prepare(state[0]);
                                            var geometry1 = match[2];
                                            var match$1 = VboBufferTool$Wonderjs.prepareCreatedBuffer(sandbox, match[0]);
                                            var match$2 = match$1[1];
                                            var state$1 = match$1[0];
                                            VboBufferTool$Wonderjs.getOrCreateAllGeometryBuffers(geometry1, state$1);
                                            VboBufferTool$Wonderjs.getOrCreateAllGeometryBuffers(geometry1, state$1);
                                            var state$2 = GameObjectAPI$Wonderjs.disposeGameObjectGeometryComponent(match[1], geometry1, state$1);
                                            var match$3 = GeometryTool$Wonderjs.createGameObject(state$2);
                                            var geometry2 = match$3[2];
                                            var state$3 = GeometryAPI$Wonderjs.setGeometryIndices16(geometry2, new Uint16Array(/* array */[
                                                      1,
                                                      3,
                                                      2
                                                    ]), match$3[0]);
                                            var state$4 = GameObjectAPI$Wonderjs.initGameObject(match$3[1], state$3);
                                            var state$5 = DisposeJob$Wonderjs.execJob(undefined, state$4);
                                            var match$4 = VboBufferTool$Wonderjs.getOrCreateAllGeometryBuffers(geometry2, state$5);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            Sinon.getCallCount(match$1[3]),
                                                            match$4[0],
                                                            match$4[1],
                                                            match$4[2],
                                                            match$4[3]
                                                          ]), /* tuple */[
                                                        4,
                                                        match$2[2],
                                                        match$2[1],
                                                        match$2[0],
                                                        match$1[2][0]
                                                      ]);
                                          }));
                            }));
                      return Wonder_jest.describe("test create souceInstance gameObject after dispose one", (function (param) {
                                    return Wonder_jest.test("getOrCreateBuffer should use old one(created buffer previously) in pool", (function (param) {
                                                  var match = RenderBasicHardwareInstanceTool$Wonderjs.prepare(sandbox, state[0]);
                                                  var sourceInstance1 = match[2][3];
                                                  var createBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                  Sinon.returns(0, Sinon.onCall(0, createBuffer));
                                                  Sinon.returns(1, Sinon.onCall(1, createBuffer));
                                                  Sinon.returns(2, Sinon.onCall(2, createBuffer));
                                                  Sinon.returns(3, Sinon.onCall(3, createBuffer));
                                                  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                  var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                  var instanceBuffer1 = VboBufferTool$Wonderjs.getOrCreateInstanceBuffer(sourceInstance1, InstanceBufferTool$Wonderjs.getDefaultCapacity(/* () */0), state$2);
                                                  var state$3 = GameObjectAPI$Wonderjs.disposeGameObjectSourceInstanceComponent(match[1], sourceInstance1, state$2);
                                                  var state$4 = DisposeJob$Wonderjs.execJob(undefined, state$3);
                                                  var match$1 = RenderBasicHardwareInstanceTool$Wonderjs.createSourceInstanceGameObject(sandbox, state$4);
                                                  var instanceBuffer2 = VboBufferTool$Wonderjs.getOrCreateInstanceBuffer(match$1[2][3], InstanceBufferTool$Wonderjs.getDefaultCapacity(/* () */0), match$1[0]);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](instanceBuffer1), instanceBuffer2);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
