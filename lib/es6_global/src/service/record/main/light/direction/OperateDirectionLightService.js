

import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as RenderLightArrLightService$Wonderjs from "../RenderLightArrLightService.js";
import * as RecordDirectionLightMainService$Wonderjs from "../../../../state/main/light/direction/RecordDirectionLightMainService.js";

function getColor(light, param) {
  return RecordDirectionLightMainService$Wonderjs.getColor(light, param[/* colors */2]);
}

function setColor(light, color, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* colors */RecordDirectionLightMainService$Wonderjs.setColor(light, color, record[/* colors */2]),
          /* intensities */record[/* intensities */3],
          /* renderLightArr */record[/* renderLightArr */4],
          /* gameObjectMap */record[/* gameObjectMap */5],
          /* disposedIndexArray */record[/* disposedIndexArray */6]
        ];
}

function getIntensity(light, param) {
  return RecordDirectionLightMainService$Wonderjs.getIntensity(light, param[/* intensities */3]);
}

function setIntensity(light, intensity, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* colors */record[/* colors */2],
          /* intensities */RecordDirectionLightMainService$Wonderjs.setIntensity(light, intensity, record[/* intensities */3]),
          /* renderLightArr */record[/* renderLightArr */4],
          /* gameObjectMap */record[/* gameObjectMap */5],
          /* disposedIndexArray */record[/* disposedIndexArray */6]
        ];
}

function getIsRender(light, record) {
  return record[/* renderLightArr */4].includes(light);
}

function setIsRender(light, isRender, record) {
  var renderLightArr = record[/* renderLightArr */4];
  if (isRender) {
    return /* record */[
            /* index */record[/* index */0],
            /* buffer */record[/* buffer */1],
            /* colors */record[/* colors */2],
            /* intensities */record[/* intensities */3],
            /* renderLightArr */ArrayService$WonderCommonlib.removeDuplicateItems(ArrayService$Wonderjs.push(light, renderLightArr)),
            /* gameObjectMap */record[/* gameObjectMap */5],
            /* disposedIndexArray */record[/* disposedIndexArray */6]
          ];
  } else {
    return /* record */[
            /* index */record[/* index */0],
            /* buffer */record[/* buffer */1],
            /* colors */record[/* colors */2],
            /* intensities */record[/* intensities */3],
            /* renderLightArr */RenderLightArrLightService$Wonderjs.removeFromRenderLightArr(light, renderLightArr),
            /* gameObjectMap */record[/* gameObjectMap */5],
            /* disposedIndexArray */record[/* disposedIndexArray */6]
          ];
  }
}

export {
  getColor ,
  setColor ,
  getIntensity ,
  setIntensity ,
  getIsRender ,
  setIsRender ,
  
}
/* ArrayService-Wonderjs Not a pure module */
