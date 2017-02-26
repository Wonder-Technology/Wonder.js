"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var BasicState_1 = require("../state/BasicState");
var EDrawMode_1 = require("../EDrawMode");
var virtual_1 = require("../../definition/typescript/decorator/virtual");
var DeviceManager_1 = require("../../device/DeviceManager");
var BufferTable_1 = require("../../core/entityObject/scene/cache/BufferTable");
var GlUtils_1 = require("../GlUtils");
var RenderCommand = (function () {
    function RenderCommand() {
        this._webglState = null;
        this.drawMode = EDrawMode_1.EDrawMode.TRIANGLES;
    }
    Object.defineProperty(RenderCommand.prototype, "webglState", {
        get: function () {
            return this._webglState ? this._webglState : BasicState_1.BasicState.create();
        },
        set: function (webglState) {
            this._webglState = webglState;
        },
        enumerable: true,
        configurable: true
    });
    RenderCommand.prototype.init = function () {
    };
    RenderCommand.prototype.dispose = function () {
    };
    RenderCommand.prototype.drawElements = function (indexBuffer) {
        var startOffset = 0, gl = DeviceManager_1.DeviceManager.getInstance().gl;
        BufferTable_1.BufferTable.bindIndexBuffer(indexBuffer);
        GlUtils_1.GlUtils.drawElements(gl[this.drawMode], indexBuffer.count, gl[indexBuffer.type], indexBuffer.typeSize * startOffset);
    };
    RenderCommand.prototype.drawArray = function (vertexBuffer) {
        var startOffset = 0, gl = DeviceManager_1.DeviceManager.getInstance().gl;
        GlUtils_1.GlUtils.drawArrays(gl[this.drawMode], startOffset, vertexBuffer.count);
    };
    return RenderCommand;
}());
__decorate([
    virtual_1.virtual
], RenderCommand.prototype, "init", null);
__decorate([
    virtual_1.virtual
], RenderCommand.prototype, "dispose", null);
exports.RenderCommand = RenderCommand;
//# sourceMappingURL=RenderCommand.js.map