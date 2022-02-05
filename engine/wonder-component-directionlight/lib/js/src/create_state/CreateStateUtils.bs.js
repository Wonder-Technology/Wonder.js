'use strict';

var ListSt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/ListSt.bs.js");
var CreateMapComponentUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/CreateMapComponentUtils.bs.js");
var BufferDirectionLightUtils$WonderComponentWorkerUtils = require("wonder-component-worker-utils/lib/js/src/directionlight/BufferDirectionLightUtils.bs.js");
var CreateTypeArrayDirectionLightUtils$WonderComponentWorkerUtils = require("wonder-component-worker-utils/lib/js/src/directionlight/CreateTypeArrayDirectionLightUtils.bs.js");
var OperateTypeArrayDirectionLightUtils$WonderComponentDirectionlight = require("../utils/OperateTypeArrayDirectionLightUtils.bs.js");

function _setAllTypeArrDataToDefault(param, count, param$1) {
  var defaultIntensity = param$1[1];
  var defaultColor = param$1[0];
  var intensities = param[1];
  var colors = param[0];
  ListSt$WonderCommonlib.forEach(ListSt$WonderCommonlib.range(0, count - 1 | 0), (function (index) {
          OperateTypeArrayDirectionLightUtils$WonderComponentDirectionlight.setColor(index, defaultColor, colors);
          return OperateTypeArrayDirectionLightUtils$WonderComponentDirectionlight.setIntensity(index, defaultIntensity, intensities);
        }));
  return [
          colors,
          intensities
        ];
}

function _initBufferData(count, defaultDataTuple) {
  var buffer = BufferDirectionLightUtils$WonderComponentWorkerUtils.createBuffer(count);
  var typeArrData = _setAllTypeArrDataToDefault(CreateTypeArrayDirectionLightUtils$WonderComponentWorkerUtils.createTypeArrays(buffer, count), count, defaultDataTuple);
  return [
          buffer,
          typeArrData
        ];
}

function createStateWithSharedArrayBufferData(param, param$1) {
  var lightCount = param[1];
  var colors = param$1.colors;
  var intensities = param$1.intensities;
  return {
          config: {
            isDebug: param[0],
            directionLightCount: lightCount
          },
          maxIndex: 0,
          buffer: param$1.buffer,
          colors: colors,
          intensities: intensities,
          gameObjectMap: CreateMapComponentUtils$WonderCommonlib.createEmptyMap(lightCount),
          gameObjectDirectionLightMap: CreateMapComponentUtils$WonderCommonlib.createEmptyMap(lightCount)
        };
}

function createState(isDebug, lightCount) {
  var match = _initBufferData(lightCount, [
        [
          1,
          1,
          1
        ],
        1.0
      ]);
  var match$1 = match[1];
  return createStateWithSharedArrayBufferData([
              isDebug,
              lightCount
            ], {
              buffer: match[0],
              colors: match$1[0],
              intensities: match$1[1]
            });
}

exports._setAllTypeArrDataToDefault = _setAllTypeArrDataToDefault;
exports._initBufferData = _initBufferData;
exports.createStateWithSharedArrayBufferData = createStateWithSharedArrayBufferData;
exports.createState = createState;
/* No side effect */
