

import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as ArrayService$Wonderjs from "../../../../../atom/ArrayService.js";
import * as Caml_builtin_exceptions from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";
import * as SendUniformService$Wonderjs from "../../SendUniformService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as GetSkyboxDataGetRenderDataService$Wonderjs from "../../../../../state/render/sub/get_render_data/no_material_shader/skybox/GetSkyboxDataGetRenderDataService.js";
import * as HandleUniformConfigDataMapService$Wonderjs from "../../../../../primitive/sender/HandleUniformConfigDataMapService.js";
import * as GetOutlineDataGetRenderDataService$Wonderjs from "../../../../../state/render/sub/get_render_data/no_material_shader/outline/GetOutlineDataGetRenderDataService.js";

function _addUniformSendDataByType(param, param$1, param$2) {
  return /* record */[
          /* renderObjectSendModelDataArr */param$1[/* renderObjectSendModelDataArr */0],
          /* renderObjectSendMaterialDataArr */param$1[/* renderObjectSendMaterialDataArr */1],
          /* shaderSendNoCachableDataArr */param$1[/* shaderSendNoCachableDataArr */2],
          /* shaderSendCachableDataArr */param$1[/* shaderSendCachableDataArr */3],
          /* shaderSendCachableFunctionDataArr */param$1[/* shaderSendCachableFunctionDataArr */4],
          /* instanceSendNoCachableDataArr */param$1[/* instanceSendNoCachableDataArr */5],
          /* noMaterialShaderSendCachableDataArr */ArrayService$Wonderjs.push(/* record */[
                /* shaderCacheMap */param[0],
                /* name */param[1],
                /* pos */param[2],
                /* getDataFunc */param$2[0],
                /* sendDataFunc */param$2[1]
              ], param$1[/* noMaterialShaderSendCachableDataArr */6])
        ];
}

function addSendData(param, sendDataArr) {
  var uniformCacheMap = param[4];
  var type_ = param[3];
  var name = param[2];
  var pos = param[1];
  var field = param[0];
  switch (field) {
    case "outlineExpand" : 
        return _addUniformSendDataByType(/* tuple */[
                    uniformCacheMap,
                    name,
                    pos
                  ], sendDataArr, /* tuple */[
                    GetOutlineDataGetRenderDataService$Wonderjs.getColor,
                    SendUniformService$Wonderjs.getSendCachableDataByType(type_)
                  ]);
    case "rotationGizmoForEditor" : 
        var exit = 0;
        switch (name) {
          case "u_alpha" : 
          case "u_cameraPosInLocalCoordSystem" : 
          case "u_color" : 
              exit = 1;
              break;
          default:
            throw [
                  Caml_builtin_exceptions.match_failure,
                  /* tuple */[
                    "HandleNoMaterialShaderUniformConfigDataService.re",
                    69,
                    4
                  ]
                ];
        }
        if (exit === 1) {
          return _addUniformSendDataByType(/* tuple */[
                      uniformCacheMap,
                      name,
                      pos
                    ], sendDataArr, /* tuple */[
                      -1,
                      SendUniformService$Wonderjs.getSendCachableDataByType(type_)
                    ]);
        }
        break;
    case "skyboxCubeMap" : 
        return _addUniformSendDataByType(/* tuple */[
                    uniformCacheMap,
                    name,
                    pos
                  ], sendDataArr, /* tuple */[
                    GetSkyboxDataGetRenderDataService$Wonderjs.getCubemapUnit,
                    SendUniformService$Wonderjs.getSendCachableDataByType(type_)
                  ]);
    case "skyboxVMatrix" : 
        return _addUniformSendDataByType(/* tuple */[
                    uniformCacheMap,
                    name,
                    pos
                  ], sendDataArr, /* tuple */[
                    GetSkyboxDataGetRenderDataService$Wonderjs.getSkyboxVMatrix,
                    SendUniformService$Wonderjs.getSendNoCachableDataByType(type_)
                  ]);
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("addSendData", "unknow field:" + (String(field) + ""), "", "", ""));
  }
}

function setToUniformSendMap(shaderIndex, uniformSendDataMap, sendDataArr) {
  MutableSparseMapService$WonderCommonlib.set(shaderIndex, sendDataArr, uniformSendDataMap);
  return /* () */0;
}

function unsafeGetUniformSendData(shaderIndex, param) {
  return HandleUniformConfigDataMapService$Wonderjs.unsafeGetUniformSendData(shaderIndex, param[/* uniformNoMaterialShaderSendCachableDataMap */9]);
}

export {
  _addUniformSendDataByType ,
  addSendData ,
  setToUniformSendMap ,
  unsafeGetUniformSendData ,
  
}
/* Log-WonderLog Not a pure module */
