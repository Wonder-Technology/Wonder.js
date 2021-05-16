'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../tool/TestTool.js");
var MainStateTool$Wonderjs = require("../../tool/service/state/MainStateTool.js");
var RenderStateTool$Wonderjs = require("../../tool/state/RenderStateTool.js");
var TypeArrayPoolTool$Wonderjs = require("../../tool/structure/TypeArrayPoolTool.js");
var TypeArrayPoolService$Wonderjs = require("../../../src/service/record/main/typeArrayPool/TypeArrayPoolService.js");
var InstanceBufferRenderService$Wonderjs = require("../../../src/service/state/render/vboBuffer/InstanceBufferRenderService.js");
var MutableSparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/MutableSparseMapService.js");

Wonder_jest.describe("InstanceBufferRenderService", (function (param) {
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
        return Wonder_jest.describe("getOrCreateMatrixFloat32Array", (function (param) {
                      return Wonder_jest.test("test get typeArr from pool", (function (param) {
                                    var capacityMap = MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0);
                                    var matrixFloat32ArrayMap = MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0);
                                    var typeArr1 = new Float32Array(/* array */[
                                          0,
                                          0,
                                          1
                                        ]);
                                    TypeArrayPoolTool$Wonderjs.addFloat32TypeArrayToPool(typeArr1, 1000, TypeArrayPoolService$Wonderjs.getFloat32ArrayPoolMap(state[0][/* typeArrayPoolRecord */38]));
                                    var typeArr2 = InstanceBufferRenderService$Wonderjs.getOrCreateMatrixFloat32Array(0, 12, /* tuple */[
                                          capacityMap,
                                          matrixFloat32ArrayMap
                                        ], RenderStateTool$Wonderjs.createState(state[0]));
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                    typeArr2,
                                                    MutableSparseMapService$WonderCommonlib.unsafeGet(typeArr1.length, TypeArrayPoolTool$Wonderjs.getFloat32ArrayPoolMap(state[0][/* typeArrayPoolRecord */38])).length
                                                  ]), /* tuple */[
                                                typeArr1,
                                                0
                                              ]);
                                  }));
                    }));
      }));

/*  Not a pure module */
