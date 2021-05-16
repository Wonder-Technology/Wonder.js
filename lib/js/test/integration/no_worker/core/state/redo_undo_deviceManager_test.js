'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var RandomTool$Wonderjs = require("../../../../tool/RandomTool.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var DeviceManagerTool$Wonderjs = require("../../../../tool/service/device/DeviceManagerTool.js");

Wonder_jest.describe("test redo,undo deviceManager record", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _prepareDeviceManagerData = function (state) {
          DeviceManagerTool$Wonderjs.getDeviceManagerRecord(state);
          var gl = RandomTool$Wonderjs.getRandomFloat(10);
          var depthWrite = true;
          var colorWrite = /* tuple */[
            true,
            true,
            true,
            false
          ];
          var clearColor = /* tuple */[
            1,
            0.1,
            0.2,
            1
          ];
          var side = /* BOTH */1;
          var depthTest = true;
          var scissorTest = true;
          var viewport = /* tuple */[
            1,
            3,
            10,
            20
          ];
          var scissor = /* tuple */[
            2,
            4,
            11,
            21
          ];
          var newrecord = Caml_array.caml_array_dup(state);
          return /* tuple */[
                  (newrecord[/* deviceManagerRecord */9] = /* record */[
                      /* gl */Caml_option.some(gl),
                      /* colorWrite */colorWrite,
                      /* depthWrite */depthWrite,
                      /* clearColor */clearColor,
                      /* side */side,
                      /* depthTest */depthTest,
                      /* scissorTest */scissorTest,
                      /* scissor */scissor,
                      /* viewport */viewport
                    ], newrecord),
                  Caml_option.some(gl),
                  /* tuple */[
                    depthWrite,
                    colorWrite,
                    clearColor,
                    side,
                    depthTest,
                    scissorTest,
                    viewport,
                    scissor
                  ]
                ];
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("deep copy deviceManager record", (function (param) {
                Wonder_jest.test("gl not changed", (function (param) {
                        var match = _prepareDeviceManagerData(state[0]);
                        var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(match[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](DeviceManagerTool$Wonderjs.getGl(copiedState)), match[1]);
                      }));
                return Wonder_jest.test("directly use readonly data", (function (param) {
                              var match = _prepareDeviceManagerData(state[0]);
                              var state$1 = match[0];
                              var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$1);
                              var targetData = DeviceManagerTool$Wonderjs.getDeviceManagerRecord(state$1);
                              var copiedData = DeviceManagerTool$Wonderjs.getDeviceManagerRecord(copiedState);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              copiedData[/* depthWrite */2],
                                              copiedData[/* colorWrite */1],
                                              copiedData[/* clearColor */3],
                                              copiedData[/* side */4],
                                              copiedData[/* depthTest */5],
                                              copiedData[/* scissorTest */6],
                                              copiedData[/* viewport */8],
                                              copiedData[/* scissor */7]
                                            ]), /* tuple */[
                                          targetData[/* depthWrite */2],
                                          targetData[/* colorWrite */1],
                                          targetData[/* clearColor */3],
                                          targetData[/* side */4],
                                          targetData[/* depthTest */5],
                                          targetData[/* scissorTest */6],
                                          targetData[/* viewport */8],
                                          targetData[/* scissor */7]
                                        ]);
                            }));
              }));
        return Wonder_jest.describe("restore deviceManager record", (function (param) {
                      Wonder_jest.test("use current state->gl", (function (param) {
                              var match = _prepareDeviceManagerData(state[0]);
                              var match$1 = _prepareDeviceManagerData(MainStateTool$Wonderjs.createNewCompleteState(sandbox));
                              var newState = MainStateTool$Wonderjs.restore(match$1[0], match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](DeviceManagerTool$Wonderjs.getGl(newState)), match$1[1]);
                            }));
                      return Wonder_jest.test("use current state->data", (function (param) {
                                    var match = _prepareDeviceManagerData(state[0]);
                                    var state$1 = match[0];
                                    var match$1 = _prepareDeviceManagerData(MainStateTool$Wonderjs.createNewCompleteState(sandbox));
                                    DeviceManagerTool$Wonderjs.getDeviceManagerRecord(state$1);
                                    var currentData = DeviceManagerTool$Wonderjs.getDeviceManagerRecord(state$1);
                                    var newState = MainStateTool$Wonderjs.restore(match$1[0], state$1);
                                    var newData = DeviceManagerTool$Wonderjs.getDeviceManagerRecord(newState);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                    newData[/* depthWrite */2],
                                                    newData[/* colorWrite */1],
                                                    newData[/* clearColor */3],
                                                    newData[/* side */4],
                                                    newData[/* depthTest */5],
                                                    newData[/* scissorTest */6],
                                                    newData[/* viewport */8],
                                                    newData[/* scissor */7]
                                                  ]), /* tuple */[
                                                currentData[/* depthWrite */2],
                                                currentData[/* colorWrite */1],
                                                currentData[/* clearColor */3],
                                                currentData[/* side */4],
                                                currentData[/* depthTest */5],
                                                currentData[/* scissorTest */6],
                                                currentData[/* viewport */8],
                                                currentData[/* scissor */7]
                                              ]);
                                  }));
                    }));
      }));

/*  Not a pure module */
