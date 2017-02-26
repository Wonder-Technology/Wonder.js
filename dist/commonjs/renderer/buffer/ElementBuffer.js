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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../../definition/typescript/decorator/registerClass");
var CommonBuffer_1 = require("./CommonBuffer");
var EBufferType_1 = require("./EBufferType");
var EBufferUsage_1 = require("./EBufferUsage");
var contract_1 = require("../../definition/typescript/decorator/contract");
var Log_1 = require("../../utils/Log");
var DeviceManager_1 = require("../../device/DeviceManager");
var BufferTable_1 = require("../../core/entityObject/scene/cache/BufferTable");
var GPUDetector_1 = require("../../device/GPUDetector");
var ElementBuffer = (function (_super) {
    __extends(ElementBuffer, _super);
    function ElementBuffer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = null;
        return _this;
    }
    ElementBuffer.create = function (data, type, usage) {
        if (type === void 0) { type = null; }
        if (usage === void 0) { usage = EBufferUsage_1.EBufferUsage.STATIC_DRAW; }
        var obj = new this();
        obj.initWhenCreate(data, type, usage);
        return obj;
    };
    Object.defineProperty(ElementBuffer.prototype, "typeSize", {
        get: function () {
            return this.data.BYTES_PER_ELEMENT;
        },
        enumerable: true,
        configurable: true
    });
    ElementBuffer.prototype.initWhenCreate = function (data, type, usage) {
        var gl = DeviceManager_1.DeviceManager.getInstance().gl, isNeed32Bits = null, typedData = null;
        this.buffer = gl.createBuffer();
        if (!this.buffer) {
            Log_1.Log.warn('Failed to create the this.buffer object');
            return null;
        }
        if (!data) {
            return null;
        }
        isNeed32Bits = this._checkIsNeed32Bits(data, type);
        typedData = this._convertToTypedArray(isNeed32Bits, data);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, typedData, gl[usage]);
        BufferTable_1.BufferTable.resetBindedElementBuffer();
        this._saveData(typedData, this._getType(isNeed32Bits, type), usage);
        return this.buffer;
    };
    ElementBuffer.prototype.resetData = function (data, type, offset) {
        if (type === void 0) { type = null; }
        if (offset === void 0) { offset = 0; }
        var gl = DeviceManager_1.DeviceManager.getInstance().gl, isNeed32Bits = this._checkIsNeed32Bits(data, type), typedData = this._convertToTypedArray(isNeed32Bits, data);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
        this.resetBufferData("ELEMENT_ARRAY_BUFFER", typedData, offset);
        this._saveData(typedData, this._getType(isNeed32Bits, type), EBufferUsage_1.EBufferUsage.DYNAMIC_DRAW);
        return this;
    };
    ElementBuffer.prototype._convertToTypedArray = function (isNeed32Bits, data) {
        return isNeed32Bits ? new Uint32Array(data) : new Uint16Array(data);
    };
    ElementBuffer.prototype._checkIsNeed32Bits = function (indices, type) {
        var isNeed32Bits = false;
        if (type !== null) {
            if (type === EBufferType_1.EBufferType.UNSIGNED_INT) {
                return true;
            }
            return false;
        }
        if (GPUDetector_1.GPUDetector.getInstance().extensionUintIndices) {
            for (var _i = 0, indices_1 = indices; _i < indices_1.length; _i++) {
                var indice = indices_1[_i];
                if (indice > 65535) {
                    isNeed32Bits = true;
                    break;
                }
            }
        }
        else {
            isNeed32Bits = false;
        }
        return isNeed32Bits;
    };
    ElementBuffer.prototype._getType = function (isNeed32Bits, type) {
        return type === null ? (isNeed32Bits ? EBufferType_1.EBufferType.UNSIGNED_INT : EBufferType_1.EBufferType.UNSIGNED_SHORT) : type;
    };
    ElementBuffer.prototype._saveData = function (data, type, usage) {
        this.type = type;
        this.count = data.length;
        this.data = data;
        this.usage = usage;
    };
    return ElementBuffer;
}(CommonBuffer_1.CommonBuffer));
__decorate([
    contract_1.ensureGetter(function (typeSize) {
        contract_1.assert(typeSize > 0, Log_1.Log.info.FUNC_SHOULD("typeSize", "> 0, but actual is " + typeSize));
    })
], ElementBuffer.prototype, "typeSize", null);
__decorate([
    contract_1.requireCheck(function (data, type, offset) {
        if (type === void 0) { type = null; }
        if (offset === void 0) { offset = 0; }
        contract_1.assert(this.buffer, Log_1.Log.info.FUNC_MUST("create gl buffer"));
    })
], ElementBuffer.prototype, "resetData", null);
__decorate([
    contract_1.requireCheck(function (isNeed32Bits, type) {
        if (type !== null) {
            if (isNeed32Bits) {
                contract_1.assert(type === EBufferType_1.EBufferType.UNSIGNED_INT, Log_1.Log.info.FUNC_MUST_BE("type", "UNSIGNED_SHORT, but actual is " + type));
            }
            else {
                contract_1.assert(type === EBufferType_1.EBufferType.UNSIGNED_SHORT || type === EBufferType_1.EBufferType.UNSIGNED_INT, Log_1.Log.info.FUNC_MUST_BE("type", "UNSIGNED_SHORT or UNSIGNED_INT, but actual is " + type));
            }
        }
    })
], ElementBuffer.prototype, "_getType", null);
ElementBuffer = __decorate([
    registerClass_1.registerClass("ElementBuffer")
], ElementBuffer);
exports.ElementBuffer = ElementBuffer;
//# sourceMappingURL=ElementBuffer.js.map