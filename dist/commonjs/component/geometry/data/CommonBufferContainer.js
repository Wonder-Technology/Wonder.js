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
var BufferContainer_1 = require("./BufferContainer");
var cache_1 = require("../../../definition/typescript/decorator/cache");
var BufferDataTable_1 = require("../../../renderer/buffer/BufferDataTable");
var CommonBufferContainer = (function (_super) {
    __extends(CommonBufferContainer, _super);
    function CommonBufferContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._verticeBuffer = null;
        return _this;
    }
    CommonBufferContainer.prototype.getVertice = function (type) {
        var geometryData = this.geometryData[BufferDataTable_1.BufferDataTable.getGeometryDataName(type)];
        if (!this.hasData(geometryData)) {
            return null;
        }
        this.createOnlyOnceAndUpdateArrayBuffer("_verticeBuffer", geometryData, 3);
        return this._verticeBuffer;
    };
    return CommonBufferContainer;
}(BufferContainer_1.BufferContainer));
__decorate([
    cache_1.cacheBufferForBufferContainer()
], CommonBufferContainer.prototype, "getVertice", null);
exports.CommonBufferContainer = CommonBufferContainer;
//# sourceMappingURL=CommonBufferContainer.js.map