"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../definition/typescript/decorator/registerClass");
var Collection_1 = require("wonder-commonlib/dist/commonjs/Collection");
var RenderUtils = (function () {
    function RenderUtils() {
    }
    RenderUtils.getGameObjectRenderList = function (sourceList) {
        var renderList = [];
        sourceList.forEach(function (child) {
            var activeGameObject = null;
            activeGameObject = child;
            if (activeGameObject.isVisible) {
                renderList.push(activeGameObject);
            }
        });
        return Collection_1.Collection.create(renderList);
    };
    return RenderUtils;
}());
RenderUtils = __decorate([
    registerClass_1.registerClass("RenderUtils")
], RenderUtils);
exports.RenderUtils = RenderUtils;
//# sourceMappingURL=RenderUtils.js.map