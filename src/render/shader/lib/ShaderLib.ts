/// <reference path="../../../definitions.d.ts"/>
module dy.render{
    export class ShaderLib{
        public attributes:dyCb.Hash<IShaderVariable> = dyCb.Hash.create<IShaderVariable>();
        public uniforms:dyCb.Hash<IShaderVariable> = dyCb.Hash.create<IShaderVariable>();
        public vsSource:string = null;
        public vsSourceHead:string = null;
        public vsSourceBody:string = null;
        public fsSource:string = null;
        public fsSourceHead:string = null;
        public fsSourceBody:string = null;

        public initWhenCreate(){
            //todo rename?
            this.setShaderDefinition();
        }

        public sendShaderVariables(program: Program, quadCmd:render.QuadCommand, material:Material){
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
