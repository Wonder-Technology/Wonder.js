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
var ThreeDTransformData_1 = require("./ThreeDTransformData");
var ThreeDTransformSystem_1 = require("./ThreeDTransformSystem");
var ThreeDTransformSystem_2 = require("./ThreeDTransformSystem");
var GlobalTempData_1 = require("../../definition/GlobalTempData");
var Component_1 = require("../Component");
var contract_1 = require("../../definition/typescript/decorator/contract");
var ThreeDTransform = (function (_super) {
    __extends(ThreeDTransform, _super);
    function ThreeDTransform() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.uid = null;
        return _this;
    }
    ThreeDTransform = __decorate([
        registerClass_1.registerClass("ThreeDTransform")
    ], ThreeDTransform);
    return ThreeDTransform;
}(Component_1.Component));
exports.ThreeDTransform = ThreeDTransform;
exports.createThreeDTransform = function () {
    return ThreeDTransformSystem_1.create(ThreeDTransformData_1.ThreeDTransformData);
};
exports.getThreeDTransformPosition = contract_1.requireCheckFunc(function (component) {
    ThreeDTransformSystem_1.checkShouldAlive(component, ThreeDTransformData_1.ThreeDTransformData);
}, function (component) {
    return ThreeDTransformSystem_1.getPosition(component, ThreeDTransformData_1.ThreeDTransformData);
});
exports.setThreeDTransformPosition = contract_1.requireCheckFunc(function (component, position) {
    ThreeDTransformSystem_1.checkShouldAlive(component, ThreeDTransformData_1.ThreeDTransformData);
}, function (component, position) {
    ThreeDTransformSystem_1.setPosition(component, position, GlobalTempData_1.GlobalTempData, ThreeDTransformData_1.ThreeDTransformData);
});
exports.getThreeDTransformLocalToWorldMatrix = contract_1.requireCheckFunc(function (component) {
    ThreeDTransformSystem_1.checkShouldAlive(component, ThreeDTransformData_1.ThreeDTransformData);
}, function (component) {
    return ThreeDTransformSystem_1.getLocalToWorldMatrix(component, ThreeDTransformSystem_1.getTempLocalToWorldMatrix(component, ThreeDTransformData_1.ThreeDTransformData), ThreeDTransformData_1.ThreeDTransformData);
});
exports.getThreeDTransformLocalPosition = contract_1.requireCheckFunc(function (component) {
    ThreeDTransformSystem_1.checkShouldAlive(component, ThreeDTransformData_1.ThreeDTransformData);
}, function (component) {
    return ThreeDTransformSystem_1.getLocalPosition(component, ThreeDTransformData_1.ThreeDTransformData);
});
exports.setThreeDTransformLocalPosition = contract_1.requireCheckFunc(function (component, localPosition) {
    ThreeDTransformSystem_1.checkShouldAlive(component, ThreeDTransformData_1.ThreeDTransformData);
}, function (component, localPosition) {
    ThreeDTransformSystem_1.setLocalPosition(component, localPosition, ThreeDTransformData_1.ThreeDTransformData);
});
exports.setThreeDTransformBatchTransformDatas = function (batchData) {
    ThreeDTransformSystem_1.setBatchDatas(batchData, GlobalTempData_1.GlobalTempData, ThreeDTransformData_1.ThreeDTransformData);
};
exports.getThreeDTransformParent = contract_1.requireCheckFunc(function (component) {
    ThreeDTransformSystem_1.checkShouldAlive(component, ThreeDTransformData_1.ThreeDTransformData);
}, function (component) {
    return ThreeDTransformSystem_2.getParent(component, ThreeDTransformData_1.ThreeDTransformData);
});
exports.setThreeDTransformParent = contract_1.requireCheckFunc(function (component, parent) {
    ThreeDTransformSystem_1.checkShouldAlive(component, ThreeDTransformData_1.ThreeDTransformData);
}, function (component, parent) {
    ThreeDTransformSystem_1.setParent(component, parent, ThreeDTransformData_1.ThreeDTransformData);
});
exports.getThreeDTransformGameObject = contract_1.requireCheckFunc(function (component) {
    ThreeDTransformSystem_1.checkShouldAlive(component, ThreeDTransformData_1.ThreeDTransformData);
}, function (component) {
    return ThreeDTransformSystem_1.getGameObject(component.uid, ThreeDTransformData_1.ThreeDTransformData);
});
//# sourceMappingURL=ThreeDTransform.js.map