

import * as BufferPointLightService$Wonderjs from "../../../main/light/point/BufferPointLightService.js";

function createTypeArrays(buffer, _) {
  return /* tuple */[
          new Float32Array(buffer, BufferPointLightService$Wonderjs.getColorsOffset(/* () */0), BufferPointLightService$Wonderjs.getColorsLength(/* () */0)),
          new Float32Array(buffer, BufferPointLightService$Wonderjs.getIntensitiesOffset(/* () */0), BufferPointLightService$Wonderjs.getIntensitiesLength(/* () */0)),
          new Float32Array(buffer, BufferPointLightService$Wonderjs.getConstantsOffset(/* () */0), BufferPointLightService$Wonderjs.getConstantsLength(/* () */0)),
          new Float32Array(buffer, BufferPointLightService$Wonderjs.getLinearsOffset(/* () */0), BufferPointLightService$Wonderjs.getLinearsLength(/* () */0)),
          new Float32Array(buffer, BufferPointLightService$Wonderjs.getQuadraticsOffset(/* () */0), BufferPointLightService$Wonderjs.getQuadraticsLength(/* () */0)),
          new Float32Array(buffer, BufferPointLightService$Wonderjs.getRangesOffset(/* () */0), BufferPointLightService$Wonderjs.getRangesLength(/* () */0))
        ];
}

export {
  createTypeArrays ,
  
}
/* BufferPointLightService-Wonderjs Not a pure module */
