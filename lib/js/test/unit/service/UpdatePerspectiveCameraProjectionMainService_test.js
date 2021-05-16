'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../tool/TestTool.js");
var ViewTool$Wonderjs = require("../../tool/service/device/ViewTool.js");
var SettingTool$Wonderjs = require("../../tool/service/setting/SettingTool.js");
var MainStateTool$Wonderjs = require("../../tool/service/state/MainStateTool.js");
var PerspectiveCameraProjectionTool$Wonderjs = require("../../tool/service/camera/PerspectiveCameraProjectionTool.js");

Wonder_jest.describe("UpdatePerspectiveCameraProjectionMainService", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("updateCameraProjection", (function (param) {
                      return Wonder_jest.test("if not has fovy/near/far value, error", (function (param) {
                                    var __x = SettingTool$Wonderjs.buildFakeCanvasWithSize(SettingTool$Wonderjs.buildFakeGl(sandbox), sandbox, undefined, undefined, undefined, /* () */0);
                                    state[0] = ViewTool$Wonderjs.setCanvas(__x, state[0]);
                                    return Wonder_jest.Expect[/* toThrowMessage */21]("fovy,near,far should all exist", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                      return PerspectiveCameraProjectionTool$Wonderjs.updateCameraProjection(0, state[0]);
                                                    })));
                                  }));
                    }));
      }));

/*  Not a pure module */
