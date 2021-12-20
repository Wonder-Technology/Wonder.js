'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var CanvasDoService$WonderMiddlewareEventmanager = require("../../dom/CanvasDoService.bs.js");
var HandleDomEventDoService$WonderMiddlewareEventmanager = require("./HandleDomEventDoService.bs.js");

function getLocationInView(domEvent, getLocationFunc, po) {
  var canvas = CanvasDoService$WonderMiddlewareEventmanager.getCanvas(po);
  if (canvas === undefined) {
    return [
            0,
            0
          ];
  }
  var match = CanvasDoService$WonderMiddlewareEventmanager.getOffset(Caml_option.valFromOption(canvas));
  var match$1 = Curry._2(getLocationFunc, domEvent, po);
  return [
          match$1[0] - match[0] | 0,
          match$1[1] - match[1] | 0
        ];
}

function getMovementDelta($$location, lastXYTuple, po) {
  var lastX = lastXYTuple[0];
  if (lastX !== undefined) {
    var lastY = lastXYTuple[1];
    if (lastY !== undefined) {
      return [
              $$location[0] - lastX | 0,
              $$location[1] - lastY | 0
            ];
    }
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "HandlePointDomEventDoService.res",
            17,
            2
          ],
          Error: new Error()
        };
  }
  if (lastXYTuple[1] === undefined) {
    return [
            0,
            0
          ];
  }
  throw {
        RE_EXN_ID: "Match_failure",
        _1: [
          "HandlePointDomEventDoService.res",
          17,
          2
        ],
        Error: new Error()
      };
}

var preventDefault = HandleDomEventDoService$WonderMiddlewareEventmanager.preventDefault;

exports.getLocationInView = getLocationInView;
exports.getMovementDelta = getMovementDelta;
exports.preventDefault = preventDefault;
/* No side effect */
