

import * as AddComponentService$Wonderjs from "../../../../primitive/component/AddComponentService.js";

function handleAddComponent(geometry, gameObjectUid, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* vertices */record[/* vertices */2],
          /* texCoords */record[/* texCoords */3],
          /* normals */record[/* normals */4],
          /* indices */record[/* indices */5],
          /* verticesInfos */record[/* verticesInfos */6],
          /* texCoordsInfos */record[/* texCoordsInfos */7],
          /* normalsInfos */record[/* normalsInfos */8],
          /* indicesInfos */record[/* indicesInfos */9],
          /* verticesOffset */record[/* verticesOffset */10],
          /* texCoordsOffset */record[/* texCoordsOffset */11],
          /* normalsOffset */record[/* normalsOffset */12],
          /* indicesOffset */record[/* indicesOffset */13],
          /* disposeCount */record[/* disposeCount */14],
          /* gameObjectMap */AddComponentService$Wonderjs.addComponentToGameObjectMap(geometry, gameObjectUid, record[/* gameObjectMap */15]),
          /* groupCountMap */record[/* groupCountMap */16],
          /* disposedIndexArray */record[/* disposedIndexArray */17],
          /* disposedIndexMap */record[/* disposedIndexMap */18],
          /* aliveIndexArray */record[/* aliveIndexArray */19]
        ];
}

export {
  handleAddComponent ,
  
}
/* No side effect */
