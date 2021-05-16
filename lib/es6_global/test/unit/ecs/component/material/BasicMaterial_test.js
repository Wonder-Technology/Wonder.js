

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as DisposeJob$Wonderjs from "../../../../../src/job/no_worker/loop/DisposeJob.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as TypeArrayTool$Wonderjs from "../../../../tool/service/primitive/TypeArrayTool.js";
import * as GameObjectTool$Wonderjs from "../../../../tool/service/gameObject/GameObjectTool.js";
import * as AllMaterialTool$Wonderjs from "../../../../tool/service/material/AllMaterialTool.js";
import * as BasicMaterialAPI$Wonderjs from "../../../../../src/api/material/BasicMaterialAPI.js";
import * as BasicMaterialTool$Wonderjs from "../../../../tool/service/material/BasicMaterialTool.js";
import * as LightMaterialTool$Wonderjs from "../../../../tool/service/material/LightMaterialTool.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

Wonder_jest.describe("BasicMaterial", (function (param) {
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
        Wonder_jest.describe("createBasicMaterial", (function (param) {
                return Wonder_jest.test("create a new material which is just index(int)", (function (param) {
                              var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[1]), 0);
                            }));
              }));
        Wonder_jest.describe("init", (function (param) {
                return Wonder_jest.describe("contract check", (function (param) {
                              return Wonder_jest.test("shouldn't dispose any material before init", (function (param) {
                                            state[0] = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                            var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                                            var match$1 = BasicMaterialTool$Wonderjs.createGameObject(match[0]);
                                            var state$1 = BasicMaterialTool$Wonderjs.dispose(match[1], match[2], match$1[0]);
                                            return Wonder_jest.Expect[/* toThrowMessage */21]("expect not dispose any material before init", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                              BasicMaterialTool$Wonderjs.initMaterials(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                              return /* () */0;
                                                            })));
                                          }));
                            }));
              }));
        Wonder_jest.describe("unsafeGetBasicMaterialGameObjects", (function (param) {
                return Wonder_jest.test("get material's gameObjects", (function (param) {
                              var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state[0]);
                              var material = match[1];
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject1 = match$1[1];
                              var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
                              var gameObject2 = match$2[1];
                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject1, material, match$2[0]);
                              var state$2 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject2, material, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialGameObjects(material, state$2)), /* array */[
                                          gameObject1,
                                          gameObject2
                                        ]);
                            }));
              }));
        Wonder_jest.describe("operate data", (function (param) {
                Wonder_jest.test("get the data from array buffer may not equal to the value which is setted", (function (param) {
                        var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state[0]);
                        var material = match[1];
                        var color = /* array */[
                          0.2,
                          0.3,
                          0.5
                        ];
                        var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialColor(material, color, match[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialAPI$Wonderjs.getBasicMaterialColor(material, state$1)), /* array */[
                                    0.20000000298023224,
                                    0.30000001192092896,
                                    0.5
                                  ]);
                      }));
                Wonder_jest.describe("getBasicMaterialColor", (function (param) {
                        return Wonder_jest.test("test default color", (function (param) {
                                      var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialAPI$Wonderjs.getBasicMaterialColor(match[1], match[0])), /* array */[
                                                  1,
                                                  1,
                                                  1
                                                ]);
                                    }));
                      }));
                Wonder_jest.describe("setBasicMaterialColor", (function (param) {
                        return Wonder_jest.test("test set color", (function (param) {
                                      var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state[0]);
                                      var material = match[1];
                                      var color = /* array */[
                                        0.2,
                                        0.3,
                                        0.5
                                      ];
                                      var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialColor(material, color, match[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TypeArrayTool$Wonderjs.truncateArray(BasicMaterialAPI$Wonderjs.getBasicMaterialColor(material, state$1))), color);
                                    }));
                      }));
                Wonder_jest.describe("getBasicMaterialIsDepthTest", (function (param) {
                        return Wonder_jest.test("test default isDepthTest", (function (param) {
                                      var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialAPI$Wonderjs.getBasicMaterialIsDepthTest(match[1], match[0])), true);
                                    }));
                      }));
                Wonder_jest.describe("setBasicMaterialIsDepthTest", (function (param) {
                        return Wonder_jest.test("test set isDepthTest", (function (param) {
                                      var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state[0]);
                                      var material = match[1];
                                      var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialIsDepthTest(material, false, match[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialAPI$Wonderjs.getBasicMaterialIsDepthTest(material, state$1)), false);
                                    }));
                      }));
                Wonder_jest.describe("getBasicMaterialAlpha", (function (param) {
                        return Wonder_jest.test("test default alpha", (function (param) {
                                      var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialAPI$Wonderjs.getBasicMaterialAlpha(match[1], match[0])), 1.0);
                                    }));
                      }));
                return Wonder_jest.describe("setBasicMaterialAlpha", (function (param) {
                              return Wonder_jest.test("test set alpha", (function (param) {
                                            var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state[0]);
                                            var material = match[1];
                                            var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialAlpha(material, 0.5, match[0]);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialAPI$Wonderjs.getBasicMaterialAlpha(material, state$1)), 0.5);
                                          }));
                            }));
              }));
        Wonder_jest.describe("disposeComponent", (function (param) {
                Wonder_jest.describe("dispose data", (function (param) {
                        Wonder_jest.describe("test dispose shared material", (function (param) {
                                return Wonder_jest.test("remove gameObject", (function (param) {
                                              var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state[0]);
                                              var basicMaterial1 = match[1];
                                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                              var gameObject1 = match$1[1];
                                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject1, basicMaterial1, match$1[0]);
                                              var match$2 = GameObjectAPI$Wonderjs.createGameObject(state$1);
                                              var gameObject2 = match$2[1];
                                              var state$2 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject2, basicMaterial1, match$2[0]);
                                              var match$3 = GameObjectAPI$Wonderjs.createGameObject(state$2);
                                              var gameObject3 = match$3[1];
                                              var state$3 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject3, basicMaterial1, match$3[0]);
                                              var state$4 = GameObjectTool$Wonderjs.disposeGameObjectBasicMaterialComponent(gameObject1, basicMaterial1, state$3);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialGameObjects(basicMaterial1, state$4)), /* array */[
                                                          gameObject2,
                                                          gameObject3
                                                        ]);
                                            }));
                              }));
                        Wonder_jest.describe("test dispose not shared material", (function (param) {
                                Wonder_jest.test("remove from gameObjectsMap, nameMap", (function (param) {
                                        var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                                        var material1 = match[2];
                                        var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialName(material1, "name", match[0]);
                                        var state$2 = GameObjectTool$Wonderjs.disposeGameObjectBasicMaterialComponent(match[1], material1, state$1);
                                        var match$1 = BasicMaterialTool$Wonderjs.getRecord(state$2);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        BasicMaterialTool$Wonderjs.hasGameObject(material1, state$2),
                                                        MutableSparseMapService$WonderCommonlib.has(material1, match$1[/* nameMap */9])
                                                      ]), /* tuple */[
                                                    false,
                                                    false
                                                  ]);
                                      }));
                                return Wonder_jest.describe("test remove from type array", (function (param) {
                                              var _testRemoveFromTypeArr = function (state, valueTuple, defaultValue, param) {
                                                return AllMaterialTool$Wonderjs.testRemoveFromTypeArr(state, valueTuple, defaultValue, /* tuple */[
                                                            GameObjectTool$Wonderjs.disposeGameObjectBasicMaterialComponent,
                                                            param[0],
                                                            param[1],
                                                            param[2]
                                                          ]);
                                              };
                                              Wonder_jest.describe("remove from shaderIndices", (function (param) {
                                                      return Wonder_jest.test("reset removed one's value", (function (param) {
                                                                    return _testRemoveFromTypeArr(state, /* tuple */[
                                                                                1,
                                                                                2
                                                                              ], BasicMaterialTool$Wonderjs.getDefaultShaderIndex(state[0]), /* tuple */[
                                                                                BasicMaterialTool$Wonderjs.createGameObject,
                                                                                BasicMaterialTool$Wonderjs.getShaderIndex,
                                                                                BasicMaterialTool$Wonderjs.setShaderIndex
                                                                              ]);
                                                                  }));
                                                    }));
                                              return Wonder_jest.describe("remove from colors", (function (param) {
                                                            return Wonder_jest.test("reset removed one's value", (function (param) {
                                                                          return _testRemoveFromTypeArr(state, /* tuple */[
                                                                                      /* array */[
                                                                                        1,
                                                                                        0.2,
                                                                                        0.3
                                                                                      ],
                                                                                      /* array */[
                                                                                        0,
                                                                                        0.2,
                                                                                        0.3
                                                                                      ]
                                                                                    ], BasicMaterialTool$Wonderjs.getDefaultColor(state[0]), /* tuple */[
                                                                                      BasicMaterialTool$Wonderjs.createGameObject,
                                                                                      (function (material, state) {
                                                                                          return TypeArrayTool$Wonderjs.truncateArray(BasicMaterialAPI$Wonderjs.getBasicMaterialColor(material, state));
                                                                                        }),
                                                                                      BasicMaterialAPI$Wonderjs.setBasicMaterialColor
                                                                                    ]);
                                                                        }));
                                                          }));
                                            }));
                              }));
                        return Wonder_jest.describe("fix bug", (function (param) {
                                      return Wonder_jest.test("if have create other gameObjects, shouldn't affect dispose basicMaterial gameObjects", (function (param) {
                                                    var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                                                    var match$1 = BasicMaterialTool$Wonderjs.createGameObject(match[0]);
                                                    var state$1 = DisposeJob$Wonderjs.execJob(undefined, GameObjectAPI$Wonderjs.batchDisposeGameObject(/* array */[
                                                              match[1],
                                                              match$1[1]
                                                            ], match$1[0]));
                                                    var match$2 = BasicMaterialTool$Wonderjs.createGameObject(state$1);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialGameObjects(match$2[2], match$2[0])), /* array */[match$2[1]]);
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("test add new one after dispose old one", (function (param) {
                              Wonder_jest.test("new one's data should be default value", (function (param) {
                                      var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                                      var material1 = match[2];
                                      var color = /* array */[
                                        0.2,
                                        0.3,
                                        0.5
                                      ];
                                      var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialColor(material1, color, match[0]);
                                      var match$1 = BasicMaterialTool$Wonderjs.createGameObject(state$1);
                                      var state$2 = GameObjectTool$Wonderjs.disposeGameObjectBasicMaterialComponent(match[1], material1, match$1[0]);
                                      var match$2 = BasicMaterialTool$Wonderjs.createGameObject(state$2);
                                      var state$3 = match$2[0];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialAPI$Wonderjs.getBasicMaterialColor(match$2[2], state$3)), BasicMaterialTool$Wonderjs.getDefaultColor(state$3));
                                    }));
                              Wonder_jest.test("use disposed index as new index firstly", (function (param) {
                                      var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                                      var material1 = match[2];
                                      var match$1 = BasicMaterialTool$Wonderjs.createGameObject(match[0]);
                                      var state$1 = GameObjectTool$Wonderjs.disposeGameObjectBasicMaterialComponent(match[1], material1, match$1[0]);
                                      var match$2 = BasicMaterialTool$Wonderjs.createGameObject(state$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match$2[2]), material1);
                                    }));
                              return Wonder_jest.test("if has no disposed index, get index from materialData.index", (function (param) {
                                            var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                                            var material1 = match[2];
                                            var match$1 = BasicMaterialTool$Wonderjs.createGameObject(match[0]);
                                            var state$1 = GameObjectTool$Wonderjs.disposeGameObjectBasicMaterialComponent(match[1], material1, match$1[0]);
                                            var match$2 = BasicMaterialTool$Wonderjs.createGameObject(state$1);
                                            var match$3 = BasicMaterialTool$Wonderjs.createGameObject(match$2[0]);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            match$2[2],
                                                            match$3[2]
                                                          ]), /* tuple */[
                                                        material1,
                                                        match$1[2] + 1 | 0
                                                      ]);
                                          }));
                            }));
              }));
        Wonder_jest.describe("getAllBasicMaterials", (function (param) {
                var _createBasicMaterialGameObjects = function (state) {
                  var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                  var match$1 = BasicMaterialTool$Wonderjs.createGameObject(match[0]);
                  var match$2 = BasicMaterialTool$Wonderjs.createGameObject(match$1[0]);
                  return /* tuple */[
                          match$2[0],
                          /* tuple */[
                            match[1],
                            match$1[1],
                            match$2[1]
                          ],
                          /* tuple */[
                            match[2],
                            match$1[2],
                            match$2[2]
                          ]
                        ];
                };
                Wonder_jest.test("get all components include the ones add or not add to gameObject", (function (param) {
                        var match = _createBasicMaterialGameObjects(state);
                        var match$1 = match[2];
                        var match$2 = BasicMaterialAPI$Wonderjs.createBasicMaterial(match[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialAPI$Wonderjs.getAllBasicMaterials(match$2[0])), /* array */[
                                    match$1[0],
                                    match$1[1],
                                    match$1[2],
                                    match$2[1]
                                  ]);
                      }));
                return Wonder_jest.test("test dispose", (function (param) {
                              var match = _createBasicMaterialGameObjects(state);
                              var match$1 = match[1];
                              var state$1 = GameObjectAPI$Wonderjs.disposeGameObject(match$1[2], GameObjectAPI$Wonderjs.disposeGameObject(match$1[1], match[0]));
                              var state$2 = DisposeJob$Wonderjs.execJob(undefined, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllBasicMaterialComponents(state$2)), /* array */[match[2][0]]);
                            }));
              }));
        Wonder_jest.describe("batchDisposeBasicMaterial", (function (param) {
                var _exec = function (materialArr, state) {
                  var state$1 = BasicMaterialAPI$Wonderjs.batchDisposeBasicMaterial(materialArr, state);
                  return DisposeJob$Wonderjs.execJob(undefined, state$1);
                };
                Wonder_jest.describe("if material has gameObjects", (function (param) {
                        var _prepareAndExec = function (state) {
                          var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state[0]);
                          var match$1 = BasicMaterialTool$Wonderjs.createGameObject(match[0]);
                          var material2 = match$1[2];
                          var match$2 = BasicMaterialTool$Wonderjs.createGameObject(match$1[0]);
                          var material3 = match$2[2];
                          var state$1 = _exec(/* array */[
                                material2,
                                material3
                              ], match$2[0]);
                          return /* tuple */[
                                  state$1,
                                  /* tuple */[
                                    match[1],
                                    material2,
                                    material3
                                  ]
                                ];
                        };
                        Wonder_jest.test("remove from gameObject", (function (param) {
                                var match = _prepareAndExec(state);
                                var match$1 = match[1];
                                var state$1 = match[0];
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                BasicMaterialTool$Wonderjs.hasGameObject(match$1[1], state$1),
                                                BasicMaterialTool$Wonderjs.hasGameObject(match$1[2], state$1)
                                              ]), /* tuple */[
                                            false,
                                            false
                                          ]);
                              }));
                        return Wonder_jest.test("dispose material data", (function (param) {
                                      var match = _prepareAndExec(state);
                                      var match$1 = match[1];
                                      var state$1 = match[0];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      BasicMaterialTool$Wonderjs.isMaterialDisposed(match$1[0], state$1),
                                                      BasicMaterialTool$Wonderjs.isMaterialDisposed(match$1[1], state$1),
                                                      BasicMaterialTool$Wonderjs.isMaterialDisposed(match$1[2], state$1)
                                                    ]), /* tuple */[
                                                  false,
                                                  true,
                                                  true
                                                ]);
                                    }));
                      }));
                return Wonder_jest.describe("else", (function (param) {
                              return Wonder_jest.test("dispose material data", (function (param) {
                                            var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state[0]);
                                            var material1 = match[1];
                                            var match$1 = BasicMaterialAPI$Wonderjs.createBasicMaterial(match[0]);
                                            var material2 = match$1[1];
                                            var state$1 = _exec(/* array */[
                                                  material1,
                                                  material2
                                                ], match$1[0]);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            BasicMaterialTool$Wonderjs.isMaterialDisposed(material1, state$1),
                                                            BasicMaterialTool$Wonderjs.isMaterialDisposed(material2, state$1)
                                                          ]), /* tuple */[
                                                        true,
                                                        true
                                                      ]);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("contract check: is alive", (function (param) {
                      return Wonder_jest.describe("if material is disposed", (function (param) {
                                    return Wonder_jest.test("unsafeGetBasicMaterialGameObjects should error", (function (param) {
                                                  var getFunc = BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialGameObjects;
                                                  var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state[0]);
                                                  var material = match[1];
                                                  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                                  var gameObject = match$1[1];
                                                  var state$1 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, material, match$1[0]);
                                                  var state$2 = GameObjectTool$Wonderjs.disposeGameObjectBasicMaterialComponent(gameObject, material, state$1);
                                                  return Wonder_jest.Expect[/* toThrowMessage */21]("expect component alive, but actual not", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                                    return Curry._2(getFunc, material, state$2);
                                                                  })));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
