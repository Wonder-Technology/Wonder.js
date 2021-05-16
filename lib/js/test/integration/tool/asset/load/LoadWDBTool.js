'use strict';

var Most = require("most");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var LoaderManagerSystem$Wonderjs = require("../../../../../src/asset/LoaderManagerSystem.js");

function load(wdbPath, fetchFunc, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, param) {
  var isHandleIMGUI = $staropt$star !== undefined ? $staropt$star : true;
  var isBindEvent = $staropt$star$1 !== undefined ? $staropt$star$1 : true;
  var isActiveCamera = $staropt$star$2 !== undefined ? $staropt$star$2 : true;
  var isRenderLight = $staropt$star$3 !== undefined ? $staropt$star$3 : true;
  var isLoadImage = $staropt$star$4 !== undefined ? $staropt$star$4 : true;
  var handleWhenLoadingFunc = $staropt$star$5 !== undefined ? $staropt$star$5 : (function (contentLength, wdbPath) {
        return /* () */0;
      });
  var result = /* record */[/* contents */1];
  return Most.forEach((function (data) {
                  result[0] = data;
                  return /* () */0;
                }), LoaderManagerSystem$Wonderjs.loadWholeWDB(wdbPath, /* tuple */[
                    isHandleIMGUI,
                    isBindEvent,
                    isActiveCamera,
                    isRenderLight,
                    isLoadImage
                  ], /* tuple */[
                    fetchFunc,
                    handleWhenLoadingFunc
                  ], MainStateTool$Wonderjs.unsafeGetState(/* () */0))).then((function (param) {
                return Promise.resolve(result[0]);
              }));
}

exports.load = load;
/* most Not a pure module */
