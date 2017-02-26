var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../definition/typescript/decorator/registerClass";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
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
        return Collection.create(renderList);
    };
    return RenderUtils;
}());
RenderUtils = __decorate([
    registerClass("RenderUtils")
], RenderUtils);
export { RenderUtils };
//# sourceMappingURL=RenderUtils.js.map