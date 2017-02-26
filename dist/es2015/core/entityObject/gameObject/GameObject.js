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
import { registerClass } from "../../../definition/typescript/decorator/registerClass";
import { EntityObject } from "../EntityObject";
import { ThreeDTransform } from "../../../component/transform/ThreeDTransform";
import { cloneAttributeAsBasicType } from "../../../definition/typescript/decorator/clone";
import { RenderUtils } from "../../../utils/RenderUtils";
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
        return ThreeDTransform.create();
    };
    GameObject.prototype.getRenderList = function () {
        return RenderUtils.getGameObjectRenderList(this.getChildren());
    };
    return GameObject;
}(EntityObject));
__decorate([
    cloneAttributeAsBasicType()
], GameObject.prototype, "renderGroup", void 0);
__decorate([
    cloneAttributeAsBasicType()
], GameObject.prototype, "renderPriority", void 0);
__decorate([
    cloneAttributeAsBasicType()
], GameObject.prototype, "isVisible", void 0);
GameObject = __decorate([
    registerClass("GameObject")
], GameObject);
export { GameObject };
//# sourceMappingURL=GameObject.js.map