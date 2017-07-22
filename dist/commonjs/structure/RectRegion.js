"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../definition/typescript/decorator/registerClass");
var Vector4_1 = require("../math/Vector4");
var RectRegion = (function (_super) {
    __extends(RectRegion, _super);
    function RectRegion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RectRegion_1 = RectRegion;
    Object.defineProperty(RectRegion.prototype, "width", {
        get: function () {
            return this.z;
        },
        set: function (width) {
            this.z = width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectRegion.prototype, "height", {
        get: function () {
            return this.w;
        },
        set: function (height) {
            this.w = height;
        },
        enumerable: true,
        configurable: true
    });
    RectRegion.prototype.clone = function () {
        return this.copyHelper(RectRegion_1.create());
    };
    RectRegion.prototype.isNotEmpty = function () {
        return this.x !== 0
            || this.y !== 0
            || this.width !== 0
            || this.height !== 0;
    };
    RectRegion = RectRegion_1 = __decorate([
        registerClass_1.registerClass("RectRegion")
    ], RectRegion);
    return RectRegion;
    var RectRegion_1;
}(Vector4_1.Vector4));
exports.RectRegion = RectRegion;
//# sourceMappingURL=RectRegion.js.map