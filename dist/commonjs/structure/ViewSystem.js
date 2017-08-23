"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IO_1 = require("wonder-fantasy-land/dist/commonjs/types/IO");
var curry_1 = require("wonder-lodash/curry");
exports.getCanvas = function (state) {
    return state.getIn(["View", "dom"]);
};
exports.setCanvas = curry_1.default(function (dom, state) {
    return state.setIn(["View", "dom"], dom);
});
exports.getX = curry_1.default(function (dom) {
    return Number(dom.style.left.slice(0, -2));
});
exports.setX = curry_1.default(function (x, dom) {
    return IO_1.IO.of(function () {
        dom.style.left = x + "px";
        return dom;
    });
});
exports.getY = curry_1.default(function (dom) {
    return Number(dom.style.top.slice(0, -2));
});
exports.setY = curry_1.default(function (y, dom) {
    return IO_1.IO.of(function () {
        dom.style.top = y + "px";
        return dom;
    });
});
exports.getWidth = curry_1.default(function (dom) {
    return dom.clientWidth;
});
exports.setWidth = curry_1.default(function (width, dom) {
    return IO_1.IO.of(function () {
        dom.width = width;
        return dom;
    });
});
exports.getHeight = curry_1.default(function (dom) {
    return dom.clientHeight;
});
exports.setHeight = curry_1.default(function (height, dom) {
    return IO_1.IO.of(function () {
        dom.height = height;
        return dom;
    });
});
exports.getStyleWidth = curry_1.default(function (dom) {
    return dom.style.width;
});
exports.setStyleWidth = curry_1.default(function (width, dom) {
    return IO_1.IO.of(function () {
        dom.style.width = width;
        return dom;
    });
});
exports.getStyleHeight = curry_1.default(function (dom) {
    return dom.style.height;
});
exports.setStyleHeight = curry_1.default(function (height, dom) {
    return IO_1.IO.of(function () {
        dom.style.height = height;
        return dom;
    });
});
exports.initCanvas = function (dom) {
    return IO_1.IO.of(function () {
        dom.style.cssText = "position:absolute;left:0;top:0;";
        return dom;
    });
};
exports.getWebgl1Context = function (options, dom) {
    return exports.getOnlyWebgl1Context(options, dom);
};
exports.getWebgl2Context = function (options, dom) {
    return exports.getOnlyWebgl2Context(options, dom);
};
exports.getOnlyWebgl1Context = function (options, dom) {
    return dom.getContext("webgl", options) || dom.getContext("experimental-webgl", options);
};
exports.getOnlyWebgl2Context = function (options, dom) {
    return dom.getContext("webgl2", options);
};
//# sourceMappingURL=ViewSystem.js.map