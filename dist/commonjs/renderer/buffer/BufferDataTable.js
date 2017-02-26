"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../../definition/typescript/decorator/registerClass");
var Hash_1 = require("wonder-commonlib/dist/commonjs/Hash");
var EBufferDataType_1 = require("./EBufferDataType");
var contract_1 = require("../../definition/typescript/decorator/contract");
var Log_1 = require("../../utils/Log");
var _table = Hash_1.Hash.create();
_table.addChild(EBufferDataType_1.EBufferDataType.VERTICE, "vertices");
_table.addChild(EBufferDataType_1.EBufferDataType.INDICE, "indices");
var BufferDataTable = (function () {
    function BufferDataTable() {
    }
    BufferDataTable.getGeometryDataName = function (type) {
        var result = _table.getChild(type);
        return result;
    };
    return BufferDataTable;
}());
__decorate([
    contract_1.ensure(function (result, type) {
        Log_1.Log.error(result === void 0, Log_1.Log.info.FUNC_NOT_EXIST(type, "in BufferDataTable"));
    })
], BufferDataTable, "getGeometryDataName", null);
BufferDataTable = __decorate([
    registerClass_1.registerClass("BufferDataTable")
], BufferDataTable);
exports.BufferDataTable = BufferDataTable;
//# sourceMappingURL=BufferDataTable.js.map