var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../../../definition/typescript/decorator/registerClass";
import { Hash } from "wonder-commonlib/dist/es2015/Hash";
import { EVariableType } from "./EVariableType";
import { Log } from "../../../utils/Log";
var _table = Hash.create();
_table.addChild(EVariableType.FLOAT_1, "float");
_table.addChild(EVariableType.FLOAT_2, "vec2");
_table.addChild(EVariableType.FLOAT_3, "vec3");
_table.addChild(EVariableType.FLOAT_4, "vec4");
_table.addChild(EVariableType.VECTOR_2, "vec2");
_table.addChild(EVariableType.VECTOR_3, "vec3");
_table.addChild(EVariableType.VECTOR_4, "vec4");
_table.addChild(EVariableType.FLOAT_MAT3, "mat3");
_table.addChild(EVariableType.FLOAT_MAT4, "mat4");
_table.addChild(EVariableType.NUMBER_1, "int");
_table.addChild(EVariableType.SAMPLER_CUBE, "samplerCube");
_table.addChild(EVariableType.SAMPLER_2D, "sampler2D");
var VariableTypeTable = (function () {
    function VariableTypeTable() {
    }
    VariableTypeTable.getVariableType = function (type) {
        var result = _table.getChild(type);
        Log.error(result === void 0, Log.info.FUNC_NOT_EXIST(type, "in VariableTypeTable"));
        return result;
    };
    return VariableTypeTable;
}());
VariableTypeTable = __decorate([
    registerClass("VariableTypeTable")
], VariableTypeTable);
export { VariableTypeTable };
//# sourceMappingURL=VariableTypeTable.js.map