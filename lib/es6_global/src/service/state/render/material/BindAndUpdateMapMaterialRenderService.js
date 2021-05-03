

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as TextureIndexService$Wonderjs from "../../../primitive/material/TextureIndexService.js";
import * as BindTextureRenderService$Wonderjs from "../texture/BindTextureRenderService.js";
import * as UpdateAllTextureRenderService$Wonderjs from "../texture/allTexture/UpdateAllTextureRenderService.js";
import * as OperateAllTextureRenderService$Wonderjs from "../texture/allTexture/OperateAllTextureRenderService.js";

function bindAndUpdate(param, param$1, setMapUnitFunc, state) {
  var textureType = param$1[1];
  var texture = param$1[0];
  var gl = param[0];
  var match = TextureIndexService$Wonderjs.isTextureNotDefaultValue(texture);
  if (match) {
    var match$1 = OperateAllTextureRenderService$Wonderjs.getActivableTextureUnit(state);
    var mapUnit = match$1[0];
    return UpdateAllTextureRenderService$Wonderjs.handleUpdate(gl, /* tuple */[
                texture,
                textureType
              ], BindTextureRenderService$Wonderjs.bind(gl, mapUnit, /* tuple */[
                    texture,
                    textureType
                  ], OperateAllTextureRenderService$Wonderjs.setActivedTextureUnitIndex(match$1[1], Curry._3(setMapUnitFunc, param[1], mapUnit, state))));
  } else {
    return state;
  }
}

export {
  bindAndUpdate ,
  
}
/* BindTextureRenderService-Wonderjs Not a pure module */
