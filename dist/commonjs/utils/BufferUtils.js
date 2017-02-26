"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../definition/typescript/decorator/registerClass");
var contract_1 = require("../definition/typescript/decorator/contract");
var EVariableType_1 = require("../renderer/shader/variable/EVariableType");
var wonder_expect_js_1 = require("wonder-expect.js");
var JudgeUtils_1 = require("./JudgeUtils");
var ArrayBuffer_1 = require("../renderer/buffer/ArrayBuffer");
var EBufferType_1 = require("../renderer/buffer/EBufferType");
var Log_1 = require("./Log");
var BufferUtils = (function () {
    function BufferUtils() {
    }
    BufferUtils.convertArrayToArrayBuffer = function (type, value) {
        var size = this._getBufferSize(type);
        return ArrayBuffer_1.ArrayBuffer.create(value, size, EBufferType_1.EBufferType.FLOAT);
    };
    BufferUtils._getBufferSize = function (type) {
        var size = null;
        switch (type) {
            case EVariableType_1.EVariableType.FLOAT_1:
            case EVariableType_1.EVariableType.NUMBER_1:
                size = 1;
                break;
            case EVariableType_1.EVariableType.FLOAT_2:
                size = 2;
                break;
            case EVariableType_1.EVariableType.FLOAT_3:
                size = 3;
                break;
            case EVariableType_1.EVariableType.FLOAT_4:
                size = 4;
                break;
            default:
                Log_1.Log.error(true, Log_1.Log.info.FUNC_UNEXPECT("EVariableType", type));
                break;
        }
        return size;
    };
    return BufferUtils;
}());
__decorate([
    contract_1.requireCheck(function (type, value) {
        contract_1.it("value:" + value + " should be array", function () {
            wonder_expect_js_1.default(JudgeUtils_1.JudgeUtils.isArrayExactly(value)).true;
        });
    })
], BufferUtils, "convertArrayToArrayBuffer", null);
BufferUtils = __decorate([
    registerClass_1.registerClass("BufferUtils")
], BufferUtils);
exports.BufferUtils = BufferUtils;
//# sourceMappingURL=BufferUtils.js.map