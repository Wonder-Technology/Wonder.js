

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../../tool/TestTool.js";
import * as GeometryAPI$Wonderjs from "../../../../../../src/api/geometry/GeometryAPI.js";
import * as MainStateTool$Wonderjs from "../../../../../tool/service/state/MainStateTool.js";

Wonder_jest.describe("sphere geometry", (function (param) {
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
        return Wonder_jest.describe("createSphereGeometry", (function (param) {
                      return Wonder_jest.test("create a new geometry which is just index(int)", (function (param) {
                                    var match = GeometryAPI$Wonderjs.createSphereGeometry(0.5, 2, state[0]);
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
                                                      0.5,
                                                      0,
                                                      -0,
                                                      0.5,
                                                      0,
                                                      0,
                                                      0.5,
                                                      -0,
                                                      0.5,
                                                      3.0616171314629196e-17,
                                                      0,
                                                      -0.5,
                                                      3.0616171314629196e-17,
                                                      6.123234262925839e-17,
                                                      0.5,
                                                      3.0616171314629196e-17,
                                                      -1.2246468525851679e-16,
                                                      6.123234262925839e-17,
                                                      -0.5,
                                                      0,
                                                      -6.123234262925839e-17,
                                                      -0.5,
                                                      7.498798786105971e-33,
                                                      6.123234262925839e-17,
                                                      -0.5,
                                                      -1.4997597572211942e-32
                                                    ]),
                                                new Float32Array(/* array */[
                                                      0,
                                                      0.5,
                                                      0,
                                                      -0,
                                                      0.5,
                                                      0,
                                                      0,
                                                      0.5,
                                                      -0,
                                                      0.5,
                                                      3.0616171314629196e-17,
                                                      0,
                                                      -0.5,
                                                      3.0616171314629196e-17,
                                                      6.123234262925839e-17,
                                                      0.5,
                                                      3.0616171314629196e-17,
                                                      -1.2246468525851679e-16,
                                                      6.123234262925839e-17,
                                                      -0.5,
                                                      0,
                                                      -6.123234262925839e-17,
                                                      -0.5,
                                                      7.498798786105971e-33,
                                                      6.123234262925839e-17,
                                                      -0.5,
                                                      -1.4997597572211942e-32
                                                    ]),
                                                new Float32Array(/* array */[
                                                      1,
                                                      1,
                                                      0.5,
                                                      1,
                                                      0,
                                                      1,
                                                      1,
                                                      0.5,
                                                      0.5,
                                                      0.5,
                                                      0,
                                                      0.5,
                                                      1,
                                                      0,
                                                      0.5,
                                                      0,
                                                      0,
                                                      0
                                                    ]),
                                                new Uint16Array(/* array */[
                                                      1,
                                                      3,
                                                      0,
                                                      1,
                                                      4,
                                                      3,
                                                      2,
                                                      4,
                                                      1,
                                                      2,
                                                      5,
                                                      4,
                                                      4,
                                                      6,
                                                      3,
                                                      4,
                                                      7,
                                                      6,
                                                      5,
                                                      7,
                                                      4,
                                                      5,
                                                      8,
                                                      7
                                                    ])
                                              ]);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
