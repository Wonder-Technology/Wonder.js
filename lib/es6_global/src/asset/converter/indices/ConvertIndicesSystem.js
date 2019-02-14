

import * as ConvertTextureIndicesSystem$Wonderjs from "./ConvertTextureIndicesSystem.js";
import * as ConvertMaterialIndicesSystem$Wonderjs from "./ConvertMaterialIndicesSystem.js";
import * as ConvertGameObjectIndexDataSystem$Wonderjs from "./gameObject/ConvertGameObjectIndexDataSystem.js";

function convertToIndices(gltf) {
  var match = ConvertTextureIndicesSystem$Wonderjs.convertToImageAndSamplerTextureIndices(gltf);
  var match$1 = match[1];
  var match$2 = match[0];
  return /* record */[
          /* gameObjectIndices */ConvertGameObjectIndexDataSystem$Wonderjs.convertToGameObjectIndexData(gltf),
          /* materialIndices */ConvertMaterialIndicesSystem$Wonderjs.convertToMaterialIndices(gltf),
          /* imageTextureIndices : record */[
            /* textureIndices */match$2[0],
            /* imageIndices */match$2[1]
          ],
          /* samplerTextureIndices : record */[
            /* textureIndices */match$1[0],
            /* samplerIndices */match$1[1]
          ]
        ];
}

export {
  convertToIndices ,
  
}
/* ConvertTextureIndicesSystem-Wonderjs Not a pure module */
