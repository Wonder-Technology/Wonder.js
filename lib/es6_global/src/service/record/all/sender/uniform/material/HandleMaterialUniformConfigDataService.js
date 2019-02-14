

import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as GetBasicMaterialDataGetRenderDataService$Wonderjs from "../../../../../state/sub/get_render_data/material/basic/GetBasicMaterialDataGetRenderDataService.js";
import * as GetLightMaterialDataGetRenderDataService$Wonderjs from "../../../../../state/sub/get_render_data/material/light/GetLightMaterialDataGetRenderDataService.js";
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
    case "map" : 
        return HandleUniformRenderObjectMaterialService$Wonderjs.addUniformTextureSendDataByType(/* tuple */[
                    uniformCacheMap,
                    name,
                    pos,
                    type_
                  ], sendDataArrTuple, GetBasicMaterialDataGetRenderDataService$Wonderjs.getMapUnit);
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_addBasicMaterialSendData", "unknow field:" + (String(field) + ""), "", "", ""));
  }
}

function addLightMaterialSendData(param, sendDataArrTuple) {
  var uniformCacheMap = param[4];
  var type_ = param[3];
  var name = param[2];
  var pos = param[1];
  var field = param[0];
  switch (field) {
    case "diffuseColor" : 
        return HandleUniformRenderObjectMaterialService$Wonderjs.addUniformSendDataByType(/* tuple */[
                    uniformCacheMap,
                    name,
                    pos,
                    type_
                  ], sendDataArrTuple, GetLightMaterialDataGetRenderDataService$Wonderjs.getDiffuseColor);
    case "diffuseMap" : 
        return HandleUniformRenderObjectMaterialService$Wonderjs.addUniformTextureSendDataByType(/* tuple */[
                    uniformCacheMap,
                    name,
                    pos,
                    type_
                  ], sendDataArrTuple, GetLightMaterialDataGetRenderDataService$Wonderjs.getDiffuseMapUnit);
    case "shininess" : 
        return HandleUniformRenderObjectMaterialService$Wonderjs.addUniformSendDataByType(/* tuple */[
                    uniformCacheMap,
                    name,
                    pos,
                    type_
                  ], sendDataArrTuple, GetLightMaterialDataGetRenderDataService$Wonderjs.getShininess);
    case "specularColor" : 
        return HandleUniformRenderObjectMaterialService$Wonderjs.addUniformSendDataByType(/* tuple */[
                    uniformCacheMap,
                    name,
                    pos,
                    type_
                  ], sendDataArrTuple, GetLightMaterialDataGetRenderDataService$Wonderjs.getSpecularColor);
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

export {
  addBasicMaterialSendData ,
  addLightMaterialSendData ,
  
}
/* Log-WonderLog Not a pure module */
