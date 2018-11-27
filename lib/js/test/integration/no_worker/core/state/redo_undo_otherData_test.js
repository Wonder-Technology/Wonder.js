'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var RandomTool$Wonderjs = require("../../../../tool/RandomTool.js");
var RenderTool$Wonderjs = require("../../../../tool/service/render/RenderTool.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var VboBufferTool$Wonderjs = require("../../../../tool/service/vboBuffer/VboBufferTool.js");
var DeviceManagerTool$Wonderjs = require("../../../../tool/service/device/DeviceManagerTool.js");
var SparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/SparseMapService.js");

describe("test redo,undo other data", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _prepareDeviceManagerData = function (state) {
          DeviceManagerTool$Wonderjs.getDeviceManagerRecord(state);
          var gl = RandomTool$Wonderjs.getRandomFloat(10);
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
                      /* gl */Js_primitive.some(gl),
                      /* colorWrite */colorWrite,
                      /* clearColor */clearColor,
                      /* side */side,
                      /* depthTest */depthTest,
                      /* scissorTest */scissorTest,
                      /* scissor */scissor,
                      /* viewport */viewport
                    ], newrecord),
                  Js_primitive.some(gl),
                  /* tuple */[
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
        var _prepareTypeArrayPoolData = function (state) {
          var float32ArrayPoolMap = /* array */[/* array */[new Float32Array(/* array */[RandomTool$Wonderjs.getRandomFloat(3)])]];
          var uint16ArrayPoolMap = /* array */[/* array */[new Uint16Array(/* array */[RandomTool$Wonderjs.getRandomInt(3)])]];
          var newrecord = Caml_array.caml_array_dup(state);
          return /* tuple */[
                  (newrecord[/* typeArrayPoolRecord */35] = /* record */[
                      /* float32ArrayPoolMap */float32ArrayPoolMap,
                      /* uint16ArrayPoolMap */uint16ArrayPoolMap
                    ], newrecord),
                  /* tuple */[
                    float32ArrayPoolMap,
                    uint16ArrayPoolMap
                  ]
                ];
        };
        var _prepareVboBufferData = function (state) {
          var match = VboBufferTool$Wonderjs.getVboBufferRecord(state);
          var vertexArrayBufferPool = match[/* vertexArrayBufferPool */5];
          vertexArrayBufferPool.push(0);
          vertexArrayBufferPool.push(1);
          vertexArrayBufferPool.push(2);
          match[/* elementArrayBufferPool */6].push(3);
          match[/* matrixInstanceBufferPool */7].push(4);
          SparseMapService$WonderCommonlib.set(0, 10, match[/* geometryVertexBufferMap */0]);
          SparseMapService$WonderCommonlib.set(0, 11, match[/* geometryTexCoordBufferMap */1]);
          SparseMapService$WonderCommonlib.set(0, 12, match[/* geometryNormalBufferMap */2]);
          SparseMapService$WonderCommonlib.set(0, 13, match[/* geometryElementArrayBufferMap */3]);
          SparseMapService$WonderCommonlib.set(0, 14, match[/* matrixInstanceBufferMap */4]);
          return /* tuple */[
                  state,
                  0,
                  /* tuple */[
                    10,
                    11,
                    12,
                    13,
                    14
                  ],
                  /* tuple */[
                    0,
                    1,
                    2,
                    3,
                    4
                  ]
                ];
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("deepCopyForRestore", (function () {
                describe("deep copy deviceManager record", (function () {
                        Wonder_jest.test("clear gl", (function () {
                                var match = _prepareDeviceManagerData(state[0]);
                                var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(match[0]);
                                var match$1 = DeviceManagerTool$Wonderjs.getDeviceManagerRecord(copiedState);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[/* gl */0]), undefined);
                              }));
                        return Wonder_jest.test("directly use readonly record", (function () {
                                      var match = _prepareDeviceManagerData(state[0]);
                                      var state$1 = match[0];
                                      var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$1);
                                      var targetData = DeviceManagerTool$Wonderjs.getDeviceManagerRecord(state$1);
                                      var copiedData = DeviceManagerTool$Wonderjs.getDeviceManagerRecord(copiedState);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      copiedData[/* colorWrite */1],
                                                      copiedData[/* clearColor */2],
                                                      copiedData[/* side */3],
                                                      copiedData[/* depthTest */4],
                                                      copiedData[/* scissorTest */5],
                                                      copiedData[/* viewport */7],
                                                      copiedData[/* scissor */6]
                                                    ]), /* tuple */[
                                                  targetData[/* colorWrite */1],
                                                  targetData[/* clearColor */2],
                                                  targetData[/* side */3],
                                                  targetData[/* depthTest */4],
                                                  targetData[/* scissorTest */5],
                                                  targetData[/* viewport */7],
                                                  targetData[/* scissor */6]
                                                ]);
                                    }));
                      }));
                describe("deep copy vbo buffer record", (function () {
                        return Wonder_jest.test("clear all buffer map and all buffer pool record", (function () {
                                      var match = _prepareVboBufferData(state[0]);
                                      var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(match[0]);
                                      var match$1 = VboBufferTool$Wonderjs.getVboBufferRecord(copiedState);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      match$1[/* geometryVertexBufferMap */0],
                                                      match$1[/* geometryTexCoordBufferMap */1],
                                                      match$1[/* geometryNormalBufferMap */2],
                                                      match$1[/* geometryElementArrayBufferMap */3],
                                                      match$1[/* matrixInstanceBufferMap */4],
                                                      match$1[/* vertexArrayBufferPool */5],
                                                      match$1[/* elementArrayBufferPool */6],
                                                      match$1[/* matrixInstanceBufferPool */7]
                                                    ]), /* tuple */[
                                                  /* array */[],
                                                  /* array */[],
                                                  /* array */[],
                                                  /* array */[],
                                                  /* array */[],
                                                  /* array */[],
                                                  /* array */[],
                                                  /* array */[]
                                                ]);
                                    }));
                      }));
                describe("deep copy typeArrayPool record", (function () {
                        return Wonder_jest.test("clear pool map", (function () {
                                      var match = _prepareTypeArrayPoolData(state[0]);
                                      var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(match[0]);
                                      var match$1 = copiedState[/* typeArrayPoolRecord */35];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      match$1[/* float32ArrayPoolMap */0],
                                                      match$1[/* uint16ArrayPoolMap */1]
                                                    ]), /* tuple */[
                                                  SparseMapService$WonderCommonlib.createEmpty(/* () */0),
                                                  SparseMapService$WonderCommonlib.createEmpty(/* () */0)
                                                ]);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("restore", (function () {
                describe("restore render record to target state", (function () {
                        Wonder_jest.test("clear cameraRecord", (function () {
                                var state$1 = state[0];
                                var newrecord = Caml_array.caml_array_dup(state$1);
                                var init = RenderTool$Wonderjs.getRenderRecord(state$1);
                                newrecord[/* renderRecord */31] = /* record */[
                                  /* basicRenderObjectRecord */init[/* basicRenderObjectRecord */0],
                                  /* lightRenderObjectRecord */init[/* lightRenderObjectRecord */1],
                                  /* cameraRecord */1
                                ];
                                MainStateTool$Wonderjs.restore(MainStateTool$Wonderjs.createNewCompleteState(sandbox), newrecord);
                                var match = RenderTool$Wonderjs.getRenderRecord(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                var cameraRecord = match[/* cameraRecord */2];
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](cameraRecord), undefined);
                              }));
                        return Wonder_jest.test("basicRenderObjectRecord, lightRenderObjectRecord use targetState's corresponding record", (function () {
                                      var state$1 = state[0];
                                      var targetBasicRenderObjectRecord = 10;
                                      var targetLightRenderObjectRecord = 11;
                                      var newrecord = Caml_array.caml_array_dup(state$1);
                                      var init = RenderTool$Wonderjs.getRenderRecord(state$1);
                                      newrecord[/* renderRecord */31] = /* record */[
                                        /* basicRenderObjectRecord */targetBasicRenderObjectRecord,
                                        /* lightRenderObjectRecord */targetLightRenderObjectRecord,
                                        /* cameraRecord */init[/* cameraRecord */2]
                                      ];
                                      MainStateTool$Wonderjs.restore(MainStateTool$Wonderjs.createNewCompleteState(sandbox), newrecord);
                                      var match = RenderTool$Wonderjs.getRenderRecord(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                      var basicRenderObjectRecord = match[/* basicRenderObjectRecord */0];
                                      var lightRenderObjectRecord = match[/* lightRenderObjectRecord */1];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      basicRenderObjectRecord,
                                                      lightRenderObjectRecord
                                                    ]), /* tuple */[
                                                  targetBasicRenderObjectRecord,
                                                  targetLightRenderObjectRecord
                                                ]);
                                    }));
                      }));
                describe("restore global temp record to target state", (function () {
                        return Wonder_jest.test("use current record->float16Array1", (function () {
                                      var state$1 = state[0];
                                      var currentState = MainStateTool$Wonderjs.createNewCompleteState(sandbox);
                                      var record = currentState[/* globalTempRecord */34];
                                      record[/* float16Array1 */0] = new Float32Array(/* array */[2]);
                                      MainStateTool$Wonderjs.restore(currentState, state$1);
                                      var match = MainStateTool$Wonderjs.unsafeGetState(/* () */0)[/* globalTempRecord */34];
                                      var float16Array1 = match[/* float16Array1 */0];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](float16Array1), record[/* float16Array1 */0]);
                                    }));
                      }));
                describe("restore vbo buffer record to target state", (function () {
                        Wonder_jest.test("clear buffer map record", (function () {
                                var match = _prepareVboBufferData(state[0]);
                                var match$1 = _prepareVboBufferData(MainStateTool$Wonderjs.createNewCompleteState(sandbox));
                                var newState = MainStateTool$Wonderjs.restore(match$1[0], match[0]);
                                var match$2 = VboBufferTool$Wonderjs.getVboBufferRecord(newState);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                match$2[/* geometryVertexBufferMap */0],
                                                match$2[/* geometryTexCoordBufferMap */1],
                                                match$2[/* geometryNormalBufferMap */2],
                                                match$2[/* geometryElementArrayBufferMap */3],
                                                match$2[/* matrixInstanceBufferMap */4]
                                              ]), /* tuple */[
                                            /* array */[],
                                            /* array */[],
                                            /* array */[],
                                            /* array */[],
                                            /* array */[]
                                          ]);
                              }));
                        return Wonder_jest.test("add current state->vboBufferRecord->geometryVertexBufferMap, geometryTexCoordBufferMap, geometryNormalBufferMap, geometryElementArrayBufferMap, matrixInstanceBufferMap buffer to pool", (function () {
                                      var match = _prepareVboBufferData(state[0]);
                                      var match$1 = _prepareVboBufferData(MainStateTool$Wonderjs.createNewCompleteState(sandbox));
                                      var match$2 = match$1[3];
                                      var match$3 = match$1[2];
                                      MainStateTool$Wonderjs.restore(match$1[0], match[0]);
                                      var match$4 = VboBufferTool$Wonderjs.getVboBufferRecord(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      match$4[/* vertexArrayBufferPool */5],
                                                      match$4[/* elementArrayBufferPool */6],
                                                      match$4[/* matrixInstanceBufferPool */7]
                                                    ]), /* tuple */[
                                                  /* array */[
                                                    match$2[0],
                                                    match$2[1],
                                                    match$2[2],
                                                    match$3[0],
                                                    match$3[1],
                                                    match$3[2]
                                                  ],
                                                  /* array */[
                                                    match$2[3],
                                                    match$3[3]
                                                  ],
                                                  /* array */[
                                                    match$2[4],
                                                    match$3[4]
                                                  ]
                                                ]);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

/*  Not a pure module */
