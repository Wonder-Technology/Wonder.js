

import * as ListSt$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as CreateMapComponentUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/CreateMapComponentUtils.bs.js";
import * as BufferDirectionLightUtils$WonderComponentWorkerUtils from "../../../../../../node_modules/wonder-component-worker-utils/lib/es6_global/src/directionlight/BufferDirectionLightUtils.bs.js";
import * as CreateTypeArrayDirectionLightUtils$WonderComponentWorkerUtils from "../../../../../../node_modules/wonder-component-worker-utils/lib/es6_global/src/directionlight/CreateTypeArrayDirectionLightUtils.bs.js";
import * as OperateTypeArrayDirectionLightUtils$WonderComponentDirectionlight from "../utils/OperateTypeArrayDirectionLightUtils.bs.js";

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

export {
  _setAllTypeArrDataToDefault ,
  _initBufferData ,
  createStateWithSharedArrayBufferData ,
  createState ,
  
}
/* No side effect */
