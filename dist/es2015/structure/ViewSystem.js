import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import curry from "wonder-lodash/curry";
export var getCanvas = function (state) {
    return state.getIn(["View", "dom"]);
};
export var setCanvas = curry(function (dom, state) {
    return state.setIn(["View", "dom"], dom);
});
export var getX = curry(function (dom) {
    return Number(dom.style.left.slice(0, -2));
});
export var setX = curry(function (x, dom) {
    return IO.of(function () {
        dom.style.left = x + "px";
        return dom;
    });
});
export var getY = curry(function (dom) {
    return Number(dom.style.top.slice(0, -2));
});
export var setY = curry(function (y, dom) {
    return IO.of(function () {
        dom.style.top = y + "px";
        return dom;
    });
});
export var getWidth = curry(function (dom) {
    return dom.clientWidth;
});
export var setWidth = curry(function (width, dom) {
    return IO.of(function () {
        dom.width = width;
        return dom;
    });
});
export var getHeight = curry(function (dom) {
    return dom.clientHeight;
});
export var setHeight = curry(function (height, dom) {
    return IO.of(function () {
        dom.height = height;
        return dom;
    });
});
export var getStyleWidth = curry(function (dom) {
    return dom.style.width;
});
export var setStyleWidth = curry(function (width, dom) {
    return IO.of(function () {
        dom.style.width = width;
        return dom;
    });
});
export var getStyleHeight = curry(function (dom) {
    return dom.style.height;
});
export var setStyleHeight = curry(function (height, dom) {
    return IO.of(function () {
        dom.style.height = height;
        return dom;
    });
});
export var initCanvas = function (dom) {
    return IO.of(function () {
        dom.style.cssText = "position:absolute;left:0;top:0;";
        return dom;
    });
};
export var getWebgl1Context = function (options, dom) {
    return getOnlyWebgl1Context(options, dom);
};
export var getWebgl2Context = function (options, dom) {
    return getOnlyWebgl2Context(options, dom);
};
export var getOnlyWebgl1Context = function (options, dom) {
    return dom.getContext("webgl", options) || dom.getContext("experimental-webgl", options);
};
export var getOnlyWebgl2Context = function (options, dom) {
    return dom.getContext("webgl2", options);
};
//# sourceMappingURL=ViewSystem.js.map