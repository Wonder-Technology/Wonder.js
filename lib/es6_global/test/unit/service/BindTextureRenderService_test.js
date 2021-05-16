

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../tool/TestTool.js";
import * as CreateStateMainService$Wonderjs from "../../../src/service/state/main/state/CreateStateMainService.js";
import * as BindTextureRenderService$Wonderjs from "../../../src/service/state/render/texture/BindTextureRenderService.js";

Wonder_jest.describe("BindTextureRenderService", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("contract check", (function (param) {
                      return Wonder_jest.test("unit should >= 0", (function (param) {
                                    return Wonder_jest.Expect[/* toThrowMessage */21]("unit should >= 0", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                      return BindTextureRenderService$Wonderjs.bind(1, -1, /* tuple */[
                                                                  0,
                                                                  /* BasicSource */0
                                                                ], 2);
                                                    })));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
