/// <reference path="../../../definitions.d.ts"/>
module dy{
    export class ShaderLib{
        public attributes:dyCb.Hash<ShaderVariable> = dyCb.Hash.create<ShaderVariable>();
        public uniforms:dyCb.Hash<ShaderVariable> = dyCb.Hash.create<ShaderVariable>();
        public vsSource:string = "";
        public vsSourceHead:string = "";
        public vsSourceBody:string = "";
        public fsSource:string = "";
        public fsSourceHead:string = "";
        public fsSourceBody:string = "";
        public vsSourceDefineList:dyCb.Collection<any> = dyCb.Collection.create<any>();
        public fsSourceDefineList:dyCb.Collection<any> = dyCb.Collection.create<any>();

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

        private _addVariable(target:dyCb.Hash<ShaderVariable>, variableArr:Array<string>){
            variableArr.forEach((variable:string) => {
                dyCb.Log.assert(VariableLib[variable], dyCb.Log.info.FUNC_SHOULD(variable, "exist in VariableLib"));

                target.addChild(variable, VariableLib[variable]);
            });
        }
    }
}
