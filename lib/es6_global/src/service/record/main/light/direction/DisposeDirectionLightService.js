

import * as Contract$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../../state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as DisposeComponentService$Wonderjs from "../../../../primitive/component/DisposeComponentService.js";
import * as DisposeTypeArrayService$Wonderjs from "../../../../primitive/buffer/DisposeTypeArrayService.js";
import * as RenderLightArrLightService$Wonderjs from "../RenderLightArrLightService.js";
import * as BufferDirectionLightService$Wonderjs from "./BufferDirectionLightService.js";
import * as RecordDirectionLightMainService$Wonderjs from "../../../../state/main/light/direction/RecordDirectionLightMainService.js";

function isAlive(light, param) {
  return DisposeComponentService$Wonderjs.isAlive(light, param[/* disposedIndexArray */6]);
}

function _disposeData(light, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* colors */DisposeTypeArrayService$Wonderjs.deleteAndResetFloat32TypeArr(BufferDirectionLightService$Wonderjs.getColorIndex(light), BufferDirectionLightService$Wonderjs.getColorsSize(/* () */0), RecordDirectionLightMainService$Wonderjs.getDefaultColor(/* () */0), record[/* colors */2]),
          /* intensities */DisposeTypeArrayService$Wonderjs.deleteAndResetFloat32(BufferDirectionLightService$Wonderjs.getIntensityIndex(light), RecordDirectionLightMainService$Wonderjs.getDefaultIntensity(/* () */0), record[/* intensities */3]),
          /* renderLightArr */RenderLightArrLightService$Wonderjs.removeFromRenderLightArr(light, record[/* renderLightArr */4]),
          /* gameObjectMap */DisposeComponentService$Wonderjs.disposeSparseMapData(light, record[/* gameObjectMap */5]),
          /* disposedIndexArray */record[/* disposedIndexArray */6]
        ];
}

function handleBatchDisposeComponent(lightArray, record) {
  Contract$WonderLog.requireCheck((function (param) {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(lightArray, isAlive, record);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var match = lightArray.length;
  if (match !== 0) {
    var record_000 = /* index */record[/* index */0];
    var record_001 = /* buffer */record[/* buffer */1];
    var record_002 = /* colors */record[/* colors */2];
    var record_003 = /* intensities */record[/* intensities */3];
    var record_004 = /* renderLightArr */record[/* renderLightArr */4];
    var record_005 = /* gameObjectMap */record[/* gameObjectMap */5];
    var record_006 = /* disposedIndexArray */record[/* disposedIndexArray */6].concat(lightArray);
    var record$1 = /* record */[
      record_000,
      record_001,
      record_002,
      record_003,
      record_004,
      record_005,
      record_006
    ];
    return ArrayService$WonderCommonlib.reduceOneParam((function (record, light) {
                  return _disposeData(light, record);
                }), record$1, lightArray);
  } else {
    return record;
  }
}

export {
  isAlive ,
  _disposeData ,
  handleBatchDisposeComponent ,
  
}
/* Contract-WonderLog Not a pure module */
