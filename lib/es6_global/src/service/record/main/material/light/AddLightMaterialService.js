

import * as AddComponentService$Wonderjs from "../../../../primitive/component/AddComponentService.js";

function handleAddComponent(material, gameObjectUid, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* shaderIndices */record[/* shaderIndices */2],
          /* diffuseColors */record[/* diffuseColors */3],
          /* specularColors */record[/* specularColors */4],
          /* shininess */record[/* shininess */5],
          /* diffuseTextureIndices */record[/* diffuseTextureIndices */6],
          /* specularTextureIndices */record[/* specularTextureIndices */7],
          /* defaultDiffuseColor */record[/* defaultDiffuseColor */8],
          /* defaultSpecularColor */record[/* defaultSpecularColor */9],
          /* defaultShininess */record[/* defaultShininess */10],
          /* gameObjectsMap */AddComponentService$Wonderjs.addSharableComponentToGameObjectsMap(material, gameObjectUid, record[/* gameObjectsMap */11]),
          /* disposedIndexArray */record[/* disposedIndexArray */12],
          /* nameMap */record[/* nameMap */13],
          /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */14]
        ];
}

export {
  handleAddComponent ,
  
}
/* AddComponentService-Wonderjs Not a pure module */
