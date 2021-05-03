

import * as AddComponentService$Wonderjs from "../../../../primitive/component/AddComponentService.js";

function handleAddComponent(material, gameObjectUid, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* shaderIndices */record[/* shaderIndices */2],
          /* colors */record[/* colors */3],
          /* isDepthTests */record[/* isDepthTests */4],
          /* alphas */record[/* alphas */5],
          /* defaultColor */record[/* defaultColor */6],
          /* gameObjectsMap */AddComponentService$Wonderjs.addSharableComponentToGameObjectsMap(material, gameObjectUid, record[/* gameObjectsMap */7]),
          /* disposedIndexArray */record[/* disposedIndexArray */8],
          /* nameMap */record[/* nameMap */9],
          /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */10]
        ];
}

export {
  handleAddComponent ,
  
}
/* AddComponentService-Wonderjs Not a pure module */
