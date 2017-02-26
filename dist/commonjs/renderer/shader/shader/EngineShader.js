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
Object.defineProperty(exports, "__esModule", { value: true });
var Shader_1 = require("./Shader");
var EngineShaderSourceBuilder_1 = require("../sourceBuilder/EngineShaderSourceBuilder");
var EngineShader = (function (_super) {
    __extends(EngineShader, _super);
    function EngineShader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EngineShader.prototype.buildDefinitionData = function (cmd, material) {
        this.libs.forEach(function (lib) {
            lib.setShaderDefinition(cmd, material);
        });
        this.sourceBuilder.clearShaderDefinition();
        this.sourceBuilder.build(this.libs);
        this.attributes = this.sourceBuilder.attributes;
        this.uniforms = this.sourceBuilder.uniforms;
        this.vsSource = this.sourceBuilder.vsSource;
        this.fsSource = this.sourceBuilder.fsSource;
    };
    EngineShader.prototype.createShaderSourceBuilder = function () {
        return EngineShaderSourceBuilder_1.EngineShaderSourceBuilder.create();
    };
    return EngineShader;
}(Shader_1.Shader));
exports.EngineShader = EngineShader;
//# sourceMappingURL=EngineShader.js.map