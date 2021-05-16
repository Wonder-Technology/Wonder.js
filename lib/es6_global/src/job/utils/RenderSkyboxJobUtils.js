

import * as Js_option from "../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as RenderJobUtils$Wonderjs from "./render/RenderJobUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as AllGLSLLocationService$Wonderjs from "../../service/record/all/location/AllGLSLLocationService.js";
import * as SkyboxSceneMainService$Wonderjs from "../../service/state/main/scene/SkyboxSceneMainService.js";
import * as AllDeviceManagerService$Wonderjs from "../../service/record/all/device/AllDeviceManagerService.js";
import * as UseProgramRenderService$Wonderjs from "../../service/state/render/program/UseProgramRenderService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../service/record/main/gameObject/GetComponentGameObjectService.js";
import * as NoMaterialShaderIndexAllShaderService$Wonderjs from "../../service/record/all/shader/NoMaterialShaderIndexAllShaderService.js";
import * as BindAndUpdateCubemapTextureRenderService$Wonderjs from "../../service/state/render/texture/cubemap/BindAndUpdateCubemapTextureRenderService.js";
import * as CreateGetRenederDataSubStateRenderService$Wonderjs from "../../service/state/render/sub/get_render_data/CreateGetRenederDataSubStateRenderService.js";
import * as CreateSendRenederDataSubStateRenderService$Wonderjs from "../../service/state/render/sub/send_render_data/CreateSendRenederDataSubStateRenderService.js";
import * as HandleNoMaterialShaderUniformConfigDataService$Wonderjs from "../../service/record/all/sender/uniform/no_material_shader/HandleNoMaterialShaderUniformConfigDataService.js";

function getRenderData(state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return Js_option.andThen((function (skyboxGameObject) {
                return /* tuple */[
                        GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(skyboxGameObject, gameObjectRecord),
                        GetComponentGameObjectService$Wonderjs.unsafeGetGeometryComponent(skyboxGameObject, gameObjectRecord)
                      ];
              }), SkyboxSceneMainService$Wonderjs.getSkyboxGameObject(state));
}

function _prepareGlState(gl, state) {
  var deviceManagerRecord = AllDeviceManagerService$Wonderjs.setSide(gl, /* BACK */3, AllDeviceManagerService$Wonderjs.setDepthFunc(gl, gl.LEQUAL, state[/* deviceManagerRecord */20]));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */20] = deviceManagerRecord;
  return newrecord;
}

function _sendUniformNoMaterialShaderData(gl, shaderIndex, getRenderDataSubState, state) {
  ArrayService$WonderCommonlib.forEach((function (param) {
          var sendDataFunc = param[/* sendDataFunc */4];
          var getDataFunc = param[/* getDataFunc */3];
          var pos = param[/* pos */2];
          var name = param[/* name */1];
          var match = AllGLSLLocationService$Wonderjs.isUniformLocationExist(pos);
          if (match) {
            if (name === "u_skyboxVMatrix") {
              return sendDataFunc(gl, pos, getDataFunc(getRenderDataSubState));
            } else {
              return sendDataFunc(gl, param[/* shaderCacheMap */0], /* tuple */[
                          name,
                          pos
                        ], getDataFunc(getRenderDataSubState));
            }
          } else {
            return /* () */0;
          }
        }), HandleNoMaterialShaderUniformConfigDataService$Wonderjs.unsafeGetUniformSendData(shaderIndex, state[/* glslSenderRecord */3]));
  return state;
}

function _draw(gl, shaderIndex, param, state) {
  var geometryIndex = param[1];
  var sendRenderDataSubState = CreateSendRenederDataSubStateRenderService$Wonderjs.createState(state);
  RenderJobUtils$Wonderjs.sendAttributeData(gl, /* tuple */[
        shaderIndex,
        geometryIndex
      ], sendRenderDataSubState, state);
  var getRenderDataSubState = CreateGetRenederDataSubStateRenderService$Wonderjs.createState(state);
  _sendUniformNoMaterialShaderData(gl, shaderIndex, getRenderDataSubState, state);
  RenderJobUtils$Wonderjs.draw(gl, gl.TRIANGLES, geometryIndex, state);
  return state;
}

function _restoreGlState(gl, state) {
  var deviceManagerRecord = AllDeviceManagerService$Wonderjs.setSide(gl, /* FRONT */2, AllDeviceManagerService$Wonderjs.setDepthFunc(gl, gl.LESS, state[/* deviceManagerRecord */20]));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */20] = deviceManagerRecord;
  return newrecord;
}

function exec(gl, cubemapTextureOpt, renderSkyboxGameObjectDataOpt, renderState) {
  if (cubemapTextureOpt !== undefined && renderSkyboxGameObjectDataOpt !== undefined) {
    gl.TEXTURE_CUBE_MAP;
    var renderState$1 = BindAndUpdateCubemapTextureRenderService$Wonderjs.bindAndUpdate(gl, cubemapTextureOpt, renderState);
    var drawSkyboxShaderIndex = NoMaterialShaderIndexAllShaderService$Wonderjs.unsafeGetShaderIndex("skybox", renderState$1[/* shaderRecord */25]);
    return _restoreGlState(gl, _draw(gl, drawSkyboxShaderIndex, renderSkyboxGameObjectDataOpt, UseProgramRenderService$Wonderjs.useByShaderIndex(gl, drawSkyboxShaderIndex, _prepareGlState(gl, renderState$1))));
  } else {
    return renderState;
  }
}

export {
  getRenderData ,
  _prepareGlState ,
  _sendUniformNoMaterialShaderData ,
  _draw ,
  _restoreGlState ,
  exec ,
  
}
/* RenderJobUtils-Wonderjs Not a pure module */
