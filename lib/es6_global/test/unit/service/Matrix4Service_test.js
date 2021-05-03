

import * as Curry from "./../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../tool/TestTool.js";
import * as GlobalTempTool$Wonderjs from "../../tool/service/globalTemp/GlobalTempTool.js";
import * as Matrix4Service$Wonderjs from "../../../src/service/atom/Matrix4Service.js";
import * as CreateStateMainService$Wonderjs from "../../../src/service/state/main/state/CreateStateMainService.js";

Wonder_jest.describe("Matrix4Service", (function (param) {
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
        Wonder_jest.describe("copy", (function (param) {
                return Wonder_jest.test("copy mat4 float32Arr", (function (param) {
                              var matrix = Matrix4Service$Wonderjs.createIdentityMatrix4(/* () */0);
                              var copiedMatrix = Matrix4Service$Wonderjs.copy(matrix);
                              var copiedMatrix$1 = Matrix4Service$Wonderjs.setTranslation(/* tuple */[
                                    0.1,
                                    0.2,
                                    0.3
                                  ], copiedMatrix);
                              return Wonder_jest.Expect[/* toEqual */12](copiedMatrix$1, Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](matrix)));
                            }));
              }));
        return Wonder_jest.describe("fix bug", (function (param) {
                      return Wonder_jest.test("fix getRotation bug", (function (param) {
                                    var matrix = new Float32Array(/* array */[
                                          1.0,
                                          0.0,
                                          0.0,
                                          0.0,
                                          0.0,
                                          0.0,
                                          -1.0,
                                          0.0,
                                          0.0,
                                          1.0,
                                          0.0,
                                          0.0,
                                          0.0,
                                          0.0,
                                          0.0,
                                          1.0
                                        ]);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Matrix4Service$Wonderjs.fromTranslationRotationScale(Matrix4Service$Wonderjs.getTranslationTuple(matrix), Matrix4Service$Wonderjs.getRotationTuple(matrix), Matrix4Service$Wonderjs.getScaleTuple(matrix), GlobalTempTool$Wonderjs.getFloat32Array1(state[0]))), new Float32Array(/* array */[
                                                    1,
                                                    0,
                                                    -0,
                                                    0,
                                                    -0,
                                                    2.220446049250313e-16,
                                                    -1,
                                                    0,
                                                    0,
                                                    1,
                                                    2.220446049250313e-16,
                                                    0,
                                                    0,
                                                    0,
                                                    0,
                                                    1
                                                  ]));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
