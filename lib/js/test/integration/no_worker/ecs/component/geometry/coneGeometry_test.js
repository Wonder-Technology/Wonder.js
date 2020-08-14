'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../../tool/TestTool.js");
var GeometryAPI$Wonderjs = require("../../../../../../src/api/geometry/GeometryAPI.js");
var MainStateTool$Wonderjs = require("../../../../../tool/service/state/MainStateTool.js");

Wonder_jest.describe("cone geometry", (function (param) {
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
        return Wonder_jest.describe("createConeGeometry", (function (param) {
                      return Wonder_jest.test("create a new geometry which is just index(int)", (function (param) {
                                    var match = GeometryAPI$Wonderjs.createConeGeometry(3, 10, 2, 2, state[0]);
                                    var geometry = match[1];
                                    var state$1 = match[0];
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                    GeometryAPI$Wonderjs.getGeometryVertices(geometry, state$1),
                                                    GeometryAPI$Wonderjs.getGeometryNormals(geometry, state$1),
                                                    GeometryAPI$Wonderjs.getGeometryTexCoords(geometry, state$1),
                                                    GeometryAPI$Wonderjs.getGeometryIndices16(geometry, state$1)
                                                  ]), /* tuple */[
                                                new Float32Array(/* array */[
                                                      0,
                                                      5,
                                                      0,
                                                      0,
                                                      5,
                                                      -0,
                                                      -0,
                                                      5,
                                                      0,
                                                      0,
                                                      0,
                                                      1.5,
                                                      1.8369701465288538e-16,
                                                      0,
                                                      -1.5,
                                                      -3.6739402930577075e-16,
                                                      0,
                                                      1.5,
                                                      0,
                                                      -5,
                                                      3,
                                                      3.6739402930577075e-16,
                                                      -5,
                                                      -3,
                                                      -7.347880586115415e-16,
                                                      -5,
                                                      3,
                                                      0,
                                                      -5,
                                                      0,
                                                      0,
                                                      -5,
                                                      0,
                                                      0,
                                                      -5,
                                                      3,
                                                      3.6739402930577075e-16,
                                                      -5,
                                                      -3,
                                                      -7.347880586115415e-16,
                                                      -5,
                                                      3
                                                    ]),
                                                new Float32Array(/* array */[
                                                      0,
                                                      1,
                                                      0.5,
                                                      1,
                                                      1,
                                                      1,
                                                      0,
                                                      0.5,
                                                      0.5,
                                                      0.5,
                                                      1,
                                                      0.5,
                                                      0,
                                                      0,
                                                      0.5,
                                                      0,
                                                      1,
                                                      0,
                                                      0.5,
                                                      0.5,
                                                      0.5,
                                                      0.5,
                                                      1,
                                                      0.5,
                                                      0,
                                                      0.5,
                                                      1,
                                                      0.5
                                                    ]),
                                                new Float32Array(/* array */[
                                                      0,
                                                      0.30000001192092896,
                                                      1,
                                                      1.2246468525851679e-16,
                                                      0.30000001192092896,
                                                      -1,
                                                      -2.4492937051703357e-16,
                                                      0.30000001192092896,
                                                      1,
                                                      0,
                                                      0.30000001192092896,
                                                      1,
                                                      1.2246468525851679e-16,
                                                      0.30000001192092896,
                                                      -1,
                                                      -2.4492937051703357e-16,
                                                      0.30000001192092896,
                                                      1,
                                                      0,
                                                      0.30000001192092896,
                                                      1,
                                                      1.2246468525851679e-16,
                                                      0.30000001192092896,
                                                      -1,
                                                      -2.4492937051703357e-16,
                                                      0.30000001192092896,
                                                      1,
                                                      0,
                                                      -1,
                                                      0,
                                                      0,
                                                      -1,
                                                      0,
                                                      0,
                                                      -1,
                                                      0,
                                                      0,
                                                      -1,
                                                      0,
                                                      0,
                                                      -1,
                                                      0
                                                    ]),
                                                new Uint16Array(/* array */[
                                                      0,
                                                      3,
                                                      1,
                                                      3,
                                                      4,
                                                      1,
                                                      3,
                                                      6,
                                                      4,
                                                      6,
                                                      7,
                                                      4,
                                                      1,
                                                      4,
                                                      2,
                                                      4,
                                                      5,
                                                      2,
                                                      4,
                                                      7,
                                                      5,
                                                      7,
                                                      8,
                                                      5,
                                                      12,
                                                      11,
                                                      9,
                                                      13,
                                                      12,
                                                      10
                                                    ])
                                              ]);
                                  }));
                    }));
      }));

/*  Not a pure module */
