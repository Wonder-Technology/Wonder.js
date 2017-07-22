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
var GeometryData_1 = require("./GeometryData");
var GeometrySystem_1 = require("./GeometrySystem");
var Component_1 = require("../Component");
var DirectorSystem_1 = require("../../core/DirectorSystem");
var DirectorData_1 = require("../../core/DirectorData");
var contract_1 = require("../../definition/typescript/decorator/contract");
var ComponentSystem_1 = require("../ComponentSystem");
var Geometry = (function (_super) {
    __extends(Geometry, _super);
    function Geometry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Geometry = __decorate([
        registerClass_1.registerClass("Geometry")
    ], Geometry);
    return Geometry;
}(Component_1.Component));
exports.Geometry = Geometry;
exports.getDrawMode = contract_1.requireCheckFunc(function (geometry) {
    _checkShouldAlive(geometry, GeometryData_1.GeometryData);
}, function (geometry) {
    return GeometrySystem_1.getDrawMode(geometry.index, GeometryData_1.GeometryData);
});
exports.getVertices = contract_1.requireCheckFunc(function (geometry) {
    _checkShouldAlive(geometry, GeometryData_1.GeometryData);
}, function (geometry) {
    return GeometrySystem_1.getVertices(geometry.index, GeometryData_1.GeometryData);
});
exports.getNormals = contract_1.requireCheckFunc(function (geometry) {
    _checkShouldAlive(geometry, GeometryData_1.GeometryData);
}, function (geometry) {
    return GeometrySystem_1.getNormals(geometry.index, GeometryData_1.GeometryData);
});
exports.getTexCoords = contract_1.requireCheckFunc(function (geometry) {
    _checkShouldAlive(geometry, GeometryData_1.GeometryData);
}, function (geometry) {
    return GeometrySystem_1.getTexCoords(geometry.index, GeometryData_1.GeometryData);
});
exports.getIndices = contract_1.requireCheckFunc(function (geometry) {
    _checkShouldAlive(geometry, GeometryData_1.GeometryData);
}, function (geometry) {
    return GeometrySystem_1.getIndices(geometry.index, GeometryData_1.GeometryData);
});
exports.getGeometryConfigData = contract_1.requireCheckFunc(function (geometry) {
    _checkShouldAlive(geometry, GeometryData_1.GeometryData);
}, function (geometry) {
    return GeometrySystem_1.getConfigData(geometry.index, GeometryData_1.GeometryData);
});
exports.initGeometry = function (geometry) {
    GeometrySystem_1.initGeometry(geometry.index, DirectorSystem_1.getState(DirectorData_1.DirectorData));
};
exports.getGeometryGameObject = contract_1.requireCheckFunc(function (geometry) {
    _checkShouldAlive(geometry, GeometryData_1.GeometryData);
}, function (geometry) {
    return GeometrySystem_1.getGameObject(geometry.index, GeometryData_1.GeometryData);
});
var _checkShouldAlive = function (geometry, GeometryData) {
    ComponentSystem_1.checkComponentShouldAlive(geometry, GeometryData, function (geometry, GeometryData) {
        return ComponentSystem_1.isComponentIndexNotRemoved(geometry);
    });
};
//# sourceMappingURL=Geometry.js.map