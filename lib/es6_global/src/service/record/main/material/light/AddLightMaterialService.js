

import * as AddComponentService$Wonderjs from "../../../../primitive/component/AddComponentService.js";

function handleAddComponent(material, gameObjectUid, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* shaderIndices */record[/* shaderIndices */2],
          /* diffuseColors */record[/* diffuseColors */3],
          /* specularColors */record[/* specularColors */4],
          /* shininess */record[/* shininess */5],
          /* textureIndices */record[/* textureIndices */6],
          /* diffuseMapUnits */record[/* diffuseMapUnits */7],
          /* specularMapUnits */record[/* specularMapUnits */8],
          /* emptyMapUnitArrayMap */record[/* emptyMapUnitArrayMap */9],
          /* defaultDiffuseColor */record[/* defaultDiffuseColor */10],
          /* defaultSpecularColor */record[/* defaultSpecularColor */11],
          /* defaultShininess */record[/* defaultShininess */12],
          /* gameObjectsMap */AddComponentService$Wonderjs.addSharableComponentToGameObjectsMap(material, gameObjectUid, record[/* gameObjectsMap */13]),
          /* disposedIndexArray */record[/* disposedIndexArray */14],
          /* nameMap */record[/* nameMap */15],
          /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */16]
        ];
}

export {
  handleAddComponent ,
  
}
/* AddComponentService-Wonderjs Not a pure module */
