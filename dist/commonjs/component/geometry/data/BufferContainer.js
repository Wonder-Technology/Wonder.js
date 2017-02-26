"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Hash_1 = require("wonder-commonlib/dist/commonjs/Hash");
var ElementBuffer_1 = require("../../../renderer/buffer/ElementBuffer");
var virtual_1 = require("../../../definition/typescript/decorator/virtual");
var EBufferDataType_1 = require("../../../renderer/buffer/EBufferDataType");
var contract_1 = require("../../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var EBufferType_1 = require("../../../renderer/buffer/EBufferType");
var EBufferUsage_1 = require("../../../renderer/buffer/EBufferUsage");
var ArrayBuffer_1 = require("../../../renderer/buffer/ArrayBuffer");
var cache_1 = require("../../../definition/typescript/decorator/cache");
var BufferDataTable_1 = require("../../../renderer/buffer/BufferDataTable");
var BufferContainer = (function () {
    function BufferContainer(entityObject) {
        this.geometryData = null;
        this.entityObject = null;
        this.container = Hash_1.Hash.create();
        this._indiceBuffer = null;
        this.entityObject = entityObject;
    }
    BufferContainer.prototype.createBuffersFromGeometryData = function () {
        this.getChild(EBufferDataType_1.EBufferDataType.VERTICE);
        this.getChild(EBufferDataType_1.EBufferDataType.INDICE);
    };
    BufferContainer.prototype.removeCache = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.container.removeChild(args[0]);
    };
    BufferContainer.prototype.getChild = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var type = args[0], result = null;
        switch (type) {
            case EBufferDataType_1.EBufferDataType.VERTICE:
                result = this.getVertice(type);
                break;
            case EBufferDataType_1.EBufferDataType.INDICE:
                result = this._getIndice(type);
                break;
            default:
                break;
        }
        return result;
    };
    BufferContainer.prototype.init = function () {
    };
    BufferContainer.prototype.dispose = function () {
        this.container.forEach(function (buffer) {
            buffer.dispose();
        });
        this.geometryData.dispose();
    };
    BufferContainer.prototype.createOnlyOnceAndUpdateArrayBuffer = function (bufferAttriName, data, size, type, offset, usage) {
        if (type === void 0) { type = EBufferType_1.EBufferType.FLOAT; }
        if (offset === void 0) { offset = 0; }
        if (usage === void 0) { usage = EBufferUsage_1.EBufferUsage.STATIC_DRAW; }
        var buffer = this[bufferAttriName];
        if (buffer) {
            buffer.resetData(data, size, type, offset);
            return;
        }
        this[bufferAttriName] = ArrayBuffer_1.ArrayBuffer.create(data, size, type, usage);
    };
    BufferContainer.prototype.createOnlyOnceAndUpdateElememntBuffer = function (bufferAttriName, data, type, offset, usage) {
        if (type === void 0) { type = null; }
        if (offset === void 0) { offset = 0; }
        if (usage === void 0) { usage = EBufferUsage_1.EBufferUsage.STATIC_DRAW; }
        var buffer = this[bufferAttriName];
        if (buffer) {
            buffer.resetData(data, type, offset);
            return;
        }
        this[bufferAttriName] = ElementBuffer_1.ElementBuffer.create(data, type, usage);
    };
    BufferContainer.prototype.hasData = function (data) {
        return !!data && data.length > 0;
    };
    BufferContainer.prototype._getIndice = function (type) {
        var geometryData = null;
        geometryData = this.geometryData[BufferDataTable_1.BufferDataTable.getGeometryDataName(type)];
        if (!this.hasData(geometryData)) {
            return null;
        }
        this.createOnlyOnceAndUpdateElememntBuffer("_indiceBuffer", geometryData);
        return this._indiceBuffer;
    };
    return BufferContainer;
}());
__decorate([
    virtual_1.virtual
], BufferContainer.prototype, "createBuffersFromGeometryData", null);
__decorate([
    contract_1.requireCheck(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        contract_1.it("test arguments", function () {
            if (args.length === 2) {
                var dataName = args[1];
                wonder_expect_js_1.default(dataName).exist;
                wonder_expect_js_1.default(dataName).be.a("string");
            }
        });
    })
], BufferContainer.prototype, "getChild", null);
__decorate([
    cache_1.cache(function (type) {
        return this.container.hasChild(type);
    }, function (type) {
        return this.container.getChild(type);
    }, function (result, type) {
        this.container.addChild(type, result);
    })
], BufferContainer.prototype, "_getIndice", null);
exports.BufferContainer = BufferContainer;
//# sourceMappingURL=BufferContainer.js.map