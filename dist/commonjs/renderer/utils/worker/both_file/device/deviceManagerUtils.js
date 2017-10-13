"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contract_1 = require("../../../../../definition/typescript/decorator/contract");
var ViewSystem_1 = require("../../../../../structure/ViewSystem");
var IO_1 = require("wonder-fantasy-land/dist/commonjs/types/IO");
var curry_1 = require("wonder-lodash/curry");
var wonder_expect_js_1 = require("wonder-expect.js");
var EScreenSize_1 = require("../../../../device/EScreenSize");
var RectRegion_1 = require("../../../../../structure/RectRegion");
var functionalUtils_1 = require("../../../../../utils/functionalUtils");
var rootUtils_1 = require("../../../../../utils/rootUtils");
var stateUtils_1 = require("../../../../../utils/stateUtils");
var ESide_1 = require("../../../../enum/ESide");
var Log_1 = require("../../../../../utils/Log");
var webglDetectUtils_1 = require("../../render_file/device/webglDetectUtils");
exports.getGL = function (DeviceManagerDataFromSystem, state) {
    return DeviceManagerDataFromSystem.gl;
};
exports.setGL = curry_1.default(function (gl, DeviceManagerDataFromSystem, state) {
    DeviceManagerDataFromSystem.gl = gl;
    return state;
});
exports.setContextConfig = curry_1.default(function (contextConfig, state) {
    return state.setIn(["DeviceManager", "contextConfig"], contextConfig);
});
exports.setPixelRatio = curry_1.default(function (pixelRatio, state) {
    if (pixelRatio === null) {
        return state;
    }
    return state.setIn(["DeviceManager", "pixelRatio"], pixelRatio);
});
exports.getViewport = function (state) {
    return state.getIn(["DeviceManager", "viewport"]);
};
exports.setViewportToState = function (x, y, width, height, state) {
    return state.setIn(["DeviceManager", "viewport"], RectRegion_1.RectRegion.create(x, y, width, height));
};
exports.setCanvasPixelRatio = curry_1.default(function (useDevicePixelRatio, canvas) {
    return IO_1.IO.of(function () {
        var pixelRatio = rootUtils_1.getRootProperty("devicePixelRatio").run();
        canvas.width = Math.round(canvas.width * pixelRatio);
        canvas.height = Math.round(canvas.height * pixelRatio);
        return pixelRatio;
    });
});
exports.setViewportOfGL = curry_1.default(function (DeviceManagerDataFromSystem, state, _a) {
    var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    return IO_1.IO.of(function () {
        var gl = exports.getGL(DeviceManagerDataFromSystem, state), viewport = exports.getViewport(state);
        if (stateUtils_1.isValueExist(viewport) && viewport.x === x && viewport.y === y && viewport.width === width && viewport.height === height) {
            return state;
        }
        gl.viewport(x, y, width, height);
        return exports.setViewportToState(x, y, width, height, state);
    });
});
var _setBodyByScreenSize = function (screenSize, DomQuery) {
    return IO_1.IO.of(function () {
        if (screenSize === EScreenSize_1.EScreenSize.FULL) {
            DomQuery.create("body").css("margin", "0");
        }
        return screenSize;
    });
};
var _getScreenData = function (screenSize) {
    return IO_1.IO.of(function () {
        var x = null, y = null, width = null, height = null, styleWidth = null, styleHeight = null;
        if (screenSize === EScreenSize_1.EScreenSize.FULL) {
            x = 0;
            y = 0;
            width = rootUtils_1.getRootProperty("innerWidth").run();
            height = rootUtils_1.getRootProperty("innerHeight").run();
            styleWidth = "100%";
            styleHeight = "100%";
        }
        else {
            x = screenSize.x || 0;
            y = screenSize.y || 0;
            width = screenSize.width || rootUtils_1.getRootProperty("innerWidth").run();
            height = screenSize.height || rootUtils_1.getRootProperty("innerHeight").run();
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
exports.getScreenSize = function (state) {
    return state.getIn(["Main", "screenSize"]);
};
exports.setScreen = function (canvas, setScreenData, DeviceManagerDataFromSystem, state, DomQuery) {
    return IO_1.IO.of(contract_1.requireCheckFunc(function () {
        contract_1.it("should exist MainData.screenSize", function () {
            wonder_expect_js_1.expect(exports.getScreenSize(state)).exist;
        });
    }, function () {
        ViewSystem_1.initCanvas(canvas).run();
        return functionalUtils_1.compose(functionalUtils_1.chain(setScreenData(DeviceManagerDataFromSystem, canvas, state)), functionalUtils_1.chain(_getScreenData), _setBodyByScreenSize)(exports.getScreenSize(state), DomQuery).run();
    }));
};
exports.clear = function (gl, DeviceManagerDataFromSystem) {
    exports.setColorWrite(gl, true, true, true, true, DeviceManagerDataFromSystem);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
};
exports.clearColorBuffer = function (gl) {
    gl.clear(gl.COLOR_BUFFER_BIT);
};
exports.setClearColor = function (gl, color, DeviceManagerDataFromSystem) {
    var clearColor = DeviceManagerDataFromSystem.clearColor;
    if (clearColor && clearColor.isEqual(color)) {
        return;
    }
    gl.clearColor(color.r, color.g, color.b, color.a);
    exports.setClearColorData(color, DeviceManagerDataFromSystem);
};
exports.setClearColorData = function (color, DeviceManagerDataFromSystem) {
    DeviceManagerDataFromSystem.clearColor = color;
};
exports.setColorWrite = function (gl, writeRed, writeGreen, writeBlue, writeAlpha, DeviceManagerDataFromSystem) {
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
exports.setSide = function (gl, side, DeviceManagerDataFromSystem) {
    if (DeviceManagerDataFromSystem.side !== side) {
        switch (side) {
            case ESide_1.ESide.NONE:
                gl.enable(gl.CULL_FACE);
                gl.cullFace(gl.FRONT_AND_BACK);
                break;
            case ESide_1.ESide.BOTH:
                gl.disable(gl.CULL_FACE);
                break;
            case ESide_1.ESide.FRONT:
                gl.enable(gl.CULL_FACE);
                gl.cullFace(gl.BACK);
                break;
            case ESide_1.ESide.BACK:
                gl.enable(gl.CULL_FACE);
                gl.cullFace(gl.FRONT);
                break;
            default:
                Log_1.Log.error(true, Log_1.Log.info.FUNC_UNEXPECT("side", side));
                break;
        }
        DeviceManagerDataFromSystem.side = side;
    }
};
exports.setDepthWrite = function (gl, value, DeviceManagerDataFromSystem) {
    if (DeviceManagerDataFromSystem.depthWrite !== value) {
        gl.depthMask(value);
        DeviceManagerDataFromSystem.depthWrite = value;
    }
};
exports.setBlend = function (gl, value, DeviceManagerDataFromSystem) {
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
exports.setBlendFunc = function (gl, blendSrc, blendDst, DeviceManagerDataFromSystem) {
    if (DeviceManagerDataFromSystem.blendSrc !== blendSrc || DeviceManagerDataFromSystem.blendDst !== blendDst) {
        if (DeviceManagerDataFromSystem.blend) {
            gl.blendFunc(gl[blendSrc], gl[blendDst]);
        }
        DeviceManagerDataFromSystem.blendSrc = blendSrc;
        DeviceManagerDataFromSystem.blendDst = blendDst;
    }
};
exports.setBlendEquation = function (gl, blendEquation, DeviceManagerDataFromSystem) {
    if (DeviceManagerDataFromSystem.blendEquation !== blendEquation) {
        if (DeviceManagerDataFromSystem.blend) {
            gl.blendEquation(gl[blendEquation]);
        }
        DeviceManagerDataFromSystem.blendEquation = blendEquation;
    }
};
exports.setBlendSeparate = function (gl, blendFuncSeparate, DeviceManagerDataFromSystem) {
    var blendFuncSeparateData = DeviceManagerDataFromSystem.blendFuncSeparate;
    if (!blendFuncSeparateData || blendFuncSeparateData[0] !== blendFuncSeparate[0] || blendFuncSeparateData[1] !== blendFuncSeparate[1] || blendFuncSeparateData[2] !== blendFuncSeparate[2] || blendFuncSeparateData[3] !== blendFuncSeparate[3]) {
        if (DeviceManagerDataFromSystem.blend) {
            gl.blendFuncSeparate(gl[blendFuncSeparate[0]], gl[blendFuncSeparate[1]], gl[blendFuncSeparate[2]], gl[blendFuncSeparate[3]]);
        }
        DeviceManagerDataFromSystem.blendFuncSeparate = blendFuncSeparate;
    }
};
exports.setDepthTest = function (gl, value, DeviceManagerDataFromSystem) {
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
exports.setScissorTest = function (gl, value, DeviceManagerDataFromSystem) {
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
exports.getOnlyGL = function (canvas, options, WebGLDetectDataFromSystem) {
    if (webglDetectUtils_1.isWebgl1(WebGLDetectDataFromSystem)) {
        Log_1.Log.log("use webgl1");
        return ViewSystem_1.getWebgl1Context(options, canvas);
    }
    else if (webglDetectUtils_1.isWebgl2(WebGLDetectDataFromSystem)) {
        Log_1.Log.log("use webgl2");
        return ViewSystem_1.getWebgl2Context(options, canvas);
    }
    else {
        return null;
    }
};
exports.initData = function (DeviceManagerDataFromSystem) {
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