

import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../state/main/state/IsDebugMainService.js";

function unsafeGetGl(record) {
  var gl = record[/* gl */0];
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("gl exist", "not"), (function () {
                        return Contract$WonderLog.assertExist(gl);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OptionService$Wonderjs.unsafeGet(gl);
}

function setGl(gl, record) {
  return /* record */[
          /* gl */Js_primitive.some(gl),
          /* colorWrite */record[/* colorWrite */1],
          /* clearColor */record[/* clearColor */2],
          /* side */record[/* side */3],
          /* depthTest */record[/* depthTest */4],
          /* viewport */record[/* viewport */5]
        ];
}

function setColorWrite(gl, param, record) {
  var colorWrite = record[/* colorWrite */1];
  var writeAlpha = param[3];
  var writeBlue = param[2];
  var writeGreen = param[1];
  var writeRed = param[0];
  var exit = 0;
  if (colorWrite !== undefined) {
    var match = colorWrite;
    if (match[0] === writeRed && match[1] === writeGreen && match[2] === writeBlue && match[3] === writeAlpha) {
      return record;
    } else {
      exit = 1;
    }
  } else {
    exit = 1;
  }
  if (exit === 1) {
    gl.colorMask(writeRed, writeGreen, writeBlue, writeAlpha);
    return /* record */[
            /* gl */record[/* gl */0],
            /* colorWrite *//* tuple */[
              writeRed,
              writeGreen,
              writeBlue,
              writeAlpha
            ],
            /* clearColor */record[/* clearColor */2],
            /* side */record[/* side */3],
            /* depthTest */record[/* depthTest */4],
            /* viewport */record[/* viewport */5]
          ];
  }
  
}

function _setSide(gl, targetSide) {
  switch (targetSide) {
    case 0 : 
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.FRONT_AND_BACK);
        return /* () */0;
    case 1 : 
        gl.disable(gl.CULL_FACE);
        return /* () */0;
    case 2 : 
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
        return /* () */0;
    case 3 : 
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.FRONT);
        return /* () */0;
    
  }
}

function setSide(gl, targetSide, record) {
  var side = record[/* side */3];
  var exit = 0;
  if (side !== undefined && side === targetSide) {
    return record;
  } else {
    exit = 1;
  }
  if (exit === 1) {
    _setSide(gl, targetSide);
    return /* record */[
            /* gl */record[/* gl */0],
            /* colorWrite */record[/* colorWrite */1],
            /* clearColor */record[/* clearColor */2],
            /* side */targetSide,
            /* depthTest */record[/* depthTest */4],
            /* viewport */record[/* viewport */5]
          ];
  }
  
}

function _setDepthTest(gl, targetDepthTest) {
  if (targetDepthTest) {
    gl.enable(gl.DEPTH_TEST);
    return /* () */0;
  } else {
    gl.disable(gl.DEPTH_TEST);
    return /* () */0;
  }
}

function setDepthTest(gl, targetDepthTest, record) {
  var depthTest = record[/* depthTest */4];
  var exit = 0;
  if (depthTest !== undefined && depthTest === targetDepthTest) {
    return record;
  } else {
    exit = 1;
  }
  if (exit === 1) {
    _setDepthTest(gl, targetDepthTest);
    return /* record */[
            /* gl */record[/* gl */0],
            /* colorWrite */record[/* colorWrite */1],
            /* clearColor */record[/* clearColor */2],
            /* side */record[/* side */3],
            /* depthTest */targetDepthTest,
            /* viewport */record[/* viewport */5]
          ];
  }
  
}

function clearBuffer(gl, bit, record) {
  var record$1 = setColorWrite(gl, /* tuple */[
        true,
        true,
        true,
        true
      ], record);
  gl.clear(bit);
  return record$1;
}

function clearColor(gl, param, record) {
  var clearColor$1 = record[/* clearColor */2];
  var a = param[3];
  var b = param[2];
  var g = param[1];
  var r = param[0];
  var exit = 0;
  if (clearColor$1 !== undefined) {
    var match = clearColor$1;
    if (match[0] === r && match[1] === g && match[2] === b && match[3] === a) {
      return record;
    } else {
      exit = 1;
    }
  } else {
    exit = 1;
  }
  if (exit === 1) {
    gl.clearColor(r, g, b, a);
    return /* record */[
            /* gl */record[/* gl */0],
            /* colorWrite */record[/* colorWrite */1],
            /* clearColor *//* tuple */[
              r,
              g,
              b,
              a
            ],
            /* side */record[/* side */3],
            /* depthTest */record[/* depthTest */4],
            /* viewport */record[/* viewport */5]
          ];
  }
  
}

function setViewportData(param, record) {
  return /* record */[
          /* gl */record[/* gl */0],
          /* colorWrite */record[/* colorWrite */1],
          /* clearColor */record[/* clearColor */2],
          /* side */record[/* side */3],
          /* depthTest */record[/* depthTest */4],
          /* viewport *//* tuple */[
            param[0],
            param[1],
            param[2],
            param[3]
          ]
        ];
}

function setViewportOfGl(gl, param, record) {
  var viewport = record[/* viewport */5];
  var height = param[3];
  var width = param[2];
  var y = param[1];
  var x = param[0];
  var exit = 0;
  if (viewport !== undefined) {
    var match = viewport;
    if (match[0] === x && match[1] === y && match[2] === width && match[3] === height) {
      return record;
    } else {
      exit = 1;
    }
  } else {
    exit = 1;
  }
  if (exit === 1) {
    gl.viewport(x, y, width, height);
    return /* record */[
            /* gl */record[/* gl */0],
            /* colorWrite */record[/* colorWrite */1],
            /* clearColor */record[/* clearColor */2],
            /* side */record[/* side */3],
            /* depthTest */record[/* depthTest */4],
            /* viewport *//* tuple */[
              x,
              y,
              width,
              height
            ]
          ];
  }
  
}

export {
  unsafeGetGl ,
  setGl ,
  setColorWrite ,
  _setSide ,
  setSide ,
  _setDepthTest ,
  setDepthTest ,
  clearBuffer ,
  clearColor ,
  setViewportData ,
  setViewportOfGl ,
  
}
/* Log-WonderLog Not a pure module */
