var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../definition/typescript/decorator/registerClass";
import { Vector3 } from "../math/Vector3";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
import { cloneAttributeAsCloneable, cloneAttributeAsBasicType, cloneAttributeAsCustomType, CloneUtils } from "../definition/typescript/decorator/clone";
var Face3 = (function () {
    function Face3(aIndex, bIndex, cIndex, faceNormal, vertexNormals) {
        this._faceNormal = null;
        this.aIndex = null;
        this.bIndex = null;
        this.cIndex = null;
        this.vertexNormals = null;
        this.aIndex = aIndex;
        this.bIndex = bIndex;
        this.cIndex = cIndex;
        this._faceNormal = faceNormal;
        this.vertexNormals = vertexNormals;
    }
    Face3.create = function (aIndex, bIndex, cIndex, faceNormal, vertexNormals) {
        if (faceNormal === void 0) { faceNormal = null; }
        if (vertexNormals === void 0) { vertexNormals = Collection.create(); }
        var obj = new this(aIndex, bIndex, cIndex, faceNormal, vertexNormals);
        return obj;
    };
    Object.defineProperty(Face3.prototype, "faceNormal", {
        get: function () {
            return this._faceNormal !== null ? this._faceNormal : Vector3.create(0, 0, 0);
        },
        set: function (faceNormal) {
            this._faceNormal = faceNormal;
        },
        enumerable: true,
        configurable: true
    });
    Face3.prototype.clone = function () {
        return CloneUtils.clone(this);
    };
    Face3.prototype.hasFaceNormal = function () {
        return this._faceNormal !== null;
    };
    Face3.prototype.hasVertexNormal = function () {
        return this.vertexNormals.getCount() > 0;
    };
    return Face3;
}());
__decorate([
    cloneAttributeAsCloneable()
], Face3.prototype, "_faceNormal", void 0);
__decorate([
    cloneAttributeAsBasicType()
], Face3.prototype, "aIndex", void 0);
__decorate([
    cloneAttributeAsBasicType()
], Face3.prototype, "bIndex", void 0);
__decorate([
    cloneAttributeAsBasicType()
], Face3.prototype, "cIndex", void 0);
__decorate([
    cloneAttributeAsCustomType(function (source, target, memberName) {
        target[memberName] = source[memberName].clone(true);
    })
], Face3.prototype, "vertexNormals", void 0);
Face3 = __decorate([
    registerClass("Face3")
], Face3);
export { Face3 };
//# sourceMappingURL=Face3.js.map