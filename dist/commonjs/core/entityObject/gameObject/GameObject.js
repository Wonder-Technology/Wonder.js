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
var registerClass_1 = require("../../../definition/typescript/decorator/registerClass");
var EntityObject_1 = require("../EntityObject");
var ThreeDTransform_1 = require("../../../component/transform/ThreeDTransform");
var clone_1 = require("../../../definition/typescript/decorator/clone");
var RenderUtils_1 = require("../../../utils/RenderUtils");
var GameObject = (function (_super) {
    __extends(GameObject, _super);
    function GameObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderGroup = 0;
        _this.renderPriority = 0;
        _this.isVisible = true;
        return _this;
    }
    GameObject.create = function () {
        var obj = new this();
        obj.initWhenCreate();
        return obj;
    };
    GameObject.prototype.initWhenCreate = function () {
        _super.prototype.initWhenCreate.call(this);
        this.name = "gameObject" + String(this.uid);
    };
    GameObject.prototype.createTransform = function () {
        return ThreeDTransform_1.ThreeDTransform.create();
    };
    GameObject.prototype.getRenderList = function () {
        return RenderUtils_1.RenderUtils.getGameObjectRenderList(this.getChildren());
    };
    return GameObject;
}(EntityObject_1.EntityObject));
__decorate([
    clone_1.cloneAttributeAsBasicType()
], GameObject.prototype, "renderGroup", void 0);
__decorate([
    clone_1.cloneAttributeAsBasicType()
], GameObject.prototype, "renderPriority", void 0);
__decorate([
    clone_1.cloneAttributeAsBasicType()
], GameObject.prototype, "isVisible", void 0);
GameObject = __decorate([
    registerClass_1.registerClass("GameObject")
], GameObject);
exports.GameObject = GameObject;
//# sourceMappingURL=GameObject.js.map