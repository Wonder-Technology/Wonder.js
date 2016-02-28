module wd{
    const _table = wdCb.Hash.create<string>();

    _table.addChild("lightMap", "u_lightMapSampler");
    _table.addChild("diffuseMap", "u_diffuseMapSampler");
    _table.addChild("specularMap", "u_specularMapSampler");
    _table.addChild("emissionMap", "u_emissionMapSampler");
    _table.addChild("normalMap", "u_normalMapSampler");
    _table.addChild("mirrorReflectionMap", "u_mirrorSampler");

    export class VariableNameTable{
        public static getVariableName(name: string){
            var result = _table.getChild(name);

            Log.error(result === void 0, Log.info.FUNC_NOT_EXIST(name, "in VariableNameTable"));

            return result;
        }
    }
}

