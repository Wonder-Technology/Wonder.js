import { getScreenSize } from "../core/MainSystem";
import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import { ensureFunc, it, requireCheckFunc } from "../definition/typescript/decorator/contract";
import { getContext, initCanvas, setX, setY, setStyleWidth, setStyleHeight, setWidth, setHeight, setCanvas, getCanvas } from "../structure/ViewSystem";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import curry from "wonder-lodash/curry";
import { expect } from "wonder-expect.js";
import { EScreenSize } from "./EScreenSize";
import { RectRegion } from "../structure/RectRegion";
import { chain, compose } from "../utils/functionalUtils";
import { DirectorData } from "../core/DirectorData";
import { getRootProperty } from "../utils/rootUtils";
import { isValueExist } from "../utils/stateUtils";
export var getGL = function (DeviceManagerData, state) {
    return DeviceManagerData.gl;
};
export var setGL = curry(function (gl, DeviceManagerData, state) {
    DeviceManagerData.gl = gl;
    return state;
});
export var setContextConfig = curry(function (contextConfig, state) {
    return state.setIn(["DeviceManager", "contextConfig"], contextConfig);
});
export var setPixelRatio = function (pixelRatio, state) {
    return state.setIn(["DeviceManager", "pixelRatio"], pixelRatio);
};
export var getViewport = function (state) {
    return state.getIn(["DeviceManager", "viewport"]);
};
export var setViewport = function (x, y, width, height, state) {
    return state.setIn(["DeviceManager", "viewport"], RectRegion.create(x, y, width, height));
};
var _getCanvas = function (DomQuery, domId) {
    if (domId !== "") {
        return DomQuery.create(_getCanvasId(domId)).get(0);
    }
    return DomQuery.create("<canvas></canvas>").prependTo("body").get(0);
};
var _getCanvasId = ensureFunc(function (id) {
    it("dom id should be #string", function () {
        expect(/#[^#]+/.test(id)).true;
    });
}, function (domId) {
    if (domId.indexOf('#') > -1) {
        return domId;
    }
    return "#" + domId;
});
export var setPixelRatioAndCanvas = curry(function (useDevicePixelRatio, state) {
    return IO.of(function () {
        if (!useDevicePixelRatio) {
            return state;
        }
        var pixelRatio = getRootProperty("devicePixelRatio").run(), dom = getCanvas(state);
        dom.width = Math.round(dom.width * pixelRatio);
        dom.height = Math.round(dom.height * pixelRatio);
        return setPixelRatio(pixelRatio, state);
    });
});
export var createGL = curry(function (canvasId, contextConfig, DeviceManagerData, state) {
    return IO.of(function () {
        var dom = _getCanvas(DomQuery, canvasId), gl = getContext(contextConfig, dom);
        if (!gl) {
            DomQuery.create("<p class='not-support-webgl'></p>").prependTo("body").text("Your device doesn't support WebGL");
        }
        return compose(setCanvas(dom), setContextConfig(contextConfig), setGL(gl, DeviceManagerData))(state);
    });
});
export var setViewportOfGL = curry(function (x, y, width, height, DeviceManagerData, state) {
    return IO.of(function () {
        var gl = getGL(DeviceManagerData, state), viewport = getViewport(state);
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
var _setScreenData = curry(function (DeviceManagerData, state, _a) {
    var x = _a.x, y = _a.y, width = _a.width, height = _a.height, styleWidth = _a.styleWidth, styleHeight = _a.styleHeight;
    return IO.of(function () {
        compose(chain(setStyleWidth(styleWidth)), chain(setStyleHeight(styleHeight)), chain(setHeight(height)), chain(setWidth(width)), chain(setY(y)), setX(x))(getCanvas(state)).run();
        return setViewportOfGL(0, 0, width, height, DeviceManagerData, state).run();
    });
});
export var setScreen = curry(function (DeviceManagerData, state) {
    return IO.of(requireCheckFunc(function (state) {
        it("should exist MainData.screenSize", function () {
            expect(getScreenSize(DirectorData.state)).exist;
        });
    }, function () {
        var dom = getCanvas(state);
        initCanvas(dom).run();
        return compose(chain(_setScreenData(DeviceManagerData, state)), chain(_getScreenData), _setBodyByScreenSize)(getScreenSize(state)).run();
    }));
});
export var clear = function (gl, color, DeviceManagerData) {
    _setClearColor(gl, color, DeviceManagerData);
    setColorWrite(gl, true, true, true, true, DeviceManagerData);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
};
var _setClearColor = function (gl, color, DeviceManagerData) {
    var clearColor = DeviceManagerData.clearColor;
    if (clearColor && clearColor.isEqual(color)) {
        return;
    }
    gl.clearColor(color.r, color.g, color.b, color.a);
    DeviceManagerData.clearColor = color;
};
export var setColorWrite = function (gl, writeRed, writeGreen, writeBlue, writeAlpha, DeviceManagerData) {
    if (DeviceManagerData.writeRed !== writeRed
        || DeviceManagerData.writeGreen !== writeGreen
        || DeviceManagerData.writeBlue !== writeBlue
        || DeviceManagerData.writeAlpha !== writeAlpha) {
        gl.colorMask(writeRed, writeGreen, writeBlue, writeAlpha);
        DeviceManagerData.writeRed = writeRed;
        DeviceManagerData.writeGreen = writeGreen;
        DeviceManagerData.writeBlue = writeBlue;
        DeviceManagerData.writeAlpha = writeAlpha;
    }
};
export var initData = function (DeviceManagerData) {
    DeviceManagerData.gl = null;
    DeviceManagerData.clearColor = null;
    DeviceManagerData.writeRed = null;
    DeviceManagerData.writeGreen = null;
    DeviceManagerData.writeBlue = null;
    DeviceManagerData.writeAlpha = null;
};
//# sourceMappingURL=DeviceManagerSystem.js.map