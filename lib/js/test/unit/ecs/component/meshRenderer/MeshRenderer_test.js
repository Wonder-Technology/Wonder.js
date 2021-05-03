'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var GameObjectTool$Wonderjs = require("../../../../tool/service/gameObject/GameObjectTool.js");
var MeshRendererAPI$Wonderjs = require("../../../../../src/api/MeshRendererAPI.js");
var BasicMaterialAPI$Wonderjs = require("../../../../../src/api/material/BasicMaterialAPI.js");
var MeshRendererTool$Wonderjs = require("../../../../tool/service/meshRenderer/MeshRendererTool.js");
var MutableSparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/MutableSparseMapService.js");

Wonder_jest.describe("MeshRenderer", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _prepareTwo = function (state) {
          var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state);
          var match$1 = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(match[0]);
          return /* tuple */[
                  match$1[0],
                  match[1],
                  match[2],
                  match$1[1],
                  match$1[2]
                ];
        };
        var _prepareThree = function (state) {
          var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state);
          var match$1 = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(match[0]);
          var match$2 = MeshRendererTool$Wonderjs.createLightMaterialGameObject(match$1[0]);
          return /* tuple */[
                  match$2[0],
                  match[1],
                  match[2],
                  match$1[1],
                  match$1[2],
                  match$2[1],
                  match$2[2]
                ];
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("getMeshRendererDrawMode", (function (param) {
                return Wonder_jest.test("default value is TRIANGLES", (function (param) {
                              var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererAPI$Wonderjs.getMeshRendererDrawMode(match[2], match[0])), MeshRendererTool$Wonderjs.getTriangles(/* () */0));
                            }));
              }));
        Wonder_jest.describe("setMeshRendererDrawMode", (function (param) {
                return Wonder_jest.test("set draw mode", (function (param) {
                              var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state[0]);
                              var meshRenderer1 = match[2];
                              var state$1 = MeshRendererAPI$Wonderjs.setMeshRendererDrawMode(meshRenderer1, MeshRendererTool$Wonderjs.getLines(/* () */0), match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererAPI$Wonderjs.getMeshRendererDrawMode(meshRenderer1, state$1)), MeshRendererTool$Wonderjs.getLines(/* () */0));
                            }));
              }));
        Wonder_jest.describe("getMeshRendererIsRender", (function (param) {
                return Wonder_jest.test("default value is render", (function (param) {
                              var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererAPI$Wonderjs.getMeshRendererIsRender(match[2], match[0])), true);
                            }));
              }));
        Wonder_jest.describe("setMeshRendererIsRender", (function (param) {
                Wonder_jest.describe("if meshRenderer->gameObject isn't active", (function (param) {
                        Wonder_jest.test("set meshRenderer->isRender to true should warn", (function (param) {
                                var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state[0]);
                                var meshRenderer1 = match[2];
                                var gameObject1 = match[1];
                                var state$1 = GameObjectAPI$Wonderjs.setGameObjectIsActive(gameObject1, false, match[0]);
                                MeshRendererAPI$Wonderjs.setMeshRendererIsRender(meshRenderer1, true, state$1);
                                return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withOneArg("meshRenderer:" + (String(meshRenderer1) + (" -> gameObject:" + (String(gameObject1) + " isn\'t active, can\'t set meshRenderer->isRender to true"))), warn)));
                              }));
                        return Wonder_jest.test("set meshRenderer->isRender to true should not work", (function (param) {
                                      var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state[0]);
                                      var meshRenderer1 = match[2];
                                      var state$1 = GameObjectAPI$Wonderjs.setGameObjectIsActive(match[1], false, match[0]);
                                      var state$2 = MeshRendererAPI$Wonderjs.setMeshRendererIsRender(meshRenderer1, true, state$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererAPI$Wonderjs.getMeshRendererIsRender(meshRenderer1, state$2)), false);
                                    }));
                      }));
                return Wonder_jest.describe("else, set meshRenderer->isRender to true should work", (function (param) {
                              Wonder_jest.test("set is render", (function (param) {
                                      var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state[0]);
                                      var meshRenderer1 = match[2];
                                      var state$1 = MeshRendererAPI$Wonderjs.setMeshRendererIsRender(meshRenderer1, false, match[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererAPI$Wonderjs.getMeshRendererIsRender(meshRenderer1, state$1)), false);
                                    }));
                              Wonder_jest.test("if isRender === false, remove from renderIndexArray", (function (param) {
                                      var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state[0]);
                                      var state$1 = MeshRendererAPI$Wonderjs.setMeshRendererIsRender(match[2], false, match[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererTool$Wonderjs.getBasicMaterialRenderGameObjectArray(state$1)), /* array */[]);
                                    }));
                              Wonder_jest.test("if isRender === true, add to renderIndexArray", (function (param) {
                                      var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state[0]);
                                      var meshRenderer1 = match[2];
                                      var state$1 = MeshRendererAPI$Wonderjs.setMeshRendererIsRender(meshRenderer1, false, match[0]);
                                      var state$2 = MeshRendererAPI$Wonderjs.setMeshRendererIsRender(meshRenderer1, true, state$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererTool$Wonderjs.getBasicMaterialRenderGameObjectArray(state$2)), /* array */[match[1]]);
                                    }));
                              return Wonder_jest.describe("test isRender not change", (function (param) {
                                            Wonder_jest.test("test isRender === false", (function (param) {
                                                    var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state[0]);
                                                    var meshRenderer1 = match[2];
                                                    var state$1 = MeshRendererAPI$Wonderjs.setMeshRendererIsRender(meshRenderer1, false, match[0]);
                                                    var state$2 = MeshRendererAPI$Wonderjs.setMeshRendererIsRender(meshRenderer1, false, state$1);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererTool$Wonderjs.getBasicMaterialRenderGameObjectArray(state$2)), /* array */[]);
                                                  }));
                                            return Wonder_jest.test("test isRender === true", (function (param) {
                                                          var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state[0]);
                                                          var meshRenderer1 = match[2];
                                                          var state$1 = MeshRendererAPI$Wonderjs.setMeshRendererIsRender(meshRenderer1, true, match[0]);
                                                          var state$2 = MeshRendererAPI$Wonderjs.setMeshRendererIsRender(meshRenderer1, true, state$1);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererTool$Wonderjs.getBasicMaterialRenderGameObjectArray(state$2)), /* array */[match[1]]);
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("getBasicMaterialRenderGameObjectArray", (function (param) {
                return Wonder_jest.test("get array of gameObject which has meshRenderer component and basicMaterial component", (function (param) {
                              var match = _prepareThree(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererTool$Wonderjs.getBasicMaterialRenderGameObjectArray(match[0])), /* array */[
                                          match[1],
                                          match[3]
                                        ]);
                            }));
              }));
        Wonder_jest.describe("getLightMaterialRenderGameObjectArray", (function (param) {
                return Wonder_jest.test("get array of gameObject which has meshRenderer component and lightMaterial component", (function (param) {
                              var match = _prepareThree(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererTool$Wonderjs.getLightMaterialRenderGameObjectArray(match[0])), /* array */[match[5]]);
                            }));
              }));
        Wonder_jest.describe("test add component", (function (param) {
                Wonder_jest.test("if isRender === false, not add to renderIndexArray", (function (param) {
                        var match = MeshRendererAPI$Wonderjs.createMeshRenderer(state[0]);
                        var meshRenderer = match[1];
                        var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                        var gameObject = match$1[1];
                        var match$2 = BasicMaterialAPI$Wonderjs.createBasicMaterial(match$1[0]);
                        var state$1 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, match$2[1], match$2[0]);
                        var state$2 = MeshRendererAPI$Wonderjs.setMeshRendererIsRender(meshRenderer, false, state$1);
                        var state$3 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, state$2);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererTool$Wonderjs.getBasicMaterialRenderGameObjectArray(state$3)), /* array */[]);
                      }));
                Wonder_jest.test("else, add to renderIndexArray", (function (param) {
                        var match = MeshRendererAPI$Wonderjs.createMeshRenderer(state[0]);
                        var meshRenderer = match[1];
                        var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                        var gameObject = match$1[1];
                        var match$2 = BasicMaterialAPI$Wonderjs.createBasicMaterial(match$1[0]);
                        var state$1 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, match$2[1], match$2[0]);
                        var state$2 = MeshRendererAPI$Wonderjs.setMeshRendererIsRender(meshRenderer, true, state$1);
                        var state$3 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, state$2);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererTool$Wonderjs.getBasicMaterialRenderGameObjectArray(state$3)), /* array */[gameObject]);
                      }));
                return Wonder_jest.describe("should add meshRenderer component after add material component", (function (param) {
                              Wonder_jest.test("test basic material", (function (param) {
                                      var match = MeshRendererAPI$Wonderjs.createMeshRenderer(state[0]);
                                      var meshRenderer = match[1];
                                      var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                      var gameObject = match$1[1];
                                      var state$1 = match$1[0];
                                      return Wonder_jest.Expect[/* toThrowMessage */21]("should add material component before add meshRenderer component", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                        GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, state$1);
                                                        return /* () */0;
                                                      })));
                                    }));
                              return Wonder_jest.test("test light material", (function (param) {
                                            var match = MeshRendererAPI$Wonderjs.createMeshRenderer(state[0]);
                                            var meshRenderer = match[1];
                                            var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                            var gameObject = match$1[1];
                                            var state$1 = match$1[0];
                                            return Wonder_jest.Expect[/* toThrowMessage */21]("should add material component before add meshRenderer component", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                              GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, state$1);
                                                              return /* () */0;
                                                            })));
                                          }));
                            }));
              }));
        Wonder_jest.describe("disposeComponent", (function (param) {
                Wonder_jest.describe("dispose data", (function (param) {
                        Wonder_jest.test("remove from gameObjectMap", (function (param) {
                                var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state[0]);
                                var meshRenderer1 = match[2];
                                var state$1 = GameObjectTool$Wonderjs.disposeGameObjectMeshRendererComponent(match[1], meshRenderer1, match[0]);
                                var match$1 = MeshRendererTool$Wonderjs.getRecord(state$1);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MutableSparseMapService$WonderCommonlib.has(meshRenderer1, match$1[/* gameObjectMap */6])), false);
                              }));
                        Wonder_jest.describe("remove from basicMaterialRenderGameObjectArray", (function (param) {
                                Wonder_jest.test("test getBasicMaterialRenderGameObjectArray", (function (param) {
                                        var match = _prepareTwo(state[0]);
                                        var state$1 = GameObjectTool$Wonderjs.disposeGameObjectMeshRendererComponent(match[1], match[2], match[0]);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererTool$Wonderjs.getBasicMaterialRenderGameObjectArray(state$1)), /* array */[match[3]]);
                                      }));
                                return Wonder_jest.test("test add gameObject after dispose", (function (param) {
                                              var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state[0]);
                                              var state$1 = GameObjectTool$Wonderjs.disposeGameObjectMeshRendererComponent(match[1], match[2], match[0]);
                                              var match$1 = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state$1);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererTool$Wonderjs.getBasicMaterialRenderGameObjectArray(match$1[0])), /* array */[match$1[1]]);
                                            }));
                              }));
                        Wonder_jest.describe("remove from lightMaterialRenderGameObjectArray", (function (param) {
                                var _prepare = function (state) {
                                  var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state);
                                  var match$1 = MeshRendererTool$Wonderjs.createLightMaterialGameObject(match[0]);
                                  var match$2 = MeshRendererTool$Wonderjs.createLightMaterialGameObject(match$1[0]);
                                  return /* tuple */[
                                          match$2[0],
                                          match[1],
                                          match[2],
                                          match$1[1],
                                          match$1[2],
                                          match$2[1],
                                          match$2[2]
                                        ];
                                };
                                Wonder_jest.test("test getLightMaterialRenderGameObjectArray", (function (param) {
                                        var match = _prepare(state[0]);
                                        var state$1 = GameObjectTool$Wonderjs.disposeGameObjectMeshRendererComponent(match[3], match[4], match[0]);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererTool$Wonderjs.getLightMaterialRenderGameObjectArray(state$1)), /* array */[match[5]]);
                                      }));
                                return Wonder_jest.test("test add gameObject after dispose", (function (param) {
                                              var match = _prepare(state[0]);
                                              var state$1 = GameObjectTool$Wonderjs.disposeGameObjectMeshRendererComponent(match[3], match[4], match[0]);
                                              var match$1 = MeshRendererTool$Wonderjs.createLightMaterialGameObject(state$1);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererTool$Wonderjs.getLightMaterialRenderGameObjectArray(match$1[0])), /* array */[
                                                          match$1[1],
                                                          match[5]
                                                        ]);
                                            }));
                              }));
                        return Wonder_jest.describe("test remove from type array", (function (param) {
                                      Wonder_jest.test("remove from drawModes", (function (param) {
                                              var match = MeshRendererTool$Wonderjs.createLightMaterialGameObject(state[0]);
                                              var meshRenderer1 = match[2];
                                              var match$1 = MeshRendererTool$Wonderjs.createLightMaterialGameObject(match[0]);
                                              var meshRenderer2 = match$1[2];
                                              var drawMode1 = MeshRendererTool$Wonderjs.getPoints(/* () */0);
                                              var drawMode2 = MeshRendererTool$Wonderjs.getLines(/* () */0);
                                              var state$1 = MeshRendererAPI$Wonderjs.setMeshRendererDrawMode(meshRenderer1, drawMode1, match$1[0]);
                                              var state$2 = MeshRendererAPI$Wonderjs.setMeshRendererDrawMode(meshRenderer2, drawMode2, state$1);
                                              var state$3 = GameObjectTool$Wonderjs.disposeGameObjectMeshRendererComponent(match[1], meshRenderer1, state$2);
                                              TestTool$Wonderjs.closeContractCheck(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              MeshRendererAPI$Wonderjs.getMeshRendererDrawMode(meshRenderer1, state$3),
                                                              MeshRendererAPI$Wonderjs.getMeshRendererDrawMode(meshRenderer2, state$3)
                                                            ]), /* tuple */[
                                                          MeshRendererTool$Wonderjs.getDefaultDrawMode(/* () */0),
                                                          drawMode2
                                                        ]);
                                            }));
                                      return Wonder_jest.test("remove from isRenders", (function (param) {
                                                    var match = MeshRendererTool$Wonderjs.createLightMaterialGameObject(state[0]);
                                                    var meshRenderer1 = match[2];
                                                    var match$1 = MeshRendererTool$Wonderjs.createLightMaterialGameObject(match[0]);
                                                    var meshRenderer2 = match$1[2];
                                                    var isRender1 = !MeshRendererTool$Wonderjs.getDefaultIsRender(/* () */0);
                                                    var isRender2 = !MeshRendererTool$Wonderjs.getDefaultIsRender(/* () */0);
                                                    var state$1 = MeshRendererAPI$Wonderjs.setMeshRendererIsRender(meshRenderer1, isRender1, match$1[0]);
                                                    var state$2 = MeshRendererAPI$Wonderjs.setMeshRendererIsRender(meshRenderer2, isRender2, state$1);
                                                    var state$3 = GameObjectTool$Wonderjs.disposeGameObjectMeshRendererComponent(match[1], meshRenderer1, state$2);
                                                    TestTool$Wonderjs.closeContractCheck(/* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    MeshRendererAPI$Wonderjs.getMeshRendererIsRender(meshRenderer1, state$3),
                                                                    MeshRendererAPI$Wonderjs.getMeshRendererIsRender(meshRenderer2, state$3)
                                                                  ]), /* tuple */[
                                                                MeshRendererTool$Wonderjs.getDefaultIsRender(/* () */0),
                                                                isRender2
                                                              ]);
                                                  }));
                                    }));
                      }));
                Wonder_jest.test("the disposed meshRenderer shouldn't affect other alive ones' record", (function (param) {
                        var match = _prepareTwo(state[0]);
                        var state$1 = GameObjectTool$Wonderjs.disposeGameObjectMeshRendererComponent(match[1], match[2], match[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererAPI$Wonderjs.unsafeGetMeshRendererGameObject(match[4], state$1)), match[3]);
                      }));
                Wonder_jest.describe("test add new one after dispose old one", (function (param) {
                        Wonder_jest.test("use disposed index as new index firstly", (function (param) {
                                var match = _prepareTwo(state[0]);
                                var meshRenderer1 = match[2];
                                var state$1 = GameObjectTool$Wonderjs.disposeGameObjectMeshRendererComponent(match[1], meshRenderer1, match[0]);
                                var match$1 = MeshRendererAPI$Wonderjs.createMeshRenderer(state$1);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[1]), meshRenderer1);
                              }));
                        return Wonder_jest.test("if has no disposed index, get index from meshRendererRecord.index", (function (param) {
                                      var match = _prepareTwo(state[0]);
                                      var meshRenderer2 = match[4];
                                      var state$1 = GameObjectTool$Wonderjs.disposeGameObjectMeshRendererComponent(match[3], meshRenderer2, match[0]);
                                      var match$1 = MeshRendererAPI$Wonderjs.createMeshRenderer(state$1);
                                      var match$2 = MeshRendererAPI$Wonderjs.createMeshRenderer(match$1[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      match$1[1],
                                                      match$2[1]
                                                    ]), /* tuple */[
                                                  meshRenderer2,
                                                  meshRenderer2 + 1 | 0
                                                ]);
                                    }));
                      }));
                return Wonder_jest.describe("contract check", (function (param) {
                              return Wonder_jest.test("expect dispose the alive component, but actual not", (function (param) {
                                            var match = _prepareTwo(state[0]);
                                            var meshRenderer1 = match[2];
                                            var gameObject1 = match[1];
                                            var state$1 = GameObjectTool$Wonderjs.disposeGameObjectMeshRendererComponent(gameObject1, meshRenderer1, match[0]);
                                            return Wonder_jest.Expect[/* toThrowMessage */21]("expect dispose the alive component, but actual not", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                              GameObjectTool$Wonderjs.disposeGameObjectMeshRendererComponent(gameObject1, meshRenderer1, state$1);
                                                              return /* () */0;
                                                            })));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("contract check: is alive", (function (param) {
                      return Wonder_jest.describe("if meshRenderer is disposed", (function (param) {
                                    return Wonder_jest.test("unsafeGetMeshRendererGameObject should error", (function (param) {
                                                  var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state[0]);
                                                  var meshRenderer1 = match[2];
                                                  var state$1 = GameObjectTool$Wonderjs.disposeGameObjectMeshRendererComponent(match[1], meshRenderer1, match[0]);
                                                  return Wonder_jest.Expect[/* toThrowMessage */21]("expect component alive, but actual not", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                                    return MeshRendererAPI$Wonderjs.unsafeGetMeshRendererGameObject(meshRenderer1, state$1);
                                                                  })));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
