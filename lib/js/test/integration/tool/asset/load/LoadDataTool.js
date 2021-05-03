'use strict';

var Most = require("most");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var LoaderManagerSystem$Wonderjs = require("../../../../../src/asset/LoaderManagerSystem.js");

function load(jsonPathArr, fetchFunc, $staropt$star, param) {
  var nextFunc = $staropt$star !== undefined ? $staropt$star : (function (record) {
        return /* () */0;
      });
  return Most.forEach(nextFunc, LoaderManagerSystem$Wonderjs.loadConfig(jsonPathArr, fetchFunc, MainStateTool$Wonderjs.getStateData(/* () */0)));
}

function buildFakeFetchJsonResponse(jsonStr) {
  return Promise.resolve({
              json: (function (param) {
                  return Promise.resolve(JSON.parse(jsonStr));
                })
            });
}

exports.load = load;
exports.buildFakeFetchJsonResponse = buildFakeFetchJsonResponse;
/* most Not a pure module */
