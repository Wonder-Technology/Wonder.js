

import * as Log$WonderLog from "./../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Caml_builtin_exceptions from "./../../../../../../../../../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";
import * as GetBasicMaterialDataGetRenderDataService$Wonderjs from "../../../../../state/render/sub/get_render_data/material/basic/GetBasicMaterialDataGetRenderDataService.js";
import * as GetLightMaterialDataGetRenderDataService$Wonderjs from "../../../../../state/render/sub/get_render_data/material/light/GetLightMaterialDataGetRenderDataService.js";
import * as HandleUniformRenderObjectMaterialService$Wonderjs from "../HandleUniformRenderObjectMaterialService.js";

function addBasicMaterialSendData(param, sendDataArrTuple) {
  var uniformCacheMap = param[4];
  var type_ = param[3];
  var name = param[2];
  var pos = param[1];
  var field = param[0];
  switch (field) {
    case "alpha" : 
        return HandleUniformRenderObjectMaterialService$Wonderjs.addUniformSendDataByType(/* tuple */[
                    uniformCacheMap,
                    name,
                    pos,
                    type_
                  ], sendDataArrTuple, GetBasicMaterialDataGetRenderDataService$Wonderjs.getAlpha);
    case "color" : 
        return HandleUniformRenderObjectMaterialService$Wonderjs.addUniformSendDataByType(/* tuple */[
                    uniformCacheMap,
                    name,
                    pos,
                    type_
                  ], sendDataArrTuple, GetBasicMaterialDataGetRenderDataService$Wonderjs.getColor);
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_addBasicMaterialSendData", "unknow field:" + (String(field) + ""), "", "", ""));
  }
}

function _addLightMaterialSendColorData(field, param, sendDataArrTuple) {
  var type_ = param[3];
  var pos = param[2];
  var name = param[1];
  var uniformCacheMap = param[0];
  switch (field) {
    case "diffuseColor" : 
        return HandleUniformRenderObjectMaterialService$Wonderjs.addUniformSendDataByType(/* tuple */[
                    uniformCacheMap,
                    name,
                    pos,
                    type_
                  ], sendDataArrTuple, GetLightMaterialDataGetRenderDataService$Wonderjs.getDiffuseColor);
    case "specularColor" : 
        return HandleUniformRenderObjectMaterialService$Wonderjs.addUniformSendDataByType(/* tuple */[
                    uniformCacheMap,
                    name,
                    pos,
                    type_
                  ], sendDataArrTuple, GetLightMaterialDataGetRenderDataService$Wonderjs.getSpecularColor);
    default:
      throw [
            Caml_builtin_exceptions.match_failure,
            /* tuple */[
              "HandleMaterialUniformConfigDataService.re",
              30,
              2
            ]
          ];
  }
}

function _addLightMaterialSendMapData(field, param, sendDataArrTuple) {
  var type_ = param[3];
  var pos = param[2];
  var name = param[1];
  var uniformCacheMap = param[0];
  switch (field) {
    case "diffuseMap" : 
        return HandleUniformRenderObjectMaterialService$Wonderjs.addUniformTextureSendDataByType(/* tuple */[
                    uniformCacheMap,
                    name,
                    pos,
                    type_
                  ], sendDataArrTuple, GetLightMaterialDataGetRenderDataService$Wonderjs.getDiffuseMapUnit);
    case "specularMap" : 
        return HandleUniformRenderObjectMaterialService$Wonderjs.addUniformTextureSendDataByType(/* tuple */[
                    uniformCacheMap,
                    name,
                    pos,
                    type_
                  ], sendDataArrTuple, GetLightMaterialDataGetRenderDataService$Wonderjs.getSpecularMapUnit);
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_addLightMaterialSendData", "unknow field:" + (String(field) + ""), "", "", ""));
  }
}

function addLightMaterialSendData(param, sendDataArrTuple) {
  var uniformCacheMap = param[4];
  var type_ = param[3];
  var name = param[2];
  var pos = param[1];
  var field = param[0];
  var exit = 0;
  switch (field) {
    case "shininess" : 
        return HandleUniformRenderObjectMaterialService$Wonderjs.addUniformSendDataByType(/* tuple */[
                    uniformCacheMap,
                    name,
                    pos,
                    type_
                  ], sendDataArrTuple, GetLightMaterialDataGetRenderDataService$Wonderjs.getShininess);
    case "diffuseColor" : 
    case "specularColor" : 
        exit = 1;
        break;
    case "diffuseMap" : 
    case "specularMap" : 
        exit = 2;
        break;
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_addLightMaterialSendData", "unknow field:" + (String(field) + ""), "", "", ""));
  }
  switch (exit) {
    case 1 : 
        return _addLightMaterialSendColorData(field, /* tuple */[
                    uniformCacheMap,
                    name,
                    pos,
                    type_
                  ], sendDataArrTuple);
    case 2 : 
        return _addLightMaterialSendMapData(field, /* tuple */[
                    uniformCacheMap,
                    name,
                    pos,
                    type_
                  ], sendDataArrTuple);
    
  }
}

export {
  addBasicMaterialSendData ,
  _addLightMaterialSendColorData ,
  _addLightMaterialSendMapData ,
  addLightMaterialSendData ,
  
}
/* Log-WonderLog Not a pure module */
