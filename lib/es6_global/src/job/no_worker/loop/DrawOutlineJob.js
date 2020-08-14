

import * as Js_option from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$Wonderjs from "../../../service/atom/ArrayService.js";
import * as RenderJobUtils$Wonderjs from "../../utils/render/RenderJobUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GLSLLocationService$Wonderjs from "../../../service/record/all/location/GLSLLocationService.js";
import * as DeviceManagerService$Wonderjs from "../../../service/record/all/device/DeviceManagerService.js";
import * as UseProgramRenderService$Wonderjs from "../../../service/state/render/program/UseProgramRenderService.js";
import * as DrawModeMeshRendererService$Wonderjs from "../../../service/state/render/meshRenderer/DrawModeMeshRendererService.js";
import * as OperateRenderJobDataService$Wonderjs from "../../../service/record/render/jobData/OperateRenderJobDataService.js";
import * as CreateRenderStateMainService$Wonderjs from "../../../service/state/main/render/CreateRenderStateMainService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../service/record/main/gameObject/GetComponentGameObjectService.js";
import * as ClearLastSendComponentJobUtils$Wonderjs from "../../utils/ClearLastSendComponentJobUtils.js";
import * as NoMaterialShaderIndexShaderService$Wonderjs from "../../../service/record/all/shader/NoMaterialShaderIndexShaderService.js";
import * as CreateGetRenederDataSubStateRenderService$Wonderjs from "../../../service/state/render/get_render_data/CreateGetRenederDataSubStateRenderService.js";
import * as CreateSendRenederDataSubStateRenderService$Wonderjs from "../../../service/state/render/send_render_data/CreateSendRenederDataSubStateRenderService.js";
import * as HandleNoMaterialShaderUniformConfigDataService$Wonderjs from "../../../service/record/all/sender/uniform/no_material_shader/HandleNoMaterialShaderUniformConfigDataService.js";

function draw(gl, shaderIndex, renderDataArr, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, param) {
                var geometryIndex = param[2];
                var sendRenderDataSubState = CreateSendRenederDataSubStateRenderService$Wonderjs.createState(state);
                RenderJobUtils$Wonderjs.sendAttributeData(gl, /* tuple */[
                      shaderIndex,
                      geometryIndex
                    ], sendRenderDataSubState, state);
                var getRenderDataSubState = CreateGetRenederDataSubStateRenderService$Wonderjs.createState(state);
                RenderJobUtils$Wonderjs.sendUniformRenderObjectModelData(gl, /* tuple */[
                      shaderIndex,
                      param[0]
                    ], /* tuple */[
                      getRenderDataSubState,
                      state
                    ]);
                RenderJobUtils$Wonderjs.draw(gl, DrawModeMeshRendererService$Wonderjs.getGlDrawMode(gl, param[1], state), geometryIndex, state);
                return state;
              }), state, renderDataArr);
}

var DrawOriginGameObjects = /* module */[/* draw */draw];

function _sendUniformNoMaterialShaderData(gl, shaderIndex, getRenderDataSubState, state) {
  ArrayService$WonderCommonlib.forEach((function (param) {
          var pos = param[/* pos */2];
          var match = GLSLLocationService$Wonderjs.isUniformLocationExist(pos);
          if (match) {
            return param[/* sendDataFunc */4](gl, param[/* shaderCacheMap */0], /* tuple */[
                        param[/* name */1],
                        pos
                      ], param[/* getDataFunc */3](getRenderDataSubState));
          } else {
            return /* () */0;
          }
        }), HandleNoMaterialShaderUniformConfigDataService$Wonderjs.unsafeGetUniformSendData(shaderIndex, state[/* glslSenderRecord */3]));
  return state;
}

function draw$1(gl, shaderIndex, renderDataArr, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, param) {
                var geometryIndex = param[2];
                var sendRenderDataSubState = CreateSendRenederDataSubStateRenderService$Wonderjs.createState(state);
                RenderJobUtils$Wonderjs.sendAttributeData(gl, /* tuple */[
                      shaderIndex,
                      geometryIndex
                    ], sendRenderDataSubState, state);
                var getRenderDataSubState = CreateGetRenederDataSubStateRenderService$Wonderjs.createState(state);
                RenderJobUtils$Wonderjs.sendUniformRenderObjectModelData(gl, /* tuple */[
                      shaderIndex,
                      param[0]
                    ], /* tuple */[
                      getRenderDataSubState,
                      state
                    ]);
                _sendUniformNoMaterialShaderData(gl, shaderIndex, getRenderDataSubState, state);
                RenderJobUtils$Wonderjs.draw(gl, DrawModeMeshRendererService$Wonderjs.getGlDrawMode(gl, param[1], state), geometryIndex, state);
                return state;
              }), state, renderDataArr);
}

var DrawExpandGameObjects = /* module */[
  /* _sendUniformNoMaterialShaderData */_sendUniformNoMaterialShaderData,
  /* draw */draw$1
];

function _prepareGlState(gl, state) {
  var deviceManagerRecord = DeviceManagerService$Wonderjs.setColorWrite(gl, /* tuple */[
        false,
        false,
        false,
        false
      ], DeviceManagerService$Wonderjs.setDepthWrite(gl, false, DeviceManagerService$Wonderjs.setDepthTest(gl, false, DeviceManagerService$Wonderjs.setStencilMask(gl, 255, DeviceManagerService$Wonderjs.setStencilFunc(gl, /* tuple */[
                        gl.ALWAYS,
                        1,
                        255
                      ], DeviceManagerService$Wonderjs.setStencilOp(gl, /* tuple */[
                            gl.KEEP,
                            gl.KEEP,
                            gl.REPLACE
                          ], DeviceManagerService$Wonderjs.setStencilTest(gl, true, state[/* deviceManagerRecord */18])))))));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */18] = deviceManagerRecord;
  return newrecord;
}

var _useDrawOriginGameObjectsProgram = UseProgramRenderService$Wonderjs.useByShaderIndex;

var _useDrawExpandGameObjectsProgram = UseProgramRenderService$Wonderjs.useByShaderIndex;

function _setGlStateBeforeDrawExpandGameObjects(gl, state) {
  var deviceManagerRecord = DeviceManagerService$Wonderjs.setColorWrite(gl, /* tuple */[
        true,
        true,
        true,
        true
      ], DeviceManagerService$Wonderjs.setDepthWrite(gl, false, DeviceManagerService$Wonderjs.setDepthTest(gl, false, DeviceManagerService$Wonderjs.setStencilMask(gl, 0, DeviceManagerService$Wonderjs.setStencilFunc(gl, /* tuple */[
                        gl.NOTEQUAL,
                        1,
                        255
                      ], state[/* deviceManagerRecord */18])))));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */18] = deviceManagerRecord;
  return newrecord;
}

function _restoreGlState(gl, state) {
  var deviceManagerRecord = DeviceManagerService$Wonderjs.setDepthWrite(gl, true, DeviceManagerService$Wonderjs.setDepthTest(gl, true, DeviceManagerService$Wonderjs.setStencilMask(gl, 255, DeviceManagerService$Wonderjs.setStencilTest(gl, false, state[/* deviceManagerRecord */18]))));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */18] = deviceManagerRecord;
  return newrecord;
}

function _clearLastSendComponent(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* glslSenderRecord */3] = ClearLastSendComponentJobUtils$Wonderjs.execJob(state[/* glslSenderRecord */3]);
  return newrecord;
}

function exec(renderDataArr, state) {
  var shaderRecord = state[/* shaderRecord */23];
  var drawOriginGameObjectsShaderIndex = NoMaterialShaderIndexShaderService$Wonderjs.unsafeGetShaderIndex("outline_draw_origin_gameObjects", shaderRecord);
  var drawExpandGameObjectsShaderIndex = NoMaterialShaderIndexShaderService$Wonderjs.unsafeGetShaderIndex("outline_draw_expand_gameObjects", shaderRecord);
  var gl = DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */18]);
  var state$1 = _prepareGlState(gl, state);
  var state$2 = _setGlStateBeforeDrawExpandGameObjects(gl, _clearLastSendComponent(draw(gl, drawOriginGameObjectsShaderIndex, renderDataArr, UseProgramRenderService$Wonderjs.useByShaderIndex(gl, drawOriginGameObjectsShaderIndex, state$1))));
  return _restoreGlState(gl, draw$1(gl, drawExpandGameObjectsShaderIndex, renderDataArr, UseProgramRenderService$Wonderjs.useByShaderIndex(gl, drawExpandGameObjectsShaderIndex, state$2)));
}

var DrawOutlineJobUtils = /* module */[
  /* DrawOriginGameObjects */DrawOriginGameObjects,
  /* DrawExpandGameObjects */DrawExpandGameObjects,
  /* _prepareGlState */_prepareGlState,
  /* _useDrawOriginGameObjectsProgram */_useDrawOriginGameObjectsProgram,
  /* _useDrawExpandGameObjectsProgram */_useDrawExpandGameObjectsProgram,
  /* _setGlStateBeforeDrawExpandGameObjects */_setGlStateBeforeDrawExpandGameObjects,
  /* _restoreGlState */_restoreGlState,
  /* _clearLastSendComponent */_clearLastSendComponent,
  /* exec */exec
];

function _getRenderDataArr(state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return ArrayService$WonderCommonlib.reduceOneParam((function (renderDataArr, gameObjectNeedDrawOutline) {
                var transform = GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(gameObjectNeedDrawOutline, gameObjectRecord);
                var match = Js_option.andThen((function (geometry) {
                        return Js_option.andThen((function (meshRenderer) {
                                      return /* tuple */[
                                              transform,
                                              meshRenderer,
                                              geometry
                                            ];
                                    }), GetComponentGameObjectService$Wonderjs.getMeshRendererComponent(gameObjectNeedDrawOutline, gameObjectRecord));
                      }), GetComponentGameObjectService$Wonderjs.getGeometryComponent(gameObjectNeedDrawOutline, gameObjectRecord));
                if (match !== undefined) {
                  return ArrayService$Wonderjs.push(match, renderDataArr);
                } else {
                  return renderDataArr;
                }
              }), /* array */[], OperateRenderJobDataService$Wonderjs.getGameObjectsNeedDrawOutline(state[/* jobDataRecord */44]));
}

function execJob(flags, state) {
  var renderState = CreateRenderStateMainService$Wonderjs.createRenderState(state);
  exec(_getRenderDataArr(state), renderState);
  return state;
}

export {
  DrawOutlineJobUtils ,
  _getRenderDataArr ,
  execJob ,
  
}
/* ArrayService-Wonderjs Not a pure module */
