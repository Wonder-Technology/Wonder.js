'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../tool/TestTool.js");
var MainStateTool$Wonderjs = require("../../tool/service/state/MainStateTool.js");
var RenderConfigTool$Wonderjs = require("../../tool/service/renderConfig/RenderConfigTool.js");

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

/*  Not a pure module */
