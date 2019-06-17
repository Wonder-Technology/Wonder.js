

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ImageService$Wonderjs from "../../../service/atom/ImageService.js";
import * as OptionService$Wonderjs from "../../../service/atom/OptionService.js";
import * as RenderJobUtils$Wonderjs from "../../utils/render/RenderJobUtils.js";
import * as FileNameService$Wonderjs from "../../../service/atom/FileNameService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GLSLLocationService$Wonderjs from "../../../service/record/all/location/GLSLLocationService.js";
import * as DeviceManagerService$Wonderjs from "../../../service/record/all/device/DeviceManagerService.js";
import * as TextureFormatService$Wonderjs from "../../../service/primitive/texture/TextureFormatService.js";
import * as UseProgramRenderService$Wonderjs from "../../../service/state/render/program/UseProgramRenderService.js";
import * as CreateRenderStateMainService$Wonderjs from "../../../service/state/main/render/CreateRenderStateMainService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../service/record/main/gameObject/GetComponentGameObjectService.js";
import * as NoMaterialShaderIndexShaderService$Wonderjs from "../../../service/record/all/shader/NoMaterialShaderIndexShaderService.js";
import * as CreateGetRenederDataSubStateRenderService$Wonderjs from "../../../service/state/render/get_render_data/CreateGetRenederDataSubStateRenderService.js";
import * as CreateSendRenederDataSubStateRenderService$Wonderjs from "../../../service/state/render/send_render_data/CreateSendRenederDataSubStateRenderService.js";
import * as HandleNoMaterialShaderUniformConfigDataService$Wonderjs from "../../../service/record/all/sender/uniform/no_material_shader/HandleNoMaterialShaderUniformConfigDataService.js";

function _needUpdateCubeTexture(state) {
  return state[/* jobDataRecord */44][/* skyboxData */1][/* needUpdateCubeTexture */1];
}

function _markUpdateCubeTexture(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* jobDataRecord */44];
  var init$1 = state[/* jobDataRecord */44][/* skyboxData */1];
  newrecord[/* jobDataRecord */44] = /* record */[
    /* outlineData */init[/* outlineData */0],
    /* skyboxData : record */[
      /* skyboxGameObject */init$1[/* skyboxGameObject */0],
      /* needUpdateCubeTexture */false,
      /* nxImage */init$1[/* nxImage */2],
      /* pxImage */init$1[/* pxImage */3],
      /* nyImage */init$1[/* nyImage */4],
      /* pyImage */init$1[/* pyImage */5],
      /* nzImage */init$1[/* nzImage */6],
      /* pzImage */init$1[/* pzImage */7],
      /* cubeTexture */init$1[/* cubeTexture */8]
    ]
  ];
  return newrecord;
}

function _unsafeGetCubeTexture(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* jobDataRecord */44][/* skyboxData */1][/* cubeTexture */8]);
}

function _unsafeGetPXImage(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* jobDataRecord */44][/* skyboxData */1][/* pxImage */3]);
}

function _unsafeGetNXImage(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* jobDataRecord */44][/* skyboxData */1][/* nxImage */2]);
}

function _unsafeGetPYImage(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* jobDataRecord */44][/* skyboxData */1][/* pyImage */5]);
}

function _unsafeGetNYImage(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* jobDataRecord */44][/* skyboxData */1][/* nyImage */4]);
}

function _unsafeGetPZImage(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* jobDataRecord */44][/* skyboxData */1][/* pzImage */7]);
}

function _unsafeGetNZImage(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* jobDataRecord */44][/* skyboxData */1][/* nzImage */6]);
}

function _unsafeGetSkyboxGameObject(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* jobDataRecord */44][/* skyboxData */1][/* skyboxGameObject */0]);
}

function _getTextureFormat(gl, imageExtname) {
  return TextureFormatService$Wonderjs.getGlFormat(gl, TextureFormatService$Wonderjs.getFormatByMimeType(ImageService$Wonderjs.getMimeTypeByExtname(imageExtname)));
}

function _drawTexture(gl, target, source) {
  var glFormat = _getTextureFormat(gl, FileNameService$Wonderjs.getFileExtName(source.src));
  gl.texImage2D(target, 0, glFormat, glFormat, gl.UNSIGNED_BYTE, source);
  return /* () */0;
}

function _updateCubeTexture(gl, target, state) {
  _drawTexture(gl, gl.TEXTURE_CUBE_MAP_POSITIVE_X, _unsafeGetPXImage(state));
  _drawTexture(gl, gl.TEXTURE_CUBE_MAP_NEGATIVE_X, _unsafeGetNXImage(state));
  _drawTexture(gl, gl.TEXTURE_CUBE_MAP_POSITIVE_Y, _unsafeGetPYImage(state));
  _drawTexture(gl, gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, _unsafeGetNYImage(state));
  _drawTexture(gl, gl.TEXTURE_CUBE_MAP_POSITIVE_Z, _unsafeGetPZImage(state));
  _drawTexture(gl, gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, _unsafeGetNZImage(state));
  gl.texParameteri(target, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(target, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  return state;
}

function _prepareGlState(gl, state) {
  var deviceManagerRecord = DeviceManagerService$Wonderjs.setSide(gl, /* BACK */3, DeviceManagerService$Wonderjs.setDepthFunc(gl, gl.LEQUAL, state[/* deviceManagerRecord */18]));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */18] = deviceManagerRecord;
  return newrecord;
}

function _getRenderData(skyboxGameObject, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return /* tuple */[
          GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(skyboxGameObject, gameObjectRecord),
          GetComponentGameObjectService$Wonderjs.unsafeGetGeometryComponent(skyboxGameObject, gameObjectRecord)
        ];
}

function _sendUniformNoMaterialShaderData(gl, shaderIndex, getRenderDataSubState, state) {
  ArrayService$WonderCommonlib.forEach((function (param) {
          var sendDataFunc = param[/* sendDataFunc */4];
          var getDataFunc = param[/* getDataFunc */3];
          var pos = param[/* pos */2];
          var name = param[/* name */1];
          var match = GLSLLocationService$Wonderjs.isUniformLocationExist(pos);
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
  RenderJobUtils$Wonderjs.draw(gl, /* Triangles */4, geometryIndex, state);
  return state;
}

function _restoreGlState(gl, state) {
  var deviceManagerRecord = DeviceManagerService$Wonderjs.setSide(gl, /* FRONT */2, DeviceManagerService$Wonderjs.setDepthFunc(gl, gl.LESS, state[/* deviceManagerRecord */18]));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */18] = deviceManagerRecord;
  return newrecord;
}

function execJob(flags, state) {
  var cubeTexture = _unsafeGetCubeTexture(state);
  var gl = DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]);
  var target = gl.TEXTURE_CUBE_MAP;
  gl.bindTexture(target, cubeTexture);
  gl.activeTexture(gl.TEXTURE0);
  var match = state[/* jobDataRecord */44][/* skyboxData */1][/* needUpdateCubeTexture */1];
  var state$1 = match ? _updateCubeTexture(gl, target, state) : state;
  var drawSkyboxShaderIndex = NoMaterialShaderIndexShaderService$Wonderjs.unsafeGetShaderIndex("skybox", state$1[/* shaderRecord */26]);
  var gl$1 = DeviceManagerService$Wonderjs.unsafeGetGl(state$1[/* deviceManagerRecord */9]);
  var renderState = CreateRenderStateMainService$Wonderjs.createRenderState(state$1);
  _restoreGlState(gl$1, _draw(gl$1, drawSkyboxShaderIndex, _getRenderData(_unsafeGetSkyboxGameObject(state$1), state$1), UseProgramRenderService$Wonderjs.useByShaderIndex(gl$1, drawSkyboxShaderIndex, _prepareGlState(gl$1, renderState))));
  return _markUpdateCubeTexture(state$1);
}

export {
  _needUpdateCubeTexture ,
  _markUpdateCubeTexture ,
  _unsafeGetCubeTexture ,
  _unsafeGetPXImage ,
  _unsafeGetNXImage ,
  _unsafeGetPYImage ,
  _unsafeGetNYImage ,
  _unsafeGetPZImage ,
  _unsafeGetNZImage ,
  _unsafeGetSkyboxGameObject ,
  _getTextureFormat ,
  _drawTexture ,
  _updateCubeTexture ,
  _prepareGlState ,
  _getRenderData ,
  _sendUniformNoMaterialShaderData ,
  _draw ,
  _restoreGlState ,
  execJob ,
  
}
/* ImageService-Wonderjs Not a pure module */
