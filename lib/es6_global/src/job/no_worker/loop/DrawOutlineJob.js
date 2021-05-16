

import * as Js_option from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$Wonderjs from "../../../service/atom/ArrayService.js";
import * as RenderJobUtils$Wonderjs from "../../utils/render/RenderJobUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as AllGLSLLocationService$Wonderjs from "../../../service/record/all/location/AllGLSLLocationService.js";
import * as AllDeviceManagerService$Wonderjs from "../../../service/record/all/device/AllDeviceManagerService.js";
import * as UseProgramRenderService$Wonderjs from "../../../service/state/render/program/UseProgramRenderService.js";
import * as DrawModeMeshRendererService$Wonderjs from "../../../service/state/render/meshRenderer/DrawModeMeshRendererService.js";
import * as OperateRenderJobDataService$Wonderjs from "../../../service/record/render/jobData/OperateRenderJobDataService.js";
import * as CreateRenderStateMainService$Wonderjs from "../../../service/state/main/render/CreateRenderStateMainService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../service/record/main/gameObject/GetComponentGameObjectService.js";
import * as ClearLastSendComponentJobUtils$Wonderjs from "../../utils/ClearLastSendComponentJobUtils.js";
import * as NoMaterialShaderIndexAllShaderService$Wonderjs from "../../../service/record/all/shader/NoMaterialShaderIndexAllShaderService.js";
import * as CreateGetRenederDataSubStateRenderService$Wonderjs from "../../../service/state/render/sub/get_render_data/CreateGetRenederDataSubStateRenderService.js";
import * as CreateSendRenederDataSubStateRenderService$Wonderjs from "../../../service/state/render/sub/send_render_data/CreateSendRenederDataSubStateRenderService.js";
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
          var match = AllGLSLLocationService$Wonderjs.isUniformLocationExist(pos);
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
  var deviceManagerRecord = AllDeviceManagerService$Wonderjs.setColorWrite(gl, /* tuple */[
        false,
        false,
        false,
        false
      ], AllDeviceManagerService$Wonderjs.setDepthWrite(gl, false, AllDeviceManagerService$Wonderjs.setDepthTest(gl, false, AllDeviceManagerService$Wonderjs.setStencilMask(gl, 255, AllDeviceManagerService$Wonderjs.setStencilFunc(gl, /* tuple */[
                        gl.ALWAYS,
                        1,
                        255
                      ], AllDeviceManagerService$Wonderjs.setStencilOp(gl, /* tuple */[
                            gl.KEEP,
                            gl.KEEP,
                            gl.REPLACE
                          ], AllDeviceManagerService$Wonderjs.setStencilTest(gl, true, state[/* deviceManagerRecord */20])))))));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */20] = deviceManagerRecord;
  return newrecord;
}

var _useDrawOriginGameObjectsProgram = UseProgramRenderService$Wonderjs.useByShaderIndex;

var _useDrawExpandGameObjectsProgram = UseProgramRenderService$Wonderjs.useByShaderIndex;

function _setGlStateBeforeDrawExpandGameObjects(gl, state) {
  var deviceManagerRecord = AllDeviceManagerService$Wonderjs.setColorWrite(gl, /* tuple */[
        true,
        true,
        true,
        true
      ], AllDeviceManagerService$Wonderjs.setDepthWrite(gl, false, AllDeviceManagerService$Wonderjs.setDepthTest(gl, false, AllDeviceManagerService$Wonderjs.setStencilMask(gl, 0, AllDeviceManagerService$Wonderjs.setStencilFunc(gl, /* tuple */[
                        gl.NOTEQUAL,
                        1,
                        255
                      ], state[/* deviceManagerRecord */20])))));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */20] = deviceManagerRecord;
  return newrecord;
}

function _restoreGlState(gl, state) {
  var deviceManagerRecord = AllDeviceManagerService$Wonderjs.setDepthWrite(gl, true, AllDeviceManagerService$Wonderjs.setDepthTest(gl, true, AllDeviceManagerService$Wonderjs.setStencilMask(gl, 255, AllDeviceManagerService$Wonderjs.setStencilTest(gl, false, state[/* deviceManagerRecord */20]))));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */20] = deviceManagerRecord;
  return newrecord;
}

function _clearLastSendComponent(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* glslSenderRecord */3] = ClearLastSendComponentJobUtils$Wonderjs.execJob(state[/* glslSenderRecord */3]);
  return newrecord;
}

function exec(renderDataArr, state) {
  var shaderRecord = state[/* shaderRecord */25];
  var drawOriginGameObjectsShaderIndex = NoMaterialShaderIndexAllShaderService$Wonderjs.unsafeGetShaderIndex("outline_draw_origin_gameObjects", shaderRecord);
  var drawExpandGameObjectsShaderIndex = NoMaterialShaderIndexAllShaderService$Wonderjs.unsafeGetShaderIndex("outline_draw_expand_gameObjects", shaderRecord);
  var gl = AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */20]);
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
              }), /* array */[], OperateRenderJobDataService$Wonderjs.getGameObjectsNeedDrawOutline(state[/* jobDataRecord */46]));
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
