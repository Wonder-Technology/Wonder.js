

import * as AddComponentService$Wonderjs from "../../../../primitive/component/AddComponentService.js";

function handleAddComponent(sourceInstance, gameObjectUid, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* objectInstanceTransformIndexMap */record[/* objectInstanceTransformIndexMap */1],
          /* buffer */record[/* buffer */2],
          /* isTransformStatics */record[/* isTransformStatics */3],
          /* objectInstanceTransformCollections */record[/* objectInstanceTransformCollections */4],
          /* matrixInstanceBufferCapacityMap */record[/* matrixInstanceBufferCapacityMap */5],
          /* matrixFloat32ArrayMap */record[/* matrixFloat32ArrayMap */6],
          /* isSendTransformMatrixDataMap */record[/* isSendTransformMatrixDataMap */7],
          /* disposedIndexArray */record[/* disposedIndexArray */8],
          /* gameObjectMap */AddComponentService$Wonderjs.addComponentToGameObjectMap(sourceInstance, gameObjectUid, record[/* gameObjectMap */9])
        ];
}

export {
  handleAddComponent ,
  
}
/* AddComponentService-Wonderjs Not a pure module */
