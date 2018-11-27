'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../tool/TestTool.js");
var SparseMapAPI$Wonderjs = require("../../../src/api/structure/SparseMapAPI.js");
var CreateStateMainService$Wonderjs = require("../../../src/service/state/main/state/CreateStateMainService.js");

describe("SparseMap", (function () {
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
        describe("unsafeGetSparseMapValue", (function () {
                return Wonder_jest.test("test", (function () {
                              var map = SparseMapAPI$Wonderjs.setSparseMapValue(1, "aaa", SparseMapAPI$Wonderjs.createSparseMap(/* () */0));
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SparseMapAPI$Wonderjs.unsafeGetSparseMapValue(1, map)), "aaa");
                            }));
              }));
        describe("getSparseMap", (function () {
                return Wonder_jest.test("test", (function () {
                              var map = SparseMapAPI$Wonderjs.setSparseMapValue(1, "aaa", SparseMapAPI$Wonderjs.createSparseMap(/* () */0));
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              SparseMapAPI$Wonderjs.getSparseMapValue(0, map),
                                              SparseMapAPI$Wonderjs.getSparseMapValue(1, map)
                                            ]), /* tuple */[
                                          undefined,
                                          "aaa"
                                        ]);
                            }));
              }));
        describe("mergeSparseMaps", (function () {
                return Wonder_jest.test("merge sparse map arr", (function () {
                              var map1 = SparseMapAPI$Wonderjs.setSparseMapValue(1, "aaa", SparseMapAPI$Wonderjs.createSparseMap(/* () */0));
                              var map2 = SparseMapAPI$Wonderjs.setSparseMapValue(3, "b", SparseMapAPI$Wonderjs.createSparseMap(/* () */0));
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SparseMapAPI$Wonderjs.mergeSparseMaps(/* array */[
                                                  map1,
                                                  map2
                                                ])), SparseMapAPI$Wonderjs.setSparseMapValue(3, "b", SparseMapAPI$Wonderjs.setSparseMapValue(1, "aaa", SparseMapAPI$Wonderjs.createSparseMap(/* () */0))));
                            }));
              }));
        return /* () */0;
      }));

/*  Not a pure module */
