

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
          /* textureCountMap */record[/* textureCountMap */9],
          /* defaultDiffuseColor */record[/* defaultDiffuseColor */10],
          /* defaultSpecularColor */record[/* defaultSpecularColor */11],
          /* defaultShininess */record[/* defaultShininess */12],
          /* gameObjectMap */AddComponentService$Wonderjs.addComponentToGameObjectMap(material, gameObjectUid, record[/* gameObjectMap */13]),
          /* groupCountMap */record[/* groupCountMap */14],
          /* disposedIndexArray */record[/* disposedIndexArray */15],
          /* nameMap */record[/* nameMap */16],
          /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */17]
        ];
}

export {
  handleAddComponent ,
  
}
/* No side effect */
