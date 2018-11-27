

import * as BufferDirectionLightService$Wonderjs from "../../../main/light/direction/BufferDirectionLightService.js";

function createTypeArrays(buffer, count) {
  return /* tuple */[
          new Float32Array(buffer, BufferDirectionLightService$Wonderjs.getColorsOffset(count), BufferDirectionLightService$Wonderjs.getColorsLength(count)),
          new Float32Array(buffer, BufferDirectionLightService$Wonderjs.getIntensitiesOffset(count), BufferDirectionLightService$Wonderjs.getIntensitiesLength(count))
        ];
}

export {
  createTypeArrays ,
  
}
/* BufferDirectionLightService-Wonderjs Not a pure module */
