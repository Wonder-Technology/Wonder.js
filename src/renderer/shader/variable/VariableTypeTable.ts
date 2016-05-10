module wd{
    const _table = wdCb.Hash.create<string>();

    //todo remove <any>
    _table.addChild(<any>EVariableType.FLOAT_1, "float");
    _table.addChild(<any>EVariableType.FLOAT_2, "vec2");
    _table.addChild(<any>EVariableType.FLOAT_3, "vec3");
    _table.addChild(<any>EVariableType.FLOAT_4, "vec4");

    _table.addChild(<any>EVariableType.VECTOR_2, "vec2");
    _table.addChild(<any>EVariableType.VECTOR_3, "vec3");
    _table.addChild(<any>EVariableType.VECTOR_4, "vec4");

    _table.addChild(<any>EVariableType.FLOAT_MAT3, "mat3");
    _table.addChild(<any>EVariableType.FLOAT_MAT4, "mat4");
    _table.addChild(<any>EVariableType.NUMBER_1, "int");
    _table.addChild(<any>EVariableType.SAMPLER_CUBE, "samplerCube");
    _table.addChild(<any>EVariableType.SAMPLER_2D, "sampler2D");

    export class VariableTypeTable{
        public static getVariableType(type:EVariableType){
            //todo remove <any>
            var result = _table.getChild(<any>type);

            Log.error(result === void 0, Log.info.FUNC_NOT_EXIST(type, "in VariableTypeTable"));

            return result;
        }
    }
}

