

import * as AddComponentService$Wonderjs from "../../../../primitive/component/AddComponentService.js";

function handleAddComponent(geometry, gameObjectUid, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* vertices */record[/* vertices */1],
          /* texCoords */record[/* texCoords */2],
          /* normals */record[/* normals */3],
          /* indices */record[/* indices */4],
          /* gameObjectMap */AddComponentService$Wonderjs.addComponentToGameObjectMap(geometry, gameObjectUid, record[/* gameObjectMap */5]),
          /* groupCountMap */record[/* groupCountMap */6],
          /* disposedIndexArray */record[/* disposedIndexArray */7]
        ];
}

export {
  handleAddComponent ,
  
}
/* No side effect */
