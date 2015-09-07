/// <reference path="../../../definitions.d.ts"/>
module dy.render{
    export class BasicShaderLib extends ShaderLib{
        private static _instance:BasicShaderLib = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        private _attributes:dyCb.Hash<IShaderVariable> = dyCb.Hash.create<IShaderVariable>();
        private _uniforms:dyCb.Hash<IShaderVariable> = dyCb.Hash.create<IShaderVariable>();
        private _vsSource:string = null;
        private _fsSource:string = null;

        //todo define options' type
        public createShaderDefinition(options:{}):IShaderDefinition{
            //todo use VariableLib.xxx?
            this._addAttributeVariable(["a_position", "a_color"]);
            this._addUniformVariable(["u_mMatrix", "u_vMatrix", "u_pMatrix"]);

            this._vsSource = ShaderChunk.basic_vertex;
            this._fsSource = ShaderChunk.basic_fragment;

            //todo move to base
            return {
                attributes: this._attributes,
                uniforms: this._uniforms,
                vsSource: this._vsSource,
                fsSource: this._fsSource
            }
        }

        //todo duplicate
        private _addAttributeVariable(variableArr:Array<string>){
            var self = this;

            variableArr.forEach((variable:string) => {
                dyCb.Log.assert(VariableLib[variable], dyCb.Log.info.FUNC_SHOULD(variable, "exist in VariableLib"));

                self._attributes.addChild(variable, VariableLib[variable]);
            });
        }

        private _addUniformVariable(variableArr:Array<string>){
            var self = this;

            variableArr.forEach((variable:string) => {
                dyCb.Log.assert(VariableLib[variable], dyCb.Log.info.FUNC_SHOULD(variable, "exist in VariableLib"));

                self._uniforms.addChild(variable, VariableLib[variable]);
            });
        }
    }
}

