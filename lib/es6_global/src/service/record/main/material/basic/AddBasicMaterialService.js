

import * as AddComponentService$Wonderjs from "../../../../primitive/component/AddComponentService.js";

function handleAddComponent(material, gameObjectUid, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* shaderIndices */record[/* shaderIndices */2],
          /* colors */record[/* colors */3],
          /* textureIndices */record[/* textureIndices */4],
          /* mapUnits */record[/* mapUnits */5],
          /* isDepthTests */record[/* isDepthTests */6],
          /* alphas */record[/* alphas */7],
          /* emptyMapUnitArrayMap */record[/* emptyMapUnitArrayMap */8],
          /* defaultColor */record[/* defaultColor */9],
          /* gameObjectsMap */AddComponentService$Wonderjs.addSharableComponentToGameObjectsMap(material, gameObjectUid, record[/* gameObjectsMap */10]),
          /* disposedIndexArray */record[/* disposedIndexArray */11],
          /* nameMap */record[/* nameMap */12],
          /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */13]
        ];
}

export {
  handleAddComponent ,
  
}
/* AddComponentService-Wonderjs Not a pure module */
