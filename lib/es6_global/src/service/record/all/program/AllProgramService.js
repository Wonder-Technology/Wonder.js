

import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../state/main/state/IsDebugMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function _compileShader(gl, glslSource, shader) {
  gl.shaderSource(shader, glslSource);
  gl.compileShader(shader);
  Log$WonderLog.debugWithFunc((function (param) {
          var match = gl.getShaderParameter(shader, gl.COMPILE_STATUS) === false;
          if (match) {
            var message = gl.getShaderInfoLog(shader);
            var partial_arg = "" + (String(message) + "");
            Log$WonderLog.debug((function (param) {
                    return Log$WonderLog.buildDebugMessage("shader info log", partial_arg, param);
                  }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
            var partial_arg$1 = "" + (String(glslSource) + "");
            return Log$WonderLog.debug((function (param) {
                          return Log$WonderLog.buildDebugMessage("glsl source", partial_arg$1, param);
                        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
          } else {
            return /* () */0;
          }
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return shader;
}

function _linkProgram(program, gl) {
  gl.linkProgram(program);
  Log$WonderLog.debugWithFunc((function (param) {
          var match = gl.getProgramParameter(program, gl.LINK_STATUS) === false;
          if (match) {
            var message = gl.getProgramInfoLog(program);
            return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("link program error", "" + (String(message) + ""), "", "", ""));
          } else {
            return /* () */0;
          }
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return /* () */0;
}

function initShader(vsSource, fsSource, gl, program) {
  var vs = _compileShader(gl, vsSource, gl.createShader(gl.VERTEX_SHADER));
  var fs = _compileShader(gl, fsSource, gl.createShader(gl.FRAGMENT_SHADER));
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.bindAttribLocation(program, 0, "a_position");
  _linkProgram(program, gl);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  return program;
}

function getProgram(shaderIndex, param) {
  return MutableSparseMapService$WonderCommonlib.get(shaderIndex, param[/* programMap */0]);
}

function unsafeGetProgram(shaderIndex, param) {
  return Contract$WonderLog.ensureCheck((function (program) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("program exist", "not"), (function (param) {
                              return Contract$WonderLog.assertNullableExist(program);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), MutableSparseMapService$WonderCommonlib.unsafeGet(shaderIndex, param[/* programMap */0]));
}

function registerProgram(shaderIndex, param, program) {
  MutableSparseMapService$WonderCommonlib.set(shaderIndex, program, param[/* programMap */0]);
  return program;
}

function clearLastSendProgram(record) {
  return /* record */[
          /* programMap */record[/* programMap */0],
          /* lastUsedProgram */undefined
        ];
}

export {
  _compileShader ,
  _linkProgram ,
  initShader ,
  getProgram ,
  unsafeGetProgram ,
  registerProgram ,
  clearLastSendProgram ,
  
}
/* Log-WonderLog Not a pure module */
