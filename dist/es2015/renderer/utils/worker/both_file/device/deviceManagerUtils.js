import { it, requireCheckFunc } from "../../../../../definition/typescript/decorator/contract";
import { initCanvas, getWebgl1Context, getWebgl2Context } from "../../../../../structure/ViewSystem";
import { IO } from "Wonder-Fantasy-Land/dist/es2015/types/IO";
import curry from "wonder-lodash/curry";
import { expect } from "wonder-expect.js";
import { EScreenSize } from "../../../../device/EScreenSize";
import { RectRegion } from "../../../../../structure/RectRegion";
import { chain, compose } from "../../../../../utils/functionalUtils";
import { getRootProperty } from "../../../../../utils/rootUtils";
import { isValueExist } from "../../../../../utils/stateUtils";
import { ESide } from "../../../../enum/ESide";
import { Log } from "../../../../../utils/Log";
import { isWebgl1, isWebgl2 } from "../../render_file/device/webglDetectUtils";
export var getGL = function (DeviceManagerDataFromSystem, state) {
    return DeviceManagerDataFromSystem.gl;
};
export var setGL = curry(function (gl, DeviceManagerDataFromSystem, state) {
    DeviceManagerDataFromSystem.gl = gl;
    return state;
});
export var setContextConfig = curry(function (contextConfig, state) {
    return state.setIn(["DeviceManager", "contextConfig"], contextConfig);
});
export var setPixelRatio = curry(function (pixelRatio, state) {
    if (pixelRatio === null) {
        return state;
    }
    return state.setIn(["DeviceManager", "pixelRatio"], pixelRatio);
});
export var getViewport = function (state) {
    return state.getIn(["DeviceManager", "viewport"]);
};
export var setViewport = function (x, y, width, height, state) {
    return state.setIn(["DeviceManager", "viewport"], RectRegion.create(x, y, width, height));
};
export var setCanvasPixelRatio = curry(function (useDevicePixelRatio, canvas) {
    return IO.of(function () {
        var pixelRatio = getRootProperty("devicePixelRatio").run();
        canvas.width = Math.round(canvas.width * pixelRatio);
        canvas.height = Math.round(canvas.height * pixelRatio);
        return pixelRatio;
    });
});
export var setViewportOfGL = curry(function (DeviceManagerDataFromSystem, state, _a) {
    var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    return IO.of(function () {
        var gl = getGL(DeviceManagerDataFromSystem, state), viewport = getViewport(state);
        if (isValueExist(viewport) && viewport.x === x && viewport.y === y && viewport.width === width && viewport.height === height) {
            return state;
        }
        gl.viewport(x, y, width, height);
        return setViewport(x, y, width, height, state);
    });
});
var _setBodyByScreenSize = function (screenSize, DomQuery) {
    return IO.of(function () {
        if (screenSize === EScreenSize.FULL) {
            DomQuery.create("body").css("margin", "0");
        }
        return screenSize;
    });
};
var _getScreenData = function (screenSize) {
    return IO.of(function () {
        var x = null, y = null, width = null, height = null, styleWidth = null, styleHeight = null;
        if (screenSize === EScreenSize.FULL) {
            x = 0;
            y = 0;
            width = getRootProperty("innerWidth").run();
            height = getRootProperty("innerHeight").run();
            styleWidth = "100%";
            styleHeight = "100%";
        }
        else {
            x = screenSize.x || 0;
            y = screenSize.y || 0;
            width = screenSize.width || getRootProperty("innerWidth").run();
            height = screenSize.height || getRootProperty("innerHeight").run();
            styleWidth = width + "px";
            styleHeight = height + "px";
        }
        return {
            x: x,
            y: y,
            width: width,
            height: height,
            styleWidth: styleWidth,
            styleHeight: styleHeight
        };
    });
};
export var getScreenSize = function (state) {
    return state.getIn(["Main", "screenSize"]);
};
export var setScreen = function (canvas, setScreenData, DeviceManagerDataFromSystem, state, DomQuery) {
    return IO.of(requireCheckFunc(function () {
        it("should exist MainData.screenSize", function () {
            expect(getScreenSize(state)).exist;
        });
    }, function () {
        initCanvas(canvas).run();
        return compose(chain(setScreenData(DeviceManagerDataFromSystem, canvas, state)), chain(_getScreenData), _setBodyByScreenSize)(getScreenSize(state), DomQuery).run();
    }));
};
export var clear = function (gl, DeviceManagerDataFromSystem) {
    setColorWrite(gl, true, true, true, true, DeviceManagerDataFromSystem);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
};
export var clearColorBuffer = function (gl) {
    gl.clear(gl.COLOR_BUFFER_BIT);
};
export var setClearColor = function (gl, color, DeviceManagerDataFromSystem) {
    var clearColor = DeviceManagerDataFromSystem.clearColor;
    if (clearColor && clearColor.isEqual(color)) {
        return;
    }
    gl.clearColor(color.r, color.g, color.b, color.a);
    DeviceManagerDataFromSystem.clearColor = color;
};
export var setColorWrite = function (gl, writeRed, writeGreen, writeBlue, writeAlpha, DeviceManagerDataFromSystem) {
    if (DeviceManagerDataFromSystem.writeRed !== writeRed
        || DeviceManagerDataFromSystem.writeGreen !== writeGreen
        || DeviceManagerDataFromSystem.writeBlue !== writeBlue
        || DeviceManagerDataFromSystem.writeAlpha !== writeAlpha) {
        gl.colorMask(writeRed, writeGreen, writeBlue, writeAlpha);
        DeviceManagerDataFromSystem.writeRed = writeRed;
        DeviceManagerDataFromSystem.writeGreen = writeGreen;
        DeviceManagerDataFromSystem.writeBlue = writeBlue;
        DeviceManagerDataFromSystem.writeAlpha = writeAlpha;
    }
};
export var setSide = function (gl, side, DeviceManagerDataFromSystem) {
    if (DeviceManagerDataFromSystem.side !== side) {
        switch (side) {
            case ESide.NONE:
                gl.enable(gl.CULL_FACE);
                gl.cullFace(gl.FRONT_AND_BACK);
                break;
            case ESide.BOTH:
                gl.disable(gl.CULL_FACE);
                break;
            case ESide.FRONT:
                gl.enable(gl.CULL_FACE);
                gl.cullFace(gl.BACK);
                break;
            case ESide.BACK:
                gl.enable(gl.CULL_FACE);
                gl.cullFace(gl.FRONT);
                break;
            default:
                Log.error(true, Log.info.FUNC_UNEXPECT("side", side));
                break;
        }
        DeviceManagerDataFromSystem.side = side;
    }
};
export var setDepthWrite = function (gl, value, DeviceManagerDataFromSystem) {
    if (DeviceManagerDataFromSystem.depthWrite !== value) {
        gl.depthMask(value);
        DeviceManagerDataFromSystem.depthWrite = value;
    }
};
export var setBlend = function (gl, value, DeviceManagerDataFromSystem) {
    if (DeviceManagerDataFromSystem.blend !== value) {
        if (value) {
            gl.enable(gl.BLEND);
        }
        else {
            gl.disable(gl.BLEND);
        }
        DeviceManagerDataFromSystem.blend = value;
    }
};
export var setBlendFunc = function (gl, blendSrc, blendDst, DeviceManagerDataFromSystem) {
    if (DeviceManagerDataFromSystem.blendSrc !== blendSrc || DeviceManagerDataFromSystem.blendDst !== blendDst) {
        if (DeviceManagerDataFromSystem.blend) {
            gl.blendFunc(gl[blendSrc], gl[blendDst]);
        }
        DeviceManagerDataFromSystem.blendSrc = blendSrc;
        DeviceManagerDataFromSystem.blendDst = blendDst;
    }
};
export var setBlendEquation = function (gl, blendEquation, DeviceManagerDataFromSystem) {
    if (DeviceManagerDataFromSystem.blendEquation !== blendEquation) {
        if (DeviceManagerDataFromSystem.blend) {
            gl.blendEquation(gl[blendEquation]);
        }
        DeviceManagerDataFromSystem.blendEquation = blendEquation;
    }
};
export var setBlendSeparate = function (gl, blendFuncSeparate, DeviceManagerDataFromSystem) {
    var blendFuncSeparateData = DeviceManagerDataFromSystem.blendFuncSeparate;
    if (!blendFuncSeparateData || blendFuncSeparateData[0] !== blendFuncSeparate[0] || blendFuncSeparateData[1] !== blendFuncSeparate[1] || blendFuncSeparateData[2] !== blendFuncSeparate[2] || blendFuncSeparateData[3] !== blendFuncSeparate[3]) {
        if (DeviceManagerDataFromSystem.blend) {
            gl.blendFuncSeparate(gl[blendFuncSeparate[0]], gl[blendFuncSeparate[1]], gl[blendFuncSeparate[2]], gl[blendFuncSeparate[3]]);
        }
        DeviceManagerDataFromSystem.blendFuncSeparate = blendFuncSeparate;
    }
};
export var setDepthTest = function (gl, value, DeviceManagerDataFromSystem) {
    if (DeviceManagerDataFromSystem.depthTest !== value) {
        if (value) {
            gl.enable(gl.DEPTH_TEST);
        }
        else {
            gl.disable(gl.DEPTH_TEST);
        }
        DeviceManagerDataFromSystem.depthTest = value;
    }
};
export var setScissorTest = function (gl, value, DeviceManagerDataFromSystem) {
    if (DeviceManagerDataFromSystem.scissorTest !== value) {
        if (value) {
            gl.enable(gl.SCISSOR_TEST);
        }
        else {
            gl.disable(gl.SCISSOR_TEST);
        }
        DeviceManagerDataFromSystem.scissorTest = value;
    }
};
export var getOnlyGL = function (canvas, options, WebGLDetectDataFromSystem) {
    if (isWebgl1(WebGLDetectDataFromSystem)) {
        Log.log("use webgl1");
        return getWebgl1Context(options, canvas);
    }
    else if (isWebgl2(WebGLDetectDataFromSystem)) {
        Log.log("use webgl2");
        return getWebgl2Context(options, canvas);
    }
    else {
        return null;
    }
};
export var initData = function (DeviceManagerDataFromSystem) {
    DeviceManagerDataFromSystem.gl = null;
    DeviceManagerDataFromSystem.clearColor = null;
    DeviceManagerDataFromSystem.writeRed = null;
    DeviceManagerDataFromSystem.writeGreen = null;
    DeviceManagerDataFromSystem.writeBlue = null;
    DeviceManagerDataFromSystem.writeAlpha = null;
    DeviceManagerDataFromSystem.side = null;
    DeviceManagerDataFromSystem.depthWrite = null;
    DeviceManagerDataFromSystem.blend = null;
    DeviceManagerDataFromSystem.blendSrc = null;
    DeviceManagerDataFromSystem.blendDst = null;
    DeviceManagerDataFromSystem.depthTest = null;
    DeviceManagerDataFromSystem.scissorTest = null;
    DeviceManagerDataFromSystem.blendEquation = null;
    DeviceManagerDataFromSystem.blendFuncSeparate = null;
};
//# sourceMappingURL=deviceManagerUtils.js.map