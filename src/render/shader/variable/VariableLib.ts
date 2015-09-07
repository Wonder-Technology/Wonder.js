/// <reference path="../../../definitions.d.ts"/>
module dy.render{
    export class VariableLib{
        //todo group?(common,cubemap...)

        public static a_position:IShaderVariable = {
            type:VariableType.FLOAT_4,
            value:VariableCategory.ENGINE
        };

        public static a_color:IShaderVariable = {
            type:VariableType.FLOAT_4,
            value:VariableCategory.ENGINE
        };

        public static u_mMatrix:IShaderVariable = {
            type:VariableType.FLOAT_MAT4,
            value:VariableCategory.ENGINE
        };

        public static u_vMatrix:IShaderVariable = {
            type:VariableType.FLOAT_MAT4,
            value:VariableCategory.ENGINE
        };

        public static u_pMatrix:IShaderVariable = {
            type:VariableType.FLOAT_MAT4,
            value:VariableCategory.ENGINE
        };

        public static u_sampler0:IShaderVariable = {
            type:VariableType.NUMBER_1,
            value:VariableCategory.ENGINE
        };
    }

    export interface IShaderVariable{
        type:VariableType;
        value:any
    }
}

