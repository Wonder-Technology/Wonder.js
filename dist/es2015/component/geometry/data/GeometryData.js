var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { EBufferDataType } from "../../../renderer/buffer/EBufferDataType";
import { cacheGetter } from "../../../definition/typescript/decorator/cache";
import { virtual } from "../../../definition/typescript/decorator/virtual";
var GeometryData = (function () {
    function GeometryData(geometry) {
        this._vertices = null;
        this._faces = null;
        this.geometry = null;
        this._indiceCache = null;
        this._indiceDirty = true;
        this.geometry = geometry;
    }
    Object.defineProperty(GeometryData.prototype, "vertices", {
        get: function () {
            return this._vertices;
        },
        set: function (vertices) {
            this._vertices = vertices;
            this.geometry.buffers.removeCache(EBufferDataType.VERTICE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GeometryData.prototype, "indices", {
        get: function () {
            var indices = [];
            for (var _i = 0, _a = this._faces; _i < _a.length; _i++) {
                var face = _a[_i];
                indices.push(face.aIndex, face.bIndex, face.cIndex);
            }
            return indices;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GeometryData.prototype, "faces", {
        get: function () {
            return this._faces;
        },
        set: function (faces) {
            this._faces = faces;
            this.geometry.buffers.removeCache(EBufferDataType.INDICE);
            this.onChangeFace();
        },
        enumerable: true,
        configurable: true
    });
    GeometryData.prototype.dispose = function () {
    };
    GeometryData.prototype.onChangeFace = function () {
        this._indiceDirty = true;
    };
    return GeometryData;
}());
export { GeometryData };
__decorate([
    cacheGetter(function () {
        return !this._indiceDirty && this._indiceCache;
    }, function () {
        return this._indiceCache;
    }, function (result) {
        this._indiceCache = result;
        this._indiceDirty = false;
    })
], GeometryData.prototype, "indices", null);
__decorate([
    virtual
], GeometryData.prototype, "onChangeFace", null);
//# sourceMappingURL=GeometryData.js.map