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
var Component_1 = require("../Component");
var TagSystem_1 = require("./TagSystem");
var TagData_1 = require("./TagData");
var contract_1 = require("../../definition/typescript/decorator/contract");
var Tag = (function (_super) {
    __extends(Tag, _super);
    function Tag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Tag;
}(Component_1.Component));
Tag = __decorate([
    registerClass_1.registerClass("Tag")
], Tag);
exports.Tag = Tag;
exports.createTag = function (slotCount) {
    if (slotCount === void 0) { slotCount = 4; }
    return TagSystem_1.create(slotCount, TagData_1.TagData);
};
exports.addTag = contract_1.requireCheckFunc(function (component, tag) {
    TagSystem_1.checkShouldAlive(component, TagData_1.TagData);
}, function (component, tag) {
    TagSystem_1.addTag(component, tag, TagData_1.TagData);
});
exports.removeTag = contract_1.requireCheckFunc(function (component, tag) {
    TagSystem_1.checkShouldAlive(component, TagData_1.TagData);
}, function (component, tag) {
    TagSystem_1.removeTag(component, tag, TagData_1.TagData);
});
exports.findGameObjectsByTag = function (tag) {
    return TagSystem_1.findGameObjectsByTag(tag, TagData_1.TagData);
};
exports.getTagGameObject = contract_1.requireCheckFunc(function (component) {
    TagSystem_1.checkShouldAlive(component, TagData_1.TagData);
}, function (component) {
    return TagSystem_1.getGameObject(component.index, TagData_1.TagData);
});
//# sourceMappingURL=Tag.js.map