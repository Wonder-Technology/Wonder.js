

import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as SparseMapService$Wonderjs from "../../../../atom/SparseMapService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function _setEventHandleFunc(cameraController, handleFunc, eventHandleFuncMap) {
  var match = SparseMapService$Wonderjs.length(SparseMapService$Wonderjs.getValidValues(eventHandleFuncMap)) > 0;
  if (match) {
    Log$WonderLog.warn("expect only has one arcballCameraController, but actual > 1. please dispose others.");
  }
  return SparseMapService$WonderCommonlib.set(cameraController, handleFunc, eventHandleFuncMap);
}

function setPointDragEventHandleFunc(cameraController, handleFunc, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragEventHandleFuncMap */_setEventHandleFunc(cameraController, handleFunc, record[/* pointDragEventHandleFuncMap */1]),
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */2],
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */3],
          /* dirtyArray */record[/* dirtyArray */4],
          /* distanceMap */record[/* distanceMap */5],
          /* minDistanceMap */record[/* minDistanceMap */6],
          /* phiMap */record[/* phiMap */7],
          /* thetaMap */record[/* thetaMap */8],
          /* thetaMarginMap */record[/* thetaMarginMap */9],
          /* targetMap */record[/* targetMap */10],
          /* moveSpeedXMap */record[/* moveSpeedXMap */11],
          /* moveSpeedYMap */record[/* moveSpeedYMap */12],
          /* rotateSpeedMap */record[/* rotateSpeedMap */13],
          /* wheelSpeedMap */record[/* wheelSpeedMap */14],
          /* gameObjectMap */record[/* gameObjectMap */15],
          /* disposedIndexArray */record[/* disposedIndexArray */16]
        ];
}

function setPointScaleEventHandleFunc(cameraController, handleFunc, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragEventHandleFuncMap */record[/* pointDragEventHandleFuncMap */1],
          /* pointScaleEventHandleFuncMap */_setEventHandleFunc(cameraController, handleFunc, record[/* pointScaleEventHandleFuncMap */2]),
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */3],
          /* dirtyArray */record[/* dirtyArray */4],
          /* distanceMap */record[/* distanceMap */5],
          /* minDistanceMap */record[/* minDistanceMap */6],
          /* phiMap */record[/* phiMap */7],
          /* thetaMap */record[/* thetaMap */8],
          /* thetaMarginMap */record[/* thetaMarginMap */9],
          /* targetMap */record[/* targetMap */10],
          /* moveSpeedXMap */record[/* moveSpeedXMap */11],
          /* moveSpeedYMap */record[/* moveSpeedYMap */12],
          /* rotateSpeedMap */record[/* rotateSpeedMap */13],
          /* wheelSpeedMap */record[/* wheelSpeedMap */14],
          /* gameObjectMap */record[/* gameObjectMap */15],
          /* disposedIndexArray */record[/* disposedIndexArray */16]
        ];
}

function setKeydownEventHandleFunc(cameraController, handleFunc, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragEventHandleFuncMap */record[/* pointDragEventHandleFuncMap */1],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */2],
          /* keydownEventHandleFuncMap */_setEventHandleFunc(cameraController, handleFunc, record[/* keydownEventHandleFuncMap */3]),
          /* dirtyArray */record[/* dirtyArray */4],
          /* distanceMap */record[/* distanceMap */5],
          /* minDistanceMap */record[/* minDistanceMap */6],
          /* phiMap */record[/* phiMap */7],
          /* thetaMap */record[/* thetaMap */8],
          /* thetaMarginMap */record[/* thetaMarginMap */9],
          /* targetMap */record[/* targetMap */10],
          /* moveSpeedXMap */record[/* moveSpeedXMap */11],
          /* moveSpeedYMap */record[/* moveSpeedYMap */12],
          /* rotateSpeedMap */record[/* rotateSpeedMap */13],
          /* wheelSpeedMap */record[/* wheelSpeedMap */14],
          /* gameObjectMap */record[/* gameObjectMap */15],
          /* disposedIndexArray */record[/* disposedIndexArray */16]
        ];
}

export {
  _setEventHandleFunc ,
  setPointDragEventHandleFunc ,
  setPointScaleEventHandleFunc ,
  setKeydownEventHandleFunc ,
  
}
/* Log-WonderLog Not a pure module */
