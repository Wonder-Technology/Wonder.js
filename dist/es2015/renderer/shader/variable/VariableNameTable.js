var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../../../definition/typescript/decorator/registerClass";
import { Hash } from "wonder-commonlib/dist/es2015/Hash";
import { ensure, it } from "../../../definition/typescript/decorator/contract";
import expect from "wonder-expect.js";
var _table = Hash.create();
_table.addChild("lightMap", "u_lightMapSampler");
_table.addChild("diffuseMap", "u_diffuseMapSampler");
_table.addChild("diffuseMap1", "u_diffuseMap1Sampler");
_table.addChild("diffuseMap2", "u_diffuseMap2Sampler");
_table.addChild("diffuseMap3", "u_diffuseMap3Sampler");
_table.addChild("specularMap", "u_specularMapSampler");
_table.addChild("emissionMap", "u_emissionMapSampler");
_table.addChild("normalMap", "u_normalMapSampler");
_table.addChild("reflectionMap", "u_reflectionMapSampler");
_table.addChild("refractionMap", "u_refractionMapSampler");
_table.addChild("bitmap", "u_bitmapSampler");
_table.addChild("bumpMap", "u_bumpMapSampler");
_table.addChild("bumpMap1", "u_bumpMap1Sampler");
_table.addChild("bumpMap2", "u_bumpMap2Sampler");
_table.addChild("bumpMap3", "u_bumpMap3Sampler");
_table.addChild("mixMap", "u_mixMapSampler");
_table.addChild("grassMap", "u_grassMapSampler");
_table.addChild("heightMap", "u_heightMapSampler");
var VariableNameTable = (function () {
    function VariableNameTable() {
    }
    VariableNameTable.getVariableName = function (name) {
        return _table.getChild(name);
    };
    return VariableNameTable;
}());
__decorate([
    ensure(function (variableName) {
        it("variableName should in VariableNameTable", function () {
            expect(variableName).exist;
        });
    })
], VariableNameTable, "getVariableName", null);
VariableNameTable = __decorate([
    registerClass("VariableNameTable")
], VariableNameTable);
export { VariableNameTable };
//# sourceMappingURL=VariableNameTable.js.map