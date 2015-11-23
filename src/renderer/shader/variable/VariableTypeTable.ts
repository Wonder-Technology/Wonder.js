/// <reference path="../../../filePath.d.ts"/>
module dy{
    const _table = dyCb.Hash.create<string>();

    //todo remove <any>
    _table.addChild(<any>VariableType.FLOAT_1, "float");
    _table.addChild(<any>VariableType.FLOAT_2, "vec2");
    _table.addChild(<any>VariableType.FLOAT_3, "vec3");
    _table.addChild(<any>VariableType.FLOAT_4, "vec4");
    _table.addChild(<any>VariableType.FLOAT_MAT3, "mat3");
    _table.addChild(<any>VariableType.FLOAT_MAT4, "mat4");
    _table.addChild(<any>VariableType.NUMBER_1, "int");
    _table.addChild(<any>VariableType.SAMPLER_CUBE, "samplerCube");
    _table.addChild(<any>VariableType.SAMPLER_2D, "sampler2D");

    export class VariableTypeTable{
        public static getVariableType(type:VariableType){
            //todo remove <any>
            var result = _table.getChild(<any>type);

            Log.error(result === void 0, Log.info.FUNC_NOT_EXIST(type, "in VariableTypeTable"));

            return result;
        }
    }
}

