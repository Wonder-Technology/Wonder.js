"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../../definition/typescript/decorator/registerClass");
var Geometry_1 = require("../geometry/Geometry");
var ComponentInitOrderTable = (function () {
    function ComponentInitOrderTable() {
    }
    ComponentInitOrderTable.getOrder = function (component) {
        if (component instanceof Geometry_1.Geometry) {
            return 4;
        }
        return 5;
    };
    return ComponentInitOrderTable;
}());
ComponentInitOrderTable = __decorate([
    registerClass_1.registerClass("ComponentInitOrderTable")
], ComponentInitOrderTable);
exports.ComponentInitOrderTable = ComponentInitOrderTable;
//# sourceMappingURL=ComponentInitOrderTable.js.map