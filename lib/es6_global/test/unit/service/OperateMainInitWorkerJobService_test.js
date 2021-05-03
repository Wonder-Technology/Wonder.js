

import * as Curry from "./../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../tool/TestTool.js";
import * as OperateMainInitWorkerJobMainService$Wonderjs from "../../../src/service/state/main/job/worker/OperateMainInitWorkerJobMainService.js";

Wonder_jest.describe("OperateMainInitWorkerJobMainService", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("_findFrameJob", (function (param) {
                      return Wonder_jest.describe("contract check", (function (param) {
                                    beforeEach((function () {
                                            return TestTool$Wonderjs.openContractCheck(/* () */0);
                                          }));
                                    return Wonder_jest.test("frame job should only has one", (function (param) {
                                                  return Wonder_jest.Expect[/* toThrowMessage */21]("expect frame job only has one", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                                    return OperateMainInitWorkerJobMainService$Wonderjs._findFrameJob(/* array */[
                                                                                /* record */[
                                                                                  /* name */"frame",
                                                                                  /* link */1,
                                                                                  /* jobs */1
                                                                                ],
                                                                                /* record */[
                                                                                  /* name */"frame",
                                                                                  /* link */1,
                                                                                  /* jobs */1
                                                                                ]
                                                                              ]);
                                                                  })));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
