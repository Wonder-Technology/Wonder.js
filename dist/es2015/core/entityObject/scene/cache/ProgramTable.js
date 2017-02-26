var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../../../../definition/typescript/decorator/registerClass";
import { Hash } from "wonder-commonlib/dist/es2015/Hash";
var ProgramTable = (function () {
    function ProgramTable() {
    }
    ProgramTable.hasProgram = function (key) {
        return this._table.hasChild(key);
    };
    ProgramTable.addProgram = function (key, program) {
        this._table.addChild(key, program);
    };
    ProgramTable.getProgram = function (key) {
        return this._table.getChild(key);
    };
    ProgramTable.dispose = function () {
        this._table.forEach(function (program) {
            program.dispose();
        });
        this.lastUsedProgram = null;
    };
    ProgramTable.clearAll = function () {
        this._table.removeAllChildren();
        this.lastUsedProgram = null;
    };
    return ProgramTable;
}());
ProgramTable.lastUsedProgram = null;
ProgramTable._table = Hash.create();
ProgramTable = __decorate([
    registerClass("ProgramTable")
], ProgramTable);
export { ProgramTable };
//# sourceMappingURL=ProgramTable.js.map