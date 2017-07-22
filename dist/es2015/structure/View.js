var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { getCanvas, getHeight, getStyleHeight, getStyleWidth, getWidth, getX, getY } from "./ViewSystem";
import { registerClass } from "../definition/typescript/decorator/registerClass";
import { getState } from "../core/DirectorSystem";
import { DirectorData } from "../core/DirectorData";
var View = (function () {
    function View() {
    }
    View.create = function () {
        var obj = new this();
        return obj;
    };
    Object.defineProperty(View.prototype, "dom", {
        get: function () {
            return getCanvas(getState(DirectorData));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "width", {
        get: function () {
            return getWidth(this.dom);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "height", {
        get: function () {
            return getHeight(this.dom);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "styleWidth", {
        get: function () {
            return getStyleWidth(this.dom);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "styleHeight", {
        get: function () {
            return getStyleHeight(this.dom);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "x", {
        get: function () {
            return getX(this.dom);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "y", {
        get: function () {
            return getY(this.dom);
        },
        enumerable: true,
        configurable: true
    });
    View = __decorate([
        registerClass("View")
    ], View);
    return View;
}());
export { View };
//# sourceMappingURL=View.js.map