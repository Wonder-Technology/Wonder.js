var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Hash } from "wonder-commonlib/dist/es2015/Hash";
import { ElementBuffer } from "../../../renderer/buffer/ElementBuffer";
import { virtual } from "../../../definition/typescript/decorator/virtual";
import { EBufferDataType } from "../../../renderer/buffer/EBufferDataType";
import { requireCheck, it } from "../../../definition/typescript/decorator/contract";
import expect from "wonder-expect.js";
import { EBufferType } from "../../../renderer/buffer/EBufferType";
import { EBufferUsage } from "../../../renderer/buffer/EBufferUsage";
import { ArrayBuffer } from "../../../renderer/buffer/ArrayBuffer";
import { cache } from "../../../definition/typescript/decorator/cache";
import { BufferDataTable } from "../../../renderer/buffer/BufferDataTable";
var BufferContainer = (function () {
    function BufferContainer(entityObject) {
        this.geometryData = null;
        this.entityObject = null;
        this.container = Hash.create();
        this._indiceBuffer = null;
        this.entityObject = entityObject;
    }
    BufferContainer.prototype.createBuffersFromGeometryData = function () {
        this.getChild(EBufferDataType.VERTICE);
        this.getChild(EBufferDataType.INDICE);
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
            case EBufferDataType.VERTICE:
                result = this.getVertice(type);
                break;
            case EBufferDataType.INDICE:
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
        if (type === void 0) { type = EBufferType.FLOAT; }
        if (offset === void 0) { offset = 0; }
        if (usage === void 0) { usage = EBufferUsage.STATIC_DRAW; }
        var buffer = this[bufferAttriName];
        if (buffer) {
            buffer.resetData(data, size, type, offset);
            return;
        }
        this[bufferAttriName] = ArrayBuffer.create(data, size, type, usage);
    };
    BufferContainer.prototype.createOnlyOnceAndUpdateElememntBuffer = function (bufferAttriName, data, type, offset, usage) {
        if (type === void 0) { type = null; }
        if (offset === void 0) { offset = 0; }
        if (usage === void 0) { usage = EBufferUsage.STATIC_DRAW; }
        var buffer = this[bufferAttriName];
        if (buffer) {
            buffer.resetData(data, type, offset);
            return;
        }
        this[bufferAttriName] = ElementBuffer.create(data, type, usage);
    };
    BufferContainer.prototype.hasData = function (data) {
        return !!data && data.length > 0;
    };
    BufferContainer.prototype._getIndice = function (type) {
        var geometryData = null;
        geometryData = this.geometryData[BufferDataTable.getGeometryDataName(type)];
        if (!this.hasData(geometryData)) {
            return null;
        }
        this.createOnlyOnceAndUpdateElememntBuffer("_indiceBuffer", geometryData);
        return this._indiceBuffer;
    };
    return BufferContainer;
}());
export { BufferContainer };
__decorate([
    virtual
], BufferContainer.prototype, "createBuffersFromGeometryData", null);
__decorate([
    requireCheck(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        it("test arguments", function () {
            if (args.length === 2) {
                var dataName = args[1];
                expect(dataName).exist;
                expect(dataName).be.a("string");
            }
        });
    })
], BufferContainer.prototype, "getChild", null);
__decorate([
    cache(function (type) {
        return this.container.hasChild(type);
    }, function (type) {
        return this.container.getChild(type);
    }, function (result, type) {
        this.container.addChild(type, result);
    })
], BufferContainer.prototype, "_getIndice", null);
//# sourceMappingURL=BufferContainer.js.map