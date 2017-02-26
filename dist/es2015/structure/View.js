var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../definition/typescript/decorator/registerClass";
var ViewWebGL = (function () {
    function ViewWebGL(dom) {
        this._dom = null;
        this._dom = dom;
    }
    ViewWebGL.create = function (view) {
        var obj = new this(view);
        return obj;
    };
    Object.defineProperty(ViewWebGL.prototype, "offset", {
        get: function () {
            var view = this._dom, offset = { x: view.offsetLeft, y: view.offsetTop };
            while (view = view.offsetParent) {
                offset.x += view.offsetLeft;
                offset.y += view.offsetTop;
            }
            return offset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewWebGL.prototype, "dom", {
        get: function () {
            return this._dom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewWebGL.prototype, "width", {
        get: function () {
            return this._dom.clientWidth;
        },
        set: function (width) {
            this._dom.width = width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewWebGL.prototype, "height", {
        get: function () {
            return this._dom.clientHeight;
        },
        set: function (height) {
            this._dom.height = height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewWebGL.prototype, "styleWidth", {
        get: function () {
            return this._dom.style.width;
        },
        set: function (styleWidth) {
            this._dom.style.width = styleWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewWebGL.prototype, "styleHeight", {
        get: function () {
            return this._dom.style.height;
        },
        set: function (styleHeight) {
            this._dom.style.height = styleHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewWebGL.prototype, "x", {
        get: function () {
            return Number(this._dom.style.left.slice(0, -2));
        },
        set: function (x) {
            this._dom.style.left = x + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewWebGL.prototype, "y", {
        get: function () {
            return Number(this._dom.style.top.slice(0, -2));
        },
        set: function (y) {
            this._dom.style.top = y + "px";
        },
        enumerable: true,
        configurable: true
    });
    ViewWebGL.prototype.initCanvas = function () {
        this._dom.style.cssText = "position:absolute;left:0;top:0;";
    };
    ViewWebGL.prototype.getContext = function (contextConfig) {
        return this._dom.getContext("webgl", contextConfig.options) || this._dom.getContext("experimental-webgl", contextConfig.options);
    };
    return ViewWebGL;
}());
ViewWebGL = __decorate([
    registerClass("ViewWebGL")
], ViewWebGL);
export { ViewWebGL };
//# sourceMappingURL=View.js.map