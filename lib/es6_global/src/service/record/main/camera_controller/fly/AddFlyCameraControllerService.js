

import * as AddComponentService$Wonderjs from "../../../../primitive/component/AddComponentService.js";

function handleAddComponent(cameraController, gameObjectUid, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* pointDragStartEventHandleFuncListMap */record[/* pointDragStartEventHandleFuncListMap */1],
          /* pointDragDropEventHandleFuncListMap */record[/* pointDragDropEventHandleFuncListMap */2],
          /* pointDragOverEventHandleFuncListMap */record[/* pointDragOverEventHandleFuncListMap */3],
          /* pointScaleEventHandleFuncListMap */record[/* pointScaleEventHandleFuncListMap */4],
          /* keydownEventHandleFuncListMap */record[/* keydownEventHandleFuncListMap */5],
          /* keyupEventHandleFuncListMap */record[/* keyupEventHandleFuncListMap */6],
          /* moveSpeedMap */record[/* moveSpeedMap */7],
          /* wheelSpeedMap */record[/* wheelSpeedMap */8],
          /* rotateSpeedMap */record[/* rotateSpeedMap */9],
          /* eulerAngleDiffMap */record[/* eulerAngleDiffMap */10],
          /* translationDiffMap */record[/* translationDiffMap */11],
          /* gameObjectMap */AddComponentService$Wonderjs.addComponentToGameObjectMap(cameraController, gameObjectUid, record[/* gameObjectMap */12]),
          /* disposedIndexArray */record[/* disposedIndexArray */13],
          /* directionArrayMap */record[/* directionArrayMap */14],
          /* localEulerAngleMap */record[/* localEulerAngleMap */15]
        ];
}

export {
  handleAddComponent ,
  
}
/* AddComponentService-Wonderjs Not a pure module */
