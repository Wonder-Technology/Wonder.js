var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BasicState } from "../state/BasicState";
import { EDrawMode } from "../EDrawMode";
import { virtual } from "../../definition/typescript/decorator/virtual";
import { DeviceManager } from "../../device/DeviceManager";
import { BufferTable } from "../../core/entityObject/scene/cache/BufferTable";
import { GlUtils } from "../GlUtils";
var RenderCommand = (function () {
    function RenderCommand() {
        this._webglState = null;
        this.drawMode = EDrawMode.TRIANGLES;
    }
    Object.defineProperty(RenderCommand.prototype, "webglState", {
        get: function () {
            return this._webglState ? this._webglState : BasicState.create();
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
        var startOffset = 0, gl = DeviceManager.getInstance().gl;
        BufferTable.bindIndexBuffer(indexBuffer);
        GlUtils.drawElements(gl[this.drawMode], indexBuffer.count, gl[indexBuffer.type], indexBuffer.typeSize * startOffset);
    };
    RenderCommand.prototype.drawArray = function (vertexBuffer) {
        var startOffset = 0, gl = DeviceManager.getInstance().gl;
        GlUtils.drawArrays(gl[this.drawMode], startOffset, vertexBuffer.count);
    };
    return RenderCommand;
}());
export { RenderCommand };
__decorate([
    virtual
], RenderCommand.prototype, "init", null);
__decorate([
    virtual
], RenderCommand.prototype, "dispose", null);
//# sourceMappingURL=RenderCommand.js.map