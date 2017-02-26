"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Hash_1 = require("wonder-commonlib/dist/commonjs/Hash");
var contract_1 = require("../../../definition/typescript/decorator/contract");
var JudgeUtils_1 = require("../../../utils/JudgeUtils");
var Log_1 = require("../../../utils/Log");
var EVariableCategory_1 = require("../variable/EVariableCategory");
var BufferUtils_1 = require("../../../utils/BufferUtils");
var ShaderSourceBuilder = (function () {
    function ShaderSourceBuilder() {
        this.attributes = Hash_1.Hash.create();
        this.uniforms = Hash_1.Hash.create();
        this.vsSource = null;
        this.fsSource = null;
    }
    ShaderSourceBuilder.prototype.dispose = function () {
        this.clearShaderDefinition();
    };
    ShaderSourceBuilder.prototype.convertAttributesData = function () {
        this.attributes
            .filter(function (data) {
            return data.value !== EVariableCategory_1.EVariableCategory.ENGINE && JudgeUtils_1.JudgeUtils.isArrayExactly(data.value);
        })
            .forEach(function (data, key) {
            data.value = BufferUtils_1.BufferUtils.convertArrayToArrayBuffer(data.type, data.value);
        });
    };
    return ShaderSourceBuilder;
}());
__decorate([
    contract_1.requireCheck(function () {
        this.attributes.forEach(function (data) {
            contract_1.assert(!JudgeUtils_1.JudgeUtils.isFloatArray(data.value), Log_1.Log.info.FUNC_SHOULD_NOT("attribute->value", "be Float array"));
        });
    })
], ShaderSourceBuilder.prototype, "convertAttributesData", null);
exports.ShaderSourceBuilder = ShaderSourceBuilder;
//# sourceMappingURL=ShaderSourceBuilder.js.map