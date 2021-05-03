

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as EventTool$Wonderjs from "../../../../unit/job/no_worker/tool/EventTool.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as MouseEventTool$Wonderjs from "../../../../unit/job/no_worker/tool/MouseEventTool.js";
import * as NoWorkerJobTool$Wonderjs from "../../../../tool/service/job/no_worker/NoWorkerJobTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../../src/service/state/main/state/CreateStateMainService.js";
import * as ArcballCameraControllerAPI$Wonderjs from "../../../../../src/api/camera_controller/ArcballCameraControllerAPI.js";
import * as ArcballCameraControllerTool$Wonderjs from "../../../../tool/service/camera_controller/ArcballCameraControllerTool.js";

Wonder_jest.describe("test redo,undo arcballCameraController", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        var _prepareState = function (param) {
          var state = MouseEventTool$Wonderjs.prepareWithState(sandbox, TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"init_event\"\n        },\n        {\n          \"name\": \"init_camera\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n[\n\n    {\n          \"name\": \"init_event\"\n    },\n        {\n          \"name\": \"init_camera\"\n        }\n]\n        ", undefined, /* () */0), undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
          MouseEventTool$Wonderjs.setPointerLocked();
          return state;
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test redo/undo binded eventHandleFunc map", (function (param) {
                return Wonder_jest.test("test restore pointDragOverEventHandleFuncMap", (function (param) {
                              Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                              var state = _prepareState(/* () */0);
                              var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state);
                              var cameraController = match[3][0];
                              var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(match[0]);
                              var state$2 = ArcballCameraControllerAPI$Wonderjs.bindArcballCameraControllerEvent(cameraController, state$1);
                              var state$3 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$2);
                              var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$3);
                              var state$4 = ArcballCameraControllerAPI$Wonderjs.unbindArcballCameraControllerEvent(cameraController, state$3);
                              var restoredState = MainStateTool$Wonderjs.restore(state$4, copiedState);
                              var preventDefaultFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var restoredState$1 = MainStateTool$Wonderjs.setState(restoredState);
                              EventTool$Wonderjs.triggerDomEvent("mousewheel", EventTool$Wonderjs.getPointEventBindedDom(state$4), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, preventDefaultFunc, undefined, /* () */0));
                              EventTool$Wonderjs.restore(restoredState$1);
                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](preventDefaultFunc));
                            }));
              }));
        return Wonder_jest.describe("deep copy arcballCameraController record", (function (param) {
                      return Wonder_jest.test("shadow copy distanceMap", (function (param) {
                                    var state = _prepareState(/* () */0);
                                    var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                    var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state$1);
                                    var cameraController = match[3][0];
                                    var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                    var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$2);
                                    var state$3 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerDistance(cameraController, 5, state$2);
                                    var restoredState = MainStateTool$Wonderjs.restore(state$3, copiedState);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* <> */6], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerDistance(cameraController, restoredState)), 5);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
