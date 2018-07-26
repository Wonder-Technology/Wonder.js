

import * as AddComponentService$Wonderjs from "../../../../primitive/component/AddComponentService.js";

function handleAddComponent(material, gameObjectUid, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* shaderIndices */record[/* shaderIndices */2],
          /* colors */record[/* colors */3],
          /* textureIndices */record[/* textureIndices */4],
          /* mapUnits */record[/* mapUnits */5],
          /* textureCountMap */record[/* textureCountMap */6],
          /* defaultColor */record[/* defaultColor */7],
          /* gameObjectMap */AddComponentService$Wonderjs.addComponentToGameObjectMap(material, gameObjectUid, record[/* gameObjectMap */8]),
          /* groupCountMap */record[/* groupCountMap */9],
          /* disposedIndexArray */record[/* disposedIndexArray */10],
          /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */11]
        ];
}

export {
  handleAddComponent ,
  
}
/* No side effect */
