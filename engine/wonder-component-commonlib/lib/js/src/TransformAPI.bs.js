'use strict';

var Main$WonderEngineCore = require("wonder-engine-core/lib/js/src/Main.bs.js");
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
  return Main$WonderEngineCore.setComponentData(data, transform, Index$WonderComponentTypeTransform.dataName.rotation, Quaternion$WonderCommonlib.setFromMatrix(Matrix4$WonderCommonlib.setLookAt(NullableTool$WonderCommonlib.getExn(Main$WonderEngineCore.getComponentData(data, transform, Index$WonderComponentTypeTransform.dataName.position)), target, up)));
}

exports.lookAt = lookAt;
/* Main-WonderEngineCore Not a pure module */
