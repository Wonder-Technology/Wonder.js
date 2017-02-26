"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var BasicState_1 = require("../state/BasicState");
var virtual_1 = require("../../definition/typescript/decorator/virtual");
var Renderer = (function () {
    function Renderer() {
        this._webglState = null;
    }
    Object.defineProperty(Renderer.prototype, "webglState", {
        get: function () {
            return this._webglState ? this._webglState : BasicState_1.BasicState.create();
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
__decorate([
    virtual_1.virtual
], Renderer.prototype, "init", null);
exports.Renderer = Renderer;
//# sourceMappingURL=Renderer.js.map