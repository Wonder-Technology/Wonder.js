

import * as Caml_array from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";
import * as RecordTransformMainService$Wonderjs from "../../transform/RecordTransformMainService.js";
import * as ModelMatrixTransformService$Wonderjs from "../../../../record/main/transform/ModelMatrixTransformService.js";
import * as OperateFlyCameraControllerService$Wonderjs from "../../../../record/main/camera_controller/fly/OperateFlyCameraControllerService.js";

function getLocalEulerAngleOrInit(transformComponent, state) {
  var flyCameraControllerRecord = state[/* flyCameraControllerRecord */26];
  var match = OperateFlyCameraControllerService$Wonderjs.getLocalEulerAngle(transformComponent, flyCameraControllerRecord);
  if (match !== undefined) {
    var match$1 = match;
    return /* tuple */[
            /* tuple */[
              match$1[0],
              match$1[1],
              match$1[2]
            ],
            state
          ];
  } else {
    var localEulerAngle = ModelMatrixTransformService$Wonderjs.getLocalEulerAnglesTuple(transformComponent, RecordTransformMainService$Wonderjs.getRecord(state)[/* localRotations */4]);
    var flyCameraControllerRecord$1 = OperateFlyCameraControllerService$Wonderjs.setLocalEulerAngle(transformComponent, localEulerAngle, flyCameraControllerRecord);
    var newrecord = Caml_array.caml_array_dup(state);
    return /* tuple */[
            localEulerAngle,
            (newrecord[/* flyCameraControllerRecord */26] = flyCameraControllerRecord$1, newrecord)
          ];
  }
}

function getLocalEulerAngleWithDiffValueAndSetToMap(transformComponent, param, state) {
  var flyCameraControllerRecord = state[/* flyCameraControllerRecord */26];
  var match = getLocalEulerAngleOrInit(transformComponent, state);
  var match$1 = match[0];
  var flyCameraControllerRecord$1 = OperateFlyCameraControllerService$Wonderjs.setLocalEulerAngle(transformComponent, /* tuple */[
        match$1[0] - param[0],
        match$1[1] - param[1],
        match$1[2]
      ], flyCameraControllerRecord);
  var newrecord = Caml_array.caml_array_dup(match[1]);
  return /* tuple */[
          OptionService$Wonderjs.unsafeGet(OperateFlyCameraControllerService$Wonderjs.getLocalEulerAngle(transformComponent, flyCameraControllerRecord$1)),
          (newrecord[/* flyCameraControllerRecord */26] = flyCameraControllerRecord$1, newrecord)
        ];
}

export {
  getLocalEulerAngleOrInit ,
  getLocalEulerAngleWithDiffValueAndSetToMap ,
  
}
/* OptionService-Wonderjs Not a pure module */
