'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var DirectionLightAPI$Wonderjs = require("../../../../../src/api/light/DirectionLightAPI.js");
var CreateStateMainService$Wonderjs = require("../../../../../src/service/state/main/state/CreateStateMainService.js");

Wonder_jest.describe("test light", (function (param) {
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
        return Wonder_jest.describe("fix bug", (function (param) {
                      return Wonder_jest.describe("test operate the light which is is-render", (function (param) {
                                    return Wonder_jest.test("if the light exceed max count, should still work", (function (param) {
                                                  var match = DirectionLightAPI$Wonderjs.createDirectionLight(state[0]);
                                                  var match$1 = DirectionLightAPI$Wonderjs.createDirectionLight(match[0]);
                                                  var match$2 = DirectionLightAPI$Wonderjs.createDirectionLight(match$1[0]);
                                                  var match$3 = DirectionLightAPI$Wonderjs.createDirectionLight(match$2[0]);
                                                  var lightExceedMaxCount = match$3[1] + 10 | 0;
                                                  var color = /* array */[
                                                    1,
                                                    0.5,
                                                    0
                                                  ];
                                                  var state$1 = DirectionLightAPI$Wonderjs.setDirectionLightColor(lightExceedMaxCount, color, match$3[0]);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](DirectionLightAPI$Wonderjs.getDirectionLightColor(lightExceedMaxCount, state$1)), color);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
