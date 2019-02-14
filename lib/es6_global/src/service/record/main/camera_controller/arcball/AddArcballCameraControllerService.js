

import * as AddComponentService$Wonderjs from "../../../../primitive/component/AddComponentService.js";

function handleAddComponent(cameraController, gameObjectUid, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncMap */record[/* pointDragStartEventHandleFuncMap */1],
          /* pointDragDropEventHandleFuncMap */record[/* pointDragDropEventHandleFuncMap */2],
          /* pointDragOverEventHandleFuncMap */record[/* pointDragOverEventHandleFuncMap */3],
          /* pointScaleEventHandleFuncMap */record[/* pointScaleEventHandleFuncMap */4],
          /* keydownEventHandleFuncMap */record[/* keydownEventHandleFuncMap */5],
          /* dirtyArray */record[/* dirtyArray */6],
          /* distanceMap */record[/* distanceMap */7],
          /* minDistanceMap */record[/* minDistanceMap */8],
          /* phiMap */record[/* phiMap */9],
          /* thetaMap */record[/* thetaMap */10],
          /* thetaMarginMap */record[/* thetaMarginMap */11],
          /* targetMap */record[/* targetMap */12],
          /* moveSpeedXMap */record[/* moveSpeedXMap */13],
          /* moveSpeedYMap */record[/* moveSpeedYMap */14],
          /* rotateSpeedMap */record[/* rotateSpeedMap */15],
          /* wheelSpeedMap */record[/* wheelSpeedMap */16],
          /* gameObjectMap */AddComponentService$Wonderjs.addComponentToGameObjectMap(cameraController, gameObjectUid, record[/* gameObjectMap */17]),
          /* disposedIndexArray */record[/* disposedIndexArray */18]
        ];
}

export {
  handleAddComponent ,
  
}
/* AddComponentService-Wonderjs Not a pure module */
