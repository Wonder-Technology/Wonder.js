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
import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { ThreeDTransformData } from "./ThreeDTransformData";
import { checkShouldAlive, create, getGameObject, getLocalPosition, getLocalToWorldMatrix, getPosition, getTempLocalToWorldMatrix, setBatchDatas, setLocalPosition, setParent, setPosition } from "./ThreeDTransformSystem";
import { getParent } from "./ThreeDTransformSystem";
import { GlobalTempData } from "../../definition/GlobalTempData";
import { Component } from "../Component";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
var ThreeDTransform = (function (_super) {
    __extends(ThreeDTransform, _super);
    function ThreeDTransform() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.uid = null;
        return _this;
    }
    ThreeDTransform = __decorate([
        registerClass("ThreeDTransform")
    ], ThreeDTransform);
    return ThreeDTransform;
}(Component));
export { ThreeDTransform };
export var createThreeDTransform = function () {
    return create(ThreeDTransformData);
};
export var getThreeDTransformPosition = requireCheckFunc(function (component) {
    checkShouldAlive(component, ThreeDTransformData);
}, function (component) {
    return getPosition(component, ThreeDTransformData);
});
export var setThreeDTransformPosition = requireCheckFunc(function (component, position) {
    checkShouldAlive(component, ThreeDTransformData);
}, function (component, position) {
    setPosition(component, position, GlobalTempData, ThreeDTransformData);
});
export var getThreeDTransformLocalToWorldMatrix = requireCheckFunc(function (component) {
    checkShouldAlive(component, ThreeDTransformData);
}, function (component) {
    return getLocalToWorldMatrix(component, getTempLocalToWorldMatrix(component, ThreeDTransformData), ThreeDTransformData);
});
export var getThreeDTransformLocalPosition = requireCheckFunc(function (component) {
    checkShouldAlive(component, ThreeDTransformData);
}, function (component) {
    return getLocalPosition(component, ThreeDTransformData);
});
export var setThreeDTransformLocalPosition = requireCheckFunc(function (component, localPosition) {
    checkShouldAlive(component, ThreeDTransformData);
}, function (component, localPosition) {
    setLocalPosition(component, localPosition, ThreeDTransformData);
});
export var setThreeDTransformBatchTransformDatas = function (batchData) {
    setBatchDatas(batchData, GlobalTempData, ThreeDTransformData);
};
export var getThreeDTransformParent = requireCheckFunc(function (component) {
    checkShouldAlive(component, ThreeDTransformData);
}, function (component) {
    return getParent(component, ThreeDTransformData);
});
export var setThreeDTransformParent = requireCheckFunc(function (component, parent) {
    checkShouldAlive(component, ThreeDTransformData);
}, function (component, parent) {
    setParent(component, parent, ThreeDTransformData);
});
export var getThreeDTransformGameObject = requireCheckFunc(function (component) {
    checkShouldAlive(component, ThreeDTransformData);
}, function (component) {
    return getGameObject(component.uid, ThreeDTransformData);
});
//# sourceMappingURL=ThreeDTransform.js.map