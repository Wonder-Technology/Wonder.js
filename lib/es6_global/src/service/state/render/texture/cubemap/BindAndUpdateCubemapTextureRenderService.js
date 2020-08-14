

import * as BindTextureRenderService$Wonderjs from "../BindTextureRenderService.js";
import * as UpdateAllTextureRenderService$Wonderjs from "../allTexture/UpdateAllTextureRenderService.js";
import * as OperateAllTextureRenderService$Wonderjs from "../allTexture/OperateAllTextureRenderService.js";

function bindAndUpdate(gl, texture, state) {
  var match = OperateAllTextureRenderService$Wonderjs.getActivableTextureUnit(state);
  return UpdateAllTextureRenderService$Wonderjs.handleUpdate(gl, /* tuple */[
              texture,
              /* Cubemap */2
            ], BindTextureRenderService$Wonderjs.bind(gl, match[0], /* tuple */[
                  texture,
                  /* Cubemap */2
                ], OperateAllTextureRenderService$Wonderjs.setActivedTextureUnitIndex(match[1], state)));
}

export {
  bindAndUpdate ,
  
}
/* BindTextureRenderService-Wonderjs Not a pure module */
