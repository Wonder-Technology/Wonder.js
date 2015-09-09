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
        public program:Program = null;

        public initWhenCreate(){
            //todo rename?
            this.setShaderDefinition();
        }

        public sendShaderVariables(quadCmd:render.QuadCommand, material:Material){
        }

        //todo typescript define options' type
        //public createShaderDefinition(options:any):IShaderDefinition{
        //public createShaderDefinition():IShaderDefinition{
        //
        //    //this.setShaderDefinition(options);
        //    this.setShaderDefinition();
        //
        //    return {
        //        attributes: this.attributes,
        //        uniforms: this.uniforms,
        //        vsSource: this.vsSource,
        //        fsSource: this.fsSource
        //    }
        //}

        //todo typescript define options' type
        //protected setShaderDefinition(options:any){
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

    export interface IShaderDefinition{
        attributes:dyCb.Hash<IShaderVariable>;
        uniforms:dyCb.Hash<IShaderVariable>;
        vsSource:string;
        fsSource:string;
    }
}
