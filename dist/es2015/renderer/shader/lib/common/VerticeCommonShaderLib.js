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
import { registerClass } from "../../../../definition/typescript/decorator/registerClass";
import { EngineShaderLib } from "../EngineShaderLib";
import { EBufferDataType } from "../../../buffer/EBufferDataType";
var VerticeCommonShaderLib = (function (_super) {
    __extends(VerticeCommonShaderLib, _super);
    function VerticeCommonShaderLib() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.vsChunk = null;
        _this.fsChunk = null;
        return _this;
    }
    VerticeCommonShaderLib.create = function () {
        var obj = new this();
        return obj;
    };
    VerticeCommonShaderLib.prototype.sendShaderVariables = function (program, cmd, material) {
        this._sendAttributeVariables(program, cmd);
    };
    VerticeCommonShaderLib.prototype.setShaderDefinition = function (cmd, material) {
        _super.prototype.setShaderDefinition.call(this, cmd, material);
        this.addAttributeVariable(["a_position"]);
    };
    VerticeCommonShaderLib.prototype._sendAttributeVariables = function (program, cmd) {
        var verticeBuffer = cmd.buffers.getChild(EBufferDataType.VERTICE);
        if (!verticeBuffer) {
            return;
        }
        this.sendAttributeBuffer(program, "a_position", verticeBuffer);
    };
    return VerticeCommonShaderLib;
}(EngineShaderLib));
VerticeCommonShaderLib = __decorate([
    registerClass("VerticeCommonShaderLib")
], VerticeCommonShaderLib);
export { VerticeCommonShaderLib };
//# sourceMappingURL=VerticeCommonShaderLib.js.map