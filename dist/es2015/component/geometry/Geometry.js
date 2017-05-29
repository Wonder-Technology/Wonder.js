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
import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { GeometryData } from "./GeometryData";
import { getDrawMode as getGeometryDrawMode, getVertices as getGeometryVertices, getIndices as getGeometryIndices, getConfigData, initGeometry as initGeometrySystem, getGameObject, } from "./GeometrySystem";
import { Component } from "../Component";
import { getState } from "../../core/DirectorSystem";
import { DirectorData } from "../../core/DirectorData";
var Geometry = (function (_super) {
    __extends(Geometry, _super);
    function Geometry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Geometry;
}(Component));
Geometry = __decorate([
    registerClass("Geometry")
], Geometry);
export { Geometry };
export var getDrawMode = function (geometry) {
    return getGeometryDrawMode(geometry.index, GeometryData);
};
export var getVertices = function (geometry) {
    return getGeometryVertices(geometry.index, GeometryData);
};
export var getIndices = function (geometry) {
    return getGeometryIndices(geometry.index, GeometryData);
};
export var getGeometryConfigData = function (geometry) {
    return getConfigData(geometry.index, GeometryData);
};
export var initGeometry = function (geometry) {
    initGeometrySystem(geometry.index, getState(DirectorData));
};
export var getGeometryGameObject = function (geometry) {
    return getGameObject(geometry.index, GeometryData);
};
//# sourceMappingURL=Geometry.js.map