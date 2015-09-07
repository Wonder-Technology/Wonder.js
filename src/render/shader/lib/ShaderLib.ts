/// <reference path="../../../definitions.d.ts"/>
module dy.render{
    export class ShaderLib{
        public createShaderDefinition(options:{any}):IShaderDefinition{
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }
    }

    export interface IShaderDefinition{
        attributes:dyCb.Hash<IShaderVariable>;
        uniforms:dyCb.Hash<IShaderVariable>;
        vsSource:string;
        fsSource:string;
    }
}
