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
import { Component } from "../Component";
import { addTag as addTagSystemTag, removeTag as removeTagSystemTag, create, findGameObjectsByTag as findTagSystemTagGameObjectsByTag, getGameObject } from "./TagSystem";
import { TagData } from "./TagData";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { checkComponentShouldAlive } from "../ComponentSystem";
import { isValidMapValue } from "../../utils/objectUtils";
var Tag = (function (_super) {
    __extends(Tag, _super);
    function Tag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tag = __decorate([
        registerClass("Tag")
    ], Tag);
    return Tag;
}(Component));
export { Tag };
export var createTag = function (slotCount) {
    if (slotCount === void 0) { slotCount = 4; }
    return create(slotCount, TagData);
};
export var addTag = requireCheckFunc(function (component, tag) {
    _checkShouldAlive(component, TagData);
}, function (component, tag) {
    addTagSystemTag(component, tag, TagData);
});
export var removeTag = requireCheckFunc(function (component, tag) {
    _checkShouldAlive(component, TagData);
}, function (component, tag) {
    removeTagSystemTag(component, tag, TagData);
});
export var findGameObjectsByTag = function (tag) {
    return findTagSystemTagGameObjectsByTag(tag, TagData);
};
export var getTagGameObject = requireCheckFunc(function (component) {
    _checkShouldAlive(component, TagData);
}, function (component) {
    return getGameObject(component.index, TagData);
});
var _checkShouldAlive = function (tag, TagData) {
    checkComponentShouldAlive(tag, TagData, function (tag, TagData) {
        return isValidMapValue(TagData.indexMap[TagData.indexInTagArrayMap[tag.index]]);
    });
};
//# sourceMappingURL=Tag.js.map