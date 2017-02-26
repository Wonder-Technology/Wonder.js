var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { Hash } from "wonder-commonlib/dist/es2015/Hash";
import { EBufferDataType } from "./EBufferDataType";
import { ensure } from "../../definition/typescript/decorator/contract";
import { Log } from "../../utils/Log";
var _table = Hash.create();
_table.addChild(EBufferDataType.VERTICE, "vertices");
_table.addChild(EBufferDataType.INDICE, "indices");
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
    ensure(function (result, type) {
        Log.error(result === void 0, Log.info.FUNC_NOT_EXIST(type, "in BufferDataTable"));
    })
], BufferDataTable, "getGeometryDataName", null);
BufferDataTable = __decorate([
    registerClass("BufferDataTable")
], BufferDataTable);
export { BufferDataTable };
//# sourceMappingURL=BufferDataTable.js.map