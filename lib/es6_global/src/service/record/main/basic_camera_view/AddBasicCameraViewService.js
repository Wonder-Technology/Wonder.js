

import * as AddComponentService$Wonderjs from "../../../primitive/component/AddComponentService.js";

function handleAddComponent(cameraView, gameObjectUid, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* isActiveMap */record[/* isActiveMap */1],
          /* gameObjectMap */AddComponentService$Wonderjs.addComponentToGameObjectMap(cameraView, gameObjectUid, record[/* gameObjectMap */2]),
          /* disposedIndexArray */record[/* disposedIndexArray */3]
        ];
}

export {
  handleAddComponent ,
  
}
/* AddComponentService-Wonderjs Not a pure module */
