

import * as BufferPointLightService$Wonderjs from "../../../main/light/point/BufferPointLightService.js";

function createTypeArrays(buffer, count) {
  return /* tuple */[
          new Float32Array(buffer, BufferPointLightService$Wonderjs.getColorsOffset(count), BufferPointLightService$Wonderjs.getColorsLength(count)),
          new Float32Array(buffer, BufferPointLightService$Wonderjs.getIntensitiesOffset(count), BufferPointLightService$Wonderjs.getIntensitiesLength(count)),
          new Float32Array(buffer, BufferPointLightService$Wonderjs.getConstantsOffset(count), BufferPointLightService$Wonderjs.getConstantsLength(count)),
          new Float32Array(buffer, BufferPointLightService$Wonderjs.getLinearsOffset(count), BufferPointLightService$Wonderjs.getLinearsLength(count)),
          new Float32Array(buffer, BufferPointLightService$Wonderjs.getQuadraticsOffset(count), BufferPointLightService$Wonderjs.getQuadraticsLength(count)),
          new Float32Array(buffer, BufferPointLightService$Wonderjs.getRangesOffset(count), BufferPointLightService$Wonderjs.getRangesLength(count))
        ];
}

export {
  createTypeArrays ,
  
}
/* BufferPointLightService-Wonderjs Not a pure module */
