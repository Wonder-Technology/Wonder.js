

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$Wonderjs from "../../../service/atom/ArrayService.js";
import * as ModelMatrixTransformService$Wonderjs from "../../../service/record/main/transform/ModelMatrixTransformService.js";

function _addTransformVector3Data(transform, localData, defaultData, getDataFunc) {
  var localData$1 = Curry._2(getDataFunc, transform, localData);
  if (localData$1[0] === Caml_array.caml_array_get(defaultData, 0) && localData$1[1] === Caml_array.caml_array_get(defaultData, 1) && localData$1[2] === Caml_array.caml_array_get(defaultData, 2)) {
    return undefined;
  } else {
    return localData$1;
  }
}

function _addTransformRotationData(transform, localRotations, defaultLocalRotation) {
  var localRotation = ModelMatrixTransformService$Wonderjs.getLocalRotationTuple(transform, localRotations);
  if (localRotation[0] === Caml_array.caml_array_get(defaultLocalRotation, 0) && localRotation[1] === Caml_array.caml_array_get(defaultLocalRotation, 1) && localRotation[2] === Caml_array.caml_array_get(defaultLocalRotation, 2) && localRotation[3] === Caml_array.caml_array_get(defaultLocalRotation, 3)) {
    return undefined;
  } else {
    return localRotation;
  }
}

function _addNodeExtraData(param, param$1) {
  var scriptIndex = param$1[5];
  var arcballCameraControllerIndex = param$1[4];
  var lightMaterialIndex = param$1[3];
  var basicMaterialIndex = param$1[2];
  var meshRendererIndex = param$1[1];
  var basicCameraViewIndex = param$1[0];
  var isRoot = param[1];
  var isActive = param[0];
  var exit = 0;
  if (isActive !== undefined || isRoot !== undefined || basicCameraViewIndex !== undefined || meshRendererIndex !== undefined || basicMaterialIndex !== undefined || lightMaterialIndex !== undefined || arcballCameraControllerIndex !== undefined || scriptIndex !== undefined) {
    exit = 1;
  } else {
    return undefined;
  }
  if (exit === 1) {
    return /* record */[
            /* basicCameraView */basicCameraViewIndex,
            /* meshRenderer */meshRendererIndex,
            /* basicMaterial */basicMaterialIndex,
            /* lightMaterial */lightMaterialIndex,
            /* cameraController */arcballCameraControllerIndex,
            /* script */scriptIndex,
            /* isActive */isActive,
            /* isRoot */isRoot
          ];
  }
  
}

function _addNodeExtensionData(lightIndex) {
  if (lightIndex !== undefined) {
    return /* record */[/* khr_lights *//* record */[/* light */lightIndex]];
  }
  
}

function addNodeAndItsComponentData(gameObject, param, param$1, nodeDataArr) {
  var match = param$1[0];
  var transform = match[0];
  return ArrayService$Wonderjs.push(/* record */[
              /* gameObject */gameObject,
              /* children */undefined,
              /* translation */_addTransformVector3Data(transform, match[1], match[4], ModelMatrixTransformService$Wonderjs.getLocalPositionTuple),
              /* rotation */_addTransformRotationData(transform, match[2], match[5]),
              /* scale */_addTransformVector3Data(transform, match[3], match[6], ModelMatrixTransformService$Wonderjs.getLocalScaleTuple),
              /* mesh */param$1[1],
              /* camera */param$1[4],
              /* extras */_addNodeExtraData(/* tuple */[
                    param[0],
                    param[1]
                  ], /* tuple */[
                    param$1[3],
                    param$1[2],
                    param$1[6],
                    param$1[7],
                    param$1[5],
                    param$1[9]
                  ]),
              /* extensions */_addNodeExtensionData(param$1[8])
            ], nodeDataArr);
}

export {
  _addTransformVector3Data ,
  _addTransformRotationData ,
  _addNodeExtraData ,
  _addNodeExtensionData ,
  addNodeAndItsComponentData ,
  
}
/* ArrayService-Wonderjs Not a pure module */
