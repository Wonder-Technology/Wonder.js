import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import { it, requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { initCanvas } from "../../../structure/ViewSystem";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import curry from "wonder-lodash/curry";
import { expect } from "wonder-expect.js";
import { EScreenSize } from "../../device/EScreenSize";
import { RectRegion } from "../../../structure/RectRegion";
import { chain, compose } from "../../../utils/functionalUtils";
import { getRootProperty } from "../../../utils/rootUtils";
import { isValueExist } from "../../../utils/stateUtils";
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
var _setBodyByScreenSize = function (screenSize) {
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
export var setScreen = function (canvas, setScreenData, DeviceManagerDataFromSystem, state) {
    return IO.of(requireCheckFunc(function () {
        it("should exist MainData.screenSize", function () {
            expect(getScreenSize(state)).exist;
        });
    }, function () {
        initCanvas(canvas).run();
        return compose(chain(setScreenData(DeviceManagerDataFromSystem, canvas, state)), chain(_getScreenData), _setBodyByScreenSize)(getScreenSize(state)).run();
    }));
};
export var clear = function (gl, color, DeviceManagerDataFromSystem) {
    _setClearColor(gl, color, DeviceManagerDataFromSystem);
    setColorWrite(gl, true, true, true, true, DeviceManagerDataFromSystem);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
};
var _setClearColor = function (gl, color, DeviceManagerDataFromSystem) {
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
export var initData = function (DeviceManagerDataFromSystem) {
    DeviceManagerDataFromSystem.gl = null;
    DeviceManagerDataFromSystem.clearColor = null;
    DeviceManagerDataFromSystem.writeRed = null;
    DeviceManagerDataFromSystem.writeGreen = null;
    DeviceManagerDataFromSystem.writeBlue = null;
    DeviceManagerDataFromSystem.writeAlpha = null;
};
//# sourceMappingURL=deviceManagerUtils.js.map