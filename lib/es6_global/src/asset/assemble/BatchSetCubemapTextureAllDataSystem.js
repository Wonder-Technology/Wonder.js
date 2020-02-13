

import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as OperateCubemapTextureMainService$Wonderjs from "../../service/state/main/texture/cubemap/OperateCubemapTextureMainService.js";

function batchSetCubemapTextureData(samplerCubemapTextures, cubemapTextureSamplers, state) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, cubemapTexture, index) {
                var match = cubemapTextureSamplers[index];
                return OperateCubemapTextureMainService$Wonderjs.setMinFilter(cubemapTexture, match[/* minFilter */1], OperateCubemapTextureMainService$Wonderjs.setMagFilter(cubemapTexture, match[/* magFilter */0], OperateCubemapTextureMainService$Wonderjs.setWrapT(cubemapTexture, match[/* wrapT */3], OperateCubemapTextureMainService$Wonderjs.setWrapS(cubemapTexture, match[/* wrapS */2], state))));
              }), state, samplerCubemapTextures);
}

function batchSetFormatAndTypeAndFlipY(cubemapTextureArr, cubemapTextures, state) {
  return ArrayService$Wonderjs.reduceOneParamValidi((function (state, cubemapTexture, index) {
                var match = cubemapTextures[index];
                return OperateCubemapTextureMainService$Wonderjs.setFlipY(cubemapTexture, match[/* flipY */1], OperateCubemapTextureMainService$Wonderjs.setNZType(cubemapTexture, match[/* nzType */13], OperateCubemapTextureMainService$Wonderjs.setPZType(cubemapTexture, match[/* pzType */12], OperateCubemapTextureMainService$Wonderjs.setNYType(cubemapTexture, match[/* nyType */11], OperateCubemapTextureMainService$Wonderjs.setPYType(cubemapTexture, match[/* pyType */10], OperateCubemapTextureMainService$Wonderjs.setNXType(cubemapTexture, match[/* nxType */9], OperateCubemapTextureMainService$Wonderjs.setPXType(cubemapTexture, match[/* pxType */8], OperateCubemapTextureMainService$Wonderjs.setNZFormat(cubemapTexture, match[/* nzFormat */7], OperateCubemapTextureMainService$Wonderjs.setPZFormat(cubemapTexture, match[/* pzFormat */6], OperateCubemapTextureMainService$Wonderjs.setNYFormat(cubemapTexture, match[/* nyFormat */5], OperateCubemapTextureMainService$Wonderjs.setPYFormat(cubemapTexture, match[/* pyFormat */4], OperateCubemapTextureMainService$Wonderjs.setNXFormat(cubemapTexture, match[/* nxFormat */3], OperateCubemapTextureMainService$Wonderjs.setPXFormat(cubemapTexture, match[/* pxFormat */2], state)))))))))))));
              }), state, cubemapTextureArr);
}

export {
  batchSetCubemapTextureData ,
  batchSetFormatAndTypeAndFlipY ,
  
}
/* ArrayService-Wonderjs Not a pure module */
