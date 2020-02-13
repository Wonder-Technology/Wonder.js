

import * as Contract$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../../state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferPointLightService$Wonderjs from "./BufferPointLightService.js";
import * as DisposeComponentService$Wonderjs from "../../../../primitive/component/DisposeComponentService.js";
import * as DisposeTypeArrayService$Wonderjs from "../../../../primitive/buffer/DisposeTypeArrayService.js";
import * as RenderLightArrLightService$Wonderjs from "../RenderLightArrLightService.js";
import * as RecordPointLightMainService$Wonderjs from "../../../../state/main/light/point/RecordPointLightMainService.js";

function isAlive(light, param) {
  return DisposeComponentService$Wonderjs.isAlive(light, param[/* disposedIndexArray */9]);
}

function _disposeData(light, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* colors */DisposeTypeArrayService$Wonderjs.deleteAndResetFloat32TypeArr(BufferPointLightService$Wonderjs.getColorIndex(light), BufferPointLightService$Wonderjs.getColorsSize(/* () */0), RecordPointLightMainService$Wonderjs.getDefaultColor(/* () */0), record[/* colors */2]),
          /* intensities */DisposeTypeArrayService$Wonderjs.deleteAndResetFloat32(BufferPointLightService$Wonderjs.getIntensityIndex(light), RecordPointLightMainService$Wonderjs.getDefaultIntensity(/* () */0), record[/* intensities */3]),
          /* constants */DisposeTypeArrayService$Wonderjs.deleteAndResetFloat32(BufferPointLightService$Wonderjs.getConstantIndex(light), RecordPointLightMainService$Wonderjs.getDefaultConstant(/* () */0), record[/* constants */4]),
          /* linears */DisposeTypeArrayService$Wonderjs.deleteAndResetFloat32(BufferPointLightService$Wonderjs.getLinearIndex(light), RecordPointLightMainService$Wonderjs.getDefaultLinear(/* () */0), record[/* linears */5]),
          /* quadratics */DisposeTypeArrayService$Wonderjs.deleteAndResetFloat32(BufferPointLightService$Wonderjs.getQuadraticIndex(light), RecordPointLightMainService$Wonderjs.getDefaultQuadratic(/* () */0), record[/* quadratics */6]),
          /* ranges */DisposeTypeArrayService$Wonderjs.deleteAndResetFloat32(BufferPointLightService$Wonderjs.getRangeIndex(light), RecordPointLightMainService$Wonderjs.getDefaultRange(/* () */0), record[/* ranges */7]),
          /* renderLightArr */RenderLightArrLightService$Wonderjs.removeFromRenderLightArr(light, record[/* renderLightArr */8]),
          /* disposedIndexArray */record[/* disposedIndexArray */9],
          /* gameObjectMap */DisposeComponentService$Wonderjs.disposeSparseMapData(light, record[/* gameObjectMap */10])
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
    var record_004 = /* constants */record[/* constants */4];
    var record_005 = /* linears */record[/* linears */5];
    var record_006 = /* quadratics */record[/* quadratics */6];
    var record_007 = /* ranges */record[/* ranges */7];
    var record_008 = /* renderLightArr */record[/* renderLightArr */8];
    var record_009 = /* disposedIndexArray */record[/* disposedIndexArray */9].concat(lightArray);
    var record_010 = /* gameObjectMap */record[/* gameObjectMap */10];
    var record$1 = /* record */[
      record_000,
      record_001,
      record_002,
      record_003,
      record_004,
      record_005,
      record_006,
      record_007,
      record_008,
      record_009,
      record_010
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
