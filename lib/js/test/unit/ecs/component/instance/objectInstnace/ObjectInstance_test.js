'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../../tool/TestTool.js");
var TransformAPI$Wonderjs = require("../../../../../../src/api/TransformAPI.js");
var GameObjectAPI$Wonderjs = require("../../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../../tool/service/state/MainStateTool.js");
var GameObjectTool$Wonderjs = require("../../../../../tool/service/gameObject/GameObjectTool.js");
var SourceInstanceAPI$Wonderjs = require("../../../../../../src/api/SourceInstanceAPI.js");
var ObjectInstanceTool$Wonderjs = require("../../../../../tool/service/instance/ObjectInstanceTool.js");
var MutableSparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/MutableSparseMapService.js");

Wonder_jest.describe("ObjectInstance", (function (param) {
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
        return Wonder_jest.describe("dispose component", (function (param) {
                      Wonder_jest.describe("dispose data", (function (param) {
                              Wonder_jest.test("remove from sourceInstanceMap, gameObjectMap", (function (param) {
                                      var match = ObjectInstanceTool$Wonderjs.createObjectInstanceGameObject(state[0]);
                                      var objectInstance = match[4];
                                      var state$1 = GameObjectTool$Wonderjs.disposeGameObjectObjectInstanceComponent(match[1], objectInstance, match[0]);
                                      var match$1 = ObjectInstanceTool$Wonderjs.getObjectInstanceRecord(state$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      MutableSparseMapService$WonderCommonlib.has(objectInstance, match$1[/* sourceInstanceMap */1]),
                                                      MutableSparseMapService$WonderCommonlib.has(objectInstance, match$1[/* gameObjectMap */3])
                                                    ]), /* tuple */[
                                                  false,
                                                  false
                                                ]);
                                    }));
                              return Wonder_jest.test("remove from sourceInstance->objectInstanceTransformCollections", (function (param) {
                                            var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                            var match$1 = ObjectInstanceTool$Wonderjs.createObjectInstanceGameObjectArr(3, match[0]);
                                            var objectInstanceGameObjectArr = match$1[3];
                                            var state$1 = GameObjectTool$Wonderjs.batchDisposeGameObject(objectInstanceGameObjectArr.slice(1), match$1[0]);
                                            var sourceInstanceObjectInstanceTransformArray = SourceInstanceAPI$Wonderjs.getSourceInstanceObjectInstanceTransformArray(match$1[2], state$1);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](sourceInstanceObjectInstanceTransformArray), /* array */[GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(Caml_array.caml_array_get(objectInstanceGameObjectArr, 0), state$1)]);
                                          }));
                            }));
                      Wonder_jest.describe("test add new one after dispose old one", (function (param) {
                              Wonder_jest.test("use disposed index as new index firstly", (function (param) {
                                      var match = ObjectInstanceTool$Wonderjs.createObjectInstanceGameObject(state[0]);
                                      var objectInstance1 = match[4];
                                      var state$1 = GameObjectTool$Wonderjs.disposeGameObjectObjectInstanceComponent(match[1], objectInstance1, match[0]);
                                      var match$1 = ObjectInstanceTool$Wonderjs.createObjectInstanceGameObject(state$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[4]), objectInstance1);
                                    }));
                              return Wonder_jest.test("if has no disposed index, get index from objectInstanceRecord.index", (function (param) {
                                            TestTool$Wonderjs.closeContractCheck(/* () */0);
                                            var match = ObjectInstanceTool$Wonderjs.createObjectInstanceGameObject(state[0]);
                                            var objectInstance1 = match[4];
                                            var state$1 = GameObjectTool$Wonderjs.disposeGameObjectObjectInstanceComponent(match[1], objectInstance1, match[0]);
                                            var match$1 = ObjectInstanceTool$Wonderjs.createObjectInstanceGameObject(state$1);
                                            var match$2 = ObjectInstanceTool$Wonderjs.createObjectInstanceGameObject(match$1[0]);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            match$1[4],
                                                            match$2[4]
                                                          ]), /* tuple */[
                                                        objectInstance1,
                                                        objectInstance1 + 1 | 0
                                                      ]);
                                          }));
                            }));
                      return Wonder_jest.describe("contract check", (function (param) {
                                    return Wonder_jest.test("expect dispose the alive component, but actual not", (function (param) {
                                                  var match = ObjectInstanceTool$Wonderjs.createObjectInstanceGameObject(state[0]);
                                                  var objectInstance1 = match[4];
                                                  var gameObject1 = match[1];
                                                  var state$1 = GameObjectTool$Wonderjs.disposeGameObjectObjectInstanceComponent(gameObject1, objectInstance1, match[0]);
                                                  return Wonder_jest.Expect[/* toThrowMessage */21]("expect dispose the alive component, but actual not", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                                    GameObjectTool$Wonderjs.disposeGameObjectObjectInstanceComponent(gameObject1, objectInstance1, state$1);
                                                                    return /* () */0;
                                                                  })));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
