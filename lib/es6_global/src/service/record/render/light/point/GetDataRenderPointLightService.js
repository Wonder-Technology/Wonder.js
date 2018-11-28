

import * as RecordPointLightMainService$Wonderjs from "../../../../state/main/light/point/RecordPointLightMainService.js";

function getColor(mappedIndex, param) {
  return RecordPointLightMainService$Wonderjs.getColor(mappedIndex, param[/* colors */1]);
}

function getIntensity(mappedIndex, param) {
  return RecordPointLightMainService$Wonderjs.getIntensity(mappedIndex, param[/* intensities */2]);
}

function getConstant(mappedIndex, param) {
  return RecordPointLightMainService$Wonderjs.getConstant(mappedIndex, param[/* constants */3]);
}

function getLiear(mappedIndex, param) {
  return RecordPointLightMainService$Wonderjs.getLinear(mappedIndex, param[/* linears */4]);
}

function getQuadratic(mappedIndex, param) {
  return RecordPointLightMainService$Wonderjs.getQuadratic(mappedIndex, param[/* quadratics */5]);
}

function getRange(mappedIndex, param) {
  return RecordPointLightMainService$Wonderjs.getRange(mappedIndex, param[/* ranges */6]);
}

export {
  getColor ,
  getIntensity ,
  getConstant ,
  getLiear ,
  getQuadratic ,
  getRange ,
  
}
/* RecordPointLightMainService-Wonderjs Not a pure module */
