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
import { Entity } from "./Entity";
import { virtual } from "../definition/typescript/decorator/virtual";
import { CloneUtils } from "../definition/typescript/decorator/clone";
var Component = (function (_super) {
    __extends(Component, _super);
    function Component() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.entityObject = null;
        return _this;
    }
    Object.defineProperty(Component.prototype, "transform", {
        get: function () {
            if (!this.entityObject) {
                return null;
            }
            return this.entityObject.transform;
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.init = function () {
    };
    Component.prototype.dispose = function () {
    };
    Component.prototype.clone = function () {
        return CloneUtils.clone(this);
    };
    Component.prototype.addToObject = function (entityObject, isShareComponent) {
        if (isShareComponent === void 0) { isShareComponent = false; }
        if (isShareComponent) {
            return;
        }
        if (this.entityObject) {
            this.entityObject.removeComponent(this);
        }
        this.entityObject = entityObject;
        this.addToComponentContainer();
    };
    Component.prototype.addToComponentContainer = function () {
    };
    Component.prototype.removeFromObject = function (entityObject) {
        this.removeFromComponentContainer();
    };
    Component.prototype.removeFromComponentContainer = function () {
    };
    return Component;
}(Entity));
export { Component };
__decorate([
    virtual
], Component.prototype, "init", null);
__decorate([
    virtual
], Component.prototype, "dispose", null);
__decorate([
    virtual
], Component.prototype, "clone", null);
__decorate([
    virtual
], Component.prototype, "addToObject", null);
__decorate([
    virtual
], Component.prototype, "addToComponentContainer", null);
__decorate([
    virtual
], Component.prototype, "removeFromObject", null);
__decorate([
    virtual
], Component.prototype, "removeFromComponentContainer", null);
//# sourceMappingURL=Component.js.map