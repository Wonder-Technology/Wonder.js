

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../tool/TestTool.js";
import * as GeometryTool$Wonderjs from "../../../tool/service/geometry/GeometryTool.js";
import * as MainStateTool$Wonderjs from "../../../tool/service/state/MainStateTool.js";
import * as BoxGeometryTool$Wonderjs from "../../../tool/service/geometry/BoxGeometryTool.js";
import * as RenderStateTool$Wonderjs from "../../../tool/state/RenderStateTool.js";

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

export {
  
}
/*  Not a pure module */
