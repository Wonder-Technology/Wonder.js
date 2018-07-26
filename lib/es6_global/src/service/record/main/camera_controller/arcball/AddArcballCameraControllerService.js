

import * as AddComponentService$Wonderjs from "../../../../primitive/component/AddComponentService.js";

function handleAddComponent(cameraController, gameObjectUid, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragEventHandleFuncMap */record[/* pointDragEventHandleFuncMap */1],
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
          /* gameObjectMap */AddComponentService$Wonderjs.addComponentToGameObjectMap(cameraController, gameObjectUid, record[/* gameObjectMap */15]),
          /* disposedIndexArray */record[/* disposedIndexArray */16]
        ];
}

export {
  handleAddComponent ,
  
}
/* No side effect */
