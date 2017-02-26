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
import { Component } from "../../core/Component";
import { cloneAttributeAsCloneable, cloneAttributeAsBasicType } from "../../definition/typescript/decorator/clone";
import { JudgeUtils } from "../../utils/JudgeUtils";
import { EDrawMode } from "../../renderer/EDrawMode";
import { ensure, it, requireCheck } from "../../definition/typescript/decorator/contract";
import expect from "wonder-expect.js";
import { execOnlyOnce } from "../../definition/typescript/decorator/control";
import { virtual } from "../../definition/typescript/decorator/virtual";
import { BasicBufferContainer } from "./data/BasicBufferContainer";
import { BasicGeometryData } from "./data/BasicGeometryData";
var Geometry = (function (_super) {
    __extends(Geometry, _super);
    function Geometry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._material = null;
        _this.buffers = null;
        _this.drawMode = EDrawMode.TRIANGLES;
        return _this;
    }
    Object.defineProperty(Geometry.prototype, "material", {
        get: function () {
            return this._material;
        },
        set: function (material) {
            if (!JudgeUtils.isEqual(material, this._material)) {
                this._material = material;
                this._material.geometry = this;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "geometryData", {
        get: function () {
            if (this.buffers === null) {
                return null;
            }
            return this.buffers.geometryData;
        },
        enumerable: true,
        configurable: true
    });
    Geometry.prototype.init = function () {
        var geometryData = null, computedData = this.computeData();
        this.buffers = this.createBufferContainer();
        geometryData = this.createGeometryData(computedData);
        this.buffers.geometryData = geometryData;
        this.buffers.init();
        this._material.init();
    };
    Geometry.prototype.dispose = function () {
        this.buffers.dispose();
        this._material.dispose();
    };
    Geometry.prototype.createBuffersFromGeometryData = function () {
        this.buffers.createBuffersFromGeometryData();
    };
    Geometry.prototype.createBufferContainer = function () {
        return BasicBufferContainer.create(this.entityObject);
    };
    Geometry.prototype.createGeometryData = function (computedData) {
        return this.createBasicGeometryData(computedData);
    };
    Geometry.prototype.createBasicGeometryData = function (computedData) {
        var vertices = computedData.vertices, _a = computedData.faces, faces = _a === void 0 ? [] : _a, geometryData = BasicGeometryData.create(this);
        geometryData.vertices = vertices;
        geometryData.faces = faces;
        return geometryData;
    };
    return Geometry;
}(Component));
export { Geometry };
__decorate([
    cloneAttributeAsCloneable()
], Geometry.prototype, "material", null);
__decorate([
    cloneAttributeAsBasicType()
], Geometry.prototype, "drawMode", void 0);
__decorate([
    ensure(function () {
        var geometryData = this.buffers.geometryData;
        it("faces.count should be be " + geometryData.indices.length / 3 + ", but actual is " + geometryData.faces.length, function () {
            expect(geometryData.faces.length * 3).equal(geometryData.indices.length);
        });
    }),
    execOnlyOnce("_isInit")
], Geometry.prototype, "init", null);
__decorate([
    requireCheck(function () {
        var _this = this;
        it("not exist buffers", function () {
            expect(_this.buffers).exist;
        });
    })
], Geometry.prototype, "createBuffersFromGeometryData", null);
__decorate([
    virtual
], Geometry.prototype, "createBufferContainer", null);
__decorate([
    virtual
], Geometry.prototype, "createGeometryData", null);
//# sourceMappingURL=Geometry.js.map