'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Js_null_undefined = require("bs-platform/lib/js/js_null_undefined.js");
var ScriptAPI$Wonderjs = require("../../../../src/api/script/ScriptAPI.js");
var TransformAPI$Wonderjs = require("../../../../src/api/TransformAPI.js");
var GameObjectAPI$Wonderjs = require("../../../../src/api/GameObjectAPI.js");
var OptionService$Wonderjs = require("../../../../src/service/atom/OptionService.js");
var InitScriptJobUtils$Wonderjs = require("../../../../src/job/utils/InitScriptJobUtils.js");
var ScriptAttributeAPI$Wonderjs = require("../../../../src/api/script/ScriptAttributeAPI.js");
var DisposeScriptService$Wonderjs = require("../../../../src/service/record/main/script/DisposeScriptService.js");
var UpdateScriptJobUtils$Wonderjs = require("../../../../src/job/utils/UpdateScriptJobUtils.js");
var ScriptEventFunctionAPI$Wonderjs = require("../../../../src/api/script/ScriptEventFunctionAPI.js");
var OperateScriptDataMainService$Wonderjs = require("../../../../src/service/state/main/script/OperateScriptDataMainService.js");
var OperateScriptAttributeDataMainService$Wonderjs = require("../../../../src/service/state/main/script/OperateScriptAttributeDataMainService.js");
var OperateScriptEventFunctionDataMainService$Wonderjs = require("../../../../src/service/state/main/script/OperateScriptEventFunctionDataMainService.js");

function createGameObject(state) {
  var match = ScriptAPI$Wonderjs.createScript(state);
  var script = match[1];
  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
  var gameObject = match$1[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectScriptComponent(gameObject, script, match$1[0]);
  return /* tuple */[
          state$1,
          gameObject,
          script
        ];
}

function isAlive(script, state) {
  return DisposeScriptService$Wonderjs.isAlive(script, state[/* scriptRecord */27]);
}

function buildEventFunctionJsObj($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var initFunc = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : undefined;
  var updateFunc = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : undefined;
  var disposeFunc = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : undefined;
  return {
          init: Js_null_undefined.fromOption(initFunc),
          update: Js_null_undefined.fromOption(updateFunc),
          dispose: Js_null_undefined.fromOption(disposeFunc)
        };
}

function createIntFieldValue(value) {
  return value;
}

function createFloatFieldValue(value) {
  return value;
}

function buildAttributeField($staropt$star, $staropt$star$1) {
  var type_ = $staropt$star !== undefined ? $staropt$star : "int";
  var defaultValue = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : 1;
  return {
          type: type_,
          defaultValue: defaultValue
        };
}

function unsafeGetScriptAttributeEntries(fieldName, attribute) {
  return OptionService$Wonderjs.unsafeGet(OperateScriptAttributeDataMainService$Wonderjs.getScriptAttributeField(fieldName, attribute));
}

function _unsafeGetScriptAttributeFieldValue(script, scriptAttributeName, fieldName, convertScriptAttributeValueTypeFunc, state) {
  return Curry._1(convertScriptAttributeValueTypeFunc, OperateScriptAttributeDataMainService$Wonderjs.unsafeGetScriptAttributeFieldValue(fieldName, OperateScriptDataMainService$Wonderjs.unsafeGetScriptAttribute(script, scriptAttributeName, state)));
}

function unsafeGetScriptAttributeIntFieldValue(script, scriptAttributeName, fieldName, state) {
  return _unsafeGetScriptAttributeFieldValue(script, scriptAttributeName, fieldName, (function (prim) {
                return prim;
              }), state);
}

function unsafeGetScriptAttributeFloatFieldValue(script, scriptAttributeName, fieldName, state) {
  return _unsafeGetScriptAttributeFieldValue(script, scriptAttributeName, fieldName, (function (prim) {
                return prim;
              }), state);
}

function _unsafeGetScriptAttributeFieldDefaultValue(script, scriptAttributeName, fieldName, convertScriptAttributeValueTypeFunc, state) {
  return Curry._1(convertScriptAttributeValueTypeFunc, OperateScriptAttributeDataMainService$Wonderjs.unsafeGetScriptAttributeFieldDefaultValue(fieldName, OperateScriptDataMainService$Wonderjs.unsafeGetScriptAttribute(script, scriptAttributeName, state)));
}

function unsafeGetScriptAttributeIntFieldDefaultValue(script, scriptAttributeName, fieldName, state) {
  return _unsafeGetScriptAttributeFieldDefaultValue(script, scriptAttributeName, fieldName, (function (prim) {
                return prim;
              }), state);
}

function unsafeGetScriptAttributeFloatFieldDefaultValue(script, scriptAttributeName, fieldName, state) {
  return _unsafeGetScriptAttributeFieldDefaultValue(script, scriptAttributeName, fieldName, (function (prim) {
                return prim;
              }), state);
}

function hasScriptAllEventFunctionData(script, state) {
  return Js_option.isSome(OperateScriptDataMainService$Wonderjs.getScriptAllEventFunctionData(script, state));
}

function hasScriptAllAttributes(script, state) {
  return Js_option.isSome(OperateScriptDataMainService$Wonderjs.getScriptAllAttributes(script, state));
}

function setScriptAttributeIntFieldValue(script, scriptAttributeName, fieldName, fieldValue, state) {
  return OperateScriptDataMainService$Wonderjs.setScriptAttributeFieldValue(script, /* tuple */[
              scriptAttributeName,
              fieldName,
              fieldValue
            ], state);
}

var execAllInitEventFunction = InitScriptJobUtils$Wonderjs.exec;

var execAllUpdateEventFunction = UpdateScriptJobUtils$Wonderjs.exec;

function execScriptArrDisposeEventFunction(scriptArray, state) {
  return OperateScriptEventFunctionDataMainService$Wonderjs.execAllEventFunction(OperateScriptEventFunctionDataMainService$Wonderjs.getActiveScriptAllDisposeEventFunctionData(scriptArray, state), state);
}

var ExecEventFunction = /* module */[
  /* execAllInitEventFunction */execAllInitEventFunction,
  /* execAllUpdateEventFunction */execAllUpdateEventFunction,
  /* execScriptArrDisposeEventFunction */execScriptArrDisposeEventFunction
];

function unsafeGetScriptAttributeIntFieldValue$1(api, fieldName, scriptAttribute) {
  var unsafeGetScriptAttributeFieldValue = api.unsafeGetScriptAttributeFieldValue;
  return unsafeGetScriptAttributeFieldValue(fieldName, scriptAttribute);
}

function setScriptAttributeIntFieldValue$1(api, script, scriptAttributeName, fieldName, fieldValue, state) {
  var setScriptAttributeFieldValue = api.setScriptAttributeFieldValue;
  return setScriptAttributeFieldValue(script, /* tuple */[
              scriptAttributeName,
              fieldName,
              fieldValue
            ], state);
}

function unsafeGetScriptAttributeFloatFieldValue$1(api, fieldName, scriptAttribute) {
  var unsafeGetScriptAttributeFieldValue = api.unsafeGetScriptAttributeFieldValue;
  return unsafeGetScriptAttributeFieldValue(fieldName, scriptAttribute);
}

function setScriptAttributeFloatFieldValue(api, script, scriptAttributeName, fieldName, fieldValue, state) {
  var setScriptAttributeFieldValue = api.setScriptAttributeFieldValue;
  return setScriptAttributeFieldValue(script, /* tuple */[
              scriptAttributeName,
              fieldName,
              fieldValue
            ], state);
}

var API = /* module */[
  /* unsafeGetScriptAttributeIntFieldValue */unsafeGetScriptAttributeIntFieldValue$1,
  /* setScriptAttributeIntFieldValue */setScriptAttributeIntFieldValue$1,
  /* unsafeGetScriptAttributeFloatFieldValue */unsafeGetScriptAttributeFloatFieldValue$1,
  /* setScriptAttributeFloatFieldValue */setScriptAttributeFloatFieldValue
];

function buildScriptEventFunctionData(initFunc, updateFunc, disposeFunc) {
  return ScriptEventFunctionAPI$Wonderjs.createScriptEventFunctionData(buildEventFunctionJsObj(Caml_option.some(initFunc), Caml_option.some(updateFunc), Caml_option.some(disposeFunc), /* () */0));
}

function buildScriptData(script, state, sandbox, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var initFuncStub = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  var updateFuncStub = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  var disposeFuncStub = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  var scriptEventFunctionData = buildScriptEventFunctionData(Caml_option.some((function (script, api, state) {
              initFuncStub();
              return state;
            })), Caml_option.some((function (script, api, state) {
              updateFuncStub();
              return state;
            })), Caml_option.some((function (script, api, state) {
              disposeFuncStub();
              return state;
            })));
  return ScriptAPI$Wonderjs.addScriptEventFunctionData(script, "scriptEventFunctionData1", scriptEventFunctionData, state);
}

var TestCaseWithOneEventFuncStub = /* module */[
  /* buildScriptEventFunctionData */buildScriptEventFunctionData,
  /* buildScriptData */buildScriptData
];

function buildScriptEventFunctionData$1(initFunc, updateFunc, disposeFunc) {
  return ScriptEventFunctionAPI$Wonderjs.createScriptEventFunctionData(buildEventFunctionJsObj(Caml_option.some(initFunc), Caml_option.some(updateFunc), Caml_option.some(disposeFunc), /* () */0));
}

function getAttributeFieldADefaultValue(param) {
  return 1;
}

function buildScriptAttribute(scriptAttributeName) {
  var scriptAttribute = ScriptAttributeAPI$Wonderjs.createScriptAttribute(/* () */0);
  var scriptAttribute$1 = ScriptAttributeAPI$Wonderjs.addScriptAttributeFieldJsObj("a", {
        type: "int",
        defaultValue: 1
      }, scriptAttribute);
  return ScriptAttributeAPI$Wonderjs.addScriptAttributeFieldJsObj("b", {
              type: "float",
              defaultValue: 0.1
            }, scriptAttribute$1);
}

function getScriptAttributeName(param) {
  return "scriptAttribute1";
}

function buildSetLocalPositionEventFunc(param) {
  return (function (script, api, state) {
      var unsafeGetScriptGameObject = api.unsafeGetScriptGameObject;
      var unsafeGetGameObjectTransformComponent = api.unsafeGetGameObjectTransformComponent;
      var getTransformLocalPosition = api.getTransformLocalPosition;
      var setTransformLocalPosition = api.setTransformLocalPosition;
      var transform = unsafeGetGameObjectTransformComponent(unsafeGetScriptGameObject(script, state), state);
      var match = getTransformLocalPosition(transform, state);
      return setTransformLocalPosition(transform, /* tuple */[
                  match[0] + 10,
                  match[1],
                  match[2]
                ], state);
    });
}

function getScriptAttributeFieldAName(param) {
  return "a";
}

function buildInitEventFunc(param) {
  return (function (script, api, state) {
      var scriptAttributeName = "scriptAttribute1";
      var unsafeGetScriptAttribute = api.unsafeGetScriptAttribute;
      var scriptAttribute = unsafeGetScriptAttribute(script, scriptAttributeName, state);
      var unsafeGetScriptAttributeFieldValue = api.unsafeGetScriptAttributeFieldValue;
      var setScriptAttributeFieldValue = api.setScriptAttributeFieldValue;
      return setScriptAttributeFieldValue(script, /* tuple */[
                  scriptAttributeName,
                  "a",
                  unsafeGetScriptAttributeFieldValue("a", scriptAttribute) + 1 | 0
                ], state);
    });
}

function buildUpdateEventFunc(param) {
  return (function (script, api, state) {
      var scriptAttributeName = "scriptAttribute1";
      var unsafeGetScriptAttribute = api.unsafeGetScriptAttribute;
      var scriptAttribute = unsafeGetScriptAttribute(script, scriptAttributeName, state);
      return setScriptAttributeFloatFieldValue(api, script, scriptAttributeName, "b", unsafeGetScriptAttributeFloatFieldValue$1(api, "b", scriptAttribute) + 10, state);
    });
}

function getLocalPositionBeforeExec(param) {
  return /* tuple */[
          0,
          0,
          0
        ];
}

function getLocalPositionAfterExec(param) {
  return /* tuple */[
          10,
          0,
          0
        ];
}

function getLocalPosition(script, state) {
  return TransformAPI$Wonderjs.getTransformLocalPosition(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(ScriptAPI$Wonderjs.unsafeGetScriptGameObject(script, state), state), state);
}

function buildScriptData$1(script, state, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var initFunc = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : buildInitEventFunc(/* () */0);
  var updateFunc = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : buildUpdateEventFunc(/* () */0);
  var disposeFunc = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : buildSetLocalPositionEventFunc(/* () */0);
  var scriptAttributeName = "scriptAttribute1";
  var scriptEventFunctionData = buildScriptEventFunctionData$1(Caml_option.some(initFunc), Caml_option.some(updateFunc), Caml_option.some(disposeFunc));
  var scriptAttribute = buildScriptAttribute(scriptAttributeName);
  var state$1 = ScriptAPI$Wonderjs.addScriptAttribute(script, scriptAttributeName, scriptAttribute, state);
  return ScriptAPI$Wonderjs.addScriptEventFunctionData(script, "scriptEventFunctionData1", scriptEventFunctionData, state$1);
}

function getAttributeFieldAValue(script, state) {
  return unsafeGetScriptAttributeIntFieldValue(script, "scriptAttribute1", "a", state);
}

function getAttributeFieldBValue(script, state) {
  return unsafeGetScriptAttributeFloatFieldValue(script, "scriptAttribute1", "b", state);
}

function getAttributeFieldAValueBeforeExecInitEventFunc(param) {
  return 1;
}

function getAttributeFieldAValueAfterExecInitEventFunc(param) {
  return 2;
}

function getAttributeFieldBValueBeforeExecUpdateEventFunc(param) {
  return 0.1;
}

function getAttributeFieldBValueAfterExecUpdateEventFunc(param) {
  return 0.1 + 10;
}

function judgeExecInitEventFunc(script, state) {
  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](getAttributeFieldAValue(script, state)), 2);
}

function setScriptAttributeFieldAValue(script, value, state) {
  return setScriptAttributeIntFieldValue(script, "scriptAttribute1", "a", value, state);
}

var TestCaseWithOneEventFuncAndOneAttribute = /* module */[
  /* buildScriptEventFunctionData */buildScriptEventFunctionData$1,
  /* getAttributeFieldADefaultValue */getAttributeFieldADefaultValue,
  /* buildScriptAttribute */buildScriptAttribute,
  /* getScriptAttributeName */getScriptAttributeName,
  /* buildSetLocalPositionEventFunc */buildSetLocalPositionEventFunc,
  /* getScriptAttributeFieldAName */getScriptAttributeFieldAName,
  /* buildInitEventFunc */buildInitEventFunc,
  /* buildUpdateEventFunc */buildUpdateEventFunc,
  /* getLocalPositionBeforeExec */getLocalPositionBeforeExec,
  /* getLocalPositionAfterExec */getLocalPositionAfterExec,
  /* getLocalPosition */getLocalPosition,
  /* buildScriptData */buildScriptData$1,
  /* getAttributeFieldAValue */getAttributeFieldAValue,
  /* getAttributeFieldBValue */getAttributeFieldBValue,
  /* getAttributeFieldAValueBeforeExecInitEventFunc */getAttributeFieldAValueBeforeExecInitEventFunc,
  /* getAttributeFieldAValueAfterExecInitEventFunc */getAttributeFieldAValueAfterExecInitEventFunc,
  /* getAttributeFieldBValueBeforeExecUpdateEventFunc */getAttributeFieldBValueBeforeExecUpdateEventFunc,
  /* getAttributeFieldBValueAfterExecUpdateEventFunc */getAttributeFieldBValueAfterExecUpdateEventFunc,
  /* judgeExecInitEventFunc */judgeExecInitEventFunc,
  /* setScriptAttributeFieldAValue */setScriptAttributeFieldAValue
];

function buildScriptEventFunctionData$2(scriptAttribute1Name, scriptAttribute2Name) {
  return ScriptEventFunctionAPI$Wonderjs.createScriptEventFunctionData(buildEventFunctionJsObj(undefined, Caml_option.some(Caml_option.some((function (script, api, state) {
                            var unsafeGetScriptAttribute = api.unsafeGetScriptAttribute;
                            unsafeGetScriptAttribute(script, scriptAttribute1Name, state);
                            var scriptAttribute2 = unsafeGetScriptAttribute(script, scriptAttribute2Name, state);
                            return setScriptAttributeFloatFieldValue(api, script, scriptAttribute1Name, "b", unsafeGetScriptAttributeFloatFieldValue$1(api, "b", scriptAttribute2) + 10, state);
                          }))), undefined, /* () */0));
}

function buildScriptAttribute1(scriptAttributeName) {
  var scriptAttribute = ScriptAttributeAPI$Wonderjs.createScriptAttribute(/* () */0);
  var scriptAttribute$1 = ScriptAttributeAPI$Wonderjs.addScriptAttributeFieldJsObj("a", {
        type: "int",
        defaultValue: 1
      }, scriptAttribute);
  return ScriptAttributeAPI$Wonderjs.addScriptAttributeFieldJsObj("b", {
              type: "float",
              defaultValue: 0.1
            }, scriptAttribute$1);
}

function buildScriptAttribute2(scriptAttributeName) {
  var scriptAttribute = ScriptAttributeAPI$Wonderjs.createScriptAttribute(/* () */0);
  var scriptAttribute$1 = ScriptAttributeAPI$Wonderjs.addScriptAttributeFieldJsObj("a", {
        type: "int",
        defaultValue: 11
      }, scriptAttribute);
  return ScriptAttributeAPI$Wonderjs.addScriptAttributeFieldJsObj("b", {
              type: "float",
              defaultValue: 2.1
            }, scriptAttribute$1);
}

function _getScriptAttribute1Name(param) {
  return "scriptAttribute1";
}

function _getScriptAttribute2Name(param) {
  return "scriptAttribute2";
}

function buildScriptData$2(script, state) {
  var scriptAttribute1Name = "scriptAttribute1";
  var scriptAttribute2Name = "scriptAttribute2";
  var scriptEventFunctionData = buildScriptEventFunctionData$2(scriptAttribute1Name, scriptAttribute2Name);
  var scriptAttribute1 = buildScriptAttribute1(scriptAttribute1Name);
  var scriptAttribute2 = buildScriptAttribute2(scriptAttribute2Name);
  var state$1 = ScriptAPI$Wonderjs.addScriptAttribute(script, scriptAttribute1Name, scriptAttribute1, state);
  var state$2 = ScriptAPI$Wonderjs.addScriptAttribute(script, scriptAttribute2Name, scriptAttribute2, state$1);
  return ScriptAPI$Wonderjs.addScriptEventFunctionData(script, "scriptEventFunctionData1", scriptEventFunctionData, state$2);
}

function getAttribute1FieldBValue(script, state) {
  return unsafeGetScriptAttributeFloatFieldValue(script, "scriptAttribute1", "b", state);
}

function getAttribute1FieldBValueAfterExecUpdateEventFunc(param) {
  return 12.1;
}

var TestCaseWithOneEventFuncAndTwoAttributes = /* module */[
  /* buildScriptEventFunctionData */buildScriptEventFunctionData$2,
  /* buildScriptAttribute1 */buildScriptAttribute1,
  /* buildScriptAttribute2 */buildScriptAttribute2,
  /* _getScriptAttribute1Name */_getScriptAttribute1Name,
  /* _getScriptAttribute2Name */_getScriptAttribute2Name,
  /* buildScriptData */buildScriptData$2,
  /* getAttribute1FieldBValue */getAttribute1FieldBValue,
  /* getAttribute1FieldBValueAfterExecUpdateEventFunc */getAttribute1FieldBValueAfterExecUpdateEventFunc
];

function buildScriptEventFunctionData$3(scriptAttribute1Name, scriptAttribute2Name) {
  return /* tuple */[
          ScriptEventFunctionAPI$Wonderjs.createScriptEventFunctionData(buildEventFunctionJsObj(undefined, Caml_option.some(Caml_option.some((function (script, api, state) {
                              var unsafeGetScriptAttribute = api.unsafeGetScriptAttribute;
                              unsafeGetScriptAttribute(script, scriptAttribute1Name, state);
                              var scriptAttribute2 = unsafeGetScriptAttribute(script, scriptAttribute2Name, state);
                              return setScriptAttributeIntFieldValue$1(api, script, scriptAttribute1Name, "a", unsafeGetScriptAttributeIntFieldValue$1(api, "a", scriptAttribute2) + 10 | 0, state);
                            }))), undefined, /* () */0)),
          ScriptEventFunctionAPI$Wonderjs.createScriptEventFunctionData(buildEventFunctionJsObj(undefined, Caml_option.some(Caml_option.some((function (script, api, state) {
                              var unsafeGetScriptAttribute = api.unsafeGetScriptAttribute;
                              unsafeGetScriptAttribute(script, scriptAttribute1Name, state);
                              var scriptAttribute2 = unsafeGetScriptAttribute(script, scriptAttribute2Name, state);
                              return setScriptAttributeFloatFieldValue(api, script, scriptAttribute1Name, "b", unsafeGetScriptAttributeFloatFieldValue$1(api, "b", scriptAttribute2) + 10, state);
                            }))), undefined, /* () */0))
        ];
}

function buildScriptAttribute1$1(scriptAttributeName) {
  var scriptAttribute = ScriptAttributeAPI$Wonderjs.createScriptAttribute(/* () */0);
  var scriptAttribute$1 = ScriptAttributeAPI$Wonderjs.addScriptAttributeFieldJsObj("a", {
        type: "int",
        defaultValue: 1
      }, scriptAttribute);
  return ScriptAttributeAPI$Wonderjs.addScriptAttributeFieldJsObj("b", {
              type: "float",
              defaultValue: 0.1
            }, scriptAttribute$1);
}

function buildScriptAttribute2$1(scriptAttributeName) {
  var scriptAttribute = ScriptAttributeAPI$Wonderjs.createScriptAttribute(/* () */0);
  var scriptAttribute$1 = ScriptAttributeAPI$Wonderjs.addScriptAttributeFieldJsObj("a", {
        type: "int",
        defaultValue: 11
      }, scriptAttribute);
  return ScriptAttributeAPI$Wonderjs.addScriptAttributeFieldJsObj("b", {
              type: "float",
              defaultValue: 2.1
            }, scriptAttribute$1);
}

function _getScriptAttribute1Name$1(param) {
  return "scriptAttribute1";
}

function _getScriptAttribute2Name$1(param) {
  return "scriptAttribute2";
}

function buildScriptData$3(script, state) {
  var scriptAttribute1Name = "scriptAttribute1";
  var scriptAttribute2Name = "scriptAttribute2";
  var match = buildScriptEventFunctionData$3(scriptAttribute1Name, scriptAttribute2Name);
  var scriptAttribute1 = buildScriptAttribute1$1(scriptAttribute1Name);
  var scriptAttribute2 = buildScriptAttribute2$1(scriptAttribute2Name);
  var state$1 = ScriptAPI$Wonderjs.addScriptAttribute(script, scriptAttribute1Name, scriptAttribute1, state);
  var state$2 = ScriptAPI$Wonderjs.addScriptAttribute(script, scriptAttribute2Name, scriptAttribute2, state$1);
  var state$3 = ScriptAPI$Wonderjs.addScriptEventFunctionData(script, "scriptEventFunctionData1", match[0], state$2);
  return ScriptAPI$Wonderjs.addScriptEventFunctionData(script, "scriptEventFunctionData2", match[1], state$3);
}

function getAttribute1FieldAValue(script, state) {
  return unsafeGetScriptAttributeIntFieldValue(script, "scriptAttribute1", "a", state);
}

function getAttribute1FieldAValueAfterExecUpdateEventFunc(param) {
  return 21;
}

function getAttribute1FieldBValue$1(script, state) {
  return unsafeGetScriptAttributeFloatFieldValue(script, "scriptAttribute1", "b", state);
}

function getAttribute1FieldBValueAfterExecUpdateEventFunc$1(param) {
  return 12.1;
}

var TestCaseWithTwoEventFuncsAndTwoAttributes = /* module */[
  /* buildScriptEventFunctionData */buildScriptEventFunctionData$3,
  /* buildScriptAttribute1 */buildScriptAttribute1$1,
  /* buildScriptAttribute2 */buildScriptAttribute2$1,
  /* _getScriptAttribute1Name */_getScriptAttribute1Name$1,
  /* _getScriptAttribute2Name */_getScriptAttribute2Name$1,
  /* buildScriptData */buildScriptData$3,
  /* getAttribute1FieldAValue */getAttribute1FieldAValue,
  /* getAttribute1FieldAValueAfterExecUpdateEventFunc */getAttribute1FieldAValueAfterExecUpdateEventFunc,
  /* getAttribute1FieldBValue */getAttribute1FieldBValue$1,
  /* getAttribute1FieldBValueAfterExecUpdateEventFunc */getAttribute1FieldBValueAfterExecUpdateEventFunc$1
];

var unsafeGetScriptAllEventFunctionData = OperateScriptDataMainService$Wonderjs.unsafeGetScriptAllEventFunctionData;

exports.createGameObject = createGameObject;
exports.isAlive = isAlive;
exports.buildEventFunctionJsObj = buildEventFunctionJsObj;
exports.createIntFieldValue = createIntFieldValue;
exports.createFloatFieldValue = createFloatFieldValue;
exports.buildAttributeField = buildAttributeField;
exports.unsafeGetScriptAttributeEntries = unsafeGetScriptAttributeEntries;
exports._unsafeGetScriptAttributeFieldValue = _unsafeGetScriptAttributeFieldValue;
exports.unsafeGetScriptAttributeIntFieldValue = unsafeGetScriptAttributeIntFieldValue;
exports.unsafeGetScriptAttributeFloatFieldValue = unsafeGetScriptAttributeFloatFieldValue;
exports._unsafeGetScriptAttributeFieldDefaultValue = _unsafeGetScriptAttributeFieldDefaultValue;
exports.unsafeGetScriptAttributeIntFieldDefaultValue = unsafeGetScriptAttributeIntFieldDefaultValue;
exports.unsafeGetScriptAttributeFloatFieldDefaultValue = unsafeGetScriptAttributeFloatFieldDefaultValue;
exports.hasScriptAllEventFunctionData = hasScriptAllEventFunctionData;
exports.hasScriptAllAttributes = hasScriptAllAttributes;
exports.unsafeGetScriptAllEventFunctionData = unsafeGetScriptAllEventFunctionData;
exports.setScriptAttributeIntFieldValue = setScriptAttributeIntFieldValue;
exports.ExecEventFunction = ExecEventFunction;
exports.API = API;
exports.TestCaseWithOneEventFuncStub = TestCaseWithOneEventFuncStub;
exports.TestCaseWithOneEventFuncAndOneAttribute = TestCaseWithOneEventFuncAndOneAttribute;
exports.TestCaseWithOneEventFuncAndTwoAttributes = TestCaseWithOneEventFuncAndTwoAttributes;
exports.TestCaseWithTwoEventFuncsAndTwoAttributes = TestCaseWithTwoEventFuncsAndTwoAttributes;
/* Sinon Not a pure module */
