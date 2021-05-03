'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../tool/TestTool.js");
var GeometryTool$Wonderjs = require("../../../tool/service/geometry/GeometryTool.js");
var MainStateTool$Wonderjs = require("../../../tool/service/state/MainStateTool.js");
var BoxGeometryTool$Wonderjs = require("../../../tool/service/geometry/BoxGeometryTool.js");
var RenderStateTool$Wonderjs = require("../../../tool/state/RenderStateTool.js");

Wonder_jest.describe("GetBoxGeometryIndicesRenderService", (function (param) {
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
        return Wonder_jest.describe("getIndicesCount", (function (param) {
                      return Wonder_jest.test("get indices count", (function (param) {
                                    var match = BoxGeometryTool$Wonderjs.createGameObject(state[0]);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryTool$Wonderjs.getIndicesCount(match[2], RenderStateTool$Wonderjs.createState(match[0]))), 36);
                                  }));
                    }));
      }));

/*  Not a pure module */
