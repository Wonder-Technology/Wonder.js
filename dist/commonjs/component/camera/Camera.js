"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var contract_1 = require("../../definition/typescript/decorator/contract");
var Log_1 = require("../../utils/Log");
var clone_1 = require("../../definition/typescript/decorator/clone");
var Matrix4_1 = require("../../math/Matrix4");
var virtual_1 = require("../../definition/typescript/decorator/virtual");
var Camera = (function () {
    function Camera() {
        this._worldToCameraMatrix = null;
        this._near = null;
        this._far = null;
        this._pMatrix = Matrix4_1.Matrix4.create();
        this.entityObject = null;
        this.pMatrixDirty = false;
        this._isUserSpecifyThePMatrix = false;
    }
    Object.defineProperty(Camera.prototype, "cameraToWorldMatrix", {
        get: function () {
            return this.entityObject.transform.localToWorldMatrix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "worldToCameraMatrix", {
        get: function () {
            if (this._worldToCameraMatrix) {
                return this._worldToCameraMatrix;
            }
            return this.cameraToWorldMatrix.clone().invert();
        },
        set: function (matrix) {
            this._worldToCameraMatrix = matrix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "near", {
        get: function () {
            return this._near;
        },
        set: function (near) {
            this._near = near;
            this.pMatrixDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "far", {
        get: function () {
            return this._far;
        },
        set: function (far) {
            this._far = far;
            this.pMatrixDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "pMatrix", {
        get: function () {
            return this._pMatrix;
        },
        set: function (pMatrix) {
            this._isUserSpecifyThePMatrix = true;
            this._pMatrix = pMatrix;
        },
        enumerable: true,
        configurable: true
    });
    Camera.prototype.init = function () {
        if (this.pMatrixDirty) {
            this._updateProjectionMatrix();
            this.pMatrixDirty = false;
        }
    };
    Camera.prototype.dispose = function () {
    };
    Camera.prototype.clone = function () {
        return clone_1.CloneUtils.clone(this);
    };
    Camera.prototype.update = function (elapsed) {
        if (this.pMatrixDirty) {
            this._updateProjectionMatrix();
            this.pMatrixDirty = false;
        }
    };
    Camera.prototype.getInvViewProjMat = function () {
        return this.pMatrix.clone().multiply(this.worldToCameraMatrix).invert();
    };
    Camera.prototype._updateProjectionMatrix = function () {
        if (this._isUserSpecifyThePMatrix) {
            return;
        }
        this.updateProjectionMatrix();
    };
    return Camera;
}());
__decorate([
    contract_1.requireGetter(function () {
        contract_1.assert(this.entityObject, Log_1.Log.info.FUNC_MUST_DEFINE("entityObject"));
    })
], Camera.prototype, "cameraToWorldMatrix", null);
__decorate([
    clone_1.cloneAttributeAsCloneable()
], Camera.prototype, "_worldToCameraMatrix", void 0);
__decorate([
    clone_1.cloneAttributeAsBasicType()
], Camera.prototype, "near", null);
__decorate([
    clone_1.cloneAttributeAsBasicType()
], Camera.prototype, "far", null);
__decorate([
    clone_1.cloneAttributeAsCloneable()
], Camera.prototype, "pMatrix", null);
__decorate([
    clone_1.cloneAttributeAsBasicType()
], Camera.prototype, "_isUserSpecifyThePMatrix", void 0);
__decorate([
    virtual_1.virtual
], Camera.prototype, "init", null);
__decorate([
    virtual_1.virtual
], Camera.prototype, "dispose", null);
exports.Camera = Camera;
//# sourceMappingURL=Camera.js.map