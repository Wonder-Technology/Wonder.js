

import * as AddComponentService$Wonderjs from "../../../primitive/component/AddComponentService.js";

function handleAddComponent(cameraProjection, gameObjectUid, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* dirtyArray */record[/* dirtyArray */1],
          /* pMatrixMap */record[/* pMatrixMap */2],
          /* nearMap */record[/* nearMap */3],
          /* farMap */record[/* farMap */4],
          /* fovyMap */record[/* fovyMap */5],
          /* aspectMap */record[/* aspectMap */6],
          /* gameObjectMap */AddComponentService$Wonderjs.addComponentToGameObjectMap(cameraProjection, gameObjectUid, record[/* gameObjectMap */7]),
          /* disposedIndexArray */record[/* disposedIndexArray */8]
        ];
}

export {
  handleAddComponent ,
  
}
/* AddComponentService-Wonderjs Not a pure module */
