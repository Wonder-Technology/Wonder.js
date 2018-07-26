

import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as RecordPointLightMainService$Wonderjs from "../../../../state/main/light/point/RecordPointLightMainService.js";

function getColor(mappedIndex, param) {
  return RecordPointLightMainService$Wonderjs.getColor(mappedIndex, param[/* colors */2]);
}

function setColor(mappedIndex, color, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* colors */RecordPointLightMainService$Wonderjs.setColor(mappedIndex, color, record[/* colors */2]),
          /* intensities */record[/* intensities */3],
          /* constants */record[/* constants */4],
          /* linears */record[/* linears */5],
          /* quadratics */record[/* quadratics */6],
          /* ranges */record[/* ranges */7],
          /* mappedIndexMap */record[/* mappedIndexMap */8],
          /* gameObjectMap */record[/* gameObjectMap */9]
        ];
}

function getIntensity(mappedIndex, param) {
  return RecordPointLightMainService$Wonderjs.getIntensity(mappedIndex, param[/* intensities */3]);
}

function setIntensity(mappedIndex, intensity, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* colors */record[/* colors */2],
          /* intensities */RecordPointLightMainService$Wonderjs.setIntensity(mappedIndex, intensity, record[/* intensities */3]),
          /* constants */record[/* constants */4],
          /* linears */record[/* linears */5],
          /* quadratics */record[/* quadratics */6],
          /* ranges */record[/* ranges */7],
          /* mappedIndexMap */record[/* mappedIndexMap */8],
          /* gameObjectMap */record[/* gameObjectMap */9]
        ];
}

function getConstant(mappedIndex, param) {
  return RecordPointLightMainService$Wonderjs.getConstant(mappedIndex, param[/* constants */4]);
}

function setConstant(mappedIndex, constant, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* colors */record[/* colors */2],
          /* intensities */record[/* intensities */3],
          /* constants */RecordPointLightMainService$Wonderjs.setIntensity(mappedIndex, constant, record[/* constants */4]),
          /* linears */record[/* linears */5],
          /* quadratics */record[/* quadratics */6],
          /* ranges */record[/* ranges */7],
          /* mappedIndexMap */record[/* mappedIndexMap */8],
          /* gameObjectMap */record[/* gameObjectMap */9]
        ];
}

function getLinear(mappedIndex, param) {
  return RecordPointLightMainService$Wonderjs.getLinear(mappedIndex, param[/* linears */5]);
}

function setLinear(mappedIndex, linear, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* colors */record[/* colors */2],
          /* intensities */record[/* intensities */3],
          /* constants */record[/* constants */4],
          /* linears */RecordPointLightMainService$Wonderjs.setLinear(mappedIndex, linear, record[/* linears */5]),
          /* quadratics */record[/* quadratics */6],
          /* ranges */record[/* ranges */7],
          /* mappedIndexMap */record[/* mappedIndexMap */8],
          /* gameObjectMap */record[/* gameObjectMap */9]
        ];
}

function getQuadratic(mappedIndex, param) {
  return RecordPointLightMainService$Wonderjs.getQuadratic(mappedIndex, param[/* quadratics */6]);
}

function setQuadratic(mappedIndex, quadratic, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* colors */record[/* colors */2],
          /* intensities */record[/* intensities */3],
          /* constants */record[/* constants */4],
          /* linears */record[/* linears */5],
          /* quadratics */RecordPointLightMainService$Wonderjs.setQuadratic(mappedIndex, quadratic, record[/* quadratics */6]),
          /* ranges */record[/* ranges */7],
          /* mappedIndexMap */record[/* mappedIndexMap */8],
          /* gameObjectMap */record[/* gameObjectMap */9]
        ];
}

function getRange(mappedIndex, param) {
  return RecordPointLightMainService$Wonderjs.getRange(mappedIndex, param[/* ranges */7]);
}

function setRange(mappedIndex, range, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* colors */record[/* colors */2],
          /* intensities */record[/* intensities */3],
          /* constants */record[/* constants */4],
          /* linears */record[/* linears */5],
          /* quadratics */record[/* quadratics */6],
          /* ranges */RecordPointLightMainService$Wonderjs.setRange(mappedIndex, range, record[/* ranges */7]),
          /* mappedIndexMap */record[/* mappedIndexMap */8],
          /* gameObjectMap */record[/* gameObjectMap */9]
        ];
}

function setRangeLevel(mappedIndex, level, record) {
  if (level > 11 || level < 0) {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("setRangeLevel", "shouldn\'t exceed point light range", "level is too large", "level should in [0, 11]", "level: " + (String(level) + "")));
  } else {
    switch (level) {
      case 0 : 
          return setQuadratic(mappedIndex, 1.8, setLinear(mappedIndex, 0.7, setRange(mappedIndex, 7, record)));
      case 1 : 
          return setQuadratic(mappedIndex, 0.44, setLinear(mappedIndex, 0.35, setRange(mappedIndex, 13, record)));
      case 2 : 
          return setQuadratic(mappedIndex, 0.20, setLinear(mappedIndex, 0.22, setRange(mappedIndex, 20, record)));
      case 3 : 
          return setQuadratic(mappedIndex, 0.07, setLinear(mappedIndex, 0.14, setRange(mappedIndex, 32, record)));
      case 4 : 
          return setQuadratic(mappedIndex, 0.032, setLinear(mappedIndex, 0.09, setRange(mappedIndex, 50, record)));
      case 5 : 
          return setQuadratic(mappedIndex, 0.017, setLinear(mappedIndex, 0.07, setRange(mappedIndex, 65, record)));
      case 6 : 
          return setQuadratic(mappedIndex, 0.0075, setLinear(mappedIndex, 0.045, setRange(mappedIndex, 100, record)));
      case 7 : 
          return setQuadratic(mappedIndex, 0.0028, setLinear(mappedIndex, 0.027, setRange(mappedIndex, 160, record)));
      case 8 : 
          return setQuadratic(mappedIndex, 0.0019, setLinear(mappedIndex, 0.022, setRange(mappedIndex, 200, record)));
      case 9 : 
          return setQuadratic(mappedIndex, 0.0007, setLinear(mappedIndex, 0.014, setRange(mappedIndex, 325, record)));
      case 10 : 
          return setQuadratic(mappedIndex, 0.0002, setLinear(mappedIndex, 0.007, setRange(mappedIndex, 600, record)));
      case 11 : 
          return setQuadratic(mappedIndex, 0.000007, setLinear(mappedIndex, 0.0014, setRange(mappedIndex, 3250, record)));
      
    }
  }
}

export {
  getColor ,
  setColor ,
  getIntensity ,
  setIntensity ,
  getConstant ,
  setConstant ,
  getLinear ,
  setLinear ,
  getQuadratic ,
  setQuadratic ,
  getRange ,
  setRange ,
  setRangeLevel ,
  
}
/* Log-WonderLog Not a pure module */
