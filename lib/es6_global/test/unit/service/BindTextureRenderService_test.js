

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../tool/TestTool.js";
import * as CreateStateMainService$Wonderjs from "../../../src/service/state/main/state/CreateStateMainService.js";
import * as BindTextureRenderService$Wonderjs from "../../../src/service/state/render/texture/BindTextureRenderService.js";

describe("BindTextureRenderService", (function () {
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
        describe("contract check", (function () {
                return Wonder_jest.test("unit should >= 0", (function () {
                              return Wonder_jest.Expect[/* toThrowMessage */20]("unit should >= 0", Wonder_jest.Expect[/* expect */0]((function () {
                                                return BindTextureRenderService$Wonderjs.bind(1, -1, 0, 2);
                                              })));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
