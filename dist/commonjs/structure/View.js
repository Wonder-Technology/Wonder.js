"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ViewSystem_1 = require("./ViewSystem");
var registerClass_1 = require("../definition/typescript/decorator/registerClass");
var DirectorSystem_1 = require("../core/DirectorSystem");
var DirectorData_1 = require("../core/DirectorData");
var View = (function () {
    function View() {
    }
    View.create = function () {
        var obj = new this();
        return obj;
    };
    Object.defineProperty(View.prototype, "dom", {
        get: function () {
            return ViewSystem_1.getCanvas(DirectorSystem_1.getState(DirectorData_1.DirectorData));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "width", {
        get: function () {
            return ViewSystem_1.getWidth(this.dom);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "height", {
        get: function () {
            return ViewSystem_1.getHeight(this.dom);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "styleWidth", {
        get: function () {
            return ViewSystem_1.getStyleWidth(this.dom);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "styleHeight", {
        get: function () {
            return ViewSystem_1.getStyleHeight(this.dom);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "x", {
        get: function () {
            return ViewSystem_1.getX(this.dom);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "y", {
        get: function () {
            return ViewSystem_1.getY(this.dom);
        },
        enumerable: true,
        configurable: true
    });
    View = __decorate([
        registerClass_1.registerClass("View")
    ], View);
    return View;
}());
exports.View = View;
//# sourceMappingURL=View.js.map