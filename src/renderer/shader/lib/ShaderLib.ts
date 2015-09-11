/// <reference path="../../../definitions.d.ts"/>
module dy{
    export class ShaderLib{
        public attributes:dyCb.Hash<IShaderVariable> = dyCb.Hash.create<IShaderVariable>();
        public uniforms:dyCb.Hash<IShaderVariable> = dyCb.Hash.create<IShaderVariable>();
        public vsSource:string = "";
        public vsSourceHead:string = "";
        public vsSourceBody:string = "";
        public fsSource:string = "";
        public fsSourceHead:string = "";
        public fsSourceBody:string = "";

        public initWhenCreate(){
            //todo rename?
            this.setShaderDefinition();
        }

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:Material){
        }

        protected setShaderDefinition(){
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
}
