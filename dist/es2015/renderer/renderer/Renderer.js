var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BasicState } from "../state/BasicState";
import { virtual } from "../../definition/typescript/decorator/virtual";
var Renderer = (function () {
    function Renderer() {
        this._webglState = null;
    }
    Object.defineProperty(Renderer.prototype, "webglState", {
        get: function () {
            return this._webglState ? this._webglState : BasicState.create();
        },
        set: function (webglState) {
            this._webglState = webglState;
        },
        enumerable: true,
        configurable: true
    });
    Renderer.prototype.init = function () {
    };
    return Renderer;
}());
export { Renderer };
__decorate([
    virtual
], Renderer.prototype, "init", null);
//# sourceMappingURL=Renderer.js.map