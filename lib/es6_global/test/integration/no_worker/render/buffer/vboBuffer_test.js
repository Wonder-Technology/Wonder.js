

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as DisposeJob$Wonderjs from "../../../../../src/job/no_worker/loop/DisposeJob.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as GeometryAPI$Wonderjs from "../../../../../src/api/geometry/GeometryAPI.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as DirectorTool$Wonderjs from "../../../../tool/core/DirectorTool.js";
import * as GeometryTool$Wonderjs from "../../../../tool/service/geometry/GeometryTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as VboBufferTool$Wonderjs from "../../../../tool/service/vboBuffer/VboBufferTool.js";
import * as RenderJobsTool$Wonderjs from "../../../../tool/job/no_worker/loop/RenderJobsTool.js";
import * as BoxGeometryTool$Wonderjs from "../../../../tool/service/geometry/BoxGeometryTool.js";
import * as InstanceBufferTool$Wonderjs from "../../../../tool/service/vboBuffer/InstanceBufferTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";
import * as RenderBasicHardwareInstanceTool$Wonderjs from "../../../../tool/render/instance/RenderBasicHardwareInstanceTool.js";

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

export {
  
}
/*  Not a pure module */
