

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../../tool/TestTool.js";
import * as GeometryAPI$Wonderjs from "../../../../../../src/api/geometry/GeometryAPI.js";
import * as MainStateTool$Wonderjs from "../../../../../tool/service/state/MainStateTool.js";

Wonder_jest.describe("cylinder geometry", (function (param) {
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
        return Wonder_jest.describe("createCylinderGeometry", (function (param) {
                      return Wonder_jest.test("create a new geometry which is just index(int)", (function (param) {
                                    var match = GeometryAPI$Wonderjs.createCylinderGeometry(1, 3, 10, 2, 2, state[0]);
                                    var geometry = match[1];
                                    var state$1 = match[0];
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                    GeometryAPI$Wonderjs.getGeometryVertices(geometry, state$1),
                                                    GeometryAPI$Wonderjs.getGeometryNormals(geometry, state$1),
                                                    GeometryAPI$Wonderjs.getGeometryTexCoords(geometry, state$1),
                                                    GeometryAPI$Wonderjs.getGeometryIndices16(geometry, state$1)
                                                  ]), /* tuple */[
                                                new Float32Array(/* array */[
                                                      0,
                                                      5,
                                                      1,
                                                      1.2246468525851679e-16,
                                                      5,
                                                      -1,
                                                      -2.4492937051703357e-16,
                                                      5,
                                                      1,
                                                      0,
                                                      0,
                                                      2,
                                                      2.4492937051703357e-16,
                                                      0,
                                                      -2,
                                                      -4.898587410340671e-16,
                                                      0,
                                                      2,
                                                      0,
                                                      -5,
                                                      3,
                                                      3.6739402930577075e-16,
                                                      -5,
                                                      -3,
                                                      -7.347880586115415e-16,
                                                      -5,
                                                      3,
                                                      0,
                                                      5,
                                                      0,
                                                      0,
                                                      5,
                                                      0,
                                                      0,
                                                      5,
                                                      1,
                                                      1.2246468525851679e-16,
                                                      5,
                                                      -1,
                                                      -2.4492937051703357e-16,
                                                      5,
                                                      1,
                                                      0,
                                                      -5,
                                                      0,
                                                      0,
                                                      -5,
                                                      0,
                                                      0,
                                                      -5,
                                                      3,
                                                      3.6739402930577075e-16,
                                                      -5,
                                                      -3,
                                                      -7.347880586115415e-16,
                                                      -5,
                                                      3
                                                    ]),
                                                new Float32Array(/* array */[
                                                      0,
                                                      1,
                                                      0.5,
                                                      1,
                                                      1,
                                                      1,
                                                      0,
                                                      0.5,
                                                      0.5,
                                                      0.5,
                                                      1,
                                                      0.5,
                                                      0,
                                                      0,
                                                      0.5,
                                                      0,
                                                      1,
                                                      0,
                                                      0.5,
                                                      0.5,
                                                      0.5,
                                                      0.5,
                                                      1,
                                                      0.5,
                                                      0,
                                                      0.5,
                                                      1,
                                                      0.5,
                                                      0.5,
                                                      0.5,
                                                      0.5,
                                                      0.5,
                                                      1,
                                                      0.5,
                                                      0,
                                                      0.5,
                                                      1,
                                                      0.5
                                                    ]),
                                                new Float32Array(/* array */[
                                                      0,
                                                      0.20000000298023224,
                                                      1,
                                                      1.2246468525851679e-16,
                                                      0.20000000298023224,
                                                      -1,
                                                      -2.4492937051703357e-16,
                                                      0.20000000298023224,
                                                      1,
                                                      0,
                                                      0.20000000298023224,
                                                      1,
                                                      1.2246468525851679e-16,
                                                      0.20000000298023224,
                                                      -1,
                                                      -2.4492937051703357e-16,
                                                      0.20000000298023224,
                                                      1,
                                                      0,
                                                      0.20000000298023224,
                                                      1,
                                                      1.2246468525851679e-16,
                                                      0.20000000298023224,
                                                      -1,
                                                      -2.4492937051703357e-16,
                                                      0.20000000298023224,
                                                      1,
                                                      0,
                                                      1,
                                                      0,
                                                      0,
                                                      1,
                                                      0,
                                                      0,
                                                      1,
                                                      0,
                                                      0,
                                                      1,
                                                      0,
                                                      0,
                                                      1,
                                                      0,
                                                      0,
                                                      -1,
                                                      0,
                                                      0,
                                                      -1,
                                                      0,
                                                      0,
                                                      -1,
                                                      0,
                                                      0,
                                                      -1,
                                                      0,
                                                      0,
                                                      -1,
                                                      0
                                                    ]),
                                                new Uint16Array(/* array */[
                                                      0,
                                                      3,
                                                      1,
                                                      3,
                                                      4,
                                                      1,
                                                      3,
                                                      6,
                                                      4,
                                                      6,
                                                      7,
                                                      4,
                                                      1,
                                                      4,
                                                      2,
                                                      4,
                                                      5,
                                                      2,
                                                      4,
                                                      7,
                                                      5,
                                                      7,
                                                      8,
                                                      5,
                                                      11,
                                                      12,
                                                      9,
                                                      12,
                                                      13,
                                                      10,
                                                      17,
                                                      16,
                                                      14,
                                                      18,
                                                      17,
                                                      15
                                                    ])
                                              ]);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
