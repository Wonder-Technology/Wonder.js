

import * as AddComponentService$Wonderjs from "../../../../primitive/component/AddComponentService.js";

function handleAddComponent(material, gameObjectUid, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* shaderIndices */record[/* shaderIndices */2],
          /* colors */record[/* colors */3],
          /* textureIndices */record[/* textureIndices */4],
          /* mapUnits */record[/* mapUnits */5],
          /* emptyMapUnitArrayMap */record[/* emptyMapUnitArrayMap */6],
          /* defaultColor */record[/* defaultColor */7],
          /* gameObjectsMap */AddComponentService$Wonderjs.addSharableComponentToGameObjectsMap(material, gameObjectUid, record[/* gameObjectsMap */8]),
          /* disposedIndexArray */record[/* disposedIndexArray */9],
          /* nameMap */record[/* nameMap */10],
          /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */11]
        ];
}

export {
  handleAddComponent ,
  
}
/* AddComponentService-Wonderjs Not a pure module */
