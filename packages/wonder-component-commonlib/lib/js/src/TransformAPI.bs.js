'use strict';

var Main$WonderCore = require("wonder-core/lib/js/src/Main.bs.js");
var Matrix4$WonderCommonlib = require("wonder-commonlib/lib/js/src/math/Matrix4.bs.js");
var Quaternion$WonderCommonlib = require("wonder-commonlib/lib/js/src/math/Quaternion.bs.js");
var NullableTool$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/test/NullableTool.bs.js");
var Index$WonderComponentTypeTransform = require("wonder-component-type-transform/lib/js/index.bs.js");

function lookAt(data, transform, target, upOpt, param) {
  var up = upOpt !== undefined ? upOpt : [
      0,
      1,
      0
    ];
  return Main$WonderCore.setComponentData(data, transform, Index$WonderComponentTypeTransform.dataName.rotation, Quaternion$WonderCommonlib.setFromMatrix(Matrix4$WonderCommonlib.setLookAt(NullableTool$WonderCommonlib.getExn(Main$WonderCore.getComponentData(data, transform, Index$WonderComponentTypeTransform.dataName.position)), target, up)));
}

exports.lookAt = lookAt;
/* Main-WonderCore Not a pure module */
