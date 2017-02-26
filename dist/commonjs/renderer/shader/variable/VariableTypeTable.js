"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../../../definition/typescript/decorator/registerClass");
var Hash_1 = require("wonder-commonlib/dist/commonjs/Hash");
var EVariableType_1 = require("./EVariableType");
var Log_1 = require("../../../utils/Log");
var _table = Hash_1.Hash.create();
_table.addChild(EVariableType_1.EVariableType.FLOAT_1, "float");
_table.addChild(EVariableType_1.EVariableType.FLOAT_2, "vec2");
_table.addChild(EVariableType_1.EVariableType.FLOAT_3, "vec3");
_table.addChild(EVariableType_1.EVariableType.FLOAT_4, "vec4");
_table.addChild(EVariableType_1.EVariableType.VECTOR_2, "vec2");
_table.addChild(EVariableType_1.EVariableType.VECTOR_3, "vec3");
_table.addChild(EVariableType_1.EVariableType.VECTOR_4, "vec4");
_table.addChild(EVariableType_1.EVariableType.FLOAT_MAT3, "mat3");
_table.addChild(EVariableType_1.EVariableType.FLOAT_MAT4, "mat4");
_table.addChild(EVariableType_1.EVariableType.NUMBER_1, "int");
_table.addChild(EVariableType_1.EVariableType.SAMPLER_CUBE, "samplerCube");
_table.addChild(EVariableType_1.EVariableType.SAMPLER_2D, "sampler2D");
var VariableTypeTable = (function () {
    function VariableTypeTable() {
    }
    VariableTypeTable.getVariableType = function (type) {
        var result = _table.getChild(type);
        Log_1.Log.error(result === void 0, Log_1.Log.info.FUNC_NOT_EXIST(type, "in VariableTypeTable"));
        return result;
    };
    return VariableTypeTable;
}());
VariableTypeTable = __decorate([
    registerClass_1.registerClass("VariableTypeTable")
], VariableTypeTable);
exports.VariableTypeTable = VariableTypeTable;
//# sourceMappingURL=VariableTypeTable.js.map