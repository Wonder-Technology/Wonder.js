

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as CloneGeometryService$Wonderjs from "../../../record/main/geometry/CloneGeometryService.js";
import * as ClonePointLightService$Wonderjs from "../../../record/main/light/point/ClonePointLightService.js";
import * as CloneScriptMainService$Wonderjs from "../script/CloneScriptMainService.js";
import * as CloneTransformMainService$Wonderjs from "../transform/CloneTransformMainService.js";
import * as CloneDirectionLightService$Wonderjs from "../../../record/main/light/direction/CloneDirectionLightService.js";
import * as RecordPointLightMainService$Wonderjs from "../light/point/RecordPointLightMainService.js";
import * as CloneMeshRendererMainService$Wonderjs from "../meshRenderer/CloneMeshRendererMainService.js";
import * as CloneBasicMaterialMainService$Wonderjs from "../material/basic/CloneBasicMaterialMainService.js";
import * as CloneLightMaterialMainService$Wonderjs from "../material/light/CloneLightMaterialMainService.js";
import * as CloneBasicCameraViewMainService$Wonderjs from "../basic_camera_view/CloneBasicCameraViewMainService.js";
import * as CloneFlyCameraControllerService$Wonderjs from "../../../record/main/camera_controller/fly/CloneFlyCameraControllerService.js";
import * as RecordDirectionLightMainService$Wonderjs from "../light/direction/RecordDirectionLightMainService.js";
import * as CloneArcballCameraControllerService$Wonderjs from "../../../record/main/camera_controller/arcball/CloneArcballCameraControllerService.js";
import * as ClonePerspectiveCameraProjectionService$Wonderjs from "../../../record/main/perspective_camera_projection/ClonePerspectiveCameraProjectionService.js";

var cloneScriptComponent = CloneScriptMainService$Wonderjs.handleCloneComponent;

var cloneBasicCameraViewComponent = CloneBasicCameraViewMainService$Wonderjs.handleCloneComponent;

function clonePerspectiveCameraProjectionComponent(sourceComponent, countRangeArr, state) {
  var perspectiveCameraProjectionRecord = state[/* perspectiveCameraProjectionRecord */14];
  var match = ClonePerspectiveCameraProjectionService$Wonderjs.handleCloneComponent(sourceComponent, countRangeArr, perspectiveCameraProjectionRecord);
  var newrecord = Caml_array.caml_array_dup(state);
  return /* tuple */[
          (newrecord[/* perspectiveCameraProjectionRecord */14] = match[0], newrecord),
          match[1]
        ];
}

function cloneFlyCameraControllerComponent(sourceComponent, countRangeArr, state) {
  var flyCameraControllerRecord = state[/* flyCameraControllerRecord */26];
  var match = CloneFlyCameraControllerService$Wonderjs.handleCloneComponent(sourceComponent, countRangeArr, flyCameraControllerRecord);
  var newrecord = Caml_array.caml_array_dup(state);
  return /* tuple */[
          (newrecord[/* flyCameraControllerRecord */26] = match[0], newrecord),
          match[1]
        ];
}

function cloneArcballCameraControllerComponent(sourceComponent, countRangeArr, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */25];
  var match = CloneArcballCameraControllerService$Wonderjs.handleCloneComponent(sourceComponent, countRangeArr, arcballCameraControllerRecord);
  var newrecord = Caml_array.caml_array_dup(state);
  return /* tuple */[
          (newrecord[/* arcballCameraControllerRecord */25] = match[0], newrecord),
          match[1]
        ];
}

var cloneTransformComponent = CloneTransformMainService$Wonderjs.handleCloneComponent;

function cloneMeshRendererComponent(sourceComponent, countRangeArr, state) {
  var match = CloneMeshRendererMainService$Wonderjs.handleCloneComponent(sourceComponent, countRangeArr, state);
  return /* tuple */[
          match[0],
          match[1]
        ];
}

function cloneGeometryComponent(sourceComponent, countRangeArr, state) {
  var geometryRecord = state[/* geometryRecord */23];
  var match = CloneGeometryService$Wonderjs.handleCloneComponent(sourceComponent, countRangeArr, geometryRecord);
  var newrecord = Caml_array.caml_array_dup(state);
  return /* tuple */[
          (newrecord[/* geometryRecord */23] = match[0], newrecord),
          match[1]
        ];
}

function cloneBasicMaterialComponent(isShareMaterial, sourceComponent, countRangeArr, state) {
  return CloneBasicMaterialMainService$Wonderjs.handleCloneComponent(sourceComponent, countRangeArr, isShareMaterial, state);
}

function cloneLightMaterialComponent(isShareMaterial, sourceComponent, countRangeArr, state) {
  return CloneLightMaterialMainService$Wonderjs.handleCloneComponent(sourceComponent, countRangeArr, isShareMaterial, state);
}

function cloneDirectionLightComponent(sourceComponent, countRangeArr, state) {
  var match = CloneDirectionLightService$Wonderjs.handleCloneComponent(sourceComponent, countRangeArr, RecordDirectionLightMainService$Wonderjs.getRecord(state));
  var newrecord = Caml_array.caml_array_dup(state);
  return /* tuple */[
          (newrecord[/* directionLightRecord */21] = match[0], newrecord),
          match[1]
        ];
}

function clonePointLightComponent(sourceComponent, countRangeArr, state) {
  var match = ClonePointLightService$Wonderjs.handleCloneComponent(sourceComponent, countRangeArr, RecordPointLightMainService$Wonderjs.getRecord(state));
  var newrecord = Caml_array.caml_array_dup(state);
  return /* tuple */[
          (newrecord[/* pointLightRecord */22] = match[0], newrecord),
          match[1]
        ];
}

export {
  cloneScriptComponent ,
  cloneBasicCameraViewComponent ,
  clonePerspectiveCameraProjectionComponent ,
  cloneFlyCameraControllerComponent ,
  cloneArcballCameraControllerComponent ,
  cloneTransformComponent ,
  cloneMeshRendererComponent ,
  cloneGeometryComponent ,
  cloneBasicMaterialComponent ,
  cloneLightMaterialComponent ,
  cloneDirectionLightComponent ,
  clonePointLightComponent ,
  
}
/* ClonePointLightService-Wonderjs Not a pure module */
