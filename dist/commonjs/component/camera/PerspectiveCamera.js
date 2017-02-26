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
var registerClass_1 = require("../../definition/typescript/decorator/registerClass");
var Camera_1 = require("./Camera");
var clone_1 = require("../../definition/typescript/decorator/clone");
var PerspectiveCamera = (function (_super) {
    __extends(PerspectiveCamera, _super);
    function PerspectiveCamera() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._fovy = null;
        _this._aspect = null;
        return _this;
    }
    PerspectiveCamera.create = function () {
        var obj = new this();
        return obj;
    };
    Object.defineProperty(PerspectiveCamera.prototype, "fovy", {
        get: function () {
            return this._fovy;
        },
        set: function (fovy) {
            this._fovy = fovy;
            this.pMatrixDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerspectiveCamera.prototype, "aspect", {
        get: function () {
            return this._aspect;
        },
        set: function (aspect) {
            this._aspect = aspect;
            this.pMatrixDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    PerspectiveCamera.prototype.zoomIn = function (speed, min) {
        if (min === void 0) { min = 1; }
        this.fovy = Math.max(this.fovy - speed, min);
    };
    PerspectiveCamera.prototype.zoomOut = function (speed, max) {
        if (max === void 0) { max = 179; }
        this.fovy = Math.min(this.fovy + speed, max);
    };
    PerspectiveCamera.prototype.updateProjectionMatrix = function () {
        this.pMatrix.setPerspective(this._fovy, this._aspect, this.near, this.far);
    };
    return PerspectiveCamera;
}(Camera_1.Camera));
__decorate([
    clone_1.cloneAttributeAsBasicType()
], PerspectiveCamera.prototype, "fovy", null);
__decorate([
    clone_1.cloneAttributeAsBasicType()
], PerspectiveCamera.prototype, "aspect", null);
PerspectiveCamera = __decorate([
    registerClass_1.registerClass("PerspectiveCamera")
], PerspectiveCamera);
exports.PerspectiveCamera = PerspectiveCamera;
//# sourceMappingURL=PerspectiveCamera.js.map