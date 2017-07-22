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
import { getVertices as getGeometryVertices, getIndices as getGeometryIndices, getConfigData, initGeometry as initGeometrySystem, getGameObject, getDrawMode as getGeometryDrawMode, getNormals as getGeometryNormals, getTexCoords as getGeometryTexCoords, } from "./GeometrySystem";
import { Component } from "../Component";
import { getState } from "../../core/DirectorSystem";
import { DirectorData } from "../../core/DirectorData";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { checkComponentShouldAlive, isComponentIndexNotRemoved } from "../ComponentSystem";
var Geometry = (function (_super) {
    __extends(Geometry, _super);
    function Geometry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Geometry = __decorate([
        registerClass("Geometry")
    ], Geometry);
    return Geometry;
}(Component));
export { Geometry };
export var getDrawMode = requireCheckFunc(function (geometry) {
    _checkShouldAlive(geometry, GeometryData);
}, function (geometry) {
    return getGeometryDrawMode(geometry.index, GeometryData);
});
export var getVertices = requireCheckFunc(function (geometry) {
    _checkShouldAlive(geometry, GeometryData);
}, function (geometry) {
    return getGeometryVertices(geometry.index, GeometryData);
});
export var getNormals = requireCheckFunc(function (geometry) {
    _checkShouldAlive(geometry, GeometryData);
}, function (geometry) {
    return getGeometryNormals(geometry.index, GeometryData);
});
export var getTexCoords = requireCheckFunc(function (geometry) {
    _checkShouldAlive(geometry, GeometryData);
}, function (geometry) {
    return getGeometryTexCoords(geometry.index, GeometryData);
});
export var getIndices = requireCheckFunc(function (geometry) {
    _checkShouldAlive(geometry, GeometryData);
}, function (geometry) {
    return getGeometryIndices(geometry.index, GeometryData);
});
export var getGeometryConfigData = requireCheckFunc(function (geometry) {
    _checkShouldAlive(geometry, GeometryData);
}, function (geometry) {
    return getConfigData(geometry.index, GeometryData);
});
export var initGeometry = function (geometry) {
    initGeometrySystem(geometry.index, getState(DirectorData));
};
export var getGeometryGameObject = requireCheckFunc(function (geometry) {
    _checkShouldAlive(geometry, GeometryData);
}, function (geometry) {
    return getGameObject(geometry.index, GeometryData);
});
var _checkShouldAlive = function (geometry, GeometryData) {
    checkComponentShouldAlive(geometry, GeometryData, function (geometry, GeometryData) {
        return isComponentIndexNotRemoved(geometry);
    });
};
//# sourceMappingURL=Geometry.js.map