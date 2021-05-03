

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as RecordAllGLSLService$Wonderjs from "../../../record/all/glsl/RecordAllGLSLService.js";
import * as RecordAllShaderService$Wonderjs from "../../../record/all/shader/RecordAllShaderService.js";
import * as RecordEventMainService$Wonderjs from "../event/RecordEventMainService.js";
import * as RecordVboBufferService$Wonderjs from "../../../record/main/vboBuffer/RecordVboBufferService.js";
import * as RecordGameObjectService$Wonderjs from "../../../record/main/gameObject/RecordGameObjectService.js";
import * as RecordScriptMainService$Wonderjs from "../script/RecordScriptMainService.js";
import * as RecordGeometryMainService$Wonderjs from "../geometry/RecordGeometryMainService.js";
import * as RecordGLSLSenderAllService$Wonderjs from "../../all/sender/RecordGLSLSenderAllService.js";
import * as RecordTransformMainService$Wonderjs from "../transform/RecordTransformMainService.js";
import * as RecordTypeArrayPoolService$Wonderjs from "../../../record/main/typeArrayPool/RecordTypeArrayPoolService.js";
import * as RecordObjectInstanceService$Wonderjs from "../../../record/main/instance/objectInstance/RecordObjectInstanceService.js";
import * as RecordPointLightMainService$Wonderjs from "../light/point/RecordPointLightMainService.js";
import * as RecordBasicCameraViewService$Wonderjs from "../../../record/main/basic_camera_view/RecordBasicCameraViewService.js";
import * as RecordAllDeviceManagerService$Wonderjs from "../../../record/all/device/RecordAllDeviceManagerService.js";
import * as RecordMeshRendererMainService$Wonderjs from "../meshRenderer/RecordMeshRendererMainService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "../material/basic/RecordBasicMaterialMainService.js";
import * as RecordLightMaterialMainService$Wonderjs from "../material/light/RecordLightMaterialMainService.js";
import * as RecordCubemapTextureMainService$Wonderjs from "../texture/cubemap/RecordCubemapTextureMainService.js";
import * as RecordDirectionLightMainService$Wonderjs from "../light/direction/RecordDirectionLightMainService.js";
import * as RecordSourceInstanceMainService$Wonderjs from "../instance/RecordSourceInstanceMainService.js";
import * as RecordFlyCameraControllerService$Wonderjs from "../../../record/main/camera_controller/fly/RecordFlyCameraControllerService.js";
import * as RecordBasicSourceTextureMainService$Wonderjs from "../texture/source/basic_source/RecordBasicSourceTextureMainService.js";
import * as RecordArcballCameraControllerService$Wonderjs from "../../../record/main/camera_controller/arcball/RecordArcballCameraControllerService.js";
import * as RecordPerspectiveCameraProjectionService$Wonderjs from "../../../record/main/perspective_camera_projection/RecordPerspectiveCameraProjectionService.js";
import * as RecordArrayBufferViewSourceTextureMainService$Wonderjs from "../texture/source/arrayBufferView_source/RecordArrayBufferViewSourceTextureMainService.js";

function deepCopyForRestore(state) {
  var state$1 = RecordCubemapTextureMainService$Wonderjs.deepCopyForRestore(RecordArrayBufferViewSourceTextureMainService$Wonderjs.deepCopyForRestore(RecordBasicSourceTextureMainService$Wonderjs.deepCopyForRestore(RecordPointLightMainService$Wonderjs.deepCopyForRestore(RecordDirectionLightMainService$Wonderjs.deepCopyForRestore(RecordSourceInstanceMainService$Wonderjs.deepCopyForRestore(RecordScriptMainService$Wonderjs.deepCopyForRestore(RecordGeometryMainService$Wonderjs.deepCopyForRestore(RecordMeshRendererMainService$Wonderjs.deepCopyForRestore(RecordLightMaterialMainService$Wonderjs.deepCopyForRestore(RecordBasicMaterialMainService$Wonderjs.deepCopyForRestore(RecordTransformMainService$Wonderjs.deepCopyForRestore(RecordEventMainService$Wonderjs.deepCopyForRestore(state)))))))))))));
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* objectInstanceRecord */7] = RecordObjectInstanceService$Wonderjs.deepCopyForRestore(state$1[/* objectInstanceRecord */7]);
  newrecord[/* deviceManagerRecord */9] = RecordAllDeviceManagerService$Wonderjs.deepCopyForRestore(state$1[/* deviceManagerRecord */9]);
  newrecord[/* gameObjectRecord */10] = RecordGameObjectService$Wonderjs.deepCopyForRestore(state$1[/* gameObjectRecord */10]);
  newrecord[/* basicCameraViewRecord */13] = RecordBasicCameraViewService$Wonderjs.deepCopyForRestore(state$1[/* basicCameraViewRecord */13]);
  newrecord[/* perspectiveCameraProjectionRecord */14] = RecordPerspectiveCameraProjectionService$Wonderjs.deepCopyForRestore(state$1[/* perspectiveCameraProjectionRecord */14]);
  newrecord[/* arcballCameraControllerRecord */25] = RecordArcballCameraControllerService$Wonderjs.deepCopyForRestore(state$1[/* arcballCameraControllerRecord */25]);
  newrecord[/* flyCameraControllerRecord */26] = RecordFlyCameraControllerService$Wonderjs.deepCopyForRestore(state$1[/* flyCameraControllerRecord */26]);
  newrecord[/* shaderRecord */28] = RecordAllShaderService$Wonderjs.deepCopyForRestore(state$1[/* shaderRecord */28]);
  newrecord[/* glslRecord */29] = RecordAllGLSLService$Wonderjs.deepCopyForRestore(state$1[/* glslRecord */29]);
  newrecord[/* glslSenderRecord */32] = RecordGLSLSenderAllService$Wonderjs.deepCopyForRestore(state$1[/* glslSenderRecord */32]);
  newrecord[/* vboBufferRecord */36] = RecordVboBufferService$Wonderjs.deepCopyForRestore(state$1[/* vboBufferRecord */36]);
  newrecord[/* typeArrayPoolRecord */38] = RecordTypeArrayPoolService$Wonderjs.deepCopyForRestore(state$1[/* typeArrayPoolRecord */38]);
  return newrecord;
}

export {
  deepCopyForRestore ,
  
}
/* RecordGeometryMainService-Wonderjs Not a pure module */
