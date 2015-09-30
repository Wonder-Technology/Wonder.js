/// <reference path="../../../definitions.d.ts"/>
module dy{
    const _table = dyCb.Hash.create<string>();

    _table.addChild("diffuseMap", "u_diffuseMapSampler");
    _table.addChild("specularMap", "u_specularMapSampler");
    _table.addChild("normalMap", "u_normalMapSampler");
    _table.addChild("shadowMap", "u_shadowMapSampler");
    _table.addChild("mirrorReflectionMap", "u_mirrorSampler");

    export class VariableNameTable{
        public static getVariableName(name: string){
            var result = _table.getChild(name);

            dyCb.Log.error(result === void 0, dyCb.Log.info.FUNC_NOT_EXIST(name, "in VariableNameTable"));

            return result;
        }
    }
}

