'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var ScriptAPI$Wonderjs = require("../../../../../src/api/script/ScriptAPI.js");
var CameraTool$Wonderjs = require("../../../../tool/service/camera/CameraTool.js");
var ScriptTool$Wonderjs = require("../../../../tool/service/script/ScriptTool.js");
var TransformAPI$Wonderjs = require("../../../../../src/api/TransformAPI.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var GameObjectTool$Wonderjs = require("../../../../tool/service/gameObject/GameObjectTool.js");
var CreateStateMainService$Wonderjs = require("../../../../../src/service/state/main/state/CreateStateMainService.js");
var MutableSparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/MutableSparseMapService.js");

Wonder_jest.describe("Script", (function (param) {
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
        Wonder_jest.describe("createScript", (function (param) {
                Wonder_jest.test("create a new script which is just index(int)", (function (param) {
                        var match = ScriptAPI$Wonderjs.createScript(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[1]), 0);
                      }));
                return Wonder_jest.describe("change state", (function (param) {
                              return Wonder_jest.test("state->index + 1", (function (param) {
                                            var match = ScriptAPI$Wonderjs.createScript(state[0]);
                                            var record = match[0][/* scriptRecord */27];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](record[/* index */0]), 1);
                                          }));
                            }));
              }));
        Wonder_jest.describe("removeScriptEventFunctionData", (function (param) {
                return Wonder_jest.test("remove script's eventFunctionData by scriptEventFunctionDataName", (function (param) {
                              var match = ScriptAPI$Wonderjs.createScript(state[0]);
                              var script = match[1];
                              var scriptEventFunctionData1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptEventFunctionData */0](Caml_option.some(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildInitEventFunc */6](/* () */0)), Caml_option.some(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildUpdateEventFunc */7](/* () */0)), Caml_option.some(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildSetLocalPositionEventFunc */4](/* () */0)));
                              var scriptEventFunctionDataName1 = "scriptEventFunctionData1";
                              var scriptEventFunctionData2 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptEventFunctionData */0](Caml_option.some(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildUpdateEventFunc */7](/* () */0)), Caml_option.some(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildInitEventFunc */6](/* () */0)), Caml_option.some(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildSetLocalPositionEventFunc */4](/* () */0)));
                              var scriptEventFunctionDataName2 = "scriptEventFunctionData2";
                              var state$1 = ScriptAPI$Wonderjs.addScriptEventFunctionData(script, scriptEventFunctionDataName1, scriptEventFunctionData1, match[0]);
                              var state$2 = ScriptAPI$Wonderjs.addScriptEventFunctionData(script, scriptEventFunctionDataName2, scriptEventFunctionData2, state$1);
                              var state$3 = ScriptAPI$Wonderjs.removeScriptEventFunctionData(script, scriptEventFunctionDataName2, state$2);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptAPI$Wonderjs.unsafeGetScriptEventFunctionDataEntries(script, state$3)), /* array */[/* tuple */[
                                            scriptEventFunctionDataName1,
                                            scriptEventFunctionData1
                                          ]]);
                            }));
              }));
        Wonder_jest.describe("removeScriptAttribute", (function (param) {
                return Wonder_jest.test("remove script's eventFunctionData by scriptAttributeName", (function (param) {
                              var match = ScriptAPI$Wonderjs.createScript(state[0]);
                              var script = match[1];
                              var scriptAttributeName1 = "scriptAttribute1";
                              var scriptAttribute1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptAttribute */2](scriptAttributeName1);
                              var scriptAttributeName2 = "scriptAttribute2";
                              var scriptAttribute2 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptAttribute */2](scriptAttributeName2);
                              var state$1 = ScriptAPI$Wonderjs.addScriptAttribute(script, scriptAttributeName1, scriptAttribute1, match[0]);
                              var state$2 = ScriptAPI$Wonderjs.addScriptAttribute(script, scriptAttributeName2, scriptAttribute2, state$1);
                              var state$3 = ScriptAPI$Wonderjs.removeScriptAttribute(script, scriptAttributeName2, state$2);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptAPI$Wonderjs.unsafeGetScriptAttributeEntries(script, state$3)), /* array */[/* tuple */[
                                            scriptAttributeName1,
                                            scriptAttribute1
                                          ]]);
                            }));
              }));
        Wonder_jest.describe("unsafeGetScriptEventFunctionDataEntries", (function (param) {
                return Wonder_jest.test("unsafe get scrip's all scriptEventFunction data entries", (function (param) {
                              var match = ScriptAPI$Wonderjs.createScript(state[0]);
                              var script = match[1];
                              var scriptEventFunctionData1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptEventFunctionData */0](Caml_option.some(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildInitEventFunc */6](/* () */0)), Caml_option.some(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildUpdateEventFunc */7](/* () */0)), Caml_option.some(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildSetLocalPositionEventFunc */4](/* () */0)));
                              var scriptEventFunctionDataName1 = "scriptEventFunctionData1";
                              var scriptEventFunctionData2 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptEventFunctionData */0](Caml_option.some(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildUpdateEventFunc */7](/* () */0)), Caml_option.some(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildInitEventFunc */6](/* () */0)), Caml_option.some(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildSetLocalPositionEventFunc */4](/* () */0)));
                              var scriptEventFunctionDataName2 = "scriptEventFunctionData2";
                              var state$1 = ScriptAPI$Wonderjs.addScriptEventFunctionData(script, scriptEventFunctionDataName1, scriptEventFunctionData1, match[0]);
                              var state$2 = ScriptAPI$Wonderjs.addScriptEventFunctionData(script, scriptEventFunctionDataName2, scriptEventFunctionData2, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptAPI$Wonderjs.unsafeGetScriptEventFunctionDataEntries(script, state$2)), /* array */[
                                          /* tuple */[
                                            scriptEventFunctionDataName1,
                                            scriptEventFunctionData1
                                          ],
                                          /* tuple */[
                                            scriptEventFunctionDataName2,
                                            scriptEventFunctionData2
                                          ]
                                        ]);
                            }));
              }));
        Wonder_jest.describe("unsafeGetScriptAttributeEntries", (function (param) {
                return Wonder_jest.test("unsafe get scrip's all scriptAttributes entries", (function (param) {
                              var match = ScriptAPI$Wonderjs.createScript(state[0]);
                              var script = match[1];
                              var scriptAttributeName1 = "scriptAttribute1";
                              var scriptAttribute1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptAttribute */2](scriptAttributeName1);
                              var scriptAttributeName2 = "scriptAttribute2";
                              var scriptAttribute2 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptAttribute */2](scriptAttributeName2);
                              var state$1 = ScriptAPI$Wonderjs.addScriptAttribute(script, scriptAttributeName1, scriptAttribute1, match[0]);
                              var state$2 = ScriptAPI$Wonderjs.addScriptAttribute(script, scriptAttributeName2, scriptAttribute2, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptAPI$Wonderjs.unsafeGetScriptAttributeEntries(script, state$2)), /* array */[
                                          /* tuple */[
                                            scriptAttributeName1,
                                            scriptAttribute1
                                          ],
                                          /* tuple */[
                                            scriptAttributeName2,
                                            scriptAttribute2
                                          ]
                                        ]);
                            }));
              }));
        Wonder_jest.describe("unsafeGetScriptGameObject", (function (param) {
                return Wonder_jest.test("get script's gameObject", (function (param) {
                              var match = ScriptAPI$Wonderjs.createScript(state[0]);
                              var script = match[1];
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject = match$1[1];
                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectScriptComponent(gameObject, script, match$1[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptAPI$Wonderjs.unsafeGetScriptGameObject(script, state$1)), gameObject);
                            }));
              }));
        Wonder_jest.describe("replaceScriptEventFunctionData", (function (param) {
                return Wonder_jest.test("replace script's event function data", (function (param) {
                              var match = ScriptAPI$Wonderjs.createScript(state[0]);
                              var script = match[1];
                              var scriptEventFunctionData1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptEventFunctionData */0](Caml_option.some(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildInitEventFunc */6](/* () */0)), Caml_option.some(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildUpdateEventFunc */7](/* () */0)), Caml_option.some(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildSetLocalPositionEventFunc */4](/* () */0)));
                              var scriptEventFunctionDataName1 = "scriptEventFunctionData1";
                              var state$1 = ScriptAPI$Wonderjs.addScriptEventFunctionData(script, scriptEventFunctionDataName1, scriptEventFunctionData1, match[0]);
                              var scriptEventFunctionData2 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptEventFunctionData */0](Caml_option.some(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildUpdateEventFunc */7](/* () */0)), Caml_option.some(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildInitEventFunc */6](/* () */0)), Caml_option.some(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildSetLocalPositionEventFunc */4](/* () */0)));
                              var state$2 = ScriptAPI$Wonderjs.replaceScriptEventFunctionData(script, /* tuple */[
                                    scriptEventFunctionDataName1,
                                    scriptEventFunctionDataName1
                                  ], scriptEventFunctionData2, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptAPI$Wonderjs.unsafeGetScriptEventFunctionDataEntries(script, state$2)), /* array */[/* tuple */[
                                            scriptEventFunctionDataName1,
                                            scriptEventFunctionData2
                                          ]]);
                            }));
              }));
        Wonder_jest.describe("replaceScriptAttribute", (function (param) {
                return Wonder_jest.test("replace script's event function data", (function (param) {
                              var match = ScriptAPI$Wonderjs.createScript(state[0]);
                              var script = match[1];
                              var scriptAttributeName1 = "scriptAttribute1";
                              var scriptAttribute1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptAttribute */2](scriptAttributeName1);
                              var scriptAttributeName2 = "scriptAttribute2";
                              var state$1 = ScriptAPI$Wonderjs.addScriptAttribute(script, scriptAttributeName1, scriptAttribute1, match[0]);
                              var scriptAttribute2 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndTwoAttributes[/* buildScriptAttribute2 */2](scriptAttributeName2);
                              var state$2 = ScriptAPI$Wonderjs.replaceScriptAttribute(script, /* tuple */[
                                    scriptAttributeName1,
                                    scriptAttributeName2
                                  ], scriptAttribute2, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptAPI$Wonderjs.unsafeGetScriptAttributeEntries(script, state$2)), /* array */[/* tuple */[
                                            scriptAttributeName2,
                                            scriptAttribute2
                                          ]]);
                            }));
              }));
        Wonder_jest.describe("unsafeGetScriptAttributeFieldDefaultValue", (function (param) {
                return Wonder_jest.test("unsafe get script->attribute->field->default value", (function (param) {
                              var match = ScriptAPI$Wonderjs.createScript(state[0]);
                              var script = match[1];
                              var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script, match[0], undefined, undefined, undefined, /* () */0);
                              var state$2 = ScriptAPI$Wonderjs.setScriptAttributeFieldDefaultValueAndValue(script, ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getScriptAttributeName */3](/* () */0), "a", 3, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptAPI$Wonderjs.unsafeGetScriptAttributeFieldDefaultValue(script, ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getScriptAttributeName */3](/* () */0), "a", state$2)), 3);
                            }));
              }));
        Wonder_jest.describe("setScriptAttributeFieldDefaultValueAndValue", (function (param) {
                return Wonder_jest.test("set script->attribute->field->default value and value to be target value", (function (param) {
                              var match = ScriptAPI$Wonderjs.createScript(state[0]);
                              var script = match[1];
                              var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script, match[0], undefined, undefined, undefined, /* () */0);
                              var state$2 = ScriptAPI$Wonderjs.setScriptAttributeFieldDefaultValueAndValue(script, ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getScriptAttributeName */3](/* () */0), "a", 3, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              ScriptTool$Wonderjs.unsafeGetScriptAttributeIntFieldValue(script, ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getScriptAttributeName */3](/* () */0), "a", state$2),
                                              ScriptTool$Wonderjs.unsafeGetScriptAttributeIntFieldDefaultValue(script, ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getScriptAttributeName */3](/* () */0), "a", state$2)
                                            ]), /* tuple */[
                                          3,
                                          3
                                        ]);
                            }));
              }));
        Wonder_jest.describe("unsafeGetScriptIsActive", (function (param) {
                return Wonder_jest.test("default value is true", (function (param) {
                              var match = ScriptAPI$Wonderjs.createScript(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptAPI$Wonderjs.unsafeGetScriptIsActive(match[1], match[0])), true);
                            }));
              }));
        Wonder_jest.describe("setScriptIsActive", (function (param) {
                Wonder_jest.describe("if script->gameObject isn't active", (function (param) {
                        Wonder_jest.test("set script to active should warn", (function (param) {
                                var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                var script = match[2];
                                var gameObject = match[1];
                                var state$1 = GameObjectAPI$Wonderjs.setGameObjectIsActive(gameObject, false, match[0]);
                                ScriptAPI$Wonderjs.setScriptIsActive(script, true, state$1);
                                return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withOneArg("script:" + (String(script) + (" -> gameObject:" + (String(gameObject) + " isn\'t active, can\'t set script to active"))), warn)));
                              }));
                        return Wonder_jest.test("set script to active should not work", (function (param) {
                                      var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                      var script = match[2];
                                      var state$1 = GameObjectAPI$Wonderjs.setGameObjectIsActive(match[1], false, match[0]);
                                      var state$2 = ScriptAPI$Wonderjs.setScriptIsActive(script, true, state$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptAPI$Wonderjs.unsafeGetScriptIsActive(script, state$2)), false);
                                    }));
                      }));
                return Wonder_jest.describe("else", (function (param) {
                              return Wonder_jest.test("set script to active should work", (function (param) {
                                            Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                            var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                            var script = match[2];
                                            var state$1 = GameObjectAPI$Wonderjs.setGameObjectIsActive(match[1], true, match[0]);
                                            var state$2 = ScriptAPI$Wonderjs.setScriptIsActive(script, true, state$1);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptAPI$Wonderjs.unsafeGetScriptIsActive(script, state$2)), true);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("dispose component", (function (param) {
                      Wonder_jest.test("exec actived script's all dispose event functions", (function (param) {
                              var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                              var script1 = match[2];
                              var gameObject1 = match[1];
                              var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script1, match[0], undefined, undefined, Caml_option.some(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildSetLocalPositionEventFunc */4](/* () */0)), /* () */0);
                              var match$1 = ScriptTool$Wonderjs.createGameObject(state$1);
                              var script2 = match$1[2];
                              var gameObject2 = match$1[1];
                              var state$2 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script2, match$1[0], undefined, undefined, Caml_option.some(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildSetLocalPositionEventFunc */4](/* () */0)), /* () */0);
                              var state$3 = ScriptAPI$Wonderjs.setScriptIsActive(script2, false, state$2);
                              var transform1 = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject1, state$3);
                              var state$4 = GameObjectTool$Wonderjs.disposeGameObjectScriptComponent(gameObject1, script1, state$3);
                              var transform2 = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject2, state$4);
                              var state$5 = GameObjectTool$Wonderjs.disposeGameObjectScriptComponent(gameObject2, script2, state$4);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              TransformAPI$Wonderjs.getTransformLocalPosition(transform1, state$5),
                                              TransformAPI$Wonderjs.getTransformLocalPosition(transform2, state$5)
                                            ]), /* tuple */[
                                          ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getLocalPositionAfterExec */9](/* () */0),
                                          ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getLocalPositionBeforeExec */8](/* () */0)
                                        ]);
                            }));
                      Wonder_jest.describe("dispose data", (function (param) {
                              Wonder_jest.test("remove from gameObjectMap", (function (param) {
                                      var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                      var script1 = match[2];
                                      var state$1 = GameObjectTool$Wonderjs.disposeGameObjectScriptComponent(match[1], script1, match[0]);
                                      var match$1 = state$1[/* scriptRecord */27];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MutableSparseMapService$WonderCommonlib.has(script1, match$1[/* gameObjectMap */3])), false);
                                    }));
                              Wonder_jest.test("remove from isActiveMap", (function (param) {
                                      var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                      var script1 = match[2];
                                      var state$1 = GameObjectTool$Wonderjs.disposeGameObjectScriptComponent(match[1], script1, match[0]);
                                      var match$1 = state$1[/* scriptRecord */27];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MutableSparseMapService$WonderCommonlib.has(script1, match$1[/* isActiveMap */4])), false);
                                    }));
                              return Wonder_jest.test("remove from scriptEventFunctionDataMap,scriptAttributeMap", (function (param) {
                                            var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                            var script1 = match[2];
                                            var state$1 = GameObjectTool$Wonderjs.disposeGameObjectScriptComponent(match[1], script1, match[0]);
                                            var scriptRecord = state$1[/* scriptRecord */27];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            MutableSparseMapService$WonderCommonlib.has(script1, scriptRecord[/* scriptEventFunctionDataMap */5]),
                                                            MutableSparseMapService$WonderCommonlib.has(script1, scriptRecord[/* scriptAttributeMap */6])
                                                          ]), /* tuple */[
                                                        false,
                                                        false
                                                      ]);
                                          }));
                            }));
                      return Wonder_jest.describe("test add new one after dispose old one", (function (param) {
                                    return Wonder_jest.test("use disposed index as new index firstly", (function (param) {
                                                  var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                                  var script1 = match[2];
                                                  var state$1 = GameObjectTool$Wonderjs.disposeGameObjectScriptComponent(match[1], script1, match[0]);
                                                  var match$1 = ScriptTool$Wonderjs.createGameObject(state$1);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[2]), script1);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
