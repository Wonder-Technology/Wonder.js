

import * as OperateTypeArrayAllMeshRendererService$Wonderjs from "../../../record/all/meshRenderer/OperateTypeArrayAllMeshRendererService.js";

function getGlDrawMode(gl, meshRenderer, state) {
  var match = OperateTypeArrayAllMeshRendererService$Wonderjs.getDrawMode(meshRenderer, state[/* meshRendererRecord */9][/* drawModes */0]);
  switch (match) {
    case 0 : 
        return gl.POINTS;
    case 1 : 
        return gl.LINES;
    case 2 : 
        return gl.LINE_LOOP;
    case 3 : 
        return gl.LINE_STRIP;
    case 4 : 
        return gl.TRIANGLES;
    case 5 : 
        return gl.TRIANGLE_STRIP;
    case 6 : 
        return gl.TRIANGLE_FAN;
    
  }
}

export {
  getGlDrawMode ,
  
}
/* OperateTypeArrayAllMeshRendererService-Wonderjs Not a pure module */
