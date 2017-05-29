"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MainSystem_1 = require("../core/MainSystem");
var DomQuery_1 = require("wonder-commonlib/dist/commonjs/utils/DomQuery");
var contract_1 = require("../definition/typescript/decorator/contract");
var ViewSystem_1 = require("../structure/ViewSystem");
var IO_1 = require("wonder-fantasy-land/dist/commonjs/types/IO");
var curry_1 = require("wonder-lodash/curry");
var wonder_expect_js_1 = require("wonder-expect.js");
var EScreenSize_1 = require("./EScreenSize");
var RectRegion_1 = require("../structure/RectRegion");
var functionalUtils_1 = require("../utils/functionalUtils");
var DirectorData_1 = require("../core/DirectorData");
var rootUtils_1 = require("../utils/rootUtils");
var stateUtils_1 = require("../utils/stateUtils");
exports.getGL = function (DeviceManagerData, state) {
    return DeviceManagerData.gl;
};
exports.setGL = curry_1.default(function (gl, DeviceManagerData, state) {
    DeviceManagerData.gl = gl;
    return state;
});
exports.setContextConfig = curry_1.default(function (contextConfig, state) {
    return state.setIn(["DeviceManager", "contextConfig"], contextConfig);
});
exports.setPixelRatio = function (pixelRatio, state) {
    return state.setIn(["DeviceManager", "pixelRatio"], pixelRatio);
};
exports.getViewport = function (state) {
    return state.getIn(["DeviceManager", "viewport"]);
};
exports.setViewport = function (x, y, width, height, state) {
    return state.setIn(["DeviceManager", "viewport"], RectRegion_1.RectRegion.create(x, y, width, height));
};
var _getCanvas = function (DomQuery, domId) {
    if (domId !== "") {
        return DomQuery.create(_getCanvasId(domId)).get(0);
    }
    return DomQuery.create("<canvas></canvas>").prependTo("body").get(0);
};
var _getCanvasId = contract_1.ensureFunc(function (id) {
    contract_1.it("dom id should be #string", function () {
        wonder_expect_js_1.expect(/#[^#]+/.test(id)).true;
    });
}, function (domId) {
    if (domId.indexOf('#') > -1) {
        return domId;
    }
    return "#" + domId;
});
exports.setPixelRatioAndCanvas = curry_1.default(function (useDevicePixelRatio, state) {
    return IO_1.IO.of(function () {
        if (!useDevicePixelRatio) {
            return state;
        }
        var pixelRatio = rootUtils_1.getRootProperty("devicePixelRatio").run(), dom = ViewSystem_1.getCanvas(state);
        dom.width = Math.round(dom.width * pixelRatio);
        dom.height = Math.round(dom.height * pixelRatio);
        return exports.setPixelRatio(pixelRatio, state);
    });
});
exports.createGL = curry_1.default(function (canvasId, contextConfig, DeviceManagerData, state) {
    return IO_1.IO.of(function () {
        var dom = _getCanvas(DomQuery_1.DomQuery, canvasId), gl = ViewSystem_1.getContext(contextConfig, dom);
        if (!gl) {
            DomQuery_1.DomQuery.create("<p class='not-support-webgl'></p>").prependTo("body").text("Your device doesn't support WebGL");
        }
        return functionalUtils_1.compose(ViewSystem_1.setCanvas(dom), exports.setContextConfig(contextConfig), exports.setGL(gl, DeviceManagerData))(state);
    });
});
exports.setViewportOfGL = curry_1.default(function (x, y, width, height, DeviceManagerData, state) {
    return IO_1.IO.of(function () {
        var gl = exports.getGL(DeviceManagerData, state), viewport = exports.getViewport(state);
        if (stateUtils_1.isValueExist(viewport) && viewport.x === x && viewport.y === y && viewport.width === width && viewport.height === height) {
            return state;
        }
        gl.viewport(x, y, width, height);
        return exports.setViewport(x, y, width, height, state);
    });
});
var _setBodyByScreenSize = function (screenSize) {
    return IO_1.IO.of(function () {
        if (screenSize === EScreenSize_1.EScreenSize.FULL) {
            DomQuery_1.DomQuery.create("body").css("margin", "0");
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
var _setScreenData = curry_1.default(function (DeviceManagerData, state, _a) {
    var x = _a.x, y = _a.y, width = _a.width, height = _a.height, styleWidth = _a.styleWidth, styleHeight = _a.styleHeight;
    return IO_1.IO.of(function () {
        functionalUtils_1.compose(functionalUtils_1.chain(ViewSystem_1.setStyleWidth(styleWidth)), functionalUtils_1.chain(ViewSystem_1.setStyleHeight(styleHeight)), functionalUtils_1.chain(ViewSystem_1.setHeight(height)), functionalUtils_1.chain(ViewSystem_1.setWidth(width)), functionalUtils_1.chain(ViewSystem_1.setY(y)), ViewSystem_1.setX(x))(ViewSystem_1.getCanvas(state)).run();
        return exports.setViewportOfGL(0, 0, width, height, DeviceManagerData, state).run();
    });
});
exports.setScreen = curry_1.default(function (DeviceManagerData, state) {
    return IO_1.IO.of(contract_1.requireCheckFunc(function (state) {
        contract_1.it("should exist MainData.screenSize", function () {
            wonder_expect_js_1.expect(MainSystem_1.getScreenSize(DirectorData_1.DirectorData.state)).exist;
        });
    }, function () {
        var dom = ViewSystem_1.getCanvas(state);
        ViewSystem_1.initCanvas(dom).run();
        return functionalUtils_1.compose(functionalUtils_1.chain(_setScreenData(DeviceManagerData, state)), functionalUtils_1.chain(_getScreenData), _setBodyByScreenSize)(MainSystem_1.getScreenSize(state)).run();
    }));
});
exports.clear = function (gl, color, DeviceManagerData) {
    _setClearColor(gl, color, DeviceManagerData);
    exports.setColorWrite(gl, true, true, true, true, DeviceManagerData);
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
exports.setColorWrite = function (gl, writeRed, writeGreen, writeBlue, writeAlpha, DeviceManagerData) {
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
exports.initData = function (DeviceManagerData) {
    DeviceManagerData.gl = null;
    DeviceManagerData.clearColor = null;
    DeviceManagerData.writeRed = null;
    DeviceManagerData.writeGreen = null;
    DeviceManagerData.writeBlue = null;
    DeviceManagerData.writeAlpha = null;
};
//# sourceMappingURL=DeviceManagerSystem.js.map