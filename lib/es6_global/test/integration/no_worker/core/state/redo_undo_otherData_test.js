

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as RandomTool$Wonderjs from "../../../../tool/RandomTool.js";
import * as RenderTool$Wonderjs from "../../../../tool/service/render/RenderTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as VboBufferTool$Wonderjs from "../../../../tool/service/vboBuffer/VboBufferTool.js";
import * as MutableSparseMapTool$Wonderjs from "../../../../tool/structure/MutableSparseMapTool.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

Wonder_jest.describe("test redo,undo other data", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _prepareTypeArrayPoolData = function (state) {
          var float32ArrayPoolMap = MutableSparseMapTool$Wonderjs.createByArr(/* array */[/* array */[new Float32Array(/* array */[RandomTool$Wonderjs.getRandomFloat(3)])]]);
          var uint16ArrayPoolMap = MutableSparseMapTool$Wonderjs.createByArr(/* array */[/* array */[new Uint16Array(/* array */[RandomTool$Wonderjs.getRandomInt(3)])]]);
          var newrecord = Caml_array.caml_array_dup(state);
          return /* tuple */[
                  (newrecord[/* typeArrayPoolRecord */38] = /* record */[
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
          MutableSparseMapService$WonderCommonlib.set(0, 10, match[/* geometryVertexBufferMap */0]);
          MutableSparseMapService$WonderCommonlib.set(0, 11, match[/* geometryTexCoordBufferMap */1]);
          MutableSparseMapService$WonderCommonlib.set(0, 12, match[/* geometryNormalBufferMap */2]);
          MutableSparseMapService$WonderCommonlib.set(0, 13, match[/* geometryElementArrayBufferMap */3]);
          MutableSparseMapService$WonderCommonlib.set(0, 14, match[/* matrixInstanceBufferMap */4]);
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
                state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("deepCopyForRestore", (function (param) {
                Wonder_jest.describe("deep copy vbo buffer record", (function (param) {
                        return Wonder_jest.test("clear all buffer map and all buffer pool record", (function (param) {
                                      var match = _prepareVboBufferData(state[0]);
                                      var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(match[0]);
                                      var match$1 = VboBufferTool$Wonderjs.getVboBufferRecord(copiedState);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                return Wonder_jest.describe("deep copy typeArrayPool record", (function (param) {
                              return Wonder_jest.test("clear pool map", (function (param) {
                                            var match = _prepareTypeArrayPoolData(state[0]);
                                            var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(match[0]);
                                            var match$1 = copiedState[/* typeArrayPoolRecord */38];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            match$1[/* float32ArrayPoolMap */0],
                                                            match$1[/* uint16ArrayPoolMap */1]
                                                          ]), /* tuple */[
                                                        MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
                                                        MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
                                                      ]);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("restore", (function (param) {
                      Wonder_jest.describe("restore render record to target state", (function (param) {
                              Wonder_jest.test("clear cameraRecord", (function (param) {
                                      var state$1 = state[0];
                                      var newrecord = Caml_array.caml_array_dup(state$1);
                                      var init = RenderTool$Wonderjs.getRenderRecord(state$1);
                                      newrecord[/* renderRecord */34] = /* record */[
                                        /* basicRenderObjectRecord */init[/* basicRenderObjectRecord */0],
                                        /* lightRenderObjectRecord */init[/* lightRenderObjectRecord */1],
                                        /* cameraRecord */1,
                                        /* textureRecord */init[/* textureRecord */3]
                                      ];
                                      MainStateTool$Wonderjs.restore(MainStateTool$Wonderjs.createNewCompleteState(sandbox), newrecord);
                                      var match = RenderTool$Wonderjs.getRenderRecord(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                      var cameraRecord = match[/* cameraRecord */2];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](cameraRecord), undefined);
                                    }));
                              return Wonder_jest.test("basicRenderObjectRecord, lightRenderObjectRecord use targetState's corresponding record", (function (param) {
                                            var state$1 = state[0];
                                            var targetBasicRenderObjectRecord = 10;
                                            var targetLightRenderObjectRecord = 11;
                                            var newrecord = Caml_array.caml_array_dup(state$1);
                                            var init = RenderTool$Wonderjs.getRenderRecord(state$1);
                                            newrecord[/* renderRecord */34] = /* record */[
                                              /* basicRenderObjectRecord */targetBasicRenderObjectRecord,
                                              /* lightRenderObjectRecord */targetLightRenderObjectRecord,
                                              /* cameraRecord */init[/* cameraRecord */2],
                                              /* textureRecord */init[/* textureRecord */3]
                                            ];
                                            MainStateTool$Wonderjs.restore(MainStateTool$Wonderjs.createNewCompleteState(sandbox), newrecord);
                                            var match = RenderTool$Wonderjs.getRenderRecord(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                            var basicRenderObjectRecord = match[/* basicRenderObjectRecord */0];
                                            var lightRenderObjectRecord = match[/* lightRenderObjectRecord */1];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            basicRenderObjectRecord,
                                                            lightRenderObjectRecord
                                                          ]), /* tuple */[
                                                        targetBasicRenderObjectRecord,
                                                        targetLightRenderObjectRecord
                                                      ]);
                                          }));
                            }));
                      Wonder_jest.describe("restore global temp record to target state", (function (param) {
                              return Wonder_jest.test("use current record->float16Array1", (function (param) {
                                            var state$1 = state[0];
                                            var currentState = MainStateTool$Wonderjs.createNewCompleteState(sandbox);
                                            var record = currentState[/* globalTempRecord */37];
                                            record[/* float16Array1 */0] = new Float32Array(/* array */[2]);
                                            MainStateTool$Wonderjs.restore(currentState, state$1);
                                            var match = MainStateTool$Wonderjs.unsafeGetState(/* () */0)[/* globalTempRecord */37];
                                            var float16Array1 = match[/* float16Array1 */0];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](float16Array1), record[/* float16Array1 */0]);
                                          }));
                            }));
                      return Wonder_jest.describe("restore vbo buffer record to target state", (function (param) {
                                    Wonder_jest.test("clear buffer map record", (function (param) {
                                            var match = _prepareVboBufferData(state[0]);
                                            var match$1 = _prepareVboBufferData(MainStateTool$Wonderjs.createNewCompleteState(sandbox));
                                            var newState = MainStateTool$Wonderjs.restore(match$1[0], match[0]);
                                            var match$2 = VboBufferTool$Wonderjs.getVboBufferRecord(newState);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                                    return Wonder_jest.test("add current state->vboBufferRecord->geometryVertexBufferMap, geometryTexCoordBufferMap, geometryNormalBufferMap, geometryElementArrayBufferMap, matrixInstanceBufferMap buffer to pool", (function (param) {
                                                  var match = _prepareVboBufferData(state[0]);
                                                  var match$1 = _prepareVboBufferData(MainStateTool$Wonderjs.createNewCompleteState(sandbox));
                                                  var match$2 = match$1[3];
                                                  var match$3 = match$1[2];
                                                  MainStateTool$Wonderjs.restore(match$1[0], match[0]);
                                                  var match$4 = VboBufferTool$Wonderjs.getVboBufferRecord(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                    }));
      }));

export {
  
}
/*  Not a pure module */
