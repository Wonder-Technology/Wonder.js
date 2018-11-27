

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../tool/TestTool.js";
import * as MainStateTool$Wonderjs from "../../tool/service/state/MainStateTool.js";
import * as SparseMapService$Wonderjs from "../../../src/service/atom/SparseMapService.js";
import * as TypeArrayPoolTool$Wonderjs from "../../tool/structure/TypeArrayPoolTool.js";
import * as SparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

describe("TypeArrayPool", (function () {
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
        describe("addFloat32TypeArrayToPool", (function () {
                describe("limit pool max size", (function () {
                        return Wonder_jest.test("if exceed max size, not add", (function () {
                                      var map = SparseMapService$WonderCommonlib.createEmpty(/* () */0);
                                      var typeArr1 = new Float32Array(/* array */[1]);
                                      var typeArr2 = new Float32Array(/* array */[2]);
                                      var map$1 = TypeArrayPoolTool$Wonderjs.addFloat32TypeArrayToPool(typeArr1, 1, map);
                                      var map$2 = TypeArrayPoolTool$Wonderjs.addFloat32TypeArrayToPool(typeArr2, 1, map$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SparseMapService$Wonderjs.length(SparseMapService$WonderCommonlib.unsafeGet(1, map$2))), 1);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("addUint16TypeArrayToPool", (function () {
                describe("limit pool max size", (function () {
                        return Wonder_jest.test("if exceed max size, not add", (function () {
                                      var map = SparseMapService$WonderCommonlib.createEmpty(/* () */0);
                                      var typeArr1 = new Uint16Array(/* array */[1]);
                                      var typeArr2 = new Uint16Array(/* array */[2]);
                                      var map$1 = TypeArrayPoolTool$Wonderjs.addUint16TypeArrayToPool(typeArr1, 1, map);
                                      var map$2 = TypeArrayPoolTool$Wonderjs.addUint16TypeArrayToPool(typeArr2, 1, map$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SparseMapService$Wonderjs.length(SparseMapService$WonderCommonlib.unsafeGet(1, map$2))), 1);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
