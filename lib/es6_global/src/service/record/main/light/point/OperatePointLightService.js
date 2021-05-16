

import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as RenderLightArrLightService$Wonderjs from "../RenderLightArrLightService.js";
import * as RecordPointLightMainService$Wonderjs from "../../../../state/main/light/point/RecordPointLightMainService.js";

function getColor(light, param) {
  return RecordPointLightMainService$Wonderjs.getColor(light, param[/* colors */2]);
}

function setColor(light, color, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* colors */RecordPointLightMainService$Wonderjs.setColor(light, color, record[/* colors */2]),
          /* intensities */record[/* intensities */3],
          /* constants */record[/* constants */4],
          /* linears */record[/* linears */5],
          /* quadratics */record[/* quadratics */6],
          /* ranges */record[/* ranges */7],
          /* renderLightArr */record[/* renderLightArr */8],
          /* disposedIndexArray */record[/* disposedIndexArray */9],
          /* gameObjectMap */record[/* gameObjectMap */10]
        ];
}

function getIntensity(light, param) {
  return RecordPointLightMainService$Wonderjs.getIntensity(light, param[/* intensities */3]);
}

function setIntensity(light, intensity, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* colors */record[/* colors */2],
          /* intensities */RecordPointLightMainService$Wonderjs.setIntensity(light, intensity, record[/* intensities */3]),
          /* constants */record[/* constants */4],
          /* linears */record[/* linears */5],
          /* quadratics */record[/* quadratics */6],
          /* ranges */record[/* ranges */7],
          /* renderLightArr */record[/* renderLightArr */8],
          /* disposedIndexArray */record[/* disposedIndexArray */9],
          /* gameObjectMap */record[/* gameObjectMap */10]
        ];
}

function getConstant(light, param) {
  return RecordPointLightMainService$Wonderjs.getConstant(light, param[/* constants */4]);
}

function setConstant(light, constant, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* colors */record[/* colors */2],
          /* intensities */record[/* intensities */3],
          /* constants */RecordPointLightMainService$Wonderjs.setIntensity(light, constant, record[/* constants */4]),
          /* linears */record[/* linears */5],
          /* quadratics */record[/* quadratics */6],
          /* ranges */record[/* ranges */7],
          /* renderLightArr */record[/* renderLightArr */8],
          /* disposedIndexArray */record[/* disposedIndexArray */9],
          /* gameObjectMap */record[/* gameObjectMap */10]
        ];
}

function getLinear(light, param) {
  return RecordPointLightMainService$Wonderjs.getLinear(light, param[/* linears */5]);
}

function setLinear(light, linear, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* colors */record[/* colors */2],
          /* intensities */record[/* intensities */3],
          /* constants */record[/* constants */4],
          /* linears */RecordPointLightMainService$Wonderjs.setLinear(light, linear, record[/* linears */5]),
          /* quadratics */record[/* quadratics */6],
          /* ranges */record[/* ranges */7],
          /* renderLightArr */record[/* renderLightArr */8],
          /* disposedIndexArray */record[/* disposedIndexArray */9],
          /* gameObjectMap */record[/* gameObjectMap */10]
        ];
}

function getQuadratic(light, param) {
  return RecordPointLightMainService$Wonderjs.getQuadratic(light, param[/* quadratics */6]);
}

function setQuadratic(light, quadratic, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* colors */record[/* colors */2],
          /* intensities */record[/* intensities */3],
          /* constants */record[/* constants */4],
          /* linears */record[/* linears */5],
          /* quadratics */RecordPointLightMainService$Wonderjs.setQuadratic(light, quadratic, record[/* quadratics */6]),
          /* ranges */record[/* ranges */7],
          /* renderLightArr */record[/* renderLightArr */8],
          /* disposedIndexArray */record[/* disposedIndexArray */9],
          /* gameObjectMap */record[/* gameObjectMap */10]
        ];
}

function getRange(light, param) {
  return RecordPointLightMainService$Wonderjs.getRange(light, param[/* ranges */7]);
}

function setRange(light, range, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* buffer */record[/* buffer */1],
          /* colors */record[/* colors */2],
          /* intensities */record[/* intensities */3],
          /* constants */record[/* constants */4],
          /* linears */record[/* linears */5],
          /* quadratics */record[/* quadratics */6],
          /* ranges */RecordPointLightMainService$Wonderjs.setRange(light, range, record[/* ranges */7]),
          /* renderLightArr */record[/* renderLightArr */8],
          /* disposedIndexArray */record[/* disposedIndexArray */9],
          /* gameObjectMap */record[/* gameObjectMap */10]
        ];
}

function setRangeLevel(light, level, record) {
  switch (level) {
    case 0 : 
        return setQuadratic(light, 1.8, setLinear(light, 0.7, setRange(light, 7, record)));
    case 1 : 
        return setQuadratic(light, 0.44, setLinear(light, 0.35, setRange(light, 13, record)));
    case 2 : 
        return setQuadratic(light, 0.20, setLinear(light, 0.22, setRange(light, 20, record)));
    case 3 : 
        return setQuadratic(light, 0.07, setLinear(light, 0.14, setRange(light, 32, record)));
    case 4 : 
        return setQuadratic(light, 0.032, setLinear(light, 0.09, setRange(light, 50, record)));
    case 5 : 
        return setQuadratic(light, 0.017, setLinear(light, 0.07, setRange(light, 65, record)));
    case 6 : 
        return setQuadratic(light, 0.0075, setLinear(light, 0.045, setRange(light, 100, record)));
    case 7 : 
        return setQuadratic(light, 0.0028, setLinear(light, 0.027, setRange(light, 160, record)));
    case 8 : 
        return setQuadratic(light, 0.0019, setLinear(light, 0.022, setRange(light, 200, record)));
    case 9 : 
        return setQuadratic(light, 0.0007, setLinear(light, 0.014, setRange(light, 325, record)));
    case 10 : 
        return setQuadratic(light, 0.0002, setLinear(light, 0.007, setRange(light, 600, record)));
    case 11 : 
        return setQuadratic(light, 0.000007, setLinear(light, 0.0014, setRange(light, 3250, record)));
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("setRangeLevel", "shouldn\'t exceed point light range", "level is too large", "level should in [0, 11]", "level: " + (String(level) + "")));
  }
}

function getIsRender(light, record) {
  return record[/* renderLightArr */8].includes(light);
}

function setIsRender(light, isRender, record) {
  var renderLightArr = record[/* renderLightArr */8];
  if (isRender) {
    return /* record */[
            /* index */record[/* index */0],
            /* buffer */record[/* buffer */1],
            /* colors */record[/* colors */2],
            /* intensities */record[/* intensities */3],
            /* constants */record[/* constants */4],
            /* linears */record[/* linears */5],
            /* quadratics */record[/* quadratics */6],
            /* ranges */record[/* ranges */7],
            /* renderLightArr */ArrayService$WonderCommonlib.removeDuplicateItems(ArrayService$Wonderjs.push(light, renderLightArr)),
            /* disposedIndexArray */record[/* disposedIndexArray */9],
            /* gameObjectMap */record[/* gameObjectMap */10]
          ];
  } else {
    return /* record */[
            /* index */record[/* index */0],
            /* buffer */record[/* buffer */1],
            /* colors */record[/* colors */2],
            /* intensities */record[/* intensities */3],
            /* constants */record[/* constants */4],
            /* linears */record[/* linears */5],
            /* quadratics */record[/* quadratics */6],
            /* ranges */record[/* ranges */7],
            /* renderLightArr */RenderLightArrLightService$Wonderjs.removeFromRenderLightArr(light, renderLightArr),
            /* disposedIndexArray */record[/* disposedIndexArray */9],
            /* gameObjectMap */record[/* gameObjectMap */10]
          ];
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
  getIsRender ,
  setIsRender ,
  
}
/* Log-WonderLog Not a pure module */
