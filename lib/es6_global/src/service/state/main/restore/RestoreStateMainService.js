

import * as StateDataMainService$Wonderjs from "../state/StateDataMainService.js";
import * as TypeArrayPoolService$Wonderjs from "../../../record/main/typeArrayPool/TypeArrayPoolService.js";
import * as AllDeviceManagerService$Wonderjs from "../../../record/all/device/AllDeviceManagerService.js";
import * as RestoreRenderMainService$Wonderjs from "./RestoreRenderMainService.js";
import * as RestoreShaderMainService$Wonderjs from "./RestoreShaderMainService.js";
import * as RestoreProgramMainService$Wonderjs from "./RestoreProgramMainService.js";
import * as RestoreGeometryMainService$Wonderjs from "./RestoreGeometryMainService.js";
import * as RestoreTransformMainService$Wonderjs from "./RestoreTransformMainService.js";
import * as RestoreVboBufferMainService$Wonderjs from "./RestoreVboBufferMainService.js";
import * as RestoreGLSLSenderMainService$Wonderjs from "./RestoreGLSLSenderMainService.js";
import * as RestoreGlobalTempMainService$Wonderjs from "./RestoreGlobalTempMainService.js";
import * as RestorePointLightMainService$Wonderjs from "./RestorePointLightMainService.js";
import * as RestoreGLSLLocationMainService$Wonderjs from "./RestoreGLSLLocationMainService.js";
import * as RestoreMeshRendererMainService$Wonderjs from "./RestoreMeshRendererMainService.js";
import * as RestoreBasicMaterialMainService$Wonderjs from "./RestoreBasicMaterialMainService.js";
import * as RestoreDeviceManagerMainService$Wonderjs from "./RestoreDeviceManagerMainService.js";
import * as RestoreLightMaterialMainService$Wonderjs from "./RestoreLightMaterialMainService.js";
import * as RestoreSourceTextureMainService$Wonderjs from "./RestoreSourceTextureMainService.js";
import * as RestoreTypeArrayPoolMainService$Wonderjs from "./RestoreTypeArrayPoolMainService.js";
import * as RestoreCubemapTextureMainService$Wonderjs from "./RestoreCubemapTextureMainService.js";
import * as RestoreDirectionLightMainService$Wonderjs from "./RestoreDirectionLightMainService.js";
import * as RestoreSourceInstanceMainService$Wonderjs from "./RestoreSourceInstanceMainService.js";
import * as RestoreBasicSourceTextureMainService$Wonderjs from "./RestoreBasicSourceTextureMainService.js";
import * as RestoreArrayBufferViewSourceTextureMainService$Wonderjs from "./RestoreArrayBufferViewSourceTextureMainService.js";

function _getSharedData(currentState) {
  var typeArrayPoolRecord = currentState[/* typeArrayPoolRecord */38];
  return /* record */[
          /* gl */AllDeviceManagerService$Wonderjs.unsafeGetGl(currentState[/* deviceManagerRecord */9]),
          /* float32ArrayPoolMap */TypeArrayPoolService$Wonderjs.getFloat32ArrayPoolMap(typeArrayPoolRecord),
          /* uint16ArrayPoolMap */TypeArrayPoolService$Wonderjs.getUint16ArrayPoolMap(typeArrayPoolRecord)
        ];
}

function restore(stateData, currentState, targetState) {
  var sharedData = _getSharedData(currentState);
  var match = RestoreSourceInstanceMainService$Wonderjs.restore(currentState, sharedData, targetState);
  var targetState$1 = RestoreDeviceManagerMainService$Wonderjs.restore(currentState, match[0]);
  var gl = AllDeviceManagerService$Wonderjs.unsafeGetGl(targetState$1[/* deviceManagerRecord */9]);
  return StateDataMainService$Wonderjs.setState(stateData, RestoreCubemapTextureMainService$Wonderjs.restore(currentState, RestoreArrayBufferViewSourceTextureMainService$Wonderjs.restore(currentState, RestoreBasicSourceTextureMainService$Wonderjs.restore(currentState, RestoreSourceTextureMainService$Wonderjs.restore(currentState, RestorePointLightMainService$Wonderjs.restore(currentState, RestoreDirectionLightMainService$Wonderjs.restore(currentState, RestoreGeometryMainService$Wonderjs.restore(currentState, RestoreMeshRendererMainService$Wonderjs.restore(currentState, RestoreTransformMainService$Wonderjs.restore(currentState, RestoreRenderMainService$Wonderjs.restore(currentState, RestoreLightMaterialMainService$Wonderjs.restore(gl, currentState, RestoreBasicMaterialMainService$Wonderjs.restore(gl, currentState, RestoreGLSLSenderMainService$Wonderjs.restore(currentState, RestoreGLSLLocationMainService$Wonderjs.restore(currentState, RestoreProgramMainService$Wonderjs.restore(currentState, RestoreShaderMainService$Wonderjs.restore(currentState, RestoreVboBufferMainService$Wonderjs.restore(currentState, RestoreGlobalTempMainService$Wonderjs.restore(currentState, RestoreTypeArrayPoolMainService$Wonderjs.restore(currentState, match[1], targetState$1))))))))))))))))))));
}

export {
  _getSharedData ,
  restore ,
  
}
/* StateDataMainService-Wonderjs Not a pure module */
