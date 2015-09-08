/// <reference path="../../../definitions.d.ts"/>
module dy.render{
    export class ShaderLib{
        protected attributes:dyCb.Hash<IShaderVariable> = dyCb.Hash.create<IShaderVariable>();
        protected uniforms:dyCb.Hash<IShaderVariable> = dyCb.Hash.create<IShaderVariable>();
        protected vsSource:string = null;
        protected fsSource:string = null;


        //todo typescript define options' type
        public createShaderDefinition(options:any):IShaderDefinition{
            //todo use VariableLib.xxx?
            this.addAttributeVariable(["a_position"]);
            this.addUniformVariable(["u_mMatrix", "u_vMatrix", "u_pMatrix"]);

            this.setShaderDefinition(options);

            return {
                attributes: this.attributes,
                uniforms: this.uniforms,
                vsSource: this.vsSource,
                fsSource: this.fsSource
            }
        }

        //todo typescript define options' type
        protected setShaderDefinition(options:any){
        }

        protected addAttributeVariable(variableArr:Array<string>){
            this._addVariable(this.attributes, variableArr);
        }

        protected addUniformVariable(variableArr:Array<string>){
            this._addVariable(this.uniforms, variableArr);
        }

        private _addVariable(target:dyCb.Hash<IShaderVariable>, variableArr:Array<string>){
            variableArr.forEach((variable:string) => {
                dyCb.Log.assert(VariableLib[variable], dyCb.Log.info.FUNC_SHOULD(variable, "exist in VariableLib"));

                target.addChild(variable, VariableLib[variable]);
            });
        }
    }

    export interface IShaderDefinition{
        attributes:dyCb.Hash<IShaderVariable>;
        uniforms:dyCb.Hash<IShaderVariable>;
        vsSource:string;
        fsSource:string;
    }
}
