

import * as Curry from "./../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../tool/TestTool.js";
import * as SparseMapAPI$Wonderjs from "../../../src/api/structure/SparseMapAPI.js";
import * as CreateStateMainService$Wonderjs from "../../../src/service/state/main/state/CreateStateMainService.js";

Wonder_jest.describe("SparseMap", (function (param) {
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
        Wonder_jest.describe("unsafeGetSparseMapValue", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var map = SparseMapAPI$Wonderjs.setSparseMapValue(1, "aaa", SparseMapAPI$Wonderjs.createSparseMap(/* () */0));
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](SparseMapAPI$Wonderjs.unsafeGetSparseMapValue(1, map)), "aaa");
                            }));
              }));
        Wonder_jest.describe("getSparseMap", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var map = SparseMapAPI$Wonderjs.setSparseMapValue(1, "aaa", SparseMapAPI$Wonderjs.createSparseMap(/* () */0));
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              SparseMapAPI$Wonderjs.getSparseMapValue(0, map),
                                              SparseMapAPI$Wonderjs.getSparseMapValue(1, map)
                                            ]), /* tuple */[
                                          undefined,
                                          "aaa"
                                        ]);
                            }));
              }));
        return Wonder_jest.describe("mergeSparseMaps", (function (param) {
                      return Wonder_jest.test("merge sparse map arr", (function (param) {
                                    var map1 = SparseMapAPI$Wonderjs.setSparseMapValue(1, "aaa", SparseMapAPI$Wonderjs.createSparseMap(/* () */0));
                                    var map2 = SparseMapAPI$Wonderjs.setSparseMapValue(3, "b", SparseMapAPI$Wonderjs.createSparseMap(/* () */0));
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](SparseMapAPI$Wonderjs.mergeSparseMaps(/* array */[
                                                        map1,
                                                        map2
                                                      ])), SparseMapAPI$Wonderjs.setSparseMapValue(3, "b", SparseMapAPI$Wonderjs.setSparseMapValue(1, "aaa", SparseMapAPI$Wonderjs.createSparseMap(/* () */0))));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
