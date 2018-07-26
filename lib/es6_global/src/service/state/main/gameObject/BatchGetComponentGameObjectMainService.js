

import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ComponentMapService$Wonderjs from "../../../primitive/gameObject/ComponentMapService.js";
import * as CurrentComponentDataMapService$Wonderjs from "../../../record/all/gameObject/CurrentComponentDataMapService.js";

function batchGetBasicCameraViewComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* basicCameraViewMap */23]);
}

function batchGetPerspectiveCameraProjectionComponent(uidArray, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* perspectiveCameraProjectionMap */24]);
}

function batchGetArcballCameraControllerComponent(uidArray, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* arcballCameraControllerMap */25]);
}

function batchGetTransformComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* transformMap */22]);
}

function batchGetGeometryComponentData(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  var geometryDataMap = gameObjectRecord[/* geometryDataMap */21];
  var boxGeometryType = CurrentComponentDataMapService$Wonderjs.getBoxGeometryType(/* () */0);
  var customGeometryType = CurrentComponentDataMapService$Wonderjs.getCustomGeometryType(/* () */0);
  return ArrayService$WonderCommonlib.reduceOneParam((function (arrTuple, uid) {
                var match = CurrentComponentDataMapService$Wonderjs.getComponentData(uid, geometryDataMap);
                if (match !== undefined) {
                  var match$1 = match;
                  var type_ = match$1[1];
                  var component = match$1[0];
                  if (type_ === boxGeometryType) {
                    ArrayService$Wonderjs.push(component, arrTuple[0]);
                  } else if (type_ === customGeometryType) {
                    ArrayService$Wonderjs.push(component, arrTuple[1]);
                  } else {
                    Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("unknown type_", "", "", "", "type_: " + (String(type_) + "")));
                  }
                  return arrTuple;
                } else {
                  return arrTuple;
                }
              }), /* tuple */[
              /* array */[],
              /* array */[]
            ], uidArray);
}

function batchGetBasicMaterialComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* basicMaterialMap */27]);
}

function batchGetLightMaterialComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* lightMaterialMap */28]);
}

function batchGetMeshRendererComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* meshRendererMap */26]);
}

function batchGetDirectionLightComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* directionLightMap */31]);
}

function batchGetPointLightComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* pointLightMap */32]);
}

function batchGetSourceInstanceComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* sourceInstanceMap */29]);
}

function batchGetObjectInstanceComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* objectInstanceMap */30]);
}

export {
  batchGetBasicCameraViewComponent ,
  batchGetPerspectiveCameraProjectionComponent ,
  batchGetArcballCameraControllerComponent ,
  batchGetTransformComponent ,
  batchGetGeometryComponentData ,
  batchGetBasicMaterialComponent ,
  batchGetLightMaterialComponent ,
  batchGetMeshRendererComponent ,
  batchGetDirectionLightComponent ,
  batchGetPointLightComponent ,
  batchGetSourceInstanceComponent ,
  batchGetObjectInstanceComponent ,
  
}
/* Log-WonderLog Not a pure module */
