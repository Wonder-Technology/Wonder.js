

import * as ConvertMaterialIndicesSystem$Wonderjs from "./ConvertMaterialIndicesSystem.js";
import * as ConvertGameObjectIndexDataSystem$Wonderjs from "./gameObject/ConvertGameObjectIndexDataSystem.js";
import * as ConvertCubemapTextureIndicesSystem$Wonderjs from "./ConvertCubemapTextureIndicesSystem.js";
import * as ConvertBasicSourceTextureIndicesSystem$Wonderjs from "./ConvertBasicSourceTextureIndicesSystem.js";

function convertToIndices(gltf) {
  var match = ConvertBasicSourceTextureIndicesSystem$Wonderjs.convertToImageAndSamplerTextureIndices(gltf);
  var match$1 = match[1];
  var match$2 = match[0];
  var match$3 = ConvertCubemapTextureIndicesSystem$Wonderjs.convertToImageAndSamplerTextureIndices(gltf);
  var match$4 = match$3[1];
  var match$5 = match$3[0];
  return /* record */[
          /* gameObjectIndices */ConvertGameObjectIndexDataSystem$Wonderjs.convertToGameObjectIndexData(gltf),
          /* materialIndices */ConvertMaterialIndicesSystem$Wonderjs.convertToMaterialIndices(gltf),
          /* imageBasicSourceTextureIndices : record */[
            /* textureIndices */match$2[0],
            /* imageIndices */match$2[1]
          ],
          /* imageCubemapTextureIndices : record */[
            /* cubemapTextureIndices */match$5[0],
            /* pxImageIndices */match$5[1],
            /* nxImageIndices */match$5[2],
            /* pyImageIndices */match$5[3],
            /* nyImageIndices */match$5[4],
            /* pzImageIndices */match$5[5],
            /* nzImageIndices */match$5[6]
          ],
          /* samplerTextureIndices : record */[
            /* textureIndices */match$1[0],
            /* samplerIndices */match$1[1]
          ],
          /* samplerCubemapTextureIndices : record */[
            /* cubemapTextureIndices */match$4[0],
            /* samplerIndices */match$4[1]
          ]
        ];
}

export {
  convertToIndices ,
  
}
/* ConvertMaterialIndicesSystem-Wonderjs Not a pure module */
