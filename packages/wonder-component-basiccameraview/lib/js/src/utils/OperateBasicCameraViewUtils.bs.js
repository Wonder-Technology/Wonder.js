'use strict';

var OptionSt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/OptionSt.bs.js");
var ImmutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");

function _setAllNotActive(state) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          isActiveMap: ImmutableSparseMap$WonderCommonlib.map(state.isActiveMap, (function (value) {
                  return false;
                })),
          gameObjectMap: state.gameObjectMap,
          gameObjectBasicCameraViewMap: state.gameObjectBasicCameraViewMap
        };
}

function getIsActive(state, cameraView) {
  return OptionSt$WonderCommonlib.getWithDefault(ImmutableSparseMap$WonderCommonlib.get(state.isActiveMap, cameraView), false);
}

function setIsActive(state, cameraView, isActive) {
  var state$1 = isActive === true ? _setAllNotActive(state) : state;
  return {
          config: state$1.config,
          maxIndex: state$1.maxIndex,
          isActiveMap: ImmutableSparseMap$WonderCommonlib.set(state$1.isActiveMap, cameraView, isActive),
          gameObjectMap: state$1.gameObjectMap,
          gameObjectBasicCameraViewMap: state$1.gameObjectBasicCameraViewMap
        };
}

exports._setAllNotActive = _setAllNotActive;
exports.getIsActive = getIsActive;
exports.setIsActive = setIsActive;
/* No side effect */
