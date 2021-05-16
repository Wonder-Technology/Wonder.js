'use strict';

var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var CameraTool$Wonderjs = require("../../../tool/service/camera/CameraTool.js");
var SettingTool$Wonderjs = require("../../../tool/service/setting/SettingTool.js");
var MainStateTool$Wonderjs = require("../../../tool/service/state/MainStateTool.js");
var TestWorkerTool$Wonderjs = require("../tool/TestWorkerTool.js");
var FakeGlWorkerTool$Wonderjs = require("../tool/FakeGlWorkerTool.js");
var RenderBasicJobTool$Wonderjs = require("../../../tool/job/render_basic/RenderBasicJobTool.js");
var TestMainWorkerTool$Wonderjs = require("../job/main_worker/tool/TestMainWorkerTool.js");
var FrontRenderLightJobTool$Wonderjs = require("../../../tool/job/no_worker/loop/FrontRenderLightJobTool.js");
var RenderJobsRenderWorkerTool$Wonderjs = require("../job/render_worker/tool/RenderJobsRenderWorkerTool.js");

Wonder_jest.describe("test commit gl", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, 5, 8, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        return Wonder_jest.describe("should only commit once", (function (param) {
                      return Wonder_jest.testPromise("test render basic and front render light", undefined, (function (param) {
                                    var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                    var match$1 = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, match[0]);
                                    var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
                                    var commit = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                    var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(commit), undefined, undefined, /* () */0), match$2[0]);
                                    return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                  return Promise.resolve(Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](commit)));
                                                }), state$1, sandbox, undefined, /* () */0);
                                  }));
                    }));
      }));

/*  Not a pure module */
