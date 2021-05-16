

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../tool/TestTool.js";
import * as GenerateAllABTool$Wonderjs from "../../integration/no_worker/asset_bundle/tool/GenerateAllABTool.js";
import * as CreateStateMainService$Wonderjs from "../../../src/service/state/main/state/CreateStateMainService.js";
import * as FindDependencyDataSystem$Wonderjs from "../../../src/asset_bundle/all/dependency/FindDependencyDataSystem.js";

Wonder_jest.describe("FindDependencyDataSystem", (function (param) {
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
        Wonder_jest.describe("findAllDependencyRABRelativePathByDepthSearch", (function (param) {
                Wonder_jest.test("test1", (function (param) {
                        var abRelativePath = "a.sab";
                        var rab1RelativePath = "rab1.rab";
                        var rab2RelativePath = "rab2.rab";
                        var rab3RelativePath = "rab3.rab";
                        var wholeDependencyRelationMap = GenerateAllABTool$Wonderjs.buildDependencyRelation(/* array */[
                              /* array */[
                                abRelativePath,
                                rab2RelativePath
                              ],
                              /* array */[
                                rab2RelativePath,
                                rab1RelativePath,
                                rab3RelativePath
                              ],
                              /* array */[
                                "rab4.rab",
                                "rab5.rab"
                              ],
                              /* array */[
                                rab1RelativePath,
                                rab3RelativePath
                              ]
                            ]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FindDependencyDataSystem$Wonderjs.findAllDependencyRABRelativePathByDepthSearch(abRelativePath, wholeDependencyRelationMap)), /* array */[
                                    rab3RelativePath,
                                    rab1RelativePath,
                                    rab2RelativePath
                                  ]);
                      }));
                return Wonder_jest.test("test2", (function (param) {
                              var abRelativePath = "a.sab";
                              var rab1RelativePath = "rab1.rab";
                              var rab2RelativePath = "rab2.rab";
                              var rab3RelativePath = "rab3.rab";
                              var rab4RelativePath = "rab4.rab";
                              var rab5RelativePath = "rab5.rab";
                              var wholeDependencyRelationMap = GenerateAllABTool$Wonderjs.buildDependencyRelation(/* array */[
                                    /* array */[
                                      abRelativePath,
                                      rab2RelativePath
                                    ],
                                    /* array */[
                                      rab2RelativePath,
                                      rab1RelativePath,
                                      rab3RelativePath
                                    ],
                                    /* array */[
                                      rab4RelativePath,
                                      rab5RelativePath
                                    ],
                                    /* array */[
                                      rab1RelativePath,
                                      rab3RelativePath
                                    ],
                                    /* array */[
                                      rab3RelativePath,
                                      rab4RelativePath
                                    ]
                                  ]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FindDependencyDataSystem$Wonderjs.findAllDependencyRABRelativePathByDepthSearch(abRelativePath, wholeDependencyRelationMap)), /* array */[
                                          rab5RelativePath,
                                          rab4RelativePath,
                                          rab3RelativePath,
                                          rab1RelativePath,
                                          rab2RelativePath
                                        ]);
                            }));
              }));
        return Wonder_jest.describe("findAllDependencyRABRelativePathByBreadthSearch", (function (param) {
                      Wonder_jest.test("test1", (function (param) {
                              var abRelativePath = "a.sab";
                              var rab1RelativePath = "rab1.rab";
                              var rab2RelativePath = "rab2.rab";
                              var rab3RelativePath = "rab3.rab";
                              var wholeDependencyRelationMap = GenerateAllABTool$Wonderjs.buildDependencyRelation(/* array */[
                                    /* array */[
                                      abRelativePath,
                                      rab2RelativePath
                                    ],
                                    /* array */[
                                      rab2RelativePath,
                                      rab1RelativePath,
                                      rab3RelativePath
                                    ],
                                    /* array */[
                                      "rab4.rab",
                                      "rab5.rab"
                                    ],
                                    /* array */[
                                      rab1RelativePath,
                                      rab3RelativePath
                                    ]
                                  ]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FindDependencyDataSystem$Wonderjs.findAllDependencyRABRelativePathByBreadthSearch(abRelativePath, wholeDependencyRelationMap)), /* array */[
                                          /* array */[rab3RelativePath],
                                          /* array */[rab1RelativePath],
                                          /* array */[rab2RelativePath]
                                        ]);
                            }));
                      return Wonder_jest.test("test2", (function (param) {
                                    var abRelativePath = "a.sab";
                                    var rab1RelativePath = "rab1.rab";
                                    var rab2RelativePath = "rab2.rab";
                                    var rab3RelativePath = "rab3.rab";
                                    var rab4RelativePath = "rab4.rab";
                                    var rab5RelativePath = "rab5.rab";
                                    var wholeDependencyRelationMap = GenerateAllABTool$Wonderjs.buildDependencyRelation(/* array */[
                                          /* array */[
                                            abRelativePath,
                                            rab2RelativePath
                                          ],
                                          /* array */[
                                            rab2RelativePath,
                                            rab1RelativePath,
                                            rab3RelativePath
                                          ],
                                          /* array */[
                                            rab1RelativePath,
                                            rab3RelativePath
                                          ],
                                          /* array */[
                                            rab3RelativePath,
                                            rab4RelativePath,
                                            rab5RelativePath
                                          ]
                                        ]);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FindDependencyDataSystem$Wonderjs.findAllDependencyRABRelativePathByBreadthSearch(abRelativePath, wholeDependencyRelationMap)), /* array */[
                                                /* array */[
                                                  rab4RelativePath,
                                                  rab5RelativePath
                                                ],
                                                /* array */[rab3RelativePath],
                                                /* array */[rab1RelativePath],
                                                /* array */[rab2RelativePath]
                                              ]);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
