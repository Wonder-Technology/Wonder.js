

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../tool/TestTool.js";
import * as MainStateTool$Wonderjs from "../../tool/service/state/MainStateTool.js";
import * as RenderConfigTool$Wonderjs from "../../tool/service/renderConfig/RenderConfigTool.js";

describe("RenderConfig", (function () {
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
        describe("getBasicMaterialShaderLibRecordArr", (function () {
                describe("test fatal", (function () {
                        Wonder_jest.test("if shaderLibItem->type_ unknown, fatal", (function () {
                                TestTool$Wonderjs.closeContractCheck(/* () */0);
                                return Wonder_jest.Expect[/* toThrowMessage */20]("unknown type_", Wonder_jest.Expect[/* expect */0]((function () {
                                                  return RenderConfigTool$Wonderjs.getBasicMaterialShaderLibRecordArr(0, 0, /* tuple */[
                                                              1,
                                                              /* array */[/* record */[
                                                                  /* type_ */"type1",
                                                                  /* name */""
                                                                ]],
                                                              1
                                                            ], 1);
                                                })));
                              }));
                        return Wonder_jest.test("if shaderLibItem->name unknown with type=static_branch, fatal", (function () {
                                      TestTool$Wonderjs.closeContractCheck(/* () */0);
                                      return Wonder_jest.Expect[/* toThrowMessage */20]("unknown name", Wonder_jest.Expect[/* expect */0]((function () {
                                                        return RenderConfigTool$Wonderjs.getBasicMaterialShaderLibRecordArr(0, 0, /* tuple */[
                                                                    1,
                                                                    /* array */[/* record */[
                                                                        /* type_ */"static_branch",
                                                                        /* name */"name1"
                                                                      ]],
                                                                    1
                                                                  ], 1);
                                                      })));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
